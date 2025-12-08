const screen = document.getElementById("screen");
const swipePages = document.getElementById("swipePages");

let currentScreen = 1; // começa na home
let startX = 0;
let currentX = 0;
let isDragging = false;

/* CLOCK */
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });
  document.getElementById("clockSmall").textContent = time;
  document.getElementById("clockBig").textContent = time;
}
setInterval(updateClock, 1000);
updateClock();

/* SWIPE */
function screenToX(i) {
  return -i * screen.offsetWidth;
}

function setTranslate(x, animate = false) {
  swipePages.style.transition = animate ? "transform .3s ease" : "none";
  swipePages.style.transform = `translateX(${x}px)`;
}

/* START */
screen.addEventListener("mousedown", e => {
  if (!document.querySelector(".app-layer.hidden") === false) return;

  isDragging = true;
  startX = e.clientX;
  currentX = startX;
});

/* MOVE */
document.addEventListener("mousemove", e => {
  if (!isDragging) return;

  currentX = e.clientX;
  let delta = currentX - startX;
  setTranslate(screenToX(currentScreen) + delta);
});

/* END */
document.addEventListener("mouseup", () => {
  if (!isDragging) return;
  isDragging = false;

  const delta = currentX - startX;
  const threshold = screen.offsetWidth * 0.25;

  if (delta < -threshold && currentScreen < 1) currentScreen++;
  if (delta > threshold && currentScreen > 0) currentScreen--;

  setTranslate(screenToX(currentScreen), true);
});

/* APPS */
function openApp(name) {
  document.getElementById("app" + capitalize(name)).classList.remove("hidden");
}

function closeApp() {
  document.querySelectorAll(".app-layer").forEach(a => a.classList.add("hidden"));
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* INIT */
setTranslate(screenToX(currentScreen), false);
