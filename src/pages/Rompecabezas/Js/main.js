let puzzle = document.getElementById("puzzle");
let customImageURL = null;
let timer = 0;
let timerInterval = null;
let moves = 0;

// Sonidos locales
const moveAudio = new Audio("move.mp3");
const winAudio = new Audio("win.mp3");

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
    p.addEventListener("dragstart", handleDragStart);
    p.addEventListener("dragover", handleDragOver);
    p.addEventListener("dragleave", handleDragLeave);
    p.addEventListener("drop", handleDrop);
    puzzle.appendChild(p);
  });
}

function restartPuzzle() {
  generatePuzzle();
}

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

function checkVictory() {
  const pieces = puzzle.querySelectorAll(".piece");
  const isCorrect = Array.from(pieces).every(p => p.dataset.correct === p.dataset.current);
  if (isCorrect) {
    clearInterval(timerInterval);
    if (winAudio) winAudio.play();
    setTimeout(() => alert(`¡Felicidades! Has completado el rompecabezas en ${timer} segundos y ${moves} movimientos.`), 200);
  }
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");

  const button = document.getElementById("themeToggle");
  const isDark = document.body.classList.contains("dark-mode");

  button.textContent = isDark ? "🌞 Modo claro" : "🌙 Modo oscuro";
}
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

generatePuzzle();

