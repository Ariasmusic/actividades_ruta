document.addEventListener("DOMContentLoaded", () => {
    const flipbook = document.getElementById("flipbook");
    const audio = document.getElementById("audio");

    const pageFlip = new St.PageFlip(flipbook, {
        width: 900,
        height: 800,
        size: "fixed",
        minWidth: 315,
        maxWidth: 1000,
        minHeight: 420,
        maxHeight: 1350,
        maxShadowOpacity: 0.5,
        showCover: true,
        mobileScrollSupport: false
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

    document.getElementById("prev-btn").addEventListener("click", () => {
        pageFlip.flipPrev();
        audio.play();
    });

    document.getElementById("next-btn").addEventListener("click", () => {
        pageFlip.flipNext();
        audio.play();
    });
});
