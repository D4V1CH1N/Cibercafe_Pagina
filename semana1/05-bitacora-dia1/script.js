document.addEventListener('DOMContentLoaded', function () {
    var contadorLikes = 0;
    var logOutput = document.getElementById('log-output');
    var navMenu = document.getElementById('nav-menu');
    var buscadorVivo = document.getElementById('buscador-vivo');
    var contadorLikesElemento = document.getElementById('contador-likes');

    function registrarBitacora(tipoEvento, detalleEvento) {
        if (!logOutput) {
            return;
        }
        var fechaActual = new Date();
        var horaTexto = fechaActual.toLocaleTimeString();
        var nuevaLinea = document.createElement('div');
        nuevaLinea.className = 'linea-log';
        nuevaLinea.textContent = '[' + horaTexto + '] [' + tipoEvento + '] ' + detalleEvento;
        logOutput.prepend(nuevaLinea);
    }

    document.addEventListener('click', function (eventoClick) {
        var elementoObjetivo = eventoClick.target;

        if (elementoObjetivo.id === 'btn-tema') {
            document.body.classList.toggle('modo-claro');
        }

        if (elementoObjetivo.closest('#btn-hamburguesa') && navMenu) {
            navMenu.classList.toggle('show');
            registrarBitacora('MENU', 'Menu hamburguesa alternado');
            return;
        }

        if (elementoObjetivo.classList.contains('btn-filtro')) {
            document.querySelectorAll('.btn-filtro').forEach(function (itemBoton) {
                itemBoton.classList.remove('activo');
            });
            elementoObjetivo.classList.add('activo');
            var categoria = elementoObjetivo.dataset.categoria;
            document.querySelectorAll('.card').forEach(function (card) {
                card.style.display = (categoria === 'todos' || card.dataset.categoria === categoria) ? 'block' : 'none';
            });
        }

        if (elementoObjetivo.classList.contains('enlace-nav')) {
            var categoriaEnlace = elementoObjetivo.dataset.categoria;
            if (categoriaEnlace) {
                document.querySelectorAll('.card').forEach(function (card) {
                    card.style.display = (categoriaEnlace === 'todos' || card.dataset.categoria === categoriaEnlace) ? 'block' : 'none';
                });
            }
            if (navMenu) {
                navMenu.classList.remove('show');
            }
        }

        if (elementoObjetivo.id === 'btn-like') {
            contadorLikes += 1;
            if (contadorLikesElemento) {
                contadorLikesElemento.textContent = contadorLikes;
            }
        }

        if (elementoObjetivo.id === 'btn-limpiar-log' && logOutput) {
            logOutput.textContent = '';
            registrarBitacora('SISTEMA', 'Bitacora limpiada');
            return;
        }

        if (elementoObjetivo.dataset && elementoObjetivo.dataset.accion) {
            registrarBitacora('EVENT BUBBLING', elementoObjetivo.dataset.accion);
        }
    });

    document.addEventListener('dblclick', function (eventoDobleClick) {
        var tarjetaObjetivo = eventoDobleClick.target.closest('.card');
        if (tarjetaObjetivo) {
            contadorLikes += 2;
            if (contadorLikesElemento) {
                contadorLikesElemento.textContent = contadorLikes;
            }
            var nombreTarjeta = tarjetaObjetivo.dataset.titulo || 'Estacion';
            registrarBitacora('SUPER LIKE', 'Doble clic en ' + nombreTarjeta + ' (+2 Likes)');
        }
    });

    if (buscadorVivo) {
        buscadorVivo.addEventListener('keyup', function () {
            var terminoBusqueda = buscadorVivo.value.trim().toLowerCase();
            document.querySelectorAll('.card').forEach(function (card) {
                var textoTarjeta = card.textContent.toLowerCase();
                card.style.display = (terminoBusqueda === '' || textoTarjeta.indexOf(terminoBusqueda) !== -1) ? 'block' : 'none';
            });
            registrarBitacora('KEYUP RADAR', 'Busqueda: "' + (terminoBusqueda || 'todos') + '"');
        });
    }

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

    registrarBitacora('SISTEMA', 'Bitacora Dia 1 inicializada');
});
