const fs = require("fs");
let code = fs.readFileSync("./data.js", "utf8");

// Remove export statements if any, add global assignments
code = code.replace(/^export\s+/gm, "");
eval(code);

const allItems = typeof allCreatures !== "undefined" ? allCreatures : [];
// Fallback: try to find items with tc manually
const allArrays = [
  typeof fishingCreatures !== "undefined" ? fishingCreatures : [],
  typeof insectCreatures !== "undefined" ? insectCreatures : [],
  typeof birdCreatures !== "undefined" ? birdCreatures : [],
  typeof cookingCreatures !== "undefined" ? cookingCreatures : [],
  typeof gardeningCreatures !== "undefined" ? gardeningCreatures : [],
  typeof storeIngredientCreatures !== "undefined"
    ? storeIngredientCreatures
    : [],
  typeof animalCreatures !== "undefined" ? animalCreatures : [],
  typeof otherCreatures !== "undefined" ? otherCreatures : [],
  typeof otherEventCreatures !== "undefined" ? otherEventCreatures : [],
];

const items = [];
for (const arr of allArrays) {
  for (const item of arr) {
    if (!item.rarityData) continue;
    for (const rd of item.rarityData) {
      if (rd.tc !== undefined && rd.price > 0 && rd.tc > 0) {
        const ratio = rd.price / rd.tc;
        items.push({
          name: item.name,
          star: rd.star,
          price: rd.price,
          tc: rd.tc,
          ratio,
        });
      }
    }
  }
}

items.sort((a, b) => a.ratio - b.ratio);

console.log("=== 低比率 (TC高め, ratio < 1.5) ===");
items
  .filter((i) => i.ratio < 1.5)
  .forEach((i) =>
    console.log(
      `${i.name}: price=${i.price}, tc=${i.tc}, ratio=${i.ratio.toFixed(2)}`,
    ),
  );

console.log("");
console.log("=== 高比率 (TC低め, ratio > 7.0) ===");
items
  .filter((i) => i.ratio > 7.0)
  .forEach((i) =>
    console.log(
      `${i.name}: price=${i.price}, tc=${i.tc}, ratio=${i.ratio.toFixed(2)}`,
    ),
  );

console.log("");
console.log("=== 全比率分布 ===");
const buckets = {};
for (const i of items) {
  const b = Math.floor(i.ratio * 2) / 2;
  buckets[b] = (buckets[b] || 0) + 1;
}
Object.keys(buckets)
  .sort((a, b) => a - b)
  .forEach((k) => console.log(`ratio ${k}: ${buckets[k]}件`));
