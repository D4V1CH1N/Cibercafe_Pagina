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

    var formularioConsulta = document.getElementById('form-consulta');
    var alertaBloque = document.getElementById('alerta-formulario');
    if (formularioConsulta && alertaBloque) {
        formularioConsulta.addEventListener('submit', function (eventoFormulario) {
            eventoFormulario.preventDefault();
            var valorNombre = document.getElementById('campo-nombre').value.trim();
            var valorCorreo = document.getElementById('campo-correo').value.trim();
            var valorMensaje = document.getElementById('campo-mensaje').value.trim();
            var regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (valorNombre === '' || valorCorreo === '' || valorMensaje === '') {
                alertaBloque.classList.remove('alerta-exito');
                alertaBloque.textContent = 'Todos los campos son obligatorios.';
                alertaBloque.style.display = 'block';
                return;
            }

            if (!regexEmail.test(valorCorreo)) {
                alertaBloque.classList.remove('alerta-exito');
                alertaBloque.textContent = 'Ingresa un correo electronico valido.';
                alertaBloque.style.display = 'block';
                return;
            }

            alertaBloque.classList.add('alerta-exito');
            alertaBloque.textContent = 'Solicitud valida enviada para ' + valorNombre + '.';
            alertaBloque.style.display = 'block';
            formularioConsulta.reset();
        });
    }
});
