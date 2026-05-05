// ▼ タブ切り替え（上部／下部共通）

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

document.addEventListener("keydown", (e) => {
  const card = e.target.closest(".card-flip");
  if (!card) return;
  if (e.key !== "Enter" && e.key !== " ") return;

  e.preventDefault();
  card.classList.toggle("flipped");
});

const PRESSABLE_SELECTOR =
  ".nav-tabs .tab, .view-switch button, .filter-toggle, .cat-tab, #catResetBtn";

document.addEventListener("pointerdown", (e) => {
  const target = e.target.closest(PRESSABLE_SELECTOR);
  if (!target) return;
  target.classList.add("is-pressed");
});

document.addEventListener("pointerup", () => {
  document
    .querySelectorAll(`${PRESSABLE_SELECTOR}.is-pressed`)
    .forEach((el) => el.classList.remove("is-pressed"));
});

document.addEventListener("pointercancel", () => {
  document
    .querySelectorAll(`${PRESSABLE_SELECTOR}.is-pressed`)
    .forEach((el) => el.classList.remove("is-pressed"));
});

// ▼ 表示列切り替え
const view1 = document.getElementById("view1");
const view2 = document.getElementById("view2");

// result は script.js で定義されたグローバル
function updateViewButtons() {
  view1.setAttribute("aria-pressed", view1.classList.contains("active"));
  view2.setAttribute("aria-pressed", view2.classList.contains("active"));
}

view1.addEventListener("click", () => {
  result.classList.add("one-column");
  view1.classList.add("active");
  view2.classList.remove("active");
  updateViewButtons();
  if (typeof saveFilterState === "function") saveFilterState();
});

view2.addEventListener("click", () => {
  result.classList.remove("one-column");
  view2.classList.add("active");
  view1.classList.remove("active");
  updateViewButtons();
  if (typeof saveFilterState === "function") saveFilterState();
});

// ▼ 表示列切り替え（page2）
const view1Page2 = document.getElementById("view1Page2");
const view2Page2 = document.getElementById("view2Page2");

if (view1Page2 && view2Page2) {
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
