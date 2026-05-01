// =======================
// DOM 取得
// =======================
const userLevelInput = document.getElementById("userLevel");
const seasonFilter = document.getElementById("seasonFilter");
const hobbyFilter = document.getElementById("hobbyFilter");
const place1Filter = document.getElementById("place1Filter");
const place2Filter = document.getElementById("place2Filter");
const timeFilter = document.getElementById("timeFilter");
const weatherFilter = document.getElementById("weatherFilter");
const weatherMode = document.getElementById("weatherMode");
const searchInput = document.getElementById("searchInput");
const result = document.getElementById("result");
const acquiredToggle = document.getElementById("acquiredToggle");
const star5Toggle = document.getElementById("star5Toggle");
const totalCountEl = document.getElementById("totalCount");
const displayCountEl = document.getElementById("displayCount");
const acquiredCountEl = document.getElementById("acquiredCount");
const star5CountEl = document.getElementById("star5Count");
const userLevelPage2Input = document.getElementById("userLevelPage2");
const seasonFilterPage2 = document.getElementById("seasonFilterPage2");
const sortPage2Select = document.getElementById("sortPage2");
const searchInputPage2 = document.getElementById("searchInputPage2");
const hobbyFilterPage2 = document.getElementById("hobbyFilterPage2");
const hobbyModeFilterPage2 = document.getElementById("hobbyModeFilterPage2");
const resultPage2 = document.getElementById("resultPage2");
const catTabsEl = document.getElementById("catTabs");
const catNameInput = document.getElementById("catNameInput");
const catResetBtn = document.getElementById("catResetBtn");
const catVisibleCount = document.getElementById("catVisibleCount");
const cat5ExcludedToggleWrap = document.getElementById(
  "cat5ExcludedToggleWrap",
);
const cat5ExcludedToggle = document.getElementById("cat5ExcludedToggle");
const resultPage3 = document.getElementById("resultPage3");

let showAcquired = true;
let showFiveStar = true;

const PLACE1_BACKGROUND_IMAGE_NAMES = new Set([
  "森林",
  "温泉山",
  "漁村",
  "花畑",
]);

// フェス判定用定数
const FESTIVAL_SEASON_VALUES = new Set(["dreamlightfes"]);

// その他イベント判定用定数
const OTHER_EVENT_SEASON_VALUES = new Set(["otherevent"]);

// シーズン・フェスのラベルマップ
const SEASON_LABELS = {
  normal: "通常",
  snowseason: "スノーシーズン",
  dreamlightfes: "ドリームライトフェス",
  otherevent: "その他イベント",
};

function isFestivalSeason(seasonValue) {
  return FESTIVAL_SEASON_VALUES.has(seasonValue);
}

function isOtherEvent(seasonValue) {
  return OTHER_EVENT_SEASON_VALUES.has(seasonValue);
}

function isRegularSeason(seasonValue) {
  return (
    seasonValue &&
    seasonValue !== "normal" &&
    !isFestivalSeason(seasonValue) &&
    !isOtherEvent(seasonValue)
  );
}

function getPlace1BackgroundName(places1 = []) {
  if (!Array.isArray(places1) || places1.length === 0) return "";

  const selectedPlace1 = place1Filter.value;
  if (selectedPlace1 && places1.includes(selectedPlace1)) {
    return selectedPlace1;
  }

  const availablePlace = places1.find((place) =>
    PLACE1_BACKGROUND_IMAGE_NAMES.has(place),
  );
  if (availablePlace) return availablePlace;

  return (
    places1.find(
      (place) => !["水辺", "ホーム", "中心街", "★特殊"].includes(place),
    ) || places1[0]
  );
}

//図鑑の入力ミスの確認

// 場所1と場所2の結びつかないマップ
const place1ToExcludedPlace2Map = {
  郊外: [
    "森の湖",
    "温泉山の湖",
    "草原の湖",
    "浅水川",
    "霞川",
    "静川",
    "巨木の川",
  ],
  森林: [
    "郊外の湖",
    "温泉山の湖",
    "草原の湖",
    "旧海",
    "クジラ海",
    "そよ風の海",
    "海釣り",
    "浅水川",
    "霞川",
    "静川",
    "巨木の川",
  ],
  温泉山: [
    "郊外の湖",
    "森の湖",
    "草原の湖",
    "東海",
    "クジラ海",
    "そよ風の海",
    "海釣り",
    "浅水川",
    "霞川",
    "静川",
    "巨木の川",
  ],
  花畑: [
    "郊外の湖",
    "森の湖",
    "温泉山の湖",
    "東海",
    "旧海",
    "そよ風の海",
    "海釣り",
    "浅水川",
    "霞川",
    "静川",
    "巨木の川",
  ],
  漁村: ["東海", "旧海", "クジラ海", "浅水川", "霞川", "静川", "巨木の川"],
};

// =======================
// フィルター処理
// =======================
function filterCreatures() {
  const userLevel = Number(userLevelInput.value) || 1;
  const season = seasonFilter.value;
  const hobby = hobbyFilter.value;
  const place1 = place1Filter.value;
  const place2 = place2Filter.value;
  const time = timeFilter.value;
  const weather = weatherFilter.value;
  const mode = weatherMode.value; // any / only / exclude
  const keyword = searchInput.value.trim().toLowerCase();

  const filtered = creatures.filter((c) => {
    // 趣味レベル：フィルタリングしない（すべて表示する）
    // if (userLevel < c.level) return false;

    // シーズン/フェスフィルター（1つのセレクトボックスで一括管理）
    if (season) {
      if (season === "normal") {
        // 通常アイテムのみ表示（シーズン限定なし）
        if (c.season !== "normal" && isRegularSeason(c.season)) return false;
        // フェスは除外
        if (isFestivalSeason(c.season)) return false;
        // その他イベントは除外
        if (isOtherEvent(c.season)) return false;
      } else if (season === "allseason") {
        // 全てのシーズン（normal を除く）
        if (
          c.season === "normal" ||
          isFestivalSeason(c.season) ||
          isOtherEvent(c.season)
        )
          return false;
      } else if (season === "allfes") {
        // 全てのフェスを表示
        if (!isFestivalSeason(c.season)) return false;
      } else if (season === "allotherevent") {
        // 全てのその他イベントを表示
        if (!isOtherEvent(c.season)) return false;
      } else if (isRegularSeason(season)) {
        // 特定シーズン（snowseason など）+ 通常も表示
        if (c.season !== season && c.season !== "normal") return false;
      } else if (isFestivalSeason(season)) {
        // 特定フェス（dreamlightfes など）+ 通常も表示
        if (c.season !== season && c.season !== "normal") return false;
      } else if (isOtherEvent(season)) {
        // 特定その他イベント + 通常も表示
        if (c.season !== season && c.season !== "normal") return false;
      }
    }

    if (hobby && c.hobby !== hobby) return false;
    if (place1 && !c.places1?.includes(place1)) return false;
    if (place2 && !c.places2?.includes(place2)) return false;
    if (time && !c.times?.includes(time)) return false;
    if (weather) {
      const has = c.weathers?.includes(weather);
      if (mode === "any" && !has) return false; // must include selected weather
      if (mode === "only") {
        // only matches when the creature's weather list contains exactly the single value
        const list = c.weathers || [];
        if (!(list.length === 1 && list[0] === weather)) return false;
      }
      if (mode === "exclude" && has) return false;
    }
    // グローバル toggles: OFF にすると該当済みを非表示
    if (!showAcquired && c.acquired) return false;
    if (!showFiveStar && c.fiveStar) return false;

    if (keyword && !c.name.toLowerCase().includes(keyword)) return false;
    return true;
  });

  renderList(filtered, userLevel);
}

function updateToggleButtons() {
  acquiredToggle.classList.toggle("active", showAcquired);
  acquiredToggle.setAttribute("aria-pressed", showAcquired.toString());
  acquiredToggle.textContent = `獲得 ${showAcquired ? "ON" : "OFF"}`;

  star5Toggle.classList.toggle("active", showFiveStar);
  star5Toggle.setAttribute("aria-pressed", showFiveStar.toString());
  star5Toggle.textContent = `★5 ${showFiveStar ? "ON" : "OFF"}`;
}

const STORAGE_KEY = "heartpia-state-v2";
const LEGACY_STORAGE_KEY = "heartpia-state";

function saveState() {
  const payload = {
    showAcquired,
    showFiveStar,
    creatures: creatures.map((c) => ({
      name: c.name,
      acquired: !!c.acquired,
      fiveStar: !!c.fiveStar,
    })),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function loadState() {
  let raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    raw = localStorage.getItem(LEGACY_STORAGE_KEY);
  }
  if (!raw) return;
  try {
    const obj = JSON.parse(raw);
    if (typeof obj.showAcquired === "boolean") showAcquired = obj.showAcquired;
    if (typeof obj.showFiveStar === "boolean") showFiveStar = obj.showFiveStar;
    if (Array.isArray(obj.creatures)) {
      obj.creatures.forEach((stored) => {
        const target = creatures.find((c) => c.name === stored.name);
        if (!target) return;
        target.acquired = !!stored.acquired;
        target.fiveStar = !!stored.fiveStar;
      });
    }
  } catch (e) {
    console.warn("状態のロードに失敗しました", e);
  }
}

function updateCounters(shownList) {
  totalCountEl.textContent = `全件：${creatures.length}`;
  displayCountEl.textContent = `表示：${shownList.length}`;
  acquiredCountEl.textContent = `獲得：${creatures.filter((c) => c.acquired).length}`;
  star5CountEl.textContent = `★5：${creatures.filter((c) => c.fiveStar).length}`;
}

acquiredToggle.addEventListener("click", () => {
  showAcquired = !showAcquired;

  if (!showAcquired) {
    showFiveStar = false;
  }

  updateToggleButtons();
  saveState();
  filterCreatures();
});

star5Toggle.addEventListener("click", () => {
  showFiveStar = !showFiveStar;

  if (showFiveStar && !showAcquired) {
    showAcquired = true;
  }

  updateToggleButtons();
  saveState();
  filterCreatures();
});

result.addEventListener("change", (e) => {
  const target = e.target;
  const cardName = target.dataset.name;
  if (!cardName) return;

  const creature = creatures.find((c) => c.name === cardName);
  if (!creature) return;

  const card = target.closest(".card");
  const acquiredCheckbox = card?.querySelector(".card-acquired-checkbox");
  const star5Checkbox = card?.querySelector(".card-star5-checkbox");

  if (target.classList.contains("card-acquired-checkbox")) {
    creature.acquired = target.checked;

    if (!target.checked) {
      creature.fiveStar = false;
      if (star5Checkbox) star5Checkbox.checked = false;
    }
  }

  if (target.classList.contains("card-star5-checkbox")) {
    creature.fiveStar = target.checked;

    if (target.checked) {
      creature.acquired = true;
      if (acquiredCheckbox) acquiredCheckbox.checked = true;
    }
  }

  saveState();
  filterCreatures();
});

updateToggleButtons();

// =======================
// 場所1・場所2の選択肢更新
// =======================
function updatePlace1Options() {
  const hobby = hobbyFilter.value;
  place1Filter.innerHTML = "";
  const optAll = document.createElement("option");
  optAll.value = "";
  optAll.textContent = "すべて";
  place1Filter.appendChild(optAll);

  const places = new Set();
  creatures
    .filter((c) => !hobby || c.hobby === hobby)
    .forEach((c) => c.places1?.forEach((p) => places.add(p)));

  // 優先度順の配列
  const priorityOrder = [
    "森林",
    "温泉山",
    "花畑",
    "漁村",
    "中心街",
    "郊外",
    "ホーム",
    "水辺",
    "★特殊",
  ];

  // 存在する場所のみを優先順に並べる
  const sortedPlaces = priorityOrder.filter((p) => places.has(p));

  sortedPlaces.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = p;
    place1Filter.appendChild(opt);
  });
}

function updatePlace2Options() {
  const hobby = hobbyFilter.value;
  const place1 = place1Filter.value;

  place2Filter.innerHTML = "";
  const optAll = document.createElement("option");
  optAll.value = "";
  optAll.textContent = "すべて";
  place2Filter.appendChild(optAll);

  const places = new Set();
  creatures
    .filter((c) => !hobby || c.hobby === hobby)
    .filter((c) => !place1 || c.places1?.includes(place1))
    .forEach((c) => c.places2?.forEach((p) => places.add(p)));

  // 場所1が選択されている場合、結びつかない場所2を除外
  if (place1) {
    const excluded = place1ToExcludedPlace2Map[place1] || [];
    places.forEach((p) => {
      if (excluded.includes(p)) {
        places.delete(p);
      }
    });
  }

  // 優先度順の配列
  const priorityOrder2 = [
    "コジカ塔",
    "不思議な松林",
    "ジャンプステージ",
    "森の島",
    "遺跡",
    "火山湖",
    "温泉",
    "石海岸の崖",
    "クジラ山",
    "風車の花畑",
    "パープルビーチ",
    "灯台",
    "波止場",
    "漁村広場",
    "漁村東桟橋",
    "巨木の川",
    "静川",
    "霞川",
    "浅水川",
    "郊外の湖",
    "森の湖",
    "温泉山の湖",
    "草原の湖",
    "東海",
    "旧海",
    "クジラ海",
    "そよ風の海",
    "海釣り",
    "虫コイコイ",
    "巣ごもり",
    "虫寄せ装置",
    "ブランクの頭",
  ];

  // 存在する場所のみを優先順に並べる
  const sortedPlaces = priorityOrder2.filter((p) => places.has(p));

  sortedPlaces.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = p;
    place2Filter.appendChild(opt);
  });
}

// =======================
// 描画処理（2列グリッド）
// =======================
function renderList(list, userLevel) {
  if (list.length === 0) {
    result.innerHTML = "<p>条件に合う生き物がいません。</p>";
    return;
  }

  // シーズン値ごとにグループ化（フェス → シーズン → 通常 → その他イベントの順）
  const festivalSeasonValues = [
    ...new Set(
      list.filter((c) => isFestivalSeason(c.season)).map((c) => c.season),
    ),
  ];
  const regularSeasonValues = [
    ...new Set(
      list.filter((c) => isRegularSeason(c.season)).map((c) => c.season),
    ),
  ];
  const normalGroup = list.filter((c) => c.season === "normal");
  const otherEventSeasonValues = [
    ...new Set(list.filter((c) => isOtherEvent(c.season)).map((c) => c.season)),
  ];

  // 各趣味で★2換算売値が最高のカードを特定
  const RANKED_HOBBIES = ["釣り", "虫捕り", "野鳥観察"];
  const _getStar2DisplayPrice = (c) => {
    if (!Array.isArray(c.rarityData) || c.rarityData.length === 0) return 0;
    if (c.hobby === "野鳥観察") {
      const s2 = c.rarityData.find((r) => r.star === 2);
      const s1 = c.rarityData.find((r) => r.star === 1);
      return s2?.price ?? (s1 ? s1.price * 4 : 0);
    }
    const s1 = c.rarityData.find((r) => r.star === 1);
    return s1 ? Math.floor(s1.price * 1.5) : 0;
  };
  const topPriceNames = new Set();
  RANKED_HOBBIES.forEach((hobby) => {
    const hobbyItems = list.filter((c) => c.hobby === hobby && c.level <= userLevel);
    if (hobbyItems.length === 0) return;
    let topPrice = -1;
    let topName = null;
    hobbyItems.forEach((c) => {
      const p = _getStar2DisplayPrice(c);
      if (p > topPrice) { topPrice = p; topName = c.name; }
    });
    if (topName) topPriceNames.add(topName);
  });

  // カード生成用ヘルパー関数
  const generateCard = (c) => {
    const isTopPrice = topPriceNames.has(c.name);
    const unlocked = userLevel >= c.level;
    let hobbyClass = "";
    if (c.hobby === "釣り") {
      hobbyClass = unlocked ? "card-fishing-unlocked" : "card-fishing-locked";
    } else if (c.hobby === "虫捕り") {
      hobbyClass = unlocked ? "card-insect-unlocked" : "card-insect-locked";
    } else if (c.hobby === "野鳥観察") {
      hobbyClass = unlocked ? "card-bird-unlocked" : "card-bird-locked";
    }
    const cardClass = `card ${hobbyClass}`;
    const placeBackgroundName = getPlace1BackgroundName(c.places1);
    const placeBackgroundMarkup = placeBackgroundName
      ? `<img class="card-place-bg" src="img/${placeBackgroundName}.png" alt="" aria-hidden="true" loading="lazy" onerror="this.remove()">`
      : "";

    const metaLines = [];
    if (c.places1?.length) {
      metaLines.push(`場所1：${c.places1.join(" / ")}`);
    }
    if (c.places2?.length) {
      metaLines.push(`場所2：${c.places2.join(" / ")}`);
    }
    if (c.times) {
      metaLines.push(
        `時間：${c.times
          .map((t) => {
            switch (t) {
              case "00-06":
                return "00:00〜06:00";
              case "06-12":
                return "06:00〜12:00";
              case "12-18":
                return "12:00〜18:00";
              case "18-00":
                return "18:00〜00:00";
              default:
                return t;
            }
          })
          .join(" / ")}`,
      );
    }
    if (c.weathers) {
      metaLines.push(`天候：${c.weathers.join(" / ")}`);
    }

    const star1Data = c.rarityData.find((r) => r.star === 1);
    const star2Data = c.rarityData.find((r) => r.star === 2);
    const baseStar1 = star1Data?.price ?? 0;
    const baseStar2 = star2Data?.price ?? (star1Data ? star1Data.price * 4 : 0);
    const baseStar1Tc = star1Data?.tc ?? 0;
    const baseStar2Tc =
      star2Data?.tc ?? (star1Data ? (star1Data.tc ?? 0) * 4 : 0);

    const rarityBlocks = [1, 2, 3, 4, 5]
      .map((star) => {
        const rarity = c.rarityData.find((r) => r.star === star);
        const original = rarity?.price ?? 0;
        const originalTc = rarity?.tc ?? 0;
        let calculatedPrice = 0;
        let calculatedTc = 0;

        if (c.hobby === "野鳥観察") {
          const base = baseStar2;
          const tcBase = baseStar2Tc;
          switch (star) {
            case 1:
              calculatedPrice = Math.floor(base / 4);
              calculatedTc = Math.floor(tcBase / 4);
              break;
            case 2:
              calculatedPrice = base;
              calculatedTc = tcBase;
              break;
            case 3:
              calculatedPrice = base * 2;
              calculatedTc = tcBase * 2;
              break;
            case 4:
              calculatedPrice = base * 4;
              calculatedTc = tcBase * 4;
              break;
            case 5:
              calculatedPrice = base * 8;
              calculatedTc = tcBase * 8;
              break;
          }
        } else {
          const multiplier = { 2: 1.5, 3: 2, 4: 4, 5: 8 };
          if (star === 1) {
            calculatedPrice = baseStar1;
            calculatedTc = baseStar1Tc;
          } else {
            calculatedPrice = Math.floor(baseStar1 * (multiplier[star] || 0));
            calculatedTc = Math.floor(baseStar1Tc * (multiplier[star] || 0));
          }
        }

        const price = original > 0 ? original : calculatedPrice;
        const tc = originalTc > 0 ? originalTc : calculatedTc;
        const showTc = c.season !== "normal" && !isOtherEvent(c.season);
        return `
      <div class="rarity-block">
        <span class="badge">★${star} 売値：${price}G${showTc ? ` / TC：${tc}C` : ""}</span>
      </div>
    `;
      })
      .join("");

    const noteLines = getNoteLines(c.note);

    return `
      <div class="card card-flip${isTopPrice ? " card-top-price" : ""}" role="button" tabindex="0" aria-label="${c.name}の詳細カードを裏返す">
        <div class="card-inner">
          <div class="card-front ${cardClass}">
            ${placeBackgroundMarkup}
            ${c.img ? `<img class="card-img" src="${c.img}" alt="${c.name}">` : ""}
            <div class="card-header">
              <span class="card-name">${c.name}</span>
              <span class="card-category">（${c.hobby}）<span class="card-level">Lv.${c.level}</span></span>
            </div>
            ${metaLines.length ? `<div class="meta">${metaLines.join("<br>")}</div>` : ""}
            <div class="card-control-row">
              <label><input type="checkbox" class="card-acquired-checkbox" data-name="${c.name}" ${c.acquired ? "checked" : ""} /> 獲得</label>
              <label><input type="checkbox" class="card-star5-checkbox" data-name="${c.name}" ${c.fiveStar ? "checked" : ""} /> ★5</label>
            </div>
          </div>
          <div class="card-back ${cardClass}">
            ${placeBackgroundMarkup}
            <div class="rarity-list">
              ${rarityBlocks}
            </div>
            ${noteLines.length ? `<div class="note">備考：${noteLines.join("<br>")}</div>` : ""}
          </div>
        </div>
      </div>
    `;
  };

  // グループごとにセクションを作成
  let html = "";

  festivalSeasonValues.forEach((season) => {
    const group = list.filter((c) => c.season === season);
    const label = SEASON_LABELS[season] || season;
    html += `<div class="creature-group"><h2>${label}</h2><div class="creature-group-content">${group.map(generateCard).join("")}</div></div>`;
  });

  regularSeasonValues.forEach((season) => {
    const group = list.filter((c) => c.season === season);
    const label = SEASON_LABELS[season] || season;
    html += `<div class="creature-group"><h2>${label}</h2><div class="creature-group-content">${group.map(generateCard).join("")}</div></div>`;
  });

  otherEventSeasonValues.forEach((season) => {
    const group = list.filter((c) => c.season === season);
    const label = SEASON_LABELS[season] || season;
    html += `<div class="creature-group"><h2>${label}</h2><div class="creature-group-content">${group.map(generateCard).join("")}</div></div>`;
  });

  if (normalGroup.length > 0) {
    html += `<div class="creature-group"><h2>通常</h2><div class="creature-group-content">${normalGroup.map(generateCard).join("")}</div></div>`;
  }

  result.innerHTML = html;
  updateCounters(list);
}

// =======================
// ページ2（園芸・料理・販売食材）
// =======================
function getSellPrice(item) {
  if (isPage2StoreIngredient(item)) {
    return item.price?.sell ?? Number.MAX_SAFE_INTEGER;
  }
  if (!Array.isArray(item.rarityData) || item.rarityData.length === 0) return 0;
  const star1 = item.rarityData.find((r) => r.star === 1);
  return star1?.price ?? item.rarityData[0].price ?? 0;
}

function getPage2SortValue(item, sortKey) {
  if (sortKey === "level") return item.level ?? Number.MAX_SAFE_INTEGER;
  if (sortKey === "seedprice") {
    return item.seedprice ?? Number.MAX_SAFE_INTEGER;
  }
  if (sortKey === "time") return item.time ?? Number.MAX_SAFE_INTEGER;
  if (sortKey === "sell") return getSellPrice(item);
  return item.level ?? Number.MAX_SAFE_INTEGER;
}

const INGREDIENT_IMAGE_FOLDERS = [
  "img/store-ingredient",
  "img/gardening",
  "img/cooking",
  "img/fish",
  "img/insect",
  "img/bird",
];

function buildIngredientImageCandidates(ingredientName) {
  const encodedName = encodeURIComponent(ingredientName);
  return INGREDIENT_IMAGE_FOLDERS.map(
    (folder) => `${folder}/${encodedName}.png`,
  );
}

function renderFoodItemsWithImages(foodItems = []) {
  if (!Array.isArray(foodItems) || foodItems.length === 0) return "";

  const chips = foodItems
    .map((foodName) => {
      const candidates = buildIngredientImageCandidates(foodName);
      const fallbackData = encodeURIComponent(JSON.stringify(candidates));
      return `
        <span class="food-chip">
          <img class="food-chip-img" src="${candidates[0]}" alt="${foodName}" data-fallbacks="${fallbackData}" data-fallback-index="0" onerror="switchIngredientImageSource(this)">
          <span class="food-chip-text">${foodName}</span>
        </span>
      `;
    })
    .join("");

  return `
    <div class="food-items-wrap">
      <span class="food-items-label">食材：</span>
      <div class="food-items">${chips}</div>
    </div>
  `;
}

window.switchIngredientImageSource = function switchIngredientImageSource(img) {
  const fallbackRaw = img.getAttribute("data-fallbacks");
  if (!fallbackRaw) {
    img.style.display = "none";
    return;
  }

  let fallbackList;
  try {
    fallbackList = JSON.parse(decodeURIComponent(fallbackRaw));
  } catch {
    img.style.display = "none";
    return;
  }

  const currentIndex = Number(img.getAttribute("data-fallback-index") || "0");
  const nextIndex = currentIndex + 1;
  if (!Array.isArray(fallbackList) || nextIndex >= fallbackList.length) {
    img.style.display = "none";
    return;
  }

  img.setAttribute("data-fallback-index", String(nextIndex));
  img.src = fallbackList[nextIndex];
};

function getPage2HobbyParts(item) {
  if (Array.isArray(item.hobby)) return item.hobby;
  if (typeof item.hobby !== "string") return [];
  if (item.hobby.includes("-")) return item.hobby.split("-");
  return [item.hobby];
}

function getNoteLines(note) {
  if (Array.isArray(note)) {
    return note
      .map((line) =>
        typeof line === "string" ? line.trim() : String(line ?? "").trim(),
      )
      .filter(Boolean);
  }
  if (typeof note === "string" && note.trim()) return [note.trim()];
  return [];
}

function formatPage2HobbyLabel(item) {
  return getPage2HobbyParts(item).join("-");
}

function hasPage2Hobby(item, hobbyValue) {
  if (!hobbyValue) return true;
  if (hobbyValue === "販売食材") return isPage2StoreIngredient(item);
  return getPage2HobbyParts(item).includes(hobbyValue);
}

function isPage2Gardening(item) {
  return getPage2HobbyParts(item)[0] === "園芸";
}

function isPage2GardeningFood(item) {
  const hobbyParts = getPage2HobbyParts(item);
  return hobbyParts[0] === "園芸" && hobbyParts.includes("食材");
}

function isPage2GardeningFlower(item) {
  const hobbyParts = getPage2HobbyParts(item);
  return hobbyParts[0] === "園芸" && hobbyParts.includes("花");
}

function isPage2StoreIngredient(item) {
  const hobbyParts = getPage2HobbyParts(item);
  return (
    hobbyParts.length === 2 &&
    hobbyParts[1] === "食材" &&
    (hobbyParts[0] === "採取" || hobbyParts[0] === "販売")
  );
}

function isPage2Cooking(item) {
  return getPage2HobbyParts(item)[0] === "料理";
}

const COOKING_WAGON_IMAGE_BY_TYPE = {
  stove: "img/コンロ.png",
  "penguin-stove": "img/ペンギンコンロ.png",
  "popcorn-wagon": "img/ポップコーン移動ワゴン.png",
};

function getPage2CookingWagonImage(item) {
  if (!isPage2Cooking(item)) return "";

  const wagonType = item.wagon || "stove";
  if (wagonType === "none") return "";

  return (
    COOKING_WAGON_IMAGE_BY_TYPE[wagonType] || COOKING_WAGON_IMAGE_BY_TYPE.stove
  );
}

function getPage2CardClass(item, userLevel) {
  const unlocked = userLevel >= (item.level ?? 1);
  if (isPage2Gardening(item)) {
    return unlocked
      ? "card-garden-flower-unlocked"
      : "card-garden-flower-locked";
  }
  if (isPage2StoreIngredient(item)) {
    return unlocked ? "card-ingredient-unlocked" : "card-ingredient-locked";
  }
  return unlocked ? "card-cooking-unlocked" : "card-cooking-locked";
}

function getRarityPriceLikeFishing(item, star) {
  const star1 = item.rarityData?.find((r) => r.star === 1)?.price ?? 0;
  const original = item.rarityData?.find((r) => r.star === star)?.price ?? 0;
  if (original > 0) return original;

  if (star === 1) return star1;

  if (isPage2GardeningFlower(item)) {
    const multiplier = { 2: 1.5, 3: 2, 4: 2.5, 5: 4 };
    const calculated = star1 * (multiplier[star] || 0);
    return Math.ceil(calculated / 5) * 5;
  }

  if (isPage2GardeningFood(item)) {
    const multiplier = { 2: 1.34, 3: 1.67, 4: 2, 5: 3 };
    return Math.floor(star1 * (multiplier[star] || 0));
  }

  const multiplier = { 2: 1.5, 3: 2, 4: 4, 5: 8 };
  return Math.floor(star1 * (multiplier[star] || 0));
}

function getRarityTcLikeFishing(item, star) {
  const star1 = item.rarityData?.find((r) => r.star === 1)?.tc ?? 0;
  const original = item.rarityData?.find((r) => r.star === star)?.tc ?? 0;
  if (original > 0) return original;

  if (star === 1) return star1;

  if (isPage2GardeningFlower(item)) {
    const multiplier = { 2: 1.5, 3: 2, 4: 2.5, 5: 4 };
    const calculated = star1 * (multiplier[star] || 0);
    return Math.ceil(calculated / 5) * 5;
  }

  if (isPage2GardeningFood(item)) {
    const multiplier = { 2: 1.34, 3: 1.67, 4: 2, 5: 3 };
    return Math.floor(star1 * (multiplier[star] || 0));
  }

  const multiplier = { 2: 1.5, 3: 2, 4: 4, 5: 8 };
  return Math.floor(star1 * (multiplier[star] || 0));
}

function renderPage2List(targetEl, list, userLevel) {
  if (!targetEl) return;

  if (list.length === 0) {
    targetEl.innerHTML = `<p>条件に一致するデータがありません。</p>`;
    return;
  }

  const generateItemCard = (item) => {
    const cardClass = getPage2CardClass(item, userLevel);
    const metaLines = [];
    const isStoreIngredient = isPage2StoreIngredient(item);
    const cookingWagonImage = getPage2CookingWagonImage(item);
    const cookingWagonMarkup = cookingWagonImage
      ? `<img class="card-place-bg" src="${cookingWagonImage}" alt="" aria-hidden="true" loading="lazy" onerror="this.remove()">`
      : "";

    if (item.seedprice != null) {
      metaLines.push(`種の値段：${item.seedprice}G`);
    }
    if (item.time != null) {
      metaLines.push(`採取時間：${formatHourToJpTime(item.time)}`);
    }
    if (item.staminaRecovery != null) {
      const staminaStr = String(item.staminaRecovery).replace(
        /^(\d+)\*(\d+)$/,
        "$1×$2",
      );
      metaLines.push(`スタミナ回復量：${staminaStr}`);
    }
    if (item.buff != null) {
      metaLines.push(`効果(バフ)：${item.buff}`);
    }
    const foodItemsMarkup = renderFoodItemsWithImages(item.food);
    const noteLines = getNoteLines(item.note);

    const hasRarityData =
      Array.isArray(item.rarityData) && item.rarityData.length > 0;
    const backContent = isStoreIngredient
      ? `<div class="note">買値：${item.price?.buy ?? "データなし"}${item.price?.buy != null ? "G" : ""}<br>売値：${item.price?.sell ?? "データなし"}${item.price?.sell != null ? "G" : ""}</div>`
      : hasRarityData
        ? (item.noRank ? [1] : [1, 2, 3, 4, 5])
            .map((star) => {
              const price = getRarityPriceLikeFishing(item, star);
              const tc = getRarityTcLikeFishing(item, star);
              const showTc =
                item.season !== "normal" && !isOtherEvent(item.season);
              return `
      <div class="rarity-block">
        <span class="badge">★${star} 売値：${price}G${showTc ? ` / TC：${tc}C` : ""}</span>
      </div>
    `;
            })
            .join("")
        : '<div class="note">売値データなし</div>';

    return `
        <article class="card card-flip" role="button" tabindex="0" aria-label="${item.name}の詳細カードを裏返す">
          <div class="card-inner">
            <div class="card-front ${cardClass}">
              ${cookingWagonMarkup}
              ${item.img ? `<img class="card-img" src="${item.img}" alt="${item.name}">` : ""}
              <div class="card-header">
                <span class="card-name">${item.name}</span>
                <span class="card-category">（${formatPage2HobbyLabel(item)}）<span class="card-level">Lv.${item.level}</span></span>
              </div>
              ${metaLines.length ? `<div class="meta">${metaLines.join("<br>")}</div>` : ""}
              ${foodItemsMarkup}
            </div>
            <div class="card-back ${cardClass}">
              ${cookingWagonMarkup}
              <div class="rarity-list">
                ${backContent}
              </div>
              ${noteLines.length ? `<div class="note">備考：${noteLines.join("<br>")}</div>` : ""}
            </div>
          </div>
        </article>
      `;
  };

  const renderCategoryGroup = (title, items) => {
    if (items.length === 0) return "";
    return `<div class="page2-subgroup"><h4 class="page2-subgroup-title">${title}</h4><div class="creature-group-content">${items.map(generateItemCard).join("")}</div></div>`;
  };

  const renderSeasonGroup = (seasonLabel, seasonItems) => {
    const gardeningItems = seasonItems.filter((item) => isPage2Gardening(item));
    const cookingItems = seasonItems.filter((item) => isPage2Cooking(item));
    const storeItems = seasonItems.filter((item) =>
      isPage2StoreIngredient(item),
    );

    const categoryHtml = [
      renderCategoryGroup("園芸", gardeningItems),
      renderCategoryGroup("料理", cookingItems),
      renderCategoryGroup("採取・販売食材", storeItems),
    ]
      .filter(Boolean)
      .join("");

    if (!categoryHtml) return "";
    return `<div class="creature-group"><h3>${seasonLabel}</h3>${categoryHtml}</div>`;
  };

  // シーズン値ごとにグループ化（フェス → シーズン → その他イベント → 通常 の順）
  const festivalSeasonValues = [
    ...new Set(
      list.filter((c) => isFestivalSeason(c.season)).map((c) => c.season),
    ),
  ];
  const regularSeasonValues = [
    ...new Set(
      list.filter((c) => isRegularSeason(c.season)).map((c) => c.season),
    ),
  ];
  const normalGroup = list.filter((c) => c.season === "normal");
  const otherEventSeasonValues = [
    ...new Set(list.filter((c) => isOtherEvent(c.season)).map((c) => c.season)),
  ];

  let html = "";

  festivalSeasonValues.forEach((season) => {
    const group = list.filter((c) => c.season === season);
    const label = SEASON_LABELS[season] || season;
    html += renderSeasonGroup(label, group);
  });

  regularSeasonValues.forEach((season) => {
    const group = list.filter((c) => c.season === season);
    const label = SEASON_LABELS[season] || season;
    html += renderSeasonGroup(label, group);
  });

  otherEventSeasonValues.forEach((season) => {
    const group = list.filter((c) => c.season === season);
    const label = SEASON_LABELS[season] || season;
    html += renderSeasonGroup(label, group);
  });

  if (normalGroup.length > 0) {
    html += renderSeasonGroup("通常", normalGroup);
  }

  targetEl.innerHTML = html;
}

function getPage2SubType(item) {
  const hobbyParts = getPage2HobbyParts(item);
  const root = hobbyParts[0];

  if (root === "園芸") {
    if (hobbyParts.includes("花")) return "花";
    if (hobbyParts.includes("食材")) return "園芸食材";
  }

  if (root === "料理") {
    if (hobbyParts.includes("食材")) return "料理食材";
    return "料理のみ";
  }

  if (isPage2StoreIngredient(item)) {
    if (root === "採取") return "採取食材";
    if (root === "販売") return "販売食材";
  }

  return "";
}

function updatePage2SubFilterOptions() {
  if (!hobbyFilterPage2 || !hobbyModeFilterPage2) return;

  const primary = hobbyFilterPage2.value;
  let options = [{ value: "", label: "すべて" }];

  const allSubTypes = [
    { value: "花", label: "花" },
    { value: "園芸食材", label: "園芸食材" },
    { value: "料理のみ", label: "料理のみ" },
    { value: "料理食材", label: "料理食材" },
    { value: "採取食材", label: "採取食材" },
    { value: "販売食材", label: "販売食材" },
  ];

  if (primary === "園芸") {
    options = [
      { value: "", label: "すべて" },
      { value: "花", label: "花" },
      { value: "園芸食材", label: "園芸食材" },
    ];
  } else if (primary === "料理") {
    options = [
      { value: "", label: "すべて" },
      { value: "料理のみ", label: "料理のみ" },
      { value: "料理食材", label: "料理食材" },
    ];
  } else if (primary === "採取・販売") {
    options = [
      { value: "", label: "すべて" },
      { value: "採取食材", label: "採取食材" },
      { value: "販売食材", label: "販売食材" },
    ];
  } else {
    options = [{ value: "", label: "すべて" }, ...allSubTypes];
  }

  hobbyModeFilterPage2.innerHTML = options
    .map((opt) => `<option value="${opt.value}">${opt.label}</option>`)
    .join("");
}

function filterAndRenderPage2() {
  if (
    !resultPage2 ||
    !userLevelPage2Input ||
    !sortPage2Select ||
    !searchInputPage2 ||
    !hobbyFilterPage2 ||
    !hobbyModeFilterPage2 ||
    !seasonFilterPage2
  ) {
    return;
  }

  const userLevel = Number(userLevelPage2Input.value) || 1;
  const season = seasonFilterPage2.value;
  const keyword = searchInputPage2.value.trim().toLowerCase();
  const sortKey = sortPage2Select.value;
  const primary = hobbyFilterPage2.value;
  const secondary = hobbyModeFilterPage2.value;

  const filtered = page2Creatures.filter((item) => {
    if (keyword && !item.name.toLowerCase().includes(keyword)) return false;

    // シーズン/フェスフィルター（1つのセレクトボックスで一括管理）
    if (season) {
      if (season === "normal") {
        // 通常アイテムのみ表示（シーズン限定なし）
        if (item.season !== "normal" && isRegularSeason(item.season))
          return false;
        // フェスは除外
        if (isFestivalSeason(item.season)) return false;
        // その他イベントは除外
        if (isOtherEvent(item.season)) return false;
      } else if (season === "allseason") {
        // 全てのシーズン（normal を除く）
        if (
          item.season === "normal" ||
          isFestivalSeason(item.season) ||
          isOtherEvent(item.season)
        )
          return false;
      } else if (season === "allfes") {
        // 全てのフェスを表示
        if (!isFestivalSeason(item.season)) return false;
      } else if (season === "allotherevent") {
        // 全てのその他イベントを表示
        if (!isOtherEvent(item.season)) return false;
      } else if (isRegularSeason(season)) {
        // 特定シーズン（snowseason など）+ 通常も表示
        if (item.season !== season && item.season !== "normal") return false;
      } else if (isFestivalSeason(season)) {
        // 特定フェス（dreamlightfes など）+ 通常も表示
        if (item.season !== season && item.season !== "normal") return false;
      } else if (isOtherEvent(season)) {
        // 特定その他イベント + 通常も表示
        if (item.season !== season && item.season !== "normal") return false;
      }
    }

    if (primary === "園芸" && !isPage2Gardening(item)) return false;
    if (primary === "料理" && !isPage2Cooking(item)) return false;
    if (primary === "採取・販売" && !isPage2StoreIngredient(item)) return false;

    if (secondary) {
      if (getPage2SubType(item) !== secondary) return false;
    }

    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    const diff = getPage2SortValue(a, sortKey) - getPage2SortValue(b, sortKey);
    if (diff !== 0) return diff;
    return page2Creatures.indexOf(a) - page2Creatures.indexOf(b);
  });

  renderPage2List(resultPage2, sorted, userLevel);
}

function initPage2() {
  if (
    !resultPage2 ||
    !userLevelPage2Input ||
    !sortPage2Select ||
    !searchInputPage2 ||
    !hobbyFilterPage2 ||
    !hobbyModeFilterPage2 ||
    !seasonFilterPage2
  ) {
    return;
  }

  userLevelPage2Input.addEventListener("change", filterAndRenderPage2);
  seasonFilterPage2.addEventListener("change", filterAndRenderPage2);
  sortPage2Select.addEventListener("change", filterAndRenderPage2);
  searchInputPage2.addEventListener("input", filterAndRenderPage2);
  hobbyFilterPage2.addEventListener("change", () => {
    updatePage2SubFilterOptions();
    filterAndRenderPage2();
  });
  hobbyModeFilterPage2.addEventListener("change", filterAndRenderPage2);

  updatePage2SubFilterOptions();
  filterAndRenderPage2();
}

// =======================
// ページ3（にゃんこの好物）
// =======================
const PAGE3_STORAGE_KEY = "heartpia-page3-cat-state-v1";
const CAT_SLOT_COUNT = 5;
const catSpecialItems = [
  { name: "キャットフード", img: "img/キャットフード.png" },
  { name: "動物汎用エサ", img: "img/動物汎用エサ.png" },
];
const normalFishCandidates = [
  ...catSpecialItems,
  ...fishingCreatures.filter((fish) => (fish.season || "normal") === "normal"),
];
const normalFishNameSet = new Set(
  normalFishCandidates.map((fish) => fish.name),
);

function createDefaultCatState(index) {
  return {
    name: `猫${index + 1}`,
    excludedFishNames: [],
    favoriteFishNames: [],
  };
}

function createDefaultCatStates() {
  return Array.from({ length: CAT_SLOT_COUNT }, (_, index) =>
    createDefaultCatState(index),
  );
}

let activeCatIndex = 0;
let catStates = createDefaultCatStates();
let showCat5ExcludedOnly = false;

function getActiveCatState() {
  return catStates[activeCatIndex] || createDefaultCatState(activeCatIndex);
}

function savePage3State() {
  localStorage.setItem(
    PAGE3_STORAGE_KEY,
    JSON.stringify({
      activeCatIndex,
      showCat5ExcludedOnly,
      catStates,
    }),
  );
}

function loadPage3State() {
  const raw = localStorage.getItem(PAGE3_STORAGE_KEY);
  if (!raw) return;

  try {
    const parsed = JSON.parse(raw);
    const nextStates = createDefaultCatStates();

    if (Array.isArray(parsed.catStates)) {
      parsed.catStates.slice(0, CAT_SLOT_COUNT).forEach((cat, index) => {
        const defaultState = createDefaultCatState(index);
        const name =
          typeof cat?.name === "string" && cat.name.trim()
            ? cat.name.trim().slice(0, 20)
            : defaultState.name;

        const excludedFishNames = Array.isArray(cat?.excludedFishNames)
          ? cat.excludedFishNames
              .filter((fishName) => typeof fishName === "string")
              .filter((fishName) => normalFishNameSet.has(fishName))
          : [];

        const favoriteFishNames = Array.isArray(cat?.favoriteFishNames)
          ? cat.favoriteFishNames
              .filter((fishName) => typeof fishName === "string")
              .filter((fishName) => normalFishNameSet.has(fishName))
          : [];

        const favoriteSet = new Set(favoriteFishNames);
        const cleanedExcluded = excludedFishNames.filter(
          (fishName) => !favoriteSet.has(fishName),
        );

        nextStates[index] = {
          name,
          excludedFishNames: [...new Set(cleanedExcluded)],
          favoriteFishNames: [...favoriteSet],
        };
      });
    }

    catStates = nextStates;

    if (
      Number.isInteger(parsed.activeCatIndex) &&
      parsed.activeCatIndex >= 0 &&
      parsed.activeCatIndex < CAT_SLOT_COUNT
    ) {
      activeCatIndex = parsed.activeCatIndex;
    }

    if (typeof parsed.showCat5ExcludedOnly === "boolean") {
      showCat5ExcludedOnly = parsed.showCat5ExcludedOnly;
    }
  } catch (error) {
    console.warn("ページ3の状態ロードに失敗しました", error);
  }
}

function updateCat5ExcludedToggleUi() {
  if (!cat5ExcludedToggleWrap || !cat5ExcludedToggle) return;

  cat5ExcludedToggleWrap.classList.add("visible");
  cat5ExcludedToggleWrap.setAttribute("aria-hidden", "false");
  cat5ExcludedToggle.disabled = false;
  cat5ExcludedToggle.classList.remove("is-disabled");
  cat5ExcludedToggle.classList.toggle("active", showCat5ExcludedOnly);
  cat5ExcludedToggle.setAttribute("aria-pressed", String(showCat5ExcludedOnly));
  cat5ExcludedToggle.textContent = `好物じゃない表示 ${showCat5ExcludedOnly ? "ON" : "OFF"}`;
}

function updateCatTabsUi() {
  if (!catTabsEl) return;

  catTabsEl.querySelectorAll(".cat-tab").forEach((btn) => {
    const index = Number(btn.dataset.catIndex || "0");
    const state = catStates[index] || createDefaultCatState(index);
    btn.textContent = state.name || `猫${index + 1}`;
    const isActive = index === activeCatIndex;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });

  if (catNameInput) {
    catNameInput.value = getActiveCatState().name || "";
  }

  updateCat5ExcludedToggleUi();
}

function renderPage3FishList() {
  if (!resultPage3) return;

  const activeState = getActiveCatState();
  const excludedSet = new Set(activeState.excludedFishNames || []);
  const favoriteSet = new Set(activeState.favoriteFishNames || []);
  const shouldShowExcludedOnly = showCat5ExcludedOnly;

  const visibleFish = shouldShowExcludedOnly
    ? normalFishCandidates.filter((fish) => excludedSet.has(fish.name))
    : normalFishCandidates.filter((fish) => !excludedSet.has(fish.name));

  if (catVisibleCount) {
    const label = shouldShowExcludedOnly ? "好物じゃない" : "候補";
    catVisibleCount.textContent = `${label}：${visibleFish.length}匹`;
  }

  if (visibleFish.length === 0) {
    resultPage3.innerHTML =
      '<p class="cat-empty">表示できる魚がありません。リセットで戻せます。</p>';
    return;
  }

  resultPage3.innerHTML = visibleFish
    .map((fish) => {
      const isFavorite = favoriteSet.has(fish.name);
      const isExcluded = excludedSet.has(fish.name);
      return `
      <article class="cat-fish-card ${isFavorite ? "cat-fish-card-favorite" : ""}">
        ${fish.img ? `<img class="cat-fish-img" src="${fish.img}" alt="${fish.name}" loading="lazy" onerror="this.remove()">` : ""}
        <div class="cat-fish-name">${fish.name}</div>
        ${
          isFavorite
            ? `<div class="cat-fish-favorite-wrap">
          <div class="cat-fish-favorite-badge">好物</div>
          <label class="cat-fish-toggle cat-fish-unfavorite-toggle">
            <input type="checkbox" class="cat-fish-unfavorite-checkbox" data-fish-name="${fish.name}">
            やっぱり違った…
          </label>
        </div>`
            : `<div class="cat-fish-toggle-row">
          <label class="cat-fish-toggle">
            <input type="checkbox" class="cat-fish-exclude-checkbox" data-fish-name="${fish.name}" ${isExcluded ? "checked" : ""}>
            好物じゃない
          </label>
          <label class="cat-fish-toggle">
            <input type="checkbox" class="cat-fish-favorite-checkbox" data-fish-name="${fish.name}">
            好物♡
          </label>
        </div>`
        }
      </article>
    `;
    })
    .join("");
}

function initPage3() {
  if (!catTabsEl || !catNameInput || !catResetBtn || !resultPage3) return;

  loadPage3State();
  updateCatTabsUi();
  renderPage3FishList();

  catTabsEl.addEventListener("click", (event) => {
    const target = event.target.closest(".cat-tab");
    if (!target) return;

    const index = Number(target.dataset.catIndex || "0");
    if (!Number.isInteger(index) || index < 0 || index >= CAT_SLOT_COUNT) {
      return;
    }

    activeCatIndex = index;
    updateCatTabsUi();
    renderPage3FishList();
    savePage3State();
  });

  if (cat5ExcludedToggle) {
    cat5ExcludedToggle.addEventListener("click", () => {
      showCat5ExcludedOnly = !showCat5ExcludedOnly;
      updateCat5ExcludedToggleUi();
      renderPage3FishList();
      savePage3State();
    });
  }

  catNameInput.addEventListener("input", () => {
    const current = getActiveCatState();
    current.name = catNameInput.value.slice(0, 20);
    updateCatTabsUi();
    savePage3State();
  });

  catResetBtn.addEventListener("click", () => {
    const current = getActiveCatState();
    current.excludedFishNames = [];
    current.favoriteFishNames = [];
    renderPage3FishList();
    savePage3State();
  });

  resultPage3.addEventListener("change", (event) => {
    const target = event.target;
    if (
      !target.classList.contains("cat-fish-exclude-checkbox") &&
      !target.classList.contains("cat-fish-favorite-checkbox") &&
      !target.classList.contains("cat-fish-unfavorite-checkbox")
    ) {
      return;
    }

    const fishName = target.dataset.fishName;
    if (!fishName) return;

    const current = getActiveCatState();
    const excluded = new Set(current.excludedFishNames || []);
    const favorite = new Set(current.favoriteFishNames || []);

    if (target.classList.contains("cat-fish-exclude-checkbox")) {
      if (target.checked) {
        excluded.add(fishName);
        favorite.delete(fishName);
      } else {
        excluded.delete(fishName);
      }
    }

    if (target.classList.contains("cat-fish-favorite-checkbox")) {
      if (target.checked) {
        favorite.add(fishName);
        excluded.delete(fishName);
      } else {
        favorite.delete(fishName);
      }
    }

    if (target.classList.contains("cat-fish-unfavorite-checkbox")) {
      if (target.checked) {
        favorite.delete(fishName);
      }
    }

    current.excludedFishNames = [...excluded];
    current.favoriteFishNames = [...favorite];

    updateCat5ExcludedToggleUi();
    renderPage3FishList();
    savePage3State();
  });
}

// =======================
// イベント登録
// =======================
[
  userLevelInput,
  seasonFilter,
  hobbyFilter,
  place1Filter,
  place2Filter,
  timeFilter,
  weatherFilter,
  weatherMode,
].forEach((el) =>
  el.addEventListener("change", () => {
    if (el === hobbyFilter) {
      updatePlace1Options();
      updatePlace2Options();
    } else if (el === place1Filter) {
      updatePlace2Options();
    }
    filterCreatures();
  }),
);
searchInput.addEventListener("input", filterCreatures);

// =======================
// 初期セットアップ
// =======================
function normalizeBirdRarityData() {
  creatures.forEach((c) => {
    if (c.hobby === "野鳥観察") {
      const star2 = c.rarityData.find((r) => r.star === 2);
      const star1 = c.rarityData.find((r) => r.star === 1);
      if (!star2 && star1) {
        c.rarityData = [{ star: 2, price: Math.floor(star1.price * 4) }];
      }
    }
  });
}

function init() {
  loadState();
  saveState(); // 移行後は新キーを確実に更新
  updateToggleButtons();
  normalizeBirdRarityData();

  // hobby / time / weather
  const hobbies = new Set(creatures.map((c) => c.hobby));
  hobbies.forEach((h) => {
    const opt = document.createElement("option");
    opt.value = h;
    opt.textContent = h;
    hobbyFilter.appendChild(opt);
  });

  // 時間・天候の先頭に「すべて」を追加
  timeFilter.innerHTML = '<option value="">すべて</option>';
  weatherFilter.innerHTML = '<option value="">すべて</option>';

  const times = new Set();
  const weathers = new Set();
  creatures.forEach((c) => {
    c.times?.forEach((t) => times.add(t));
    c.weathers?.forEach((w) => weathers.add(w));
  });
  Array.from(times)
    .sort()
    .forEach((t) => {
      const opt = document.createElement("option");
      opt.value = t;
      opt.textContent =
        t === "00-06"
          ? "00:00〜06:00"
          : t === "06-12"
            ? "06:00〜12:00"
            : t === "12-18"
              ? "12:00〜18:00"
              : t === "18-00"
                ? "18:00〜00:00"
                : t;
      timeFilter.appendChild(opt);
    });
  // 天候の優先順
  const priorityWeather = ["晴れ", "雨(雪)", "虹"];
  const sortedWeathers = priorityWeather.filter((w) => weathers.has(w));
  sortedWeathers.forEach((w) => {
    const opt = document.createElement("option");
    opt.value = w;
    opt.textContent = w;
    weatherFilter.appendChild(opt);
  });

  // weatherMode（ラベルは「を含む」）
  [
    ["any", "を含む"],
    ["only", "のみ"],
    ["exclude", "以外"],
  ].forEach(([v, l]) => {
    const opt = document.createElement("option");
    opt.value = v;
    opt.textContent = l;
    weatherMode.appendChild(opt);
  });

  // シーズンとフェスの出現する values を収集
  const seasons = new Set(creatures.map((c) => c.season || "normal"));
  const page2Seasons = new Set(
    page2Creatures?.map((item) => item.season || "normal") || [],
  );
  const allSeasons = new Set([...seasons, ...page2Seasons]);

  // シーズンとフェスを分類
  const regularSeasons = new Set();
  const festivals = new Set();
  const otherEvents = new Set();
  allSeasons.forEach((s) => {
    if (isFestivalSeason(s)) {
      festivals.add(s);
    } else if (isOtherEvent(s)) {
      otherEvents.add(s);
    } else {
      regularSeasons.add(s);
    }
  });

  // シーズンラベルマップ
  // シーズンラベルマップ（プルダウン表示用。通常のみはフィルター専用の表現）
  const seasonLabels = { ...SEASON_LABELS, normal: "通常のみ" };

  // シーズンフィルター初期化（シーズンとフェスを一括管理）
  seasonFilter.innerHTML = '<option value="">すべて</option>';
  const seasonPriority = ["normal", "snowseason"];
  const festivalPriority = ["dreamlightfes"];
  const otherEventPriority = ["otherevent"];
  const sortedRegularSeasons = seasonPriority.filter((s) =>
    regularSeasons.has(s),
  );
  const sortedFestivals = festivalPriority.filter((f) => festivals.has(f));

  sortedRegularSeasons.forEach((s) => {
    const opt = document.createElement("option");
    opt.value = s;
    opt.textContent = seasonLabels[s] || s;
    seasonFilter.appendChild(opt);
  });

  sortedFestivals.forEach((f) => {
    const opt = document.createElement("option");
    opt.value = f;
    opt.textContent = seasonLabels[f] || f;
    seasonFilter.appendChild(opt);
  });

  otherEventPriority.forEach((o) => {
    const opt = document.createElement("option");
    opt.value = o;
    opt.textContent = seasonLabels[o] || o;
    seasonFilter.appendChild(opt);
  });

  // 初期値をドリームライトフェスに設定
  if (sortedFestivals.includes("dreamlightfes")) {
    seasonFilter.value = "dreamlightfes";
  }

  // ページ2用シーズンフィルター初期化
  seasonFilterPage2.innerHTML = '<option value="">すべて</option>';

  sortedRegularSeasons.forEach((s) => {
    const opt = document.createElement("option");
    opt.value = s;
    opt.textContent = seasonLabels[s] || s;
    seasonFilterPage2.appendChild(opt);
  });

  sortedFestivals.forEach((f) => {
    const opt = document.createElement("option");
    opt.value = f;
    opt.textContent = seasonLabels[f] || f;
    seasonFilterPage2.appendChild(opt);
  });

  otherEventPriority.forEach((o) => {
    const opt = document.createElement("option");
    opt.value = o;
    opt.textContent = seasonLabels[o] || o;
    seasonFilterPage2.appendChild(opt);
  });

  // 初期値をドリームライトフェスに設定
  if (sortedFestivals.includes("dreamlightfes")) {
    seasonFilterPage2.value = "dreamlightfes";
  }

  updatePlace1Options();
  updatePlace2Options();
  filterCreatures();
  initPage2();
  initPage3();
}

// =======================
// 食材チップ 長押し拡大
// =======================
(function setupFoodChipZoom() {
  const LONG_PRESS_MS = 400;
  let zoomEl = null;
  let longPressTimer = null;
  let pendingCancel = false;

  function getOrCreateZoom() {
    if (!zoomEl) {
      zoomEl = document.createElement("div");
      zoomEl.id = "food-chip-zoom";
      zoomEl.innerHTML =
        '<img id="food-chip-zoom-img" src="" alt="">' +
        '<div id="food-chip-zoom-text"></div>';
      document.body.appendChild(zoomEl);
    }
    return zoomEl;
  }

  function showZoom(chip) {
    const img = chip.querySelector(".food-chip-img");
    const text = chip.querySelector(".food-chip-text");
    if (!img || !text) return;

    const rect = chip.getBoundingClientRect();
    const el = getOrCreateZoom();
    el.querySelector("#food-chip-zoom-img").src = img.src;
    el.querySelector("#food-chip-zoom-img").alt = img.alt;
    el.querySelector("#food-chip-zoom-text").textContent = text.textContent;

    // ポップアップをチップの上に配置（固定値: 幅120px + 余白）
    const popupW = 120;
    const popupH = 164; // image(120) + padding(16) + gap(6) + text(~22)
    let left = rect.left + rect.width / 2 - popupW / 2;
    let top = rect.top - popupH - 8;

    left = Math.max(8, Math.min(window.innerWidth - popupW - 8, left));
    if (top < 8) top = rect.bottom + 8;

    el.style.left = left + "px";
    el.style.top = top + "px";
    el.classList.add("visible");
  }

  function hideZoom() {
    if (zoomEl) zoomEl.classList.remove("visible");
  }

  // タッチ (スマホ)
  document.addEventListener(
    "touchstart",
    function (e) {
      const chip = e.target.closest(".food-chip");
      if (!chip) return;
      pendingCancel = false;
      clearTimeout(longPressTimer);
      longPressTimer = setTimeout(function () {
        pendingCancel = true;
        showZoom(chip);
      }, LONG_PRESS_MS);
    },
    { passive: true },
  );

  document.addEventListener("touchend", function () {
    clearTimeout(longPressTimer);
    if (pendingCancel) hideZoom();
  });

  document.addEventListener("touchcancel", function () {
    clearTimeout(longPressTimer);
    hideZoom();
    pendingCancel = false;
  });

  // マウス (PC)
  document.addEventListener("mousedown", function (e) {
    const chip = e.target.closest(".food-chip");
    if (!chip) return;
    pendingCancel = false;
    clearTimeout(longPressTimer);
    longPressTimer = setTimeout(function () {
      pendingCancel = true;
      showZoom(chip);
    }, LONG_PRESS_MS);
  });

  document.addEventListener("mouseup", function () {
    clearTimeout(longPressTimer);
    if (pendingCancel) hideZoom();
  });

  // 料理食材画像の長押しメニュー（新しいタブ/保存）を抑止
  document.addEventListener(
    "contextmenu",
    function (e) {
      if (e.target.closest(".food-chip-img")) {
        e.preventDefault();
      }
    },
    true,
  );

  document.addEventListener(
    "dragstart",
    function (e) {
      if (e.target.closest(".food-chip-img")) {
        e.preventDefault();
      }
    },
    true,
  );

  // ウィンドウ外にカーソルが出たときにリセット
  document.addEventListener("mouseleave", function (e) {
    if (e.target === document.documentElement) {
      clearTimeout(longPressTimer);
      hideZoom();
      pendingCancel = false;
    }
  });

  // 長押し後のクリックでカードがフリップしないようにキャプチャ段階でブロック
  document.addEventListener(
    "click",
    function (e) {
      if (pendingCancel) {
        e.stopPropagation();
        pendingCancel = false;
      }
    },
    true,
  );
})();

init();
