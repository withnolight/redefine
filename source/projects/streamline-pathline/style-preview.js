(() => {
  "use strict";

  const candidates = new Set(["editorial", "blueprint", "notebook"]);
  const stylesheet = document.querySelector("#style-candidate");
  const buttons = [...document.querySelectorAll("[data-style-candidate]")];
  if (!stylesheet || buttons.length === 0) return;

  const requested = new URLSearchParams(window.location.search).get("style");
  const initial = candidates.has(requested) ? requested : "editorial";

  const selectCandidate = (candidate, updateUrl = true) => {
    if (!candidates.has(candidate)) return;
    stylesheet.href = `styles-${candidate}.css`;
    document.documentElement.dataset.styleCandidate = candidate;
    buttons.forEach((button) => {
      const active = button.dataset.styleCandidate === candidate;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    if (updateUrl) {
      const url = new URL(window.location.href);
      url.searchParams.set("style", candidate);
      window.history.replaceState({}, "", url);
    }
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => selectCandidate(button.dataset.styleCandidate));
  });

  selectCandidate(initial, false);
})();
