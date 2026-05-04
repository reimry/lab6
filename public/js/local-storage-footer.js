export function renderLocalStorageInFooter() {
  const container = document.getElementById("storageDump");
  if (!container) {
    return;
  }
  container.innerHTML = "";
  if (localStorage.length === 0) {
    container.textContent = "(порожньо)";
    return;
  }
  for (let index = 0; index < localStorage.length; index += 1) {
    const storageKey = localStorage.key(index);
    const rawValue = localStorage.getItem(storageKey);
    let textToShow = rawValue;
    try {
      const parsed = JSON.parse(rawValue);
      if (parsed !== null && typeof parsed === "object") {
        textToShow = JSON.stringify(parsed, null, 2);
      }
    } catch (parseError) {
      textToShow = rawValue;
    }

    const row = document.createElement("div");
    row.className = "storage-row";
    const keyElement = document.createElement("div");
    keyElement.className = "storage-key";
    keyElement.textContent = storageKey;
    const valueElement = document.createElement("pre");
    valueElement.className = "storage-value";
    valueElement.textContent = textToShow;
    row.appendChild(keyElement);
    row.appendChild(valueElement);
    container.appendChild(row);
  }
}
