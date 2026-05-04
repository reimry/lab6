import {
  themePreferenceStorageKey,
  themeCheckIntervalMilliseconds,
} from "./constants.js";
import { renderLocalStorageInFooter } from "./local-storage-footer.js";

export function getTimeBasedThemeName() {
  const hour = new Date().getHours();
  if (hour >= 7 && hour < 21) {
    return "light";
  }
  return "dark";
}

export function getActiveThemeName() {
  const saved = localStorage.getItem(themePreferenceStorageKey);
  if (saved === "light" || saved === "dark") {
    return saved;
  }
  return getTimeBasedThemeName();
}

export function updateThemeToggleButtonLabel() {
  const button = document.getElementById("themeToggle");
  if (!button) {
    return;
  }
  const currentTheme = document.documentElement.getAttribute("data-theme");
  if (currentTheme === "dark") {
    button.textContent = "Світла тема";
  } else {
    button.textContent = "Темна тема";
  }
}

export function applyThemeToDocument() {
  document.documentElement.setAttribute(
    "data-theme",
    getActiveThemeName()
  );
  updateThemeToggleButtonLabel();
}

export function registerThemeToggle() {
  const button = document.getElementById("themeToggle");
  if (!button) {
    return;
  }
  button.addEventListener("click", function handleThemeToggleClick() {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";
    localStorage.setItem(themePreferenceStorageKey, next);
    applyThemeToDocument();
    renderLocalStorageInFooter();
  });
}

export function startAutomaticThemeRefreshWhenUserDidNotChoose() {
  setInterval(function checkThemeByClock() {
    const saved = localStorage.getItem(themePreferenceStorageKey);
    if (saved === "light" || saved === "dark") {
      return;
    }
    applyThemeToDocument();
  }, themeCheckIntervalMilliseconds);
}
