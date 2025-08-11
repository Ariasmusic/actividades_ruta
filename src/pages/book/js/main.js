document.addEventListener("DOMContentLoaded", () => {
    const flipbook = document.getElementById("flipbook");
    const audio = document.getElementById("audio");

    const pageFlip = new St.PageFlip(flipbook, {
        width: 650,
        height: 500,
        size: "fixed",
        minWidth: 315,
        maxWidth: 1000,
        minHeight: 420,
        maxHeight: 1350,
        maxShadowOpacity: 0.5,
        showCover: true,
        mobileScrollSupport: false,
    });

    const pages = flipbook.querySelectorAll(".page");

    // Si hay un número impar de páginas internas, agregamos una página en blanco
    if ((pages.length - 1) % 2 !== 0) {
        const blankPage = document.createElement("div");
        blankPage.classList.add("page");
        blankPage.innerHTML = "<div class='page-content'></div>";
        flipbook.insertBefore(blankPage, flipbook.lastElementChild); // antes de contraportada
    }

    pageFlip.loadFromHTML(flipbook.querySelectorAll(".page"));
    // Manejo de clics en el índice
    document.querySelectorAll(".tabla-contenido a").forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const page = parseInt(link.getAttribute("data-page"), 10);
            pageFlip.flip(page);
            audio.play();
        });
    });

    // Botón de inicio
    document.getElementById("btn_home").addEventListener("click", function () {
        // Cambia a la página del índice (aquí uso la 3)
        pageFlip.flip(3);
    });

    document.getElementById("prev-btn").addEventListener("click", () => {
        pageFlip.flipPrev();
        audio.play();
    });

    document.getElementById("next-btn").addEventListener("click", () => {
        pageFlip.flipNext();
        audio.play();
    });
});
function reproducirAudio(audioId) {
    const audio = document.getElementById(audioId);
    if (!audio) return;
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

document.querySelectorAll(".audio-button").forEach((button) => {
    const audioId = button.getAttribute("data-audio");

    // Detener propagación para múltiples eventos de entrada
    ["click", "pointerdown", "mousedown", "touchstart"].forEach(eventType => {
        button.addEventListener(eventType, (event) => {
            event.stopPropagation();
        });
    });

    // Reproducir audio con clic
    button.addEventListener("click", () => {
        reproducirAudio(audioId);
    });
});



