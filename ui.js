// ▼ タブ切り替え（上部／下部共通）

/**
 * 指定ターゲットのタブをアクティブにし、対応するページを表示する。
 * アクティブなタブ名は localStorage に保存し、リロード後に復元できるようにする。
 * @param {string} target - タブの data-target 属性値（ページ要素の id と一致）
 */
function switchTab(target) {
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
