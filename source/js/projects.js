(() => {
  "use strict";

  const browser = document.querySelector("[data-project-browser]");
  if (!browser || browser.dataset.projectBrowserReady === "true") return;

  browser.dataset.projectBrowserReady = "true";

  const items = [...browser.querySelectorAll("[data-project-item][data-category]")];
  const filters = [...browser.querySelectorAll("[data-project-filter]")];
  const totalOutput = browser.querySelector("[data-project-total]");
  const visibleOutput = browser.querySelector("[data-visible-count]");
  const titleOutput = browser.querySelector("[data-project-heading-title]");
  const eyebrowOutput = browser.querySelector("[data-project-heading-eyebrow]");
  const reduceMotion = typeof window !== "undefined"
    && window.matchMedia
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let animationFrame = null;

  const countFor = (category) => category === "all"
    ? items.length
    : items.filter((item) => item.dataset.category === category).length;

  if (totalOutput) totalOutput.textContent = String(items.length);

  filters.forEach((button) => {
    const count = countFor(button.dataset.projectFilter);
    const countOutput = button.querySelector("[data-project-count]");
    if (countOutput) countOutput.textContent = String(count).padStart(2, "0");
    button.hidden = button.dataset.projectFilter !== "all" && count === 0;
  });

  const showCategory = (category, animate = true) => {
    const activeButton = filters.find((button) => button.dataset.projectFilter === category) || filters[0];
    if (!activeButton) return;

    let visibleCount = 0;
    const visibleItems = [];
    items.forEach((item) => {
      const visible = category === "all" || item.dataset.category === category;
      item.hidden = !visible;
      item.classList.remove("is-entering");
      if (visible) {
        item.style.setProperty("--project-order", String(visibleCount));
        visibleItems.push(item);
        visibleCount += 1;
      }
    });

    filters.forEach((button) => {
      const active = button === activeButton;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    if (titleOutput) titleOutput.textContent = activeButton.dataset.filterTitle;
    if (eyebrowOutput) eyebrowOutput.textContent = activeButton.dataset.filterEyebrow;
    if (visibleOutput) visibleOutput.textContent = String(visibleCount);

    if (animationFrame !== null && typeof cancelAnimationFrame === "function") {
      cancelAnimationFrame(animationFrame);
    }

    if (animate && !reduceMotion && typeof requestAnimationFrame === "function") {
      animationFrame = requestAnimationFrame(() => {
        visibleItems.forEach((item) => item.classList.add("is-entering"));
        animationFrame = null;
      });
    }
  };

  filters.forEach((button) => {
    button.addEventListener("click", () => showCategory(button.dataset.projectFilter));
  });

  showCategory("all", false);
})();
