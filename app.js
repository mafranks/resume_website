"use strict";

const SCAN_STEPS = [
  { progress: 14, message: "> Locating the scan button you just pressed..." },
  { progress: 38, message: "> Checking whether confidence is enabled... yes." },
  { progress: 63, message: "> Politely declining to inspect your files..." },
  { progress: 87, message: "> Converting uncertainty into a green checkmark..." },
  { progress: 100, message: "> Scan complete. Evidence successfully avoided." },
];

/** Toggle the mobile navigation and close it after a destination is selected. */
function initializeMenu() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const navigation = document.querySelector("[data-mobile-nav]");
  if (!toggle || !navigation) return;

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    toggle.querySelector(".sr-only").textContent = isOpen ? "Open menu" : "Close menu";
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      toggle.querySelector(".sr-only").textContent = "Open menu";
      navigation.classList.remove("is-open");
    });
  });
}

/** Run the deliberately fake scanner through a bounded list of comic status steps. */
function runFakeScan(button, line, progressBar, result) {
  if (!button || !line || !progressBar || !result) return;
  let stepIndex = 0;

  button.disabled = true;
  button.textContent = "Pretending very carefully...";
  result.hidden = true;
  progressBar.style.width = "0%";

  const intervalId = window.setInterval(() => {
    const step = SCAN_STEPS[stepIndex];
    line.textContent = step.message;
    progressBar.style.width = `${step.progress}%`;
    stepIndex += 1;

    if (stepIndex < SCAN_STEPS.length) return;
    window.clearInterval(intervalId);
    result.hidden = false;
    button.disabled = false;
    button.textContent = "Scan absolutely nothing again";
  }, 430);
}

/** Connect the fake scan button to its harmless visual demonstration. */
function initializeScanner() {
  const button = document.querySelector("[data-scan-button]");
  const line = document.querySelector("[data-scan-line]");
  const progressBar = document.querySelector("[data-scan-progress]");
  const result = document.querySelector("[data-scan-result]");
  if (!button || !line || !progressBar || !result) return;

  button.addEventListener("click", () => runFakeScan(button, line, progressBar, result));
}

/** Populate the current year without requiring a manual annual update. */
function initializeYear() {
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
}

/** Initialize all progressive enhancements used by the parody site. */
function initializePage() {
  initializeMenu();
  initializeScanner();
  initializeYear();
}

initializePage();
