import { feedbackModalDelayMilliseconds } from "./constants.js";

function openFeedbackModal() {
  const modal = document.getElementById("feedbackModal");
  if (!modal) {
    return;
  }
  modal.removeAttribute("hidden");
  document.body.classList.add("modal-open");
}

function closeFeedbackModal() {
  const modal = document.getElementById("feedbackModal");
  if (!modal) {
    return;
  }
  modal.setAttribute("hidden", "");
  document.body.classList.remove("modal-open");
}

async function submitFeedbackForm(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const statusElement = document.getElementById("feedbackStatus");
  const submitButton = form.querySelector('button[type="submit"]');

  if (!(form instanceof HTMLFormElement) || !statusElement || !submitButton) {
    return;
  }

  const formData = new FormData(form);
  const payload = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    subject: String(formData.get("subject") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  submitButton.disabled = true;
  statusElement.hidden = false;
  statusElement.textContent = "Відправлення...";
  statusElement.classList.remove("feedback-form__status--error");
  statusElement.classList.remove("feedback-form__status--success");

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error("Request failed.");
    }

    statusElement.textContent = "Дякуємо! Повідомлення надіслано.";
    statusElement.classList.add("feedback-form__status--success");
    form.reset();
    setTimeout(closeFeedbackModal, 900);
  } catch (error) {
    statusElement.textContent = "Не вдалося відправити форму. Спробуйте ще раз.";
    statusElement.classList.add("feedback-form__status--error");
  } finally {
    submitButton.disabled = false;
  }
}

export function scheduleFeedbackModal() {
  setTimeout(openFeedbackModal, feedbackModalDelayMilliseconds);
}

export function registerFeedbackModalControls() {
  const closeButton = document.getElementById("modalClose");
  const backdrop = document.getElementById("modalBackdrop");
  if (closeButton) {
    closeButton.addEventListener("click", closeFeedbackModal);
  }
  if (backdrop) {
    backdrop.addEventListener("click", closeFeedbackModal);
  }
  const feedbackForm = document.getElementById("feedbackForm");
  if (feedbackForm instanceof HTMLFormElement) {
    feedbackForm.addEventListener("submit", submitFeedbackForm);
  }
  document.addEventListener("keydown", function handleEscapeKey(event) {
    if (event.key === "Escape") {
      closeFeedbackModal();
    }
  });
}
