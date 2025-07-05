const textos = document.querySelectorAll('.caja-texto');
const zonasDrop = document.querySelectorAll('.zona-drop');
const resultado = document.getElementById('resultado');
const pergamino = document.getElementById("pergamino");
const mensaje = document.getElementById("mensaje");
const celebracion = document.querySelector(".celebracion");
const humo = document.getElementById("humoFondo");

let aciertos = 0;
let desaciertos = 0;

pergamino.classList.add("replegar");
mensaje.style.display = "none";

textos.forEach(texto => {
    texto.addEventListener('dragstart', e => {
        e.dataTransfer.setData('texto', texto.dataset.texto);
    });
});

zonasDrop.forEach(zona => {
    zona.addEventListener('dragover', e => {
        e.preventDefault();
        zona.classList.add('over');
    });

    zona.addEventListener('dragleave', () => {
        zona.classList.remove('over');
    });

    zona.addEventListener('drop', e => {
        e.preventDefault();
        zona.classList.remove('over');

        const textoArrastrado = e.dataTransfer.getData('texto');
        const respuestaCorrecta = zona.dataset.imagen;

        if (textoArrastrado === respuestaCorrecta) {
            zona.innerHTML = `<div class="correcto">${obtenerTextoCompleto(textoArrastrado)}</div>`;
            zona.style.border = "2px solid #28a745";
            zona.style.background = "#d4edda";
            const textoEliminado = document.querySelector(`[data-texto="${textoArrastrado}"]`);
            if (textoEliminado) textoEliminado.remove();
            aciertos++;
        } else {
            zona.style.border = "2px solid red";
            zona.style.background = "#ffe5e5";
            desaciertos++;
            setTimeout(() => {
                zona.style.border = "2px dashed #0033a0";
                zona.style.background = "#f0f8ff";
            }, 1000);
        }

        verificarFinal();
    });
});

function verificarFinal() {
    if (document.querySelectorAll('.caja-texto').length === 0) {
        mensaje.innerHTML = `🎉 ¡Excelente! Has completado la Ruta Libertadora correctamente.<br>Aciertos: ${aciertos} - Desaciertos: ${desaciertos}`;
        mensaje.style.display = "block";
        celebracion.style.display = "block";
        mostrarPergamino();

        const btn_cerrar = pergamino.querySelector("button");
        btn_cerrar.addEventListener("click", closeMessage);
    }
}

function obtenerTextoCompleto(clave) {
    const textosMap = {
        "El Puente de Boyacá": "Escenario clave donde se desarrolló el enfrentamiento decisivo entre los ejércitos patriota y realista el 7 de agosto de 1819.",
        "Juana Velasco y mujeres patriotas cosiendo": "Lideraron la confección de más de 2.000 camisas para las tropas libertadoras en Tunja, apoyando con fervor la causa patriota.",
        "Mapa con rutas patriota y realista": "Ambos ejércitos tomaron caminos distintos desde Tunja hacia el puente de Boyacá, buscando ventajas estratégicas",
        "Pedro Pascasio con Barreiro prisionero": "El joven llanero que capturó al general Barreiro al finalizar la batalla, impidiendo su fuga.",
        "Simón Bolívar montado a caballo": "Comandante de la campaña libertadora, diseñó la estrategia que permitió el triunfo patriota en Boyacá.",
        "Celebraciones en Santafé (entrada triunfal)": "El 10 de agosto, Bolívar entró a Santafé. La victoria en Boyacá fue decisiva para consolidar la independencia.",
    };
    return textosMap[clave] || clave;
}

function toggleInstrucciones() {
    const instrucciones = document.getElementById('instrucciones');
    instrucciones.classList.toggle('oculto');
}

function closeMessage() {
    ocultarPergamino();
}

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
