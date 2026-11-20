// Semana 1 - Inicializacion DOM y Eventos
$(document).ready(function () {

    // Semana 3 - Bloqueo de Aviso Instalar PWA
    window.addEventListener('beforeinstallprompt', function (eventoInstalacion) {
        eventoInstalacion.preventDefault();
    });

    var totalPagar = 0;
    var totalItems = 0;
    var contadorLikes = 0;
    var contadorEventos = 0;
    var contadorReservasAprobadas = 0;
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

    var clasesFondo = 'bg-playstation bg-xbox bg-xboxone bg-xbox360 bg-switch bg-pc bg-arcade bg-comida';

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

    var estructuraCascada = {
        consolas: {
            etiqueta: 'Consolas Next-Gen',
            opciones: {
                sony: { nombre: 'Sony PlayStation', modelos: ['PS5 DualSense (15 Bs/h)', 'PS4 Pro Full HD (12 Bs/h)', 'PS3 Clasicos (10 Bs/h)'] },
                microsoft: { nombre: 'Microsoft Xbox', modelos: ['Xbox Series X (15 Bs/h)', 'Xbox One X (13 Bs/h)', 'Xbox 360 Slim (10 Bs/h)'] },
                nintendo: { nombre: 'Nintendo Switch', modelos: ['Switch Dock 4K (15 Bs/h)'] }
            }
        },
        pcs: {
            etiqueta: 'Zona PC Gamer RTX',
            opciones: {
                ultra: { nombre: 'Gama Ultra Esports', modelos: ['RTX 4080 Super 360Hz (25 Bs/h)'] },
                alta: { nombre: 'Gama Alta Competitiva', modelos: ['RTX 4070 240Hz (20 Bs/h)'] },
                media: { nombre: 'Gama Media Pro', modelos: ['RTX 4060 Ti 165Hz (15 Bs/h)'] }
            }
        },
        arcades: {
            etiqueta: 'Salon Arcade Retro',
            opciones: {
                lucha: { nombre: 'Pelea Clasica', modelos: ['KOF 98 / 2002 (2 Bs ficha)', 'Street Fighter III (2 Bs ficha)'] },
                aventura: { nombre: 'Beat Em Up y Disparos', modelos: ['Metal Slug X / 3 (10 Bs/h)', 'Cadillacs and Dinosaurs (10 Bs/h)'] }
            }
        },
        snacks: {
            etiqueta: 'Comida y Bebidas',
            opciones: {
                comida: { nombre: 'Cocina Caliente', modelos: ['Hamburguesa Doble LevelUp (25 Bs)', 'Pizza Pepperoni (30 Bs)', 'Alitas BBQ (28 Bs)'] },
                bebida: { nombre: 'Bebidas Frias', modelos: ['Monster Energetica (15 Bs)', 'Gaseosa 500ml (10 Bs)'] },
                combo: { nombre: 'Combos Gamer', modelos: ['Combo Gamer 1 (32 Bs)', 'Combo Gamer 2 (40 Bs)'] }
            }
        }
    };

    function obtenerColaOfflineLista() {
        try {
            var colaRaw = localStorage.getItem('colaSincronizacionCiber');
            var colaParseada = colaRaw ? JSON.parse(colaRaw) : [];
            return Array.isArray(colaParseada) ? colaParseada : [];
        } catch (errorLecturaCola) {
            return [];
        }
    }

    function encolarOperacionOfflineFIFO(tipoOperacion, datosPayload) {
        var colaActual = obtenerColaOfflineLista();
        colaActual.push({
            tipo: tipoOperacion,
            payload: datosPayload,
            fechaHora: new Date().toISOString()
        });
        localStorage.setItem('colaSincronizacionCiber', JSON.stringify(colaActual));
        actualizarMetricasAdmin();
    }

    function actualizarMetricasAdmin() {
        var listaCola = obtenerColaOfflineLista();
        $('#metrica-eventos').text(contadorEventos);
        $('#metrica-reservas').text(contadorReservasAprobadas);
        $('#metrica-cola').text(listaCola.length);
        $('#metrica-likes').text(contadorLikes);
        $('#admin-estado-red').text(navigator.onLine ? 'ONLINE' : 'OFFLINE LOCAL');

        var $listaFifo = $('#lista-cola-fifo-admin');
        $listaFifo.empty();
        if (listaCola.length === 0) {
            $listaFifo.append($('<li>').addClass('item-gestion vacio-gestion').text('Sin operaciones pendientes en cola FIFO.'));
        } else {
            for (var indiceCola = 0; indiceCola < listaCola.length; indiceCola++) {
                var registroCola = listaCola[indiceCola];
                var tipoNodo = registroCola.tipo || 'pedido';
                var cuerpoNodo = registroCola.payload || registroCola;
                var resumenLinea = '';
                if (tipoNodo === 'pedido') {
                    resumenLinea = 'Cliente: ' + (cuerpoNodo.cliente || 'Invitado') + ' | Total: ' + (cuerpoNodo.montoTotal || 0) + ' Bs';
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
    function registrarBitacora(tipoEvento, detalleEvento) {
        contadorEventos = contadorEventos + 1;
        var horaExacta = new Date().toLocaleTimeString();

        var $filaLog = $('<div>').addClass('log-item');
        var $spanHora = $('<span>').addClass('log-hora').text('[' + horaExacta + '] ');
        var $spanTipo = $('<span>').addClass('log-tipo').text('[' + tipoEvento + '] ');
        var $spanDetalle = $('<span>').text(detalleEvento);

        $filaLog.append($spanHora, $spanTipo, $spanDetalle);
        $('#log-output').prepend($filaLog);
        actualizarMetricasAdmin();
    }

    function actualizarEstadoRed() {
        var $badgeRed = $('#estado-red-hud');
        if (navigator.onLine) {
            $badgeRed.removeClass('offline').text('EN LINEA');
        } else {
            $badgeRed.addClass('offline').text('OFFLINE LOCAL');
        }
        actualizarMetricasAdmin();
    }

    // Semana 2 - Login y Control de 3 Roles
    function obtenerSesionActivaObj() {
        try {
            var sesionRaw = sessionStorage.getItem('sesionRolLevelUp');
            if (sesionRaw) {
                var parsed = JSON.parse(sesionRaw);
                if (parsed && parsed.rol) return parsed;
            }
        } catch (errorLectura) {
            return null;
        }
        return null;
    }

    function obtenerRolSesionActual() {
        var sesionObj = obtenerSesionActivaObj();
        return sesionObj ? sesionObj.rol : 'cliente';
    }

    function detenerAutoRefreshAdmin() {
        if (intervaloAutoAdmin !== null) {
            clearInterval(intervaloAutoAdmin);
            intervaloAutoAdmin = null;
        }
    }

    function iniciarAutoRefreshAdmin() {
        detenerAutoRefreshAdmin();
        intervaloAutoAdmin = setInterval(function () {
            if (navigator.onLine && obtenerRolSesionActual() === 'admin') {
                cargarPanelAdminEjecutivo();
            }
        }, 15000);
    }

    function aplicarPermisosRol(sesionObj) {
        $('body').removeClass('rol-cliente rol-encargado rol-admin');
        if (!sesionObj || !sesionObj.rol) {
            $('body').addClass('rol-cliente');
            detenerAutoRefreshAdmin();
            $('#pantalla-login').stop(true, true).show();
            $('.permiso-encargado, .permiso-admin, #barra-tabs-rol').hide();
            $('.vista-hud').removeClass('vista-activa').css('display', '');
            $('#vista-lobby').addClass('vista-activa').css('display', '');
            $('#vista-lobby .hud-dock').css('display', '');
            $('.tab-rol').removeClass('activo');
            return;
        }

        $('#pantalla-login').stop(true, true).hide();
        var rolActual = sesionObj.rol;
        $('body').addClass('rol-' + rolActual);
        var etiquetaRol = rolActual === 'admin' ? 'ADMINISTRADOR' : (rolActual === 'encargado' ? 'ENCARGADO' : 'CLIENTE');
        $('#hud-jugador').text(etiquetaRol + ': ' + sesionObj.usuario);

        $('.permiso-encargado, .permiso-admin').hide();
        if (rolActual === 'encargado') {
            detenerAutoRefreshAdmin();
            $('.permiso-encargado').show();
            $('#barra-tabs-rol').css('display', 'flex');
            cambiarVistaExclusiva('vista-encargado', '', 'Reservas y Estaciones');
        } else if (rolActual === 'admin') {
            $('.permiso-encargado, .permiso-admin').show();
            $('#barra-tabs-rol').css('display', 'flex');
            cambiarVistaExclusiva('vista-bitacora', '', 'Actividad y Control Total');
            iniciarAutoRefreshAdmin();
        } else {
            detenerAutoRefreshAdmin();
            $('#barra-tabs-rol').hide();
            cambiarVistaExclusiva('vista-lobby', '', 'Lobby Principal');
            $('#vista-lobby .hud-dock').css('display', '');
            cargarPromocionCliente();
        }

        sincronizarEstadoEstaciones();
        registrarBitacora('SESION ROL', 'Acceso autorizado como ' + etiquetaRol + ' (' + sesionObj.usuario + ')');
    }

    function verificarSesionInicial() {
        localStorage.removeItem('sesionRolLevelUp');
        var sesionGuardada = sessionStorage.getItem('sesionRolLevelUp');
        if (sesionGuardada) {
            try {
                var sesionParseada = JSON.parse(sesionGuardada);
                aplicarPermisosRol(sesionParseada);
            } catch (errorParseo) {
                sessionStorage.removeItem('sesionRolLevelUp');
                aplicarPermisosRol(null);
            }
        } else {
            aplicarPermisosRol(null);
        }
    }

    function construirOpcionesJuegos(claveConsola) {
        var juegos = catalogoJuegosConsola[claveConsola] || [];
        var listaOpciones = [];
        for (var indiceJuego = 0; indiceJuego < juegos.length; indiceJuego++) {
            listaOpciones.push($('<option>').attr('value', juegos[indiceJuego]).text((indiceJuego + 1) + '. ' + juegos[indiceJuego]));
        }
        return listaOpciones;
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
            id: idReserva || mapaActual[codigoEstacion]?.id || '',
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

    function restaurarEstacionDisponible($estacion) {
        if ($estacion.hasClass('reservada-cliente')) return;
        var badgeDefault = $estacion.attr('data-badge-libre') || 'Disponible';
        var textoBtnDefault = $estacion.attr('data-texto-btn') || 'Reservar';
        $estacion.removeClass('estado-uso estado-reservado').addClass('estado-disponible');
        $estacion.find('.badge-estado').text(badgeDefault);
        $estacion.find('.info-reserva-activa, .btn-liberar-estacion').remove();
        $estacion.find('.controles-reserva .select-juego, .controles-reserva .fila-inline-reserva, .controles-reserva .select-modo-arcade, .controles-reserva .input-horas, .controles-reserva .subtotal-estacion, .controles-reserva label').show();
        $estacion.find('select, input').prop('disabled', false);
        $estacion.find('.btn-reservar-estacion')
            .prop('disabled', false)
            .removeClass('btn-estacion-ocupada')
            .text(textoBtnDefault);
    }

    function aplicarEstadoOcupadoEstacion($estacion, infoReserva, rolUsuario) {
        var codigoEst = $estacion.attr('data-estacion-id') || $estacion.attr('data-codigo');
        $estacion.removeClass('estado-disponible estado-reservado reservada-cliente').addClass('estado-uso');
        $estacion.find('.badge-estado').text('RESERVADA');
        $estacion.find('.controles-reserva .select-juego, .controles-reserva .fila-inline-reserva, .controles-reserva .select-modo-arcade, .controles-reserva .input-horas, .controles-reserva .subtotal-estacion, .controles-reserva label').hide();
        $estacion.find('.info-reserva-activa, .btn-liberar-estacion').remove();

        var $infoBox = $('<div>').addClass('info-reserva-activa');
        $infoBox.append(
            $('<strong>').text('Reservada por: ' + (infoReserva.cliente || 'Cliente')),
            $('<small>').text(infoReserva.detalle || 'Estacion en uso')
        );

        var $btnReserva = $estacion.find('.btn-reservar-estacion');
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

        var colaPendLista = obtenerColaOfflineLista();
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

        var rolActual = obtenerRolSesionActual();
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
            var $grilla = $(this);
            var clave = $grilla.attr('data-generar-consola');
            var prefijo = $grilla.attr('data-prefijo');
            var precio = parseInt($grilla.attr('data-precio'), 10) || 15;
            $grilla.empty();

            for (var numeroEstacion = 1; numeroEstacion <= 10; numeroEstacion++) {
                var numStr = numeroEstacion < 10 ? '0' + numeroEstacion : '' + numeroEstacion;
                var codigo = prefijo + '-' + numStr;
                var $tarjeta = $('<div>').addClass('estacion card-item estado-disponible').attr({
                    'data-tipo': 'consola',
                    'data-codigo': codigo,
                    'data-estacion-id': codigo,
                    'data-precio': precio,
                    'data-badge-libre': 'Disponible',
                    'data-texto-btn': 'Reservar'
                });
                var $cuerpo = $('<div>').addClass('card-item__cuerpo');
                var $top = $('<div>').addClass('est-top').append($('<h4>').text(codigo), $('<span>').addClass('badge-estado').text('Disponible'));
                var $controles = $('<div>').addClass('controles-reserva');
                var $selectJuegos = $('<select>').addClass('select-juego');
                var opcionesJuegos = construirOpcionesJuegos(clave);
                for (var idxOp = 0; idxOp < opcionesJuegos.length; idxOp++) {
                    $selectJuegos.append(opcionesJuegos[idxOp]);
                }

                var $filaInline = $('<div>').addClass('fila-inline-reserva');
                var $selectControles = $('<select>').addClass('select-controles').append(
                    $('<option>').attr({ value: '0', 'data-texto': '1 Control' }).text('1 Control (+0)'),
                    $('<option>').attr({ value: '5', 'data-texto': '2 Controles' }).text('2 Controles (+5)'),
                    $('<option>').attr({ value: '10', 'data-texto': '3 Controles' }).text('3 Controles (+10)'),
                    $('<option>').attr({ value: '15', 'data-texto': '4 Controles' }).text('4 Controles (+15)')
                );
                var $inputHoras = $('<input>').attr({ type: 'number', value: '1', min: '1', max: '8' }).addClass('input-horas');
                $filaInline.append(
                    $('<div>').append($('<label>').text('Mandos:'), $selectControles),
                    $('<div>').append($('<label>').text('Horas:'), $inputHoras)
                );

                var $subtotal = $('<div>').addClass('subtotal-estacion').append('Subtotal: ', $('<span>').addClass('val-subtotal').text(precio), ' Bs');
                var $btnReservar = $('<button>').attr('type', 'button').addClass('btn-reservar-estacion').text('Reservar');
                $controles.append($('<label>').text('Juego (20 disponibles):'), $selectJuegos, $filaInline, $subtotal, $btnReservar);
                $cuerpo.append($top, $controles);
                $tarjeta.append($cuerpo);
                $grilla.append($tarjeta);
            }
        });
    }

    function inicializarEstacionesPC() {
        var $grillaPCs = $('#grilla-20-pcs');
        $grillaPCs.empty();
        for (var numeroPc = 1; numeroPc <= 20; numeroPc++) {
            var numStr = numeroPc < 10 ? '0' + numeroPc : '' + numeroPc;
            var codigo = 'PC-' + numStr;
            var gama = 'ultra';
            var nombreGama = 'Gama Ultra Esports';
            var specs = 'RTX 4080 Super | 360Hz';
            var precio = 25;

            if (numeroPc >= 8 && numeroPc <= 14) {
                gama = 'alta';
                nombreGama = 'Gama Alta Competitiva';
                specs = 'RTX 4070 | 240Hz';
                precio = 20;
            } else if (numeroPc >= 15) {
                gama = 'media';
                nombreGama = 'Gama Media Pro';
                specs = 'RTX 4060 Ti | 165Hz';
                precio = 15;
            }

            var $tarjetaPC = $('<div>').addClass('estacion card-item estado-disponible item-pc').attr({
                'data-gama': gama,
                'data-tipo': 'pc',
                'data-codigo': codigo,
                'data-estacion-id': codigo,
                'data-nombre': nombreGama,
                'data-precio': precio,
                'data-badge-libre': 'Disponible',
                'data-texto-btn': 'Reservar PC'
            });
            var $cuerpoPC = $('<div>').addClass('card-item__cuerpo');
            var $topPC = $('<div>').addClass('est-top').append($('<h4>').text(codigo + ' (' + precio + ' Bs/h)'), $('<span>').addClass('badge-estado').text('Disponible'));
            var $specsTag = $('<p>').addClass('tarifa-tag').text(specs);
            var $controlesPC = $('<div>').addClass('controles-reserva').append(
                $('<label>').text('Horas de Juego:'),
                $('<input>').attr({ type: 'number', value: '1', min: '1', max: '8' }).addClass('input-horas'),
                $('<div>').addClass('subtotal-estacion').append('Subtotal: ', $('<span>').addClass('val-subtotal').text(precio), ' Bs'),
                $('<button>').attr('type', 'button').addClass('btn-reservar-estacion').text('Reservar PC')
            );
            $cuerpoPC.append($topPC, $specsTag, $controlesPC);
            $tarjetaPC.append($cuerpoPC);
            $grillaPCs.append($tarjetaPC);
        }
    }

    function inicializarMaquinasArcade() {
        var $grillaArcade = $('#grilla-25-arcades');
        $grillaArcade.empty();
        for (var indiceArcade = 0; indiceArcade < lista25Arcades.length; indiceArcade++) {
            var numeroArcade = indiceArcade + 1;
            var numStr = numeroArcade < 10 ? '0' + numeroArcade : '' + numeroArcade;
            var juego = lista25Arcades[indiceArcade];
            var codigo = 'ARC-' + numStr;

            var $tarjetaArc = $('<div>').addClass('estacion card-item estado-disponible').attr({
                'data-tipo': 'arcade',
                'data-codigo': codigo,
                'data-estacion-id': codigo,
                'data-nombre': juego,
                'data-precio': '10',
                'data-badge-libre': 'Disponible',
                'data-texto-btn': 'Reservar Arcade'
            });
            var $cuerpoArc = $('<div>').addClass('card-item__cuerpo');
            var $topArc = $('<div>').addClass('est-top').append($('<h4>').text(numStr + '. ' + juego), $('<span>').addClass('badge-estado').text('Disponible'));
            var $selectModo = $('<select>').addClass('select-modo-arcade').append(
                $('<option>').attr({ value: '10', 'data-unidad': 'Hora(s)' }).text('Hora Libre (10 Bs)'),
                $('<option>').attr({ value: '2', 'data-unidad': 'Ficha(s)' }).text('Por Ficha (2 Bs)')
            );
            var $filaArc = $('<div>').addClass('fila-inline-reserva').append(
                $('<div>').append($('<label>').text('Modalidad:'), $selectModo),
                $('<div>').append($('<label>').text('Cant.:'), $('<input>').attr({ type: 'number', value: '1', min: '1', max: '15' }).addClass('input-horas'))
            );
            var $controlesArc = $('<div>').addClass('controles-reserva').append(
                $filaArc,
                $('<div>').addClass('subtotal-estacion').append('Subtotal: ', $('<span>').addClass('val-subtotal').text('10'), ' Bs'),
                $('<button>').attr('type', 'button').addClass('btn-reservar-estacion').text('Reservar Arcade')
            );
            $cuerpoArc.append($topArc, $controlesArc);
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

    // Semana 2 - Fetch Lazy Loading y Respaldo SVG
    var svgRespaldoSnackGlobal = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180"><rect width="320" height="180" rx="14" fill="#080d1a"/><circle cx="160" cy="82" r="34" fill="#ffcc00" opacity="0.22"/><rect x="112" y="64" width="96" height="22" rx="11" fill="#ffcc00"/><rect x="108" y="92" width="104" height="14" rx="7" fill="#00ff88"/><rect x="114" y="112" width="92" height="16" rx="8" fill="#00c8ff"/></svg>');

    function construirTarjetaSnackNodo(itemSnack) {
        var nombreItem = String(itemSnack.nombre || '');
        var categoriaItem = String(itemSnack.categoria || '');
        var precioItem = Number(itemSnack.precio || 0);
        var etiquetaItem = String(itemSnack.etiqueta || categoriaItem.toUpperCase() || 'SNACK');
        var descripcionItem = String(itemSnack.descripcion || 'Disponible en barra gamer.');
        var rutaImg = String(itemSnack.imagen || svgRespaldoSnackGlobal);

        var $tarjetaSnack = $('<article>')
            .addClass('card-snack card-item' + (itemSnack.esCombo ? ' card-combo' : ''))
            .attr({
                'data-categoria': categoriaItem,
                'data-prod': nombreItem,
                'data-precio': precioItem
            });
        var $cuerpoSnack = $('<div>').addClass('card-item__cuerpo');
        var $tagSnack = $('<span>').addClass('tag-snack card-item__etiqueta').text(etiquetaItem);
        var $imgSnack = $('<img>').addClass('img-snack-dinamica card-item__imagen').attr({
            src: rutaImg,
            srcset: rutaImg + ' 150w, ' + rutaImg + ' 600w, ' + rutaImg + ' 1080w',
            sizes: '(max-width: 768px) 150px, (max-width: 1200px) 600px, 1080px',
            alt: nombreItem || 'Snack LevelUp',
            loading: 'lazy',
            width: '320',
            height: '180'
        }).on('error', function () {
            if ($(this).attr('data-fallback-aplicado')) return;
            $(this).attr('data-fallback-aplicado', '1').attr('src', svgRespaldoSnackGlobal).attr('srcset', svgRespaldoSnackGlobal + ' 150w');
        });
        var $tituloSnack = $('<h4>').addClass('card-item__titulo').text(nombreItem);
        var $descSnack = $('<p>').addClass('card-item__descripcion').text(descripcionItem);
        var $precioSnack = $('<div>').addClass('precio-snack card-item__precio').text(precioItem + ' Bs');
        var $btnPedir = $('<button>').attr('type', 'button').addClass('btn-pedir-snack').text('Anadir al Pedido');

        $cuerpoSnack.append($tagSnack, $imgSnack, $tituloSnack, $descSnack, $precioSnack, $btnPedir);
        $tarjetaSnack.append($cuerpoSnack);
        return $tarjetaSnack;
    }

    function agregarConsultaPanelEncargadoDOM(nombreConsulta, correoConsulta, mensajeConsulta) {
        var $itemConsulta = $('<li>').addClass('item-gestion');
        var tituloAutor = correoConsulta ? (nombreConsulta + ' (' + correoConsulta + ')') : nombreConsulta;
        var $autor = $('<strong>').text(tituloAutor);
        var $textoMsg = $('<p>').text(mensajeConsulta);
        var $cajaRespuesta = $('<div>').addClass('respuesta-encargado-box');
        var $inputResp = $('<input>').attr('type', 'text').attr('placeholder', 'Escribir respuesta al cliente...').addClass('input-respuesta-encargado');
        var $btnResp = $('<button>').attr('type', 'button').addClass('btn-responder-consulta').text('Enviar Respuesta');
        var $salidaResp = $('<span>').addClass('texto-respuesta-emitida');

        $cajaRespuesta.append($inputResp, $btnResp, $salidaResp);
        $itemConsulta.append($autor, $textoMsg, $cajaRespuesta);
        $('#lista-consultas-encargado .vacio-gestion').remove();
        $('#lista-consultas-encargado').prepend($itemConsulta);
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
                var listaItemsPed = Array.isArray(filaPedido.items) ? filaPedido.items : [];
                var textoPedido = listaItemsPed.join(' | ') + ' [' + (filaPedido.monto_total || 0) + ' Bs]';
                agregarReservaPanelEncargado(textoPedido, filaPedido.cliente || 'Cliente');
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
                $('.grilla-snacks').prepend(construirTarjetaSnackNodo({
                    nombre: filaProd.nombre,
                    categoria: filaProd.categoria,
                    precio: filaProd.precio,
                    etiqueta: 'NUBE ENCARGADO',
                    descripcion: 'Producto sincronizado desde Supabase.',
                    imagen: filaProd.imagen || 'pwa/icons/icon-192.png'
                }));
            }
        }
    }

    function cargarCatalogoSnacksAsincrono() {
        fetch('data/snacks.json')
            .then(function (respuestaServidor) {
                if (!respuestaServidor.ok) {
                    throw new Error('Error HTTP ' + respuestaServidor.status + ' al cargar catalogo');
                }
                return respuestaServidor.json();
            })
            .then(function (datosCatalogoSnacks) {
                var $grillaSnacks = $('.grilla-snacks');
                $grillaSnacks.empty();
                for (var indiceSnack = 0; indiceSnack < datosCatalogoSnacks.length; indiceSnack++) {
                    $grillaSnacks.append(construirTarjetaSnackNodo(datosCatalogoSnacks[indiceSnack]));
                }
                cargarDatosInicialesNube();
            })
            .catch(function (errorSnacks) {
                registrarBitacora('ERROR ASYNC', 'Error al consultar snacks: ' + errorSnacks.message);
            });
    }

    function aplicarTemaFondo(temaFondo, tituloIndicador) {
        $('body').removeClass(clasesFondo);
        if (temaFondo && temaFondo !== '') {
            $('body').addClass('bg-' + temaFondo);
        }
        if (tituloIndicador) {
            $('#indicador-tema').text(tituloIndicador);
        }
    }

    function mostrarToastAlerta(tituloToast, mensajeToast, claseEstiloAdicional) {
        $('#toast-titulo').text(tituloToast);
        $('#toast-cuerpo').text(mensajeToast);
        $('#toast-alert').removeClass('toast-alerta-naranja');
        if (claseEstiloAdicional) {
            $('#toast-alert').addClass(claseEstiloAdicional);
        }
        $('#toast-alert').stop(true, true).slideDown('fast').delay(3000).fadeOut('slow');
    }

    function actualizarTotalesHUD() {
        $('#hud-items').text(totalItems);
        $('#hud-total').text(totalPagar).animate({ opacity: 0.3 }, 110).animate({ opacity: 1 }, 190);
        $('#lobby-total-texto').text(totalPagar + ' Bs').animate({ opacity: 0.3 }, 110).animate({ opacity: 1 }, 190);
        $('#modal-total').text(totalPagar);
    }

    function activarFiltroConsolaEspecifico(claveConsola, temaFondo, tituloPersonalizado) {
        var filtroElegido = claveConsola || 'todos';
        $('.btn-filtro-consola').removeClass('activo');
        $('.btn-filtro-consola[data-consola="' + filtroElegido + '"]').addClass('activo');

        $('.item-consola').hide();
        if (filtroElegido === 'todos') {
            $('.item-consola').fadeIn('fast');
            $('.item-consola .accordion-panel').show();
            $('.item-consola .accordion-btn').addClass('abierto').text('Ocultar Estaciones [-]');
        } else {
            var $objetivo = $('.item-consola[data-consola="' + filtroElegido + '"]');
            $objetivo.fadeIn('fast');
            $objetivo.find('.accordion-panel').show();
            $objetivo.find('.accordion-btn').addClass('abierto').text('Ocultar Estaciones [-]');
        }

        aplicarTemaFondo(temaFondo || 'playstation', tituloPersonalizado || 'Hangar de Consolas');
    }

    function cambiarVistaExclusiva(idVista, temaFondo, tituloTema, consolaOpcional) {
        var rolUsuario = obtenerRolSesionActual();
        var vistasGestion = ['vista-encargado', 'vista-pedidos-gestion', 'vista-promos', 'vista-catalogo-gestion'];

        if (idVista === 'vista-bitacora' && rolUsuario !== 'admin') {
            mostrarToastAlerta('ACCESO DENEGADO', 'Control Total es exclusivo de Administrador.', 'toast-alerta-naranja');
            return;
        }
        if (vistasGestion.indexOf(idVista) !== -1 && rolUsuario === 'cliente') {
            mostrarToastAlerta('ACCESO DENEGADO', 'Modulo de gestion exclusivo para Encargado o Administrador.', 'toast-alerta-naranja');
            return;
        }

        $('.tab-rol').removeClass('activo');
        $('.tab-rol[data-vista="' + idVista + '"]').addClass('activo');

        $('.vista-hud').removeClass('vista-activa').stop(true, true).css('display', '');
        $('#' + idVista).addClass('vista-activa').css('display', '');

        if (idVista === 'vista-consolas') {
            activarFiltroConsolaEspecifico(consolaOpcional || 'todos', temaFondo || 'playstation', tituloTema || 'Hangar de Consolas');
        } else {
            aplicarTemaFondo(temaFondo, tituloTema);
        }

        if (idVista === 'vista-bitacora') {
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
                $('#promo-preview-expira').text('Estado: Pausada');
                $('#btn-reclamar-promo').hide();
                return false;
            }
            segundosPromo10m = Math.max(0, Math.floor((expiraMs - Date.now()) / 1000));
            var min = Math.floor(segundosPromo10m / 60);
            var seg = segundosPromo10m % 60;
            var minStr = min < 10 ? '0' + min : '' + min;
            var segStr = seg < 10 ? '0' + seg : '' + seg;

            if (segundosPromo10m > 0) {
                promoExpirada = false;
                $('#timer-oferta-10m').text(minStr + ':' + segStr);
                $('#promo-preview-expira').text('Expira en: ' + minStr + ':' + segStr);
                $('#btn-reclamar-promo').show();
                return true;
            } else {
                promoExpirada = true;
                $('#timer-oferta-10m').text('00:00');
                $('#promo-preview-expira').text('Estado: Expirada');
                $('#btn-reclamar-promo').hide();
                return false;
            }
        }

        var sigueVigente = actualizarTickPromo();
        if (sigueVigente) {
            intervaloPromo10m = setInterval(function () {
                if (!actualizarTickPromo()) {
                    clearInterval(intervaloPromo10m);
                    intervaloPromo10m = null;
                    registrarBitacora('PROMO EXPIRADA', 'La Promocion Express finalizo su tiempo activo.');
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
        if (!nombreForzado && obtenerRolSesionActual() !== 'cliente') return;
        var sesionActiva = obtenerSesionActivaObj();
        var clienteNombre = nombreForzado || (sesionActiva ? sesionActiva.usuario : 'Invitado');
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
        if (obtenerRolSesionActual() !== 'admin' || !navigator.onLine) return;

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

    function detenerTimerModal() {
        if (intervaloModal !== null) {
            clearInterval(intervaloModal);
            intervaloModal = null;
        }
    }

    function iniciarTimerModal() {
        detenerTimerModal();
        segundosRestantes = 30;
        $('#timer-modal').text('00:30');

        intervaloModal = setInterval(function () {
            segundosRestantes = segundosRestantes - 1;
            var segTexto = segundosRestantes < 10 ? '0' + segundosRestantes : segundosRestantes;
            $('#timer-modal').text('00:' + segTexto);

            if (segundosRestantes <= 0) {
                detenerTimerModal();
                $('#modal-confirmacion').fadeOut('fast');
                mostrarToastAlerta('TARIFA FLASH EXPIRADA', 'Tiempo limite de 30 segundos agotado.');
                registrarBitacora('TIMER EXPIRADO', 'Tarifa Flash Expirada: el modal se cerro automaticamente');
            }
        }, 1000);
    }

    function vaciarCarritoCompleto() {
        totalPagar = 0;
        totalItems = 0;
        var $itemVacio = $('<li>').addClass('carrito-vacio').text('Sin reservas ni snacks activos.');
        $('#lista-carrito').empty().append($itemVacio);
        $('#modal-resumen-lista').empty();

        $('.estacion.reservada-cliente').each(function () {
            $(this).removeClass('reservada-cliente');
            restaurarEstacionDisponible($(this));
        });

        if (!promoExpirada && promocionActivaActual) {
            promoReclamada = false;
            var textoBtnPromo = promocionActivaActual.texto_boton || ('Reclamar Promo (' + (promocionActivaActual.precio || 45) + ' Bs)');
            $('#btn-reclamar-promo').prop('disabled', false).text(textoBtnPromo).show();
        }

        actualizarTotalesHUD();
    }

    function agregarReservaPanelEncargado(textoOrden, clienteNombre) {
        var $itemGestion = $('<li>').addClass('item-gestion');
        var $titulo = $('<strong>').text('Cliente: ' + clienteNombre);
        var $detalle = $('<span>').text(textoOrden);
        var $estado = $('<span>').addClass('badge-estado').text('Pendiente de atencion');
        var $btnAprobar = $('<button>').attr('type', 'button').addClass('btn-aprobar-reserva').text('Aprobar / Atender Estacion');

        $itemGestion.append($titulo, $detalle, $estado, $btnAprobar);
        $('#lista-reservas-encargado .vacio-gestion').remove();
        $('#lista-reservas-encargado').prepend($itemGestion);
    }

    inicializarEstacionesConsolas();
    inicializarEstacionesPC();
    inicializarMaquinasArcade();
    cargarCatalogoSnacksAsincrono();
    cargarPromocionCliente();
    actualizarEstadoRed();
    verificarSesionInicial();
    if (navigator.onLine) {
        sincronizarColaPendienteNube();
    }

    // Semana 2 - Sincronizacion Offline FIFO
    $(window).off('online offline').on('online offline', actualizarEstadoRed);

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
        var sesionDemo = { usuario: usuarioDemo, rol: rolElegido };
        sessionStorage.setItem('sesionRolLevelUp', JSON.stringify(sesionDemo));
        $('#login-error, #registro-error').hide().text('');
        $('.acceso-demo').removeAttr('open');
        aplicarPermisosRol(sesionDemo);
        if (rolElegido === 'cliente') {
            registrarActividadCliente('INICIO_SESION', 'Acceso cliente rapido (' + usuarioDemo + ')', usuarioDemo);
        }
        registrarBitacora('SESION DEMO', 'Acceso de evaluacion como ' + usuarioDemo + ' (' + rolElegido.toUpperCase() + ')');
        mostrarToastAlerta('SESION INICIADA', 'Bienvenido ' + usuarioDemo + ' (' + rolElegido.toUpperCase() + ').');
    });

    $(document).off('submit', '#form-login-rol').on('submit', '#form-login-rol', async function (eventoSubmit) {
        eventoSubmit.preventDefault();
        var usuarioIngresado = $('#login-usuario').val().trim();
        var claveIngresada = ($('#login-clave').val() || '').trim();

        if (usuarioIngresado === '' || claveIngresada === '') {
            $('#login-error').text('Ingresa usuario y contrasena.').fadeIn('fast');
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
            $('#login-error').text('Usuario o contrasena incorrectos.').fadeIn('fast');
            return;
        }

        sessionStorage.setItem('sesionRolLevelUp', JSON.stringify(sesionResuelta));
        $('#login-error').hide().text('');
        this.reset();
        aplicarPermisosRol(sesionResuelta);
        if (sesionResuelta.rol === 'cliente') {
            registrarActividadCliente('INICIO_SESION', 'Inicio de sesion (' + origenAcceso + ')', sesionResuelta.usuario);
        }
        registrarBitacora('SESION INICIADA', origenAcceso + ': ' + sesionResuelta.usuario + ' (' + sesionResuelta.rol.toUpperCase() + ')');
        mostrarToastAlerta('BIENVENIDO', 'Hola ' + sesionResuelta.usuario + ', sesion iniciada correctamente.');
    });

    $(document).off('submit', '#form-registro-cuenta').on('submit', '#form-registro-cuenta', async function (eventoRegistro) {
        eventoRegistro.preventDefault();
        var usuarioNuevo = $('#reg-usuario').val().trim();
        var claveNueva = ($('#reg-clave').val() || '').trim();
        var claveConfirm = ($('#reg-clave-confirm').val() || '').trim();

        if (usuarioNuevo === '' || claveNueva.length < 4) {
            $('#registro-error').text('El usuario es obligatorio y la contrasena debe tener al menos 4 caracteres.').fadeIn('fast');
            return;
        }
        if (claveNueva !== claveConfirm) {
            $('#registro-error').text('Las contrasenas no coinciden.').fadeIn('fast');
            return;
        }

        var cuentaGuardada = false;
        if (navigator.onLine && typeof registrarCuentaNube === 'function') {
            var resRegistro = await registrarCuentaNube(usuarioNuevo, claveNueva, 'cliente');
            cuentaGuardada = Boolean(resRegistro && resRegistro.ok);
        }
        if (!cuentaGuardada) {
            encolarOperacionOfflineFIFO('cuenta', { usuario: usuarioNuevo, clave: claveNueva, rol: 'cliente' });
        }
        guardarCuentaLocalRespaldo(usuarioNuevo, claveNueva, 'cliente');

        var sesionNueva = { usuario: usuarioNuevo, rol: 'cliente' };
        sessionStorage.setItem('sesionRolLevelUp', JSON.stringify(sesionNueva));
        $('#registro-error').hide().text('');
        this.reset();
        cambiarPestanaAuth('auth-panel-login');
        aplicarPermisosRol(sesionNueva);
        registrarActividadCliente('REGISTRO_CUENTA', 'Nueva cuenta registrada: ' + usuarioNuevo, usuarioNuevo);
        registrarBitacora('REGISTRO CLIENTE', 'Nueva cuenta cliente: ' + usuarioNuevo);
        mostrarToastAlerta('BIENVENIDO A LEVELUP', 'Cuenta creada para ' + usuarioNuevo + '. Ya puedes reservar y pedir snacks.');
    });

    $(document).off('click', '#btn-cerrar-sesion').on('click', '#btn-cerrar-sesion', function () {
        sessionStorage.removeItem('sesionRolLevelUp');
        cambiarVistaExclusiva('vista-lobby', '', 'Lobby Principal');
        cambiarPestanaAuth('auth-panel-login');
        aplicarPermisosRol(null);
        registrarBitacora('SESION', 'Usuario cerro sesion');
    });

    // Semana 2 - Filtro de 3 Capas
    $(document).off('change', '#capa1').on('change', '#capa1', function () {
        var zona = $(this).val();
        var $capa2 = $('#capa2');
        var $capa3 = $('#capa3');

        $capa2.empty().append($('<option>').val('').text('Selecciona plataforma / categoria...'));
        $capa3.empty().append($('<option>').val('').text('Selecciona opcion...')).prop('disabled', true);
        $('#resultadoFiltro').text('Selecciona el segundo nivel para filtrar opciones.');

        if (zona && estructuraCascada[zona]) {
            $capa2.prop('disabled', false);
            var grupos = estructuraCascada[zona].opciones;
            Object.keys(grupos).forEach(function (claveGrupo) {
                $capa2.append($('<option>').val(claveGrupo).text(grupos[claveGrupo].nombre));
            });
            registrarBitacora('FILTRO CASCADA', 'Capa 1 seleccionada: ' + estructuraCascada[zona].etiqueta);
        } else {
            $capa2.prop('disabled', true);
        }
    });

    $(document).off('change', '#capa2').on('change', '#capa2', function () {
        var zona = $('#capa1').val();
        var grupo = $(this).val();
        var $capa3 = $('#capa3');

        $capa3.empty().append($('<option>').val('').text('Selecciona modelo / servicio...'));

        if (zona && grupo && estructuraCascada[zona] && estructuraCascada[zona].opciones[grupo]) {
            $capa3.prop('disabled', false);
            var modelos = estructuraCascada[zona].opciones[grupo].modelos;
            for (var indiceModelo = 0; indiceModelo < modelos.length; indiceModelo++) {
                $capa3.append($('<option>').val(modelos[indiceModelo]).text(modelos[indiceModelo]));
            }
            $('#resultadoFiltro').text('Categoria lista: ' + estructuraCascada[zona].opciones[grupo].nombre);
            registrarBitacora('FILTRO CASCADA', 'Capa 2 seleccionada: ' + estructuraCascada[zona].opciones[grupo].nombre);
        } else {
            $capa3.prop('disabled', true);
        }
    });

    $(document).off('change', '#capa3').on('change', '#capa3', function () {
        var modeloElegido = $(this).val();
        var zona = $('#capa1').val();
        if (modeloElegido) {
            var $textoRes = $('<strong>').text('Seleccion filtrada: ' + modeloElegido);
            $('#resultadoFiltro').empty().append($textoRes);
            registrarActividadCliente('FILTRO_BUSQUEDA', 'Filtro cascada: ' + modeloElegido + ' (' + zona + ')');
            registrarBitacora('FILTRO CASCADA', 'Capa 3 final: ' + modeloElegido + ' (' + zona + ')');
        }
    });

    // Semana 1 - Validacion Formulario con Regex
    $(document).off('submit', '#form-consulta-cliente').on('submit', '#form-consulta-cliente', async function (eventoEnvio) {
        eventoEnvio.preventDefault();
        var nombreConsulta = $('#consulta-nombre').val().trim();
        var correoConsulta = $('#consulta-correo').val().trim();
        var mensajeConsulta = $('#consulta-mensaje').val().trim();
        var regexCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        var $alerta = $('#alerta-consulta-cliente');

        if (nombreConsulta === '' || correoConsulta === '' || mensajeConsulta === '') {
            $alerta.removeClass('ok').text('Completa todos los campos obligatorios.').fadeIn('fast');
            return;
        }

        if (!regexCorreo.test(correoConsulta)) {
            $alerta.removeClass('ok').text('Formato de correo invalido.').fadeIn('fast');
            return;
        }

        agregarConsultaPanelEncargadoDOM(nombreConsulta, correoConsulta, mensajeConsulta);
        var consultaGuardada = false;
        if (navigator.onLine && typeof guardarConsultaNube === 'function') {
            var resCons = await guardarConsultaNube(nombreConsulta, mensajeConsulta);
            consultaGuardada = Boolean(resCons && resCons.ok);
        }
        if (!consultaGuardada) {
            encolarOperacionOfflineFIFO('consulta', { cliente: nombreConsulta, mensaje: mensajeConsulta });
        }

        registrarActividadCliente('CONSULTA_ENVIADA', nombreConsulta + ': ' + mensajeConsulta);
        this.reset();
        $alerta.addClass('ok').text('Consulta enviada al encargado.').fadeIn('fast').delay(3000).fadeOut('slow');
        registrarBitacora('CONSULTA CLIENTE', 'Nueva consulta registrada de ' + nombreConsulta);
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
        registrarBitacora('RESERVA SALA VIP', nombreCliente + ' -> ' + salaElegida);
        mostrarToastAlerta('RESERVA VIP', 'Sala asignada de forma segura para ' + nombreCliente + '.');
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
        registrarBitacora('COLA MUSICAL', 'Peticion agregada: ' + temaPedido);
    });

    $(document).off('click', '.btn-quitar').on('click', '.btn-quitar', function () {
        $(this).closest('.fila-cancion').remove();
        registrarBitacora('COLA MUSICAL', 'Peticion eliminada de la cola.');
    });

    $(document).off('click', '.btn-responder-consulta').on('click', '.btn-responder-consulta', function () {
        var $item = $(this).closest('.item-gestion');
        var respuestaTexto = $item.find('.input-respuesta-encargado').val().trim();
        if (respuestaTexto === '') {
            return;
        }
        $item.find('.texto-respuesta-emitida').text('Respondido: ' + respuestaTexto);
        $item.find('.input-respuesta-encargado').val('').prop('disabled', true);
        $(this).prop('disabled', true).text('Atendida');
        mostrarToastAlerta('CONSULTA RESPONDIDA', 'Se registro la respuesta al cliente.');
        registrarBitacora('GESTION ENCARGADO', 'Consulta respondida de forma segura');
    });

    $(document).off('click', '.btn-aprobar-reserva').on('click', '.btn-aprobar-reserva', function () {
        var $item = $(this).closest('.item-gestion');
        $item.find('.badge-estado').text('Aprobada y Activa');
        $(this).prop('disabled', true).text('Atendida');
        contadorReservasAprobadas = contadorReservasAprobadas + 1;
        actualizarMetricasAdmin();
        mostrarToastAlerta('RESERVA APROBADA', 'Estacion habilitada por encargado.');
        registrarBitacora('GESTION ENCARGADO', 'Reserva aprobada en local');
    });

    // Semana 2 - Gestion Encargado Stock en Vivo
    $(document).off('submit', '#form-nuevo-snack').on('submit', '#form-nuevo-snack', async function (eventoEnvio) {
        eventoEnvio.preventDefault();
        var nombreNuevo = $('#nuevo-snack-nombre').val().trim();
        var categoriaNueva = $('#nuevo-snack-categoria').val();
        var precioNuevo = parseInt($('#nuevo-snack-precio').val(), 10) || 15;
        var descNueva = $('#nuevo-snack-desc').val().trim();

        if (nombreNuevo === '' || descNueva === '') {
            mostrarToastAlerta('VALIDACION', 'Completa nombre y descripcion del snack.', 'toast-alerta-naranja');
            return;
        }

        var imagenProducto = 'pwa/icons/icon-192.png';
        $('.grilla-snacks').prepend(construirTarjetaSnackNodo({
            nombre: nombreNuevo,
            categoria: categoriaNueva,
            precio: precioNuevo,
            descripcion: descNueva,
            etiqueta: 'NUEVO STOCK',
            imagen: imagenProducto
        }));
        var productoGuardado = false;
        if (navigator.onLine && typeof guardarProductoExtraNube === 'function') {
            var resProd = await guardarProductoExtraNube(nombreNuevo, categoriaNueva, precioNuevo, imagenProducto);
            productoGuardado = Boolean(resProd && resProd.ok);
        }
        if (!productoGuardado) {
            encolarOperacionOfflineFIFO('producto', {
                nombre: nombreNuevo,
                categoria: categoriaNueva,
                precio: precioNuevo,
                imagen: imagenProducto
            });
        }

        this.reset();
        mostrarToastAlerta('CATALOGO ACTUALIZADO', nombreNuevo + ' agregado al menu en vivo.');
        registrarBitacora('NUEVO PRODUCTO', 'Encargado agrego al catalogo: ' + nombreNuevo + ' (' + precioNuevo + ' Bs)');
    });

    // Semana 1 - Modo Oscuro y Claro
    $(document).off('click', '#btn-tema').on('click', '#btn-tema', function () {
        $('body').toggleClass('modo-claro');
        var esClaro = $('body').hasClass('modo-claro');
        $(this).text(esClaro ? 'Modo Noche' : 'Modo Claro');
        registrarBitacora('TEMA HUD', 'Alternado a ' + (esClaro ? 'Modo Claro' : 'Modo Noche'));
    });

    // Semana 1 - Menu Hamburguesa
    $(document).off('click', '#btn-menu').on('click', '#btn-menu', function () {
        $(this).toggleClass('activo');
        $('#menu-movil').toggleClass('show').slideToggle('fast');
        registrarBitacora('MENU MOVIL', 'Despliegue de menu responsive hamburguesa');
    });

    $(document).off('click', '.btn-nav-movil').on('click', '.btn-nav-movil', function () {
        var vistaDestino = $(this).attr('data-vista');
        var temaDestino = $(this).attr('data-tema') || '';
        var tituloDestino = $(this).attr('data-titulo') || 'Lobby Principal';
        var consolaDestino = $(this).attr('data-consola') || 'todos';
        $('#btn-menu').removeClass('activo');
        $('#menu-movil').removeClass('show').slideUp('fast');
        cambiarVistaExclusiva(vistaDestino, temaDestino, tituloDestino, consolaDestino);
        registrarBitacora('NAVEGACION MOVIL', 'Cambio de vista hacia: ' + tituloDestino);
    });

    $(document).off('click', '.btn-nav-hud, .btn-acceso-lateral, .tab-rol').on('click', '.btn-nav-hud, .btn-acceso-lateral, .tab-rol', function () {
        var vistaDestino = $(this).attr('data-vista');
        var temaDestino = $(this).attr('data-tema') || '';
        var tituloDestino = $(this).attr('data-titulo') || 'Lobby Principal';
        var consolaDestino = $(this).attr('data-consola') || 'todos';
        if (vistaDestino) {
            cambiarVistaExclusiva(vistaDestino, temaDestino, tituloDestino, consolaDestino);
            registrarBitacora('NAVEGACION', 'Ingreso a: ' + tituloDestino);
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
        cambiarVistaExclusiva('vista-lobby', '', 'Lobby Principal');
        registrarBitacora('NAVEGACION', 'Retorno al Lobby Principal');
    });

    $(document).off('click', '#btn-like-lobby').on('click', '#btn-like-lobby', function () {
        contadorLikes = contadorLikes + 1;
        $('#contador-likes').text(contadorLikes);
        actualizarMetricasAdmin();
        registrarBitacora('REACCION CLICK', 'Like registrado al Cibercafe (Total: ' + contadorLikes + ')');
    });

    // Semana 1 - Bitacora Dia 1 Bubbling Dblclick
    $(document).off('dblclick', '#btn-like-lobby').on('dblclick', '#btn-like-lobby', function () {
        contadorLikes = contadorLikes + 5;
        $('#contador-likes').text(contadorLikes);
        actualizarMetricasAdmin();
        mostrarToastAlerta('SUPER LIKE GAMER', 'Doble clic detectado: +5 puntos de apoyo.');
        registrarBitacora('REACCION DBLCLICK', 'Super Like +5 aplicado (Total: ' + contadorLikes + ')');
    });

    // Semana 1 - Bitacora Dia 1 Keyup Buscador
    $(document).off('keyup', '#buscador-rapido').on('keyup', '#buscador-rapido', function () {
        var texto = $(this).val().toLowerCase().trim();
        registrarBitacora('EVENTO KEYUP', 'Filtro de radar: "' + texto + '"');

        if (temporizadorBusquedaRadar) clearTimeout(temporizadorBusquedaRadar);
        if (texto.length >= 2) {
            temporizadorBusquedaRadar = setTimeout(function () {
                registrarActividadCliente('FILTRO_BUSQUEDA', 'Busqueda rapida: "' + texto + '"');
            }, 650);
        }

        $('.item-sugerencia').each(function () {
            var palabras = ($(this).attr('data-keywords') || '').toLowerCase();
            var contenido = $(this).text().toLowerCase();
            if (texto === '' || palabras.indexOf(texto) !== -1 || contenido.indexOf(texto) !== -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    $(document).off('click', '.item-sugerencia').on('click', '.item-sugerencia', function () {
        var vista = $(this).attr('data-vista');
        var tema = $(this).attr('data-tema');
        var titulo = $(this).attr('data-titulo');
        var consola = $(this).attr('data-consola') || 'todos';
        cambiarVistaExclusiva(vista, tema, titulo, consola);
        registrarActividadCliente('FILTRO_BUSQUEDA', 'Acceso rapido: ' + titulo);
        registrarBitacora('RADAR BUSQUEDA', 'Salto directo hacia: ' + titulo);
    });

    // Semana 1 - Filtro de Catalogo por Dataset
    $(document).off('click', '.btn-filtro-consola').on('click', '.btn-filtro-consola', function () {
        var claveConsola = $(this).attr('data-consola');
        var tema = $(this).attr('data-tema');
        var textoBoton = $(this).text();
        activarFiltroConsolaEspecifico(claveConsola, tema, 'Plataforma: ' + textoBoton);
        registrarBitacora('FILTRO DATASET', 'Filtro de consola seleccionado: ' + textoBoton);
    });

    $(document).off('click', '.btn-filtro-pc').on('click', '.btn-filtro-pc', function () {
        var gama = $(this).attr('data-gama');
        $('.btn-filtro-pc').removeClass('activo');
        $(this).addClass('activo');

        if (gama === 'todas') {
            $('.item-pc').fadeIn('fast');
        } else {
            $('.item-pc').fadeOut('fast').promise().done(function () {
                $('.item-pc[data-gama="' + gama + '"]').fadeIn('fast');
            });
        }
        registrarBitacora('FILTRO PC', 'Gama de PCs filtrada: ' + $(this).text());
    });

    $(document).off('click', '.btn-filtro-snack').on('click', '.btn-filtro-snack', function () {
        var categoria = $(this).attr('data-categoria');
        $('.btn-filtro-snack').removeClass('activo');
        $(this).addClass('activo');

        if (categoria === 'todos') {
            $('.card-snack').fadeIn('fast');
        } else {
            $('.card-snack').fadeOut('fast').promise().done(function () {
                $('.card-snack[data-categoria="' + categoria + '"]').fadeIn('fast');
            });
        }
        registrarBitacora('FILTRO SNACKS', 'Categoria filtrada: ' + $(this).text());
    });

    $(document).off('click', '.accordion-btn').on('click', '.accordion-btn', function () {
        var $btn = $(this);
        var $panel = $btn.closest('.cabecera-acordeon').next('.accordion-panel');
        var detalle = $btn.attr('data-detalle');

        $btn.toggleClass('abierto');
        $panel.slideToggle('fast');

        if ($btn.hasClass('abierto')) {
            $btn.text('Ocultar Estaciones [-]');
            registrarBitacora('ACORDEON JQUERY', 'Desplegado bloque: ' + detalle);
        } else {
            $btn.text('Mostrar Estaciones [+]');
            registrarBitacora('ACORDEON JQUERY', 'Colapsado bloque: ' + detalle);
        }
    });

    $(document).off('change input', '.select-controles, .input-horas, .select-juego, .select-modo-arcade').on('change input', '.select-controles, .input-horas, .select-juego, .select-modo-arcade', function (eventoCambio) {
        var $estacion = $(this).closest('.estacion');
        var tipo = $estacion.attr('data-tipo');
        var codigoEst = $estacion.attr('data-codigo');
        var precioBase = parseInt($estacion.attr('data-precio'), 10) || 15;

        var cantidadTiempo = parseInt($estacion.find('.input-horas').val(), 10);
        if (isNaN(cantidadTiempo) || cantidadTiempo < 1) {
            cantidadTiempo = 1;
        }
        if (cantidadTiempo > 15) {
            cantidadTiempo = 15;
        }
        $estacion.find('.input-horas').val(cantidadTiempo);

        var subtotal = 0;
        var resumenVariante = '';

        if (tipo === 'consola') {
            var extraControl = parseInt($estacion.find('.select-controles').val(), 10) || 0;
            var textoControl = $estacion.find('.select-controles option:selected').attr('data-texto') || '1 Control';
            var juegoElegido = $estacion.find('.select-juego').val() || '';
            subtotal = (precioBase * cantidadTiempo) + extraControl;
            resumenVariante = juegoElegido + ' | ' + textoControl + ' | ' + cantidadTiempo + 'h';
        } else if (tipo === 'pc') {
            subtotal = precioBase * cantidadTiempo;
            resumenVariante = cantidadTiempo + ' Horas';
        } else if (tipo === 'arcade') {
            var tarifaModo = parseInt($estacion.find('.select-modo-arcade').val(), 10) || 10;
            var unidadModo = $estacion.find('.select-modo-arcade option:selected').attr('data-unidad') || 'Hora(s)';
            subtotal = tarifaModo * cantidadTiempo;
            resumenVariante = cantidadTiempo + ' ' + unidadModo;
        }

        $estacion.find('.val-subtotal').text(subtotal);

        if (eventoCambio.type === 'change') {
            registrarBitacora('CAMBIO VARIANTE', 'Estacion ' + codigoEst + ': ' + resumenVariante + ' (' + subtotal + ' Bs)');
        }
    });

    $(document).off('change', '#forma-pago, #select-modalidad').on('change', '#forma-pago, #select-modalidad', function () {
        registrarBitacora('CHECKOUT OPCION', 'Seleccion actualizada: ' + $(this).val());
    });

    $(document).off('click', '.btn-reservar-estacion').on('click', '.btn-reservar-estacion', function () {
        var $btn = $(this);
        var $estacion = $btn.closest('.estacion');
        var tipo = $estacion.attr('data-tipo');
        var codigoEst = $estacion.attr('data-codigo');
        var precioBase = parseInt($estacion.attr('data-precio'), 10) || 15;
        var cantidadTiempo = parseInt($estacion.find('.input-horas').val(), 10) || 1;
        var subtotal = 0;
        var textoItem = '';

        if (tipo === 'consola') {
            var nombreConsola = $estacion.closest('.bloque-plataforma').attr('data-nombre');
            var extraControl = parseInt($estacion.find('.select-controles').val(), 10) || 0;
            var textoControl = $estacion.find('.select-controles option:selected').attr('data-texto') || '1 Control';
            var juegoElegido = $estacion.find('.select-juego').val();
            subtotal = (precioBase * cantidadTiempo) + extraControl;
            textoItem = '[' + codigoEst + '] ' + nombreConsola + ' - Juego: ' + juegoElegido + ' (' + textoControl + ', ' + cantidadTiempo + 'h) = ' + subtotal + ' Bs';
        } else if (tipo === 'pc') {
            var gamaNombre = $estacion.attr('data-nombre');
            subtotal = precioBase * cantidadTiempo;
            textoItem = '[' + codigoEst + '] ' + gamaNombre + ' (' + cantidadTiempo + 'h) = ' + subtotal + ' Bs';
        } else if (tipo === 'arcade') {
            var juegoArcade = $estacion.attr('data-nombre');
            var tarifaModo = parseInt($estacion.find('.select-modo-arcade').val(), 10) || 10;
            var unidadModo = $estacion.find('.select-modo-arcade option:selected').attr('data-unidad');
            subtotal = tarifaModo * cantidadTiempo;
            textoItem = '[' + codigoEst + '] Arcade ' + juegoArcade + ' (' + cantidadTiempo + ' ' + unidadModo + ') = ' + subtotal + ' Bs';
        }

        $('.carrito-vacio').remove();
        var $filaItem = $('<li>')
            .addClass('item-seguro')
            .attr({
                'data-estacion-id': codigoEst,
                'data-detalle-estacion': textoItem
            });
        var $textoSeguro = $('<span>').text(textoItem);
        $filaItem.append($textoSeguro);
        $('#lista-carrito').append($filaItem);

        totalPagar = totalPagar + subtotal;
        totalItems = totalItems + 1;
        actualizarTotalesHUD();

        $estacion.removeClass('estado-disponible').addClass('estado-reservado reservada-cliente');
        $estacion.find('.badge-estado').text('Reservado');
        $estacion.find('select, input').prop('disabled', true);
        $btn.prop('disabled', true).text('Reservado');

        registrarActividadCliente('RESERVA_ESTACION', textoItem);
        mostrarToastAlerta('ESTACION RESERVADA', codigoEst + ' cargada al carrito (' + subtotal + ' Bs).');
        registrarBitacora('RESERVA ESTACION', textoItem);
    });

    $(document).off('click', '.btn-pedir-snack').on('click', '.btn-pedir-snack', function () {
        var $card = $(this).closest('.card-snack');
        var producto = $card.attr('data-prod');
        var precio = parseInt($card.attr('data-precio'), 10) || 0;

        $('.carrito-vacio').remove();
        var textoSnack = 'Snack/Combo: ' + producto + ' = ' + precio + ' Bs';
        var $filaSnack = $('<li>').addClass('item-seguro');
        var $textoSeguro = $('<span>').text(textoSnack);
        $filaSnack.append($textoSeguro);
        $('#lista-carrito').append($filaSnack);

        totalPagar = totalPagar + precio;
        totalItems = totalItems + 1;
        actualizarTotalesHUD();

        mostrarToastAlerta('PEDIDO AGREGADO', producto + ' (' + precio + ' Bs) cargado al carrito.');
        registrarBitacora('PEDIDO SNACK', 'Producto anadido: ' + producto + ' - ' + precio + ' Bs');
    });

    $(document).off('click', '#btn-reclamar-promo').on('click', '#btn-reclamar-promo', function () {
        if (promoExpirada || segundosPromo10m <= 0) {
            return;
        }
        var nombrePromo = $(this).attr('data-nombre') || 'Promo Express';
        var precioPromo = parseInt($(this).attr('data-precio'), 10) || 45;

        $('.carrito-vacio').remove();
        var $filaPromo = $('<li>').addClass('item-seguro');
        var $textoPromo = $('<strong>').text(nombrePromo + ' = ' + precioPromo + ' Bs');
        $filaPromo.append($textoPromo);
        $('#lista-carrito').append($filaPromo);

        totalPagar = totalPagar + precioPromo;
        totalItems = totalItems + 1;
        promoReclamada = true;
        actualizarTotalesHUD();

        $(this).prop('disabled', true).text('Promo Reclamada en Carrito');
        registrarActividadCliente('PROMO_RECLAMADA', nombrePromo + ' (' + precioPromo + ' Bs)');
        mostrarToastAlerta('PROMO RECLAMADA', nombrePromo + ' (' + precioPromo + ' Bs) agregada al carrito.');
        registrarBitacora('PROMO RELAMPAGO', 'Cliente reclamo: ' + nombrePromo + ' por ' + precioPromo + ' Bs');
    });

    $(document).off('click', '#btn-vaciar-carrito').on('click', '#btn-vaciar-carrito', function () {
        vaciarCarritoCompleto();
        registrarBitacora('CARRITO', 'El cliente vacio todos los items del carrito');
    });

    $(document).off('click', '#btn-limpiar-log').on('click', '#btn-limpiar-log', function () {
        $('#log-output').empty();
        contadorEventos = 0;
        registrarBitacora('SISTEMA', 'Historial de bitacora reiniciado por Administrador');
    });

    // Semana 2 - Calculador Modal 30s y Checkout
    $(document).off('click', '#btn-abrir-modal').on('click', '#btn-abrir-modal', function () {
        $('#modal-error').hide().text('');
        $('#modal-resumen-lista').empty();
        $('#lista-carrito li:not(.carrito-vacio)').each(function () {
            var $itemResumen = $('<li>').text($(this).text());
            $('#modal-resumen-lista').append($itemResumen);
        });
        $('#modal-total').text(totalPagar);
        $('#modal-confirmacion').fadeIn('fast');
        iniciarTimerModal();
        registrarBitacora('MODAL CHECKOUT', 'Apertura de ventana modal con temporizador de 30s');
    });

    $(document).off('click', '#btn-cerrar-modal').on('click', '#btn-cerrar-modal', function () {
        detenerTimerModal();
        $('#modal-confirmacion').fadeOut('fast');
        registrarBitacora('MODAL CHECKOUT', 'Cierre manual de ventana modal');
    });

    $(document).off('submit', '#form-checkout').on('submit', '#form-checkout', async function (eventoEnvio) {
        eventoEnvio.preventDefault();

        var nombreCliente = $('#input-nombre-cliente').val().trim();
        var modalidad = $('#select-modalidad').val();
        var formaPago = $('#forma-pago').val();

        if (nombreCliente === '') {
            $('#modal-error').text('Error: Debes ingresar el Nombre del Jugador / Cliente.').fadeIn('fast');
            registrarBitacora('ERROR VALIDACION', 'Intento de envio sin nombre de cliente');
            return;
        }

        if (totalPagar <= 0 || totalItems <= 0) {
            $('#modal-error').text('Error: El carrito esta en 0 Bs. Selecciona una estacion, promo o snack.').fadeIn('fast');
            registrarBitacora('ERROR VALIDACION', 'Intento de confirmacion con carrito en 0 Bs');
            return;
        }

        var listaItemsCapturados = [];
        var listaEstacionesOrden = [];
        $('#lista-carrito li:not(.carrito-vacio)').each(function () {
            listaItemsCapturados.push($(this).text().trim());
            var estId = $(this).attr('data-estacion-id');
            if (estId) {
                listaEstacionesOrden.push({
                    codigo: estId,
                    detalle: $(this).attr('data-detalle-estacion') || $(this).text().trim()
                });
            }
        });

        var guardadoNubeOk = false;
        if (navigator.onLine && typeof guardarPedidoNube === 'function') {
            var resPedidoNube = await guardarPedidoNube({
                cliente: nombreCliente,
                modalidad: modalidad,
                formaPago: formaPago,
                montoTotal: totalPagar,
                items: listaItemsCapturados
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
            var registroSolicitudOffline = {
                cliente: nombreCliente,
                modalidad: modalidad,
                formaPago: formaPago,
                montoTotal: totalPagar,
                items: listaItemsCapturados,
                estaciones: listaEstacionesOrden,
                fechaHora: new Date().toISOString()
            };

            encolarOperacionOfflineFIFO('pedido', registroSolicitudOffline);
            registrarActividadCliente('PEDIDO_CONFIRMADO', nombreCliente + ' | ' + totalPagar + ' Bs | ' + modalidad + ' (Offline)');

            detenerTimerModal();
            $('#modal-confirmacion').fadeOut('fast');
            this.reset();
            var $vacioOffline = $('<li>').addClass('carrito-vacio').text('Sin reservas ni snacks activos.');
            $('#lista-carrito').empty().append($vacioOffline);
            $('#modal-resumen-lista').empty();
            totalPagar = 0;
            totalItems = 0;
            promoReclamada = false;
            actualizarTotalesHUD();
            actualizarMetricasAdmin();
            sincronizarEstadoEstaciones();

            mostrarToastAlerta('GUARDADO LOCALMENTE', 'Orden encolada localmente en FIFO para sincronizar con Supabase.', 'toast-alerta-naranja');
            registrarBitacora('OFFLINE STORE', 'Pedido encolado localmente para ' + nombreCliente + ' (' + registroSolicitudOffline.montoTotal + ' Bs)');
            return;
        }

        detenerTimerModal();
        $('#modal-confirmacion').fadeOut('fast');

        agregarReservaPanelEncargado(listaItemsCapturados.join(' | ') + ' [' + totalPagar + ' Bs]', nombreCliente);
        registrarActividadCliente('PEDIDO_CONFIRMADO', nombreCliente + ' | ' + totalPagar + ' Bs | ' + modalidad);

        registrarBitacora('TRANSACCION EXITOSA', 'Cliente: ' + nombreCliente + ' | Modalidad: ' + modalidad + ' | Pago: ' + formaPago + ' | Total: ' + totalPagar + ' Bs');
        mostrarToastAlerta('TICKET CONFIRMADO (' + totalPagar + ' BS)', 'Jugador: ' + nombreCliente + ' | Pago: ' + formaPago + ' | ' + modalidad);

        var $vacioOnline = $('<li>').addClass('carrito-vacio').text('Sin reservas ni snacks activos.');
        $('#lista-carrito').empty().append($vacioOnline);
        $('#modal-resumen-lista').empty();
        this.reset();
        totalPagar = 0;
        totalItems = 0;
        promoReclamada = false;
        if (!promoExpirada && promocionActivaActual) {
            actualizarVistaPromoCliente(promocionActivaActual);
        }
        actualizarTotalesHUD();
        await sincronizarEstadoEstaciones();
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
        mostrarToastAlerta('ESTACION LIBERADA', codigoEst + ' vuelve a estar disponible para clientes.');
        registrarBitacora('GESTION ENCARGADO', 'Estacion liberada: ' + codigoEst);
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
            mostrarToastAlerta('VALIDACION', 'Completa el titulo y descripcion de la promocion.', 'toast-alerta-naranja');
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

        mostrarToastAlerta('PROMOCION PUBLICADA', tituloPromo + ' actualizada para los clientes.');
        registrarBitacora('PROMO EDITOR', 'Promocion actualizada: ' + tituloPromo + ' (' + precioPromo + ' Bs)');
    });

    $(document).off('click', '.btn-entregar-pedido').on('click', '.btn-entregar-pedido', async function () {
        var $btnEnt = $(this);
        var idPedido = $btnEnt.attr('data-pedido-id');
        if (idPedido && navigator.onLine && typeof marcarPedidoEntregadoNube === 'function') {
            $btnEnt.prop('disabled', true).text('Actualizando...');
            var resEnt = await marcarPedidoEntregadoNube(idPedido);
            if (resEnt && resEnt.ok) {
                mostrarToastAlerta('PEDIDO ENTREGADO', 'Orden marcada como entregada correctamente.');
                registrarBitacora('GESTION PEDIDOS', 'Pedido marcado como entregado: ' + idPedido);
                await cargarPedidosGestion();
                if (obtenerRolSesionActual() === 'admin') {
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
        sincronizarColaPendienteNube();
    });

    $(document).off('change', '#filtro-tipo-actividad').on('change', '#filtro-tipo-actividad', function () {
        renderizarFeedActividadFiltrado();
    });

    $(document).off('input keyup', '#filtro-cliente-actividad').on('input keyup', '#filtro-cliente-actividad', function () {
        renderizarFeedActividadFiltrado();
    });

    async function sincronizarColaPendienteNube() {
        if (sincronizacionFifoActiva || !navigator.onLine) return;
        var colaPendiente = obtenerColaOfflineLista();
        if (colaPendiente.length === 0) return;

        sincronizacionFifoActiva = true;
        var totalSincronizados = 0;

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
                    agregarReservaPanelEncargado((datosOperacion.items || []).join(' | ') + ' [' + importeTotal + ' Bs]', nombreTitular);
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

                totalSincronizados = totalSincronizados + 1;
                registrarBitacora('SINCRONIZACION FIFO', 'Operacion [' + tipoOperacion.toUpperCase() + '] sincronizada.');
            }

            if (colaPendiente.length === 0) {
                localStorage.removeItem('colaSincronizacionCiber');
            } else {
                localStorage.setItem('colaSincronizacionCiber', JSON.stringify(colaPendiente));
            }
            actualizarMetricasAdmin();
            await sincronizarEstadoEstaciones();
            if (obtenerRolSesionActual() === 'admin') {
                await cargarPanelAdminEjecutivo();
            }
            if (totalSincronizados > 0) {
                mostrarToastAlerta('SINCRONIZACION MASIVA', 'Conexion recuperada. Se procesaron ' + totalSincronizados + ' operaciones pendientes en FIFO.');
            }
        } finally {
            sincronizacionFifoActiva = false;
        }
    }

    window.addEventListener('online', async function () {
        actualizarEstadoRed();
        await sincronizarColaPendienteNube();
    });

    sincronizarEstadoEstaciones();

    registrarBitacora('SISTEMA HUD', 'HUD LevelUp inicializado con seguridad Anti-XSS y control por roles');

});
