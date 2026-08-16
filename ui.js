// =======================
// ページ定義（ここに1行追加するだけで新ページ対応）
// row: 1=メインタブ行、row: 2=ドロワーグリッド2行目以降
// =======================
const PAGE_DEFS = [
  {
    id: "page-zukan",
    label: "生物図鑑",
    shortLabel: "生物",
    icon: "🐟",
    row: 1,
  },
  {
    id: "page-info",
    label: "園芸・料理",
    shortLabel: "生産",
    icon: "🌿",
    row: 1,
  },
  { id: "page-cat", label: "動物", shortLabel: "ペット", icon: "🐱", row: 1 },
  {
    id: "page-test",
    label: "おすすめ",
    shortLabel: "おすすめ",
    icon: "⭐",
    row: 1,
  },
  {
    id: "page-shell",
    label: "海洋清掃",
    shortLabel: "海洋清掃",
    icon: "🐚",
    row: 1,
  },
  {
    id: "page-settings",
    label: "そのた",
    shortLabel: "その他",
    icon: "⚙️",
    row: 2,
  },
];

// 現在ナビに表示中の行番号
let activeNavRow = 1;

function groupByRow(defs) {
  return defs.reduce((acc, p) => {
    const r = p.row || 1;
    (acc[r] = acc[r] || []).push(p);
    return acc;
  }, {});
}

// =======================
// ナビボタン生成
// =======================
function buildNav() {
  [".top-nav", ".bottom-nav"].forEach((selector) => {
    const nav = document.querySelector(selector);
    if (!nav) return;
    nav.innerHTML = "";

    // 4枚のタブプレースホルダー（updateAllNavTabsで内容を塗り替える）
    for (let i = 0; i < 4; i++) {
      const btn = document.createElement("button");
      btn.className = "tab";
      btn.setAttribute("aria-pressed", "false");
      nav.appendChild(btn);
    }

    // ハンバーガーボタンラッパー
    const wrap = document.createElement("div");
    wrap.className = "nav-drawer-wrap";
    const drawerBtn = document.createElement("button");
    drawerBtn.className = "nav-drawer-btn";
    drawerBtn.setAttribute("aria-expanded", "false");
    drawerBtn.setAttribute("aria-label", "全ページメニュー");
    drawerBtn.textContent = "≡";
    wrap.appendChild(drawerBtn);
    nav.appendChild(wrap);

    // ドロワー（navの直接子要素にすることでナビ全幅に配置可能）
    const drawer = document.createElement("div");
    drawer.className = "nav-drawer";
    drawer.hidden = true;

    // 行ごとにグリッド行を生成
    const rows = groupByRow(PAGE_DEFS);
    Object.keys(rows)
      .map(Number)
      .sort()
      .forEach((rowNum, idx) => {
        if (idx > 0) {
          const sep = document.createElement("div");
          sep.className = "nav-drawer-sep";
          drawer.appendChild(sep);
        }
        const rowDiv = document.createElement("div");
        rowDiv.className = "nav-drawer-row";
        rows[rowNum].forEach((p) => {
          const item = document.createElement("button");
          item.className = "drawer-item";
          item.dataset.target = p.id;
          item.setAttribute("aria-label", p.label);
          item.innerHTML = `<span class="drawer-item-icon">${p.icon}</span><span class="drawer-item-label">${p.shortLabel}</span>`;
          item.addEventListener("click", () => {
            activeNavRow = p.row || 1;
            updateAllNavTabs();
            closeDrawer(drawerBtn, drawer);
            switchTab(p.id);
          });
          rowDiv.appendChild(item);
        });
        drawer.appendChild(rowDiv);
      });

    nav.appendChild(drawer);

    drawerBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (drawerBtn.getAttribute("aria-expanded") === "true") {
        closeDrawer(drawerBtn, drawer);
      } else {
        // 他のナビのドロワーを閉じる
        document.querySelectorAll(".nav-drawer:not([hidden])").forEach((d) => {
          d.hidden = true;
          const b = d.closest(".nav-tabs")?.querySelector(".nav-drawer-btn");
          if (b) b.setAttribute("aria-expanded", "false");
        });
        openDrawer(drawerBtn, drawer);
      }
    });
  });

  updateAllNavTabs();
}

function updateAllNavTabs() {
  const rows = groupByRow(PAGE_DEFS);
  const pages = rows[activeNavRow] || [];
  [".top-nav", ".bottom-nav"].forEach((selector) => {
    const nav = document.querySelector(selector);
    if (!nav) return;
    const tabs = [...nav.querySelectorAll(".tab")];
    tabs.forEach((tab, i) => {
      const p = pages[i];
      if (p) {
        tab.dataset.target = p.id;
        tab.setAttribute("aria-label", p.label);
        tab.innerHTML = `<span class="nav-tab-icon">${p.icon}</span><span class="nav-tab-label">${p.shortLabel}</span>`;
        tab.hidden = false;
        tab.classList.remove("nav-tab-empty");
        tab.onclick = () => switchTab(p.id);
      } else {
        tab.hidden = false;
        tab.classList.add("nav-tab-empty");
        tab.onclick = null;
      }
    });
  });
}

function openDrawer(btn, drawer) {
  btn.setAttribute("aria-expanded", "true");
  drawer.hidden = false;
}

function closeDrawer(btn, drawer) {
  btn.setAttribute("aria-expanded", "false");
  drawer.hidden = true;
}

// ドロワー外クリックで閉じる
document.addEventListener("click", () => {
  document.querySelectorAll(".nav-drawer:not([hidden])").forEach((drawer) => {
    drawer.hidden = true;
    const b = drawer.closest(".nav-tabs")?.querySelector(".nav-drawer-btn");
    if (b) b.setAttribute("aria-expanded", "false");
  });
});

// =======================
// フィルターパネル トグル
// =======================
function setupFilterPanel(toggleBtnId, panelId, chipsId, filterFn) {
  const btn = document.getElementById(toggleBtnId);
  const panel = document.getElementById(panelId);
  if (!btn || !panel) return;

  // localStorageでパネル開閉状態を保存
  const stateKey = "filterPanel_" + panelId;
  const savedOpen = localStorage.getItem(stateKey) === "true";
  setFilterPanelState(btn, panel, savedOpen);

  btn.addEventListener("click", () => {
    const isOpen = btn.getAttribute("aria-expanded") === "true";
    const next = !isOpen;
    setFilterPanelState(btn, panel, next);
    localStorage.setItem(stateKey, next);
  });
}

function setFilterPanelState(btn, panel, open) {
  btn.setAttribute("aria-expanded", open ? "true" : "false");
  panel.hidden = !open;
}

/** フィルターパネルトグルボタンのバッジ数を更新する */
function updateFilterBadge(toggleBtnId, count) {
  const btn = document.getElementById(toggleBtnId);
  if (!btn) return;
  let badge = btn.querySelector(".filter-badge");
  if (count > 0) {
    if (!badge) {
      badge = document.createElement("span");
      badge.className = "filter-badge";
      btn.insertBefore(badge, btn.querySelector(".filter-chevron"));
    }
    badge.textContent = count;
  } else {
    if (badge) badge.remove();
  }
}

// ▼ タブ切り替え（上部／下部共通）

/**
 * 指定ターゲットのタブをアクティブにし、対応するページを表示する。
 * アクティブなタブ名は localStorage に保存し、リロード後に復元できるようにする。
 * @param {string} target - タブの data-target 属性値（ページ要素の id と一致）
 */
function switchTab(target) {
  // 対象ページの row に合わせナビ行を切り替える
  const def = PAGE_DEFS.find((p) => p.id === target);
  if (def) {
    const targetRow = def.row || 1;
    if (targetRow !== activeNavRow) {
      activeNavRow = targetRow;
      updateAllNavTabs();
    }
  }

  // 現在表示中のページのスクロール位置を保存
  const currentPage = document.querySelector(".page.active");
  if (currentPage) {
    localStorage.setItem("scrollPos_" + currentPage.id, window.scrollY);
  }

  // 動物ページを離れる場合は名前バーを非表示にする
  const bar = document.getElementById("animalStickyNameBar");
  if (bar && target !== "page-cat") bar.hidden = true;

  document.querySelectorAll(".nav-tabs .tab").forEach((t) => {
    const isTarget = t.dataset.target === target;
    t.classList.toggle("active", isTarget);
    t.setAttribute("aria-pressed", isTarget ? "true" : "false");
  });
  // ドロワー内アイテムのアクティブ状態も更新
  document.querySelectorAll(".nav-drawer .drawer-item").forEach((t) => {
    t.classList.toggle("active", t.dataset.target === target);
  });
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  const pageEl = document.getElementById(target);
  if (pageEl) pageEl.classList.add("active");
  localStorage.setItem("activeTab", target);

  // 切り替え先のページのスクロール位置を復元
  const savedScroll = localStorage.getItem("scrollPos_" + target);
  window.scrollTo(0, savedScroll ? parseInt(savedScroll, 10) : 0);
}

document.addEventListener("DOMContentLoaded", () => {
  // ナビを PAGE_DEFS から生成（タブclickハンドラはupdateAllNavTabs内で登録）
  buildNav();

  // フィルターパネルのトグルセットアップ
  setupFilterPanel("filterToggleBtn1", "filterPanel1", "activeChips1");
  setupFilterPanel("filterToggleBtn2", "filterPanel2", "activeChips2");
  setupFilterPanel(
    "filterToggleBtnShell",
    "filterPanelShell",
    "activeChipsShell",
  );

  // 検索クリア（×）ボタン
  const clearSearch1 = document.getElementById("clearSearchBtn");
  const clearSearch2 = document.getElementById("clearSearchBtnPage2");
  const clearSearchShell = document.getElementById("clearSearchBtnShell");
  if (clearSearch1) {
    clearSearch1.addEventListener("click", () => {
      const inp = document.getElementById("searchInput");
      if (inp) {
        inp.value = "";
        inp.dispatchEvent(new Event("input"));
      }
    });
  }
  if (clearSearch2) {
    clearSearch2.addEventListener("click", () => {
      const inp = document.getElementById("searchInputPage2");
      if (inp) {
        inp.value = "";
        inp.dispatchEvent(new Event("input"));
      }
    });
  }
  if (clearSearchShell) {
    clearSearchShell.addEventListener("click", () => {
      const inp = document.getElementById("searchInputShell");
      if (inp) {
        inp.value = "";
        inp.dispatchEvent(new Event("input"));
      }
    });
  }

  // リロード時に最後に開いていたタブを復元
  const savedTab = localStorage.getItem("activeTab");
  if (savedTab && document.getElementById(savedTab)) {
    switchTab(savedTab);
  }

  // 初期状態
  updateViewButtons();
});

// ▼ カードのフリップ

// クリックイベント: インタラクティブな要素（ボタン・入力欄・食材チップ等）以外をクリックした場合に
// 一番近い .card-flip をフリップ（表裏反転）させる
document.addEventListener("click", (e) => {
  const interactiveTarget = e.target.closest(
    "a, button, input, select, label, textarea, .food-chip, .food-chip-img",
  );
  if (interactiveTarget) return;

  const card = e.target.closest(".card-flip");
  if (!card) return;
  e.stopPropagation(); // 裏面クリックのバブリングを止める
  card.classList.toggle("flipped");
});

// キーボード操作: Enter または Space キーでフォーカス中のカードをフリップする
document.addEventListener("keydown", (e) => {
  const card = e.target.closest(".card-flip");
  if (!card) return;
  if (e.key !== "Enter" && e.key !== " ") return;

  e.preventDefault();
  card.classList.toggle("flipped");
});

// タブ・ボタン等に対して pointerdown 時に is-pressed クラスを付与し
// 押下中のビジュアルフィードバック（スケール縮小など）を実現する
const PRESSABLE_SELECTOR =
  ".nav-tabs .tab, .view-switch button, .filter-toggle, .cat-tab, #catResetBtn";

// 押下開始: is-pressed クラスを追加
document.addEventListener("pointerdown", (e) => {
  const target = e.target.closest(PRESSABLE_SELECTOR);
  if (!target) return;
  target.classList.add("is-pressed");
});

// 押下終了: is-pressed クラスを除去
document.addEventListener("pointerup", () => {
  document
    .querySelectorAll(`${PRESSABLE_SELECTOR}.is-pressed`)
    .forEach((el) => el.classList.remove("is-pressed"));
});

// キャンセル（スクロール等）時も is-pressed クラスを除去
document.addEventListener("pointercancel", () => {
  document
    .querySelectorAll(`${PRESSABLE_SELECTOR}.is-pressed`)
    .forEach((el) => el.classList.remove("is-pressed"));
});

// ▼ 表示列切り替え（ページ1）
// view1 = 1列表示、view2 = 2列表示
const view1 = document.getElementById("view1");
const view2 = document.getElementById("view2");

// result は script.js で定義されたグローバル
/** view1/view2 ボタンの aria-pressed 属性を現在のアクティブ状態に合わせて更新する */
function updateViewButtons() {
  view1.setAttribute("aria-pressed", view1.classList.contains("active"));
  view2.setAttribute("aria-pressed", view2.classList.contains("active"));
}

// view1 クリック: 1列レイアウトに切り替えてフィルター状態を保存する
view1.addEventListener("click", () => {
  result.classList.add("one-column");
  view1.classList.add("active");
  view2.classList.remove("active");
  updateViewButtons();
  if (typeof saveFilterState === "function") saveFilterState();
});

// view2 クリック: 2列レイアウトに切り替えてフィルター状態を保存する
view2.addEventListener("click", () => {
  result.classList.remove("one-column");
  view2.classList.add("active");
  view1.classList.remove("active");
  updateViewButtons();
  if (typeof saveFilterState === "function") saveFilterState();
});

// ▼ 表示列切り替え（海洋清掃ページ）
const view1Shell = document.getElementById("view1Shell");
const view2Shell = document.getElementById("view2Shell");

if (view1Shell && view2Shell) {
  view1Shell.addEventListener("click", () => {
    document.getElementById("resultShell")?.classList.add("one-column");
    view1Shell.classList.add("active");
    view2Shell.classList.remove("active");
    view1Shell.setAttribute("aria-pressed", "true");
    view2Shell.setAttribute("aria-pressed", "false");
    if (typeof saveFilterState === "function") saveFilterState();
  });
  view2Shell.addEventListener("click", () => {
    document.getElementById("resultShell")?.classList.remove("one-column");
    view2Shell.classList.add("active");
    view1Shell.classList.remove("active");
    view2Shell.setAttribute("aria-pressed", "true");
    view1Shell.setAttribute("aria-pressed", "false");
    if (typeof saveFilterState === "function") saveFilterState();
  });
}

// ▼ 表示列切り替え（ページ2）
// ページ2用の1列/2列表示ボタン（存在する場合のみセットアップ）
const view1Page2 = document.getElementById("view1Page2");
const view2Page2 = document.getElementById("view2Page2");

if (view1Page2 && view2Page2) {
  /** view1Page2/view2Page2 ボタンの aria-pressed 属性を更新する */
  function updateViewButtonsPage2() {
    view1Page2.setAttribute(
      "aria-pressed",
      view1Page2.classList.contains("active"),
    );
    view2Page2.setAttribute(
      "aria-pressed",
      view2Page2.classList.contains("active"),
    );
  }

  view1Page2.addEventListener("click", () => {
    resultPage2.classList.add("one-column");
    view1Page2.classList.add("active");
    view2Page2.classList.remove("active");
    updateViewButtonsPage2();
    if (typeof saveFilterState === "function") saveFilterState();
  });

  view2Page2.addEventListener("click", () => {
    resultPage2.classList.remove("one-column");
    view2Page2.classList.add("active");
    view1Page2.classList.remove("active");
    updateViewButtonsPage2();
    if (typeof saveFilterState === "function") saveFilterState();
  });

  updateViewButtonsPage2();
}

// 初期状態
updateViewButtons();

// ▼ おすすめカードの長押しで図鑑ページへジャンプ
(function () {
  let _lpTimer = null;
  let _lpX = 0;
  let _lpY = 0;
  let _lpChip = null;
  let _suppressNextClick = false;

  function cancelLP() {
    if (_lpTimer) {
      clearTimeout(_lpTimer);
      _lpTimer = null;
    }
    if (_lpChip) {
      _lpChip.classList.remove("test-chip--lp-active");
      _lpChip = null;
    }
  }

  document.addEventListener("pointerdown", (e) => {
    const chip = e.target.closest(".test-chip[data-item-name]");
    if (!chip) return;
    _lpX = e.clientX;
    _lpY = e.clientY;
    _lpChip = chip;
    chip.classList.add("test-chip--lp-active");
    _lpTimer = setTimeout(() => {
      _lpTimer = null;
      const c = _lpChip;
      _lpChip = null;
      if (c) {
        c.classList.remove("test-chip--lp-active");
        _suppressNextClick = true;
        jumpToZukan(c);
      }
    }, 500);
  });

  document.addEventListener("pointermove", (e) => {
    if (!_lpTimer) return;
    const dx = e.clientX - _lpX;
    const dy = e.clientY - _lpY;
    if (Math.sqrt(dx * dx + dy * dy) > 10) cancelLP();
  });

  document.addEventListener("pointerup", cancelLP);
  document.addEventListener("pointercancel", cancelLP);

  // 長押し後の click（チップ展開）を抑制する
  document.addEventListener(
    "click",
    (e) => {
      if (!_suppressNextClick) return;
      _suppressNextClick = false;
      if (e.target.closest(".test-chip[data-item-name]")) {
        e.stopImmediatePropagation();
      }
    },
    true,
  );

  function scrollToCard(selector, delay) {
    setTimeout(
      () => {
        const card = document.querySelector(selector);
        if (card) card.scrollIntoView({ behavior: "smooth", block: "center" });
      },
      delay != null ? delay : 80,
    );
  }

  function jumpToZukan(chip) {
    const name = chip.dataset.itemName;
    const hobby = chip.dataset.itemHobby;
    const isCreature = ["釣り", "虫捕り", "野鳥観察"].includes(hobby);
    const targetPage = isCreature ? "page-zukan" : "page-info";

    switchTab(targetPage);

    if (isCreature) {
      // おすすめページの場所・時間・天候を生物図鑑フィルターに反映
      const p1 = document.getElementById("testPlace1").value;
      const p2 = document.getElementById("testPlace2").value;
      const time = document.getElementById("testTime").value;
      const weather = document.getElementById("testWeather").value;

      // カードを確実に表示するためにキーワード・趣味・シーズンをリセット
      searchInput.value = "";
      hobbyFilter.value = "";
      if (typeof fishSubFilter !== "undefined" && fishSubFilter)
        fishSubFilter.value = "";
      seasonFilter.value = "normal";

      place1Filter.value = p1;
      updatePlace2Options();
      place2Filter.value = p2;
      timeFilter.value = time;
      weatherFilter.value = weather;
      filterCreatures();

      // カードへスクロール（setTimeout でレイアウト確定を待つ）
      const sel = `.card-flip[data-name="${CSS.escape(name)}"]`;
      scrollToCard(sel);
    } else {
      // 園芸・料理ページへ：趣味フィルターをセットして対象カードへスクロール
      searchInputPage2.value = "";
      seasonFilterPage2.value = "normal";
      const hobbyVal = ["園芸", "料理", "採取・販売"].includes(hobby)
        ? hobby
        : "";
      document.getElementById("hobbyFilterPage2").value = hobbyVal;
      filterAndRenderPage2();

      const sel = `#resultPage2 .card-flip[data-name="${CSS.escape(name)}"]`;
      scrollToCard(sel);
    }
  }
})();

// ▼ 先頭に戻るボタン
// スクロール量が 300px を超えたらボタンを表示し、クリックで最上部にスムーススクロールする
(function setupBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 300) {
        btn.hidden = false;
      } else {
        btn.hidden = true;
      }
    },
    { passive: true },
  );

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
