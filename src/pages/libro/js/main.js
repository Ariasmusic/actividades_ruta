const sheets = document.querySelectorAll('.sheet');
let current = 0;

function nextPage() {
    if (current < sheets.length) {
        sheets[current].classList.add('flipped');
        current++;
    }
}

function prevPage() {
    if (current > 0) {
        current--;
        sheets[current].classList.remove('flipped');
    }
}