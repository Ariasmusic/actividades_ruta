const personajes = [
    {
        nombre: "Juana Velasco de Gallo",
        miniatura: "imgs/Juana_Circular.png",
        imagen: "imgs/juanavelascodegallo.jpg",
        audio: "audios/audio2.mp3",
        narracion: "Yo no fui soldado, pero puse todo lo que tenía para la causa...",
        pregunta: "¿Por qué ayudaron tanto a los soldados?"
    },
    {
        nombre: "Pedro Pascasio Martínez",
        miniatura: "imgs/Pedro_Circular.png",
        imagen: "imgs/pedropascaciomartinez.jpg",
        audio: "audios/audio4.mp3",
        narracion: "Yo era solo un niño, pero ese día tenía la misión de vigilar...",
        pregunta: "¿No tuviste miedo al capturar a Barreiro?"
    },
    {
        nombre: "Estefanía Parra",
        miniatura: "imgs/Estefania-Circular.png",
        imagen: "imgs/estefania_parra.jpg",
        audio: "audios/audio1.mp3",
        narracion: "No me llamaban soldado, pero sí conocía el río como la palma de mi mano...",
        pregunta: "¿Cómo supiste dónde podían cruzar?"
    },
    {
        nombre: "Simón Bolívar",
        miniatura: "imgs/SimonBolivar_Circular.png",
        imagen: "imgs/simonbolivar.jpg",
        audio: "audios/audio6.mp3",
        narracion: "Después de Pantano de Vargas, sabíamos que no podíamos perder...",
        pregunta: "¿Qué sintió al ganar la Batalla de Boyacá?"
    },

    {
        nombre: "Julián Garzón",
        miniatura: "imgs/julian_Circular.png",
        imagen: "imgs/juliangarzon.jpg",
        audio: "audios/audio3.mp3",
        narracion: "Nadie sospechaba de mí. Fui con pan, vino y dulces al campamento realista...",
        pregunta: "¿Por qué arriesgó su vida como espía?"
    },

    {
        nombre: "Soldado anónimo (Juan Elías)",
        miniatura: "imgs/Soldado_circular.png",
        imagen: "imgs/soldado.jpg",
        audio: "audios/audio5.mp3",
        narracion: "Venía desde Casanare. Caminamos por el páramo, con hambre, mojados...",
        pregunta: "¿Qué lo motivó a seguir en medio de tantas dificultades?"
    }
];

let personajeActual = null;

function mostrarPersonaje(index, elementoOrigen) {
    personajeActual = personajes[index];
    const centro = document.getElementById("centro");
    const rectOrigen = elementoOrigen.getBoundingClientRect();

    const imgAnimada = document.createElement('img');
    imgAnimada.src = personajeActual.miniatura;
    imgAnimada.className = 'animacion-img';
    imgAnimada.style.position = 'fixed';
    imgAnimada.style.left = `${rectOrigen.left}px`;
    imgAnimada.style.top = `${rectOrigen.top}px`;
    imgAnimada.style.width = `${rectOrigen.width}px`;
    imgAnimada.style.height = `${rectOrigen.height}px`;
    imgAnimada.style.zIndex = 1000;

    document.body.appendChild(imgAnimada);
    void imgAnimada.offsetWidth;

    imgAnimada.style.left = `calc(50% - 140px)`;
    imgAnimada.style.top = `calc(50% - 200px)`;
    imgAnimada.style.width = '280px';
    imgAnimada.style.borderRadius = '12px';

    setTimeout(() => {
        imgAnimada.remove();
        centro.innerHTML = `
      <div class="imagen-personaje">
        <img src="${personajeActual.imagen}" alt="${personajeActual.nombre}">
      </div>
      <div class="contenido-personaje">
        <h3>${personajeActual.nombre}</h3>
        <audio controls src="${personajeActual.audio}"></audio>
        <p>${personajeActual.narracion}</p>
        <button onclick="mostrarInfo()">Más Información</button>
        <button onclick="mostrarPregunta()">Reto</button>
        <p id="pregunta-personaje" class="oculto"></p>
        <button onclick="volverAlInicio()">Volver</button>
      </div>
    `;
    }, 700);
}
function mostrarInfo() {
    const info = document.createElement('div');
    info.className = 'info-personaje';
    info.innerHTML = `
        <h4>Información Adicional</h4>
        <p>${personajeActual.nombre} fue un personaje clave en la Batalla de Boyacá, contribuyendo de manera significativa a la independencia.</p>
        <button onclick="cerrarInfo()">Cerrar</button>
    `;
    document.getElementById("centro").appendChild(info);
}
function cerrarInfo() {
    const info = document.querySelector('.info-personaje');
    if (info) {
        info.remove();  
    }
}
function mostrarPregunta() {
    const p = document.getElementById("pregunta-personaje");
    if (personajeActual && personajeActual.pregunta) {
        p.textContent = personajeActual.pregunta;
        p.classList.remove("oculto");
    }
}

function volverAlInicio() {
    document.getElementById("centro").innerHTML = "";
    personajeActual = null;
}

function iniciar() {
    document.getElementById("pantalla-inicial").classList.add("oculto");
    document.getElementById("seleccion-personaje").classList.remove("oculto");
}



document.querySelectorAll('.personaje').forEach(personaje => {
    personaje.addEventListener('click', () => {
        const index = parseInt(personaje.dataset.index);
        mostrarPersonaje(index, personaje);
    });
});

function mostrarInstrucciones() {
    document.getElementById("modal-instrucciones").classList.remove("oculto");
}

function cerrarInstrucciones() {
    document.getElementById("modal-instrucciones").classList.add("oculto");
}

