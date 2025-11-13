const fases = [
  // Bloc 1
  { nom: "Escolta", durada: 12 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },

  // Bloc 2
  { nom: "Escolta", durada: 12 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },

  // Bloc 3
  { nom: "Escolta", durada: 12 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },

  // Bloc 4
  { nom: "Escolta", durada: 12 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },

  // Bloc 5
  { nom: "Escolta", durada: 12 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },

  // Bloc 6
  { nom: "Escolta", durada: 12 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },

  // Bloc 7
  { nom: "Escolta", durada: 12 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },

  // Bloc 8
  { nom: "Escolta", durada: 12 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },

  // Bloc 9
  { nom: "Escolta", durada: 12 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },

  // Bloc 10
  { nom: "Escolta", durada: 12 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },
  { nom: "Estira!", durada: 20 },
  { nom: "Descansa", durada: 10 },
];

const faseEl = document.getElementById("fase");
const tempsEl = document.getElementById("temps");
const playPauseBtn = document.getElementById("playPause");
const restartBtn = document.getElementById("restart");

let faseIndex = -1;
let tempsRestant = 0;
let interval = null;
let enMarxa = false;

// --- FUNCIONS DE SO ---
function pipCurt() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  osc.type = "sine";
  osc.frequency.value = 880;
  gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);

  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.15);
}

function pipLlarg() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  osc.type = "sine";
  osc.frequency.value = 1200;
  gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);

  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.4);
}

function mostrarFase() {
  if (faseIndex < 0) {
    faseEl.textContent = "Preparats?";
    tempsEl.textContent = "00";
    return;
  }

  const fase = fases[faseIndex];
  faseEl.textContent = fase.nom;

  document.body.classList.remove("escolta", "estira", "descansa");
  if (fase.nom === "Escolta") document.body.classList.add("escolta");
  if (fase.nom === "Estira!") document.body.classList.add("estira");
  if (fase.nom === "Descansa") document.body.classList.add("descansa");

  tempsEl.textContent = String(tempsRestant).padStart(2, "0");
}

function tick() {
  if (tempsRestant > 0) {
    tempsRestant--;

    if (tempsRestant <= 2 && tempsRestant >= 0) {
      pipCurt();
    }

    mostrarFase();

    if (tempsRestant === 0) {
      setTimeout(() => {
        faseIndex++;
        if (faseIndex >= fases.length) {
          clearInterval(interval);
          faseEl.textContent = "ACABAT 🎉";
          tempsEl.textContent = "00";
          playPauseBtn.disabled = true;
          return;
        }

        pipLlarg();

        tempsRestant = fases[faseIndex].durada;
        mostrarFase();

        // 🟢 Sempre fem un tick immediat al començar qualsevol fase
        tick();

      }, 1000);
    }
  }
}

function iniciarTemporitzador() {
  if (!enMarxa) {
    iniciarCrono();
    enMarxa = true;
    playPauseBtn.querySelector("img").src = "icons/pause.svg";

    if (faseIndex === -1) {
      faseIndex = 0;
      tempsRestant = fases[faseIndex].durada;
      mostrarFase();

      // 🟢 també fem el primer tick immediat per la primera fase
      tick();
    }

    interval = setInterval(tick, 1000);
  } else {
    clearInterval(interval);
    enMarxa = false;
    pausarCrono();
    playPauseBtn.querySelector("img").src = "icons/play.svg";
  }
}

playPauseBtn.addEventListener("click", iniciarTemporitzador);

restartBtn.addEventListener("click", () => {
  const confirmRestart = confirm("Vols reiniciar tota la sessió?");
  if (confirmRestart) {
    clearInterval(interval);
    faseIndex = -1;
    tempsRestant = 0;
    enMarxa = false;
    playPauseBtn.disabled = false;
    reiniciarCrono();
    playPauseBtn.querySelector("img").src = "icons/play.svg";
    mostrarFase();
  }
});

// --- OCULTAR BOTONS ---
let mouseTimer;
const controls = document.querySelector(".controls");

function mostrarControls() {
  controls.classList.remove("ocult");
  clearTimeout(mouseTimer);

  if (enMarxa) {
    mouseTimer = setTimeout(() => {
      controls.classList.add("ocult");
    }, 4000);
  }
}

document.addEventListener("mousemove", mostrarControls);
mostrarControls();

// ---- CRONÒMETRE ----
const cronoEl = document.getElementById("crono");
let cronoInterval = null;
let segonsCrono = 0;

function actualitzarCrono() {
  segonsCrono++;
  const minuts = Math.floor(segonsCrono / 60);
  const segons = segonsCrono % 60;
  cronoEl.textContent = `${String(minuts).padStart(2, "0")}:${String(segons).padStart(2, "0")}`;
}

function iniciarCrono() {
  if (!cronoInterval) {
    cronoInterval = setInterval(actualitzarCrono, 1000);
  }
}

function pausarCrono() {
  clearInterval(cronoInterval);
  cronoInterval = null;
}

function reiniciarCrono() {
  pausarCrono();
  segonsCrono = 0;
  cronoEl.textContent = "00:00";
}

mostrarFase();
