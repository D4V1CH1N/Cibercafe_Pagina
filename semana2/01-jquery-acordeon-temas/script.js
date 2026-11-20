// Semana 1 - Inicializacion DOM y Eventos
$(document).ready(function () {
    var totalOrden = 0;
    var contadorLikes = 0;
    var clasesFondo = 'bg-playstation bg-pc bg-arcade bg-comida';

    // Semana 1 - Bitacora Dia 1 Registro DOM
    function registrarBitacora(tipoEvento, detalleEvento) {
        var horaTexto = new Date().toLocaleTimeString();
        var $linea = $('<div>').addClass('linea-log').text('[' + horaTexto + '] [' + tipoEvento + '] ' + detalleEvento);
        $('#log-output').prepend($linea);
    }

    // Semana 1 - Modo Oscuro y Claro
    $('#btn-tema').on('click', function () {
        $('body').toggleClass('modo-claro');
        registrarBitacora('TEMA VISUAL', $('body').hasClass('modo-claro') ? 'Modo Claro' : 'Modo Oscuro');
    });

    // Semana 1 - Menu Hamburguesa
    $('#btn-hamburguesa').on('click', function () {
        $('#nav-menu').toggleClass('show');
        registrarBitacora('MENU', 'Menu desplegable alternado');
    });

    // Semana 1 - Filtro de Catalogo por Dataset
    $('.btn-filtro').on('click', function () {
        $('.btn-filtro').removeClass('activo');
        $(this).addClass('activo');
        var categoria = $(this).data('categoria');
        var tema = $(this).data('tema');
        $('body').removeClass(clasesFondo);
        if (tema) {
            $('body').addClass('bg-' + tema);
        }
        $('.card').each(function () {
            if (categoria === 'todos' || $(this).data('categoria') === categoria) {
                $(this).fadeIn('fast');
            } else {
                $(this).fadeOut('fast');
            }
        });
        registrarBitacora('FILTRO JQUERY', 'Categoria: ' + categoria);
    });

    $('.enlace-nav').on('click', function () {
        var categoria = $(this).data('categoria');
        $('.card').each(function () {
            if (categoria === 'todos' || $(this).data('categoria') === categoria) {
                $(this).fadeIn('fast');
            } else {
                $(this).fadeOut('fast');
            }
        });
        $('#nav-menu').removeClass('show');
    });

    $('.accordion-btn').on('click', function () {
        var temaAsociado = $(this).data('tema');
        $('body').removeClass(clasesFondo);
        if (temaAsociado) {
            $('body').addClass('bg-' + temaAsociado);
        }
        $(this).next('.accordion-panel').slideToggle('fast');
        registrarBitacora('ACORDEON', 'Panel alternado (' + temaAsociado + ')');
    });

    $('.select-variante').on('change', function () {
        var $tarjeta = $(this).closest('.bloque-plataforma');
        var precioElegido = parseInt($(this).val(), 10) || 0;
        var detalleElegido = $(this).find('option:selected').data('detalle');
        $tarjeta.find('.precio-card').text(precioElegido + ' Bs');
        registrarBitacora('CHANGE', $(this).data('nombre') + ' -> ' + detalleElegido);
    });

    $('.btn-agregar-total').on('click', function () {
        var $tarjeta = $(this).closest('.bloque-plataforma');
        var montoItem = parseInt($tarjeta.find('.select-variante').val(), 10) || 0;
        totalOrden += montoItem;
        $('#total-orden').stop(true, true).animate({ opacity: 0.3 }, 110).text(totalOrden + ' Bs').animate({ opacity: 1 }, 190);
        registrarBitacora('TOTAL ANIMADO', $(this).data('nombre') + ' (+' + montoItem + ' Bs)');
    });

    $('#btn-like').on('click', function () {
        contadorLikes += 1;
        $('#contador-likes').text(contadorLikes);
        registrarBitacora('LIKE', 'Likes totales: ' + contadorLikes);
    });

    // Semana 1 - Bitacora Dia 1 Bubbling Dblclick
    $('.card').on('dblclick', function () {
        contadorLikes += 2;
        $('#contador-likes').text(contadorLikes);
        registrarBitacora('SUPER LIKE', 'Doble clic en ' + $(this).data('titulo'));
    });

    $('#buscador-vivo').on('keyup', function () {
        var consulta = $(this).val().trim().toLowerCase();
        $('.card').each(function () {
            var coincide = consulta === '' || $(this).text().toLowerCase().indexOf(consulta) !== -1;
            if (coincide) {
                $(this).fadeIn('fast');
            } else {
                $(this).fadeOut('fast');
            }
        });
    });

    $('#form-consulta').on('submit', function (eventoFormulario) {
        eventoFormulario.preventDefault();
        var valorNombre = $('#campo-nombre').val().trim();
        var valorCorreo = $('#campo-correo').val().trim();
        var valorMensaje = $('#campo-mensaje').val().trim();
        var regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        var $alerta = $('#alerta-formulario');

        if (valorNombre === '' || valorCorreo === '' || valorMensaje === '') {
            $alerta.removeClass('alerta-exito').text('Todos los campos son obligatorios.').fadeIn('fast');
            return;
        }
        if (!regexEmail.test(valorCorreo)) {
            $alerta.removeClass('alerta-exito').text('Correo electronico invalido.').fadeIn('fast');
            return;
        }

        $alerta.addClass('alerta-exito').text('Consulta enviada para ' + valorNombre + '.').fadeIn('fast');
        registrarBitacora('SUBMIT + RESET', 'Consulta enviada por ' + valorNombre);
        $('#form-consulta')[0].reset();
    });

    $('#btn-limpiar-log').on('click', function () {
        $('#log-output').empty();
        registrarBitacora('SISTEMA', 'Bitacora limpiada');
    });

    registrarBitacora('SISTEMA', 'jQuery 3.7.1 Acordeones y Temas activo');
});
