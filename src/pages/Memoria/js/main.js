const lugares = [
    'Boyacá', 'Pantano de Vargas', 'Tunja', 'Bogotá',
    'Piedecuesta', 'Paya', 'Socha', 'maparutalibertadora'
];

let cartas = [...lugares, ...lugares];
let tablero = document.getElementById('tablero');
let mensaje = document.getElementById('mensaje');
let primera = null;
let segunda = null;
let bloqueo = false;
let aciertos = 0;

const sonidoAcierto = document.getElementById('sonido-acierto');
const sonidoError = document.getElementById('sonido-error');
const sonidoVictoria = document.getElementById('sonido-victoria');

function crearCarta(nombre) {
    const carta = document.createElement('div');
    carta.className = 'carta';
    carta.dataset.lugar = nombre;

    const contenido = document.createElement('div');
    contenido.className = 'contenido';

    const frente = document.createElement('div');
    frente.className = 'frente';
    frente.textContent = '?';

    const reverso = document.createElement('div');
    reverso.className = 'reverso';
    reverso.style.backgroundImage = `url('imgs/${nombre}.jpg')`;

    contenido.appendChild(frente);
    contenido.appendChild(reverso);
    carta.appendChild(contenido);

    carta.addEventListener('click', () => voltearCarta(carta));
    return carta;
}

function voltearCarta(carta) {
    if (bloqueo || carta.classList.contains('volteada') || carta === primera) return;

    carta.classList.add('volteada');

    if (!primera) {
        primera = carta;
    } else {
        segunda = carta;
        bloqueo = true;
        setTimeout(verificarPareja, 1000);
    }
}

function mezclarCartas() {
    cartas.sort(() => 0.5 - Math.random());
}

function iniciarJuego() {
    tablero.innerHTML = '';
    mensaje.textContent = '';
    aciertos = 0;
    mezclarCartas();
    cartas.forEach(nombre => {
        tablero.appendChild(crearCarta(nombre));
    });
}

function reiniciarJuego() {
    [primera, segunda] = [null, null];
    bloqueo = false;
    mensaje.style.display = 'none';

    iniciarJuego();
}

function abrirModal() {
    document.getElementById('modal').style.display = 'block';
}

function cerrarModal() {
    document.getElementById('modal').style.display = 'none';
}

window.onclick = function (event) {
    if (event.target === document.getElementById('modal')) {
        cerrarModal();
    }
}
function verificarPareja() {
    if (primera.dataset.lugar === segunda.dataset.lugar) {
        aciertos++;
        sonidoAcierto.play();
        if (aciertos === lugares.length) {
            mensaje.style.display = 'block';
            mensaje.textContent = '📚¡Felicitaciones! Completaste la Ruta Libertadora de 1819🗡️';
            sonidoVictoria.play();
        }
    } else {
        sonidoError.play();
        primera.classList.remove('volteada');
        segunda.classList.remove('volteada');
    }
    [primera, segunda] = [null, null];
    bloqueo = false;
}
iniciarJuego();
