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
  osc.frequency.value = 880; // to mitjà-alt
  gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);

  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.15); // bip curt
}

function pipLlarg() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  osc.type = "sine";
  osc.frequency.value = 1200; // més agut
  gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);

  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.4); // bip més llarg
}


function mostrarFase() {
  if (faseIndex < 0) {
    faseEl.textContent = "Preparats?";
    tempsEl.textContent = "00";
    return;
  }

  const fase = fases[faseIndex];
  faseEl.textContent = fase.nom;
  // Canvi de color segons la fase
  document.body.classList.remove("escolta", "estira", "descansa");
  if (fase.nom === "Escolta") document.body.classList.add("escolta");
  if (fase.nom === "Estira!") document.body.classList.add("estira");
  if (fase.nom === "Descansa") document.body.classList.add("descansa");

  tempsEl.textContent = String(tempsRestant).padStart(2, "0");

  
}

function tick() {
  if (tempsRestant > 0) {
    tempsRestant--;

    // Pips curts en 2, 1, 0 segons restants
    if (tempsRestant <= 2 && tempsRestant >= 0) {
      pipCurt();
    }

    mostrarFase();

    // Quan arribi exactament a 0, esperem 1 segon abans de canviar de fase
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

        // Nou pip llarg en començar la nova fase
        pipLlarg();

        tempsRestant = fases[faseIndex].durada;
        mostrarFase();
      }, 1000); // espera un segon per sincronitzar amb l'últim pip curt
    }
  }
}



function iniciarTemporitzador() {
  if (!enMarxa) {
    iniciarCrono();

    enMarxa = true;

    // Canviem la icona a "pause"
    playPauseBtn.querySelector("img").src = "icons/pause.svg";

    if (faseIndex === -1) {
      faseIndex = 0;
      tempsRestant = fases[faseIndex].durada;
      mostrarFase();
    }
    interval = setInterval(tick, 1000);
  } else {
    clearInterval(interval);
    enMarxa = false;
    pausarCrono();

    // Canviem la icona a "play"
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

    // Restablim la icona a "play"
    playPauseBtn.querySelector("img").src = "icons/play.svg";

    mostrarFase();

  }
});

// --- EFECTE D'OCULTAR BOTONS SI EL RATOLÍ ESTÀ QUIET ---
let mouseTimer;
const controls = document.querySelector('.controls');

function mostrarControls() {
  controls.classList.remove('ocult');
  clearTimeout(mouseTimer);

  // Només s’amaguen si el temporitzador està en marxa
  if (enMarxa) {
    mouseTimer = setTimeout(() => {
      controls.classList.add('ocult');
    }, 4000); // 4 segons
  }
}

// Detecta moviment de ratolí
document.addEventListener('mousemove', mostrarControls);

// Iniciem visibles
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

// Quan comença o es reprèn el temporitzador
function iniciarCrono() {
  if (!cronoInterval) {
    cronoInterval = setInterval(actualitzarCrono, 1000);
  }
}

// Quan es pausa o s’atura
function pausarCrono() {
  clearInterval(cronoInterval);
  cronoInterval = null;
}

// Quan es reinicia tota la sessió
function reiniciarCrono() {
  pausarCrono();
  segonsCrono = 0;
  cronoEl.textContent = "00:00";
}


mostrarFase();
