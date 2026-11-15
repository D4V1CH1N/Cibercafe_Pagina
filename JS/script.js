$(document).ready(function () {

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

    function actualizarMetricasAdmin() {
        var colaLocal = localStorage.getItem('colaSincronizacionCiber');
        var cantidadCola = colaLocal ? JSON.parse(colaLocal).length : 0;
        $('#metrica-eventos').text(contadorEventos);
        $('#metrica-reservas').text(contadorReservasAprobadas);
        $('#metrica-cola').text(cantidadCola);
        $('#metrica-likes').text(contadorLikes);
    }

    function registrarBitacora(tipoEvento, detalleEvento) {
        contadorEventos = contadorEventos + 1;
        var horaExacta = new Date().toLocaleTimeString();

        var $filaLog = $('<div>').addClass('log-item');
        var $spanHora = $('<span>').addClass('log-hora').text('[' + horaExacta + '] ');
        var $spanTipo = $('<span>').addClass('log-tipo').text('[' + tipoEvento + '] ');
        var $spanDetalle = $('<span>').text(detalleEvento);

        $filaLog.append($spanHora, $spanTipo, $spanDetalle);
        $('#log-output').prepend($filaLog);
        $('#log-mini').prepend($filaLog.clone());
        actualizarMetricasAdmin();
    }

    function actualizarEstadoRed() {
        var $badgeRed = $('#estado-red-hud');
        if (navigator.onLine) {
            $badgeRed.removeClass('offline').text('EN LINEA');
        } else {
            $badgeRed.addClass('offline').text('OFFLINE LOCAL');
        }
    }

    function aplicarPermisosRol(sesionObj) {
        if (!sesionObj || !sesionObj.rol) {
            $('#pantalla-login').fadeIn('fast');
            $('.solo-encargado, .solo-admin').hide();
            return;
        }

        $('#pantalla-login').fadeOut('fast');
        var rolActual = sesionObj.rol;
        var etiquetaRol = rolActual === 'admin' ? 'ADMINISTRADOR' : (rolActual === 'encargado' ? 'ENCARGADO' : 'CLIENTE');
        $('#hud-jugador').text(etiquetaRol + ': ' + sesionObj.usuario);

        if (rolActual === 'cliente') {
            $('.solo-encargado, .solo-admin').hide();
        } else if (rolActual === 'encargado') {
            $('.solo-encargado').show();
            $('.solo-admin').hide();
        } else if (rolActual === 'admin') {
            $('.solo-encargado, .solo-admin').show();
        }

        registrarBitacora('SESION ROL', 'Acceso autorizado como ' + etiquetaRol + ' (' + sesionObj.usuario + ')');
    }

    function verificarSesionInicial() {
        var sesionGuardada = localStorage.getItem('sesionRolLevelUp');
        if (sesionGuardada) {
            try {
                var sesionParseada = JSON.parse(sesionGuardada);
                aplicarPermisosRol(sesionParseada);
            } catch (errorParseo) {
                localStorage.removeItem('sesionRolLevelUp');
                aplicarPermisosRol(null);
            }
        } else {
            aplicarPermisosRol(null);
        }
    }

    function construirOpcionesJuegos(claveConsola) {
        var juegos = catalogoJuegosConsola[claveConsola] || [];
        var opcionesHtml = '';
        for (var indiceJuego = 0; indiceJuego < juegos.length; indiceJuego++) {
            opcionesHtml += '<option value="' + juegos[indiceJuego] + '">' + (indiceJuego + 1) + '. ' + juegos[indiceJuego] + '</option>';
        }
        return opcionesHtml;
    }

    function inicializarEstacionesConsolas() {
        $('.grilla-estaciones-compacta[data-generar-consola]').each(function () {
            var $grilla = $(this);
            var clave = $grilla.attr('data-generar-consola');
            var prefijo = $grilla.attr('data-prefijo');
            var precio = parseInt($grilla.attr('data-precio'), 10) || 15;
            var opcionesJuegos = construirOpcionesJuegos(clave);
            var htmlEstaciones = '';

            for (var numeroEstacion = 1; numeroEstacion <= 10; numeroEstacion++) {
                var numStr = numeroEstacion < 10 ? '0' + numeroEstacion : '' + numeroEstacion;
                var codigo = prefijo + '-' + numStr;

                if (numeroEstacion === 3 || numeroEstacion === 8) {
                    htmlEstaciones +=
                        '<div class="estacion estado-uso" data-tipo="consola" data-codigo="' + codigo + '" data-precio="' + precio + '">' +
                        '<div class="est-top"><h4>' + codigo + '</h4><span class="badge-estado">En Uso</span></div>' +
                        '</div>';
                } else if (numeroEstacion === 6) {
                    htmlEstaciones +=
                        '<div class="estacion estado-reservado" data-tipo="consola" data-codigo="' + codigo + '" data-precio="' + precio + '">' +
                        '<div class="est-top"><h4>' + codigo + '</h4><span class="badge-estado">Reservado</span></div>' +
                        '</div>';
                } else {
                    htmlEstaciones +=
                        '<div class="estacion estado-disponible" data-tipo="consola" data-codigo="' + codigo + '" data-precio="' + precio + '">' +
                        '<div class="est-top"><h4>' + codigo + '</h4><span class="badge-estado">Disponible</span></div>' +
                        '<div class="controles-reserva">' +
                        '<label>Juego (20 disponibles):</label>' +
                        '<select class="select-juego">' + opcionesJuegos + '</select>' +
                        '<div class="fila-inline-reserva">' +
                        '<div><label>Mandos:</label>' +
                        '<select class="select-controles">' +
                        '<option value="0" data-texto="1 Control">1 Control (+0)</option>' +
                        '<option value="5" data-texto="2 Controles">2 Controles (+5)</option>' +
                        '<option value="10" data-texto="3 Controles">3 Controles (+10)</option>' +
                        '<option value="15" data-texto="4 Controles">4 Controles (+15)</option>' +
                        '</select></div>' +
                        '<div><label>Horas:</label>' +
                        '<input type="number" class="input-horas" value="1" min="1" max="8"></div>' +
                        '</div>' +
                        '<div class="subtotal-estacion">Subtotal: <span class="val-subtotal">' + precio + '</span> Bs</div>' +
                        '<button class="btn-reservar-estacion">Reservar</button>' +
                        '</div>' +
                        '</div>';
                }
            }
            $grilla.html(htmlEstaciones);
        });
    }

    function inicializarEstacionesPC() {
        var htmlPCs = '';
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

            if (numeroPc === 4 || numeroPc === 11 || numeroPc === 18) {
                htmlPCs +=
                    '<div class="estacion estado-uso item-pc" data-gama="' + gama + '" data-tipo="pc" data-codigo="' + codigo + '" data-nombre="' + nombreGama + '" data-precio="' + precio + '">' +
                    '<div class="est-top"><h4>' + codigo + ' (' + precio + ' Bs/h)</h4><span class="badge-estado">En Uso</span></div>' +
                    '<p class="tarifa-tag">' + specs + '</p>' +
                    '</div>';
            } else if (numeroPc === 7 || numeroPc === 14) {
                htmlPCs +=
                    '<div class="estacion estado-reservado item-pc" data-gama="' + gama + '" data-tipo="pc" data-codigo="' + codigo + '" data-nombre="' + nombreGama + '" data-precio="' + precio + '">' +
                    '<div class="est-top"><h4>' + codigo + ' (' + precio + ' Bs/h)</h4><span class="badge-estado">Reservado</span></div>' +
                    '<p class="tarifa-tag">' + specs + '</p>' +
                    '</div>';
            } else {
                htmlPCs +=
                    '<div class="estacion estado-disponible item-pc" data-gama="' + gama + '" data-tipo="pc" data-codigo="' + codigo + '" data-nombre="' + nombreGama + '" data-precio="' + precio + '">' +
                    '<div class="est-top"><h4>' + codigo + ' (' + precio + ' Bs/h)</h4><span class="badge-estado">Disponible</span></div>' +
                    '<p class="tarifa-tag">' + specs + '</p>' +
                    '<div class="controles-reserva">' +
                    '<label>Horas de Juego:</label>' +
                    '<input type="number" class="input-horas" value="1" min="1" max="8">' +
                    '<div class="subtotal-estacion">Subtotal: <span class="val-subtotal">' + precio + '</span> Bs</div>' +
                    '<button class="btn-reservar-estacion">Reservar PC</button>' +
                    '</div>' +
                    '</div>';
            }
        }
        $('#grilla-20-pcs').html(htmlPCs);
    }

    function inicializarMaquinasArcade() {
        var htmlArcades = '';
        for (var indiceArcade = 0; indiceArcade < lista25Arcades.length; indiceArcade++) {
            var numeroArcade = indiceArcade + 1;
            var numStr = numeroArcade < 10 ? '0' + numeroArcade : '' + numeroArcade;
            var juego = lista25Arcades[indiceArcade];
            var codigo = 'ARC-' + numStr;

            if (numeroArcade === 5 || numeroArcade === 12 || numeroArcade === 20) {
                htmlArcades +=
                    '<div class="estacion estado-uso" data-tipo="arcade" data-codigo="' + codigo + '" data-nombre="' + juego + '" data-precio="10">' +
                    '<div class="est-top"><h4>' + numStr + '. ' + juego + '</h4><span class="badge-estado">En Uso</span></div>' +
                    '</div>';
            } else if (numeroArcade === 9 || numeroArcade === 17) {
                htmlArcades +=
                    '<div class="estacion estado-reservado" data-tipo="arcade" data-codigo="' + codigo + '" data-nombre="' + juego + '" data-precio="10">' +
                    '<div class="est-top"><h4>' + numStr + '. ' + juego + '</h4><span class="badge-estado">Reservado</span></div>' +
                    '</div>';
            } else {
                htmlArcades +=
                    '<div class="estacion estado-disponible" data-tipo="arcade" data-codigo="' + codigo + '" data-nombre="' + juego + '" data-precio="10">' +
                    '<div class="est-top"><h4>' + numStr + '. ' + juego + '</h4><span class="badge-estado">Disponible</span></div>' +
                    '<div class="controles-reserva">' +
                    '<div class="fila-inline-reserva">' +
                    '<div><label>Modalidad:</label>' +
                    '<select class="select-modo-arcade">' +
                    '<option value="10" data-unidad="Hora(s)">Hora Libre (10 Bs)</option>' +
                    '<option value="2" data-unidad="Ficha(s)">Por Ficha (2 Bs)</option>' +
                    '</select></div>' +
                    '<div><label>Cant.:</label>' +
                    '<input type="number" class="input-horas" value="1" min="1" max="15"></div>' +
                    '</div>' +
                    '<div class="subtotal-estacion">Subtotal: <span class="val-subtotal">10</span> Bs</div>' +
                    '<button class="btn-reservar-estacion">Reservar Arcade</button>' +
                    '</div>' +
                    '</div>';
            }
        }
        $('#grilla-25-arcades').html(htmlArcades);
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
                var fragmentoHtml = '';
                for (var indiceSnack = 0; indiceSnack < datosCatalogoSnacks.length; indiceSnack++) {
                    var item = datosCatalogoSnacks[indiceSnack];
                    var claseCombo = item.esCombo ? ' card-combo' : '';
                    fragmentoHtml += `
                        <div class="card-snack${claseCombo}" data-categoria="${item.categoria}" data-prod="${item.nombre}" data-precio="${item.precio}">
                            <span class="tag-snack">${item.etiqueta}</span>
                            <img src="${item.imagen}" srcset="${item.imagen} 150w, ${item.imagen} 600w, ${item.imagen} 1080w" sizes="(max-width: 768px) 150px, (max-width: 1200px) 600px, 1080px" alt="${item.nombre}" loading="lazy" width="120" height="120" class="img-snack-dinamica">
                            <h3>${item.nombre}</h3>
                            <p>${item.descripcion}</p>
                            <div class="precio-snack">${item.precio} Bs</div>
                            <button class="btn-pedir-snack">Anadir al Pedido</button>
                        </div>`;
                }
                $('.grilla-snacks').html(fragmentoHtml);
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
        var sesionTexto = localStorage.getItem('sesionRolLevelUp');
        var rolUsuario = sesionTexto ? JSON.parse(sesionTexto).rol : 'cliente';

        if (idVista === 'vista-bitacora' && rolUsuario !== 'admin') {
            mostrarToastAlerta('ACCESO DENEGADO', 'La Bitacora DOM es exclusiva de Administrador.', 'toast-alerta-naranja');
            return;
        }
        if (idVista === 'vista-encargado' && rolUsuario === 'cliente') {
            mostrarToastAlerta('ACCESO DENEGADO', 'El panel de gestion es para Encargado o Admin.', 'toast-alerta-naranja');
            return;
        }

        $('.vista-hud').removeClass('vista-activa').stop(true, true).fadeOut('fast').promise().done(function () {
            $('#' + idVista).fadeIn('fast').addClass('vista-activa');
            if (idVista === 'vista-consolas') {
                activarFiltroConsolaEspecifico(consolaOpcional || 'todos', temaFondo || 'playstation', tituloTema || 'Hangar de Consolas');
            } else {
                aplicarTemaFondo(temaFondo, tituloTema);
            }
        });
    }

    function iniciarRelojPromo10Minutos() {
        intervaloPromo10m = setInterval(function () {
            if (segundosPromo10m > 0) {
                segundosPromo10m = segundosPromo10m - 1;
                var min = Math.floor(segundosPromo10m / 60);
                var seg = segundosPromo10m % 60;
                var minStr = min < 10 ? '0' + min : '' + min;
                var segStr = seg < 10 ? '0' + seg : '' + seg;
                $('#timer-oferta-10m').text(minStr + ':' + segStr);

                if (segundosPromo10m <= 0 && !promoExpirada) {
                    promoExpirada = true;
                    clearInterval(intervaloPromo10m);
                    $('#tarjeta-oferta-relampago').fadeOut('fast');
                    mostrarToastAlerta('OFERTA RELAMPAGO EXPIRADA', 'El cronometro de 10 minutos llego a 00:00.');
                    registrarBitacora('PROMO EXPIRADA', 'La Oferta Relampago PS5 + Pizza llego a 00:00');
                }
            }
        }, 1000);
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

        var $reservadas = $('.estacion.reservada-cliente');
        $reservadas.removeClass('estado-reservado reservada-cliente').addClass('estado-disponible');
        $reservadas.find('.badge-estado').text('Disponible');
        $reservadas.find('select, input, .btn-reservar-estacion').prop('disabled', false);
        $reservadas.find('.btn-reservar-estacion').text('Reservar');

        if (!promoExpirada) {
            promoReclamada = false;
            $('#btn-reclamar-promo').prop('disabled', false).text('Reclamar Promo (45 Bs + Pizza GRATIS)');
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
    iniciarRelojPromo10Minutos();
    actualizarEstadoRed();
    verificarSesionInicial();

    $(window).off('online offline').on('online offline', actualizarEstadoRed);

    $(document).off('click', '.btn-preset-rol').on('click', '.btn-preset-rol', function () {
        var rolElegido = $(this).attr('data-rol');
        var usuarioDefecto = rolElegido === 'admin' ? 'AdminRoot' : (rolElegido === 'encargado' ? 'StaffTurno' : 'GamerPro');
        $('#login-usuario').val(usuarioDefecto);
        $('#login-rol').val(rolElegido);
    });

    $(document).off('submit', '#form-login-rol').on('submit', '#form-login-rol', function (eventoSubmit) {
        eventoSubmit.preventDefault();
        var usuarioIngresado = $('#login-usuario').val().trim();
        var rolSeleccionado = $('#login-rol').val();

        if (usuarioIngresado === '') {
            $('#login-error').text('Ingresa tu nombre de usuario.').fadeIn('fast');
            return;
        }

        var nuevaSesion = {
            usuario: usuarioIngresado,
            rol: rolSeleccionado
        };
        localStorage.setItem('sesionRolLevelUp', JSON.stringify(nuevaSesion));
        $('#login-error').hide();
        aplicarPermisosRol(nuevaSesion);
        mostrarToastAlerta('SESION INICIADA', 'Bienvenido ' + usuarioIngresado + ' (' + rolSeleccionado.toUpperCase() + ').');
    });

    $(document).off('click', '#btn-cerrar-sesion').on('click', '#btn-cerrar-sesion', function () {
        localStorage.removeItem('sesionRolLevelUp');
        cambiarVistaExclusiva('vista-lobby', '', 'Lobby Principal');
        aplicarPermisosRol(null);
        registrarBitacora('SESION', 'Usuario cerro sesion para cambiar de rol');
    });

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
            registrarBitacora('FILTRO CASCADA', 'Capa 3 final: ' + modeloElegido + ' (' + zona + ')');
        }
    });

    $(document).off('submit', '#form-consulta-cliente').on('submit', '#form-consulta-cliente', function (eventoEnvio) {
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

        var $itemConsulta = $('<li>').addClass('item-gestion');
        var $autor = $('<strong>').text(nombreConsulta + ' (' + correoConsulta + ')');
        var $textoMsg = $('<p>').text(mensajeConsulta);
        var $cajaRespuesta = $('<div>').addClass('respuesta-encargado-box');
        var $inputResp = $('<input>').attr('type', 'text').attr('placeholder', 'Escribir respuesta al cliente...').addClass('input-respuesta-encargado');
        var $btnResp = $('<button>').attr('type', 'button').addClass('btn-responder-consulta').text('Enviar Respuesta');
        var $salidaResp = $('<span>').addClass('texto-respuesta-emitida');

        $cajaRespuesta.append($inputResp, $btnResp, $salidaResp);
        $itemConsulta.append($autor, $textoMsg, $cajaRespuesta);
        $('#lista-consultas-encargado .vacio-gestion').remove();
        $('#lista-consultas-encargado').prepend($itemConsulta);

        this.reset();
        $alerta.addClass('ok').text('Consulta enviada al encargado.').fadeIn('fast').delay(3000).fadeOut('slow');
        registrarBitacora('CONSULTA CLIENTE', 'Nueva consulta registrada de ' + nombreConsulta);
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

    $(document).off('submit', '#form-nuevo-snack').on('submit', '#form-nuevo-snack', function (eventoEnvio) {
        eventoEnvio.preventDefault();
        var nombreNuevo = $('#nuevo-snack-nombre').val().trim();
        var categoriaNueva = $('#nuevo-snack-categoria').val();
        var precioNuevo = parseInt($('#nuevo-snack-precio').val(), 10) || 15;
        var descNueva = $('#nuevo-snack-desc').val().trim();

        if (nombreNuevo === '' || descNueva === '') {
            mostrarToastAlerta('VALIDACION', 'Completa nombre y descripcion del snack.', 'toast-alerta-naranja');
            return;
        }

        var $nuevaCard = $('<div>')
            .addClass('card-snack')
            .attr('data-categoria', categoriaNueva)
            .attr('data-prod', nombreNuevo)
            .attr('data-precio', precioNuevo);

        var $tag = $('<span>').addClass('tag-snack').text('NUEVO STOCK');
        var $titulo = $('<h3>').text(nombreNuevo);
        var $desc = $('<p>').text(descNueva);
        var $precioDiv = $('<div>').addClass('precio-snack').text(precioNuevo + ' Bs');
        var $btnPedir = $('<button>').addClass('btn-pedir-snack').text('Anadir al Pedido');

        $nuevaCard.append($tag, $titulo, $desc, $precioDiv, $btnPedir);
        $('.grilla-snacks').prepend($nuevaCard);

        this.reset();
        mostrarToastAlerta('CATALOGO ACTUALIZADO', nombreNuevo + ' agregado al menu en vivo.');
        registrarBitacora('NUEVO PRODUCTO', 'Encargado agrego al catalogo: ' + nombreNuevo + ' (' + precioNuevo + ' Bs)');
    });

    $(document).off('click', '#btn-tema').on('click', '#btn-tema', function () {
        $('body').toggleClass('modo-claro');
        var esClaro = $('body').hasClass('modo-claro');
        $(this).text(esClaro ? 'Modo Noche' : 'Modo Claro');
        registrarBitacora('TEMA HUD', 'Alternado a ' + (esClaro ? 'Modo Claro' : 'Modo Noche'));
    });

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

    $(document).off('click', '.btn-nav-hud, .btn-acceso-lateral').on('click', '.btn-nav-hud, .btn-acceso-lateral', function () {
        var vistaDestino = $(this).attr('data-vista');
        var temaDestino = $(this).attr('data-tema') || '';
        var tituloDestino = $(this).attr('data-titulo') || 'Lobby Principal';
        var consolaDestino = $(this).attr('data-consola') || 'todos';
        if (vistaDestino) {
            cambiarVistaExclusiva(vistaDestino, temaDestino, tituloDestino, consolaDestino);
            registrarBitacora('NAVEGACION', 'Ingreso a: ' + tituloDestino);
        }
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

    $(document).off('dblclick', '#btn-like-lobby').on('dblclick', '#btn-like-lobby', function () {
        contadorLikes = contadorLikes + 5;
        $('#contador-likes').text(contadorLikes);
        actualizarMetricasAdmin();
        mostrarToastAlerta('SUPER LIKE GAMER', 'Doble clic detectado: +5 puntos de apoyo.');
        registrarBitacora('REACCION DBLCLICK', 'Super Like +5 aplicado (Total: ' + contadorLikes + ')');
    });

    $(document).off('keyup', '#buscador-rapido').on('keyup', '#buscador-rapido', function () {
        var texto = $(this).val().toLowerCase().trim();
        registrarBitacora('EVENTO KEYUP', 'Filtro de radar: "' + texto + '"');

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
        registrarBitacora('RADAR BUSQUEDA', 'Salto directo hacia: ' + titulo);
    });

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
        var $filaItem = $('<li>').addClass('item-seguro');
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
        var nombrePromo = $(this).attr('data-nombre');
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
        mostrarToastAlerta('PROMO RECLAMADA', 'PS5 (2h + 4 Controles) + Pizza Familiar 8 Porciones GRATIS agregada.');
        registrarBitacora('PROMO RELAMPAGO', 'Cliente reclamo la Promo PS5 + Pizza Familiar Gratis por ' + precioPromo + ' Bs');
    });

    $(document).off('click', '#btn-vaciar-carrito').on('click', '#btn-vaciar-carrito', function () {
        vaciarCarritoCompleto();
        registrarBitacora('CARRITO', 'El cliente vacio todos los items del carrito');
    });

    $(document).off('click', '#btn-limpiar-log').on('click', '#btn-limpiar-log', function () {
        $('#log-output').empty();
        $('#log-mini').empty();
        contadorEventos = 0;
        registrarBitacora('SISTEMA', 'Historial de bitacora reiniciado por Administrador');
    });

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

    $(document).off('submit', '#form-checkout').on('submit', '#form-checkout', function (eventoEnvio) {
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
        $('#lista-carrito li:not(.carrito-vacio)').each(function () {
            listaItemsCapturados.push($(this).text().trim());
        });

        if (!navigator.onLine) {
            var registroSolicitudOffline = {
                cliente: nombreCliente,
                modalidad: modalidad,
                formaPago: formaPago,
                montoTotal: totalPagar,
                items: listaItemsCapturados,
                fechaHora: new Date().toISOString()
            };

            var colaSerializada = localStorage.getItem('colaSincronizacionCiber');
            var colaPedidos = colaSerializada ? JSON.parse(colaSerializada) : [];
            colaPedidos.push(registroSolicitudOffline);
            localStorage.setItem('colaSincronizacionCiber', JSON.stringify(colaPedidos));

            detenerTimerModal();
            $('#modal-confirmacion').fadeOut('fast');
            this.reset();
            var $vacioOffline = $('<li>').addClass('carrito-vacio').text('Sin reservas ni snacks activos.');
            $('#lista-carrito').empty().append($vacioOffline);
            $('#modal-resumen-lista').empty();
            totalPagar = 0;
            totalItems = 0;
            actualizarTotalesHUD();
            actualizarMetricasAdmin();

            mostrarToastAlerta('GUARDADO LOCALMENTE', 'Sin conexion a red. Orden encolada para sincronizacion automatica.', 'toast-alerta-naranja');
            registrarBitacora('OFFLINE STORE', 'Pedido offline guardado localmente para ' + nombreCliente + ' (' + registroSolicitudOffline.montoTotal + ' Bs)');
            return;
        }

        detenerTimerModal();
        $('#modal-confirmacion').fadeOut('fast');

        agregarReservaPanelEncargado(listaItemsCapturados.join(' | ') + ' [' + totalPagar + ' Bs]', nombreCliente);

        if (promoReclamada || !promoExpirada) {
            promoExpirada = true;
            clearInterval(intervaloPromo10m);
            $('#tarjeta-oferta-relampago').fadeOut('fast');
        }

        registrarBitacora('TRANSACCION EXITOSA', 'Cliente: ' + nombreCliente + ' | Modalidad: ' + modalidad + ' | Pago: ' + formaPago + ' | Total: ' + totalPagar + ' Bs');
        mostrarToastAlerta('TICKET CONFIRMADO (' + totalPagar + ' BS)', 'Jugador: ' + nombreCliente + ' | Pago: ' + formaPago + ' | ' + modalidad);

        var $vacioOnline = $('<li>').addClass('carrito-vacio').text('Sin reservas ni snacks activos.');
        $('#lista-carrito').empty().append($vacioOnline);
        $('#modal-resumen-lista').empty();
        this.reset();
        totalPagar = 0;
        totalItems = 0;
        actualizarTotalesHUD();
    });

    window.addEventListener('online', function () {
        var colaSerializada = localStorage.getItem('colaSincronizacionCiber');
        if (colaSerializada) {
            var colaPedidos = JSON.parse(colaSerializada);
            if (Array.isArray(colaPedidos) && colaPedidos.length > 0) {
                var totalSincronizados = 0;
                while (colaPedidos.length > 0) {
                    let registro = colaPedidos.shift();
                    totalSincronizados = totalSincronizados + 1;
                    agregarReservaPanelEncargado(registro.items.join(' | ') + ' [' + registro.montoTotal + ' Bs]', registro.cliente);
                    registrarBitacora('SINCRONIZACION FIFO', 'Pedido sincronizado de: ' + registro.cliente + ' por ' + registro.montoTotal + ' Bs (' + registro.items.length + ' items)');
                }
                localStorage.removeItem('colaSincronizacionCiber');
                actualizarMetricasAdmin();
                mostrarToastAlerta('SINCRONIZACION MASIVA', 'Conexion recuperada. Se procesaron ' + totalSincronizados + ' pedidos pendientes exitosamente.');
            }
        }
    });

    registrarBitacora('SISTEMA HUD', 'HUD LevelUp inicializado con seguridad Anti-XSS y control por roles');

});
