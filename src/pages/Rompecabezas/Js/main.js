let puzzle = document.getElementById("puzzle");
let customImageURL = null;
let timer = 0;
let timerInterval = null;
let moves = 0;

// Referencias al pergamino y mensaje
const pergamino = document.getElementById("pergamino");
const mensaje = document.getElementById("mensaje");
const descripcion = document.getElementById("descripcion");

// Ocultar inicialmente
pergamino.classList.add("replegar");
mensaje.style.display = "none";

// Sonidos
const moveAudio = new Audio("move.mp3");
const winAudio = new Audio("win.mp3");

// Imagen personalizada
const customImageInput = document.getElementById("customImage");
if (customImageInput) {
  customImageInput.addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        customImageURL = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
}

function generatePuzzle() {
  clearInterval(timerInterval);
  timer = 0;
  moves = 0;
  document.getElementById("timer").textContent = timer;
  document.getElementById("moves").textContent = moves;

  timerInterval = setInterval(() => {
    timer++;
    document.getElementById("timer").textContent = timer;
  }, 1000);

  puzzle.innerHTML = "";
  const rows = parseInt(document.getElementById("rows").value);
  const cols = parseInt(document.getElementById("cols").value);
  const selectedImage = document.getElementById("imageSelect").value;
  const imageUrl = customImageURL || selectedImage;

  puzzle.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
  puzzle.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

  let pieces = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const div = document.createElement("div");
      div.classList.add("piece");
      div.style.backgroundImage = `url(${imageUrl})`;
      div.style.backgroundSize = `${cols * 100}% ${rows * 100}%`;
      div.style.backgroundPosition = `${(c * 100) / (cols - 1)}% ${(r * 100) / (rows - 1)}%`;
      div.dataset.correct = `${r}-${c}`;
      div.setAttribute("draggable", true);
      pieces.push(div);
    }
  }

  pieces.sort(() => Math.random() - 0.5);
  pieces.forEach((p, i) => {
    p.dataset.current = `${Math.floor(i / cols)}-${i % cols}`;

    // Eventos PC
    p.addEventListener("dragstart", handleDragStart);
    p.addEventListener("dragover", handleDragOver);
    p.addEventListener("dragleave", handleDragLeave);
    p.addEventListener("drop", handleDrop);

    // Eventos móviles
    p.addEventListener("touchstart", handleTouchStart, { passive: false });
    p.addEventListener("touchmove", handleTouchMove, { passive: false });
    p.addEventListener("touchend", handleTouchEnd, { passive: false });

    puzzle.appendChild(p);
  });
}

function restartPuzzle() {
  generatePuzzle();
}

// Drag y Drop
let dragged = null;

function handleDragStart(e) {
  dragged = e.target;
}

function handleDragOver(e) {
  e.preventDefault();
  e.target.classList.add("drag-over");
}

function handleDragLeave(e) {
  e.target.classList.remove("drag-over");
}

function handleDrop(e) {
  e.preventDefault();
  e.target.classList.remove("drag-over");
  if (dragged && dragged !== e.target) {
    swapPieces(dragged, e.target);
  }
}

// Intercambio
function swapPieces(a, b) {
  const temp = document.createElement("div");
  puzzle.replaceChild(temp, a);
  puzzle.replaceChild(a, b);
  puzzle.replaceChild(b, temp);

  const tempData = a.dataset.current;
  a.dataset.current = b.dataset.current;
  b.dataset.current = tempData;

  moves++;
  document.getElementById("moves").textContent = moves;

  if (moveAudio) moveAudio.play();
  checkVictory();
}

// Verificar victoria
function checkVictory() {
  const pieces = puzzle.querySelectorAll(".piece");
  const isCorrect = Array.from(pieces).every(p => p.dataset.correct === p.dataset.current);

  if (isCorrect) {
    clearInterval(timerInterval);
    if (winAudio) winAudio.play();

    const imageSelect = document.getElementById("imageSelect");
    const selectedImage = imageSelect.value;

    // Mensajes y descripciones personalizados
    let mensajeTexto = "¡Felicidades!";
    let descripcionTexto = "";

    switch (selectedImage) {
      case "imgs/Pedropascasio.jpg":
        mensajeTexto = "¡El niño Pedro Pascasio y la captura de Barreiro!";
        descripcionTexto = "Ilustración donde un joven campesino observa oculto tras una roca mientras dos soldados interactúan, representando la escena de la captura. Importancia: Pedro Pascasio, con apenas 12 años, capturó al general Barreiro tras la batalla, simbolizando el papel de los niños y campesinos en la lucha libertadora.";
        break;

      case "imgs/LaBatalladeBoyacá.jpg":
        mensajeTexto = "¡La Batalla de Boyacá!";
        descripcionTexto = "Pintura panorámica que muestra el campo de batalla, con el enfrentamiento entre patriotas y realistas en pleno desarrollo. Importancia: Esta escena resume visualmente la intensidad del combate del 7 de agosto de 1819, día decisivo para la independencia de la Nueva Granada.";
        break;

      case "imgs/Campesinoboyacense.jpg":
        mensajeTexto = "¡El Campesino boyacense!";
        descripcionTexto = "Acuarela de un campesino con sombrero, ruana y alpargatas. Importancia: Representa al pueblo boyacense, fundamental en el apoyo logístico, con víveres, ropas y animales para el ejército libertador.";
        break;

      case "imgs/Celebracionespopulares.jpg":
        mensajeTexto = "¡Celebraciones populares!";
        descripcionTexto = "Acuarela de mujeres y músicos en una fiesta nocturna con instrumentos y trajes típicos. Importancia: Expresa el sentir del pueblo tras la victoria: la independencia fue también celebrada en las calles por los sectores populares.";
        break;

      case "imgs/ElcampodelríoBoyacá.jpg":
        mensajeTexto = "¡El campo del río Boyacá!";
        descripcionTexto = "Representación artística del paisaje natural donde tuvo lugar la batalla, con colinas y un emblemático puente al fondo. Importancia: Es el escenario real donde se enfrentaron patriotas y realistas. Este entorno fue clave para la estrategia militar de Bolívar..";
        break;
      case "imgs/Laimportanciadelavictoria.jpg":
        mensajeTexto = "¡La importancia de la victoria!";
        descripcionTexto = "Imagen de Bolívar entrando triunfante a Santafé junto a su séquito y recibiendo el saludo del pueblo. Importancia: Simboliza la consolidación de la victoria: con la entrada de Bolívar a la capital el 10 de agosto, se aseguró el control patriota del centro político del virreinato";
        break;
      case "imgs/Lossoldadosdelaindependencia.jpg":
        mensajeTexto = "¡Los soldados de la independencia!";
        descripcionTexto = "Acuarela de dos soldados patriotas, uno ayudando al otro a caminar. Importancia: Representa el sacrificio de los combatientes, muchos de ellos voluntarios que marcharon largas distancias en condiciones difíciles.";
        break;
      case "imgs/Tunjacunaytallerdelalibertad.jpg":
        mensajeTexto = "¡Tunja: cuna y taller de la libertad!";
        descripcionTexto = "Pintura colonial de la ciudad de Tunja y su plaza principal. Importancia:  Tunja fue un punto clave para el reabastecimiento, organización y apoyo civil al ejército patriota en los días previos a la batalla.";
        break;
      case "imgs/SimónBolívar.jpg":
        mensajeTexto = "¡Simón Bolívar!";
        descripcionTexto = "Óleo de época que muestra a Bolívar con traje militar y gesto de liderazgo. Importancia:  Figura central de la campaña, Bolívar lideró la estrategia que condujo a la victoria en Boyacá y consolidó el proyecto independentista.";
        break;
      case "imgs/Combateenelpuente.jpg":
        mensajeTexto = "¡Combate en el puente!";
        descripcionTexto = "Pintura que muestra el choque armado entre patriotas y realistas sobre el Puente de Boyacá. Importancia: Esta escena representa el punto álgido de la batalla, donde las tropas patriotas desorganizaron al enemigo y aseguraron la victoria final.";
        break;

      default:
        descripcionTexto = "¡Excelente trabajo! Tu paciencia y habilidad han dado sus frutos. Ahora puedes disfrutar de la imagen completa.";
        break;
    }

    mensaje.textContent = mensajeTexto;
    descripcion.textContent = descripcionTexto;
    mensaje.style.display = "block";

    mostrarPergamino();

    const btn_cerrar = pergamino.querySelector("button");
    btn_cerrar.addEventListener("click", closeMessage);
  }
}


function closeMessage() {
  ocultarPergamino();
}

const humo = document.getElementById("humoFondo");

function mostrarPergamino() {
  pergamino.classList.remove("replegar");
  pergamino.classList.add("desplegar");
  humo.classList.add("visible");
}

function ocultarPergamino() {
  pergamino.classList.remove("desplegar");
  pergamino.classList.add("replegar");
  humo.classList.remove("visible");
}

// Tema oscuro/claro
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
  const button = document.getElementById("themeToggle");
  const isDark = document.body.classList.contains("dark-mode");
  button.textContent = isDark ? "🌞 Modo claro" : "🌙 Modo oscuro";
}

// Mostrar/Ocultar Configuración
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('toggleConfig');
  const dashboard = document.querySelector('.dashboard');
  const label = toggleButton.querySelector('.label');
  const icon = toggleButton.querySelector('.icon');

  toggleButton.addEventListener('click', () => {
    const isActive = dashboard.classList.toggle('active');
    label.textContent = isActive ? 'Ocultar Configuración' : 'Mostrar Configuración';
    icon.textContent = isActive ? '👁️' : '⚙️';
  });
});

// 📱 Soporte táctil visual (arrastre)
let touchStartPiece = null;
let ghostPiece = null;

function handleTouchStart(e) {
  const touch = e.touches[0];
  touchStartPiece = e.target;

  ghostPiece = touchStartPiece.cloneNode(true);
  ghostPiece.style.position = "fixed";
  ghostPiece.style.pointerEvents = "none";
  ghostPiece.style.zIndex = "1000";
  ghostPiece.style.opacity = "0.7";
  ghostPiece.style.width = `${touchStartPiece.offsetWidth}px`;
  ghostPiece.style.height = `${touchStartPiece.offsetHeight}px`;
  document.body.appendChild(ghostPiece);

  moveGhost(touch.clientX, touch.clientY);
  e.preventDefault();
}

function handleTouchMove(e) {
  const touch = e.touches[0];
  moveGhost(touch.clientX, touch.clientY);
  e.preventDefault();
}

function handleTouchEnd(e) {
  const touch = e.changedTouches[0];
  const target = document.elementFromPoint(touch.clientX, touch.clientY);

  if (target && target.classList.contains("piece") && target !== touchStartPiece) {
    swapPieces(touchStartPiece, target);
  }

  if (ghostPiece) {
    ghostPiece.remove();
    ghostPiece = null;
  }
  touchStartPiece = null;
}

function moveGhost(x, y) {
  if (ghostPiece) {
    ghostPiece.style.left = `${x - ghostPiece.offsetWidth / 2}px`;
    ghostPiece.style.top = `${y - ghostPiece.offsetHeight / 2}px`;
  }
}

// Iniciar el rompecabezas al cargar
generatePuzzle();
