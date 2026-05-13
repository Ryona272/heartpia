const fs = require("fs");
const vm = require("vm");
const code = fs.readFileSync("data.js", "utf8");
const sandbox = {
  console,
  document: { createElement: () => ({}) },
  localStorage: { getItem: () => null, setItem: () => {} },
  __export__: {},
};
vm.createContext(sandbox);
try {
  vm.runInContext(
    code +
      ';__export__={creatures:typeof creatures!=="undefined"?creatures:[]};',
    sandbox,
    { timeout: 15000 },
  );
} catch (e) {}
const names = sandbox.__export__.creatures
  .filter((c) => c.hobby === "釣り")
  .map((c) => c.name);
console.log(names.map((n) => `  "${n}",`).join("\n"));
process.stderr.write("合計: " + names.length + "\n");
