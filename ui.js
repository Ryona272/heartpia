// ▼ タブ切り替え（上部／下部共通）

/**
 * 指定ターゲットのタブをアクティブにし、対応するページを表示する。
 * アクティブなタブ名は localStorage に保存し、リロード後に復元できるようにする。
 * @param {string} target - タブの data-target 属性値（ページ要素の id と一致）
 */
function switchTab(target) {
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
  document.querySelectorAll(".nav-tabs .tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      switchTab(tab.dataset.target);
    });
  });

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
