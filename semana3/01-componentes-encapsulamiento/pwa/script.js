// Semana 1 - Inicializacion DOM y Eventos
$(document).ready(function () {

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
            return cadenaGuardada ? JSON.parse(cadenaGuardada) : [];
        } catch (errorLectura) {
            return [];
        }
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
            $listaFifo.append($('<li>').addClass('item-gestion vacio-gestion').text('Sin pedidos pendientes en cola FIFO.'));
        } else {
            for (var indiceCola = 0; indiceCola < colaPendiente.length; indiceCola++) {
                var registroCola = colaPendiente[indiceCola];
                var $filaCola = $('<li>').addClass('item-gestion');
                $filaCola.append($('<strong>').text('Cliente: ' + (registroCola.nombre || registroCola.cliente || 'Invitado')));
                $filaCola.append($('<span>').text('Total: ' + (registroCola.total || registroCola.montoTotal || 0) + ' Bs | Pago: ' + (registroCola.formaPago || 'N/A')));
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
    function aplicarPermisosRol(rolActivo, nombreUsuario) {
        $('.permiso-encargado, .permiso-admin').hide();
        $('#hud-jugador').text(nombreUsuario + ' (' + rolActivo.toUpperCase() + ')');

        if (rolActivo === 'encargado') {
            $('.permiso-encargado').show();
        } else if (rolActivo === 'admin') {
            $('.permiso-encargado, .permiso-admin').show();
        }

        $('.vista-hud').removeClass('vista-activa').hide();
        $('#vista-lobby').addClass('vista-activa').css('display', 'flex');
        $('.tab-tactil, .tab-rol').removeClass('activo');
        $('.tab-tactil[data-vista="vista-lobby"], .tab-rol[data-vista="vista-lobby"]').addClass('activo');
    }

    function verificarSesionInicial() {
        try {
            var sesionGuardada = localStorage.getItem('sesionRolLevelUp');
            if (sesionGuardada) {
                sesionActual = JSON.parse(sesionGuardada);
                if (sesionActual && sesionActual.usuario && sesionActual.rol) {
                    aplicarPermisosRol(sesionActual.rol, sesionActual.usuario);
                    $('#pantalla-login').hide();
                    return;
                }
            }
        } catch (errorSesion) {
            localStorage.removeItem('sesionRolLevelUp');
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
                var $tarjetaEstacion = $('<div>').addClass('estacion').attr({
                    'data-tipo': 'consola',
                    'data-codigo': codigoEstacion,
                    'data-precio': precioHora
                });
                var $filaSuperior = $('<div>').addClass('est-top');
                var $tituloEstacion = $('<h4>').text(codigoEstacion);

                if (numeroEstacion === 3 || numeroEstacion === 8) {
                    $tarjetaEstacion.addClass('estado-uso');
                    $filaSuperior.append($tituloEstacion, $('<span>').addClass('badge-estado').text('En Uso'));
                    $tarjetaEstacion.append($filaSuperior);
                } else if (numeroEstacion === 6) {
                    $tarjetaEstacion.addClass('estado-reservado');
                    $filaSuperior.append($tituloEstacion, $('<span>').addClass('badge-estado').text('Reservado'));
                    $tarjetaEstacion.append($filaSuperior);
                } else {
                    $tarjetaEstacion.addClass('estado-disponible');
                    $filaSuperior.append($tituloEstacion, $('<span>').addClass('badge-estado').text('Libre'));

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
                    $selectHoras.append($('<option>').attr('value', '1').text('1h'));
                    $selectHoras.append($('<option>').attr('value', '2').text('2h'));
                    $selectHoras.append($('<option>').attr('value', '3').text('3h'));
                    $selectHoras.append($('<option>').attr('value', '4').text('4h'));
                    $filaControles.append($selectControles, $selectHoras);

                    var $botonReservar = $('<button>').addClass('btn-reservar-est').text('Reservar (' + precioHora + ' Bs/h)');
                    $tarjetaEstacion.append($filaSuperior, $selectJuego, $filaControles, $botonReservar);
                }
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

            var $tarjetaPC = $('<div>').addClass('estacion').attr({
                'data-tipo': 'pc',
                'data-gama': gamaPC,
                'data-codigo': codigoPC,
                'data-precio': precioPC
            });
            var $topPC = $('<div>').addClass('est-top').append($('<h4>').text(codigoPC));

            if (numeroPC === 2 || numeroPC === 9 || numeroPC === 17) {
                $tarjetaPC.addClass('estado-uso');
                $topPC.append($('<span>').addClass('badge-estado').text('En Uso'));
                $tarjetaPC.append($topPC, $('<small>').text(specPC));
            } else {
                $tarjetaPC.addClass('estado-disponible');
                $topPC.append($('<span>').addClass('badge-estado').text(gamaPC.toUpperCase()));

                var $selectJuegoPC = $('<select>').addClass('select-juego-estacion');
                for (var idxJuegoPC = 0; idxJuegoPC < listaJuegosPC.length; idxJuegoPC++) {
                    $selectJuegoPC.append($('<option>').attr('value', listaJuegosPC[idxJuegoPC]).text(listaJuegosPC[idxJuegoPC]));
                }

                var $selectHorasPC = $('<select>').addClass('select-horas-estacion');
                $selectHorasPC.append($('<option>').attr('value', '1').text('1 Hora (' + precioPC + ' Bs)'));
                $selectHorasPC.append($('<option>').attr('value', '2').text('2 Horas (' + (precioPC * 2) + ' Bs)'));
                $selectHorasPC.append($('<option>').attr('value', '3').text('3 Horas (' + (precioPC * 3) + ' Bs)'));
                $selectHorasPC.append($('<option>').attr('value', '5').text('5 Horas (' + (precioPC * 5) + ' Bs)'));

                var $botonPC = $('<button>').addClass('btn-reservar-est').text('Ocupar (' + precioPC + ' Bs/h)');
                $tarjetaPC.append($topPC, $('<small>').text(specPC), $selectJuegoPC, $selectHorasPC, $botonPC);
            }
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

            var $tarjetaArc = $('<div>').addClass('estacion').attr({
                'data-tipo': 'arcade',
                'data-codigo': codigoArcade,
                'data-juego': tituloJuegoArcade
            });
            var $topArc = $('<div>').addClass('est-top').append($('<h4>').text(codigoArcade));

            if (numArc === 5 || numArc === 18) {
                $tarjetaArc.addClass('estado-uso');
                $topArc.append($('<span>').addClass('badge-estado').text('En Uso'));
                $tarjetaArc.append($topArc, $('<small>').text(tituloJuegoArcade));
            } else {
                $tarjetaArc.addClass('estado-disponible');
                $topArc.append($('<span>').addClass('badge-estado').text('Libre'));

                var $selectModalidadArc = $('<select>').addClass('select-modo-arcade');
                $selectModalidadArc.append($('<option>').attr({ value: 'hora', 'data-precio': '10' }).text('Por Hora (10 Bs)'));
                $selectModalidadArc.append($('<option>').attr({ value: 'fichas5', 'data-precio': '10' }).text('5 Fichas (10 Bs)'));
                $selectModalidadArc.append($('<option>').attr({ value: 'fichas1', 'data-precio': '2' }).text('1 Ficha (2 Bs)'));

                var $botonArc = $('<button>').addClass('btn-reservar-arcade').text('Reservar Arcade');
                $tarjetaArc.append($topArc, $('<small>').text(tituloJuegoArcade), $selectModalidadArc, $botonArc);
            }
            $grillaArcade.append($tarjetaArc);
        }
    }

    // Semana 2 - Renderizado Anti-XSS
    function renderizarTarjetasSnacks(listaProductos) {
        var $contenedorSnacks = $('.grilla-snacks');
        var svgRespaldoSnack = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 180'%3E%3Crect width='320' height='180' rx='12' fill='%2312172a'/%3E%3Crect x='110' y='52' width='100' height='76' rx='16' fill='none' stroke='%2300f3ff' stroke-width='4'/%3E%3Ccircle cx='160' cy='90' r='18' fill='none' stroke='%23ff00ea' stroke-width='4'/%3E%3Ctext x='160' y='155' text-anchor='middle' fill='%2300f3ff' font-family='sans-serif' font-size='14'%3ESNACK LEVELUP%3C/text%3E%3C/svg%3E";
        $contenedorSnacks.empty();

        $.each(listaProductos, function (indiceSnack, snackItem) {
            var nombreSnack = String(snackItem.nombre || '');
            var categoriaSnack = String(snackItem.categoria || '');
            var descripcionSnack = String(snackItem.descripcion || '');
            var precioSnack = Number(snackItem.precio || 0);
            var $tarjetaSnack = $('<article>').addClass('card-snack').attr({
                'data-categoria': categoriaSnack,
                'data-nombre': nombreSnack,
                'data-precio': precioSnack
            });

            var $tagCategoria = $('<span>').addClass('tag-snack').text(categoriaSnack.toUpperCase());
            var rutaImagen = String(snackItem.imagen || 'icons/icon-192.png');
            var $imagenSnack = $('<img>').addClass('img-snack-dinamica').attr({
                src: rutaImagen,
                srcset: rutaImagen + ' 150w, ' + rutaImagen + ' 600w, ' + rutaImagen + ' 1080w',
                sizes: '(max-width: 600px) 150px, 600px',
                loading: 'lazy',
                alt: nombreSnack || 'Snack LevelUp',
                width: '120',
                height: '120'
            }).on('error', function () {
                var nodoImagen = $(this);
                if (nodoImagen.attr('data-fallback-aplicado') === '1') {
                    return;
                }
                nodoImagen
                    .attr('data-fallback-aplicado', '1')
                    .attr('srcset', svgRespaldoSnack)
                    .attr('src', svgRespaldoSnack);
            });
            var $tituloSnack = $('<h4>').text(nombreSnack);
            var $descSnack = $('<p>').text(descripcionSnack);
            var $precioSnack = $('<div>').addClass('precio-snack').text(precioSnack + ' Bs');
            var $botonSnack = $('<button>').attr('type', 'button').addClass('btn-pedir-snack').text('Agregar al Pedido');

            $tarjetaSnack.append($tagCategoria, $imagenSnack, $tituloSnack, $descSnack, $precioSnack, $botonSnack);
            $contenedorSnacks.append($tarjetaSnack);
        });
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
        if (idVista === 'vista-encargado' && (!sesionActual || (sesionActual.rol !== 'encargado' && sesionActual.rol !== 'admin'))) {
            mostrarToast('ACCESO RESTRINGIDO', 'Vista exclusiva para Encargado o Administrador.', true);
            return;
        }
        if (idVista === 'vista-bitacora' && (!sesionActual || sesionActual.rol !== 'admin')) {
            mostrarToast('ACCESO RESTRINGIDO', 'Bitacora exclusiva para Administrador.', true);
            return;
        }

        $('.vista-hud').removeClass('vista-activa').hide();
        $('#' + idVista).addClass('vista-activa').css('display', 'flex');
        $('.tab-tactil, .tab-rol').removeClass('activo');
        $('.tab-tactil[data-vista="' + idVista + '"], .tab-rol[data-vista="' + idVista + '"]').addClass('activo');

        if (idVista === 'vista-bitacora') {
            actualizarMetricasAdmin();
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

    function agregarItemCarrito(nombreProducto, precioUnitario, cantidadItems) {
        if ($('#lista-carrito .carrito-vacio').length > 0) {
            $('#lista-carrito').empty();
        }
        var subtotalCalculado = precioUnitario * cantidadItems;
        totalItems += 1;

        var $itemLista = $('<li>').addClass('item-carrito-li').attr({
            'data-subtotal': subtotalCalculado,
            'data-nombre': nombreProducto
        });
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

    function iniciarCronometroOferta10Minutos() {
        clearInterval(intervaloPromo10m);
        intervaloPromo10m = setInterval(function () {
            segundosPromo10m--;
            if (segundosPromo10m <= 0) {
                clearInterval(intervaloPromo10m);
                promoExpirada = true;
                $('#timer-oferta-10m').text('00:00');
                $('#estado-promo-badge').text('OFERTA EXPIRADA');
                $('#btn-reclamar-promo').prop('disabled', true).text('OFERTA EXPIRADA');
                registrarEvento('SISTEMA OFERTA', 'La oferta relampago de 10 minutos expiro.');
                return;
            }
            var minutosTexto = Math.floor(segundosPromo10m / 60);
            var segundosTexto = segundosPromo10m % 60;
            $('#timer-oferta-10m').text((minutosTexto < 10 ? '0' + minutosTexto : minutosTexto) + ':' + (segundosTexto < 10 ? '0' + segundosTexto : segundosTexto));
        }, 1000);
    }

    // Semana 2 - Arquitectura PWA Offline-First FIFO
    function sincronizarColaPendiente() {
        var colaPendiente = obtenerColaSincronizacion();
        if (colaPendiente.length === 0) {
            return;
        }
        var cantidadSincronizada = 0;
        while (colaPendiente.length > 0) {
            const registroActual = colaPendiente.shift();
            const nombreTitular = registroActual.cliente || registroActual.nombre;
            const importeTotal = registroActual.montoTotal || registroActual.total;
            cantidadSincronizada++;
            registrarEvento('SYNC FIFO ONLINE', 'Sincronizado pedido de ' + nombreTitular + ' (' + importeTotal + ' Bs)');
            agregarReservaParaEncargado(nombreTitular, registroActual.modalidad, importeTotal, registroActual.items);
        }
        localStorage.removeItem('colaSincronizacionCiber');
        actualizarMetricasAdmin();
        mostrarToast('CONEXION RESTAURADA', 'Se sincronizaron ' + cantidadSincronizada + ' pedidos pendientes FIFO.', false);
    }

    $(document).off('click', '.btn-preset-rol').on('click', '.btn-preset-rol', function () {
        var rolSeleccionado = $(this).attr('data-rol');
        $('#login-rol').val(rolSeleccionado);
        if (!$('#login-usuario').val().trim()) {
            var aliasDefault = rolSeleccionado === 'admin' ? 'AdminRoot' : (rolSeleccionado === 'encargado' ? 'StaffLevelUp' : 'GamerPro');
            $('#login-usuario').val(aliasDefault);
        }
    });

    $(document).off('submit', '#form-login-rol').on('submit', '#form-login-rol', function (eventoSubmit) {
        eventoSubmit.preventDefault();
        var usuarioIngresado = $('#login-usuario').val().trim();
        var rolSeleccionado = $('#login-rol').val();

        if (usuarioIngresado === '') {
            $('#login-error').text('Ingresa un nombre o GamerTag valido.').slideDown('fast');
            return;
        }

        $('#login-error').hide();
        sesionActual = { usuario: usuarioIngresado, rol: rolSeleccionado };
        localStorage.setItem('sesionRolLevelUp', JSON.stringify(sesionActual));
        aplicarPermisosRol(rolSeleccionado, usuarioIngresado);
        $('#pantalla-login').fadeOut('fast');
        registrarEvento('SESION INICIADA', 'Usuario: ' + usuarioIngresado + ' | Rol: ' + rolSeleccionado.toUpperCase());
        mostrarToast('SESION ACTIVA', 'Bienvenido ' + usuarioIngresado + ' (' + rolSeleccionado + ').', false);
    });

    $(document).off('click', '#btn-cerrar-sesion').on('click', '#btn-cerrar-sesion', function () {
        localStorage.removeItem('sesionRolLevelUp');
        sesionActual = null;
        $('.permiso-encargado, .permiso-admin').hide();
        cambiarVistaHUD('vista-lobby', '', 'Lobby');
        $('#pantalla-login').fadeIn('fast');
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
        if (promoExpirada || promoReclamada) {
            return;
        }
        promoReclamada = true;
        clearInterval(intervaloPromo10m);
        agregarItemCarrito($(this).attr('data-nombre'), parseInt($(this).attr('data-precio'), 10), 1);
        $('#toggle-promo').prop('checked', false);
        $(this).prop('disabled', true).text('PROMO RECLAMADA');
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
        var consolaFiltro = $(this).attr('data-consola');
        var temaAsociado = $(this).attr('data-tema');
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
        var gamaFiltro = $(this).attr('data-gama');
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
        var categoriaFiltro = $(this).attr('data-categoria');
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
        var detalleReserva = codigoEst + ' [' + juegoElegido + ' | ' + cantidadHoras + 'h]';
        var extraPorControles = 0;

        if ($tarjeta.attr('data-tipo') === 'consola') {
            var cantControles = parseInt($tarjeta.find('.select-cant-controles').val(), 10) || 1;
            if (cantControles >= 3) {
                extraPorControles = (cantControles - 2) * 3;
            }
            detalleReserva += ' (' + cantControles + ' Ctrls)';
        }
        agregarItemCarrito(detalleReserva, (tarifaBase + extraPorControles) * cantidadHoras, 1);
    });

    $(document).off('click', '.btn-reservar-arcade').on('click', '.btn-reservar-arcade', function () {
        var $tarjetaArc = $(this).closest('.estacion');
        var $opcionModalidad = $tarjetaArc.find('.select-modo-arcade option:selected');
        var codigoArc = $tarjetaArc.attr('data-codigo');
        var juegoArc = $tarjetaArc.attr('data-juego');
        var precioArc = parseInt($opcionModalidad.attr('data-precio'), 10);
        agregarItemCarrito(codigoArc + ' ' + juegoArc + ' (' + $opcionModalidad.text() + ')', precioArc, 1);
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
        $('#lista-carrito').html('<li class="carrito-vacio">Sin reservas ni snacks activos.</li>');
        actualizarTotalVisual(0);
    });

    // Semana 1 - Bitacora Dia 1 Keyup Buscador
    $(document).off('keyup', '#buscador-rapido').on('keyup', '#buscador-rapido', function () {
        var consultaBusqueda = $(this).val().toLowerCase().trim();
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
        }
    });

    // Semana 1 - Validacion Formulario con Regex
    $(document).off('submit', '#form-consulta-cliente').on('submit', '#form-consulta-cliente', function (eventoConsulta) {
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

        var $listaConsultas = $('#lista-consultas-encargado');
        if ($listaConsultas.find('.vacio-gestion').length > 0) {
            $listaConsultas.empty();
        }
        var $itemConsulta = $('<li>').addClass('item-gestion');
        var $autorTexto = $('<strong>').text(nombreRemitente + ' (' + correoRemitente + ')');
        var $mensajeTexto = $('<p>').text(textoConsulta);
        var $cajaRespuesta = $('<div>').addClass('respuesta-encargado-box');
        var $inputRespuesta = $('<input>').attr('type', 'text').attr('placeholder', 'Escribir respuesta al cliente...').addClass('input-respuesta-encargado');
        var $botonResponder = $('<button>').attr('type', 'button').addClass('btn-responder-consulta').text('Enviar Respuesta');
        var $salidaRespuesta = $('<span>').addClass('texto-respuesta-emitida');
        $cajaRespuesta.append($inputRespuesta, $botonResponder, $salidaRespuesta);
        $itemConsulta.append($autorTexto, $mensajeTexto, $cajaRespuesta);
        $listaConsultas.prepend($itemConsulta);

        $('#form-consulta-cliente')[0].reset();
        registrarEvento('CONSULTA CLIENTE', 'Nueva consulta de ' + nombreRemitente);
    });

    // Semana 2 - Reservas Anti-XSS
    $(document).off('submit', '#formReserva').on('submit', '#formReserva', function (eventoSubmit) {
        eventoSubmit.preventDefault();
        const nombreCliente = $('#clienteNombre').val().trim();
        const salaElegida = $('#salaSelect').val();
        if (!nombreCliente) return;
        const $itemReserva = $('<li>').addClass('item-reserva');
        const $textoSeguro = $('<strong>').text(nombreCliente + ' - ');
        const $detalleSala = $('<span>').text(salaElegida);
        $itemReserva.append($textoSeguro, $detalleSala);
        $('#listaReservas').append($itemReserva);
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
        registrarEvento('COLA MUSICAL', 'Peticion agregada: ' + temaPedido);
    });

    $(document).off('click', '.btn-quitar').on('click', '.btn-quitar', function () {
        $(this).closest('.fila-cancion').remove();
        registrarEvento('COLA MUSICAL', 'Peticion eliminada de la cola.');
    });

    // Semana 2 - Gestion Encargado Stock en Vivo
    $(document).off('submit', '#form-nuevo-snack').on('submit', '#form-nuevo-snack', function (eventoSnack) {
        eventoSnack.preventDefault();
        var nombreProducto = $('#nuevo-snack-nombre').val().trim();
        var categoriaProducto = $('#nuevo-snack-categoria').val();
        var precioProducto = parseInt($('#nuevo-snack-precio').val(), 10) || 15;
        var descripcionProducto = $('#nuevo-snack-desc').val().trim() || 'Agregado por encargado en vivo.';

        if (nombreProducto === '') {
            mostrarToast('CAMPO REQUERIDO', 'Ingresa el nombre del snack.', true);
            return;
        }

        var imagenFallback = listaSnacksGlobal.length > 0 ? listaSnacksGlobal[0].imagen : '';
        listaSnacksGlobal.push({
            nombre: nombreProducto,
            categoria: categoriaProducto,
            precio: precioProducto,
            descripcion: descripcionProducto,
            imagen: imagenFallback
        });
        renderizarTarjetasSnacks(listaSnacksGlobal);
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

    $(document).off('submit', '#form-checkout').on('submit', '#form-checkout', function (eventoCheckout) {
        eventoCheckout.preventDefault();
        var nombreCliente = $('#input-nombre-cliente').val().trim();
        var modalidadElegida = $('#select-modalidad').val();
        var formaPagoElegida = $('#forma-pago').val();

        if (nombreCliente === '') {
            $('#modal-error').text('Ingresa el nombre del jugador o cliente.').slideDown('fast');
            return;
        }

        var arregloItems = [];
        $('#lista-carrito .item-carrito-li').each(function () {
            arregloItems.push($(this).attr('data-nombre') + ' (' + $(this).attr('data-subtotal') + ' Bs)');
        });

        clearInterval(intervaloModal);
        $('#modal-confirmacion').fadeOut('fast');

        if (!navigator.onLine) {
            var colaOffline = obtenerColaSincronizacion();
            colaOffline.push({
                cliente: nombreCliente,
                modalidad: modalidadElegida,
                formaPago: formaPagoElegida,
                montoTotal: totalPagar,
                items: arregloItems,
                fechaHora: new Date().toISOString()
            });
            localStorage.setItem('colaSincronizacionCiber', JSON.stringify(colaOffline));
            $('#form-checkout')[0].reset();
            totalItems = 0;
            $('#lista-carrito').html('<li class="carrito-vacio">Sin reservas ni snacks activos.</li>');
            actualizarTotalVisual(0);
            actualizarMetricasAdmin();
            mostrarToast('GUARDADO LOCALMENTE (OFFLINE)', 'Pedido guardado en cola FIFO para sincronizar.', true);
            registrarEvento('OFFLINE FIFO', 'Pedido guardado en cola local: ' + nombreCliente);
            return;
        }

        agregarReservaParaEncargado(nombreCliente, modalidadElegida, totalPagar, arregloItems);
        $('#form-checkout')[0].reset();
        totalItems = 0;
        $('#lista-carrito').html('<li class="carrito-vacio">Sin reservas ni snacks activos.</li>');
        actualizarTotalVisual(0);
        mostrarToast('PEDIDO CONFIRMADO', 'Orden registrada para ' + nombreCliente + ' via ' + formaPagoElegida + '.', false);
        registrarEvento('CHECKOUT CONFIRMADO', 'Cliente: ' + nombreCliente + ' | Pago: ' + formaPagoElegida);
    });

    $(document).off('click', '#btn-limpiar-log').on('click', '#btn-limpiar-log', function () {
        $('#log-output').empty();
        contadorEventosSistema = 0;
        actualizarMetricasAdmin();
        registrarEvento('SISTEMA ADMIN', 'Bitacora purgada por administrador.');
    });

    // Semana 2 - Sincronizacion Offline FIFO
    $(window).off('online offline').on('online offline', function () {
        actualizarEstadoRed();
        if (navigator.onLine) {
            sincronizarColaPendiente();
        } else {
            registrarEvento('RED OFFLINE', 'Conexion perdida. Modo Store & Forward activo.');
            mostrarToast('MODO OFFLINE ACTIVO', 'Los pedidos se guardaran localmente en cola FIFO.', true);
        }
    });

    verificarSesionInicial();
    actualizarEstadoRed();
    inicializarEstacionesConsolas();
    inicializarEstacionesPC();
    inicializarEstacionesArcades();
    cargarCatalogoSnacks();
    iniciarCronometroOferta10Minutos();
    actualizarMetricasAdmin();
    registrarEvento('SISTEMA PWA', 'HUD Movil Offline-First inicializado');
});
