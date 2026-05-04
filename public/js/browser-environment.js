import { browserEnvironmentStorageKey } from "./constants.js";

export function collectBrowserAndScreenInfo() {
  let timeZoneName = "";
  try {
    timeZoneName =
      Intl.DateTimeFormat().resolvedOptions().timeZone || "";
  } catch (error) {
    timeZoneName = "";
  }

  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform || "",
    language: navigator.language || "",
    languages: navigator.languages
      ? navigator.languages.join(", ")
      : "",
    cookieEnabled: navigator.cookieEnabled,
    onLine: navigator.onLine,
    hardwareConcurrency:
      typeof navigator.hardwareConcurrency === "number"
        ? navigator.hardwareConcurrency
        : null,
    screenWidth: screen.width,
    screenHeight: screen.height,
    availWidth: screen.availWidth,
    availHeight: screen.availHeight,
    colorDepth: screen.colorDepth,
    pixelDepth: screen.pixelDepth,
    timeZone: timeZoneName,
  };
}

export function saveBrowserEnvironmentToLocalStorage() {
  const info = collectBrowserAndScreenInfo();
  localStorage.setItem(
    browserEnvironmentStorageKey,
    JSON.stringify(info)
  );
}
