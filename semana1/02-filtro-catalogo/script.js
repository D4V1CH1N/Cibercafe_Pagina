document.addEventListener('DOMContentLoaded', function () {
    var botonTema = document.getElementById('btn-tema');
    if (botonTema) {
        botonTema.addEventListener('click', function () {
            document.body.classList.toggle('modo-claro');
        });
    }

    var botonesFiltro = document.querySelectorAll('.btn-filtro');
    botonesFiltro.forEach(function (botonFiltro) {
        botonFiltro.addEventListener('click', function () {
            botonesFiltro.forEach(function (itemBoton) {
                itemBoton.classList.remove('activo');
            });
            botonFiltro.classList.add('activo');
            var categoria = botonFiltro.dataset.categoria;
            document.querySelectorAll('.card').forEach(function (card) {
                card.style.display = (categoria === 'todos' || card.dataset.categoria === categoria) ? 'block' : 'none';
            });
        });
    });
});
