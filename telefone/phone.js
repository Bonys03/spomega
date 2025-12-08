const pages = document.getElementById("pages");
let currentPage = 0;

function openApp(index) {
  currentPage = index;
  updatePage();
}

function goHome() {
  currentPage = 0;
  updatePage();
}

function updatePage() {
  pages.style.transform = `translateX(-${currentPage * 100}%)`;
}

/* CLOCK */
function updateClock() {
  const now = new Date();
  document.getElementById("clock").textContent =
    now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}
setInterval(updateClock, 1000);
updateClock();

/* SWIPE (mouse drag) */
let startX = null;

const screen = document.getElementById("screen");

screen.addEventListener("mousedown", e => {
  startX = e.clientX;
});

screen.addEventListener("mouseup", e => {
  if (startX === null) return;

  const diff = e.clientX - startX;

  if (diff > 50 && currentPage > 0) currentPage--;
  if (diff < -50 && currentPage < 2) currentPage++;

  updatePage();
  startX = null;
});
