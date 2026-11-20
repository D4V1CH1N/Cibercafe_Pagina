// Semana 1 - Inicializacion DOM y Eventos
$(document).ready(function () {
    var totalOrden = 0;
    var contadorLikes = 0;
    var intervaloModal = null;
    var segundosModal = 30;
    var clasesFondo = 'bg-playstation bg-pc bg-arcade bg-comida';

    var datosCascada = {
        consolas: {
            'PlayStation 5': ['PS5-01 Standard', 'PS5-02 Digital', 'PS5-04 DualSense Edge'],
            'Xbox Series X': ['XBSX-01 GamePass', 'XBSX-02 Elite'],
            'Nintendo Switch': ['NSW-01 OLED Party', 'NSW-02 Dock TV']
        },
        pcs: {
            'Gama Ultra RTX 4080': ['PC-01 Monitor 240Hz', 'PC-02 Streaming', 'PC-03 Torneo'],
            'Gama Alta RTX 4070': ['PC-07 Competitiva', 'PC-08 VR Ready']
        },
        arcades: {
            'Peleas Retro': ['ARC-01 KOF 98', 'ARC-02 KOF 2002', 'ARC-05 Street Fighter II'],
            'Cooperativos': ['ARC-03 Metal Slug X', 'ARC-15 Sunset Riders']
        },
        snacks: {
            'Comida Rapida': ['Hamburguesa Doble LevelUp', 'Pizza Personal Pepperoni', 'Alitas BBQ'],
            'Combos y Bebidas': ['Combo Gamer 1', 'Combo Gamer 2', 'Bebida Energetica Monster']
        }
    };

    // Semana 1 - Bitacora Dia 1 Registro DOM
    function registrarBitacora(tipoEvento, detalleEvento) {
        var horaTexto = new Date().toLocaleTimeString();
        var $linea = $('<div>').addClass('linea-log').text('[' + horaTexto + '] [' + tipoEvento + '] ' + detalleEvento);
        $('#log-output').prepend($linea);
    }

    function mostrarToast(tituloTexto, mensajeTexto, esAlertaNaranja) {
        $('#toast-titulo').text(tituloTexto);
        $('#toast-cuerpo').text(mensajeTexto);
        if (esAlertaNaranja) {
            $('#toast-alert').addClass('toast-alerta-naranja');
        } else {
            $('#toast-alert').removeClass('toast-alerta-naranja');
        }
        $('#toast-alert').stop(true, true).slideDown('fast').delay(3000).fadeOut('slow');
    }

    function actualizarTotalOrden(montoSumar) {
        totalOrden += montoSumar;
        $('#total-orden').stop(true, true).animate({ opacity: 0.3 }, 110).text(totalOrden + ' Bs').animate({ opacity: 1 }, 190);
        $('#modal-total').text(totalOrden + ' Bs');
    }

    function recalcularEstimado() {
        var precioBase = parseInt($('#calc-estacion').val(), 10) || 15;
        var cantidadHoras = parseInt($('#calc-horas').val(), 10) || 1;
        var cantidadControles = parseInt($('#calc-controles').val(), 10) || 0;
        var subtotalCalculado = (precioBase + (cantidadControles * 3)) * cantidadHoras;
        $('#calc-subtotal').text(subtotalCalculado + ' Bs');
        return subtotalCalculado;
    }

    // Semana 1 - Modo Oscuro y Claro
    $('#btn-tema').on('click', function () {
        $('body').toggleClass('modo-claro');
        registrarBitacora('TEMA VISUAL', $('body').hasClass('modo-claro') ? 'Modo Claro' : 'Modo Oscuro');
    });

    // Semana 1 - Menu Hamburguesa
    $('#btn-hamburguesa').on('click', function () {
        $('#nav-menu').toggleClass('show');
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
    });

    $('.select-variante').on('change', function () {
        var $tarjeta = $(this).closest('.bloque-plataforma');
        var precioElegido = parseInt($(this).val(), 10) || 0;
        $tarjeta.find('.precio-card').text(precioElegido + ' Bs');
        registrarBitacora('CHANGE', $(this).data('nombre') + ' -> ' + precioElegido + ' Bs');
    });

    $('.btn-agregar-total').on('click', function () {
        var $tarjeta = $(this).closest('.bloque-plataforma');
        var montoItem = parseInt($tarjeta.find('.select-variante').val(), 10) || 0;
        actualizarTotalOrden(montoItem);
        mostrarToast('ITEM AGREGADO', $(this).data('nombre') + ' (+' + montoItem + ' Bs)', false);
        registrarBitacora('PEDIDO', $(this).data('nombre') + ' (+' + montoItem + ' Bs)');
    });

    $('.input-calc').on('input change', function () {
        var montoVivo = recalcularEstimado();
        registrarBitacora('CALCULADOR VIVO', 'Subtotal actualizado: ' + montoVivo + ' Bs');
    });

    $('#btn-agregar-calc').on('click', function () {
        var montoCalculado = recalcularEstimado();
        actualizarTotalOrden(montoCalculado);
        mostrarToast('CALCULO AGREGADO', 'Sesion calculada por ' + montoCalculado + ' Bs', false);
    });

    $('#capa1').on('change', function () {
        var zonaSeleccionada = $(this).val();
        var $capa2 = $('#capa2');
        var $capa3 = $('#capa3');
        $capa2.empty().append('<option value="">2. Plataforma...</option>');
        $capa3.empty().append('<option value="">3. Modelo...</option>').prop('disabled', true);

        if (!zonaSeleccionada || !datosCascada[zonaSeleccionada]) {
            $capa2.prop('disabled', true);
            $('#resultadoFiltro').text('Elige una zona para comenzar.');
            return;
        }
        $capa2.prop('disabled', false);
        var listaPlataformas = Object.keys(datosCascada[zonaSeleccionada]);
        for (var idxPlat = 0; idxPlat < listaPlataformas.length; idxPlat++) {
            $capa2.append('<option value="' + listaPlataformas[idxPlat] + '">' + listaPlataformas[idxPlat] + '</option>');
        }
        $('#resultadoFiltro').text('Zona: ' + zonaSeleccionada.toUpperCase());
    });

    $('#capa2').on('change', function () {
        var zonaSeleccionada = $('#capa1').val();
        var plataformaSeleccionada = $(this).val();
        var $capa3 = $('#capa3');
        $capa3.empty().append('<option value="">3. Modelo...</option>');

        if (!zonaSeleccionada || !plataformaSeleccionada || !datosCascada[zonaSeleccionada][plataformaSeleccionada]) {
            $capa3.prop('disabled', true);
            return;
        }
        $capa3.prop('disabled', false);
        var listaModelos = datosCascada[zonaSeleccionada][plataformaSeleccionada];
        for (var idxMod = 0; idxMod < listaModelos.length; idxMod++) {
            $capa3.append('<option value="' + listaModelos[idxMod] + '">' + listaModelos[idxMod] + '</option>');
        }
        $('#resultadoFiltro').text('Plataforma elegida: ' + plataformaSeleccionada);
    });

    $('#capa3').on('change', function () {
        var modeloSeleccionado = $(this).val();
        if (modeloSeleccionado) {
            $('#resultadoFiltro').text('Modelo listo: ' + $('#capa2').val() + ' -> ' + modeloSeleccionado);
            registrarBitacora('CASCADA 3 CAPAS', modeloSeleccionado);
        }
    });

    $('#btn-abrir-modal').on('click', function () {
        if (totalOrden <= 0) {
            mostrarToast('CARRITO VACIO', 'Agrega un servicio o snack antes de confirmar.', true);
            return;
        }
        $('#modal-total').text(totalOrden + ' Bs');
        segundosModal = 30;
        $('#timer-modal').text('00:30');
        $('#modal-confirmacion').fadeIn('fast');

        clearInterval(intervaloModal);
        intervaloModal = setInterval(function () {
            segundosModal--;
            $('#timer-modal').text('00:' + (segundosModal < 10 ? '0' + segundosModal : segundosModal));
            if (segundosModal <= 0) {
                clearInterval(intervaloModal);
                $('#modal-confirmacion').fadeOut('fast');
                mostrarToast('TARIFA FLASH EXPIRADA', 'El tiempo limite de 30s termino.', true);
                registrarBitacora('TIMER MODAL', 'Tarifa Flash Expirada');
            }
        }, 1000);
    });

    $('#btn-cerrar-modal').on('click', function () {
        clearInterval(intervaloModal);
        $('#modal-confirmacion').fadeOut('fast');
    });

    $('#form-checkout').on('submit', function (eventoCheckout) {
        eventoCheckout.preventDefault();
        clearInterval(intervaloModal);
        var nombreJugador = $('#checkout-nombre').val().trim();
        $('#modal-confirmacion').fadeOut('fast');
        totalOrden = 0;
        $('#total-orden').text('0 Bs');
        $('#form-checkout')[0].reset();
        mostrarToast('ORDEN CONFIRMADA', 'Pedido registrado para ' + nombreJugador + '.', false);
        registrarBitacora('CHECKOUT', 'Confirmado para ' + nombreJugador);
    });

    $('#btn-like').on('click', function () {
        contadorLikes += 1;
        $('#contador-likes').text(contadorLikes);
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
    });

    registrarBitacora('SISTEMA', 'Calculador, Modal 30s, Toast y Cascada activos');
});
