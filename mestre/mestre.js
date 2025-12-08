const API_URL = "COLE_AQUI_URL_DO_APPS_SCRIPT";

async function loadStatus() {
  const adminToken = document.getElementById("adminToken").value;

  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "adminStatus",
      adminToken
    })
  });

  const data = await res.json();
  if (!data.success) {
    alert("Token inválido");
    return;
  }

  document.getElementById("dashboard").classList.remove("hidden");
  updateUI(data.state);
}

async function setStage(stage) {
  const adminToken = document.getElementById("adminToken").value;

  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "adminSetStage",
      adminToken,
      stage
    })
  });

  const data = await res.json();
  updateUI(data.state);
}

async function toggle(page, enabled) {
  const adminToken = document.getElementById("adminToken").value;

  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({
      action: "adminToggleAccess",
      adminToken,
      page,
      enabled
    })
  });

  const data = await res.json();
  updateUI(data.state);
}

function updateUI(state) {
  document.getElementById("stage").textContent = state.stage;
}
