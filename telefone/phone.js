/* ===== MOCK DE JOGADORES (por enquanto) ===== */

const PLAYERS = {
  "1111": {
    name: "Agente Delta",
    messages: [
      "Você foi recrutado.",
      "Não confie na autoridade."
    ]
  },
  "2222": {
    name: "Operador Sigma",
    messages: [
      "O sistema está vulnerável.",
      "Acesso restrito aos distritos."
    ]
  }
};

let currentPlayer = null;

/* ===== RELOGIOS ===== */

function updateClocks() {
  const now = new Date();
  const time = now.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });

  document.getElementById("lockClock").textContent = time;
  document.getElementById("clockSmall").textContent = time;
  document.getElementById("clockBig").textContent = time;
}

setInterval(updateClocks, 1000);
updateClocks();

/* ===== DESBLOQUEIO ===== */

function unlock() {
  const pin = document.getElementById("pinInput").value;
  const feedback = document.getElementById("lockFeedback");

  if (!PLAYERS[pin]) {
    feedback.textContent = "Senha inválida";
    return;
  }

  feedback.textContent = "Desbloqueando...";
  currentPlayer = PLAYERS[pin];

  setTimeout(() => {
    document.getElementById("lockscreen").style.display = "none";
    document.getElementById("system").classList.remove("hidden");
    loadPlayerData();
  }, 1200);
}

function loadPlayerData() {
  document.getElementById("playerName").textContent = currentPlayer.name;

  const msgBox = document.getElementById("messagesContent");
  msgBox.innerHTML = "";

  currentPlayer.messages.forEach(m => {
    const div = document.createElement("div");
    div.className = "msg incoming";
    div.textContent = m;
    msgBox.appendChild(div);
  });
}

/* ===== APPS ===== */

function openApp(name) {
  closeApp();
  document.getElementById("app" + capitalize(name)).classList.add("active");
}

function closeApp() {
  document.querySelectorAll(".app-layer").forEach(a => {
    a.classList.remove("active");
  });
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
