// Obtener referencias a los elementos del pergamino y mensaje
const pergamino = document.getElementById("pergamino");
const mensaje = document.getElementById("mensaje");
const celebracion = document.querySelector(".celebracion"); 

// Ocultar al inicio (solo con clases, no con display)
pergamino.classList.add("replegar");
mensaje.style.display = "none";


const lugares = [
    '1. El niño Pedro Pascasio y la captura de Barreiro',
    '2. La Batalla de Boyacá',
    '3. Campesino boyacense',
    '4. Celebraciones populares',
    '5. El campo del río Boyacá',
    '6. La importancia de la victoria',
    '7. Los soldados de la independencia',
    '8. Tunja cuna y taller de la libertad',
    // '9. Simón Bolívar',
    // '10. Combate en el puente'
];

let cartas = [...lugares, ...lugares];
let tablero = document.getElementById('tablero');
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

    // Soporte clic y táctil
    const manejarVolteo = () => voltearCarta(carta);
    carta.addEventListener('click', manejarVolteo);
    carta.addEventListener('touchstart', (e) => {
        e.preventDefault();
        manejarVolteo();
    }, { passive: false });

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
        setTimeout(verificarPareja, 800);
    }
}

function verificarPareja() {
    if (primera.dataset.lugar === segunda.dataset.lugar) {
        aciertos++;
        sonidoAcierto.play();
        if (aciertos === lugares.length) {
            // Mostrar mensaje
            mensaje.textContent = `¡Felicidades! Has completado el juego de memoria`;
            mensaje.style.display = "block";
            celebracion.style.display = "block"; // Mostrar la imagen de celebración

            // Mostrar pergamino animado
            mostrarPergamino();

            // Asociar el botón de cierre (asegúrate de tenerlo en el HTML)
            const btn_cerrar = pergamino.querySelector("button");
            btn_cerrar.addEventListener("click", closeMessage);
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
// Iniciar el juego al cargar
document.addEventListener('DOMContentLoaded', iniciarJuego);

