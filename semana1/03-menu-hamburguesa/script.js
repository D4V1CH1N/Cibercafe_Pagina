document.addEventListener('DOMContentLoaded', function () {
    var botonTema = document.getElementById('btn-tema');
    if (botonTema) {
        botonTema.addEventListener('click', function () {
            document.body.classList.toggle('modo-claro');
        });
    }

    var botonHamburguesa = document.getElementById('btn-hamburguesa');
    var navMenu = document.getElementById('nav-menu');
    if (botonHamburguesa && navMenu) {
        botonHamburguesa.addEventListener('click', function () {
            navMenu.classList.toggle('show');
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

    var enlacesNav = document.querySelectorAll('.enlace-nav');
    enlacesNav.forEach(function (enlaceNav) {
        enlaceNav.addEventListener('click', function () {
            var categoria = enlaceNav.dataset.categoria;
            if (categoria) {
                document.querySelectorAll('.card').forEach(function (card) {
                    card.style.display = (categoria === 'todos' || card.dataset.categoria === categoria) ? 'block' : 'none';
                });
            }
            if (navMenu) {
                navMenu.classList.remove('show');
            }
        });
    });
});
