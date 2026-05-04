import { commentsRequestUrl } from "./constants.js";

function normalizeCommentBodyText(text) {
  if (!text) {
    return "";
  }
  return text.replace(/\r\n/g, "\n").replace(/\n/g, " ");
}

export function loadCommentsFromApiAndRender() {
  const listElement = document.getElementById("commentsList");
  const statusElement = document.getElementById("commentsStatus");
  if (!listElement) {
    return;
  }

  fetch(commentsRequestUrl)
    .then(function handleCommentsResponse(response) {
      if (!response.ok) {
        throw new Error("HTTP " + response.status);
      }
      return response.json();
    })
    .then(function renderCommentsFromJson(data) {
      if (!Array.isArray(data)) {
        throw new Error("Invalid");
      }
      listElement.innerHTML = "";
      if (statusElement) {
        statusElement.hidden = true;
        statusElement.textContent = "";
      }
      for (let index = 0; index < data.length; index += 1) {
        const item = data[index];
        const listItem = document.createElement("li");
        listItem.className = "comment-card";
        const metaParagraph = document.createElement("p");
        metaParagraph.className = "comment-card__meta";
        const nameSpan = document.createElement("span");
        nameSpan.className = "comment-card__name";
        nameSpan.textContent = item.name || "";
        metaParagraph.appendChild(nameSpan);
        metaParagraph.appendChild(document.createTextNode(" · "));
        metaParagraph.appendChild(
          document.createTextNode(item.email || "")
        );
        const bodyParagraph = document.createElement("p");
        bodyParagraph.className = "comment-card__body";
        bodyParagraph.textContent = normalizeCommentBodyText(item.body);
        listItem.appendChild(metaParagraph);
        listItem.appendChild(bodyParagraph);
        listElement.appendChild(listItem);
      }
    })
    .catch(function handleCommentsError() {
      if (statusElement) {
        statusElement.hidden = false;
        statusElement.textContent =
          "Не вдалося завантажити коментарі.";
      }
    });
}
