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
const acquiredTogglePage2 = document.getElementById("acquiredTogglePage2");
const star5TogglePage2 = document.getElementById("star5TogglePage2");
const totalCountPage2El = document.getElementById("totalCountPage2");
const displayCountPage2El = document.getElementById("displayCountPage2");
const acquiredCountPage2El = document.getElementById("acquiredCountPage2");
const star5CountPage2El = document.getElementById("star5CountPage2");
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
const eventnameFilterWrap = document.getElementById("eventnameFilterWrap");
const eventnameFilter = document.getElementById("eventnameFilter");
const eventnameFilterPage2Wrap = document.getElementById(
  "eventnameFilterPage2Wrap",
);
const eventnameFilterPage2 = document.getElementById("eventnameFilterPage2");

let showAcquired = true;
let showFiveStar = true;
let showAcquiredPage2 = true;
let showFiveStarPage2 = true;

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

// 配列seasonの場合、"normal"以外の最初の値をプライマリとして返す
function getPrimarySeasonValue(seasonValue) {
  if (Array.isArray(seasonValue)) {
    return seasonValue.find((v) => v !== "normal") ?? "normal";
  }
  return seasonValue;
}

function isFestivalSeason(seasonValue) {
  return FESTIVAL_SEASON_VALUES.has(getPrimarySeasonValue(seasonValue));
}

function isOtherEvent(seasonValue) {
  return OTHER_EVENT_SEASON_VALUES.has(getPrimarySeasonValue(seasonValue));
}

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
function isMultiSeasonNormal(seasonValue) {
  return Array.isArray(seasonValue) && seasonValue.includes("normal");
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
      (place) => !["水辺", "郊外", "ホーム", "中心街", "★特殊"].includes(place),
    ) || ""
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
};

// =======================
// 検索リセット
// =======================
function applyDefaultSeasons() {
  // page1: 通常のみ
  if (seasonFilter) {
    seasonFilter.value = "normal";
    if (eventnameFilter) eventnameFilter.style.visibility = "hidden";
  }
  // page2: MALTESEコラボ（otherevent）
  if (seasonFilterPage2) {
    seasonFilterPage2.value = "otherevent";
    if (eventnameFilterPage2) {
      eventnameFilterPage2.value = "MALTESEコラボ";
      eventnameFilterPage2.style.visibility = "visible";
    }
  }
}

function resetFiltersPage1() {
  if (searchInput) searchInput.value = "";
  if (hobbyFilter) hobbyFilter.value = "";
  if (userLevelInput) userLevelInput.value = "1";
  updatePlace1Options();
  updatePlace2Options();
  if (timeFilter) timeFilter.value = "";
  if (weatherFilter) weatherFilter.value = "";
  if (seasonFilter) {
    seasonFilter.value = "normal";
    if (eventnameFilter) eventnameFilter.style.visibility = "hidden";
  }
  saveFilterState();
  filterCreatures();
}

function resetFiltersPage2() {
  if (searchInputPage2) searchInputPage2.value = "";
  if (hobbyFilterPage2) hobbyFilterPage2.value = "";
  if (userLevelPage2Input) userLevelPage2Input.value = "1";
  if (seasonFilterPage2) {
    seasonFilterPage2.value = "otherevent";
    if (eventnameFilterPage2) {
      eventnameFilterPage2.value = "MALTESEコラボ";
      eventnameFilterPage2.style.visibility = "visible";
    }
  }
  if (sortPage2Select) sortPage2Select.value = "level";
  saveFilterState();
  filterAndRenderPage2();
}

function resetFiltersCat() {
  if (catSearchInput) catSearchInput.value = "";
  if (catPlace1Filter) catPlace1Filter.value = "";
  if (catPlace2Filter) catPlace2Filter.value = "";
  if (catTimeFilter) catTimeFilter.value = "";
  if (catWeatherFilter) catWeatherFilter.value = "";
  renderPage3FishList();
}

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
  const keyword = searchInput.value.trim().toLowerCase();

  const filtered = creatures.filter((c) => {
    // 趣味レベル：フィルタリングしない（すべて表示する）
    // if (userLevel < c.level) return false;

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
    if (place1 && !c.places1?.includes(place1)) return false;
    if (place2 && !c.places2?.includes(place2)) return false;
    if (time && !c.times?.includes(time)) return false;
    if (weather) {
      const w = c.weathers || [];
      if (weather === "rainbow_only") {
        if (!(w.length === 1 && w[0] === "虹")) return false;
      } else if (weather === "exclude_sunny") {
        const match = ["雨(雪)", "虹"];
        if (w.length !== match.length || !match.every((x) => w.includes(x)))
          return false;
      } else if (weather === "exclude_rain") {
        const match = ["晴れ", "虹"];
        if (w.length !== match.length || !match.every((x) => w.includes(x)))
          return false;
      }
    }
    // グローバル toggles: OFF にすると該当済みを非表示
    if (!showAcquired && c.acquired) return false;
    if (!showFiveStar && c.fiveStar) return false;

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
const FILTER_STORAGE_KEY = "heartpia-filters-v1";

function saveFilterState() {
  const state = {
    searchInput: searchInput?.value ?? "",
    hobbyFilter: hobbyFilter?.value ?? "",
    userLevel: userLevelInput?.value ?? "1",
    seasonFilter: seasonFilter?.value ?? "",
    eventnameFilter: eventnameFilter?.value ?? "",
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
    userLevelPage2: userLevelPage2?.value ?? "1",
    seasonFilterPage2: seasonFilterPage2?.value ?? "",
    eventnameFilterPage2: eventnameFilterPage2?.value ?? "",
    sortPage2: sortPage2?.value ?? "",
    viewOneColumnPage2: resultPage2?.classList.contains("one-column") ?? false,
  };
  localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(state));
}

function loadFilterState() {
  const raw = localStorage.getItem(FILTER_STORAGE_KEY);
  if (!raw) return false;
  try {
    const s = JSON.parse(raw);
    if (searchInput && s.searchInput != null) searchInput.value = s.searchInput;
    if (hobbyFilter && s.hobbyFilter != null) hobbyFilter.value = s.hobbyFilter;
    if (userLevelInput && s.userLevel != null)
      userLevelInput.value = s.userLevel;
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
    if (userLevelPage2 && s.userLevelPage2 != null)
      userLevelPage2.value = s.userLevelPage2;
    if (seasonFilterPage2 && s.seasonFilterPage2 != null)
      seasonFilterPage2.value = s.seasonFilterPage2;
    if (eventnameFilterPage2 && s.eventnameFilterPage2 != null)
      eventnameFilterPage2.value = s.eventnameFilterPage2;
    if (seasonFilterPage2?.value === "otherevent")
      eventnameFilterPage2.style.visibility = "visible";
    if (sortPage2 && s.sortPage2 != null) sortPage2.value = s.sortPage2;
    if (s.viewOneColumnPage2) {
      resultPage2?.classList.add("one-column");
      document.getElementById("view1Page2")?.classList.add("active");
      document.getElementById("view2Page2")?.classList.remove("active");
    }
    return true;
  } catch (e) {
    console.warn("フィルター状態のロードに失敗しました", e);
    return false;
  }
}

function saveState() {
  const payload = {
    showAcquired,
    showFiveStar,
    showAcquiredPage2,
    showFiveStarPage2,
    creatures: creatures.map((c) => ({
      name: c.name,
      acquired: !!c.acquired,
      fiveStar: !!c.fiveStar,
    })),
    page2: page2Creatures.map((c) => ({
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
    if (typeof obj.showAcquiredPage2 === "boolean")
      showAcquiredPage2 = obj.showAcquiredPage2;
    if (typeof obj.showFiveStarPage2 === "boolean")
      showFiveStarPage2 = obj.showFiveStarPage2;
    if (Array.isArray(obj.creatures)) {
      obj.creatures.forEach((stored) => {
        const target = creatures.find((c) => c.name === stored.name);
        if (!target) return;
        target.acquired = !!stored.acquired;
        target.fiveStar = !!stored.fiveStar;
      });
    }
    if (Array.isArray(obj.page2)) {
      obj.page2.forEach((stored) => {
        const target = page2Creatures.find((c) => c.name === stored.name);
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

function updateCountersPage2(shownList) {
  if (!totalCountPage2El) return;
  totalCountPage2El.textContent = `全件：${page2Creatures.length}`;
  displayCountPage2El.textContent = `表示：${shownList.length}`;
  acquiredCountPage2El.textContent = `獲得：${page2Creatures.filter((c) => c.acquired).length}`;
  star5CountPage2El.textContent = `★5：${page2Creatures.filter((c) => c.fiveStar).length}`;
}

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
    "「海釣り」",
    "「虫コイコイ」",
    "「巣ごもり」",
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
function renderList(list, userLevel) {
  if (list.length === 0) {
    result.innerHTML = "<p>条件に合う生き物がいません。</p>";
    return;
  }

  // シーズン値ごとにグループ化（フェス → シーズン → 通常 → その他イベントの順）
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
      (c) => c.hobby === hobby && c.level <= userLevel,
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

    return `
      <div class="card card-flip${isTopPrice ? " card-top-price" : ""}" role="button" tabindex="0" aria-label="${c.name}の詳細カードを裏返す">
        <div class="card-inner">
          <div class="card-front ${cardClass}">
            ${placeBackgroundMarkup}
            ${c.img ? `<img class="card-img" src="${c.img}" alt="${c.name}" loading="eager">` : ""}
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
    const group = list.filter(
      (c) => getPrimarySeasonValue(c.season) === season,
    );
    const label = SEASON_LABELS[season] || season;
    html += `<div class="creature-group"><h2>${label}</h2><div class="creature-group-content">${group.map(generateCard).join("")}</div></div>`;
  });

  regularSeasonValues.forEach((season) => {
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
        const sub = group.filter((c) => c.eventname === en);
        inner += `<p class="season-event-sub">${en}</p><div class="creature-group-content">${sub.map(generateCard).join("")}</div>`;
      });
      if (noEventItems.length > 0) {
        inner += `<div class="creature-group-content">${noEventItems.map(generateCard).join("")}</div>`;
      }
    }
    if (inner)
      html += `<div class="creature-group"><h2>${label}</h2>${inner}</div>`;
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
    const season = getPrimarySeasonValue(item.season);
    const key = `${cat}::${season}`;
    if (!_p2Groups.has(key)) _p2Groups.set(key, []);
    _p2Groups.get(key).push(item);
  });
  _p2Groups.forEach((items) => {
    const eligible = items.filter((item) => userLevel >= (item.level ?? 1));
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
        <article class="card card-flip${isTopPrice ? " card-top-price" : ""}" role="button" tabindex="0" aria-label="${item.name}の詳細カードを裏返す">
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
              <div class="card-control-row">
                <label><input type="checkbox" class="card-acquired-checkbox-p2" data-name="${item.name}" ${item.acquired ? "checked" : ""} /> 獲得</label>
                <label><input type="checkbox" class="card-star5-checkbox-p2" data-name="${item.name}" ${item.fiveStar ? "checked" : ""} /> ★5</label>
              </div>
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

  festivalSeasonValues.forEach((season) => {
    const group = list.filter(
      (c) => getPrimarySeasonValue(c.season) === season,
    );
    const label = SEASON_LABELS[season] || season;
    html += renderSeasonGroup(label, group);
  });

  regularSeasonValues.forEach((season) => {
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
    if (!showAcquiredPage2 && item.acquired) return false;
    if (!showFiveStarPage2 && item.fiveStar) return false;
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

  const sorted = [...filtered].sort((a, b) => {
    const diff = getPage2SortValue(a, sortKey) - getPage2SortValue(b, sortKey);
    if (diff !== 0) return diff;
    return page2Creatures.indexOf(a) - page2Creatures.indexOf(b);
  });

  renderPage2List(resultPage2, sorted, userLevel);
  updateCountersPage2(sorted);
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

  if (acquiredTogglePage2) {
    acquiredTogglePage2.addEventListener("click", () => {
      showAcquiredPage2 = !showAcquiredPage2;
      if (!showAcquiredPage2) showFiveStarPage2 = false;
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
    updateToggleButtonsPage2();
  }
  seasonFilterPage2.addEventListener("change", () => {
    const isOther = seasonFilterPage2.value === "otherevent";
    eventnameFilterPage2.style.visibility = isOther ? "visible" : "hidden";
    if (!isOther) eventnameFilterPage2.value = "";
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
    if (target.classList.contains("card-acquired-checkbox-p2")) {
      item.acquired = target.checked;
      if (!target.checked) {
        item.fiveStar = false;
        if (s5) s5.checked = false;
      }
    }
    if (target.classList.contains("card-star5-checkbox-p2")) {
      item.fiveStar = target.checked;
      if (target.checked) {
        item.acquired = true;
        if (acq) acq.checked = true;
      }
    }
    saveState();
    updateCountersPage2(Array.from(resultPage2.querySelectorAll(".card")));
  });
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
const normalFishCandidates = catFishList
  .map((name) => {
    const special = catSpecialItems.find((s) => s.name === name);
    if (special) return special;
    const fish = fishingCreatures.find((f) => f.name === name);
    return fish || null;
  })
  .filter(Boolean);
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
    const label = shouldShowExcludedOnly ? "好物じゃない" : "候補";
    catVisibleCount.textContent = `${label}：${filteredFish.length}匹`;
  }

  if (filteredFish.length === 0) {
    resultPage3.innerHTML =
      '<p class="cat-empty">表示できる魚がありません。</p>';
    return;
  }

  resultPage3.innerHTML = filteredFish
    .map((fish) => {
      const isFavorite = favoriteSet.has(fish.name);
      const isExcluded = excludedSet.has(fish.name);
      const hasFishData = fishingCreatures.some((f) => f.name === fish.name);
      return `
      <article class="cat-fish-card ${isFavorite ? "cat-fish-card-favorite" : ""}">
        ${hasFishData ? '<span class="cat-fish-tap-badge">Tap</span>' : ""}
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
    const current = getActiveCatState();
    current.excludedFishNames = [];
    current.favoriteFishNames = [];
    renderPage3FishList();
    savePage3State();
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
].forEach((el) =>
  el.addEventListener("change", () => {
    if (el === hobbyFilter) {
      updatePlace1Options();
      updatePlace2Options();
    } else if (el === place1Filter) {
      updatePlace2Options();
    } else if (el === seasonFilter) {
      const isOther = seasonFilter.value === "otherevent";
      eventnameFilter.style.visibility = isOther ? "visible" : "hidden";
      if (!isOther) eventnameFilter.value = "";
    }
    filterCreatures();
  }),
);
eventnameFilter.addEventListener("change", filterCreatures);
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
    if (sortedRegularSeasons.includes("normal")) {
      seasonFilter.value = "normal";
      eventnameFilter.style.visibility = "hidden";
    }
    if (page2Eventnames.includes("MALTESEコラボ")) {
      seasonFilterPage2.value = "otherevent";
      eventnameFilterPage2.value = "MALTESEコラボ";
      eventnameFilterPage2.style.visibility = "visible";
    } else if (sortedRegularSeasons.includes("normal")) {
      seasonFilterPage2.value = "normal";
      eventnameFilterPage2.style.visibility = "hidden";
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

  // 全フィルター変更時に自動保存
  [
    hobbyFilter,
    userLevelInput,
    seasonFilter,
    eventnameFilter,
    timeFilter,
    place1Filter,
    place2Filter,
    weatherFilter,
    hobbyFilterPage2,
    hobbyModeFilterPage2,
    userLevelPage2,
    seasonFilterPage2,
    eventnameFilterPage2,
    sortPage2,
  ].forEach((el) => el?.addEventListener("change", saveFilterState));
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

// =======================
// 旧サイトからのデータ引き継ぎ
// =======================
(function setupImportFromOldSite() {
  const btn = document.getElementById("importFromOldSiteBtn");
  const statusEl = document.getElementById("importStatus");
  if (!btn || !statusEl) return;

  const OLD_ORIGIN = "https://heartpiazukan.ryice-boardgames.com";
  const EXPORT_URL = OLD_ORIGIN + "/data-export.html";
  const TIMEOUT_MS = 12000;

  btn.addEventListener("click", function () {
    btn.disabled = true;
    statusEl.textContent = "旧サイトに接続中…";

    var iframe = document.createElement("iframe");
    iframe.src = EXPORT_URL;
    iframe.style.cssText = "display:none;width:0;height:0;border:none;";
    iframe.setAttribute("sandbox", "allow-scripts allow-same-origin");
    document.body.appendChild(iframe);

    var resolved = false;

    var timeoutId = setTimeout(function () {
      if (!resolved) {
        resolved = true;
        cleanup();
        statusEl.textContent =
          "旧サイトへの接続がタイムアウトしました。旧サイトに data-export.html が配置されているか確認してください。";
        btn.disabled = false;
      }
    }, TIMEOUT_MS);

    function cleanup() {
      window.removeEventListener("message", onMessage);
      clearTimeout(timeoutId);
      if (iframe.parentNode) {
        iframe.parentNode.removeChild(iframe);
      }
    }

    function onMessage(event) {
      if (event.origin !== OLD_ORIGIN) return;
      if (!event.data || event.data.type !== "heartpia-export") return;
      if (resolved) return;
      resolved = true;
      cleanup();

      var exportedData = event.data.data || {};
      var stateRaw = exportedData.state || null;
      var page3Raw = exportedData.page3 || null;

      // ── 引き継ぎ内容のサマリーを生成 ──
      var summaryLines = [];
      var hasAnything = false;

      if (stateRaw) {
        try {
          var stateObj = JSON.parse(stateRaw);
          var creatureAcquired = (stateObj.creatures || []).filter(
            function (c) {
              return c.acquired;
            },
          ).length;
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
          /* parse error – skip */
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
          /* parse error – skip */
        }
      }

      if (!hasAnything) {
        statusEl.textContent =
          "旧サイトに引き継ぎ対象のデータが見つかりませんでした。";
        btn.disabled = false;
        return;
      }

      var confirmMsg =
        "以下のデータを引き継ぎますか？\n（現在のデータは上書きされます）\n\n" +
        summaryLines.join("\n");

      if (!window.confirm(confirmMsg)) {
        statusEl.textContent = "キャンセルしました。";
        btn.disabled = false;
        return;
      }

      // ── localStorage に書き込み ──
      if (stateRaw) {
        localStorage.setItem("heartpia-state-v2", stateRaw);
      }
      if (page3Raw) {
        localStorage.setItem("heartpia-page3-cat-state-v1", page3Raw);
      }

      statusEl.textContent = "引き継ぎ完了！ページを再読み込みします…";
      setTimeout(function () {
        location.reload();
      }, 1200);
    }

    window.addEventListener("message", onMessage);
  });
})();

init();
