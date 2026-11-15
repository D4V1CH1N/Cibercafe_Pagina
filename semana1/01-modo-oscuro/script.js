document.addEventListener('DOMContentLoaded', function () {
    var botonTema = document.getElementById('btn-tema');
    if (botonTema) {
        botonTema.addEventListener('click', function () {
            document.body.classList.toggle('modo-claro');
        });
    }
});
