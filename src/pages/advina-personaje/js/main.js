function iniciarActividad() {
    document.getElementById('inicio').style.display = 'none';
    document.getElementById('actividad').style.display = 'grid';
}
let cont = 0;
function mostrarInstrucciones() {

    const instrucciones = document.getElementById('instrucciones');
    let simbolo = document.getElementById('instru');
    if (cont === 0) {
        simbolo.innerHTML = 'X';
        instrucciones.style.display = instrucciones.style.display === 'none' ? 'block' : 'none';
        cont++;
    } else {
        simbolo.innerHTML = '¿Cómo jugar?';
        instrucciones.style.display = 'none';
        cont--;
    }
}
document.querySelectorAll('.card').forEach(card => {
    const button = card.querySelector('button');
    const input = card.querySelector('input');
    const answer = card.dataset.answer;
    button.addEventListener('click', e => {
        e.stopPropagation();
        if (input.value.toLowerCase().trim() === answer.toLowerCase().trim()) {
            card.classList.add('flipped');
        } else {
            alert('Respuesta incorrecta');
        }
    });
});
