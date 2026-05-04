import { saveBrowserEnvironmentToLocalStorage } from "./browser-environment.js";
import {
  applyThemeToDocument,
  registerThemeToggle,
  startAutomaticThemeRefreshWhenUserDidNotChoose,
} from "./theme.js";
import { renderLocalStorageInFooter } from "./local-storage-footer.js";
import { loadCommentsFromApiAndRender } from "./comments.js";
import {
  scheduleFeedbackModal,
  registerFeedbackModalControls,
} from "./feedback-modal.js";

saveBrowserEnvironmentToLocalStorage();
applyThemeToDocument();
renderLocalStorageInFooter();

registerThemeToggle();
startAutomaticThemeRefreshWhenUserDidNotChoose();

loadCommentsFromApiAndRender();

scheduleFeedbackModal();
registerFeedbackModalControls();
