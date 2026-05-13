// 画像ファイルと名前の一致チェックスクリプト
const fs = require("fs");
const path = require("path");
const vm = require("vm");

// 画像ファイル一覧読み込み
const imgListRaw = fs.readFileSync("img_list.txt", "utf8");
const imgSet = new Set(
  imgListRaw
    .split("\n")
    .map((l) => l.trim().replace(/\r/, ""))
    .filter(Boolean),
);

// data.js をサンドボックスで実行（const/let は同一スクリプト内でアクセス可能なため末尾に export 文を追加）
const dataCode = fs.readFileSync("data.js", "utf8");
const exportSnippet = `
;__export__ = {
  creatures: typeof creatures !== 'undefined' ? creatures : [],
  page2Creatures: typeof page2Creatures !== 'undefined' ? page2Creatures : [],
};
`;
const sandbox = {
  console,
  document: { createElement: () => ({}) },
  localStorage: { getItem: () => null, setItem: () => {} },
  __export__: {},
};
vm.createContext(sandbox);
let execError = null;
try {
  vm.runInContext(dataCode + exportSnippet, sandbox, { timeout: 15000 });
} catch (e) {
  execError = e;
  console.error("実行エラー（一部データが取得できない可能性）:", e.message);
}

const { creatures: allCreatures, page2Creatures: allPage2 } =
  sandbox.__export__;

if (!allCreatures.length && !allPage2.length) {
  console.error(
    "データを取得できませんでした。data.js の構造を確認してください。",
  );
  process.exit(1);
}

const missing = [];
const ok = [];

function check(name, imgPath) {
  if (!imgPath) return;
  const key = imgPath.replace(/^img\//, "").replace(/\.png$/, "");
  if (!imgSet.has(key)) {
    missing.push({ name, expected: key });
  } else {
    ok.push(name);
  }
}

allCreatures.forEach((c) => check(c.name, c.img));
allPage2.forEach((item) => check(item.name, item.img));

console.log("=== 画像ファイルが見つからないアイテム ===");
if (missing.length === 0) {
  console.log("なし（すべて一致）");
} else {
  missing.forEach((m) =>
    console.log(`  [不一致] ${m.name}  →  img/${m.expected}.png`),
  );
}
console.log(`\n一致: ${ok.length} 件 / 不一致: ${missing.length} 件`);

// img_list.txt に存在するが data.js で使われていない画像
const usedPaths = new Set();
[...allCreatures, ...allPage2].forEach((c) => {
  if (c.img) usedPaths.add(c.img.replace(/^img\//, "").replace(/\.png$/, ""));
});
const unusedImgs = [...imgSet].filter((p) => !usedPaths.has(p));
console.log(`\n=== データで使われていない画像ファイル（参考） ===`);
unusedImgs.forEach((p) => console.log(`  img/${p}.png`));
console.log(`合計: ${unusedImgs.length} 件`);
