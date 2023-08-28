let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
import { removePopupCard } from "./movies";

// Detect screen size
window.addEventListener("resize", function () {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;
});

function checkForFullScreenCard(e) {
  const target = e.target;

  if (screenWidth <= 650 && target.closest(".card")) {
    removePopupCard();
  }
}
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    removePopupCard();
  }
});

export { checkForFullScreenCard };
