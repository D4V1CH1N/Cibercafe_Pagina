// Semana 1 - Inicializacion DOM y Eventos
$(document).ready(function () {

    // Semana 3 - Bloqueo de Aviso Instalar PWA
    window.addEventListener('beforeinstallprompt', function (eventoInstalacion) {
        eventoInstalacion.preventDefault();
    });

    var totalPagar = 0;
    var totalItems = 0;
    var contadorLikes = 0;
    var contadorEventosSistema = 0;
    var intervaloModal = null;
    var segundosRestantes = 30;
    var intervaloPromo10m = null;
    var segundosPromo10m = 600;
    var promoExpirada = false;
    var promoReclamada = false;
    var promocionActivaActual = null;
    var intervaloAutoAdmin = null;
    var listaActividadCache = [];
    var sincronizacionFifoActiva = false;
    var temporizadorBusquedaRadar = null;
    var listaSnacksGlobal = [];
    var reservasActivas = [];
    var consultasActivas = [];
    var sesionActual = null;

    var clasesFondo = 'bg-playstation bg-xbox bg-xboxone bg-xbox360 bg-switch bg-pc bg-arcade bg-comida';

    var datosCascada = {
        consolas: {
            'PlayStation 5': ['PS5-01 Standard', 'PS5-02 Digital', 'PS5-04 DualSense Edge'],
            'Xbox Series X': ['XBSX-01 GamePass', 'XBSX-02 Elite'],
            'Nintendo Switch': ['NSW-01 OLED Party', 'NSW-02 Dock TV']
        },
        pcs: {
            'Gama Ultra RTX 4080': ['PC-01 Monitor 240Hz', 'PC-02 Streaming', 'PC-03 Torneo'],
            'Gama Alta RTX 4070': ['PC-07 Competitiva', 'PC-08 VR Ready'],
            'Gama Media RTX 4060': ['PC-15 E-Sports', 'PC-16 Multiuso']
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

    var catalogoJuegosConsola = {
        ps5: [
            'EA Sports FC 27', 'Tekken 8', 'Mortal Kombat 1', 'God of War Ragnarok', 'Spider-Man 2',
            'Elden Ring', 'Resident Evil 4 Remake', 'Demons Souls', 'Gran Turismo 7', 'Final Fantasy XVI',
            'Street Fighter 6', 'Silent Hill 2', 'Black Myth Wukong', 'Astro Bot', 'Horizon Forbidden West',
            'Ghost of Tsushima', 'Cyberpunk 2077', 'Ratchet & Clank Rift Apart', 'Returnal', 'The Last of Us Part I'
        ],
        ps4: [
            'GTA V', 'Bloodborne', 'God of War (2018)', 'Uncharted 4', 'The Last of Us Part II',
            'Red Dead Redemption 2', 'FIFA 23', 'Crash Team Racing Nitro-Fueled', 'Marvels Spider-Man', 'Horizon Zero Dawn',
            'Persona 5 Royal', 'Sekiro Shadows Die Twice', 'Monster Hunter World', 'Dragon Ball FighterZ', 'Mortal Kombat 11',
            'Tekken 7', 'Shadow of the Colossus', 'Days Gone', 'Infamous Second Son', 'Nier Automata'
        ],
        ps3: [
            'PES 2013', 'Metal Gear Solid 4', 'God of War III', 'Uncharted 2', 'Uncharted 3',
            'Gran Turismo 6', 'Twisted Metal', 'Killzone 3', 'Resistance 3', 'Infamous 2',
            'LittleBigPlanet 2', 'Red Dead Redemption', 'GTA IV', 'Demons Souls', 'Heavy Rain',
            'Beyond Two Souls', 'MotorStorm Pacific Rift', 'Batman Arkham City', 'Call of Duty Black Ops II', 'Ultra Street Fighter IV'
        ],
        xboxsx: [
            'Halo Infinite', 'Forza Horizon 5', 'Forza Motorsport', 'Gears 5', 'Starfield',
            'Senuas Saga Hellblade II', 'Call of Duty Black Ops 6', 'Sea of Thieves', 'Microsoft Flight Simulator', 'Hi-Fi Rush',
            'Ori and the Will of the Wisps', 'Doom Eternal', 'Elden Ring', 'EA Sports FC 27', 'Mortal Kombat 1',
            'Lies of P', 'Palworld', 'Grounded', 'State of Decay 2', 'Psychonauts 2'
        ],
        xboxone: [
            'Halo 5 Guardians', 'Halo Master Chief Collection', 'Gears of War 4', 'Forza Horizon 4', 'Killer Instinct',
            'Sunset Overdrive', 'Quantum Break', 'Cuphead', 'Ori and the Blind Forest', 'Ryse Son of Rome',
            'Dead Rising 3', 'Titanfall 2', 'Red Dead Redemption 2', 'GTA V', 'The Witcher 3',
            'Fallout 4', 'Battlefield 1', 'Apex Legends', 'Fortnite', 'Minecraft'
        ],
        xbox360: [
            'Halo 3', 'Halo Reach', 'Gears of War', 'Gears of War 2', 'Gears of War 3',
            'Left 4 Dead 2', 'Fable II', 'Forza Motorsport 4', 'Alan Wake', 'Lost Odyssey',
            'Crackdown', 'Project Gotham Racing 4', 'Dead or Alive 4', 'Ninja Gaiden II', 'Castle Crashers',
            'Call of Duty Modern Warfare 2', 'BioShock', 'Mass Effect 2', 'Red Dead Redemption', 'Skyrim'
        ],
        switch: [
            'Mario Kart 8 Deluxe', 'Super Smash Bros Ultimate', 'Zelda Tears of the Kingdom', 'Zelda Breath of the Wild', 'Super Mario Odyssey',
            'Super Mario Bros Wonder', 'Splatoon 3', 'Animal Crossing New Horizons', 'Metroid Dread', 'Fire Emblem Engage',
            'Xenoblade Chronicles 3', 'Luigis Mansion 3', 'Super Mario Party Jamboree', 'Pokemon Scarlet', 'Kirby and the Forgotten Land',
            'Donkey Kong Tropical Freeze', 'Bayonetta 3', 'Astral Chain', 'Mario Tennis Aces', 'Mario Strikers Battle League'
        ]
    };

    var lista25Arcades = [
        'The King of Fighters 98', 'The King of Fighters 2002 Magic Plus', 'Metal Slug X', 'Metal Slug 3',
        'Street Fighter II Champion Edition', 'Street Fighter III 3rd Strike', 'Marvel vs Capcom 2', 'Tekken Tag Tournament',
        'Mortal Kombat II', 'Ultimate Mortal Kombat 3', 'Pac-Man', 'Ms. Pac-Man',
        'Galaga', 'Space Invaders', 'Sunset Riders', 'Cadillacs and Dinosaurs',
        'Teenage Mutant Ninja Turtles', 'The Simpsons Arcade', 'Captain Commando', 'Final Fight',
        'Snow Bros', 'Bubble Bobble', 'Bomberman World', 'Daytona USA', 'Dance Dance Revolution Extreme'
    ];

    function obtenerHoraActual() {
        var fechaSistema = new Date();
        var horasTexto = String(fechaSistema.getHours()).padStart(2, '0');
        var minutosTexto = String(fechaSistema.getMinutes()).padStart(2, '0');
        var segundosTexto = String(fechaSistema.getSeconds()).padStart(2, '0');
        return horasTexto + ':' + minutosTexto + ':' + segundosTexto;
    }

    function obtenerColaSincronizacion() {
        try {
            var cadenaGuardada = localStorage.getItem('colaSincronizacionCiber');
            var colaParseada = cadenaGuardada ? JSON.parse(cadenaGuardada) : [];
            return Array.isArray(colaParseada) ? colaParseada : [];
        } catch (errorLectura) {
            return [];
        }
    }

    function encolarOperacionOfflineFIFO(tipoOperacion, datosPayload) {
        var colaActual = obtenerColaSincronizacion();
        colaActual.push({
            tipo: tipoOperacion,
            payload: datosPayload,
            fechaHora: new Date().toISOString()
        });
        localStorage.setItem('colaSincronizacionCiber', JSON.stringify(colaActual));
        actualizarMetricasAdmin();
    }

    function actualizarMetricasAdmin() {
        var colaPendiente = obtenerColaSincronizacion();
        $('#metrica-eventos').text(contadorEventosSistema);
        $('#metrica-reservas').text(reservasActivas.length);
        $('#metrica-cola').text(colaPendiente.length);
        $('#metrica-likes').text(contadorLikes);
        $('#admin-estado-red').text(navigator.onLine ? 'ONLINE' : 'OFFLINE LOCAL');

        var $listaFifo = $('#lista-cola-fifo-admin');
        $listaFifo.empty();
        if (colaPendiente.length === 0) {
            $listaFifo.append($('<li>').addClass('item-gestion vacio-gestion').text('Sin operaciones pendientes en cola FIFO.'));
        } else {
            for (var indiceCola = 0; indiceCola < colaPendiente.length; indiceCola++) {
                var registroCola = colaPendiente[indiceCola];
                var tipoNodo = registroCola.tipo || 'pedido';
                var cuerpoNodo = registroCola.payload || registroCola;
                var resumenLinea = '';
                if (tipoNodo === 'pedido') {
                    resumenLinea = 'Cliente: ' + (cuerpoNodo.nombre || cuerpoNodo.cliente || 'Invitado') + ' | Total: ' + (cuerpoNodo.total || cuerpoNodo.montoTotal || 0) + ' Bs';
                } else if (tipoNodo === 'reserva') {
                    resumenLinea = 'Reserva: ' + (cuerpoNodo.cliente || 'Cliente') + ' - ' + (cuerpoNodo.sala || '');
                } else if (tipoNodo === 'promocion') {
                    resumenLinea = 'Promocion Express: ' + (cuerpoNodo.titulo || 'Oferta');
                } else if (tipoNodo === 'actividad') {
                    resumenLinea = 'Actividad: ' + (cuerpoNodo.cliente || 'Cliente') + ' -> ' + (cuerpoNodo.accion || '');
                } else {
                    resumenLinea = 'Operacion ' + tipoNodo.toUpperCase() + ' pendiente';
                }
                var $filaCola = $('<li>').addClass('item-gestion');
                $filaCola.append($('<strong>').text('[' + tipoNodo.toUpperCase() + '] ' + resumenLinea));
                $filaCola.append($('<span>').text('Registrado: ' + (registroCola.fechaHora || 'Pendiente')));
                $listaFifo.append($filaCola);
            }
        }
    }

    // Semana 1 - Bitacora Dia 1 Registro DOM
    function registrarEvento(tipoEvento, descripcionMensaje) {
        contadorEventosSistema += 1;
        var horaTexto = obtenerHoraActual();
        var esSistema = tipoEvento.indexOf('SISTEMA') !== -1 || tipoEvento.indexOf('OFFLINE') !== -1;

        var $lineaEvento = $('<div>').addClass('linea-log');
        if (esSistema) {
            $lineaEvento.addClass('log-sistema');
        }
        var $spanHora = $('<span>').addClass('log-hora').text('[' + horaTexto + ']');
        var $spanTag = $('<span>').addClass('log-tag').text('[' + tipoEvento + ']');
        var $spanMensaje = $('<span>').text(' ' + descripcionMensaje);

        $lineaEvento.append($spanHora, ' ', $spanTag, $spanMensaje);
        $('#log-output').prepend($lineaEvento);

        actualizarMetricasAdmin();
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

    function actualizarEstadoRed() {
        var $badgeRed = $('#estado-red-hud');
        if (navigator.onLine) {
            $badgeRed.text('ONLINE').removeClass('offline-activo');
        } else {
            $badgeRed.text('OFFLINE').addClass('offline-activo');
        }
        actualizarMetricasAdmin();
    }

    // Semana 2 - Login y Control de 3 Roles
    function detenerAutoRefreshAdmin() {
        if (intervaloAutoAdmin !== null) {
            clearInterval(intervaloAutoAdmin);
            intervaloAutoAdmin = null;
        }
    }

    function iniciarAutoRefreshAdmin() {
        detenerAutoRefreshAdmin();
        intervaloAutoAdmin = setInterval(function () {
            if (navigator.onLine && sesionActual && sesionActual.rol === 'admin') {
                cargarPanelAdminEjecutivo();
            }
        }, 15000);
    }

    function aplicarPermisosRol(rolActivo, nombreUsuario) {
        $('body').removeClass('rol-cliente rol-encargado rol-admin').addClass('rol-' + rolActivo);
        $('.permiso-encargado, .permiso-admin').hide();
        $('#hud-jugador').text(nombreUsuario + ' (' + rolActivo.toUpperCase() + ')');

        if (rolActivo === 'encargado') {
            detenerAutoRefreshAdmin();
            $('.permiso-encargado').show();
            cambiarVistaHUD('vista-encargado', '', 'Reservas');
        } else if (rolActivo === 'admin') {
            $('.permiso-encargado, .permiso-admin').show();
            cambiarVistaHUD('vista-bitacora', '', 'Actividad');
            iniciarAutoRefreshAdmin();
        } else {
            detenerAutoRefreshAdmin();
            $('.pwa-bottom-bar .solo-cliente, .pwa-side-rail .solo-cliente').css('display', '');
            cambiarVistaHUD('vista-lobby', '', 'Lobby');
            cargarPromocionCliente();
        }
        sincronizarEstadoEstaciones();
    }

    function verificarSesionInicial() {
        localStorage.removeItem('sesionRolLevelUp');
        try {
            var sesionGuardada = sessionStorage.getItem('sesionRolLevelUp');
            if (sesionGuardada) {
                sesionActual = JSON.parse(sesionGuardada);
                if (sesionActual && sesionActual.usuario && sesionActual.rol) {
                    aplicarPermisosRol(sesionActual.rol, sesionActual.usuario);
                    $('#pantalla-login').stop(true, true).hide();
                    return;
                }
            }
        } catch (errorSesion) {
            sessionStorage.removeItem('sesionRolLevelUp');
        }
        aplicarPermisosRol('cliente', 'Invitado');
        $('#pantalla-login').css('display', 'flex');
    }

    function construirOpcionesJuegos(claveConsola) {
        var juegosLista = catalogoJuegosConsola[claveConsola] || [];
        var arregloOpciones = [];
        for (var indiceJuego = 0; indiceJuego < juegosLista.length; indiceJuego++) {
            var opcionElemento = $('<option>').attr('value', juegosLista[indiceJuego]).text((indiceJuego + 1) + '. ' + juegosLista[indiceJuego]);
            arregloOpciones.push(opcionElemento);
        }
        return arregloOpciones;
    }

    // Semana 3 - Backend Supabase Estaciones
    function obtenerOcupacionLocalEstaciones() {
        try {
            var mapaRaw = localStorage.getItem('estacionesOcupadasLevelUp');
            var mapa = mapaRaw ? JSON.parse(mapaRaw) : {};
            return (mapa && typeof mapa === 'object') ? mapa : {};
        } catch (errorMapa) {
            return {};
        }
    }

    function guardarOcupacionLocalEstacion(codigoEstacion, clienteNombre, detalleTexto, idReserva) {
        var mapaActual = obtenerOcupacionLocalEstaciones();
        mapaActual[codigoEstacion] = {
            id: idReserva || (mapaActual[codigoEstacion] && mapaActual[codigoEstacion].id) || '',
            cliente: clienteNombre || 'Cliente',
            detalle: detalleTexto || 'Reserva activa',
            estado: 'ocupado'
        };
        localStorage.setItem('estacionesOcupadasLevelUp', JSON.stringify(mapaActual));
    }

    function eliminarOcupacionLocalEstacion(codigoEstacion) {
        var mapaActual = obtenerOcupacionLocalEstaciones();
        if (Object.prototype.hasOwnProperty.call(mapaActual, codigoEstacion)) {
            delete mapaActual[codigoEstacion];
            localStorage.setItem('estacionesOcupadasLevelUp', JSON.stringify(mapaActual));
        }
    }

    function restaurarEstacionDisponible($tarjeta) {
        var badgeDefault = $tarjeta.attr('data-badge-libre') || 'Libre';
        var textoBtnDefault = $tarjeta.attr('data-texto-btn') || 'Reservar';
        $tarjeta.removeClass('estado-uso estado-reservado').addClass('estado-disponible');
        $tarjeta.find('.badge-estado').text(badgeDefault);
        $tarjeta.find('.info-reserva-activa, .btn-liberar-estacion').remove();
        $tarjeta.find('.select-juego-estacion, .est-controles, .select-horas-estacion, .select-modo-arcade').show();
        $tarjeta.find('select, input').prop('disabled', false);
        $tarjeta.find('.btn-reservar-est, .btn-reservar-arcade')
            .prop('disabled', false)
            .removeClass('btn-estacion-ocupada')
            .text(textoBtnDefault);
    }

    function aplicarEstadoOcupadoEstacion($tarjeta, infoReserva, rolUsuario) {
        var codigoEst = $tarjeta.attr('data-estacion-id') || $tarjeta.attr('data-codigo');
        $tarjeta.removeClass('estado-disponible estado-reservado').addClass('estado-uso');
        $tarjeta.find('.badge-estado').text('RESERVADA');
        $tarjeta.find('.select-juego-estacion, .est-controles, .select-horas-estacion, .select-modo-arcade').hide();
        $tarjeta.find('.info-reserva-activa, .btn-liberar-estacion').remove();

        var $infoBox = $('<div>').addClass('info-reserva-activa');
        $infoBox.append(
            $('<strong>').text('Reservada por: ' + (infoReserva.cliente || 'Cliente')),
            $('<small>').text(infoReserva.detalle || 'Estacion en uso')
        );

        var $btnReserva = $tarjeta.find('.btn-reservar-est, .btn-reservar-arcade');
        $btnReserva.prop('disabled', true).addClass('btn-estacion-ocupada').text('Estacion Ocupada').before($infoBox);

        if (rolUsuario === 'encargado' || rolUsuario === 'admin') {
            var $btnLiberar = $('<button>')
                .attr('type', 'button')
                .addClass('btn-liberar-estacion')
                .attr('data-reserva-id', infoReserva.id || '')
                .attr('data-estacion-id', codigoEst)
                .text('Liberar Estacion');
            $btnReserva.after($btnLiberar);
        }
    }

    async function sincronizarEstadoEstaciones() {
        var mapaOcupadas = {};
        if (navigator.onLine && typeof obtenerEstacionesOcupadasNube === 'function') {
            var resOcupadas = await obtenerEstacionesOcupadasNube();
            if (resOcupadas.ok) {
                var mapaNube = {};
                for (var idxOcupada = 0; idxOcupada < resOcupadas.registros.length; idxOcupada++) {
                    var filaOcupada = resOcupadas.registros[idxOcupada];
                    var partesDetalle = String(filaOcupada.detalle_sala || '').split('|');
                    var codigoParsed = partesDetalle[0] ? partesDetalle[0].trim() : '';
                    if (codigoParsed) {
                        var textoDetalle = partesDetalle.slice(1).join('|').trim() || 'Reserva activa';
                        mapaNube[codigoParsed] = {
                            id: filaOcupada.id || '',
                            cliente: filaOcupada.cliente || 'Cliente',
                            detalle: textoDetalle,
                            estado: 'ocupado'
                        };
                    }
                }
                mapaOcupadas = Object.assign({}, obtenerOcupacionLocalEstaciones(), mapaNube);
                localStorage.setItem('estacionesOcupadasLevelUp', JSON.stringify(mapaOcupadas));
            } else {
                mapaOcupadas = obtenerOcupacionLocalEstaciones();
            }
        } else {
            mapaOcupadas = obtenerOcupacionLocalEstaciones();
        }

        var colaPendLista = obtenerColaSincronizacion();
        for (var idxCola = 0; idxCola < colaPendLista.length; idxCola++) {
            var regCola = colaPendLista[idxCola];
            var datosReg = regCola.payload || regCola;
            var estacionesPend = Array.isArray(datosReg.estaciones) ? datosReg.estaciones : [];
            for (var idxEstPend = 0; idxEstPend < estacionesPend.length; idxEstPend++) {
                var estPend = estacionesPend[idxEstPend];
                if (estPend && estPend.codigo) {
                    mapaOcupadas[estPend.codigo] = {
                        id: '',
                        cliente: datosReg.cliente || 'Cliente',
                        detalle: estPend.detalle || 'Pendiente de sincronizar',
                        estado: 'ocupado'
                    };
                }
            }
        }

        var rolActual = (sesionActual && sesionActual.rol) ? sesionActual.rol : 'cliente';
        $('.estacion[data-estacion-id]').each(function () {
            var $tarjetaEstacion = $(this);
            var codigoEst = $tarjetaEstacion.attr('data-estacion-id');
            if (mapaOcupadas[codigoEst]) {
                aplicarEstadoOcupadoEstacion($tarjetaEstacion, mapaOcupadas[codigoEst], rolActual);
            } else {
                restaurarEstacionDisponible($tarjetaEstacion);
            }
        });

        renderizarEstacionesOcupadasStaff(mapaOcupadas);
    }

    function renderizarEstacionesOcupadasStaff(mapaOcupadas) {
        var $listaEstStaff = $('#lista-estaciones-ocupadas-staff');
        if ($listaEstStaff.length === 0) return;
        $listaEstStaff.empty();
        var codigos = Object.keys(mapaOcupadas || {});
        if (codigos.length === 0) {
            $listaEstStaff.append($('<li>').addClass('item-gestion vacio-gestion').text('Todas las estaciones disponibles.'));
            return;
        }
        for (var idxCod = 0; idxCod < codigos.length; idxCod++) {
            var codigoEst = codigos[idxCod];
            var infoEst = mapaOcupadas[codigoEst];
            var $filaEst = $('<li>').addClass('item-gestion');
            $filaEst.append(
                $('<strong>').text(codigoEst + ' - ' + (infoEst.cliente || 'Cliente')),
                $('<span>').text(infoEst.detalle || 'Estacion en uso'),
                $('<button>')
                    .attr({ type: 'button', 'data-reserva-id': infoEst.id || '', 'data-estacion-id': codigoEst })
                    .addClass('btn-liberar-estacion')
                    .text('Liberar')
            );
            $listaEstStaff.append($filaEst);
        }
    }

    function inicializarEstacionesConsolas() {
        $('.grilla-estaciones-compacta[data-generar-consola]').each(function () {
            var $grillaActual = $(this);
            var claveConsola = $grillaActual.attr('data-generar-consola');
            var prefijoEstacion = $grillaActual.attr('data-prefijo');
            var precioHora = parseInt($grillaActual.attr('data-precio'), 10) || 15;
            $grillaActual.empty();

            for (var numeroEstacion = 1; numeroEstacion <= 10; numeroEstacion++) {
                var numeroFormateado = numeroEstacion < 10 ? '0' + numeroEstacion : '' + numeroEstacion;
                var codigoEstacion = prefijoEstacion + '-' + numeroFormateado;
                var textoBtnConsola = 'Reservar (' + precioHora + ' Bs/h)';
                var $tarjetaEstacion = $('<div>').addClass('estacion card-item estado-disponible').attr({
                    'data-tipo': 'consola',
                    'data-codigo': codigoEstacion,
                    'data-estacion-id': codigoEstacion,
                    'data-precio': precioHora,
                    'data-badge-libre': 'Libre',
                    'data-texto-btn': textoBtnConsola
                });
                var $cuerpo = $('<div>').addClass('card-item__cuerpo');
                var $filaSuperior = $('<div>').addClass('est-top').append($('<h4>').text(codigoEstacion), $('<span>').addClass('badge-estado').text('Libre'));

                var $selectJuego = $('<select>').addClass('select-juego-estacion');
                var opcionesJuego = construirOpcionesJuegos(claveConsola);
                for (var indiceOpc = 0; indiceOpc < opcionesJuego.length; indiceOpc++) {
                    $selectJuego.append(opcionesJuego[indiceOpc]);
                }

                var $filaControles = $('<div>').addClass('est-controles');
                var $selectControles = $('<select>').addClass('select-cant-controles');
                for (var cantControles = 1; cantControles <= 4; cantControles++) {
                    var textoControl = cantControles + (cantControles === 1 ? ' Ctrl' : ' Ctrls');
                    if (cantControles >= 3) {
                        textoControl += ' (+' + ((cantControles - 2) * 3) + ')';
                    }
                    $selectControles.append($('<option>').attr('value', cantControles).text(textoControl));
                }

                var $selectHoras = $('<select>').addClass('select-horas-estacion');
                $selectHoras.append(
                    $('<option>').attr('value', '1').text('1h'),
                    $('<option>').attr('value', '2').text('2h'),
                    $('<option>').attr('value', '3').text('3h'),
                    $('<option>').attr('value', '4').text('4h')
                );
                $filaControles.append($selectControles, $selectHoras);

                var $botonReservar = $('<button>').attr('type', 'button').addClass('btn-reservar-est').text(textoBtnConsola);
                $cuerpo.append($filaSuperior, $selectJuego, $filaControles, $botonReservar);
                $tarjetaEstacion.append($cuerpo);
                $grillaActual.append($tarjetaEstacion);
            }
        });
    }

    function inicializarEstacionesPC() {
        var $grillaPC = $('#grilla-20-pcs');
        $grillaPC.empty();
        var listaJuegosPC = ['Valorant', 'CS2', 'League of Legends', 'Dota 2', 'Fortnite', 'Apex Legends', 'Call of Duty Warzone', 'Overwatch 2'];

        for (var numeroPC = 1; numeroPC <= 20; numeroPC++) {
            var codigoPC = numeroPC < 10 ? 'PC-0' + numeroPC : 'PC-' + numeroPC;
            var gamaPC = 'media';
            var precioPC = 15;
            var specPC = 'RTX 4060 | 144Hz';

            if (numeroPC <= 6) {
                gamaPC = 'ultra';
                precioPC = 25;
                specPC = 'RTX 4080 | 240Hz';
            } else if (numeroPC <= 14) {
                gamaPC = 'alta';
                precioPC = 20;
                specPC = 'RTX 4070 | 165Hz';
            }

            var textoBtnPC = 'Ocupar (' + precioPC + ' Bs/h)';
            var badgePC = gamaPC.toUpperCase();
            var $tarjetaPC = $('<div>').addClass('estacion card-item estado-disponible').attr({
                'data-tipo': 'pc',
                'data-gama': gamaPC,
                'data-codigo': codigoPC,
                'data-estacion-id': codigoPC,
                'data-precio': precioPC,
                'data-badge-libre': badgePC,
                'data-texto-btn': textoBtnPC
            });
            var $cuerpoPC = $('<div>').addClass('card-item__cuerpo');
            var $topPC = $('<div>').addClass('est-top').append($('<h4>').text(codigoPC), $('<span>').addClass('badge-estado').text(badgePC));

            var $selectJuegoPC = $('<select>').addClass('select-juego-estacion');
            for (var idxJuegoPC = 0; idxJuegoPC < listaJuegosPC.length; idxJuegoPC++) {
                $selectJuegoPC.append($('<option>').attr('value', listaJuegosPC[idxJuegoPC]).text(listaJuegosPC[idxJuegoPC]));
            }

            var $selectHorasPC = $('<select>').addClass('select-horas-estacion');
            $selectHorasPC.append(
                $('<option>').attr('value', '1').text('1 Hora (' + precioPC + ' Bs)'),
                $('<option>').attr('value', '2').text('2 Horas (' + (precioPC * 2) + ' Bs)'),
                $('<option>').attr('value', '3').text('3 Horas (' + (precioPC * 3) + ' Bs)'),
                $('<option>').attr('value', '5').text('5 Horas (' + (precioPC * 5) + ' Bs)')
            );

            var $botonPC = $('<button>').attr('type', 'button').addClass('btn-reservar-est').text(textoBtnPC);
            $cuerpoPC.append($topPC, $('<small>').text(specPC), $selectJuegoPC, $selectHorasPC, $botonPC);
            $tarjetaPC.append($cuerpoPC);
            $grillaPC.append($tarjetaPC);
        }
    }

    function inicializarEstacionesArcades() {
        var $grillaArcade = $('#grilla-25-arcades');
        $grillaArcade.empty();

        for (var idxArc = 0; idxArc < lista25Arcades.length; idxArc++) {
            var numArc = idxArc + 1;
            var codigoArcade = numArc < 10 ? 'ARC-0' + numArc : 'ARC-' + numArc;
            var tituloJuegoArcade = lista25Arcades[idxArc];

            var $tarjetaArc = $('<div>').addClass('estacion card-item estado-disponible').attr({
                'data-tipo': 'arcade',
                'data-codigo': codigoArcade,
                'data-estacion-id': codigoArcade,
                'data-juego': tituloJuegoArcade,
                'data-badge-libre': 'Libre',
                'data-texto-btn': 'Reservar Arcade'
            });
            var $cuerpoArc = $('<div>').addClass('card-item__cuerpo');
            var $topArc = $('<div>').addClass('est-top').append($('<h4>').text(codigoArcade), $('<span>').addClass('badge-estado').text('Libre'));

            var $selectModalidadArc = $('<select>').addClass('select-modo-arcade').append(
                $('<option>').attr({ value: 'hora', 'data-precio': '10' }).text('Por Hora (10 Bs)'),
                $('<option>').attr({ value: 'fichas5', 'data-precio': '10' }).text('5 Fichas (10 Bs)'),
                $('<option>').attr({ value: 'fichas1', 'data-precio': '2' }).text('1 Ficha (2 Bs)')
            );

            var $botonArc = $('<button>').attr('type', 'button').addClass('btn-reservar-arcade').text('Reservar Arcade');
            $cuerpoArc.append($topArc, $('<small>').text(tituloJuegoArcade), $selectModalidadArc, $botonArc);
            $tarjetaArc.append($cuerpoArc);
            $grillaArcade.append($tarjetaArc);
        }
    }

    // Semana 3 - Sanitizacion DOMPurify y Anti-XSS
    function renderizarContenidoSeguro(selectorContenedor, htmlDinamico) {
        var htmlLimpio = (typeof DOMPurify !== 'undefined') ? DOMPurify.sanitize(htmlDinamico) : '';
        if (htmlLimpio) {
            $(selectorContenedor).html(htmlLimpio);
        } else {
            $(selectorContenedor).text('');
        }
    }

    function renderizarTarjetasSnacks(listaProductos) {
        var contenedorSnacks = $('.grilla-snacks');
        var svgRespaldoSnack = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'%3E%3Crect width='320' height='180' rx='12' fill='%2312172a'/%3E%3Crect x='110' y='52' width='100' height='76' rx='16' fill='none' stroke='%2300f3ff' stroke-width='4'/%3E%3Ccircle cx='160' cy='90' r='18' fill='none' stroke='%23ff00ea' stroke-width='4'/%3E%3Ctext x='160' y='155' text-anchor='middle' fill='%2300f3ff' font-family='sans-serif' font-size='14'%3ESNACK LEVELUP%3C/text%3E%3C/svg%3E";
        contenedorSnacks.empty();
        $.each(listaProductos, function (indiceSnack, snackItem) {
            var nombreSnack = String(snackItem.nombre || '');
            var categoriaSnack = String(snackItem.categoria || '');
            var descripcionSnack = String(snackItem.descripcion || '');
            var precioSnack = Number(snackItem.precio || 0);
            var rutaImagen = String(snackItem.imagen || 'icons/icon-192.png');

            var tarjetaArticulo = $('<article>')
                .addClass('card-snack card-item')
                .attr('data-categoria', categoriaSnack)
                .attr('data-nombre', nombreSnack)
                .attr('data-precio', precioSnack);

            var cuerpoTarjeta = $('<div>').addClass('card-item__cuerpo');
            var etiquetaCategoria = $('<span>')
                .addClass('tag-snack card-item__etiqueta')
                .text(categoriaSnack.toUpperCase());

            var imagenSnack = $('<img>')
                .addClass('img-snack-dinamica card-item__imagen')
                .attr('src', rutaImagen)
                .attr('srcset', rutaImagen + ' 150w, ' + rutaImagen + ' 600w, ' + rutaImagen + ' 1080w')
                .attr('sizes', '(max-width: 600px) 150px, 600px')
                .attr('loading', 'lazy')
                .attr('alt', nombreSnack || 'Snack LevelUp')
                .attr('width', '320')
                .attr('height', '180')
                .on('error', function () {
                    var nodoImagen = $(this);
                    if (nodoImagen.attr('data-fallback-aplicado') === '1') {
                        return;
                    }
                    nodoImagen
                        .attr('data-fallback-aplicado', '1')
                        .attr('srcset', svgRespaldoSnack)
                        .attr('src', svgRespaldoSnack);
                });

            var tituloSnack = $('<h4>').addClass('card-item__titulo').text(nombreSnack);
            var textoDescripcion = $('<p>').addClass('card-item__descripcion').text(descripcionSnack);
            var bloquePrecio = $('<div>').addClass('precio-snack card-item__precio').text(precioSnack + ' Bs');
            var botonAgregar = $('<button>')
                .attr('type', 'button')
                .addClass('btn-pedir-snack')
                .text('Agregar al Pedido');

            cuerpoTarjeta.append(etiquetaCategoria, imagenSnack, tituloSnack, textoDescripcion, bloquePrecio, botonAgregar);
            tarjetaArticulo.append(cuerpoTarjeta);
            contenedorSnacks.append(tarjetaArticulo);
        });
    }

    function agregarConsultaPanelEncargadoDOM(nombreRemitente, correoRemitente, textoConsulta) {
        var $listaConsultas = $('#lista-consultas-encargado');
        if ($listaConsultas.find('.vacio-gestion').length > 0) {
            $listaConsultas.empty();
        }
        var $itemConsulta = $('<li>').addClass('item-gestion');
        var tituloRemitente = correoRemitente ? (nombreRemitente + ' (' + correoRemitente + ')') : nombreRemitente;
        var $autorTexto = $('<strong>').text(tituloRemitente);
        var $mensajeTexto = $('<p>').text(textoConsulta);
        var $cajaRespuesta = $('<div>').addClass('respuesta-encargado-box');
        var $inputRespuesta = $('<input>').attr('type', 'text').attr('placeholder', 'Escribir respuesta al cliente...').addClass('input-respuesta-encargado');
        var $botonResponder = $('<button>').attr('type', 'button').addClass('btn-responder-consulta').text('Enviar Respuesta');
        var $salidaRespuesta = $('<span>').addClass('texto-respuesta-emitida');
        $cajaRespuesta.append($inputRespuesta, $botonResponder, $salidaRespuesta);
        $itemConsulta.append($autorTexto, $mensajeTexto, $cajaRespuesta);
        $listaConsultas.prepend($itemConsulta);
    }

    // Semana 3 - Backend Supabase
    async function cargarDatosInicialesNube() {
        if (!navigator.onLine || typeof listarRegistrosProyecto !== 'function') {
            return;
        }
        var resReservas = await listarRegistrosProyecto('reservas');
        if (resReservas.ok && resReservas.registros.length > 0) {
            for (var idxReserva = resReservas.registros.length - 1; idxReserva >= 0; idxReserva--) {
                var filaReserva = resReservas.registros[idxReserva];
                var $itemRes = $('<li>').addClass('item-reserva');
                $itemRes.append(
                    $('<strong>').text((filaReserva.cliente || 'Cliente') + ' - '),
                    $('<span>').text(filaReserva.detalle_sala || '')
                );
                $('#listaReservas').prepend($itemRes);
            }
        }

        var resPedidos = await listarRegistrosProyecto('pedidos');
        if (resPedidos.ok && resPedidos.registros.length > 0) {
            for (var idxPedido = resPedidos.registros.length - 1; idxPedido >= 0; idxPedido--) {
                var filaPedido = resPedidos.registros[idxPedido];
                agregarReservaParaEncargado(
                    filaPedido.cliente || 'Cliente',
                    filaPedido.modalidad || 'Reserva',
                    Number(filaPedido.monto_total || 0),
                    Array.isArray(filaPedido.items) ? filaPedido.items : []
                );
            }
        }

        var resConsultas = await listarRegistrosProyecto('consultas');
        if (resConsultas.ok && resConsultas.registros.length > 0) {
            for (var idxConsulta = resConsultas.registros.length - 1; idxConsulta >= 0; idxConsulta--) {
                var filaConsulta = resConsultas.registros[idxConsulta];
                agregarConsultaPanelEncargadoDOM(filaConsulta.cliente || 'Cliente', '', filaConsulta.mensaje || '');
            }
        }

        var resProductos = await listarRegistrosProyecto('productos_extra');
        if (resProductos.ok && resProductos.registros.length > 0) {
            for (var idxProd = 0; idxProd < resProductos.registros.length; idxProd++) {
                var filaProd = resProductos.registros[idxProd];
                listaSnacksGlobal.unshift({
                    nombre: filaProd.nombre || 'Producto Nube',
                    categoria: filaProd.categoria || 'combo',
                    precio: Number(filaProd.precio || 15),
                    descripcion: 'Producto sincronizado desde Supabase.',
                    imagen: filaProd.imagen || 'icons/icon-192.png'
                });
            }
            renderizarTarjetasSnacks(listaSnacksGlobal);
        }
    }

    // Semana 2 - Fetch Lazy Loading y Respaldo SVG
    function cargarCatalogoSnacks() {
        fetch('../data/snacks.json')
            .then(function (respuestaServidor) {
                if (!respuestaServidor.ok) {
                    throw new Error('Error HTTP en snacks.json: ' + respuestaServidor.status);
                }
                return respuestaServidor.json();
            })
            .then(function (datosSnacks) {
                listaSnacksGlobal = datosSnacks;
                renderizarTarjetasSnacks(listaSnacksGlobal);
                cargarDatosInicialesNube();
                registrarEvento('FETCH ASYNC', 'Catalogo de ' + listaSnacksGlobal.length + ' snacks cargado con Lazy Loading');
            })
            .catch(function (errorCarga) {
                registrarEvento('ERROR ASYNC', 'No se pudo cargar snacks.json: ' + errorCarga.message);
            });
    }

    function actualizarFondoHUD(temaNombre) {
        $('body').removeClass(clasesFondo);
        if (temaNombre && temaNombre !== '') {
            $('body').addClass('bg-' + temaNombre);
        }
    }

    function actualizarTotalVisual(nuevoMonto) {
        totalPagar = Math.max(0, nuevoMonto);
        $('#hud-total').stop(true, true).animate({ opacity: 0.3 }, 110).text(totalPagar).animate({ opacity: 1 }, 190);
        $('#lobby-total-texto').stop(true, true).animate({ opacity: 0.3 }, 110).text(totalPagar + ' Bs').animate({ opacity: 1 }, 190);
        $('#modal-total').text(totalPagar);
        $('#hud-items').text(totalItems);
    }

    function cambiarVistaHUD(idVista, temaAsociado, tituloZona) {
        var rolUsuario = (sesionActual && sesionActual.rol) ? sesionActual.rol : 'cliente';
        var vistasGestion = ['vista-encargado', 'vista-pedidos-gestion', 'vista-promos', 'vista-catalogo-gestion'];

        if (vistasGestion.indexOf(idVista) !== -1 && rolUsuario === 'cliente') {
            mostrarToast('ACCESO RESTRINGIDO', 'Vista exclusiva para Encargado o Administrador.', true);
            return;
        }
        if (idVista === 'vista-bitacora' && rolUsuario !== 'admin') {
            mostrarToast('ACCESO RESTRINGIDO', 'Control Total exclusivo para Administrador.', true);
            return;
        }

        $('.vista-hud').removeClass('vista-activa').css('display', '');
        $('#' + idVista).addClass('vista-activa').css('display', '');
        $('.tab-tactil, .tab-rol').removeClass('activo');
        $('.tab-tactil[data-vista="' + idVista + '"], .tab-rol[data-vista="' + idVista + '"]').addClass('activo');

        if (idVista === 'vista-bitacora') {
            actualizarMetricasAdmin();
            cargarPanelAdminEjecutivo();
        } else if (idVista === 'vista-encargado') {
            cargarReservasStaff();
        } else if (idVista === 'vista-pedidos-gestion') {
            cargarPedidosGestion();
        } else if (idVista === 'vista-promos') {
            cargarPromocionCliente();
        } else if (idVista === 'vista-catalogo-gestion') {
            cargarDatosInicialesNube();
        }

        if (temaAsociado !== undefined) {
            actualizarFondoHUD(temaAsociado);
        }
        if (tituloZona) {
            $('#indicador-tema').text(tituloZona);
        }
        if (idVista === 'vista-snacks') {
            $('#btn-cerrar-buscador').trigger('click');
        }
        registrarEvento('NAVEGACION HUD', 'Vista activa: ' + (tituloZona || idVista));
    }

    // Semana 3 - Promociones Express Gestionables
    function obtenerPromocionLocalRespaldo() {
        try {
            var promoRaw = localStorage.getItem('promocionActivaLevelUp');
            if (promoRaw) {
                var parsed = JSON.parse(promoRaw);
                if (parsed && parsed.titulo) return parsed;
            }
        } catch (errorPromo) {
        }
        return {
            titulo: 'PS5 (2h + 4 Controles) + Pizza Familiar',
            descripcion: 'Disfruta PlayStation 5 para 4 jugadores con Pizza Familiar recien horneada.',
            precio: 45,
            texto_boton: 'Reclamar Promo (45 Bs)',
            activa: true,
            expira_en: new Date(Date.now() + 600000).toISOString()
        };
    }

    function guardarPromocionLocalRespaldo(datosPromo) {
        localStorage.setItem('promocionActivaLevelUp', JSON.stringify(datosPromo));
    }

    function actualizarVistaPromoCliente(datosPromo) {
        promocionActivaActual = datosPromo;
        var tituloPromo = String(datosPromo.titulo || 'Promocion LevelUp');
        var descPromo = String(datosPromo.descripcion || 'Promocion especial en barra gamer.');
        var precioPromo = parseInt(datosPromo.precio, 10) || 45;
        var botonPromo = String(datosPromo.texto_boton || ('Reclamar Promo (' + precioPromo + ' Bs)'));
        var promoActivaFlag = datosPromo.activa !== false;

        $('#promo-lobby-titulo').text(tituloPromo);
        $('#promo-lobby-desc').text(descPromo);
        if (!promoReclamada) {
            $('#btn-reclamar-promo').attr({ 'data-nombre': tituloPromo, 'data-precio': precioPromo }).text(botonPromo);
        }

        $('#promo-preview-badge').text(promoActivaFlag ? 'ACTIVA EN LOBBY' : 'PAUSADA POR STAFF');
        $('#promo-preview-titulo').text(tituloPromo);
        $('#promo-preview-desc').text(descPromo);
        $('#promo-preview-precio').text('Precio: ' + precioPromo + ' Bs');

        if ($('#promo-edit-titulo').length > 0 && !$('#promo-edit-titulo').is(':focus')) {
            $('#promo-edit-titulo').val(tituloPromo);
            $('#promo-edit-desc').val(descPromo);
            $('#promo-edit-precio').val(precioPromo);
            $('#promo-edit-boton').val(botonPromo);
            $('#promo-edit-estado').val(promoActivaFlag ? 'activa' : 'pausada');
        }

        iniciarRelojPromoDinamico(datosPromo.expira_en, promoActivaFlag);
    }

    function iniciarRelojPromoDinamico(fechaExpiraIso, promoActivaFlag) {
        if (intervaloPromo10m !== null) {
            clearInterval(intervaloPromo10m);
            intervaloPromo10m = null;
        }
        var expiraMs = fechaExpiraIso ? new Date(fechaExpiraIso).getTime() : (Date.now() + 600000);
        if (isNaN(expiraMs)) expiraMs = Date.now() + 600000;

        function actualizarTickPromo() {
            if (!promoActivaFlag) {
                segundosPromo10m = 0;
                promoExpirada = true;
                $('#timer-oferta-10m').text('PAUSADA');
                $('#estado-promo-badge').text('OFERTA PAUSADA');
                $('#promo-preview-expira').text('Estado: Pausada');
                $('#btn-reclamar-promo').hide();
                return false;
            }
            segundosPromo10m = Math.max(0, Math.floor((expiraMs - Date.now()) / 1000));
            var min = Math.floor(segundosPromo10m / 60);
            var seg = segundosPromo10m % 60;
            var textoClock = (min < 10 ? '0' + min : min) + ':' + (seg < 10 ? '0' + seg : seg);

            if (segundosPromo10m > 0) {
                promoExpirada = false;
                $('#timer-oferta-10m').text(textoClock);
                $('#estado-promo-badge').text('OFERTA RELAMPAGO');
                $('#promo-preview-expira').text('Expira en: ' + textoClock);
                $('#btn-reclamar-promo').show();
                return true;
            } else {
                promoExpirada = true;
                $('#timer-oferta-10m').text('00:00');
                $('#estado-promo-badge').text('OFERTA EXPIRADA');
                $('#promo-preview-expira').text('Estado: Expirada');
                $('#btn-reclamar-promo').hide();
                return false;
            }
        }

        if (actualizarTickPromo()) {
            intervaloPromo10m = setInterval(function () {
                if (!actualizarTickPromo()) {
                    clearInterval(intervaloPromo10m);
                    intervaloPromo10m = null;
                    registrarEvento('SISTEMA OFERTA', 'La promocion express expiro.');
                }
            }, 1000);
        }
    }

    async function cargarPromocionCliente() {
        var promoElegida = obtenerPromocionLocalRespaldo();
        if (navigator.onLine && typeof obtenerPromocionActivaNube === 'function') {
            var resPromo = await obtenerPromocionActivaNube();
            if (resPromo.ok && resPromo.promocion) {
                promoElegida = resPromo.promocion;
                guardarPromocionLocalRespaldo(promoElegida);
            }
        }
        actualizarVistaPromoCliente(promoElegida);
    }

    // Semana 3 - Monitor en Vivo de Actividad de Clientes
    async function registrarActividadCliente(tipoAccion, detalleAccion, nombreForzado) {
        var rolAct = (sesionActual && sesionActual.rol) ? sesionActual.rol : 'cliente';
        if (!nombreForzado && rolAct !== 'cliente') return;
        var clienteNombre = nombreForzado || (sesionActual ? sesionActual.usuario : 'Invitado');
        if (navigator.onLine && typeof registrarActividadClienteNube === 'function') {
            var resAct = await registrarActividadClienteNube(clienteNombre, tipoAccion, detalleAccion);
            if (resAct && resAct.ok) return;
        }
        encolarOperacionOfflineFIFO('actividad', {
            cliente: clienteNombre,
            accion: tipoAccion,
            detalle: detalleAccion
        });
    }

    function renderizarFeedActividadFiltrado() {
        var $listaFeed = $('#lista-actividad-clientes');
        if ($listaFeed.length === 0) return;
        var filtroTipo = $('#filtro-tipo-actividad').val() || 'TODOS';
        var filtroCliente = ($('#filtro-cliente-actividad').val() || '').toLowerCase().trim();
        $listaFeed.empty();

        var filtrados = listaActividadCache.filter(function (registroItem) {
            var coincideTipo = (!filtroTipo || String(filtroTipo).toUpperCase() === 'TODOS') || (String(registroItem.accion || '') === filtroTipo);
            var nombreCliente = String(registroItem.cliente || '').toLowerCase();
            var detalleTexto = String(registroItem.detalle || '').toLowerCase();
            var coincideCliente = !filtroCliente || nombreCliente.indexOf(filtroCliente) !== -1 || detalleTexto.indexOf(filtroCliente) !== -1;
            return coincideTipo && coincideCliente;
        });

        if (filtrados.length === 0) {
            $listaFeed.append($('<li>').addClass('item-gestion vacio-gestion').text('Sin eventos registrados para el filtro seleccionado.'));
            return;
        }

        for (var idxAct = 0; idxAct < filtrados.length; idxAct++) {
            var filaAct = filtrados[idxAct];
            var fechaFmt = filaAct.creado_en ? new Date(filaAct.creado_en).toLocaleTimeString() : 'Reciente';
            var $nodoAct = $('<li>').addClass('item-actividad-fila');
            var $topAct = $('<div>').addClass('actividad-meta-top').append(
                $('<strong>').text(filaAct.cliente || 'Cliente'),
                $('<span>').addClass('badge-accion-actividad').text(filaAct.accion || 'EVENTO'),
                $('<span>').text(fechaFmt)
            );
            $nodoAct.append($topAct, $('<span>').text(filaAct.detalle || ''));
            $listaFeed.append($nodoAct);
        }
    }

    async function cargarPanelAdminEjecutivo() {
        if (!sesionActual || sesionActual.rol !== 'admin' || !navigator.onLine) return;

        var promCuentas = listarRegistrosProyecto('cuentas');
        var promReservas = listarRegistrosProyecto('reservas');
        var promPedidos = listarRegistrosProyecto('pedidos');
        var promActividad = typeof obtenerActividadClientesNube === 'function' ? obtenerActividadClientesNube() : Promise.resolve({ ok: false, registros: [] });

        var resultados = await Promise.all([promCuentas, promReservas, promPedidos, promActividad]);
        var resCuentas = resultados[0];
        var resReservas = resultados[1];
        var resPedidos = resultados[2];
        var resActividad = resultados[3];

        if (resCuentas.ok) {
            var clientesSolo = resCuentas.registros.filter(function (cuentaItem) {
                return (cuentaItem.rol || 'cliente') === 'cliente';
            });
            $('#kpi-clientes-total').text(clientesSolo.length);
        }
        if (resReservas.ok) {
            var activasRes = resReservas.registros.filter(function (resItem) {
                return (resItem.estado || 'activa') !== 'liberada';
            });
            $('#kpi-reservas-activas').text(activasRes.length);
        }
        if (resPedidos.ok) {
            var totalIngresos = 0;
            for (var idxIng = 0; idxIng < resPedidos.registros.length; idxIng++) {
                totalIngresos += Number(resPedidos.registros[idxIng].monto_total || 0);
            }
            $('#kpi-pedidos-total').text(resPedidos.registros.length);
            $('#kpi-ingresos-total').text(totalIngresos + ' Bs');
        }
        if (resActividad.ok) {
            listaActividadCache = Array.isArray(resActividad.registros) ? resActividad.registros : [];
            renderizarFeedActividadFiltrado();
        }
    }

    async function cargarReservasStaff() {
        await sincronizarEstadoEstaciones();
        if (!navigator.onLine || typeof listarRegistrosProyecto !== 'function') return;
        var resReservas = await listarRegistrosProyecto('reservas');
        var $listaResStaff = $('#lista-reservas-encargado');
        if ($listaResStaff.length === 0 || !resReservas.ok) return;
        $listaResStaff.empty();
        if (resReservas.registros.length === 0) {
            $listaResStaff.append($('<li>').addClass('item-gestion vacio-gestion').text('Sin reservas recientes.'));
            return;
        }
        for (var idxResS = 0; idxResS < resReservas.registros.length; idxResS++) {
            var filaResS = resReservas.registros[idxResS];
            var $itemResS = $('<li>').addClass('item-gestion');
            $itemResS.append(
                $('<strong>').text('Cliente: ' + (filaResS.cliente || 'Cliente')),
                $('<span>').text(filaResS.detalle_sala || ''),
                $('<span>').addClass('badge-estado').text('Estado: ' + (filaResS.estado || 'activa'))
            );
            $listaResStaff.append($itemResS);
        }
    }

    async function cargarPedidosGestion() {
        if (!navigator.onLine || typeof listarRegistrosProyecto !== 'function') return;
        var resPedidos = await listarRegistrosProyecto('pedidos');
        var $listaPed = $('#lista-pedidos-gestion');
        if ($listaPed.length === 0 || !resPedidos.ok) return;
        $listaPed.empty();
        if (resPedidos.registros.length === 0) {
            $listaPed.append($('<li>').addClass('item-gestion vacio-gestion').text('Sin pedidos registrados en la nube.'));
            return;
        }
        for (var idxPedG = 0; idxPedG < resPedidos.registros.length; idxPedG++) {
            var filaPedG = resPedidos.registros[idxPedG];
            var itemsPed = Array.isArray(filaPedG.items) ? filaPedG.items.join(' | ') : '';
            var estadoPed = String(filaPedG.estado || 'pendiente');
            var $itemPed = $('<li>').addClass('item-gestion');
            $itemPed.append(
                $('<strong>').text((filaPedG.cliente || 'Cliente') + ' - ' + (filaPedG.monto_total || 0) + ' Bs'),
                $('<span>').text(itemsPed || 'Pedido general'),
                $('<span>').text((filaPedG.modalidad || 'Local') + ' | ' + (filaPedG.forma_pago || 'Efectivo'))
            );
            if (estadoPed === 'entregado') {
                $itemPed.append($('<span>').addClass('badge-entregado').text('ENTREGADO'));
            } else {
                $itemPed.append(
                    $('<button>')
                        .attr({ type: 'button', 'data-pedido-id': filaPedG.id || '' })
                        .addClass('btn-entregar-pedido')
                        .text('Marcar Entregado')
                );
            }
            $listaPed.append($itemPed);
        }
    }

    function agregarItemCarrito(nombreProducto, precioUnitario, cantidadItems, codigoEstacion, detalleEstacion) {
        if ($('#lista-carrito .carrito-vacio').length > 0) {
            $('#lista-carrito').empty();
        }
        var subtotalCalculado = precioUnitario * cantidadItems;
        totalItems += 1;

        var $itemLista = $('<li>').addClass('item-carrito-li').attr({
            'data-subtotal': subtotalCalculado,
            'data-nombre': nombreProducto
        });
        if (codigoEstacion) {
            $itemLista.attr({
                'data-estacion-id': codigoEstacion,
                'data-detalle-estacion': detalleEstacion || nombreProducto
            });
        }
        var $spanTexto = $('<span>').addClass('item-carrito-txt').text(nombreProducto);
        var $grupoDerecho = $('<div>').addClass('item-carrito-acciones');
        var $spanSubtotal = $('<span>').addClass('item-carrito-precio').text(subtotalCalculado + ' Bs');
        var $botonQuitar = $('<button>').attr({ type: 'button', 'aria-label': 'Quitar item' }).addClass('btn-quitar-item').text('X');

        $grupoDerecho.append($spanSubtotal, $botonQuitar);
        $itemLista.append($spanTexto, $grupoDerecho);
        $('#lista-carrito').append($itemLista);

        actualizarTotalVisual(totalPagar + subtotalCalculado);
        registrarEvento('PEDIDO AGREGADO', nombreProducto + ' (+' + subtotalCalculado + ' Bs)');
        mostrarToast('ITEM AGREGADO', nombreProducto + ' agregado (' + subtotalCalculado + ' Bs).', false);
    }

    function agregarReservaParaEncargado(clienteNombre, modalidadPedido, totalMonto, resumenItems) {
        var indiceReserva = reservasActivas.length + 1;
        reservasActivas.push({
            cliente: clienteNombre,
            modalidad: modalidadPedido,
            total: totalMonto,
            resumen: resumenItems,
            estado: 'Pendiente'
        });

        var $listaReservas = $('#lista-reservas-encargado');
        if ($listaReservas.find('.vacio-gestion').length > 0) {
            $listaReservas.empty();
        }
        var $itemReserva = $('<li>').addClass('item-gestion').attr('data-reserva-id', indiceReserva);
        var $detalleReserva = $('<span>').text('#' + indiceReserva + ' - ' + clienteNombre + ' (' + totalMonto + ' Bs) [' + modalidadPedido + ']');
        var $botonAprobar = $('<button>').addClass('btn-aprobar-reserva').text('Aprobar Reserva');
        $itemReserva.append($detalleReserva, $botonAprobar);
        $listaReservas.prepend($itemReserva);
        actualizarMetricasAdmin();
    }

    // Semana 2 - Arquitectura PWA Offline-First FIFO
    async function sincronizarColaPendiente() {
        if (sincronizacionFifoActiva || !navigator.onLine) return;
        var colaPendiente = obtenerColaSincronizacion();
        if (colaPendiente.length === 0) return;

        sincronizacionFifoActiva = true;
        var cantidadSincronizada = 0;

        try {
            while (colaPendiente.length > 0 && navigator.onLine) {
                var registroActual = colaPendiente.shift();
                var tipoOperacion = registroActual.tipo || 'pedido';
                var datosOperacion = registroActual.payload || registroActual;

                if (tipoOperacion === 'pedido') {
                    var nombreTitular = datosOperacion.cliente || datosOperacion.nombre || 'Cliente';
                    var importeTotal = datosOperacion.montoTotal || datosOperacion.total || 0;
                    if (typeof guardarPedidoNube === 'function') {
                        await guardarPedidoNube({
                            cliente: nombreTitular,
                            modalidad: datosOperacion.modalidad || 'Reserva',
                            formaPago: datosOperacion.formaPago || 'Efectivo',
                            montoTotal: importeTotal,
                            items: datosOperacion.items || []
                        });
                    }
                    if (Array.isArray(datosOperacion.estaciones) && typeof reservarEstacionNube === 'function') {
                        for (var idxSyncEst = 0; idxSyncEst < datosOperacion.estaciones.length; idxSyncEst++) {
                            var estSync = datosOperacion.estaciones[idxSyncEst];
                            if (estSync && estSync.codigo) {
                                await reservarEstacionNube(estSync.codigo, nombreTitular, estSync.detalle || 'Reserva FIFO');
                            }
                        }
                    }
                    agregarReservaParaEncargado(nombreTitular, datosOperacion.modalidad || 'Local', importeTotal, datosOperacion.items || []);
                } else if (tipoOperacion === 'reserva' && typeof guardarReservaNube === 'function') {
                    await guardarReservaNube(datosOperacion.cliente, datosOperacion.sala);
                } else if (tipoOperacion === 'consulta' && typeof guardarConsultaNube === 'function') {
                    await guardarConsultaNube(datosOperacion.cliente, datosOperacion.mensaje);
                } else if (tipoOperacion === 'producto' && typeof guardarProductoExtraNube === 'function') {
                    await guardarProductoExtraNube(datosOperacion.nombre, datosOperacion.categoria, datosOperacion.precio, datosOperacion.imagen);
                } else if (tipoOperacion === 'promocion' && typeof guardarPromocionNube === 'function') {
                    await guardarPromocionNube(datosOperacion);
                } else if (tipoOperacion === 'cuenta' && typeof registrarCuentaNube === 'function') {
                    await registrarCuentaNube(datosOperacion.usuario, datosOperacion.clave, datosOperacion.rol || 'cliente');
                } else if (tipoOperacion === 'actividad' && typeof registrarActividadClienteNube === 'function') {
                    await registrarActividadClienteNube(datosOperacion.cliente, datosOperacion.accion, datosOperacion.detalle);
                }

                cantidadSincronizada++;
                registrarEvento('SYNC FIFO ONLINE', 'Operacion [' + tipoOperacion.toUpperCase() + '] sincronizada.');
            }

            if (colaPendiente.length === 0) {
                localStorage.removeItem('colaSincronizacionCiber');
            } else {
                localStorage.setItem('colaSincronizacionCiber', JSON.stringify(colaPendiente));
            }
            actualizarMetricasAdmin();
            await sincronizarEstadoEstaciones();
            if (sesionActual && sesionActual.rol === 'admin') {
                await cargarPanelAdminEjecutivo();
            }
            if (cantidadSincronizada > 0) {
                mostrarToast('CONEXION RESTAURADA', 'Se sincronizaron ' + cantidadSincronizada + ' operaciones pendientes FIFO.', false);
            }
        } finally {
            sincronizacionFifoActiva = false;
        }
    }

    function cambiarPestanaAuth(panelObjetivo) {
        $('#login-error, #registro-error').hide().text('');
        $('.btn-tab-auth').removeClass('activo');
        $('.btn-tab-auth[data-auth-panel="' + panelObjetivo + '"]').addClass('activo');
        $('.auth-panel').removeClass('activo').hide();
        $('#' + panelObjetivo).addClass('activo').css('display', 'flex');
    }

    function guardarCuentaLocalRespaldo(nombreUsuario, claveAcceso, rolUsuario) {
        var listaCuentas = [];
        try {
            var rawCuentas = localStorage.getItem('cuentasLocalesLevelUp');
            listaCuentas = rawCuentas ? JSON.parse(rawCuentas) : [];
            if (!Array.isArray(listaCuentas)) listaCuentas = [];
        } catch (errorCuentas) {
            listaCuentas = [];
        }
        var existeIndex = -1;
        for (var idxCuenta = 0; idxCuenta < listaCuentas.length; idxCuenta++) {
            if (String(listaCuentas[idxCuenta].usuario || '').toLowerCase() === nombreUsuario.toLowerCase()) {
                existeIndex = idxCuenta;
                break;
            }
        }
        var registroCuenta = { usuario: nombreUsuario, clave: claveAcceso, rol: rolUsuario };
        if (existeIndex >= 0) {
            listaCuentas[existeIndex] = registroCuenta;
        } else {
            listaCuentas.push(registroCuenta);
        }
        localStorage.setItem('cuentasLocalesLevelUp', JSON.stringify(listaCuentas));
    }

    function validarCuentaRespaldo(nombreUsuario, claveAcceso) {
        var usuarioNorm = nombreUsuario.toLowerCase();
        var cuentasSistema = {
            cliente: { usuario: 'cliente', clave: '1234', rol: 'cliente' },
            encargado: { usuario: 'encargado', clave: '1234', rol: 'encargado' },
            admin: { usuario: 'admin', clave: '1234', rol: 'admin' }
        };
        if (cuentasSistema[usuarioNorm] && cuentasSistema[usuarioNorm].clave === claveAcceso) {
            return { usuario: cuentasSistema[usuarioNorm].usuario, rol: cuentasSistema[usuarioNorm].rol };
        }
        try {
            var rawLocales = localStorage.getItem('cuentasLocalesLevelUp');
            var locales = rawLocales ? JSON.parse(rawLocales) : [];
            if (Array.isArray(locales)) {
                for (var idxLoc = 0; idxLoc < locales.length; idxLoc++) {
                    var filaLoc = locales[idxLoc];
                    if (String(filaLoc.usuario || '').toLowerCase() === usuarioNorm && filaLoc.clave === claveAcceso) {
                        return { usuario: filaLoc.usuario, rol: filaLoc.rol || 'cliente' };
                    }
                }
            }
        } catch (errorLoc) {
            return null;
        }
        return null;
    }

    $(document).off('click', '.btn-tab-auth, .btn-link-auth').on('click', '.btn-tab-auth, .btn-link-auth', function () {
        cambiarPestanaAuth($(this).attr('data-auth-panel'));
    });

    $(document).off('click', '.btn-toggle-clave').on('click', '.btn-toggle-clave', function () {
        var $botonToggle = $(this);
        var idCampo = $botonToggle.attr('data-target');
        var $campoInput = $('#' + idCampo);
        if ($campoInput.length === 0) return;
        var esPassword = $campoInput.attr('type') === 'password';
        $campoInput.attr('type', esPassword ? 'text' : 'password');
        $botonToggle.text(esPassword ? 'Ocultar' : 'Ver');
    });

    $(document).off('click', '.btn-demo-rol').on('click', '.btn-demo-rol', function () {
        var rolElegido = $(this).attr('data-rol') || 'cliente';
        var usuarioDemo = $(this).attr('data-usuario') || 'Invitado';
        sesionActual = { usuario: usuarioDemo, rol: rolElegido };
        sessionStorage.setItem('sesionRolLevelUp', JSON.stringify(sesionActual));
        $('#login-error, #registro-error').hide().text('');
        $('.acceso-demo').removeAttr('open');
        aplicarPermisosRol(rolElegido, usuarioDemo);
        $('#pantalla-login').stop(true, true).hide();
        if (rolElegido === 'cliente') {
            registrarActividadCliente('INICIO_SESION', 'Acceso cliente rapido (' + usuarioDemo + ')', usuarioDemo);
        }
        registrarEvento('SESION DEMO', 'Acceso de evaluacion: ' + usuarioDemo + ' | Rol: ' + rolElegido.toUpperCase());
        mostrarToast('SESION ACTIVA', 'Bienvenido ' + usuarioDemo + ' (' + rolElegido + ').', false);
    });

    $(document).off('submit', '#form-login-rol').on('submit', '#form-login-rol', async function (eventoSubmit) {
        eventoSubmit.preventDefault();
        var usuarioIngresado = $('#login-usuario').val().trim();
        var claveIngresada = ($('#login-clave').val() || '').trim();

        if (usuarioIngresado === '' || claveIngresada === '') {
            $('#login-error').text('Ingresa usuario y contrasena.').slideDown('fast');
            return;
        }

        var sesionResuelta = null;
        var origenAcceso = 'Validacion local';

        if (navigator.onLine && typeof autenticarCuentaNube === 'function') {
            var resAuth = await autenticarCuentaNube(usuarioIngresado, claveIngresada);
            if (resAuth.ok && resAuth.cuenta) {
                sesionResuelta = {
                    usuario: resAuth.cuenta.usuario || usuarioIngresado,
                    rol: resAuth.cuenta.rol || 'cliente'
                };
                origenAcceso = 'Supabase';
            }
        }

        if (!sesionResuelta) {
            sesionResuelta = validarCuentaRespaldo(usuarioIngresado, claveIngresada);
        }

        if (!sesionResuelta) {
            $('#login-error').text('Usuario o contrasena incorrectos.').slideDown('fast');
            return;
        }

        $('#login-error').hide().text('');
        this.reset();
        sesionActual = sesionResuelta;
        sessionStorage.setItem('sesionRolLevelUp', JSON.stringify(sesionActual));
        aplicarPermisosRol(sesionActual.rol, sesionActual.usuario);
        $('#pantalla-login').stop(true, true).hide();
        if (sesionActual.rol === 'cliente') {
            registrarActividadCliente('INICIO_SESION', 'Inicio de sesion (' + origenAcceso + ')', sesionActual.usuario);
        }
        registrarEvento('SESION INICIADA', origenAcceso + ': ' + sesionActual.usuario + ' | Rol: ' + sesionActual.rol.toUpperCase());
        mostrarToast('BIENVENIDO', 'Hola ' + sesionActual.usuario + ', sesion iniciada correctamente.', false);
    });

    $(document).off('submit', '#form-registro-cuenta').on('submit', '#form-registro-cuenta', async function (eventoRegistro) {
        eventoRegistro.preventDefault();
        var usuarioNuevo = $('#reg-usuario').val().trim();
        var claveNueva = ($('#reg-clave').val() || '').trim();
        var claveConfirm = ($('#reg-clave-confirm').val() || '').trim();

        if (usuarioNuevo === '' || claveNueva.length < 4) {
            $('#registro-error').text('El usuario es obligatorio y la contrasena debe tener al menos 4 caracteres.').slideDown('fast');
            return;
        }
        if (claveNueva !== claveConfirm) {
            $('#registro-error').text('Las contrasenas no coinciden.').slideDown('fast');
            return;
        }

        var cuentaGuardada = false;
        if (navigator.onLine && typeof registrarCuentaNube === 'function') {
            var resReg = await registrarCuentaNube(usuarioNuevo, claveNueva, 'cliente');
            cuentaGuardada = Boolean(resReg && resReg.ok);
        }
        if (!cuentaGuardada) {
            encolarOperacionOfflineFIFO('cuenta', { usuario: usuarioNuevo, clave: claveNueva, rol: 'cliente' });
        }
        guardarCuentaLocalRespaldo(usuarioNuevo, claveNueva, 'cliente');

        $('#registro-error').hide().text('');
        this.reset();
        cambiarPestanaAuth('auth-panel-login');
        sesionActual = { usuario: usuarioNuevo, rol: 'cliente' };
        sessionStorage.setItem('sesionRolLevelUp', JSON.stringify(sesionActual));
        aplicarPermisosRol('cliente', usuarioNuevo);
        $('#pantalla-login').stop(true, true).hide();
        registrarActividadCliente('REGISTRO_CUENTA', 'Nueva cuenta registrada: ' + usuarioNuevo, usuarioNuevo);
        registrarEvento('REGISTRO CLIENTE', 'Nueva cuenta cliente: ' + usuarioNuevo);
        mostrarToast('BIENVENIDO A LEVELUP', 'Cuenta creada para ' + usuarioNuevo + '. Ya puedes reservar y pedir snacks.', false);
    });

    $(document).off('click', '#btn-cerrar-sesion').on('click', '#btn-cerrar-sesion', function () {
        sessionStorage.removeItem('sesionRolLevelUp');
        sesionActual = null;
        detenerAutoRefreshAdmin();
        aplicarPermisosRol('cliente', 'Invitado');
        cambiarPestanaAuth('auth-panel-login');
        $('#pantalla-login').stop(true, true).css('display', 'flex');
        registrarEvento('SESION CERRADA', 'Usuario cerro sesion.');
    });

    $(document).off('click', '.btn-nav-hud, .tab-rol').on('click', '.btn-nav-hud, .tab-rol', function () {
        var $botonNav = $(this);
        cambiarVistaHUD($botonNav.attr('data-vista'), $botonNav.attr('data-tema'), $botonNav.attr('data-titulo'));
        if ($botonNav.attr('data-consola')) {
            var consolaFiltro = $botonNav.attr('data-consola');
            $('.btn-filtro-consola').removeClass('activo');
            $('.btn-filtro-consola[data-consola="' + consolaFiltro + '"]').addClass('activo');
            if (consolaFiltro === 'todos') {
                $('.item-consola').show();
            } else {
                $('.item-consola').hide();
                $('.item-consola[data-consola="' + consolaFiltro + '"]').show();
            }
        }
    });

    // Semana 2 - Acordeon Animado jQuery
    $(document).off('click', '.btn-toggle-admin-card').on('click', '.btn-toggle-admin-card', function () {
        var $botonToggle = $(this);
        $botonToggle.toggleClass('abierto');
        var estaAbierto = $botonToggle.hasClass('abierto');
        $botonToggle.find('.estado-toggle').text(estaAbierto ? 'Ocultar [-]' : 'Mostrar [+]');
        $botonToggle.next('.admin-card-body').slideToggle('fast');
    });

    $(document).off('click', '.btn-volver').on('click', '.btn-volver', function () {
        cambiarVistaHUD('vista-lobby', '', 'Lobby');
    });

    // Semana 1 - Modo Oscuro y Claro
    $(document).off('click', '#btn-tema').on('click', '#btn-tema', function () {
        $('body').toggleClass('modo-claro');
        var nombreModo = $('body').hasClass('modo-claro') ? 'Claro' : 'Oscuro';
        registrarEvento('TEMA VISUAL', 'Modo cambiado a ' + nombreModo);
    });

    $(document).off('click', '#btn-like-lobby').on('click', '#btn-like-lobby', function () {
        contadorLikes += 1;
        $('#contador-likes').text(contadorLikes);
        actualizarMetricasAdmin();
        registrarEvento('INTERACCION', 'Like registrado (Total: ' + contadorLikes + ')');
    });

    // Semana 1 - Bitacora Dia 1 Bubbling Dblclick
    $(document).off('dblclick', '.estacion, .card-snack').on('dblclick', '.estacion, .card-snack', function () {
        contadorLikes += 2;
        $('#contador-likes').text(contadorLikes);
        actualizarMetricasAdmin();
        registrarEvento('SUPER LIKE', 'Doble clic en tarjeta');
    });

    $(document).off('click', '#btn-reclamar-promo').on('click', '#btn-reclamar-promo', function () {
        if (promoExpirada || promoReclamada || segundosPromo10m <= 0) {
            return;
        }
        var nombrePromo = $(this).attr('data-nombre') || 'Promo Express';
        var precioPromo = parseInt($(this).attr('data-precio'), 10) || 45;
        promoReclamada = true;
        agregarItemCarrito(nombrePromo, precioPromo, 1);
        $('#toggle-promo').prop('checked', false);
        $(this).prop('disabled', true).text('PROMO RECLAMADA');
        registrarActividadCliente('PROMO_RECLAMADA', nombrePromo + ' (' + precioPromo + ' Bs)');
    });

    $(document).off('click', '.accordion-btn').on('click', '.accordion-btn', function () {
        var $botonAcordeon = $(this);
        var $panelAcordeon = $botonAcordeon.closest('.cabecera-acordeon').next('.accordion-panel');
        $panelAcordeon.slideToggle('fast', function () {
            var panelAbierto = $(this).is(':visible');
            $botonAcordeon.toggleClass('abierto', panelAbierto).text(panelAbierto ? '[-]' : '[+]');
        });
    });

    // Semana 1 - Filtro de Catalogo por Dataset
    $(document).off('click', '.btn-filtro-consola').on('click', '.btn-filtro-consola', function () {
        var consolaFiltro = this.dataset.consola || $(this).attr('data-consola');
        var temaAsociado = this.dataset.tema || $(this).attr('data-tema');
        $('.btn-filtro-consola').removeClass('activo');
        $(this).addClass('activo');
        actualizarFondoHUD(temaAsociado);
        if (consolaFiltro === 'todos') {
            $('.item-consola').fadeIn('fast');
        } else {
            $('.item-consola').hide();
            $('.item-consola[data-consola="' + consolaFiltro + '"]').fadeIn('fast');
        }
    });

    $(document).off('click', '.btn-filtro-pc').on('click', '.btn-filtro-pc', function () {
        var gamaFiltro = this.dataset.gama || $(this).attr('data-gama');
        $('.btn-filtro-pc').removeClass('activo');
        $(this).addClass('activo');
        if (gamaFiltro === 'todas') {
            $('#grilla-20-pcs .estacion').fadeIn('fast');
        } else {
            $('#grilla-20-pcs .estacion').hide();
            $('#grilla-20-pcs .estacion[data-gama="' + gamaFiltro + '"]').fadeIn('fast');
        }
    });

    $(document).off('click', '.btn-filtro-snack').on('click', '.btn-filtro-snack', function () {
        var categoriaFiltro = this.dataset.categoria || $(this).attr('data-categoria');
        $('.btn-filtro-snack').removeClass('activo');
        $(this).addClass('activo');
        if (categoriaFiltro === 'todos') {
            $('.card-snack').fadeIn('fast');
        } else {
            $('.card-snack').hide();
            $('.card-snack[data-categoria="' + categoriaFiltro + '"]').fadeIn('fast');
        }
    });

    $(document).off('change', '.select-cant-controles, .select-horas-estacion').on('change', '.select-cant-controles, .select-horas-estacion', function () {
        var $tarjeta = $(this).closest('.estacion');
        var tarifaBase = parseInt($tarjeta.attr('data-precio'), 10);
        var cantidadHoras = parseInt($tarjeta.find('.select-horas-estacion').val(), 10) || 1;
        var extraPorControles = 0;

        if ($tarjeta.attr('data-tipo') === 'consola') {
            var cantControles = parseInt($tarjeta.find('.select-cant-controles').val(), 10) || 1;
            if (cantControles >= 3) {
                extraPorControles = (cantControles - 2) * 3;
            }
        }
        var montoCalculado = (tarifaBase + extraPorControles) * cantidadHoras;
        $tarjeta.find('.btn-reservar-est').text('Reservar (' + montoCalculado + ' Bs)');
    });

    $(document).off('click', '.btn-reservar-est').on('click', '.btn-reservar-est', function () {
        var $tarjeta = $(this).closest('.estacion');
        var codigoEst = $tarjeta.attr('data-codigo');
        var juegoElegido = $tarjeta.find('.select-juego-estacion').val();
        var cantidadHoras = parseInt($tarjeta.find('.select-horas-estacion').val(), 10) || 1;
        var tarifaBase = parseInt($tarjeta.attr('data-precio'), 10);
        var detalleSolo = juegoElegido + ' | ' + cantidadHoras + 'h';
        var extraPorControles = 0;

        if ($tarjeta.attr('data-tipo') === 'consola') {
            var cantControles = parseInt($tarjeta.find('.select-cant-controles').val(), 10) || 1;
            if (cantControles >= 3) {
                extraPorControles = (cantControles - 2) * 3;
            }
            detalleSolo += ' (' + cantControles + ' Ctrls)';
        }
        var detalleReserva = codigoEst + ' [' + detalleSolo + ']';
        agregarItemCarrito(detalleReserva, (tarifaBase + extraPorControles) * cantidadHoras, 1, codigoEst, detalleSolo);
        registrarActividadCliente('RESERVA_ESTACION', detalleReserva);
    });

    $(document).off('click', '.btn-reservar-arcade').on('click', '.btn-reservar-arcade', function () {
        var $tarjetaArc = $(this).closest('.estacion');
        var $opcionModalidad = $tarjetaArc.find('.select-modo-arcade option:selected');
        var codigoArc = $tarjetaArc.attr('data-codigo');
        var juegoArc = $tarjetaArc.attr('data-juego');
        var precioArc = parseInt($opcionModalidad.attr('data-precio'), 10);
        var detalleSolo = juegoArc + ' (' + $opcionModalidad.text() + ')';
        agregarItemCarrito(codigoArc + ' ' + detalleSolo, precioArc, 1, codigoArc, detalleSolo);
        registrarActividadCliente('RESERVA_ESTACION', codigoArc + ' ' + detalleSolo);
    });

    $(document).off('click', '.btn-pedir-snack').on('click', '.btn-pedir-snack', function () {
        var $tarjetaSnack = $(this).closest('.card-snack');
        agregarItemCarrito($tarjetaSnack.attr('data-nombre'), parseInt($tarjetaSnack.attr('data-precio'), 10), 1);
    });

    $(document).off('click', '.btn-quitar-item').on('click', '.btn-quitar-item', function () {
        var $itemFila = $(this).closest('.item-carrito-li');
        var subtotalRestar = parseInt($itemFila.attr('data-subtotal'), 10) || 0;
        totalItems = Math.max(0, totalItems - 1);
        $itemFila.remove();
        if (totalItems === 0) {
            $('#lista-carrito').html('<li class="carrito-vacio">Sin reservas ni snacks activos.</li>');
        }
        actualizarTotalVisual(totalPagar - subtotalRestar);
    });

    $(document).off('click', '#btn-vaciar-carrito').on('click', '#btn-vaciar-carrito', function () {
        totalItems = 0;
        promoReclamada = false;
        $('#lista-carrito').html('<li class="carrito-vacio">Sin reservas ni snacks activos.</li>');
        if (!promoExpirada && promocionActivaActual) {
            actualizarVistaPromoCliente(promocionActivaActual);
            $('#btn-reclamar-promo').prop('disabled', false);
        }
        actualizarTotalVisual(0);
    });

    // Semana 1 - Bitacora Dia 1 Keyup Buscador
    $(document).off('keyup', '#buscador-rapido').on('keyup', '#buscador-rapido', function () {
        var consultaBusqueda = $(this).val().toLowerCase().trim();
        if (temporizadorBusquedaRadar) clearTimeout(temporizadorBusquedaRadar);
        if (consultaBusqueda.length >= 2) {
            temporizadorBusquedaRadar = setTimeout(function () {
                registrarActividadCliente('FILTRO_BUSQUEDA', 'Busqueda rapida: "' + consultaBusqueda + '"');
            }, 650);
        }
        $('#sugerencias-busqueda .item-sugerencia').each(function () {
            var palabrasClave = $(this).attr('data-keywords').toLowerCase();
            var textoVisible = $(this).text().toLowerCase();
            if (consultaBusqueda === '' || palabrasClave.indexOf(consultaBusqueda) !== -1 || textoVisible.indexOf(consultaBusqueda) !== -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    $(document).off('click', '.item-sugerencia').on('click', '.item-sugerencia', function () {
        var $sugerencia = $(this);
        $('#toggle-buscador-top').prop('checked', false);
        cambiarVistaHUD($sugerencia.attr('data-vista'), $sugerencia.attr('data-tema'), $sugerencia.attr('data-titulo'));
        registrarActividadCliente('FILTRO_BUSQUEDA', 'Acceso rapido: ' + ($sugerencia.attr('data-titulo') || ''));
        if ($sugerencia.attr('data-consola')) {
            var consolaObjetivo = $sugerencia.attr('data-consola');
            $('.btn-filtro-consola').removeClass('activo');
            $('.btn-filtro-consola[data-consola="' + consolaObjetivo + '"]').addClass('activo');
            $('.item-consola').hide();
            $('.item-consola[data-consola="' + consolaObjetivo + '"]').show();
        }
    });

    // Semana 2 - Filtro de 3 Capas
    $(document).off('change', '#capa1').on('change', '#capa1', function () {
        var zonaElegida = $(this).val();
        var $selectCapa2 = $('#capa2');
        var $selectCapa3 = $('#capa3');
        $selectCapa2.empty().append('<option value="">2. Plataforma...</option>');
        $selectCapa3.empty().append('<option value="">3. Modelo...</option>').prop('disabled', true);

        if (!zonaElegida || !datosCascada[zonaElegida]) {
            $selectCapa2.prop('disabled', true);
            $('#resultadoFiltro').text('Elige una zona para comenzar.');
            return;
        }
        $selectCapa2.prop('disabled', false);
        var plataformasDisponibles = Object.keys(datosCascada[zonaElegida]);
        for (var idxPlat = 0; idxPlat < plataformasDisponibles.length; idxPlat++) {
            $selectCapa2.append($('<option>').attr('value', plataformasDisponibles[idxPlat]).text(plataformasDisponibles[idxPlat]));
        }
        $('#resultadoFiltro').text('Zona seleccionada: ' + zonaElegida.toUpperCase());
    });

    $(document).off('change', '#capa2').on('change', '#capa2', function () {
        var zonaElegida = $('#capa1').val();
        var plataformaElegida = $(this).val();
        var $selectCapa3 = $('#capa3');
        $selectCapa3.empty().append('<option value="">3. Modelo...</option>');

        if (!zonaElegida || !plataformaElegida || !datosCascada[zonaElegida][plataformaElegida]) {
            $selectCapa3.prop('disabled', true);
            return;
        }
        $selectCapa3.prop('disabled', false);
        var modelosDisponibles = datosCascada[zonaElegida][plataformaElegida];
        for (var idxMod = 0; idxMod < modelosDisponibles.length; idxMod++) {
            $selectCapa3.append($('<option>').attr('value', modelosDisponibles[idxMod]).text(modelosDisponibles[idxMod]));
        }
        $('#resultadoFiltro').text('Plataforma: ' + plataformaElegida);
    });

    $(document).off('change', '#capa3').on('change', '#capa3', function () {
        var modeloElegido = $(this).val();
        if (modeloElegido) {
            $('#resultadoFiltro').text('Seleccion lista: ' + $('#capa1').val().toUpperCase() + ' -> ' + $('#capa2').val() + ' -> ' + modeloElegido);
            registrarActividadCliente('FILTRO_BUSQUEDA', 'Filtro cascada: ' + modeloElegido);
        }
    });

    // Semana 1 - Validacion Formulario con Regex
    $(document).off('submit', '#form-consulta-cliente').on('submit', '#form-consulta-cliente', async function (eventoConsulta) {
        eventoConsulta.preventDefault();
        var nombreRemitente = $('#consulta-nombre').val().trim();
        var correoRemitente = $('#consulta-correo').val().trim();
        var textoConsulta = $('#consulta-mensaje').val().trim();
        var regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        var $alertaCaja = $('#alerta-consulta-cliente');

        if (nombreRemitente === '' || correoRemitente === '' || textoConsulta === '') {
            $alertaCaja.removeClass('alerta-exito').text('Completa todos los campos.').fadeIn('fast');
            return;
        }
        if (!regexCorreo.test(correoRemitente)) {
            $alertaCaja.removeClass('alerta-exito').text('Correo electronico invalido.').fadeIn('fast');
            return;
        }

        $alertaCaja.addClass('alerta-exito').text('Consulta enviada al encargado.').fadeIn('fast').delay(2600).fadeOut('slow');
        var indiceConsulta = consultasActivas.length + 1;
        consultasActivas.push({ id: indiceConsulta, nombre: nombreRemitente, correo: correoRemitente, mensaje: textoConsulta });
        agregarConsultaPanelEncargadoDOM(nombreRemitente, correoRemitente, textoConsulta);

        var consultaGuardada = false;
        if (navigator.onLine && typeof guardarConsultaNube === 'function') {
            var resCons = await guardarConsultaNube(nombreRemitente, textoConsulta);
            consultaGuardada = Boolean(resCons && resCons.ok);
        }
        if (!consultaGuardada) {
            encolarOperacionOfflineFIFO('consulta', { cliente: nombreRemitente, mensaje: textoConsulta });
        }

        registrarActividadCliente('CONSULTA_ENVIADA', nombreRemitente + ': ' + textoConsulta);
        $('#form-consulta-cliente')[0].reset();
        registrarEvento('CONSULTA CLIENTE', 'Nueva consulta de ' + nombreRemitente);
    });

    // Semana 2 - Reservas Anti-XSS
    $(document).off('submit', '#formReserva').on('submit', '#formReserva', async function (eventoSubmit) {
        eventoSubmit.preventDefault();
        const nombreCliente = $('#clienteNombre').val().trim();
        const salaElegida = $('#salaSelect').val();
        if (!nombreCliente) return;
        const $itemReserva = $('<li>').addClass('item-reserva');
        const $textoSeguro = $('<strong>').text(nombreCliente + ' - ');
        const $detalleSala = $('<span>').text(salaElegida);
        $itemReserva.append($textoSeguro, $detalleSala);
        $('#listaReservas').append($itemReserva);
        var reservaGuardada = false;
        if (navigator.onLine && typeof guardarReservaNube === 'function') {
            var resSala = await guardarReservaNube(nombreCliente, salaElegida);
            reservaGuardada = Boolean(resSala && resSala.ok);
        }
        if (!reservaGuardada) {
            encolarOperacionOfflineFIFO('reserva', { cliente: nombreCliente, sala: salaElegida });
        }
        registrarActividadCliente('RESERVA_SALA', nombreCliente + ' -> ' + salaElegida);
        this.reset();
        registrarEvento('RESERVA SALA VIP', nombreCliente + ' -> ' + salaElegida);
        mostrarToast('RESERVA VIP', 'Sala asignada de forma segura para ' + nombreCliente + '.', false);
    });

    // Semana 2 - Cola Dinamica Blindada
    $(document).off('click', '#btnPedir').on('click', '#btnPedir', function () {
        const temaPedido = $('#inputCancion').val().trim();
        if (!temaPedido) return;
        const $filaPeticion = $('<div>').addClass('fila-cancion');
        const $tituloPeticion = $('<span>').addClass('titulo-truncado').text(temaPedido);
        const $botonQuitar = $('<button>').attr('type', 'button').addClass('btn-tactil btn-quitar').text('X');
        $filaPeticion.append($tituloPeticion, $botonQuitar);
        $('#listaCanciones').append($filaPeticion);
        $('#inputCancion').val('');
        registrarActividadCliente('COLA_MUSICAL', 'Cancion solicitada: ' + temaPedido);
        registrarEvento('COLA MUSICAL', 'Peticion agregada: ' + temaPedido);
    });

    $(document).off('click', '.btn-quitar').on('click', '.btn-quitar', function () {
        $(this).closest('.fila-cancion').remove();
        registrarEvento('COLA MUSICAL', 'Peticion eliminada de la cola.');
    });

    // Semana 2 - Gestion Encargado Stock en Vivo
    $(document).off('submit', '#form-nuevo-snack').on('submit', '#form-nuevo-snack', async function (eventoSnack) {
        eventoSnack.preventDefault();
        var nombreProducto = $('#nuevo-snack-nombre').val().trim();
        var categoriaProducto = $('#nuevo-snack-categoria').val();
        var precioProducto = parseInt($('#nuevo-snack-precio').val(), 10) || 15;
        var descripcionProducto = $('#nuevo-snack-desc').val().trim() || 'Agregado por encargado en vivo.';

        if (nombreProducto === '') {
            mostrarToast('CAMPO REQUERIDO', 'Ingresa el nombre del snack.', true);
            return;
        }

        var imagenFallback = listaSnacksGlobal.length > 0 ? listaSnacksGlobal[0].imagen : 'icons/icon-192.png';
        listaSnacksGlobal.push({
            nombre: nombreProducto,
            categoria: categoriaProducto,
            precio: precioProducto,
            descripcion: descripcionProducto,
            imagen: imagenFallback
        });
        renderizarTarjetasSnacks(listaSnacksGlobal);
        var productoGuardado = false;
        if (navigator.onLine && typeof guardarProductoExtraNube === 'function') {
            var resProd = await guardarProductoExtraNube(nombreProducto, categoriaProducto, precioProducto, imagenFallback);
            productoGuardado = Boolean(resProd && resProd.ok);
        }
        if (!productoGuardado) {
            encolarOperacionOfflineFIFO('producto', {
                nombre: nombreProducto,
                categoria: categoriaProducto,
                precio: precioProducto,
                imagen: imagenFallback
            });
        }
        $('#form-nuevo-snack')[0].reset();
        registrarEvento('CATALOGO ENCARGADO', 'Snack agregado: ' + nombreProducto + ' (' + precioProducto + ' Bs)');
        mostrarToast('SNACK PUBLICADO', nombreProducto + ' visible en catalogo.', false);
    });

    $(document).off('click', '.btn-aprobar-reserva').on('click', '.btn-aprobar-reserva', function () {
        var $botonAprobar = $(this);
        $botonAprobar.prop('disabled', true).text('Aprobada');
        registrarEvento('ENCARGADO', 'Reserva aprobada en estacion.');
    });

    $(document).off('click', '.btn-responder-consulta').on('click', '.btn-responder-consulta', function () {
        var $itemConsulta = $(this).closest('.item-gestion');
        var respuestaTexto = $itemConsulta.find('.input-respuesta-encargado').val().trim();
        if (respuestaTexto === '') {
            return;
        }
        $itemConsulta.find('.texto-respuesta-emitida').text('Respondido: ' + respuestaTexto);
        $itemConsulta.find('.input-respuesta-encargado').val('').prop('disabled', true);
        $(this).prop('disabled', true).text('Atendida');
        registrarEvento('ENCARGADO', 'Consulta respondida de forma segura.');
        mostrarToast('CONSULTA RESPONDIDA', 'Se registro la respuesta al cliente.', false);
    });

    // Semana 2 - Calculador Modal 30s y Checkout
    $(document).off('click', '#btn-abrir-modal').on('click', '#btn-abrir-modal', function () {
        if (totalItems === 0) {
            mostrarToast('CARRITO VACIO', 'Selecciona una estacion o snack antes de confirmar.', true);
            return;
        }
        $('#toggle-carrito-drawer').prop('checked', false);
        $('#modal-resumen-lista').empty();
        $('#lista-carrito .item-carrito-li').each(function () {
            var $itemResumen = $('<li>').text($(this).attr('data-nombre') + ' - ' + $(this).attr('data-subtotal') + ' Bs');
            $('#modal-resumen-lista').append($itemResumen);
        });
        $('#modal-total').text(totalPagar);
        $('#modal-error').hide();
        segundosRestantes = 30;
        $('#timer-modal').text('00:30');
        $('#modal-confirmacion').fadeIn('fast');

        clearInterval(intervaloModal);
        intervaloModal = setInterval(function () {
            segundosRestantes--;
            $('#timer-modal').text('00:' + (segundosRestantes < 10 ? '0' + segundosRestantes : segundosRestantes));
            if (segundosRestantes <= 0) {
                clearInterval(intervaloModal);
                $('#modal-confirmacion').fadeOut('fast');
                mostrarToast('TARIFA FLASH EXPIRADA', 'El tiempo limite de 30 segundos expiro.', true);
            }
        }, 1000);
    });

    $(document).off('click', '#btn-cerrar-modal').on('click', '#btn-cerrar-modal', function () {
        clearInterval(intervaloModal);
        $('#modal-confirmacion').fadeOut('fast');
    });

    $(document).off('submit', '#form-checkout').on('submit', '#form-checkout', async function (eventoCheckout) {
        eventoCheckout.preventDefault();
        var nombreCliente = $('#input-nombre-cliente').val().trim();
        var modalidadElegida = $('#select-modalidad').val();
        var formaPagoElegida = $('#forma-pago').val();

        if (nombreCliente === '') {
            $('#modal-error').text('Ingresa el nombre del jugador o cliente.').slideDown('fast');
            return;
        }

        var arregloItems = [];
        var listaEstacionesOrden = [];
        $('#lista-carrito .item-carrito-li').each(function () {
            arregloItems.push($(this).attr('data-nombre') + ' (' + $(this).attr('data-subtotal') + ' Bs)');
            var estId = $(this).attr('data-estacion-id');
            if (estId) {
                listaEstacionesOrden.push({
                    codigo: estId,
                    detalle: $(this).attr('data-detalle-estacion') || $(this).attr('data-nombre')
                });
            }
        });

        clearInterval(intervaloModal);
        $('#modal-confirmacion').fadeOut('fast');

        var guardadoNubeOk = false;
        if (navigator.onLine && typeof guardarPedidoNube === 'function') {
            var resPedidoNube = await guardarPedidoNube({
                cliente: nombreCliente,
                modalidad: modalidadElegida,
                formaPago: formaPagoElegida,
                montoTotal: totalPagar,
                items: arregloItems
            });
            guardadoNubeOk = Boolean(resPedidoNube && resPedidoNube.ok);
            for (var idxEstConfirm = 0; idxEstConfirm < listaEstacionesOrden.length; idxEstConfirm++) {
                var estObj = listaEstacionesOrden[idxEstConfirm];
                var idGenerado = '';
                if (typeof reservarEstacionNube === 'function') {
                    var resEstNube = await reservarEstacionNube(estObj.codigo, nombreCliente, estObj.detalle);
                    if (resEstNube.ok && resEstNube.reserva && resEstNube.reserva.id) {
                        idGenerado = resEstNube.reserva.id;
                    }
                }
                guardarOcupacionLocalEstacion(estObj.codigo, nombreCliente, estObj.detalle, idGenerado);
            }
        }

        if (!navigator.onLine || !guardadoNubeOk) {
            for (var idxEstOff = 0; idxEstOff < listaEstacionesOrden.length; idxEstOff++) {
                var estOff = listaEstacionesOrden[idxEstOff];
                guardarOcupacionLocalEstacion(estOff.codigo, nombreCliente, estOff.detalle, '');
            }
            encolarOperacionOfflineFIFO('pedido', {
                cliente: nombreCliente,
                modalidad: modalidadElegida,
                formaPago: formaPagoElegida,
                montoTotal: totalPagar,
                items: arregloItems,
                estaciones: listaEstacionesOrden,
                fechaHora: new Date().toISOString()
            });
            registrarActividadCliente('PEDIDO_CONFIRMADO', nombreCliente + ' | ' + totalPagar + ' Bs | ' + modalidadElegida + ' (Offline)');
            $('#form-checkout')[0].reset();
            totalItems = 0;
            promoReclamada = false;
            $('#lista-carrito').html('<li class="carrito-vacio">Sin reservas ni snacks activos.</li>');
            actualizarTotalVisual(0);
            actualizarMetricasAdmin();
            sincronizarEstadoEstaciones();
            mostrarToast('GUARDADO LOCALMENTE (OFFLINE)', 'Pedido guardado en cola FIFO para sincronizar con Supabase.', true);
            registrarEvento('OFFLINE FIFO', 'Pedido guardado en cola local: ' + nombreCliente);
            return;
        }

        agregarReservaParaEncargado(nombreCliente, modalidadElegida, totalPagar, arregloItems);
        registrarActividadCliente('PEDIDO_CONFIRMADO', nombreCliente + ' | ' + totalPagar + ' Bs | ' + modalidadElegida);
        $('#form-checkout')[0].reset();
        totalItems = 0;
        promoReclamada = false;
        $('#lista-carrito').html('<li class="carrito-vacio">Sin reservas ni snacks activos.</li>');
        if (!promoExpirada && promocionActivaActual) {
            actualizarVistaPromoCliente(promocionActivaActual);
            $('#btn-reclamar-promo').prop('disabled', false);
        }
        actualizarTotalVisual(0);
        await sincronizarEstadoEstaciones();
        mostrarToast('PEDIDO CONFIRMADO', 'Orden registrada para ' + nombreCliente + ' via ' + formaPagoElegida + '.', false);
        registrarEvento('CHECKOUT CONFIRMADO', 'Cliente: ' + nombreCliente + ' | Pago: ' + formaPagoElegida);
    });

    // Semana 3 - Hub Compacto Lobby por Pestanas
    $(document).off('click', '.btn-hub-tab').on('click', '.btn-hub-tab', function () {
        var panelObjetivo = $(this).attr('data-hub-panel');
        $('.btn-hub-tab').removeClass('activo');
        $(this).addClass('activo');
        $('.lobby-hub-panel').removeClass('activo').hide();
        $('#' + panelObjetivo).addClass('activo').css('display', 'flex');
    });

    // Semana 3 - Backend Supabase Estaciones, Pedidos, Promos y Actividad
    $(document).off('click', '.btn-liberar-estacion').on('click', '.btn-liberar-estacion', async function () {
        var $btnLib = $(this);
        var idReserva = $btnLib.attr('data-reserva-id');
        var codigoEst = $btnLib.attr('data-estacion-id');
        if (idReserva && typeof liberarEstacionNube === 'function') {
            await liberarEstacionNube(idReserva);
        }
        eliminarOcupacionLocalEstacion(codigoEst);
        await sincronizarEstadoEstaciones();
        mostrarToast('ESTACION LIBERADA', codigoEst + ' vuelve a estar disponible.', false);
        registrarEvento('ENCARGADO', 'Estacion liberada: ' + codigoEst);
    });

    $(document).off('submit', '#form-editor-promo').on('submit', '#form-editor-promo', async function (eventoPromo) {
        eventoPromo.preventDefault();
        var tituloPromo = $('#promo-edit-titulo').val().trim();
        var descPromo = $('#promo-edit-desc').val().trim();
        var precioPromo = parseInt($('#promo-edit-precio').val(), 10) || 45;
        var duracionMin = parseInt($('#promo-edit-duracion').val(), 10) || 15;
        var textoBtnPromo = $('#promo-edit-boton').val().trim() || ('Reclamar Promo (' + precioPromo + ' Bs)');
        var estaActiva = ($('#promo-edit-estado').val() || 'activa') === 'activa';

        if (tituloPromo === '' || descPromo === '') {
            mostrarToast('VALIDACION', 'Completa el titulo y descripcion de la promocion.', true);
            return;
        }

        var nuevaPromo = {
            titulo: tituloPromo,
            descripcion: descPromo,
            precio: precioPromo,
            texto_boton: textoBtnPromo,
            activa: estaActiva,
            expira_en: new Date(Date.now() + (duracionMin * 60000)).toISOString()
        };

        guardarPromocionLocalRespaldo(nuevaPromo);
        actualizarVistaPromoCliente(nuevaPromo);

        var promoNubeOk = false;
        if (navigator.onLine && typeof guardarPromocionNube === 'function') {
            var resSavePromo = await guardarPromocionNube(nuevaPromo);
            promoNubeOk = Boolean(resSavePromo && resSavePromo.ok);
        }
        if (!promoNubeOk) {
            encolarOperacionOfflineFIFO('promocion', nuevaPromo);
        }

        mostrarToast('PROMOCION PUBLICADA', tituloPromo + ' actualizada para los clientes.', false);
        registrarEvento('PROMO EDITOR', 'Promocion actualizada: ' + tituloPromo + ' (' + precioPromo + ' Bs)');
    });

    $(document).off('click', '.btn-entregar-pedido').on('click', '.btn-entregar-pedido', async function () {
        var $btnEnt = $(this);
        var idPedido = $btnEnt.attr('data-pedido-id');
        if (idPedido && navigator.onLine && typeof marcarPedidoEntregadoNube === 'function') {
            $btnEnt.prop('disabled', true).text('Actualizando...');
            var resEnt = await marcarPedidoEntregadoNube(idPedido);
            if (resEnt && resEnt.ok) {
                mostrarToast('PEDIDO ENTREGADO', 'Orden marcada como entregada correctamente.', false);
                registrarEvento('GESTION PEDIDOS', 'Pedido entregado: ' + idPedido);
                await cargarPedidosGestion();
                if (sesionActual && sesionActual.rol === 'admin') {
                    await cargarPanelAdminEjecutivo();
                }
                return;
            }
            $btnEnt.prop('disabled', false).text('Marcar Entregado');
        }
    });

    $(document).off('click', '#btn-refrescar-actividad').on('click', '#btn-refrescar-actividad', function () {
        cargarPanelAdminEjecutivo();
    });

    $(document).off('click', '#btn-refrescar-reservas').on('click', '#btn-refrescar-reservas', function () {
        cargarReservasStaff();
    });

    $(document).off('click', '#btn-refrescar-pedidos').on('click', '#btn-refrescar-pedidos', function () {
        cargarPedidosGestion();
    });

    $(document).off('click', '#btn-sincronizar-fifo-manual').on('click', '#btn-sincronizar-fifo-manual', function () {
        sincronizarColaPendiente();
    });

    $(document).off('change', '#filtro-tipo-actividad').on('change', '#filtro-tipo-actividad', function () {
        renderizarFeedActividadFiltrado();
    });

    $(document).off('input keyup', '#filtro-cliente-actividad').on('input keyup', '#filtro-cliente-actividad', function () {
        renderizarFeedActividadFiltrado();
    });

    $(document).off('click', '#btn-limpiar-log').on('click', '#btn-limpiar-log', function () {
        $('#log-output').empty();
        contadorEventosSistema = 0;
        actualizarMetricasAdmin();
        registrarEvento('SISTEMA ADMIN', 'Bitacora purgada por administrador.');
    });

    // Semana 2 - Sincronizacion Offline FIFO
    $(window).off('online offline').on('online offline', async function () {
        actualizarEstadoRed();
        if (navigator.onLine) {
            await sincronizarColaPendiente();
        } else {
            registrarEvento('RED OFFLINE', 'Conexion perdida. Modo Store & Forward activo.');
            mostrarToast('MODO OFFLINE ACTIVO', 'Los pedidos se guardaran localmente en cola FIFO.', true);
        }
    });

    // Semana 2 - Visor Modal Lightbox Seguro
    function cerrarVisorLightboxImagen() {
        var visorModal = document.getElementById('lightboxImagenVisor');
        var fotoVisor = document.getElementById('lightboxImagenFoto');
        if (visorModal) {
            visorModal.classList.remove('activo');
        }
        if (fotoVisor) {
            fotoVisor.setAttribute('src', '');
        }
    }

    $(document).off('click', 'img').on('click', 'img', function () {
        var nodoImg = this;
        if (nodoImg.closest('#lightboxImagenVisor')) return;
        var rutaImg = nodoImg.getAttribute('src') || '';
        if (!rutaImg.trim()) return;

        var tarjetaPadre = nodoImg.closest('.card-item, .card-snack, article');
        var tituloNodo = tarjetaPadre ? tarjetaPadre.querySelector('.card-item__titulo, h3, h4') : null;
        var descNodo = tarjetaPadre ? tarjetaPadre.querySelector('.card-item__descripcion, p') : null;
        var textoTitulo = tituloNodo ? tituloNodo.textContent.trim() : (nodoImg.getAttribute('alt') || 'Vista Ampliada');
        var textoDesc = descNodo ? descNodo.textContent.trim() : '';
        var encabezadoCompleto = textoDesc ? (textoTitulo + ' - ' + textoDesc) : textoTitulo;

        var visorModal = document.getElementById('lightboxImagenVisor');
        var fotoVisor = document.getElementById('lightboxImagenFoto');
        var tituloVisor = document.getElementById('lightboxImagenTitulo');
        if (!visorModal || !fotoVisor || !tituloVisor) return;

        fotoVisor.setAttribute('src', rutaImg);
        fotoVisor.setAttribute('alt', textoTitulo);
        tituloVisor.textContent = encabezadoCompleto;
        visorModal.classList.add('activo');
        registrarEvento('VISOR IMAGEN', 'Imagen ampliada: ' + textoTitulo);
    });

    $(document).off('click', '#btnCerrarLightboxVisor').on('click', '#btnCerrarLightboxVisor', function () {
        cerrarVisorLightboxImagen();
    });

    $(document).off('click', '#lightboxImagenVisor').on('click', '#lightboxImagenVisor', function (eventoFondo) {
        if (eventoFondo.target === eventoFondo.currentTarget) {
            cerrarVisorLightboxImagen();
        }
    });

    $(document).off('keydown.lightbox').on('keydown.lightbox', function (eventoTeclado) {
        if (eventoTeclado.key === 'Escape') {
            cerrarVisorLightboxImagen();
        }
    });

    inicializarEstacionesConsolas();
    inicializarEstacionesPC();
    inicializarEstacionesArcades();
    verificarSesionInicial();
    actualizarEstadoRed();
    cargarCatalogoSnacks();
    cargarPromocionCliente();
    actualizarMetricasAdmin();
    if (navigator.onLine) {
        sincronizarColaPendiente();
    }
    registrarEvento('SISTEMA PWA', 'HUD Movil Offline-First inicializado');
});
