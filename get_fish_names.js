/**
 * get_fish_names.js
 * Node.js ユーティリティ — data.js を vm サンドボックス内で実行し、
 * 趣味が "釣り" の生き物リストを出力する。
 * 出力形式: catFishList などに貼り付けやすい "name",  形式
 * 使い方: node get_fish_names.js
 */
const fs = require("fs");
const vm = require("vm");
// data.js を文字列として読み込む
const code = fs.readFileSync("data.js", "utf8");
// vm サンドボックス: data.js がブラウザ環境を仮定しているためモック化
const sandbox = {
  console,
  document: { createElement: () => ({}) },
  localStorage: { getItem: () => null, setItem: () => {} },
  __export__: {},
};
vm.createContext(sandbox);
try {
  // data.js を実行し、末尾で creatures を __export__ に書き出す
  vm.runInContext(
    code +
      ';__export__={creatures:typeof creatures!=="undefined"?creatures:[]};',
    sandbox,
    { timeout: 15000 },
  );
} catch (e) {}
// 趣味が「釣り」の生き物の名前だけ抽出
const names = sandbox.__export__.creatures
  .filter((c) => c.hobby === "釣り")
  .map((c) => c.name);
// catFishList などに貼り付けやすい形式で出力
console.log(names.map((n) => `  "${n}",`).join("\n"));
process.stderr.write("合計: " + names.length + "\n");
