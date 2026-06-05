// =======================
// DOM 取得
// =======================
const bioLevelFishInput = document.getElementById("bioLevelFish");
const bioLevelInsectInput = document.getElementById("bioLevelInsect");
const bioLevelBirdInput = document.getElementById("bioLevelBird");
const seasonFilter = document.getElementById("seasonFilter");
const hobbyFilter = document.getElementById("hobbyFilter");
const place1Filter = document.getElementById("place1Filter");
const place2Filter = document.getElementById("place2Filter");
const timeFilter = document.getElementById("timeFilter");
const weatherFilter = document.getElementById("weatherFilter");
const searchInput = document.getElementById("searchInput");
const sortBioSelect = document.getElementById("sortBio");
const result = document.getElementById("result");
const acquiredToggle = document.getElementById("acquiredToggle");
const star5Toggle = document.getElementById("star5Toggle");
const masterToggle = document.getElementById("masterToggle");
const totalCountEl = document.getElementById("totalCount");
const displayCountEl = document.getElementById("displayCount");
const acquiredCountEl = document.getElementById("acquiredCount");
const star5CountEl = document.getElementById("star5Count");
const masterCountEl = document.getElementById("masterCount");
const userLevelGardenPage2Input = document.getElementById(
  "userLevelGardenPage2",
);
const userLevelCookingPage2Input = document.getElementById(
  "userLevelCookingPage2",
);
const seasonFilterPage2 = document.getElementById("seasonFilterPage2");
const sortPage2Select = document.getElementById("sortPage2");
const searchInputPage2 = document.getElementById("searchInputPage2");
const hobbyFilterPage2 = document.getElementById("hobbyFilterPage2");
const hobbyModeFilterPage2 = document.getElementById("hobbyModeFilterPage2");
const resultPage2 = document.getElementById("resultPage2");
const acquiredTogglePage2 = document.getElementById("acquiredTogglePage2");
const star5TogglePage2 = document.getElementById("star5TogglePage2");
const masterTogglePage2 = document.getElementById("masterTogglePage2");
const totalCountPage2El = document.getElementById("totalCountPage2");
const displayCountPage2El = document.getElementById("displayCountPage2");
const acquiredCountPage2El = document.getElementById("acquiredCountPage2");
const star5CountPage2El = document.getElementById("star5CountPage2");
const masterCountPage2El = document.getElementById("masterCountPage2");
const catTabsEl = document.getElementById("catTabs");
const catNameInput = document.getElementById("catNameInput");
const catResetBtn = document.getElementById("catResetBtn");
const catVisibleCount = document.getElementById("catVisibleCount");
const catSearchInput = document.getElementById("catSearchInput");
const catPlace1Filter = document.getElementById("catPlace1Filter");
const catPlace2Filter = document.getElementById("catPlace2Filter");
const catTimeFilter = document.getElementById("catTimeFilter");
const catWeatherFilter = document.getElementById("catWeatherFilter");
const cat5ExcludedToggleWrap = document.getElementById(
  "cat5ExcludedToggleWrap",
);
const cat5ExcludedToggle = document.getElementById("cat5ExcludedToggle");
const resultPage3 = document.getElementById("resultPage3");
const resetFilterBtn = document.getElementById("resetFilterBtn");
const resetFilterBtnPage2 = document.getElementById("resetFilterBtnPage2");
const resetFilterBtnCat = document.getElementById("resetFilterBtnCat");
const dogTabsEl = document.getElementById("dogTabs");
const dogNameInput = document.getElementById("dogNameInput");
const dogResetBtn = document.getElementById("dogResetBtn");
const dogVisibleCount = document.getElementById("dogVisibleCount");
const dogSearchInput = document.getElementById("dogSearchInput");
const resultPageDog = document.getElementById("resultPageDog");
const dog5ExcludedToggleWrap = document.getElementById(
  "dog5ExcludedToggleWrap",
);
const dog5ExcludedToggle = document.getElementById("dog5ExcludedToggle");
const resultPageWild = document.getElementById("resultPageWild");
const eventnameFilterWrap = document.getElementById("eventnameFilterWrap");
const eventnameFilter = document.getElementById("eventnameFilter");
const fishSubFilter = document.getElementById("fishSubFilter");
const eventnameFilterPage2Wrap = document.getElementById(
  "eventnameFilterPage2Wrap",
);
const eventnameFilterPage2 = document.getElementById("eventnameFilterPage2");

let showAcquired = true;
let showFiveStar = true;
let showMaster = true;
let showAcquiredPage2 = true;
let showFiveStarPage2 = true;
let showMasterPage2 = true;

const PLACE1_BACKGROUND_IMAGE_NAMES = new Set([
  "森林",
  "温泉山",
  "漁村",
  "花畑",
]);

// 水系場所アイコン（海・川・湖）
const ALL_PLACE1_MAIN = [
  { key: "中心街", emoji: "🏪" },
  { key: "郊外", emoji: "🌾" },
  { key: "ホーム", emoji: "🏠" },
  { key: "森林", emoji: "🌲" },
  { key: "温泉山", emoji: "♨️" },
  { key: "花畑", emoji: "🌸" },
  { key: "漁村", emoji: "🎣" },
];

const WATER_PLACE_ICONS = {
  海: "⚓",
  川: "🛶",
  湖: "🦆",
  水辺: "🔵",
  "★特殊": "⭐",
};

const WATER_PLACE_CLASSES = {
  川: "place-water-badge--river",
  湖: "place-water-badge--lake",
  海: "place-water-badge--sea",
  水辺: "place-water-badge--waterside",
  "★特殊": "place-water-badge--special",
};

// フェス判定用定数（フェス系シーズン値のセット）
const FESTIVAL_SEASON_VALUES = new Set(["dreamlightfes", "blockfes"]);

// その他イベント判定用定数（イベント系シーズン値のセット）
const OTHER_EVENT_SEASON_VALUES = new Set(["otherevent"]);

// シーズン・フェスのラベルマップ
const SEASON_LABELS = {
  normal: "通常",
  snowseason: "スノーシーズン",
  dreamlightfes: "ドリームライトフェス",
  blockfes: "ブロック市街地フェス",
  otherevent: "その他イベント",
};

/**
 * seasonが配列の場合（例：["snowseason","normal"]）、
 * "normal"以外の最初の要素をプライマリシーズンとして返す。
 * 文字列の場合はそのまま返す。
 */
function getPrimarySeasonValue(seasonValue) {
  if (Array.isArray(seasonValue)) {
    return seasonValue.find((v) => v !== "normal") ?? "normal";
  }
  return seasonValue;
}

/** プライマリシーズン値がフェス系かどうかを判定する */
function isFestivalSeason(seasonValue) {
  return FESTIVAL_SEASON_VALUES.has(getPrimarySeasonValue(seasonValue));
}

/** プライマリシーズン値がその他イベント系かどうかを判定する */
function isOtherEvent(seasonValue) {
  return OTHER_EVENT_SEASON_VALUES.has(getPrimarySeasonValue(seasonValue));
}

/**
 * プライマリシーズン値が「通常でもフェスでもその他イベントでもない」
 * 特定シーズン（snowseason など）かどうかを判定する
 */
function isRegularSeason(seasonValue) {
  const primary = getPrimarySeasonValue(seasonValue);
  return (
    primary &&
    primary !== "normal" &&
    !FESTIVAL_SEASON_VALUES.has(primary) &&
    !OTHER_EVENT_SEASON_VALUES.has(primary)
  );
}

// seasonが配列で"normal"を含むアイテム（通常フィルターでも表示するが、プライマリ枠に表示）
// 例：["snowseason","normal"] → 通常フィルター時にも表示しつつ、snowseasonの枠にも入る
function isMultiSeasonNormal(seasonValue) {
  return Array.isArray(seasonValue) && seasonValue.includes("normal");
}

/**
 * カード背景画像として使う場所1の名前を返す。
 * 優先順：① 現在選択中の場所1 → ② 背景画像セットに含まれる場所 → ③ 汎用名以外の場所
 * @param {string[]} places1 - このクリーチャーの場所1リスト
 * @returns {string} 背景画像名（空文字の場合は背景なし）
 */
function getPlace1BackgroundName(places1 = []) {
  if (!Array.isArray(places1) || places1.length === 0) return "";

  // フィルターで選択中の場所1が含まれ、かつ背景画像がある場所ならそれを使う
  const selectedPlace1 = place1Filter.value;
  if (
    selectedPlace1 &&
    places1.includes(selectedPlace1) &&
    PLACE1_BACKGROUND_IMAGE_NAMES.has(selectedPlace1)
  ) {
    return selectedPlace1;
  }

  // 背景画像がある場所を優先
  const availablePlace = places1.find((place) =>
    PLACE1_BACKGROUND_IMAGE_NAMES.has(place),
  );
  return availablePlace || "";
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
    "「海釣り」",
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
    "「海釣り」",
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
    "「海釣り」",
    "浅水川",
    "霞川",
    "静川",
    "巨木の川",
  ],
  漁村: ["東海", "旧海", "クジラ海", "浅水川", "霞川", "静川", "巨木の川"],
  海: [
    "郊外の湖",
    "森の湖",
    "温泉山の湖",
    "草原の湖",
    "浅水川",
    "霞川",
    "静川",
    "巨木の川",
    "「虫コイコイ」",
    "「巣ごもり」",
    "「虫寄せ装置」",
    "「ブランクの頭」",
    "「スプリンター・ビー」",
    "「アクターバト」",
  ],
};

// 場所2のイベントクエスト場所 → 対応シーズンのマップ
// （「海釣り」「虫コイコイ」「巣ごもり」は通常season扱いなので含めない）
const PLACE2_SEASON_TAGS = {
  "「氷晶の魚」": ["snowseason"],
  "「氷晶の蝶」": ["snowseason"],
  "「冬季採録」": ["snowseason"],
  "「タコ・エンターテインメント」": ["dreamlightfes"],
  "「スプリンター・ビー」": ["dreamlightfes"],
  "「アクターバト」": ["dreamlightfes"],
  "「(特殊)積み木魚」": ["blockfes"],
  "「(特殊)積み木虫」": ["blockfes"],
  "「(特殊)積み木鳥」": ["blockfes"],
};

// =======================
// 検索リセット
// =======================

/** ページ1・2のシーズンフィルターをデフォルト値（blockfes）に設定する */
function applyDefaultSeasons() {
  // page1: ブロック市街地フェス
  if (seasonFilter) {
    seasonFilter.value = "blockfes";
    if (eventnameFilter) eventnameFilter.style.visibility = "hidden";
  }
  // page2: ブロック市街地フェス
  if (seasonFilterPage2) {
    seasonFilterPage2.value = "blockfes";
    if (eventnameFilterPage2) {
      eventnameFilterPage2.value = "";
    }
  }
}

/** ページ1（生物図鑑）の名前検索をリセット */
function resetFiltersPage1() {
  if (searchInput) searchInput.value = "";
  saveFilterState();
  filterCreatures();
}

/** ページ2（園芸・料理）の名前検索をリセット */
function resetFiltersPage2() {
  if (searchInputPage2) searchInputPage2.value = "";
  saveFilterState();
  filterAndRenderPage2();
}

/** ページ3（にゃんこ）の名前検索をリセット */
function resetFiltersCat() {
  if (catSearchInput) catSearchInput.value = "";
  renderPage3FishList();
}

// =======================
// フィルター処理
// =======================

/**
 * 現在の全フィルター値を読み取り、creatures配列を絞り込んで renderList() を呼び出す。
 * 「獲得非ON」「★5非ON」などのグローバルトグル状態も適用する。
 */
function filterCreatures() {
  updateFishSubFilterOptions();
  const fishLevel = Number(bioLevelFishInput?.value) || 10;
  const insectLevel = Number(bioLevelInsectInput?.value) || 10;
  const birdLevel = Number(bioLevelBirdInput?.value) || 10;
  const hobbyLevelMap = {
    釣り: fishLevel,
    虫捕り: insectLevel,
    野鳥観察: birdLevel,
  };
  const season = seasonFilter.value;
  const hobby = hobbyFilter.value;
  const place1 = place1Filter.value;
  const place2 = place2Filter.value;
  const time = timeFilter.value;
  const weather = weatherFilter.value;
  const keyword = searchInput.value.trim().toLowerCase();

  const filtered = creatures.filter((c) => {
    // 趣味レベルフィルター（趣味ごとに判定）
    const hobbyLevel = hobbyLevelMap[c.hobby];
    if (hobbyLevel !== undefined && c.level > hobbyLevel) return false;

    // シーズン/フェスフィルター（1つのセレクトボックスで一括管理）
    if (season) {
      if (season === "normal") {
        // 通常アイテムのみ表示（配列seasonの通常兼用アイテムも含む）
        if (c.season !== "normal" && !isMultiSeasonNormal(c.season))
          return false;
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
        // 全てのその他イベント + 通常も表示
        if (!isOtherEvent(c.season) && c.season !== "normal") return false;
      } else if (isRegularSeason(season)) {
        // 特定シーズン（snowseason など）+ 通常も表示（配列seasonも対応）
        const primary = getPrimarySeasonValue(c.season);
        if (primary !== season && c.season !== "normal") return false;
      } else if (isFestivalSeason(season)) {
        // 特定フェス（dreamlightfes など）+ 通常も表示
        const primary = getPrimarySeasonValue(c.season);
        if (primary !== season && c.season !== "normal") return false;
      } else if (isOtherEvent(season)) {
        // その他イベント + 通常も表示
        if (!isOtherEvent(c.season) && c.season !== "normal") return false;
      }
    }

    // eventnameフィルター（常時適用）
    const evName = eventnameFilter.value;
    if (evName && isOtherEvent(c.season) && c.eventname !== evName)
      return false;

    if (hobby && c.hobby !== hobby) return false;

    // 釣り種別サブフィルター
    const fishSub = fishSubFilter?.value || "";
    if (fishSub && c.hobby === "釣り") {
      if (fishSub === "cooking" && !cookingFishNameSet.has(c.name))
        return false;
      if (fishSub === "seafish" && !cookingSeaFishNameSet.has(c.name))
        return false;
      if (fishSub === "cat" && !normalFishNameSet.has(c.name)) return false;
      if (fishSub.startsWith("fav-")) {
        const catLabel = fishSub.slice(4);
        const hasFav = catStates.some(
          (cat) =>
            ((cat.name || "猫").trim() || "猫") === catLabel &&
            Array.isArray(cat.favoriteFishNames) &&
            cat.favoriteFishNames.includes(c.name),
        );
        if (!hasFav) return false;
      }
    }

    if (place1 && !c.places1?.includes(place1)) return false;
    if (place2 && !c.places2?.includes(place2)) return false;
    if (time && !c.times?.includes(time)) return false;
    if (weather) {
      const w = c.weathers || [];
      if (weather === "all_three") {
        const match = ["晴れ", "雨(雪)", "虹"];
        if (w.length !== match.length || !match.every((x) => w.includes(x)))
          return false;
      } else if (weather === "rainbow_only") {
        if (!(w.length === 1 && w[0] === "虹")) return false;
      } else if (weather === "exclude_sunny") {
        const match = ["雨(雪)", "虹"];
        if (w.length !== match.length || !match.every((x) => w.includes(x)))
          return false;
      } else if (weather === "exclude_rain") {
        const match = ["晴れ", "虹"];
        if (w.length !== match.length || !match.every((x) => w.includes(x)))
          return false;
      } else if (weather === "include_sunny") {
        if (!w.includes("晴れ")) return false;
      } else if (weather === "include_rain") {
        if (!w.includes("雨(雪)")) return false;
      }
    }
    // グローバル toggles: OFF にすると該当済みを非表示
    if (!showAcquired && c.acquired) return false;
    if (!showFiveStar && c.fiveStar) return false;
    if (!showMaster && c.master) return false;

    if (keyword && !c.name.toLowerCase().includes(keyword)) return false;
    return true;
  });

  // 通常アイテムを末尾に移動（シーズン/イベント選択時）
  const evNameSort = eventnameFilter.value;
  if ((season && season !== "normal") || evNameSort) {
    filtered.sort((a, b) => {
      const aN = a.season === "normal" ? 1 : 0;
      const bN = b.season === "normal" ? 1 : 0;
      return aN - bN;
    });
  }

  // ソートプルダウンの適用
  const sortBio = sortBioSelect?.value ?? "default";
  if (sortBio === "level") {
    filtered.sort((a, b) => (a.level ?? 0) - (b.level ?? 0));
  } else if (sortBio === "sell") {
    filtered.sort((a, b) => {
      const aPrice = a.rarityData?.[0]?.price ?? 0;
      const bPrice = b.rarityData?.[0]?.price ?? 0;
      return bPrice - aPrice;
    });
  } else if (sortBio === "name") {
    filtered.sort((a, b) => a.name.localeCompare(b.name, "ja"));
  }

  renderList(filtered, hobbyLevelMap);
}

/**
 * 獲得/★5/マスタートグルボタンのUI状態（クラス・テキスト・aria-pressed）を
 * 内部変数 showAcquired / showFiveStar / showMaster に合わせて更新する
 */
function updateToggleButtons() {
  acquiredToggle.classList.toggle("active", showAcquired);
  acquiredToggle.setAttribute("aria-pressed", showAcquired.toString());
  acquiredToggle.textContent = `獲得 ${showAcquired ? "ON" : "OFF"}`;

  star5Toggle.classList.toggle("active", showFiveStar);
  star5Toggle.setAttribute("aria-pressed", showFiveStar.toString());
  star5Toggle.textContent = `★5 ${showFiveStar ? "ON" : "OFF"}`;

  masterToggle.classList.toggle("active", showMaster);
  masterToggle.setAttribute("aria-pressed", showMaster.toString());
  masterToggle.textContent = `マスター ${showMaster ? "ON" : "OFF"}`;
}

const STORAGE_KEY = "heartpia-state-v2";
const LEGACY_STORAGE_KEY = "heartpia-state";
const FILTER_STORAGE_KEY = "heartpia-filters-v1";
const PAGE3_STORAGE_KEY = "heartpia-page3-cat-state-v1";

/**
 * 現在の全フィルター状態を localStorage（FILTER_STORAGE_KEY）に保存する。
 * ページリロード後に同じ状態を復元するために使う。
 */
function saveFilterState() {
  const state = {
    searchInput: searchInput?.value ?? "",
    hobbyFilter: hobbyFilter?.value ?? "",
    bioLevelFish: bioLevelFishInput?.value ?? "1",
    bioLevelInsect: bioLevelInsectInput?.value ?? "1",
    bioLevelBird: bioLevelBirdInput?.value ?? "1",
    sortBio: sortBioSelect?.value ?? "default",
    seasonFilter: seasonFilter?.value ?? "",
    eventnameFilter: eventnameFilter?.value ?? "",
    fishSubFilter: fishSubFilter?.value ?? "",
    timeFilter: timeFilter?.value ?? "",
    place1Filter: place1Filter?.value ?? "",
    place2Filter: place2Filter?.value ?? "",
    weatherFilter: weatherFilter?.value ?? "",
    catPlace1Filter: catPlace1Filter?.value ?? "",
    catPlace2Filter: catPlace2Filter?.value ?? "",
    catTimeFilter: catTimeFilter?.value ?? "",
    catWeatherFilter: catWeatherFilter?.value ?? "",
    viewOneColumn: result?.classList.contains("one-column") ?? false,
    searchInputPage2: searchInputPage2?.value ?? "",
    hobbyFilterPage2: hobbyFilterPage2?.value ?? "",
    hobbyModeFilterPage2: hobbyModeFilterPage2?.value ?? "",
    userLevelGardenPage2: userLevelGardenPage2Input?.value ?? "1",
    userLevelCookingPage2: userLevelCookingPage2Input?.value ?? "1",
    seasonFilterPage2: seasonFilterPage2?.value ?? "",
    eventnameFilterPage2: eventnameFilterPage2?.value ?? "",
    sortPage2: sortPage2?.value ?? "",
    viewOneColumnPage2: resultPage2?.classList.contains("one-column") ?? false,
    animalTypeSelect:
      document.getElementById("animalTypeSelect")?.value ?? "cat",
  };
  localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(state));
}

/**
 * localStorageからフィルター状態を読み込んで各入力エレメントに復元する。
 * 座標連動も考慮して場所1→場所2の順に再構築する。
 * @returns {boolean} 保存値があれば true、なければ false
 */
function loadFilterState() {
  const raw = localStorage.getItem(FILTER_STORAGE_KEY);
  if (!raw) return false;
  try {
    const s = JSON.parse(raw);
    if (searchInput && s.searchInput != null) searchInput.value = s.searchInput;
    if (hobbyFilter && s.hobbyFilter != null) hobbyFilter.value = s.hobbyFilter;
    if (bioLevelFishInput && s.bioLevelFish != null)
      bioLevelFishInput.value = s.bioLevelFish;
    if (bioLevelInsectInput && s.bioLevelInsect != null)
      bioLevelInsectInput.value = s.bioLevelInsect;
    if (bioLevelBirdInput && s.bioLevelBird != null)
      bioLevelBirdInput.value = s.bioLevelBird;
    if (sortBioSelect && s.sortBio != null) sortBioSelect.value = s.sortBio;
    updatePlace1Options();
    if (place1Filter && s.place1Filter != null)
      place1Filter.value = s.place1Filter;
    updatePlace2Options();
    if (place2Filter && s.place2Filter != null)
      place2Filter.value = s.place2Filter;
    if (seasonFilter && s.seasonFilter != null)
      seasonFilter.value = s.seasonFilter;
    if (eventnameFilter && s.eventnameFilter != null)
      eventnameFilter.value = s.eventnameFilter;
    if (seasonFilter?.value === "otherevent")
      eventnameFilter.style.visibility = "visible";
    if (fishSubFilter && s.fishSubFilter != null)
      fishSubFilter.value = s.fishSubFilter;
    updateFishSubFilterVisibility();
    if (timeFilter && s.timeFilter != null) timeFilter.value = s.timeFilter;
    if (weatherFilter && s.weatherFilter != null)
      weatherFilter.value = s.weatherFilter;
    if (catWeatherFilter && s.catWeatherFilter != null)
      catWeatherFilter.value = s.catWeatherFilter;
    if (s.viewOneColumn) {
      result?.classList.add("one-column");
      document.getElementById("view1")?.classList.add("active");
      document.getElementById("view2")?.classList.remove("active");
    }
    if (searchInputPage2 && s.searchInputPage2 != null)
      searchInputPage2.value = s.searchInputPage2;
    if (hobbyFilterPage2 && s.hobbyFilterPage2 != null)
      hobbyFilterPage2.value = s.hobbyFilterPage2;
    if (hobbyModeFilterPage2 && s.hobbyModeFilterPage2 != null)
      hobbyModeFilterPage2.value = s.hobbyModeFilterPage2;
    if (userLevelGardenPage2Input && s.userLevelGardenPage2 != null)
      userLevelGardenPage2Input.value = s.userLevelGardenPage2;
    if (userLevelCookingPage2Input && s.userLevelCookingPage2 != null)
      userLevelCookingPage2Input.value = s.userLevelCookingPage2;
    if (seasonFilterPage2 && s.seasonFilterPage2 != null)
      seasonFilterPage2.value = s.seasonFilterPage2;
    if (eventnameFilterPage2 && s.eventnameFilterPage2 != null)
      eventnameFilterPage2.value = s.eventnameFilterPage2;
    if (eventnameFilterPage2)
      eventnameFilterPage2.style.visibility =
        seasonFilterPage2?.value === "otherevent" ? "visible" : "hidden";
    if (sortPage2 && s.sortPage2 != null) sortPage2.value = s.sortPage2;
    if (s.viewOneColumnPage2) {
      resultPage2?.classList.add("one-column");
      document.getElementById("view1Page2")?.classList.add("active");
      document.getElementById("view2Page2")?.classList.remove("active");
    }
    if (s.animalTypeSelect != null) {
      const sel = document.getElementById("animalTypeSelect");
      if (sel) {
        sel.value = s.animalTypeSelect;
        const type = sel.value;
        const catSection = document.getElementById("animalSection-cat");
        const dogSection = document.getElementById("animalSection-dog");
        const wildSection = document.getElementById("animalSection-wild");
        if (catSection) catSection.hidden = type !== "cat";
        if (dogSection) dogSection.hidden = type !== "dog";
        if (wildSection) wildSection.hidden = type !== "wild";
      }
    }
    return true;
  } catch (e) {
    console.warn("フィルター状態のロードに失敗しました", e);
    return false;
  }
}

/**
 * 各クリーチャーの獲得/★5/マスター状態と
 * トグル表示状態を localStorage（STORAGE_KEY）に保存する。
 */
function saveState() {
  const payload = {
    showAcquired,
    showFiveStar,
    showMaster,
    showAcquiredPage2,
    showFiveStarPage2,
    showMasterPage2,
    creatures: creatures.map((c) => ({
      name: c.name,
      acquired: !!c.acquired,
      fiveStar: !!c.fiveStar,
      master: !!c.master,
    })),
    page2: page2Creatures.map((c) => ({
      name: c.name,
      acquired: !!c.acquired,
      fiveStar: !!c.fiveStar,
      master: !!c.master,
    })),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

/**
 * localStorageから各クリーチャーの獲得/★5/マスター状態と
 * トグル表示状態を復元する。
 * 旧ストレージキー（LEGACY_STORAGE_KEY）もフォールバックとして対応する。
 */
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
    if (typeof obj.showMaster === "boolean") showMaster = obj.showMaster;
    if (typeof obj.showAcquiredPage2 === "boolean")
      showAcquiredPage2 = obj.showAcquiredPage2;
    if (typeof obj.showFiveStarPage2 === "boolean")
      showFiveStarPage2 = obj.showFiveStarPage2;
    if (typeof obj.showMasterPage2 === "boolean")
      showMasterPage2 = obj.showMasterPage2;
    if (Array.isArray(obj.creatures)) {
      obj.creatures.forEach((stored) => {
        const target = creatures.find((c) => c.name === stored.name);
        if (!target) return;
        target.acquired = !!stored.acquired;
        target.fiveStar = !!stored.fiveStar;
        target.master = !!stored.master;
      });
    }
    if (Array.isArray(obj.page2)) {
      obj.page2.forEach((stored) => {
        const target = page2Creatures.find((c) => c.name === stored.name);
        if (!target) return;
        target.acquired = !!stored.acquired;
        target.fiveStar = !!stored.fiveStar;
        target.master = !!stored.master;
      });
    }
  } catch (e) {
    console.warn("状態のロードに失敗しました", e);
  }
}

/**
 * ページ1のカウンター表示（全件数・表示件数・獲得数・★5数・マスター数）を更新する。
 * @param {Array} shownList - 現在表示中のクリーチャー配列
 */
function updateCounters(shownList) {
  totalCountEl.textContent = `全件：${creatures.length}`;
  displayCountEl.textContent = `表示：${shownList.length}`;
  acquiredCountEl.textContent = `獲得：${creatures.filter((c) => c.acquired).length}`;
  star5CountEl.textContent = `★5：${creatures.filter((c) => c.fiveStar).length}`;
  masterCountEl.textContent = `マスター：${creatures.filter((c) => c.master).length}`;
}

/**
 * ページ2のカウンター表示を更新する。
 * 「不気味な食べ物」「不気味な飲み物」と販売食材は獲得カウントから除外する。
 * @param {Array} shownList - 現在表示中のページ2アイテム配列
 */
function updateCountersPage2(shownList) {
  if (!totalCountPage2El) return;
  const EXCLUDED_NAMES = new Set(["不気味な食べ物", "不気味な飲み物"]);
  const forAcquiredCount = (arr) =>
    arr.filter(
      (c) => !EXCLUDED_NAMES.has(c.name) && !isPage2StoreIngredient(c),
    );
  totalCountPage2El.textContent = `全件：${page2Creatures.filter((c) => !isPage2StoreIngredient(c)).length}`;
  displayCountPage2El.textContent = `表示：${shownList.filter((c) => !isPage2StoreIngredient(c)).length}`;
  acquiredCountPage2El.textContent = `獲得：${forAcquiredCount(page2Creatures).filter((c) => c.acquired).length}`;
  star5CountPage2El.textContent = `★5：${forAcquiredCount(page2Creatures).filter((c) => c.fiveStar).length}`;
  masterCountPage2El.textContent = `マスター：${forAcquiredCount(page2Creatures).filter((c) => c.master).length}`;
}

/**
 * ページ2の獲得/★5/マスタートグルボタンのUI状態を
 * 内部変数 showAcquiredPage2 / showFiveStarPage2 / showMasterPage2 に合わせて更新する
 */
function updateToggleButtonsPage2() {
  if (!acquiredTogglePage2) return;
  acquiredTogglePage2.classList.toggle("active", showAcquiredPage2);
  acquiredTogglePage2.setAttribute(
    "aria-pressed",
    showAcquiredPage2.toString(),
  );
  acquiredTogglePage2.textContent = `獲得 ${showAcquiredPage2 ? "ON" : "OFF"}`;
  star5TogglePage2.classList.toggle("active", showFiveStarPage2);
  star5TogglePage2.setAttribute("aria-pressed", showFiveStarPage2.toString());
  star5TogglePage2.textContent = `★5 ${showFiveStarPage2 ? "ON" : "OFF"}`;
  masterTogglePage2.classList.toggle("active", showMasterPage2);
  masterTogglePage2.setAttribute("aria-pressed", showMasterPage2.toString());
  masterTogglePage2.textContent = `マスター ${showMasterPage2 ? "ON" : "OFF"}`;
}

// 獲得トグルをOFFにすると、★5・マスタートグルも連動してOFFになる
acquiredToggle.addEventListener("click", () => {
  showAcquired = !showAcquired;

  if (!showAcquired) {
    showFiveStar = false;
    showMaster = false;
  }

  updateToggleButtons();
  saveState();
  filterCreatures();
});

// ★5トグルをONにすると、獲得トグルも連動してONになる
star5Toggle.addEventListener("click", () => {
  showFiveStar = !showFiveStar;

  if (showFiveStar && !showAcquired) {
    showAcquired = true;
  }

  updateToggleButtons();
  saveState();
  filterCreatures();
});

// マスタートグルをONにすると、獲得トグルも連動してONになる
masterToggle.addEventListener("click", () => {
  showMaster = !showMaster;

  if (showMaster && !showAcquired) {
    showAcquired = true;
  }

  updateToggleButtons();
  saveState();
  filterCreatures();
});

// カード内のチェックボックス変更イベント：獲得/★5/マスターの連動を処理する
// 獲得を外すと ★5・マスターも外れる、★5・マスターをチェックすると獲得も自動でチェックされる
result.addEventListener("change", (e) => {
  const target = e.target;
  const cardName = target.dataset.name;
  if (!cardName) return;

  const creature = creatures.find((c) => c.name === cardName);
  if (!creature) return;

  const card = target.closest(".card");
  const acquiredCheckbox = card?.querySelector(".card-acquired-checkbox");
  const star5Checkbox = card?.querySelector(".card-star5-checkbox");
  const masterCheckbox = card?.querySelector(".card-master-checkbox");

  if (target.classList.contains("card-acquired-checkbox")) {
    creature.acquired = target.checked;

    if (!target.checked) {
      creature.fiveStar = false;
      if (star5Checkbox) star5Checkbox.checked = false;
      creature.master = false;
      if (masterCheckbox) masterCheckbox.checked = false;
    }
  }

  if (target.classList.contains("card-star5-checkbox")) {
    creature.fiveStar = target.checked;

    if (target.checked) {
      creature.acquired = true;
      if (acquiredCheckbox) acquiredCheckbox.checked = true;
    }
  }

  if (target.classList.contains("card-master-checkbox")) {
    creature.master = target.checked;

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

/**
 * 選択中の趣味に応じて場所1プルダウンの選択肢を再構築する。
 * 優先順序は固定（priorityOrder 配列）に従う。
 */
/**
 * シーズンフィルターに合致するクリーチャーかを判定する（プルダウン再構築用）。
 * filterCreatures() と同じロジックを適用する。
 */
function matchesSeasonForOptions(c, season) {
  if (!season) return true;
  if (season === "normal")
    return c.season === "normal" || isMultiSeasonNormal(c.season);
  if (season === "allseason")
    return (
      !isFestivalSeason(c.season) &&
      !isOtherEvent(c.season) &&
      c.season !== "normal"
    );
  if (season === "allfes") return isFestivalSeason(c.season);
  if (season === "allotherevent")
    return isOtherEvent(c.season) || c.season === "normal";
  if (isRegularSeason(season) || isFestivalSeason(season)) {
    const primary = getPrimarySeasonValue(c.season);
    return primary === season || c.season === "normal";
  }
  if (isOtherEvent(season))
    return isOtherEvent(c.season) || c.season === "normal";
  return true;
}

/**
 * 釣り種別サブフィルターの選択肢を再構築する。
 * 固定3種（魚-食材・海の魚-食材・猫-エサ）＋好物を設定している猫ごとに追加。
 */
function updateFishSubFilterOptions() {
  if (!fishSubFilter) return;
  const prevValue = fishSubFilter.value;
  fishSubFilter.innerHTML = '<option value="">すべて</option>';
  const opts = [
    { value: "cooking", label: "🐟 魚-食材" },
    { value: "seafish", label: "🌊 海の魚-食材" },
    { value: "cat", label: "🐱 猫-エサ" },
  ];
  catStates.forEach((cat) => {
    if (
      Array.isArray(cat.favoriteFishNames) &&
      cat.favoriteFishNames.length > 0
    ) {
      const label = (cat.name || "猫").trim() || "猫";
      opts.push({ value: `fav-${label}`, label: `🐱 ${label}-好物` });
    }
  });
  opts.forEach(({ value, label }) => {
    const opt = document.createElement("option");
    opt.value = value;
    opt.textContent = label;
    fishSubFilter.appendChild(opt);
  });
  if (Array.from(fishSubFilter.options).some((o) => o.value === prevValue)) {
    fishSubFilter.value = prevValue;
  } else {
    fishSubFilter.value = "";
  }
}

/**
 * 趣味フィルターが「釣り」のときだけ釣り種別サブフィルターを表示する。
 * 「釣り」以外になった場合は値もリセットする。
 */
function updateFishSubFilterVisibility() {
  if (!fishSubFilter) return;
  const isFishing = hobbyFilter.value === "釣り";
  fishSubFilter.style.visibility = isFishing ? "visible" : "hidden";
  if (!isFishing) fishSubFilter.value = "";
}

function updatePlace1Options() {
  const hobby = hobbyFilter.value;
  const currentSeason = seasonFilter?.value || "";
  place1Filter.innerHTML = "";
  const optAll = document.createElement("option");
  optAll.value = "";
  optAll.textContent = "すべて";
  place1Filter.appendChild(optAll);

  const places = new Set();
  creatures
    .filter((c) => !hobby || c.hobby === hobby)
    .filter((c) => matchesSeasonForOptions(c, currentSeason))
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
    "川",
    "湖",
    "海",
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

/**
 * 選択中の趣味・場所1・シーズンに応じて場所2プルダウンの選択肢を再構築する。
 * place1ToExcludedPlace2Map に従って矛盾する場所2を除外し、
 * イベントクエスト場所は現在シーズンに合わせて表示を制御する。
 */
function updatePlace2Options() {
  const hobby = hobbyFilter.value;
  const place1 = place1Filter.value;
  const currentSeason = seasonFilter?.value || "";

  place2Filter.innerHTML = "";
  const optAll = document.createElement("option");
  optAll.value = "";
  optAll.textContent = "すべて";
  place2Filter.appendChild(optAll);

  const places = new Set();
  creatures
    .filter((c) => !hobby || c.hobby === hobby)
    .filter((c) => !place1 || c.places1?.includes(place1))
    .filter((c) => matchesSeasonForOptions(c, currentSeason))
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

  // シーズンに基づくイベントクエスト場所のフィルタリング（安全弁）
  if (currentSeason !== "") {
    Object.entries(PLACE2_SEASON_TAGS).forEach(([place, tags]) => {
      if (!places.has(place)) return;
      let shouldShow;
      if (currentSeason === "normal" || currentSeason === "otherevent") {
        // 通常のみ / その他イベント → snowseason・dreamlightfes 場所は除外
        shouldShow = false;
      } else {
        // 特定シーズン選択時：そのシーズンのタグを持つものだけ表示
        shouldShow = tags.includes(currentSeason);
      }
      if (!shouldShow) places.delete(place);
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
    "「海釣り」",
    "「虫コイコイ」",
    "「巣ごもり」",
    "「氷晶の魚」",
    "「氷晶の蝶」",
    "「冬季採録」",
    "「タコ・エンターテインメント」",
    "「スプリンター・ビー」",
    "「アクターバト」",
    "「(特殊)積み木魚」",
    "「(特殊)積み木虫」",
    "「(特殊)積み木鳥」",
    "「虫寄せ装置」",
    "「ブランクの頭」",
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

/**
 * フィルター済みクリーチャーリストをシーズングループ別にカード形式で描画する。
 * グループ順序: シーズン → フェス → その他イベント → 通常
 * 同一趣味内で☦2換算売値最高のアイテムに金縁（card-top-price）を付ける。
 * @param {Array} list - 描画対象のクリーチャー配列
 * @param {Object} hobbyLevelMap - 趣味別レベルマップ（アンロック判定に使用）
 */
function renderList(list, hobbyLevelMap) {
  if (typeof hobbyLevelMap !== "object" || hobbyLevelMap === null)
    hobbyLevelMap = {};
  if (list.length === 0) {
    result.innerHTML = "<p>条件に合う生き物がいません。</p>";
    return;
  }

  // シーズン値ごとにグループ化（シーズン → フェス → その他イベント → 通常 の順）
  const currentSeasonFilter = seasonFilter?.value || "";
  const showMultiInNormal = currentSeasonFilter === "normal";
  const festivalSeasonValues = [
    ...new Set(
      list
        .filter(
          (c) =>
            isFestivalSeason(c.season) &&
            !(showMultiInNormal && isMultiSeasonNormal(c.season)),
        )
        .map((c) => getPrimarySeasonValue(c.season)),
    ),
  ];
  const regularSeasonValues = [
    ...new Set(
      list
        .filter(
          (c) =>
            isRegularSeason(c.season) &&
            !(showMultiInNormal && isMultiSeasonNormal(c.season)),
        )
        .map((c) => getPrimarySeasonValue(c.season)),
    ),
  ];
  // 通常グループ：通常フィルター時はisMultiSeasonNormalをlv1末尾に追加
  let normalGroup;
  if (showMultiInNormal) {
    const pureNormal = list.filter((c) => c.season === "normal");
    const multiNormal = list.filter((c) => isMultiSeasonNormal(c.season));
    const lv1Items = pureNormal.filter((c) => c.level === 1);
    const otherItems = pureNormal.filter((c) => c.level !== 1);
    normalGroup = [...lv1Items, ...multiNormal, ...otherItems];
  } else {
    normalGroup = list.filter((c) => c.season === "normal");
  }
  const otherEventSeasonValues = [
    ...new Set(
      list
        .filter(
          (c) =>
            isOtherEvent(c.season) &&
            !(showMultiInNormal && isMultiSeasonNormal(c.season)),
        )
        .map((c) => getPrimarySeasonValue(c.season)),
    ),
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
    const hobbyItems = list.filter(
      (c) => c.hobby === hobby && c.level <= (hobbyLevelMap[hobby] ?? 10),
    );
    if (hobbyItems.length === 0) return;
    let topPrice = -1;
    let topName = null;
    hobbyItems.forEach((c) => {
      const p = _getStar2DisplayPrice(c);
      if (p > topPrice) {
        topPrice = p;
        topName = c.name;
      }
    });
    if (topName) topPriceNames.add(topName);
  });

  // カード生成用ヘルパー関数：1件のクリーチャーカードHTMLを返す
  const generateCard = (c) => {
    // 金縁表示対象かどうか
    const isTopPrice = topPriceNames.has(c.name);
    // 趣味レベルでアンロック済みかどうか
    const unlocked = (hobbyLevelMap[c.hobby] ?? 10) >= c.level;
    let hobbyClass = "";
    if (c.hobby === "釣り") {
      hobbyClass = unlocked ? "card-fishing-unlocked" : "card-fishing-locked";
    } else if (c.hobby === "虫捕り") {
      hobbyClass = unlocked ? "card-insect-unlocked" : "card-insect-locked";
    } else if (c.hobby === "野鳥観察") {
      hobbyClass = unlocked ? "card-bird-unlocked" : "card-bird-locked";
    }
    const cardClass = `card ${hobbyClass}`;
    // 場所1の背景画像を取得（場所への視覚的ヒント）
    const placeBackgroundName = getPlace1BackgroundName(c.places1);
    const placeBackgroundMarkup = placeBackgroundName
      ? `<img class="card-place-bg" src="img/other/${placeBackgroundName}.png" alt="" aria-hidden="true" onerror="this.remove()">`
      : "";

    const placesSet = new Set(c.places1 || []);
    const mainPlaceBadgeMarkup = `<div class="place-main-badges">${ALL_PLACE1_MAIN.map(({ key, emoji }) => `<span class="place-main-badge ${placesSet.has(key) ? "place-main-badge--on" : "place-main-badge--off"}" data-place="${key}">${emoji}<span class="place-main-badge-name">${key}</span></span>`).join("")}</div>`;
    const waterPlaces = (c.places1 || []).filter((p) => WATER_PLACE_ICONS[p]);
    const waterBadgesInner = waterPlaces.length
      ? `<div class="place-water-badges">${waterPlaces.map((p) => `<span class="place-water-badge ${WATER_PLACE_CLASSES[p]}">${WATER_PLACE_ICONS[p]}<span class="place-water-badge-name">${p.replace("★", "")}</span></span>`).join("")}</div>`
      : "";
    const placeBadgeMarkup = `<div class="place-badges-container">${mainPlaceBadgeMarkup}${waterBadgesInner}</div>`;

    const metaLines = [];
    if (c.places2?.length) {
      metaLines.push(`場所2：${c.places2.join(" / ")}`);
    }
    if (c.weathers) {
      // 天候は画像行で表示するため metaLines には追加しない
    }

    const ALL_WEATHERS_CARD = ["晴れ", "雨(雪)", "虹"];
    const weatherSet = new Set(c.weathers || []);
    const weatherRowMarkup = `<div class="card-weather-row"><span class="card-row-label">天気：</span>${ALL_WEATHERS_CARD.map((w) => `<span class="card-weather-chip${weatherSet.has(w) ? "" : " card-weather-chip--off"}" data-label="${w}"><img class="card-weather-chip-img" src="img/other/${w}.png" alt="${w}" onerror="this.closest('.card-weather-chip').style.display='none'"></span>`).join("")}</div>`;

    const TIME_SLOTS = [
      { key: "00-06", emoji: "🌙", dataLabel: "深夜 00:00～06:00" },
      { key: "06-12", emoji: "🌅", dataLabel: "朝 06:00～12:00" },
      { key: "12-18", emoji: "☀️", dataLabel: "昼 12:00～18:00" },
      { key: "18-00", emoji: "🌇", dataLabel: "夜 18:00～00:00" },
    ];
    const timeSet = new Set(c.times || []);
    const timeRowMarkup = `<div class="card-time-row"><span class="card-row-label">時間：</span>${TIME_SLOTS.map(
      ({ key, emoji, dataLabel }) => {
        const [tStart, tEnd] = key.split("-");
        return `<span class="card-time-badge${timeSet.has(key) ? " card-time-badge--on" : " card-time-badge--off"}" data-label="${dataLabel}"><span class="card-time-start">${tStart}</span>${emoji}<span class="card-time-end">${tEnd}</span></span>`;
      },
    ).join("")}</div>`;

    const star1Data = c.rarityData.find((r) => r.star === 1);
    const star2Data = c.rarityData.find((r) => r.star === 2);
    const baseStar1 = star1Data?.price ?? 0;
    const baseStar2 = star2Data?.price ?? (star1Data ? star1Data.price * 4 : 0);
    const baseStar1Tc = star1Data?.tc ?? 0;
    const baseStar2Tc =
      star2Data?.tc ?? (star1Data ? (star1Data.tc ?? 0) * 4 : 0);

    // レアリティブロック（☦1〜☦5）の売値・TC計算
    // 野鳥観察は☦2基準（☦1は4分の1）、それ以外は☦1基準（各倍率を乗算）
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
        const showTc =
          c.season !== "normal" &&
          !isOtherEvent(c.season) &&
          !isMultiSeasonNormal(c.season);
        return `
      <div class="rarity-block">
        <span class="badge">★${star} 売値：${price}G${showTc ? ` / TC：${tc}C` : ""}</span>
      </div>
    `;
      })
      .join("");

    const noteLines = getNoteLines(c.note);

    // --- にゃんこカード用：好物・偏食・チェックボタン追加 ---
    let catInfoBlock = "";
    if (c.isCatCard) {
      catInfoBlock = `
        <div class="cat-card-info">
          <div class="cat-favorite">好物 <span class="cat-heart">❤️</span> ${c.favorite || ""}</div>
          <div class="cat-picky">偏食 <span class="cat-picky-emoji">🌀</span> ${c.picky || ""}</div>
          <div class="cat-check-row">
            <label><input type="checkbox" class="cat-check-btn" data-name="${c.name}"> チェック</label>
          </div>
        </div>
      `;
    }
    return `
      <div class="card card-flip${c.acquired ? "" : " card-not-acquired"}" data-name="${c.name}" role="button" tabindex="0" aria-label="${c.name}の詳細カードを裏返す">
        <div class="card-inner">
          <div class="card-front ${cardClass}">
            ${placeBackgroundMarkup}
            ${placeBadgeMarkup}
            ${c.img ? `<img class="card-img" src="${c.img}" alt="${c.name}" loading="eager">` : ""}
            <div class="card-header">
              <span class="card-name">${c.name}</span>
              <span class="card-category">（${c.hobby}）<span class="card-level">Lv.${c.level}</span></span>
            </div>
            ${metaLines.length ? `<div class="meta">${metaLines.join("<br>")}</div>` : ""}
            ${timeRowMarkup}
            ${weatherRowMarkup}
            ${catInfoBlock}
            ${
              c.hobby === "釣り"
                ? (() => {
                    const icons = [];
                    if (cookingFishNameSet.has(c.name))
                      icons.push(
                        `<span class="fish-use-icon fish-use-icon--cooking" title="料理「魚」食材">🐟 魚-食材</span>`,
                      );
                    if (cookingSeaFishNameSet.has(c.name))
                      icons.push(
                        `<span class="fish-use-icon fish-use-icon--sea" title="料理「海の魚」食材">🌊 海の魚-食材</span>`,
                      );
                    if (normalFishNameSet.has(c.name))
                      icons.push(
                        `<span class="fish-use-icon fish-use-icon--cat" title="にゃんこ">🐱 猫-エサ</span>`,
                      );
                    catStates.forEach((cat) => {
                      if (
                        Array.isArray(cat.favoriteFishNames) &&
                        cat.favoriteFishNames.includes(c.name)
                      ) {
                        const label = (cat.name || "猫").trim() || "猫";
                        icons.push(
                          `<span class="fish-use-icon fish-use-icon--fav" title="${label}の好物">🐱 ${label}-好物</span>`,
                        );
                      }
                    });
                    return icons.length
                      ? `<div class="fish-use-icons">${icons.join("")}</div>`
                      : "";
                  })()
                : ""
            }
            <div class="card-control-row">
              <label><input type="checkbox" class="card-acquired-checkbox" data-name="${c.name}" ${c.acquired ? "checked" : ""} /> 獲得</label>
              <label><input type="checkbox" class="card-star5-checkbox" data-name="${c.name}" ${c.fiveStar ? "checked" : ""} /> ★5</label>
              ${c.season === "normal" ? `<label><input type="checkbox" class="card-master-checkbox" data-name="${c.name}" ${c.master ? "checked" : ""} /> マスター</label>` : ""}
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
  const sortByHobby = (arr) =>
    [...arr].sort(
      (a, b) =>
        (RANKED_HOBBIES.indexOf(a.hobby) ?? 99) -
        (RANKED_HOBBIES.indexOf(b.hobby) ?? 99),
    );

  let html = "";

  regularSeasonValues.forEach((season) => {
    const group = sortByHobby(
      list.filter((c) => getPrimarySeasonValue(c.season) === season),
    );
    const label = SEASON_LABELS[season] || season;
    html += `<div class="creature-group"><h2>${label}</h2><div class="creature-group-content">${group.map(generateCard).join("")}</div></div>`;
  });

  festivalSeasonValues.forEach((season) => {
    const group = list.filter(
      (c) => getPrimarySeasonValue(c.season) === season,
    );
    const label = SEASON_LABELS[season] || season;
    html += `<div class="creature-group"><h2>${label}</h2><div class="creature-group-content">${group.map(generateCard).join("")}</div></div>`;
  });

  otherEventSeasonValues.forEach((season) => {
    const group = list.filter(
      (c) => getPrimarySeasonValue(c.season) === season,
    );
    const label = SEASON_LABELS[season] || season;
    const evName = eventnameFilter.value;
    let inner = "";
    if (evName) {
      // 特定イベント選択時
      inner = `<p class="season-event-sub">${evName}</p><div class="creature-group-content">${group.map(generateCard).join("")}</div>`;
    } else {
      // すべて：イベント名ごとにサブタイトルで分割
      const eventNames = [
        ...new Set(group.map((c) => c.eventname).filter(Boolean)),
      ];
      const noEventItems = group.filter((c) => !c.eventname);
      eventNames.forEach((en) => {
        const sub = sortByHobby(group.filter((c) => c.eventname === en));
        inner += `<p class="season-event-sub">${en}</p><div class="creature-group-content">${sub.map(generateCard).join("")}</div>`;
      });
      if (noEventItems.length > 0) {
        inner += `<div class="creature-group-content">${sortByHobby(noEventItems).map(generateCard).join("")}</div>`;
      }
    }
    if (inner)
      html += `<div class="creature-group"><h2>${label}</h2>${inner}</div>`;
  });

  if (normalGroup.length > 0) {
    html += `<div class="creature-group"><h2>通常</h2><div class="creature-group-content">${sortByHobby(normalGroup).map(generateCard).join("")}</div></div>`;
  }

  result.innerHTML = html;
  updateCounters(list);
}

// =======================
// ページ2（園芸・料理・販売食材）
// =======================

/**
 * ページ2アイテムのソート用売値を返す。
 * 販売食材は price.sell、それ以外は rarityData[★1].price を使用する。
 */
function getSellPrice(item) {
  if (isPage2StoreIngredient(item)) {
    return item.price?.sell ?? Number.MAX_SAFE_INTEGER;
  }
  if (!Array.isArray(item.rarityData) || item.rarityData.length === 0) return 0;
  const star1 = item.rarityData.find((r) => r.star === 1);
  return star1?.price ?? item.rarityData[0].price ?? 0;
}

/**
 * ソートキーに応じてソート用の数値を返す。
 * データがない場合は Number.MAX_SAFE_INTEGER（末尾に並ぼう）を返す。
 * @param {object} item - ページ2アイテム
 * @param {string} sortKey - 'level' | 'seedprice' | 'time' | 'sell'
 */
function getPage2SortValue(item, sortKey) {
  if (sortKey === "level") return item.level ?? Number.MAX_SAFE_INTEGER;
  if (sortKey === "seedprice") {
    return item.seedprice ?? Number.MAX_SAFE_INTEGER;
  }
  if (sortKey === "time") return item.time ?? Number.MAX_SAFE_INTEGER;
  if (sortKey === "sell") return getSellPrice(item);
  return item.level ?? Number.MAX_SAFE_INTEGER;
}

// 食材名 → 画像フォルダの対応表（404を出さずに直接解決するため事前構築）
const INGREDIENT_IMAGE_MAP = (() => {
  const map = new Map();
  const add = (folder, arr) => {
    (arr || []).forEach((c) => {
      if (c.name) map.set(c.name, folder);
    });
  };
  add("img/fish", fishingCreatures);
  add("img/insect", insectCreatures);
  add("img/bird", birdCreatures);
  add("img/store-ingredient", storeIngredientCreatures);
  // page2Creatures は hobby 配列で判定
  ([...page2Creatures, ...otherEventPage2Creatures] || []).forEach((c) => {
    if (!c.name) return;
    const hobbies = Array.isArray(c.hobby) ? c.hobby : [c.hobby];
    if (hobbies.includes("園芸")) map.set(c.name, "img/gardening");
    else if (hobbies.includes("料理")) map.set(c.name, "img/cooking");
  });
  // データ配列に存在しない汎用食材プレースホルダー
  const overrides = {
    野菜: "img/gardening",
    小麦: "img/gardening",
    魚: "img/fish",
    果物: "img/store-ingredient",
    肉: "img/store-ingredient",
    キノコ: "img/store-ingredient",
    ジャム: "img/cooking",
    海の魚: "img/fish",
  };
  Object.entries(overrides).forEach(([name, folder]) => map.set(name, folder));
  return map;
})();

/**
 * 食材名から画像パス候補配列を返す。
 * INGREDIENT_IMAGE_MAP でフォルダが判明する場合は1候補のみ返し 404 を回避する。
 * 不明な食材は全フォルダをフォールバック候補として返す。
 * @param {string} ingredientName - 食材名
 * @returns {string[]} 画像パス候補の配列
 */
function buildIngredientImageCandidates(ingredientName) {
  const folder = INGREDIENT_IMAGE_MAP.get(ingredientName);
  const encodedName = encodeURIComponent(ingredientName);
  if (folder) {
    // 対応フォルダが確定している場合は1候補のみ（404なし）
    return [`${folder}/${encodedName}.png`];
  }
  // 不明な食材は全フォルダをフォールバック候補として返す
  const INGREDIENT_IMAGE_FOLDERS = [
    "img/store-ingredient",
    "img/fish",
    "img/gardening",
    "img/insect",
    "img/bird",
    "img/cooking",
  ];
  return INGREDIENT_IMAGE_FOLDERS.map((f) => `${f}/${encodedName}.png`);
}

/**
 * 食材名の配列を受け取り、画像付き食材チップのHTML文字列を返す。
 * 各チップは画像読み込み失敗時に switchIngredientImageSource() でフォールバックする。
 */
function renderFoodItemsWithImages(foodItems = []) {
  if (!Array.isArray(foodItems) || foodItems.length === 0) return "";

  const chips = foodItems
    .map((foodName) => {
      const candidates = buildIngredientImageCandidates(foodName);
      const fallbackData = encodeURIComponent(JSON.stringify(candidates));
      return `
        <span class="food-chip">
          <img class="food-chip-img" src="${candidates[0]}" alt="${foodName}" data-fallbacks="${fallbackData}" data-fallback-index="0" loading="eager" onerror="switchIngredientImageSource(this)">
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

/**
 * 食材画像の onerror コールバック。
 * data-fallbacks 属性の候補リストを順番に試し、全て失敗したら画像を非表示にする。
 * @param {HTMLImageElement} img - 読み込み失敗した img 要素
 */
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

/**
 * アイテムの hobby フィールドを配列として返す。
 * 配列の場合はそのまま、「園芸-食材」のようなハイフン文字列は分割し、
 * 単純な文字列は1要素配列として返す。
 */
function getPage2HobbyParts(item) {
  if (Array.isArray(item.hobby)) return item.hobby;
  if (typeof item.hobby !== "string") return [];
  if (item.hobby.includes("-")) return item.hobby.split("-");
  return [item.hobby];
}

/**
 * note フィールドを行の配列に正規化して返す。
 * 配列・文字列・null のいずれの形式も許容する。
 * @param {string|string[]|null} note
 * @returns {string[]} 空文字列なしの行配列
 */
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

/** hobby配列を「園芸-食材」形式の表示文字列に変換する */
function formatPage2HobbyLabel(item) {
  return getPage2HobbyParts(item).join("-");
}

/** アイテムが指定の hobby 値を含むかどうかを判定する */
function hasPage2Hobby(item, hobbyValue) {
  if (!hobbyValue) return true;
  if (hobbyValue === "販売食材") return isPage2StoreIngredient(item);
  return getPage2HobbyParts(item).includes(hobbyValue);
}

/** アイテムが園芸系（ルートが「園芸」）かどうかを判定する */
function isPage2Gardening(item) {
  return getPage2HobbyParts(item)[0] === "園芸";
}

/** アイテムが園芸食材（園芸系かつ「食材」サブタイプ）かどうかを判定する */
function isPage2GardeningFood(item) {
  const hobbyParts = getPage2HobbyParts(item);
  return hobbyParts[0] === "園芸" && hobbyParts.includes("食材");
}

/** アイテムが園芸花（園芸系かつ「花」サブタイプ）かどうかを判定する */
function isPage2GardeningFlower(item) {
  const hobbyParts = getPage2HobbyParts(item);
  return hobbyParts[0] === "園芸" && hobbyParts.includes("花");
}

/** アイテムが販売・採取食材（ルートが「販売」または「採取」かつ「食材」）かどうかを判定する */
function isPage2StoreIngredient(item) {
  const hobbyParts = getPage2HobbyParts(item);
  return (
    hobbyParts.length === 2 &&
    hobbyParts[1] === "食材" &&
    (hobbyParts[0] === "採取" || hobbyParts[0] === "販売")
  );
}

/** アイテムが料理系（ルートが「料理」）かどうかを判定する */
function isPage2Cooking(item) {
  return getPage2HobbyParts(item)[0] === "料理";
}

const COOKING_WAGON_IMAGE_BY_TYPE = {
  stove: "img/other/コンロ.png",
  "penguin-stove": "img/other/ペンギンコンロ.png",
  "popcorn-wagon": "img/other/ポップコーン移動ワゴン.png",
  "block-wagon": "img/other/積み木移動ワゴン.png",
};

/**
 * 料理アイテムの調理器具画像パスを返す。
 * wagonフィールドが 'none' の場合は空文字列、未設定の場合はコンロ画像を返す。
 */
function getPage2CookingWagonImage(item) {
  if (!isPage2Cooking(item)) return "";

  const wagonType = item.wagon || "stove";
  if (wagonType === "none") return "";

  return (
    COOKING_WAGON_IMAGE_BY_TYPE[wagonType] || COOKING_WAGON_IMAGE_BY_TYPE.stove
  );
}

/**
 * アイテムの趣味に対応する有効なユーザーレベルを返す。
 */
function getEffectiveLevelPage2(item, gardenLevel, cookingLevel) {
  if (isPage2Gardening(item)) return gardenLevel;
  if (isPage2Cooking(item)) return cookingLevel;
  return Math.max(gardenLevel, cookingLevel);
}

/**
 * ページ2アイテムのカードCSSクラスを返す。
 * 園芸系・販売食材系・料理系で背景色が分かれ、アンロック/ロックでも分かれる。
 */
function getPage2CardClass(item, gardenLevel, cookingLevel) {
  const unlocked =
    getEffectiveLevelPage2(item, gardenLevel, cookingLevel) >=
    (item.level ?? 1);
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

/**
 * 星1基準価格から各レアリティの売値を計算する（釣りと同じ倍率ルール）。
 * 園芸花・園芸食材はそれぞれ専用の倍率を使用する。
 * @param {object} item - ページ2アイテム @param {number} star - 1〜5
 */
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

/**
 * 星1基準TCから各レアリティのTC値を計算する（getRarityPriceLikeFishing と同じルール）。
 */
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

/**
 * ページ2のアイテムリストをシーズングループ × 趣味カテゴリ別に分割して描画する。
 * @param {HTMLElement} targetEl - 描画先要素
 * @param {Array} list - 描画対象アイテム配列
 * @param {number} userLevel - 趣味レベル
 */
function renderPage2List(targetEl, list, gardenLevel, cookingLevel) {
  if (!targetEl) return;

  if (list.length === 0) {
    targetEl.innerHTML = `<p>条件に一致するデータがありません。</p>`;
    return;
  }

  // 趣味カテゴリ × シーズングループごとに最高売値アイテムを特定
  const _getPage2Category = (item) => {
    if (isPage2Gardening(item)) return "gardening";
    if (isPage2StoreIngredient(item)) return "store";
    return "cooking";
  };
  const _getPage2SellForRank = (item) => {
    if (isPage2StoreIngredient(item)) return item.price?.sell ?? 0;
    if (!Array.isArray(item.rarityData) || item.rarityData.length === 0)
      return 0;
    const s1 = item.rarityData.find((r) => r.star === 1);
    return s1?.price ?? 0;
  };
  const topPriceNamesP2 = new Set();
  const _p2Groups = new Map();
  list.forEach((item) => {
    const cat = _getPage2Category(item);
    // normalを含む複合seasonアイテムは通常グループに統合して金縁を1つにする
    const season = isMultiSeasonNormal(item.season)
      ? "normal"
      : getPrimarySeasonValue(item.season);
    const key = `${cat}::${season}`;
    if (!_p2Groups.has(key)) _p2Groups.set(key, []);
    _p2Groups.get(key).push(item);
  });
  _p2Groups.forEach((items) => {
    const eligible = items.filter(
      (item) =>
        getEffectiveLevelPage2(item, gardenLevel, cookingLevel) >=
        (item.level ?? 1),
    );
    if (eligible.length === 0) return;
    let topPrice = -1;
    let topName = null;
    eligible.forEach((item) => {
      const p = _getPage2SellForRank(item);
      if (p > topPrice) {
        topPrice = p;
        topName = item.name;
      }
    });
    if (topName) topPriceNamesP2.add(topName);
  });

  const generateItemCard = (item) => {
    const isTopPrice = topPriceNamesP2.has(item.name);
    const cardClass = getPage2CardClass(item, gardenLevel, cookingLevel);
    const metaLines = [];
    const isStoreIngredient = isPage2StoreIngredient(item);
    const cookingWagonImage = getPage2CookingWagonImage(item);
    const cookingWagonMarkup = cookingWagonImage
      ? `<img class="card-place-bg" src="${cookingWagonImage}" alt="" aria-hidden="true" onerror="this.remove()">`
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
                item.season !== "normal" &&
                !isOtherEvent(item.season) &&
                !isMultiSeasonNormal(item.season);
              return `
      <div class="rarity-block">
        <span class="badge">★${star} 売値：${price}G${showTc ? ` / TC：${tc}C` : ""}</span>
      </div>
    `;
            })
            .join("")
        : '<div class="note">売値データなし</div>';

    return `
        <article class="card card-flip${item.acquired ? "" : " card-not-acquired"}" data-name="${item.name}" role="button" tabindex="0" aria-label="${item.name}の詳細カードを裏返す">
          <div class="card-inner">
            <div class="card-front ${cardClass}">
              ${cookingWagonMarkup}
              ${item.img ? `<img class="card-img" src="${item.img}" alt="${item.name}" loading="eager">` : ""}
              <div class="card-header">
                <span class="card-name">${item.name}</span>
                <span class="card-category">（${formatPage2HobbyLabel(item)}）<span class="card-level">Lv.${item.level}</span></span>
              </div>
              ${metaLines.length ? `<div class="meta">${metaLines.join("<br>")}</div>` : ""}
              ${foodItemsMarkup}
              ${
                isStoreIngredient ||
                item.name === "不気味な食べ物" ||
                item.name === "不気味な飲み物"
                  ? ""
                  : `<div class="card-control-row">
                <label><input type="checkbox" class="card-acquired-checkbox-p2" data-name="${item.name}" ${item.acquired ? "checked" : ""} /> 獲得</label>
                <label><input type="checkbox" class="card-star5-checkbox-p2" data-name="${item.name}" ${item.fiveStar ? "checked" : ""} /> ★5</label>
                ${item.season === "normal" ? `<label><input type="checkbox" class="card-master-checkbox-p2" data-name="${item.name}" ${item.master ? "checked" : ""} /> マスター</label>` : ""}
              </div>`
              }
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

  // シーズン値ごとにグループ化（シーズン → フェス → その他イベント → 通常 の順）
  const currentSeasonFilterP2 = seasonFilterPage2?.value || "";
  const showMultiInNormalP2 = currentSeasonFilterP2 === "normal";
  const festivalSeasonValues = [
    ...new Set(
      list
        .filter(
          (c) =>
            isFestivalSeason(c.season) &&
            !(showMultiInNormalP2 && isMultiSeasonNormal(c.season)),
        )
        .map((c) => getPrimarySeasonValue(c.season)),
    ),
  ];
  const regularSeasonValues = [
    ...new Set(
      list
        .filter(
          (c) =>
            isRegularSeason(c.season) &&
            !(showMultiInNormalP2 && isMultiSeasonNormal(c.season)),
        )
        .map((c) => getPrimarySeasonValue(c.season)),
    ),
  ];
  // 通常グループ：通常フィルター時はisMultiSeasonNormalをlv1末尾に追加
  let normalGroup;
  if (showMultiInNormalP2) {
    const pureNormal = list.filter((c) => c.season === "normal");
    const multiNormal = list.filter((c) => isMultiSeasonNormal(c.season));
    const lv1Items = pureNormal.filter((c) => c.level === 1);
    const otherItems = pureNormal.filter((c) => c.level !== 1);
    normalGroup = [...lv1Items, ...multiNormal, ...otherItems];
  } else {
    normalGroup = list.filter((c) => c.season === "normal");
  }
  const otherEventSeasonValues = [
    ...new Set(
      list
        .filter(
          (c) =>
            isOtherEvent(c.season) &&
            !(showMultiInNormalP2 && isMultiSeasonNormal(c.season)),
        )
        .map((c) => getPrimarySeasonValue(c.season)),
    ),
  ];

  let html = "";

  regularSeasonValues.forEach((season) => {
    const group = list.filter(
      (c) => getPrimarySeasonValue(c.season) === season,
    );
    const label = SEASON_LABELS[season] || season;
    html += renderSeasonGroup(label, group);
  });

  festivalSeasonValues.forEach((season) => {
    const group = list.filter(
      (c) => getPrimarySeasonValue(c.season) === season,
    );
    const label = SEASON_LABELS[season] || season;
    html += renderSeasonGroup(label, group);
  });

  otherEventSeasonValues.forEach((season) => {
    const group = list.filter(
      (c) => getPrimarySeasonValue(c.season) === season,
    );
    const label = SEASON_LABELS[season] || season;
    const evName = eventnameFilterPage2.value;

    const buildCategoryParts = (items, subTitle) => {
      const g = renderCategoryGroup("園芸", items.filter(isPage2Gardening));
      const c = renderCategoryGroup("料理", items.filter(isPage2Cooking));
      const s = renderCategoryGroup(
        "採取・販売食材",
        items.filter(isPage2StoreIngredient),
      );
      const cats = [g, c, s].filter(Boolean).join("");
      return cats ? `<p class="season-event-sub">${subTitle}</p>${cats}` : "";
    };

    let categoryParts = "";
    if (evName) {
      // 特定イベント選択時
      categoryParts = buildCategoryParts(group, evName);
    } else {
      // すべて：イベント名ごとにサブタイトルで分割
      const eventNames = [
        ...new Set(group.map((c) => c.eventname).filter(Boolean)),
      ];
      const noEventItems = group.filter((c) => !c.eventname);
      eventNames.forEach((en) => {
        categoryParts += buildCategoryParts(
          group.filter((c) => c.eventname === en),
          en,
        );
      });
      if (noEventItems.length > 0) {
        const g = renderCategoryGroup(
          "園芸",
          noEventItems.filter(isPage2Gardening),
        );
        const c = renderCategoryGroup(
          "料理",
          noEventItems.filter(isPage2Cooking),
        );
        const s = renderCategoryGroup(
          "採取・販売食材",
          noEventItems.filter(isPage2StoreIngredient),
        );
        categoryParts += [g, c, s].filter(Boolean).join("");
      }
    }
    if (categoryParts)
      html += `<div class="creature-group"><h3>${label}</h3>${categoryParts}</div>`;
  });

  if (normalGroup.length > 0) {
    html += renderSeasonGroup("通常", normalGroup);
  }

  targetEl.innerHTML = html;
}

/**
 * ページ2アイテムのサブタイプを文字列で返す。
 * サブフィルター選択肢の生成に使う。
 */
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

/**
 * 主フィルター（hobbyFilterPage2）の値に応じて
 * サブフィルター（hobbyModeFilterPage2）の選択肢を再構築する。
 */
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

/**
 * ページ2の全フィルター値を読み取り、ソート・絞り込みして renderPage2List() を呼び出す。
 */
function filterAndRenderPage2() {
  if (
    !resultPage2 ||
    !userLevelGardenPage2Input ||
    !userLevelCookingPage2Input ||
    !sortPage2Select ||
    !searchInputPage2 ||
    !hobbyFilterPage2 ||
    !hobbyModeFilterPage2 ||
    !seasonFilterPage2
  ) {
    return;
  }

  const gardenLevel = Number(userLevelGardenPage2Input.value) || 1;
  const cookingLevel = Number(userLevelCookingPage2Input.value) || 1;
  const season = seasonFilterPage2.value;
  const keyword = searchInputPage2.value.trim().toLowerCase();
  const sortKey = sortPage2Select.value;
  const primary = hobbyFilterPage2.value;
  const secondary = hobbyModeFilterPage2.value;

  const filtered = page2Creatures.filter((item) => {
    if (!showAcquiredPage2 && item.acquired) return false;
    if (!showFiveStarPage2 && item.fiveStar) return false;
    if (!showMasterPage2 && item.master) return false;
    if (
      getEffectiveLevelPage2(item, gardenLevel, cookingLevel) <
      (item.level ?? 1)
    )
      return false;
    if (keyword && !item.name.toLowerCase().includes(keyword)) return false;

    // シーズン/フェスフィルター（1つのセレクトボックスで一括管理）
    if (season) {
      if (season === "normal") {
        // 通常アイテムのみ表示（配列seasonの通常兼用アイテムも含む）
        if (item.season !== "normal" && !isMultiSeasonNormal(item.season))
          return false;
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
        // 全てのその他イベント + 通常も表示
        if (!isOtherEvent(item.season) && item.season !== "normal")
          return false;
      } else if (isRegularSeason(season)) {
        // 特定シーズン（snowseason など）+ 通常も表示（配列seasonも対応）
        const primarySeason = getPrimarySeasonValue(item.season);
        if (primarySeason !== season && item.season !== "normal") return false;
      } else if (isFestivalSeason(season)) {
        // 特定フェス（dreamlightfes など）+ 通常も表示
        const primarySeason = getPrimarySeasonValue(item.season);
        if (primarySeason !== season && item.season !== "normal") return false;
      } else if (isOtherEvent(season)) {
        // その他イベント + 通常も表示
        if (!isOtherEvent(item.season) && item.season !== "normal")
          return false;
      }
    }

    // eventnameフィルター（常時適用）
    const evName = eventnameFilterPage2.value;
    if (evName && isOtherEvent(item.season) && item.eventname !== evName)
      return false;

    if (primary === "園芸" && !isPage2Gardening(item)) return false;
    if (primary === "料理" && !isPage2Cooking(item)) return false;
    if (primary === "採取・販売" && !isPage2StoreIngredient(item)) return false;

    if (secondary) {
      if (getPage2SubType(item) !== secondary) return false;
    }

    return true;
  });

  // 通常アイテムを末尾に移動（シーズン/イベント選択時）
  const evNameSortP2 = eventnameFilterPage2.value;
  if ((season && season !== "normal") || evNameSortP2) {
    filtered.sort((a, b) => {
      const aN = a.season === "normal" ? 1 : 0;
      const bN = b.season === "normal" ? 1 : 0;
      return aN - bN;
    });
  }

  let sorted;
  if (sortKey === "default") {
    sorted = [...filtered];
  } else if (sortKey === "name") {
    sorted = [...filtered].sort((a, b) => a.name.localeCompare(b.name, "ja"));
  } else {
    sorted = [...filtered].sort((a, b) => {
      const diff =
        getPage2SortValue(a, sortKey) - getPage2SortValue(b, sortKey);
      if (diff !== 0) return diff;
      return page2Creatures.indexOf(a) - page2Creatures.indexOf(b);
    });
  }

  renderPage2List(resultPage2, sorted, gardenLevel, cookingLevel);
  updateCountersPage2(sorted);
}

/**
 * ページ2のイベントリスナーを登録し、初回のレンダリングを実行する。
 * DOM要素が存在しない場合は何もしない。
 */
function initPage2() {
  if (
    !resultPage2 ||
    !userLevelGardenPage2Input ||
    !userLevelCookingPage2Input ||
    !sortPage2Select ||
    !searchInputPage2 ||
    !hobbyFilterPage2 ||
    !hobbyModeFilterPage2 ||
    !seasonFilterPage2
  ) {
    return;
  }

  userLevelGardenPage2Input.addEventListener("change", filterAndRenderPage2);
  userLevelCookingPage2Input.addEventListener("change", filterAndRenderPage2);

  if (acquiredTogglePage2) {
    acquiredTogglePage2.addEventListener("click", () => {
      showAcquiredPage2 = !showAcquiredPage2;
      if (!showAcquiredPage2) {
        showFiveStarPage2 = false;
        showMasterPage2 = false;
      }
      updateToggleButtonsPage2();
      saveState();
      filterAndRenderPage2();
    });
    star5TogglePage2.addEventListener("click", () => {
      showFiveStarPage2 = !showFiveStarPage2;
      if (showFiveStarPage2 && !showAcquiredPage2) showAcquiredPage2 = true;
      updateToggleButtonsPage2();
      saveState();
      filterAndRenderPage2();
    });
    masterTogglePage2.addEventListener("click", () => {
      showMasterPage2 = !showMasterPage2;
      if (showMasterPage2 && !showAcquiredPage2) showAcquiredPage2 = true;
      updateToggleButtonsPage2();
      saveState();
      filterAndRenderPage2();
    });
    updateToggleButtonsPage2();
  }
  seasonFilterPage2.addEventListener("change", () => {
    const isOther = seasonFilterPage2.value === "otherevent";
    if (!isOther) eventnameFilterPage2.value = "";
    eventnameFilterPage2.style.visibility = isOther ? "visible" : "hidden";
    filterAndRenderPage2();
  });
  eventnameFilterPage2.addEventListener("change", filterAndRenderPage2);
  sortPage2Select.addEventListener("change", filterAndRenderPage2);
  searchInputPage2.addEventListener("input", filterAndRenderPage2);
  hobbyFilterPage2.addEventListener("change", () => {
    updatePage2SubFilterOptions();
    filterAndRenderPage2();
  });
  hobbyModeFilterPage2.addEventListener("change", filterAndRenderPage2);

  updatePage2SubFilterOptions();
  filterAndRenderPage2();

  resultPage2.addEventListener("change", (e) => {
    const target = e.target;
    const itemName = target.dataset.name;
    if (!itemName) return;
    const item = page2Creatures.find((c) => c.name === itemName);
    if (!item) return;
    const card = target.closest(".card");
    const acq = card?.querySelector(".card-acquired-checkbox-p2");
    const s5 = card?.querySelector(".card-star5-checkbox-p2");
    const masterP2 = card?.querySelector(".card-master-checkbox-p2");
    if (target.classList.contains("card-acquired-checkbox-p2")) {
      item.acquired = target.checked;
      if (!target.checked) {
        item.fiveStar = false;
        if (s5) s5.checked = false;
        item.master = false;
        if (masterP2) masterP2.checked = false;
      }
    }
    if (target.classList.contains("card-star5-checkbox-p2")) {
      item.fiveStar = target.checked;
      if (target.checked) {
        item.acquired = true;
        if (acq) acq.checked = true;
      }
    }
    if (target.classList.contains("card-master-checkbox-p2")) {
      item.master = target.checked;
      if (target.checked) {
        item.acquired = true;
        if (acq) acq.checked = true;
      }
    }
    saveState();
    filterAndRenderPage2();
  });
}

// =======================
// ページ3（にゃんこの好物）
// =======================

// ストレージキーとにゃんこスロット数の定数
const CAT_SLOT_COUNT = 5;
const DOG_SLOT_COUNT = 3;
const PAGE_DOG_STORAGE_KEY = "heartpia-dog-state-v1";

// キャットフードや動物汎用エサなど、釣り以外の特殊エサアイテム
const catSpecialItems = [
  { name: "キャットフード", img: "img/store-ingredient/キャットフード.png" },
  { name: "動物汎用エサ", img: "img/store-ingredient/動物汎用エサ.png" },
];

// catFishList をもとに normalFishCandidates（エサになる魚 + 特殊アイテム）を構築
const normalFishCandidates = catFishList
  .map((name) => {
    const special = catSpecialItems.find((s) => s.name === name);
    if (special) return special;
    const fish = fishingCreatures.find((f) => f.name === name);
    return fish || null;
  })
  .filter(Boolean);

// 名前をキーにした高速検索用 Set
const normalFishNameSet = new Set(
  normalFishCandidates.map((fish) => fish.name),
);
const cookingFishNameSet = new Set(cookingFishList);
const cookingSeaFishNameSet = new Set(cookingSeaFishList);

// わんこ用特殊アイテムと候補リストを構築
const dogSpecialItems = [
  { name: "ドッグフード", img: "img/store-ingredient/ドッグフード.png" },
  { name: "動物汎用エサ", img: "img/store-ingredient/動物汎用エサ.png" },
  { name: "リンゴ", img: "img/store-ingredient/リンゴ.png" },
  { name: "ヒラタケ", img: "img/store-ingredient/ヒラタケ.png" },
  { name: "シイタケ", img: "img/store-ingredient/シイタケ.png" },
  { name: "マッシュルーム", img: "img/store-ingredient/マッシュルーム.png" },
];
const normalDogCandidates = dogFoodList
  .map((name) => {
    const special = dogSpecialItems.find((s) => s.name === name);
    if (special) return special;
    const cooking = cookingCreatures.find((c) => c.name === name);
    if (cooking)
      return { name: cooking.name, img: `img/cooking/${cooking.name}.png` };
    return null;
  })
  .filter(Boolean);

/** 指定インデックスのにゃんこのデフォルト状態オブジェクトを返す */
function createDefaultCatState(index) {
  return {
    name: `猫${index + 1}`,
    excludedFishNames: [],
    favoriteFishNames: [],
    pickyFishNames: [],
  };
}

/** CAT_SLOT_COUNT 分のデフォルト状態配列を生成して返す */
function createDefaultCatStates() {
  return Array.from({ length: CAT_SLOT_COUNT }, (_, index) =>
    createDefaultCatState(index),
  );
}

/** 指定インデックスのわんこのデフォルト状態オブジェクトを返す */
function createDefaultDogState(index) {
  return {
    name: `わんこ${index + 1}`,
    excludedFoodNames: [],
    favoriteFoodNames: [],
    pickyFoodNames: [],
  };
}

/** DOG_SLOT_COUNT 分のデフォルト状態配列を生成して返す */
function createDefaultDogStates() {
  return Array.from({ length: DOG_SLOT_COUNT }, (_, i) =>
    createDefaultDogState(i),
  );
}

// アクティブなにゃんこのインデックス、全スロットの状態、「好物じゃない表示」フラグ
let activeCatIndex = 0;
let catStates = createDefaultCatStates();
let showCat5ExcludedOnly = false;

// アクティブなわんこのインデックスと全スロットの状態、「普通表示」フラグ
let activeDogIndex = 0;
let dogStates = createDefaultDogStates();
let showDog5ExcludedOnly = false;

/** 現在アクティブなにゃんこの状態オブジェクトを返す */
function getActiveCatState() {
  return catStates[activeCatIndex] || createDefaultCatState(activeCatIndex);
}

/** 現在アクティブなわんこの状態オブジェクトを返す */
function getActiveDogState() {
  return dogStates[activeDogIndex] || createDefaultDogState(activeDogIndex);
}

/** わんこの状態を localStorage に保存する */
function saveDogState() {
  localStorage.setItem(
    PAGE_DOG_STORAGE_KEY,
    JSON.stringify({ activeDogIndex, dogStates, showDog5ExcludedOnly }),
  );
}

/** localStorage からわんこの状態を読み込む */
function loadDogState() {
  const raw = localStorage.getItem(PAGE_DOG_STORAGE_KEY);
  if (!raw) return;
  try {
    const parsed = JSON.parse(raw);
    const nextStates = createDefaultDogStates();
    if (Array.isArray(parsed.dogStates)) {
      const validFoodNames = new Set(normalDogCandidates.map((f) => f.name));
      parsed.dogStates.slice(0, DOG_SLOT_COUNT).forEach((dog, i) => {
        const defaultState = createDefaultDogState(i);
        const name =
          typeof dog.name === "string"
            ? dog.name.slice(0, 20)
            : defaultState.name;
        const excluded = Array.isArray(dog.excludedFoodNames)
          ? dog.excludedFoodNames.filter((n) => validFoodNames.has(n))
          : [];
        const favorites = Array.isArray(dog.favoriteFoodNames)
          ? dog.favoriteFoodNames.filter((n) => validFoodNames.has(n))
          : [];
        const picky = Array.isArray(dog.pickyFoodNames)
          ? dog.pickyFoodNames
              .filter((n) => validFoodNames.has(n))
              .filter(
                (n) => !new Set(favorites).has(n) && !new Set(excluded).has(n),
              )
          : [];
        nextStates[i] = {
          name,
          excludedFoodNames: excluded,
          favoriteFoodNames: favorites,
          pickyFoodNames: picky,
        };
      });
    }
    dogStates = nextStates;
    if (
      typeof parsed.activeDogIndex === "number" &&
      parsed.activeDogIndex >= 0 &&
      parsed.activeDogIndex < DOG_SLOT_COUNT
    ) {
      activeDogIndex = parsed.activeDogIndex;
    }
    if (typeof parsed.showDog5ExcludedOnly === "boolean") {
      showDog5ExcludedOnly = parsed.showDog5ExcludedOnly;
    }
  } catch {
    // パース失敗時はデフォルト状態を使用
  }
}

/** ページ3（にゃんこ）の状態を localStorage に保存する */
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

/**
 * localStorage からページ3（にゃんこ）の状態を読み込む。
 * 不正なデータや存在しない魚名は除外し、好物と除外の重複も解消する。
 */
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

        const pickyFishNames = Array.isArray(cat?.pickyFishNames)
          ? cat.pickyFishNames
              .filter((fishName) => typeof fishName === "string")
              .filter((fishName) => normalFishNameSet.has(fishName))
          : [];

        const favoriteSet = new Set(favoriteFishNames);
        const cleanedExcluded = excludedFishNames.filter(
          (fishName) => !favoriteSet.has(fishName),
        );
        // 偏食は好物・除外と重複しないよう除去
        const pickySet = new Set(
          pickyFishNames.filter(
            (fishName) =>
              !favoriteSet.has(fishName) &&
              !new Set(cleanedExcluded).has(fishName),
          ),
        );

        nextStates[index] = {
          name,
          excludedFishNames: [...new Set(cleanedExcluded)],
          favoriteFishNames: [...favoriteSet],
          pickyFishNames: [...pickySet],
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

/**
 * 「好物じゃない表示」トグルのUI（テキスト・aria-pressed・クラス）を
 * showCat5ExcludedOnly 変数に合わせて更新する。
 */
function updateCat5ExcludedToggleUi() {
  if (!cat5ExcludedToggleWrap || !cat5ExcludedToggle) return;

  cat5ExcludedToggleWrap.classList.add("visible");
  cat5ExcludedToggleWrap.setAttribute("aria-hidden", "false");
  cat5ExcludedToggle.disabled = false;
  cat5ExcludedToggle.classList.remove("is-disabled");
  cat5ExcludedToggle.classList.toggle("active", showCat5ExcludedOnly);
  cat5ExcludedToggle.setAttribute("aria-pressed", String(showCat5ExcludedOnly));
  cat5ExcludedToggle.textContent = `普通表示 ${showCat5ExcludedOnly ? "ON" : "OFF"}`;
}

/** わんこの「普通表示」トグルのUI（テキスト・ aria-pressed ・class）を
 * showDog5ExcludedOnly 変数に合わせて更新する。
 */
function updateDog5ExcludedToggleUi() {
  if (!dog5ExcludedToggleWrap || !dog5ExcludedToggle) return;
  dog5ExcludedToggleWrap.classList.add("visible");
  dog5ExcludedToggleWrap.setAttribute("aria-hidden", "false");
  dog5ExcludedToggle.disabled = false;
  dog5ExcludedToggle.classList.remove("is-disabled");
  dog5ExcludedToggle.classList.toggle("active", showDog5ExcludedOnly);
  dog5ExcludedToggle.setAttribute("aria-pressed", String(showDog5ExcludedOnly));
  dog5ExcludedToggle.textContent = `普通表示 ${showDog5ExcludedOnly ? "ON" : "OFF"}`;
}

/** わんこタブのUI（アクティブ状態・ボタンテキスト）と名前入力欄を更新する */
function updateDogTabsUi() {
  if (!dogTabsEl) return;
  dogTabsEl.querySelectorAll(".dog-tab").forEach((btn) => {
    const index = Number(btn.dataset.dogIndex || "0");
    const state = dogStates[index] || createDefaultDogState(index);
    btn.textContent = state.name || `わんこ${index + 1}`;
    const isActive = index === activeDogIndex;
    btn.classList.toggle("active", isActive);
    btn.setAttribute("aria-pressed", String(isActive));
  });
  if (dogNameInput) {
    dogNameInput.value = getActiveDogState().name || "";
  }
  updateDog5ExcludedToggleUi();
}

/**
 * アクティブなわんこの食べ物候補リストを描画する。
 * キーワードフィルターを適用し、好物/偏食/普通チェックボックスつきカードを生成する。
 */
function renderPageDogList() {
  if (!resultPageDog) return;

  const activeState = getActiveDogState();
  const excludedSet = new Set(activeState.excludedFoodNames || []);
  const favoriteSet = new Set(activeState.favoriteFoodNames || []);
  const keyword = dogSearchInput?.value.trim().toLowerCase() || "";

  let visibleFood = showDog5ExcludedOnly
    ? normalDogCandidates.filter((food) => excludedSet.has(food.name))
    : normalDogCandidates.filter((food) => !excludedSet.has(food.name));
  if (keyword) {
    visibleFood = visibleFood.filter((food) =>
      food.name.toLowerCase().includes(keyword),
    );
  }

  if (dogVisibleCount) {
    const label = showDog5ExcludedOnly ? "普通" : "候補";
    dogVisibleCount.textContent = `${label}：${visibleFood.length}個`;
  }

  if (visibleFood.length === 0) {
    resultPageDog.innerHTML =
      '<p class="cat-empty">表示できる食べ物がありません。</p>';
    return;
  }

  const pickySet = new Set(activeState.pickyFoodNames || []);
  resultPageDog.innerHTML = visibleFood
    .map((food) => {
      const isFavorite = favoriteSet.has(food.name);
      const isExcluded = excludedSet.has(food.name);
      const isPicky = pickySet.has(food.name);
      let cardClass = "cat-fish-card";
      if (isFavorite) cardClass += " cat-fish-card-favorite";
      else if (isPicky) cardClass += " cat-fish-card-picky";
      return `
      <article class="${cardClass}">
        ${food.img ? `<img class="cat-fish-img" src="${food.img}" alt="${food.name}" onerror="this.remove()">` : ""}
        <div class="cat-fish-name">${food.name}</div>
        <div class="cat-fish-toggle-row">
          <label class="cat-fish-toggle">
            <input type="checkbox" class="dog-food-favorite-checkbox" data-food-name="${food.name}" ${isFavorite ? "checked" : ""}>
            好物❤️
          </label>
          <label class="cat-fish-toggle">
            <input type="checkbox" class="dog-food-picky-checkbox" data-food-name="${food.name}" ${isPicky ? "checked" : ""}>
            偏食🌀
          </label>
          <label class="cat-fish-toggle">
            <input type="checkbox" class="dog-food-exclude-checkbox" data-food-name="${food.name}" ${isExcluded ? "checked" : ""}>
            普通
          </label>
        </div>
      </article>
    `;
    })
    .join("");
}

/**
 * 野生動物カードを描画する。
 * 各動物の画像と固定の好物3つをカード形式で表示する。
 */
function renderWildAnimalList() {
  if (!resultPageWild) return;
  if (!wildAnimalData || wildAnimalData.length === 0) {
    resultPageWild.innerHTML = '<p class="cat-empty">データがありません。</p>';
    return;
  }
  const activeEvents = wildAnimalData.filter(
    (a) => a.category === "イベント" && a.eventActive,
  );
  const residents = wildAnimalData.filter((a) => a.category === "常駐");
  const inactiveEvents = wildAnimalData.filter(
    (a) => a.category === "イベント" && !a.eventActive,
  );

  const WEATHER_IMG = {
    晴れ: "img/other/晴れ.png",
    "雨(雪)": "img/other/雨(雪).png",
    虹: "img/other/虹.png",
  };

  const renderCard = (animal, grayed = false) => {
    const favHtml =
      animal.favorites && animal.favorites.length > 0
        ? animal.favorites
            .map((fav) =>
              fav.img
                ? `<span class="food-chip">
                <img class="food-chip-img" src="${fav.img}" alt="${fav.name}" onerror="this.closest('.food-chip').style.display='none'">
                <span class="food-chip-text">${fav.name}</span>
               </span>`
                : `<span class="wild-animal-chip--noimg"><span class="food-chip-text" style="position:static;background:none;color:#5a4320;font-size:0.7rem;padding:0;">${fav.name}</span></span>`,
            )
            .join("")
        : '<p class="wild-animal-no-data">好物は後で追加予定</p>';
    const ALL_WEATHERS = ["晴れ", "雨(雪)", "虹"];
    const favWeatherSet = new Set(animal.favoriteWeather || []);
    const weatherHtml = `<div class="wild-animal-weather-row">
            ${ALL_WEATHERS.map((w) => {
              const isFav = favWeatherSet.has(w);
              return `<span class="food-chip${isFav ? " food-chip--weather-fav" : " food-chip--weather-off"}">
                <img class="food-chip-img" src="${WEATHER_IMG[w]}" alt="${w}" onerror="this.closest('.food-chip').style.display='none'">
                <span class="food-chip-text">${w}</span>
               </span>`;
            }).join("")}
          </div>`;
    const badge =
      animal.category === "イベント"
        ? `<span class="wild-animal-event-badge${grayed ? " ended" : ""}">イベント</span>`
        : "";
    return `
    <article class="wild-animal-card${grayed ? " grayed" : ""}">
      ${badge}
      ${animal.img ? `<img class="wild-animal-img" src="${animal.img}" alt="${animal.name}" onerror="this.style.display='none'">` : ""}
      <div class="wild-animal-name">${animal.name}</div>
      <div class="wild-animal-favorites">${favHtml}</div>
      ${weatherHtml}
    </article>`;
  };

  const renderSection = (heading, animals, grayed = false, gridClass = "") => {
    if (!animals.length) return "";
    return `
    <div class="wild-animal-section">
      <h3 class="wild-animal-section-heading${grayed ? " ended" : ""}">${heading}</h3>
      <div class="wild-animal-grid${gridClass ? " " + gridClass : ""}">${animals.map((a) => renderCard(a, grayed)).join("")}</div>
    </div>`;
  };

  resultPageWild.innerHTML = [
    renderSection(
      "イベント開催中",
      activeEvents,
      false,
      "wild-animal-grid--resident",
    ),
    renderSection("常駐", residents, false, "wild-animal-grid--resident"),
    renderSection(
      "イベント終了",
      inactiveEvents,
      true,
      "wild-animal-grid--resident",
    ),
  ].join("");
}

/**
 * にゃんこタブのUI（アクティブ状態・ボタンテキスト）と
 * 名前入力欄の値を catStates に合わせて更新する。
 */
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

/**
 * アクティブなにゃんこのエサ候補魚リストを描画する。
 * 「好物じゃない表示ON」時は除外リストの魚のみ、OFFの時は除外されていない魚を表示する。
 * キーワード・場所・時間・天候フィルターも適用する。
 */
function renderPage3FishList() {
  // （排他ロジックは下部で1回だけ追加されるのでここは不要）
  if (!resultPage3) return;

  const activeState = getActiveCatState();
  const excludedSet = new Set(activeState.excludedFishNames || []);
  const favoriteSet = new Set(activeState.favoriteFishNames || []);
  const shouldShowExcludedOnly = showCat5ExcludedOnly;

  const visibleFish = shouldShowExcludedOnly
    ? normalFishCandidates.filter((fish) => excludedSet.has(fish.name))
    : normalFishCandidates.filter((fish) => !excludedSet.has(fish.name));

  const keyword = catSearchInput?.value.trim().toLowerCase() || "";
  const catP1 = catPlace1Filter?.value || "";
  const catP2 = catPlace2Filter?.value || "";
  const catTime = catTimeFilter?.value || "";
  const catWeather = catWeatherFilter?.value || "";

  let filteredFish = visibleFish;
  if (keyword)
    filteredFish = filteredFish.filter((fish) =>
      fish.name.toLowerCase().includes(keyword),
    );

  if (catP1 || catP2 || catTime || catWeather) {
    filteredFish = filteredFish.filter((fish) => {
      const fd = fishingCreatures.find((f) => f.name === fish.name);
      if (!fd) return false;
      if (catP1 && !fd.places1?.includes(catP1)) return false;
      if (catP2 && !fd.places2?.includes(catP2)) return false;
      if (catTime && !fd.times?.includes(catTime)) return false;
      if (catWeather) {
        const w = fd.weathers || [];
        if (catWeather === "all_three") {
          const match = ["晴れ", "雨(雪)", "虹"];
          if (w.length !== match.length || !match.every((x) => w.includes(x)))
            return false;
        } else if (catWeather === "rainbow_only") {
          if (w.length !== 1 || w[0] !== "虹") return false;
        } else if (catWeather === "exclude_sunny") {
          const match = ["雨(雪)", "虹"];
          if (w.length !== match.length || !match.every((x) => w.includes(x)))
            return false;
        } else if (catWeather === "exclude_rain") {
          const match = ["晴れ", "虹"];
          if (w.length !== match.length || !match.every((x) => w.includes(x)))
            return false;
        } else if (catWeather === "include_sunny") {
          if (!w.includes("晴れ")) return false;
        } else if (catWeather === "include_rain") {
          if (!w.includes("雨(雪)")) return false;
        }
      }
      return true;
    });
  }

  if (catVisibleCount) {
    const label = shouldShowExcludedOnly ? "普通" : "候補";
    catVisibleCount.textContent = `${label}：${filteredFish.length}匹`;
  }

  if (filteredFish.length === 0) {
    resultPage3.innerHTML =
      '<p class="cat-empty">表示できる魚がありません。</p>';
    return;
  }

  const pickySet = new Set(activeState.pickyFishNames || []);
  resultPage3.innerHTML = filteredFish
    .map((fish) => {
      const isFavorite = favoriteSet.has(fish.name);
      const isExcluded = excludedSet.has(fish.name);
      const isPicky = pickySet.has(fish.name);
      const hasFishData = fishingCreatures.some((f) => f.name === fish.name);
      const fishData = fishingCreatures.find((f) => f.name === fish.name);
      const waterTags = [];
      if (fishData?.places1?.includes("海"))
        waterTags.push(
          `<span class="fish-water-tag fish-water-tag--sea">⚓ 海</span>`,
        );
      if (fishData?.places1?.includes("川"))
        waterTags.push(
          `<span class="fish-water-tag fish-water-tag--river">🛶 川</span>`,
        );
      if (fishData?.places1?.includes("湖"))
        waterTags.push(
          `<span class="fish-water-tag fish-water-tag--lake">🦆 湖</span>`,
        );
      const waterBadge = waterTags.length
        ? `<div class="fish-water-badge">${waterTags.join("")}</div>`
        : "";
      let cardClass = "cat-fish-card";
      if (isFavorite) cardClass += " cat-fish-card-favorite";
      else if (isPicky) cardClass += " cat-fish-card-picky";
      return `
      <article class="${cardClass}">
        ${hasFishData ? '<span class="cat-fish-tap-badge">Tap</span>' : ""}
        ${waterBadge}
        ${fish.img ? `<img class="cat-fish-img" src="${fish.img}" alt="${fish.name}" onerror="this.remove()">` : ""}
        <div class="cat-fish-name">${fish.name}</div>
        <div class="cat-fish-toggle-row">
          <label class="cat-fish-toggle">
            <input type="checkbox" class="cat-fish-favorite-checkbox" data-fish-name="${fish.name}" ${isFavorite ? "checked" : ""}>
            好物❤️
          </label>
          <label class="cat-fish-toggle">
            <input type="checkbox" class="cat-fish-picky-checkbox" data-fish-name="${fish.name}" ${isPicky ? "checked" : ""}>
            偏食🌀
          </label>
          <label class="cat-fish-toggle">
            <input type="checkbox" class="cat-fish-exclude-checkbox" data-fish-name="${fish.name}" ${isExcluded ? "checked" : ""}>
            普通
          </label>
        </div>
      </article>
    `;
    })
    .join("");

  // チェックボックスの排他制御・状態保存は initPage3 の change イベント委任ハンドラで行う
}

/**
 * リセット確認ダイアログを表示する。
 * はいを押したら onConfirm を呼び出し、いいえ or オーバーレイ外クリックで閉じる。
 * @param {string} message - 確認メッセージ
 * @param {Function} onConfirm - はいが押されたときに実行する関数
 */
function showResetConfirm(message, onConfirm) {
  const existing = document.getElementById("resetConfirmOverlay");
  if (existing) existing.remove();

  const overlay = document.createElement("div");
  overlay.id = "resetConfirmOverlay";
  overlay.className = "reset-confirm-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.innerHTML = `
    <div class="reset-confirm-modal">
      <div class="reset-confirm-message">${message}</div>
      <div class="reset-confirm-buttons">
        <button class="reset-confirm-yes" type="button">はい</button>
        <button class="reset-confirm-no" type="button">いいえ</button>
      </div>
    </div>
  `;

  const close = () => overlay.remove();
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  overlay.querySelector(".reset-confirm-yes").addEventListener("click", () => {
    close();
    onConfirm();
  });
  overlay.querySelector(".reset-confirm-no").addEventListener("click", close);

  document.body.appendChild(overlay);
  overlay.querySelector(".reset-confirm-yes").focus();
}

/**
 * 魚の出現場所・時間・天候をポップアップダイアログで表示する。
 * オーバーレイ外クリックまたは「閉じる」ボタンで閉じる。
 */
function showFishLocationPopup(fishName, places1, places2, times, weathers) {
  const existing = document.getElementById("fishLocationOverlay");
  if (existing) existing.remove();

  const tagsHtml = (items) =>
    items.map((p) => `<span class="fish-location-tag">${p}</span>`).join("");

  const formatTime = (t) => {
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
  };

  const timesSection =
    times && times.length
      ? `<div class="fish-location-section">
        <div class="fish-location-label">時間</div>
        <div class="fish-location-tags">${tagsHtml(times.map(formatTime))}</div>
      </div>`
      : "";

  const weathersSection =
    weathers && weathers.length
      ? `<div class="fish-location-section">
        <div class="fish-location-label">天候</div>
        <div class="fish-location-tags">${tagsHtml(weathers)}</div>
      </div>`
      : "";

  const overlay = document.createElement("div");
  overlay.id = "fishLocationOverlay";
  overlay.className = "fish-location-overlay";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.innerHTML = `
    <div class="fish-location-modal">
      <div class="fish-location-title">${fishName}</div>
      <div class="fish-location-section">
        <div class="fish-location-label">場所1</div>
        <div class="fish-location-tags">${tagsHtml(places1)}</div>
      </div>
      <div class="fish-location-section">
        <div class="fish-location-label">場所2</div>
        <div class="fish-location-tags">${tagsHtml(places2)}</div>
      </div>
      ${timesSection}
      ${weathersSection}
      <button class="fish-location-close" type="button">閉じる</button>
    </div>
  `;

  const close = () => overlay.remove();
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });
  overlay
    .querySelector(".fish-location-close")
    .addEventListener("click", close);

  document.body.appendChild(overlay);
}

/**
 * ページ3（にゃんこ）のイベントリスナーを登録し、初回の描画を実行する。
 * タブ切り替え・名前入力・好物/除外チェックボックス・カードタップ（ポップアップ）を管理する。
 */
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

  if (catSearchInput) {
    catSearchInput.addEventListener("input", renderPage3FishList);
  }

  catResetBtn.addEventListener("click", () => {
    showResetConfirm(
      "リセットしますか？\nすべての除外・お気に入り設定が消えます。",
      () => {
        const current = getActiveCatState();
        current.name = `猫${activeCatIndex + 1}`;
        current.excludedFishNames = [];
        current.favoriteFishNames = [];
        current.pickyFishNames = [];
        if (catNameInput) catNameInput.value = current.name;
        updateCatTabsUi();
        renderPage3FishList();
        savePage3State();
      },
    );
  });

  resultPage3.addEventListener("click", (event) => {
    if (event.target.closest("label") || event.target.closest("input")) return;
    const card = event.target.closest(".cat-fish-card");
    if (!card) return;
    const fishName = card.querySelector(".cat-fish-name")?.textContent?.trim();
    if (!fishName) return;
    const fishData = fishingCreatures.find((f) => f.name === fishName);
    if (!fishData || !fishData.places1 || !fishData.places2) return;
    showFishLocationPopup(
      fishName,
      fishData.places1,
      fishData.places2,
      fishData.times,
      fishData.weathers,
    );
  });

  resultPage3.addEventListener("change", (event) => {
    const target = event.target;
    if (
      !target.classList.contains("cat-fish-exclude-checkbox") &&
      !target.classList.contains("cat-fish-favorite-checkbox") &&
      !target.classList.contains("cat-fish-picky-checkbox") &&
      !target.classList.contains("cat-fish-unfavorite-checkbox")
    ) {
      return;
    }

    const fishName = target.dataset.fishName;
    if (!fishName) return;

    const current = getActiveCatState();
    const excluded = new Set(current.excludedFishNames || []);
    const favorite = new Set(current.favoriteFishNames || []);
    const picky = new Set(current.pickyFishNames || []);

    if (target.classList.contains("cat-fish-exclude-checkbox")) {
      if (target.checked) {
        excluded.add(fishName);
        favorite.delete(fishName);
        picky.delete(fishName); // 偏食をクリア
      } else {
        excluded.delete(fishName);
      }
    }

    if (target.classList.contains("cat-fish-favorite-checkbox")) {
      if (target.checked) {
        if (favorite.size >= 3) {
          target.checked = false;
          return;
        }
        favorite.add(fishName);
        excluded.delete(fishName);
        picky.delete(fishName); // 偏食をクリア
      } else {
        favorite.delete(fishName);
      }
    }

    // 偏食チェック: 好物・好物じゃないを両方クリアする
    if (target.classList.contains("cat-fish-picky-checkbox")) {
      if (target.checked) {
        favorite.delete(fishName);
        excluded.delete(fishName);
        picky.add(fishName);
      } else {
        picky.delete(fishName);
      }
    }

    if (target.classList.contains("cat-fish-unfavorite-checkbox")) {
      if (target.checked) {
        favorite.delete(fishName);
      }
    }

    current.excludedFishNames = [...excluded];
    current.favoriteFishNames = [...favorite];
    current.pickyFishNames = [...picky];

    updateCat5ExcludedToggleUi();
    renderPage3FishList();
    savePage3State();
    // 好物アイコンを生物図鑑に反映
    filterCreatures();
  });
}

/**
 * わんこページを初期化する。
 * ローカルストレージから状態を復元し、タブ・名前入力・リセット・検索・
 * チェックボックスの排他制御イベントをまとめて登録する。
 */
function initPageDog() {
  if (!dogTabsEl || !dogNameInput || !dogResetBtn || !resultPageDog) return;

  loadDogState();
  updateDogTabsUi();
  renderPageDogList();

  dogTabsEl.addEventListener("click", (event) => {
    const target = event.target.closest(".dog-tab");
    if (!target) return;
    const index = Number(target.dataset.dogIndex || "0");
    if (!Number.isInteger(index) || index < 0 || index >= DOG_SLOT_COUNT)
      return;
    activeDogIndex = index;
    updateDogTabsUi();
    renderPageDogList();
    saveDogState();
  });

  if (dog5ExcludedToggle) {
    dog5ExcludedToggle.addEventListener("click", () => {
      showDog5ExcludedOnly = !showDog5ExcludedOnly;
      updateDog5ExcludedToggleUi();
      renderPageDogList();
      saveDogState();
    });
  }

  dogNameInput.addEventListener("input", () => {
    const current = getActiveDogState();
    current.name = dogNameInput.value.slice(0, 20);
    updateDogTabsUi();
    saveDogState();
  });

  if (dogSearchInput) {
    dogSearchInput.addEventListener("input", renderPageDogList);
  }

  const resetFilterBtnDog = document.getElementById("resetFilterBtnDog");
  if (resetFilterBtnDog) {
    resetFilterBtnDog.addEventListener("click", () => {
      if (dogSearchInput) dogSearchInput.value = "";
      renderPageDogList();
    });
  }

  dogResetBtn.addEventListener("click", () => {
    showResetConfirm(
      "リセットしますか？\nすべての除外・お気に入り設定が消えます。",
      () => {
        const current = getActiveDogState();
        current.name = `わんこ${activeDogIndex + 1}`;
        current.excludedFoodNames = [];
        current.favoriteFoodNames = [];
        current.pickyFoodNames = [];
        if (dogNameInput) dogNameInput.value = current.name;
        updateDogTabsUi();
        renderPageDogList();
        saveDogState();
      },
    );
  });

  resultPageDog.addEventListener("change", (event) => {
    const target = event.target;
    if (
      !target.classList.contains("dog-food-exclude-checkbox") &&
      !target.classList.contains("dog-food-favorite-checkbox") &&
      !target.classList.contains("dog-food-picky-checkbox")
    ) {
      return;
    }

    const foodName = target.dataset.foodName;
    if (!foodName) return;

    const current = getActiveDogState();
    const excluded = new Set(current.excludedFoodNames || []);
    const favorite = new Set(current.favoriteFoodNames || []);
    const picky = new Set(current.pickyFoodNames || []);

    if (target.classList.contains("dog-food-exclude-checkbox")) {
      if (target.checked) {
        excluded.add(foodName);
        favorite.delete(foodName);
        picky.delete(foodName);
      } else {
        excluded.delete(foodName);
      }
    }
    if (target.classList.contains("dog-food-favorite-checkbox")) {
      if (target.checked) {
        if (favorite.size >= 3) {
          target.checked = false;
          return;
        }
        favorite.add(foodName);
        excluded.delete(foodName);
        picky.delete(foodName);
      } else {
        favorite.delete(foodName);
      }
    }
    if (target.classList.contains("dog-food-picky-checkbox")) {
      if (target.checked) {
        favorite.delete(foodName);
        excluded.delete(foodName);
        picky.add(foodName);
      } else {
        picky.delete(foodName);
      }
    }

    current.excludedFoodNames = [...excluded];
    current.favoriteFoodNames = [...favorite];
    current.pickyFoodNames = [...picky];
    updateDog5ExcludedToggleUi();
    renderPageDogList();
    saveDogState();
  });
}

/** 野生動物ページを初期化し、動物カードを描画する */
function initPageWild() {
  renderWildAnimalList();
}

// =======================
// イベント登録
// =======================

// ページ1フィルター要素の変更イベントをまとめて登録する。
// 趣味・場所1・シーズンが変わる場合はプルダウン再構築も実施する。
[
  bioLevelFishInput,
  bioLevelInsectInput,
  bioLevelBirdInput,
  seasonFilter,
  hobbyFilter,
  place1Filter,
  place2Filter,
  timeFilter,
  weatherFilter,
  fishSubFilter,
].forEach((el) =>
  el.addEventListener("change", () => {
    if (el === hobbyFilter) {
      updatePlace1Options();
      updatePlace2Options();
      updateFishSubFilterVisibility();
    } else if (el === fishSubFilter) {
      // サブフィルター変更時は追加処理なし
    } else if (el === place1Filter) {
      updatePlace2Options();
    } else if (el === seasonFilter) {
      const isOther = seasonFilter.value === "otherevent";
      eventnameFilter.style.visibility = isOther ? "visible" : "hidden";
      if (!isOther) eventnameFilter.value = "";
      updatePlace2Options();
    } else if (
      el === bioLevelFishInput ||
      el === bioLevelInsectInput ||
      el === bioLevelBirdInput
    ) {
      syncBioToTestLevels();
    }
    filterCreatures();
  }),
);
eventnameFilter.addEventListener("change", filterCreatures);
searchInput.addEventListener("input", filterCreatures);

// =======================
// 初期セットアップ
// =======================

/**
 * 野鳥観察クリーチャーの rarityData を正規化する。
 * 星2データがなく星1データのみの場合、星2 = 星1 × 4 として設定する。
 */
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

// =======================
// ページ4（テスト：行動アドバイザー）
// =======================

/**
 * 行動アドバイザー（ページ4）を初期化する。
 * 趣味レベル・時間・天候・目的を入力すると、今取れる生き物と稼ぎの提案を表示する。
 */
function initPageTest() {
  const STORAGE_KEY_TEST = "heartpia-test-settings-v1";
  const testResultEl = document.getElementById("testResult");
  const testPlace1El = document.getElementById("testPlace1");
  const testPlace2El = document.getElementById("testPlace2");
  const testTimeEl = document.getElementById("testTime");
  const testWeatherEl = document.getElementById("testWeather");
  if (
    !testResultEl ||
    !testPlace1El ||
    !testPlace2El ||
    !testTimeEl ||
    !testWeatherEl
  )
    return;

  let selectedGoal = null;
  const ALL_HOBBIES = ["釣り", "虫捕り", "野鳥観察", "園芸", "料理"];
  const enabledHobbies = new Set(ALL_HOBBIES);

  // 場所1プルダウンを初期化（通常シーズン・生物のみ）
  function buildTestPlace1Options() {
    const places = new Set();
    creatures
      .filter((c) => c.season === "normal")
      .forEach((c) => c.places1?.forEach((p) => places.add(p)));
    const allPlace1Keys = [
      ...ALL_PLACE1_MAIN.map(({ key }) => key),
      ...Object.keys(WATER_PLACE_ICONS),
    ];
    allPlace1Keys.forEach((key) => {
      if (!places.has(key)) return;
      const opt = document.createElement("option");
      opt.value = key;
      opt.textContent = key;
      testPlace1El.appendChild(opt);
    });
  }

  // 場所2プルダウンを場所1に合わせて更新
  function buildTestPlace2Options(selectedPlace1) {
    const prevValue = testPlace2El.value;
    while (testPlace2El.options.length > 1) testPlace2El.remove(1);
    const places = new Set();
    creatures
      .filter((c) => c.season === "normal")
      .filter((c) => !selectedPlace1 || c.places1?.includes(selectedPlace1))
      .forEach((c) => c.places2?.forEach((p) => places.add(p)));
    if (selectedPlace1) {
      const excluded = place1ToExcludedPlace2Map[selectedPlace1] || [];
      excluded.forEach((p) => places.delete(p));
    }
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
      "「海釣り」",
      "「虫コイコイ」",
      "虫寄せ装置",
      "「巣ごもり」",
      "ブランクの頭",
    ];
    const sorted = priorityOrder2.filter((p) => places.has(p));
    sorted.forEach((p) => {
      const opt = document.createElement("option");
      opt.value = p;
      opt.textContent = p;
      testPlace2El.appendChild(opt);
    });
    testPlace2El.value = Array.from(testPlace2El.options).some(
      (o) => o.value === prevValue,
    )
      ? prevValue
      : "";
  }

  // localStorage 読み込み
  function loadTestSettings() {
    try {
      const s = JSON.parse(localStorage.getItem(STORAGE_KEY_TEST) || "{}");
      if (s.place1) {
        testPlace1El.value = s.place1;
        buildTestPlace2Options(s.place1);
      }
      if (s.place2) testPlace2El.value = s.place2;
      if (s.time) testTimeEl.value = s.time;
      if (s.weather) testWeatherEl.value = s.weather;
      if (s.goal) {
        const btn = document.querySelector(
          `.test-goal-btn[data-goal="${s.goal}"]`,
        );
        if (btn) {
          btn.classList.add("active");
          btn.setAttribute("aria-pressed", "true");
          selectedGoal = s.goal;
        }
      }
      if (Array.isArray(s.hobbies)) {
        enabledHobbies.clear();
        s.hobbies.forEach((h) => enabledHobbies.add(h));
        document.querySelectorAll(".test-hobby-btn").forEach((btn) => {
          const on = enabledHobbies.has(btn.dataset.hobby);
          btn.classList.toggle("active", on);
          btn.setAttribute("aria-pressed", String(on));
        });
      }
    } catch (e) {}
  }

  // localStorage 保存
  function saveTestSettings() {
    localStorage.setItem(
      STORAGE_KEY_TEST,
      JSON.stringify({
        place1: testPlace1El.value,
        place2: testPlace2El.value,
        time: testTimeEl.value,
        weather: testWeatherEl.value,
        goal: selectedGoal || "",
        hobbies: [...enabledHobbies],
      }),
    );
  }

  // 趣味フィルターボタン（複数選択トグル）
  document.querySelectorAll(".test-hobby-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const hobby = btn.dataset.hobby;
      if (enabledHobbies.has(hobby)) {
        enabledHobbies.delete(hobby);
        btn.classList.remove("active");
        btn.setAttribute("aria-pressed", "false");
      } else {
        enabledHobbies.add(hobby);
        btn.classList.add("active");
        btn.setAttribute("aria-pressed", "true");
      }
      saveTestSettings();
      if (selectedGoal) renderTestResults();
    });
  });

  // 目的ボタン（単一選択）
  document.querySelectorAll(".test-goal-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".test-goal-btn").forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      selectedGoal = btn.dataset.goal;
      saveTestSettings();
      renderTestResults();
    });
  });

  // place1変更でplace2を更新
  testPlace1El.addEventListener("change", () => {
    buildTestPlace2Options(testPlace1El.value);
    saveTestSettings();
    if (selectedGoal) renderTestResults();
  });

  // 状況変更時に再描画・保存
  [testPlace2El, testTimeEl, testWeatherEl].forEach((el) => {
    el.addEventListener("change", () => {
      saveTestSettings();
      if (selectedGoal) renderTestResults();
    });
  });

  buildTestPlace1Options();
  buildTestPlace2Options("");
  loadTestSettings();
  if (selectedGoal) renderTestResults();

  // チップタップで場所を展開
  testResultEl.addEventListener("click", (e) => {
    const chip = e.target.closest(".test-chip--tappable");
    if (!chip) return;
    chip.classList.toggle("expanded");
  });

  // ★5売値を計算
  function getStar5Price(c) {
    if (!Array.isArray(c.rarityData) || c.rarityData.length === 0) return 0;
    if (c.hobby === "野鳥観察") {
      const s2 = c.rarityData.find((r) => r.star === 2);
      const s1 = c.rarityData.find((r) => r.star === 1);
      const base = s2?.price ?? (s1 ? s1.price * 4 : 0);
      return base * 8;
    }
    const s1 = c.rarityData.find((r) => r.star === 1);
    return s1 ? Math.floor(s1.price * 8) : 0;
  }

  // ★1売値を計算（現実的な稼ぎの基準）
  function getStar1Price(c) {
    if (!Array.isArray(c.rarityData) || c.rarityData.length === 0) return 0;
    if (c.hobby === "野鳥観察") {
      // 野鳥は★2が取れる前提（★1の4倍）
      const s2 = c.rarityData.find((r) => r.star === 2);
      const s1 = c.rarityData.find((r) => r.star === 1);
      return s2?.price ?? (s1 ? s1.price * 4 : 0);
    }
    const s1 = c.rarityData.find((r) => r.star === 1);
    return s1?.price ?? 0;
  }

  // ★2換算売値を計算（ランキング表示用）
  function getStar2Price(c) {
    if (!Array.isArray(c.rarityData) || c.rarityData.length === 0) return 0;
    if (c.hobby === "野鳥観察") {
      const s2 = c.rarityData.find((r) => r.star === 2);
      const s1 = c.rarityData.find((r) => r.star === 1);
      return s2?.price ?? (s1 ? s1.price * 4 : 0);
    }
    const s1 = c.rarityData.find((r) => r.star === 1);
    return s1 ? Math.floor(s1.price * 1.5) : 0;
  }

  // 状況フィルター
  function getFilteredCreatures() {
    const lvls = {
      釣り: Number(bioLevelFishInput?.value) || 1,
      虫捕り: Number(bioLevelInsectInput?.value) || 1,
      野鳥観察: Number(bioLevelBirdInput?.value) || 1,
    };
    const place1 = testPlace1El.value;
    const place2 = testPlace2El.value;
    const time = testTimeEl.value;
    const weather = testWeatherEl.value;
    return creatures.filter((c) => {
      if (c.season !== "normal") return false;
      if (c.level > (lvls[c.hobby] ?? 1)) return false;
      if (place1 && !c.places1?.includes(place1)) return false;
      if (place2 && !c.places2?.includes(place2)) return false;
      if (time && !c.times?.includes(time)) return false;
      if (weather) {
        const w = c.weathers || [];
        if (weather === "all_three") {
          const match = ["晴れ", "雨(雪)", "虹"];
          if (w.length !== match.length || !match.every((x) => w.includes(x)))
            return false;
        } else if (weather === "rainbow_only") {
          if (!(w.length === 1 && w[0] === "虹")) return false;
        } else if (weather === "exclude_sunny") {
          const match = ["雨(雪)", "虹"];
          if (w.length !== match.length || !match.every((x) => w.includes(x)))
            return false;
        } else if (weather === "exclude_rain") {
          const match = ["晴れ", "虹"];
          if (w.length !== match.length || !match.every((x) => w.includes(x)))
            return false;
        } else if (weather === "include_sunny") {
          if (!w.includes("晴れ")) return false;
        } else if (weather === "include_rain") {
          if (!w.includes("雨(雪)")) return false;
        }
      }
      return true;
    });
  }

  // 数値をG表記にフォーマット
  function fmt(n) {
    return n > 0 ? `${n.toLocaleString()}G` : "";
  }

  // 状況テキストを組み立て
  function buildSituationText() {
    const timeLabels = {
      "00-06": "深夜(0〜6時)",
      "06-12": "午前(6〜12時)",
      "12-18": "午後(12〜18時)",
      "18-00": "夜(18〜0時)",
    };
    const weatherLabels = {
      all_three: "晴れ , 雨(雪) , 虹",
      exclude_sunny: "雨(雪) , 虹",
      exclude_rain: "晴れ , 虹",
      rainbow_only: "虹のみ",
      include_sunny: "晴れを含む",
      include_rain: "雨(雪)を含む",
    };
    const parts = [];
    if (testTimeEl.value)
      parts.push(timeLabels[testTimeEl.value] || testTimeEl.value);
    if (testWeatherEl.value)
      parts.push(weatherLabels[testWeatherEl.value] || testWeatherEl.value);
    return parts.length ? parts.join(" / ") : "全時間・全天候";
  }

  // ホビー別チップ色クラスを返す
  function getChipColorClass(c) {
    if (c.hobby === "釣り") return "chip-fishing";
    if (c.hobby === "虫捕り") return "chip-insect";
    if (c.hobby === "野鳥観察") return "chip-bird";
    if (isPage2Gardening(c)) return "chip-gardening";
    if (isPage2StoreIngredient(c)) return "chip-ingredient";
    return "chip-cooking";
  }

  // チップ1件を描画
  function renderChip(c, priceLabel, extraClass = "") {
    const colorClass = getChipColorClass(c);
    const badges = [];
    if (c.acquired)
      badges.push(
        '<span class="test-badge test-badge--acquired" title="獲得済">📖</span>',
      );
    if (c.fiveStar)
      badges.push(
        '<span class="test-badge test-badge--star5" title="★5済">⭐</span>',
      );
    if (c.master)
      badges.push(
        '<span class="test-badge test-badge--master" title="マスター">🏆</span>',
      );
    const imgTag = c.img
      ? `<img class="test-chip-img" src="${c.img}" alt="" onerror="this.style.display='none'">`
      : "";
    const hobbyLabel = Array.isArray(c.hobby) ? c.hobby.join("-") : c.hobby;
    let placesHtml = "";
    let tappable = false;
    if (Array.isArray(c.places1) && c.places1.length > 0) {
      tappable = true;
      const p1 = c.places1.join("・");
      const p2 =
        Array.isArray(c.places2) && c.places2.length > 0
          ? c.places2.join("・")
          : "";
      placesHtml =
        `<div class="test-chip-places">` +
        `<span class="test-chip-place1">📍 ${p1}</span>` +
        (p2 ? `<span class="test-chip-place2">🗺 ${p2}</span>` : "") +
        `</div>`;
    }
    const hobbyKey = Array.isArray(c.hobby) ? c.hobby[0] : c.hobby;
    return (
      `<div class="test-chip ${colorClass}${extraClass ? " " + extraClass : ""}${tappable ? " test-chip--tappable" : ""}" data-item-name="${c.name}" data-item-hobby="${hobbyKey}"${tappable ? ' role="button" tabindex="0"' : ""}>` +
      `<span class="test-chip-longpress-hint" title="長押しで図鑑へ">長押</span>` +
      imgTag +
      `<div class="test-chip-body">` +
      `<span class="test-chip-name">${c.name}</span>` +
      `<span class="test-chip-hobby">${hobbyLabel}</span>` +
      (priceLabel ? `<span class="test-chip-price">${priceLabel}</span>` : "") +
      (badges.length
        ? `<div class="test-chip-badges">${badges.join("")}</div>`
        : "") +
      placesHtml +
      `</div></div>`
    );
  }

  // チップグリッドを描画
  function renderChips(items, priceFn) {
    if (items.length === 0)
      return '<p class="test-empty">該当する生き物がいません。</p>';
    return `<div class="test-chips">${items.map((c) => renderChip(c, priceFn ? priceFn(c) : "")).join("")}</div>`;
  }

  // セクション1件を描画
  function renderSection(title, content) {
    return `<div class="test-section"><h3 class="test-section-title">${title}</h3>${content}</div>`;
  }

  // 結果全体を描画
  function renderTestResults() {
    if (!selectedGoal) return;
    const filtered = getFilteredCreatures().filter((c) =>
      enabledHobbies.has(c.hobby),
    );

    // ── 動的レアリティスコア ──
    // 通常種の天候パターン別・時間スロット数別の体数を集計し重みとする。
    // 生き物が増えるほど自動的に重みが変わる。
    // 天候は「出にくい条件ほど希少」を強調するため ×1.5 倍。
    const _normalCreatures = creatures.filter((c) => c.season === "normal");
    const _weatherWeight = {};
    _normalCreatures.forEach((c) => {
      const k = (c.weathers || []).slice().sort().join("+");
      _weatherWeight[k] = (_weatherWeight[k] || 0) + 1;
    });
    const _timeWeight = {};
    _normalCreatures.forEach((c) => {
      const n = (c.times || []).length;
      _timeWeight[n] = (_timeWeight[n] || 0) + 1;
    });
    const calcRarityScore = (c) => {
      const wk = (c.weathers || []).slice().sort().join("+");
      const ws = _weatherWeight[wk] || 0;
      const ts = _timeWeight[(c.times || []).length] || 0;
      return -(ws * 1.5 + ts);
    };
    const fishLevel = Number(bioLevelFishInput?.value) || 1;
    const insectLevel = Number(bioLevelInsectInput?.value) || 1;
    const birdLevel = Number(bioLevelBirdInput?.value) || 1;
    const gardenLevel = Number(userLevelGardenPage2Input?.value) || 1;
    const cookingLevel = Number(userLevelCookingPage2Input?.value) || 1;
    const creatureLvls = {
      釣り: fishLevel,
      虫捕り: insectLevel,
      野鳥観察: birdLevel,
    };
    const situationText = buildSituationText();
    let html = "";

    // 園芸・料理（通常種・趣味Lv以下）※販売食材は除外
    const filteredPage2 = page2Creatures.filter(
      (item) =>
        item.season === "normal" &&
        !isPage2StoreIngredient(item) &&
        (isPage2Gardening(item)
          ? enabledHobbies.has("園芸") && (item.level ?? 1) <= gardenLevel
          : enabledHobbies.has("料理") && (item.level ?? 1) <= cookingLevel),
    );

    // ── 目的別アドバイス ──
    switch (selectedGoal) {
      case "money": {
        const allUnlocked = [...filtered, ...filteredPage2];

        // 趣味キーを取得（creatures は string、page2 は array）
        const getItemHobbyKey = (c) =>
          Array.isArray(c.hobby) ? c.hobby[0] : c.hobby;

        // 趣味ごとのベースライン: 趣味レベル1で取れるアイテムの平均価格
        const allForBaseline = [
          ...creatures.filter((c) => c.season === "normal"),
          ...page2Creatures.filter(
            (c) => c.season === "normal" && !isPage2StoreIngredient(c),
          ),
        ];
        const baselines = {};
        ["釣り", "虫捕り", "野鳥観察", "園芸", "料理"].forEach((key) => {
          const hobbyItems = allForBaseline.filter(
            (c) => getItemHobbyKey(c) === key && (c.level ?? 1) <= 1,
          );
          const prices = hobbyItems
            .map((c) => {
              if (!Array.isArray(c.rarityData) || c.rarityData.length === 0)
                return 0;
              if (c.hobby === "野鳥観察") {
                const s2 = c.rarityData.find((r) => r.star === 2);
                const s1 = c.rarityData.find((r) => r.star === 1);
                return s2?.price ?? (s1 ? s1.price * 4 : 0);
              }
              return c.rarityData.find((r) => r.star === 1)?.price ?? 0;
            })
            .filter((p) => p > 0);
          baselines[key] =
            prices.length > 0
              ? prices.reduce((a, b) => a + b, 0) / prices.length
              : 1;
        });

        // 生物・料理は★1価格ベース（★5は確約できないため）÷ 趣味Lv1アイテムの平均価格
        // 野鳥観察は1回で3羽取れるため×3
        const getScore = (c) => {
          const qty = c.hobby === "野鳥観察" ? 3 : 1;
          return (
            (getStar1Price(c) * qty) / (baselines[getItemHobbyKey(c)] || 1)
          );
        };

        // 園芸プランター数（趣味レベルによる）
        const getGardenFoodPlanters = (lv) => {
          if (lv >= 10) return 40;
          if (lv >= 7) return 30;
          if (lv >= 4) return 20;
          return 10;
        };
        const getGardenFlowerPlanters = (lv) => {
          if (lv >= 10) return 60;
          if (lv >= 8) return 40;
          if (lv >= 5) return 24;
          if (lv >= 3) return 12;
          return 0;
        };
        const getGardenQuantity = (item) =>
          isPage2GardeningFlower(item)
            ? getGardenFlowerPlanters(gardenLevel)
            : getGardenFoodPlanters(gardenLevel);

        // 園芸効率スコア: 花は★5価格（チェーンメカニクスで量産可）、食材は★1価格（確実収入）
        const getGardenEfficiency = (item) => {
          const qty = getGardenQuantity(item);
          if (qty === 0) return 0;
          const price = isPage2GardeningFlower(item)
            ? getStar5Price(item)
            : getStar1Price(item);
          return (price * qty) / (item.time || 1);
        };

        const topNormalized = [...allUnlocked]
          .sort((a, b) => getScore(b) - getScore(a))
          .slice(0, 10);

        const gardenUnlocked = filteredPage2.filter(
          (item) => isPage2Gardening(item) && getGardenQuantity(item) > 0,
        );
        const gardenFood = gardenUnlocked.filter(
          (item) => !isPage2GardeningFlower(item),
        );
        const gardenFlower = gardenUnlocked.filter((item) =>
          isPage2GardeningFlower(item),
        );
        const topGardenFood = [...gardenFood]
          .sort((a, b) => getGardenEfficiency(b) - getGardenEfficiency(a))
          .slice(0, 5);
        const topGardenFlower = [...gardenFlower]
          .sort((a, b) => getGardenEfficiency(b) - getGardenEfficiency(a))
          .slice(0, 5);

        const gardenLabel = (c) => {
          const qty = getGardenQuantity(c);
          const eff = getGardenEfficiency(c);
          return `${Math.round(eff).toLocaleString()}G/h (${qty}個)`;
        };

        let gardenContent = "";
        if (topGardenFood.length > 0) {
          gardenContent += `<p class="test-cat-label">🥕 食材 Top 5</p>`;
          gardenContent += renderChips(topGardenFood, gardenLabel);
        }
        if (topGardenFlower.length > 0) {
          gardenContent += `<p class="test-cat-label">🌸 花 Top 5</p>`;
          gardenContent += renderChips(topGardenFlower, gardenLabel);
        }
        if (!gardenContent) {
          gardenContent =
            '<p class="test-empty">解放済みの園芸アイテムがありません。</p>';
        }

        // ① 生物（釣り・虫捕り・野鳥観察）
        const topCreatures = [...filtered]
          .sort((a, b) => getScore(b) - getScore(a))
          .slice(0, 10);

        // ③ 料理
        const cookingUnlocked = filteredPage2.filter(
          (item) => !isPage2Gardening(item),
        );
        const topCooking = [...cookingUnlocked]
          .sort((a, b) => getScore(b) - getScore(a))
          .slice(0, 10);

        html += renderSection(
          `🐟 ① 生物 相対スコア Top 10（趣味Lv1の平均価格比 , 各生物の出現率を無視）`,
          renderChips(
            topCreatures,
            (c) =>
              `${getScore(c).toFixed(1)}倍${c.hobby === "野鳥観察" ? "（×3）" : ""} / ★1: ${fmt(getStar1Price(c))}`,
          ),
        );
        html += renderSection(
          `🌿 ② 園芸 効率ランキング（花: ★5価格・食材: ★1価格 × 個数 ÷ 育成時間）`,
          gardenContent,
        );
        html += renderSection(
          `🍳 ③ 料理 相対スコア Top 10（料理Lv1の平均価格比 , 製作難易度を無視）`,
          renderChips(
            topCooking,
            (c) => `${getScore(c).toFixed(1)}倍 / ★1: ${fmt(getStar1Price(c))}`,
          ),
        );
        break;
      }
      case "collect": {
        const unacquired = [...filtered, ...filteredPage2].filter(
          (c) => !c.acquired,
        );
        const topUnacquired = [...unacquired]
          .filter((c) => Array.isArray(c.times))
          .sort((a, b) => calcRarityScore(b) - calcRarityScore(a))
          .slice(0, 10);
        if (topUnacquired.length > 0) {
          html += renderSection(
            `📖 おすすめの今取れる未獲得 Top10（出現条件が厳しい順）`,
            renderChips(topUnacquired),
          );
        }
        html += renderSection(
          `📖 コレクション完成 ─ 今取れる未獲得（${unacquired.length}種）`,
          renderChips(unacquired),
        );
        const allUnacquired = [
          ...creatures.filter(
            (c) =>
              c.season === "normal" &&
              !c.acquired &&
              c.level <= (creatureLvls[c.hobby] ?? 1),
          ),
          ...page2Creatures.filter(
            (item) =>
              item.season === "normal" &&
              !item.acquired &&
              !isPage2StoreIngredient(item) &&
              (isPage2Gardening(item)
                ? (item.level ?? 1) <= gardenLevel
                : (item.level ?? 1) <= cookingLevel),
          ),
        ];
        html += renderSection(
          `📖 未獲得（全体）（${allUnacquired.length}種）`,
          renderChips(allUnacquired),
        );
        break;
      }
      case "star5": {
        const notStar5 = [...filtered, ...filteredPage2].filter(
          (c) => !c.fiveStar,
        );
        const topNotStar5 = [...notStar5]
          .filter((c) => Array.isArray(c.times))
          .sort((a, b) => calcRarityScore(b) - calcRarityScore(a))
          .slice(0, 10);
        if (topNotStar5.length > 0) {
          html += renderSection(
            `⭐ おすすめの今取れる★5未達 Top10（出現条件が厳しい順）`,
            renderChips(topNotStar5),
          );
        }
        html += renderSection(
          `⭐ ★5を増やす ─ 今取れる★5未達（${notStar5.length}種）`,
          renderChips(notStar5, (c) => `★5: ${fmt(getStar5Price(c))}`),
        );
        break;
      }
      case "master": {
        const notMaster = [...filtered, ...filteredPage2].filter(
          (c) => c.season === "normal" && !c.master,
        );
        const topNotMaster = [...notMaster]
          .filter((c) => Array.isArray(c.times))
          .sort((a, b) => calcRarityScore(b) - calcRarityScore(a))
          .slice(0, 10);
        if (topNotMaster.length > 0) {
          html += renderSection(
            `🏆 おすすめの今取れるマスター未達 Top10（出現条件が厳しい順）`,
            renderChips(topNotMaster),
          );
        }
        html += renderSection(
          `🏆 マスターを増やす ─ 今取れるマスター未達の通常種（${notMaster.length}種）`,
          renderChips(notMaster),
        );
        break;
      }
      case "cat": {
        const catFood = filtered.filter((c) => normalFishNameSet.has(c.name));

        const allPickyFishNames = new Set(
          catStates.flatMap((cat) => cat.pickyFishNames || []),
        );

        // スコア計算（ソート用のみ）
        const getCatScore = (c) => {
          let score = 0;
          const w = c.weathers || [];
          if (w.includes("晴れ")) score -= 2;
          if (w.includes("雨(雪)")) score -= 1;
          score -= (c.times || []).length;
          catStates.forEach((cat) => {
            if ((cat.excludedFishNames || []).includes(c.name)) score -= 5;
          });
          if (allPickyFishNames.has(c.name)) score -= 5;
          return score;
        };

        // ① 各猫の好物セクション（猫ごとに個別ボックス）
        const catsWithFav = catStates.filter(
          (cat) => (cat.favoriteFishNames || []).length > 0,
        );
        const allFavNameSet = new Set(
          catStates.flatMap((cat) => cat.favoriteFishNames || []),
        );
        catsWithFav.forEach((cat) => {
          const favSet = new Set(cat.favoriteFishNames || []);
          const favFood = catFood.filter((c) => favSet.has(c.name));
          if (favFood.length > 0) {
            html += renderSection(
              `⭐ ${cat.name || "猫"}の好物`,
              `<div class="test-chips">${favFood.map((c) => renderChip(c, "", "test-chip--favorite")).join("")}</div>`,
            );
          }
        });

        // ② おすすめ Top10（スコア順・-25点以下除外）
        const topFood = [...catFood]
          .filter((c) => getCatScore(c) > -25)
          .sort((a, b) => getCatScore(b) - getCatScore(a))
          .slice(0, 10);
        if (topFood.length > 0) {
          html += renderSection(
            `🐟 おすすめ Top10（希少・猫チェック少ない順）`,
            `<div class="test-chips">${topFood.map((c) => renderChip(c, "", allFavNameSet.has(c.name) ? "test-chip--favorite" : "")).join("")}</div>`,
          );
        }

        // ③ 一覧（全件・スコア順）
        const allSorted = [...catFood].sort(
          (a, b) => getCatScore(b) - getCatScore(a),
        );
        if (allSorted.length > 0) {
          html += renderSection(
            `📋 一覧（${catFood.length}種）`,
            `<div class="test-chips">${allSorted.map((c) => renderChip(c, "")).join("")}</div>`,
          );
        } else {
          html += renderSection(
            `🐱 にゃんこのエサ`,
            '<p class="test-empty">今の状況でエサになる魚はいません。</p>',
          );
        }

        break;
      }
    }

    // ── 末尾：今の状況で捕れる生き物 ──
    /* html += renderSection(
      `📍 ${situationText}で捕れる生き物（${filtered.length}種）`,
      renderChips(filtered, (c) => fmt(getStar2Price(c))),
    ); */

    testResultEl.innerHTML = html;
  }
}

// =======================
// メイン初期化
// =======================

/**
 * アプリ全体の初期化処理。
 * 1. localStorage から状態を復元
 * 2. フィルターのプルダウン選択肢を構築
 * 3. 各ページを初期化してレンダリングを実行
 */
function init() {
  loadState();
  saveState(); // 移行後は新キーを確実に更新
  updateToggleButtons();
  updateToggleButtonsPage2();
  normalizeBirdRarityData();

  // hobby / time / weather
  const hobbies = new Set(creatures.map((c) => c.hobby));
  hobbies.forEach((h) => {
    const opt = document.createElement("option");
    opt.value = h;
    opt.textContent = h;
    hobbyFilter.appendChild(opt);
  });

  // 時間の先頭に「すべて」を追加
  timeFilter.innerHTML = '<option value="">すべて</option>';

  const times = new Set();
  creatures.forEach((c) => {
    c.times?.forEach((t) => times.add(t));
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
  // 天候（固定選択肢のためHTML側に定義済み。動的構築不要）

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
  const festivalPriority = ["dreamlightfes", "blockfes"];
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

  // eventnameフィルター初期化
  const page1OtherEventItems = creatures.filter((c) => isOtherEvent(c.season));
  const page2OtherEventItems = page2Creatures.filter((item) =>
    isOtherEvent(item.season),
  );

  const page1Eventnames = [
    ...new Set(page1OtherEventItems.map((c) => c.eventname).filter(Boolean)),
  ];
  const page2Eventnames = [
    ...new Set(
      page2OtherEventItems.map((item) => item.eventname).filter(Boolean),
    ),
  ];

  // page1: othereventがなければ選択肢も消しプルダウンは常に非表示
  eventnameFilter.innerHTML = '<option value="">すべて</option>';
  page1Eventnames.forEach((name) => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    eventnameFilter.appendChild(opt);
  });
  if (page1Eventnames.length === 0) {
    eventnameFilter.style.visibility = "hidden";
    // 「その他イベント」選択肢をseasonFilterから除去
    Array.from(seasonFilter.options).forEach((opt) => {
      if (opt.value === "otherevent") opt.remove();
    });
  }

  // page2: 通常通り
  eventnameFilterPage2.innerHTML = '<option value="">すべて</option>';
  page2Eventnames.forEach((name) => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    eventnameFilterPage2.appendChild(opt);
  });
  // イベント名フィルターは「その他イベント」選択時のみ表示
  eventnameFilterPage2.style.visibility = "hidden";
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

  updatePlace1Options();
  updatePlace2Options();
  const hadSavedState = loadFilterState();

  // 保存済み状態がない場合のみデフォルトシーズンを適用
  if (!hadSavedState) {
    if (sortedFestivals.includes("blockfes")) {
      seasonFilter.value = "blockfes";
      eventnameFilter.style.visibility = "hidden";
      seasonFilterPage2.value = "blockfes";
    } else if (sortedRegularSeasons.includes("normal")) {
      seasonFilter.value = "normal";
      eventnameFilter.style.visibility = "hidden";
      seasonFilterPage2.value = "normal";
    }
  }

  filterCreatures();
  initPage2();

  // にゃんこフィルター選択肢を構築（釣りデータから）
  if (catPlace1Filter && catPlace2Filter && catTimeFilter && catWeatherFilter) {
    const catFishData = fishingCreatures.filter((f) =>
      normalFishNameSet.has(f.name),
    );

    // 場所1
    const catPlaces1 = new Set();
    catFishData.forEach((f) => f.places1?.forEach((p) => catPlaces1.add(p)));
    const priorityOrder = [
      "森林",
      "温泉山",
      "花畑",
      "漁村",
      "中心街",
      "郊外",
      "ホーム",
      "水辺",
      "川",
      "湖",
      "海",
      "★特殊",
    ];
    priorityOrder
      .filter((p) => catPlaces1.has(p))
      .forEach((p) => {
        const opt = document.createElement("option");
        opt.value = p;
        opt.textContent = p;
        catPlace1Filter.appendChild(opt);
      });

    // 場所2（場所1連動で更新）
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
      "「海釣り」",
      "「虫コイコイ」",
      "「巣ごもり」",
      "「虫寄せ装置」",
      "「ブランクの頭」",
    ];

    function buildCatPlace2Options(selectedPlace1) {
      const prevValue = catPlace2Filter.value;
      // 先頭の空オプション以外を削除
      while (catPlace2Filter.options.length > 1) {
        catPlace2Filter.remove(1);
      }
      const filtered = selectedPlace1
        ? catFishData.filter((f) => f.places1?.includes(selectedPlace1))
        : catFishData;
      const catPlaces2 = new Set();
      filtered.forEach((f) => f.places2?.forEach((p) => catPlaces2.add(p)));
      // 生物図鑑と同様に place1ToExcludedPlace2Map で除外
      if (selectedPlace1) {
        const excluded = place1ToExcludedPlace2Map[selectedPlace1] || [];
        excluded.forEach((p) => catPlaces2.delete(p));
      }
      priorityOrder2
        .filter((p) => catPlaces2.has(p))
        .forEach((p) => {
          const opt = document.createElement("option");
          opt.value = p;
          opt.textContent = p;
          catPlace2Filter.appendChild(opt);
        });
      // 以前の値が引き続き有効なら維持、そうでなければリセット
      if (
        Array.from(catPlace2Filter.options).some((o) => o.value === prevValue)
      ) {
        catPlace2Filter.value = prevValue;
      } else {
        catPlace2Filter.value = "";
      }
    }

    buildCatPlace2Options(catPlace1Filter.value);

    // 時間
    const catTimes = new Set();
    catFishData.forEach((f) => f.times?.forEach((t) => catTimes.add(t)));
    Array.from(catTimes)
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
        catTimeFilter.appendChild(opt);
      });

    // 天候（固定選択肢のためHTML側に定義済み。動的構築不要）

    // 保存済みのにゃんこフィルター値を復元（動的オプション構築後に実施）
    const savedCatFilters = (() => {
      try {
        return JSON.parse(localStorage.getItem(FILTER_STORAGE_KEY)) || {};
      } catch {
        return {};
      }
    })();
    if (savedCatFilters.catPlace1Filter != null) {
      catPlace1Filter.value = savedCatFilters.catPlace1Filter;
      buildCatPlace2Options(catPlace1Filter.value);
    }
    if (savedCatFilters.catPlace2Filter != null)
      catPlace2Filter.value = savedCatFilters.catPlace2Filter;
    if (savedCatFilters.catTimeFilter != null)
      catTimeFilter.value = savedCatFilters.catTimeFilter;

    // イベントリスナー
    catPlace1Filter.addEventListener("change", () => {
      buildCatPlace2Options(catPlace1Filter.value);
      renderPage3FishList();
      saveFilterState();
    });
    [catPlace2Filter, catTimeFilter, catWeatherFilter].forEach((el) => {
      el.addEventListener("change", renderPage3FishList);
      el.addEventListener("change", saveFilterState);
    });
  }

  initPage3();
  initPageDog();
  initPageWild();

  // 動物タイプ切り替えセレクター
  const animalTypeSelect = document.getElementById("animalTypeSelect");
  if (animalTypeSelect) {
    animalTypeSelect.addEventListener("change", () => {
      const type = animalTypeSelect.value;
      const catSection = document.getElementById("animalSection-cat");
      const dogSection = document.getElementById("animalSection-dog");
      const wildSection = document.getElementById("animalSection-wild");
      if (catSection) catSection.hidden = type !== "cat";
      if (dogSection) dogSection.hidden = type !== "dog";
      if (wildSection) wildSection.hidden = type !== "wild";
      saveFilterState();
    });
  }

  initPageTest();

  // 全フィルター変更時に自動保存
  [
    hobbyFilter,
    bioLevelFishInput,
    bioLevelInsectInput,
    bioLevelBirdInput,
    sortBioSelect,
    seasonFilter,
    eventnameFilter,
    timeFilter,
    place1Filter,
    place2Filter,
    weatherFilter,
    hobbyFilterPage2,
    hobbyModeFilterPage2,
    userLevelGardenPage2Input,
    userLevelCookingPage2Input,
    seasonFilterPage2,
    eventnameFilterPage2,
    sortPage2,
    fishSubFilter,
  ].forEach((el) => el?.addEventListener("change", saveFilterState));
  sortBioSelect?.addEventListener("change", filterCreatures);
  searchInput?.addEventListener("input", saveFilterState);
  searchInputPage2?.addEventListener("input", saveFilterState);

  // 検索リセットボタン
  resetFilterBtn?.addEventListener("click", resetFiltersPage1);
  resetFilterBtnPage2?.addEventListener("click", resetFiltersPage2);
  resetFilterBtnCat?.addEventListener("click", resetFiltersCat);
}

// =======================
// 食材チップ 長押し拡大
// =======================

/**
 * 料理カードの食材チップを長押し（400ms）すると拡大ポップアップを表示する。
 * タッチ（スマホ）とマウス（PC）の両方に対応する。
 * 長押し後のクリックでカードがフリップしないようにキャプチャ段階でブロックする。
 */
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
    const el = getOrCreateZoom();
    const zoomImg = el.querySelector("#food-chip-zoom-img");
    const zoomText = el.querySelector("#food-chip-zoom-text");

    if (chip.classList.contains("food-chip")) {
      const img = chip.querySelector(".food-chip-img");
      const text = chip.querySelector(".food-chip-text");
      if (!img || !text) return;
      zoomImg.src = img.src;
      zoomImg.alt = img.alt;
      zoomImg.style.display = "";
      zoomText.textContent = text.textContent;
    } else {
      const label = chip.dataset.label;
      if (!label) return;
      const chipImg = chip.querySelector(".card-weather-chip-img");
      if (chipImg) {
        zoomImg.src = chipImg.src;
        zoomImg.alt = chipImg.alt;
        zoomImg.style.display = "";
      } else {
        zoomImg.style.display = "none";
      }
      zoomText.textContent = label;
    }

    const rect = chip.getBoundingClientRect();
    // ポップアップをチップの上に配置（固定値: 幅120px + 余白）
    const hasImg = zoomImg.style.display !== "none";
    el.classList.toggle("text-only", !hasImg);
    const popupW = hasImg ? 120 : el.offsetWidth || 120;
    const popupH = hasImg ? 164 : 52; // image(120)+padding(16)+gap(6)+text(~22) or text only
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
      const chip = e.target.closest(
        ".food-chip, .card-time-badge, .card-weather-chip",
      );
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
    const chip = e.target.closest(
      ".food-chip, .card-time-badge, .card-weather-chip",
    );
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
      if (e.target.closest(".food-chip-img, .card-weather-chip-img")) {
        e.preventDefault();
      }
    },
    true,
  );

  document.addEventListener(
    "dragstart",
    function (e) {
      if (e.target.closest(".food-chip-img, .card-weather-chip-img")) {
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

// =======================
// URLハッシュ経由の自動インポート（ブックマークレット連携）
// =======================

/**
 * ページ読み込み時に URL ハッシュ（#import=...）が付いていれば
 * Base64 デコードして localStorage に自動インポートする。
 * インポート後はハッシュを消してページをリロードする。
 */
(function checkHashImport() {
  var hash = window.location.hash;
  if (!hash.startsWith("#import=")) return;

  // ハッシュをすぐにURLから消す
  history.replaceState(
    null,
    "",
    window.location.pathname + window.location.search,
  );

  var encoded = hash.slice("#import=".length);
  var parsed;
  try {
    parsed = JSON.parse(decodeURIComponent(escape(atob(encoded))));
  } catch (e) {
    console.warn("インポートデータのデコードに失敗しました", e);
    return;
  }

  // 旧形式（.state/.page3）または全キーダンプどちらも対応
  var stateRaw =
    parsed["heartpia-state-v2"] ||
    parsed["heartpia-state"] ||
    parsed.state ||
    null;
  var page3Raw = parsed["heartpia-page3-cat-state-v1"] || parsed.page3 || null;

  // 全キーダンプの場合、creatures配列を持つ値を探してstateとして使う
  if (!stateRaw) {
    var keys = Object.keys(parsed);
    for (var ki = 0; ki < keys.length; ki++) {
      var val = parsed[keys[ki]];
      if (typeof val === "string") {
        try {
          var tmp = JSON.parse(val);
          if (tmp && Array.isArray(tmp.creatures) && tmp.creatures.length > 0) {
            stateRaw = val;
            break;
          }
        } catch (e) {
          /* skip */
        }
      }
    }
  }
  if (!page3Raw) {
    var keys2 = Object.keys(parsed);
    for (var ki2 = 0; ki2 < keys2.length; ki2++) {
      var val2 = parsed[keys2[ki2]];
      if (typeof val2 === "string") {
        try {
          var tmp2 = JSON.parse(val2);
          if (
            tmp2 &&
            Array.isArray(tmp2.catStates) &&
            tmp2.catStates.length > 0
          ) {
            page3Raw = val2;
            break;
          }
        } catch (e) {
          /* skip */
        }
      }
    }
  }

  var summaryLines = [];
  var hasAnything = false;

  if (stateRaw) {
    try {
      var stateObj = JSON.parse(stateRaw);
      var ca = (stateObj.creatures || []).filter(function (c) {
        return c.acquired;
      }).length;
      var cs = (stateObj.creatures || []).filter(function (c) {
        return c.fiveStar;
      }).length;
      var pa = (stateObj.page2 || []).filter(function (c) {
        return c.acquired;
      }).length;
      var ps = (stateObj.page2 || []).filter(function (c) {
        return c.fiveStar;
      }).length;
      if (ca > 0 || cs > 0) {
        summaryLines.push("生物図鑑：獲得 " + ca + " 件・★5 " + cs + " 件");
        hasAnything = true;
      }
      if (pa > 0 || ps > 0) {
        summaryLines.push("園芸・料理：獲得 " + pa + " 件・★5 " + ps + " 件");
        hasAnything = true;
      }
    } catch (e) {
      /* skip */
    }
  }

  if (page3Raw) {
    try {
      var p3 = JSON.parse(page3Raw);
      var cwd = (p3.catStates || []).filter(function (c, i) {
        var def = "猫" + (i + 1);
        return (
          (typeof c.name === "string" &&
            c.name.trim() &&
            c.name.trim() !== def) ||
          (Array.isArray(c.favoriteFishNames) &&
            c.favoriteFishNames.length > 0) ||
          (Array.isArray(c.excludedFishNames) && c.excludedFishNames.length > 0)
        );
      }).length;
      if (cwd > 0) {
        summaryLines.push("にゃんこ：" + cwd + " 匹分の名前・好物データ");
        hasAnything = true;
      }
    } catch (e) {
      /* skip */
    }
  }

  if (!hasAnything) {
    alert("旧サイトに引き継ぎ対象のデータが見つかりませんでした。");
    return;
  }

  var confirmMsg =
    "以下のデータを引き継ぎますか？\n（現在のデータは上書きされます）\n\n" +
    summaryLines.join("\n");
  if (!window.confirm(confirmMsg)) return;

  if (stateRaw) localStorage.setItem("heartpia-state-v2", stateRaw);
  if (page3Raw) localStorage.setItem("heartpia-page3-cat-state-v1", page3Raw);

  alert("引き継ぎ完了！ページを再読み込みします。");
  location.reload();
})();

// =======================
// 旧サイトからのデータ引き継ぎ（手動貼り付け）
// =======================

/**
 * 旧サイトのコンソールスニペットで出力したJSONテキストを
 * テキストエリアに貼り付けてインポートする機能を初期化する。
 * 引き継ぎ内容の件数を確認ダイアログで提示してから上書きする。
 */
(function setupImportFromOldSite() {
  const btn = document.getElementById("importFromOldSiteBtn");
  const statusEl = document.getElementById("importStatus");
  const textarea = document.getElementById("importDataInput");
  const copyBtn = document.getElementById("copySnippetBtn");
  const snippetEl = document.getElementById("exportSnippet");

  // ── スニペットのコピーボタン ──
  if (copyBtn && snippetEl) {
    copyBtn.addEventListener("click", function () {
      navigator.clipboard
        .writeText(snippetEl.textContent)
        .then(function () {
          copyBtn.textContent = "コピー完了！";
          setTimeout(function () {
            copyBtn.textContent = "コピー";
          }, 2000);
        })
        .catch(function () {
          // clipboard API が使えない場合はフォールバック
          var range = document.createRange();
          range.selectNodeContents(snippetEl);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
          copyBtn.textContent = "コピー完了！";
          setTimeout(function () {
            copyBtn.textContent = "コピー";
          }, 2000);
        });
    });
  }

  if (!btn || !statusEl || !textarea) return;

  btn.addEventListener("click", function () {
    var raw = textarea.value.trim();
    if (!raw) {
      statusEl.textContent = "テキストが入力されていません。";
      return;
    }

    var parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (e) {
      statusEl.textContent =
        "テキストの形式が正しくありません。コンソールのコードを実行して表示されたテキストをそのまま貼り付けてください。";
      return;
    }

    var stateRaw = parsed.state || null;
    var page3Raw = parsed.page3 || null;

    // ── 引き継ぎ内容のサマリーを生成 ──
    var summaryLines = [];
    var hasAnything = false;

    if (stateRaw) {
      try {
        var stateObj = JSON.parse(stateRaw);
        var creatureAcquired = (stateObj.creatures || []).filter(function (c) {
          return c.acquired;
        }).length;
        var creatureStar5 = (stateObj.creatures || []).filter(function (c) {
          return c.fiveStar;
        }).length;
        var page2Acquired = (stateObj.page2 || []).filter(function (c) {
          return c.acquired;
        }).length;
        var page2Star5 = (stateObj.page2 || []).filter(function (c) {
          return c.fiveStar;
        }).length;
        if (creatureAcquired > 0 || creatureStar5 > 0) {
          summaryLines.push(
            "生物図鑑：獲得 " +
              creatureAcquired +
              " 件・★5 " +
              creatureStar5 +
              " 件",
          );
          hasAnything = true;
        }
        if (page2Acquired > 0 || page2Star5 > 0) {
          summaryLines.push(
            "園芸・料理：獲得 " +
              page2Acquired +
              " 件・★5 " +
              page2Star5 +
              " 件",
          );
          hasAnything = true;
        }
      } catch (e) {
        /* skip */
      }
    }

    if (page3Raw) {
      try {
        var page3Obj = JSON.parse(page3Raw);
        var catsWithData = (page3Obj.catStates || []).filter(function (c, i) {
          var defaultName = "猫" + (i + 1);
          return (
            (typeof c.name === "string" &&
              c.name.trim() !== "" &&
              c.name.trim() !== defaultName) ||
            (Array.isArray(c.favoriteFishNames) &&
              c.favoriteFishNames.length > 0) ||
            (Array.isArray(c.excludedFishNames) &&
              c.excludedFishNames.length > 0)
          );
        });
        if (catsWithData.length > 0) {
          summaryLines.push(
            "にゃんこ：" + catsWithData.length + " 匹分の名前・好物データ",
          );
          hasAnything = true;
        }
      } catch (e) {
        /* skip */
      }
    }

    if (!hasAnything) {
      statusEl.textContent = "引き継ぎ対象のデータが見つかりませんでした。";
      return;
    }

    var confirmMsg =
      "以下のデータを引き継ぎますか？\n（現在のデータは上書きされます）\n\n" +
      summaryLines.join("\n");

    if (!window.confirm(confirmMsg)) {
      statusEl.textContent = "キャンセルしました。";
      return;
    }

    if (stateRaw) localStorage.setItem("heartpia-state-v2", stateRaw);
    if (page3Raw) localStorage.setItem("heartpia-page3-cat-state-v1", page3Raw);

    statusEl.textContent = "引き継ぎ完了！ページを再読み込みします…";
    setTimeout(function () {
      location.reload();
    }, 1200);
  });
})();

init();
