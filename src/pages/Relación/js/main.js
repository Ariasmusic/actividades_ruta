const textos = document.querySelectorAll('.caja-texto');
const zonasDrop = document.querySelectorAll('.zona-drop');
const resultado = document.getElementById('resultado');

// Evento al iniciar el arrastre de un texto
textos.forEach(texto => {
    texto.addEventListener('dragstart', e => {
        e.dataTransfer.setData('texto', texto.dataset.texto);
    });
});

// Eventos para las zonas de drop (una por fila)
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
        } else {
            zona.style.border = "2px solid red";
            zona.style.background = "#ffe5e5";
            setTimeout(() => {
                zona.style.border = "2px dashed #0033a0";
                zona.style.background = "#f0f8ff";
            }, 1000);
        }

        verificarFinal();
    });
});

// Verifica si ya no quedan textos por emparejar
function verificarFinal() {
    if (document.querySelectorAll('.caja-texto').length === 0) {
        resultado.textContent = "🎉 ¡Excelente! Has completado la Ruta Libertadora correctamente.";
    }
}

// Opcional: Mapea texto clave a su descripción completa
function obtenerTextoCompleto(clave) {
    const textosMap = {
        "Pore": "Primer pueblo libre de Colombia, punto de partida clave de la campaña libertadora.",
        "Pantano de Vargas": "Escenario de una batalla crucial dirigida por el coronel Rondón, vital para el triunfo.",
        "Puente de Boyacá": "Lugar donde se consolidó la independencia de Colombia el 7 de agosto de 1819."
    };
    return textosMap[clave] || clave;
}
function toggleInstrucciones() {
    const instrucciones = document.getElementById('instrucciones');
    instrucciones.classList.toggle('oculto');
}
