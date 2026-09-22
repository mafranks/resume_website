"use strict";

/** Return the visitor's preferred theme, honoring a saved selection first. */
function getPreferredTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

/** Apply a theme and keep browser chrome and assistive text in sync. */
function applyTheme(theme) {
  const isDark = theme === "dark";
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]').content = isDark ? "#14201d" : "#f4f0e8";
  const toggle = document.querySelector("[data-theme-toggle]");
  toggle.setAttribute("aria-label", `Switch to ${isDark ? "light" : "dark"} theme`);
}

/** Initialize and persist the light/dark theme control. */
function initializeTheme() {
  const toggle = document.querySelector("[data-theme-toggle]");
  applyTheme(getPreferredTheme());
  toggle.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  });
}

/** Toggle the compact navigation and close it after link selection. */
function initializeMenu() {
  const toggle = document.querySelector("[data-menu-toggle]");
  const navigation = document.querySelector("[data-mobile-nav]");
  const label = toggle.querySelector(".sr-only");

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isOpen));
    label.textContent = isOpen ? "Open menu" : "Close menu";
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      label.textContent = "Open menu";
      navigation.classList.remove("is-open");
    });
  });
}

/** Reveal page sections once as they enter the viewport. */
function initializeReveals() {
  const elements = document.querySelectorAll(".reveal");
  if (!window.IntersectionObserver) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px" },
  );

  elements.forEach((element) => observer.observe(element));
}

/** Condense the header after the page starts moving. */
function initializeHeader() {
  const header = document.querySelector("[data-header]");
  const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 16);
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
}

/** Initialize the small progressive enhancements used by the site. */
function initializePage() {
  initializeTheme();
  initializeMenu();
  initializeReveals();
  initializeHeader();
  document.querySelector("[data-year]").textContent = String(new Date().getFullYear());
}

initializePage();
