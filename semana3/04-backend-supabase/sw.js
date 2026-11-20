// Semana 2 - Arquitectura PWA Offline-First
const NOMBRE_CACHE_ESTATICO = 'levelup-semana3-paso04-v5';
const RECURSOS_PRECACHE = [
    './',
    'index.html',
    'CSS/styles.css',
    'CSS/tarjeta.css',
    'CSS/layout.css',
    'JS/supabase-api.js',
    'JS/script.js',
    'JS/tarjeta.js',
    'JS/layout.js',
    'manifest.json',
    'data/snacks.json',
    'pwa/index.html',
    'pwa/horizontal.html',
    'pwa/styles.css',
    'pwa/styles-horizontal.css',
    'pwa/tarjeta.css',
    'pwa/layout.css',
    'pwa/script.js',
    'pwa/tarjeta.js',
    'pwa/layout.js',
    'pwa/manifest.json',
    'pwa/sw.js',
    'pwa/icons/icon-192.png',
    'pwa/icons/icon-512.png'
];

// Semana 2 - Instalacion Service Worker
self.addEventListener('install', function (eventoInstalacion) {
    eventoInstalacion.waitUntil(
        caches.open(NOMBRE_CACHE_ESTATICO).then(function (instanciaCache) {
            return instanciaCache.addAll(RECURSOS_PRECACHE);
        }).then(function () {
            return self.skipWaiting();
        })
    );
});

// Semana 2 - Activacion y Limpieza Cache
self.addEventListener('activate', function (eventoActivacion) {
    eventoActivacion.waitUntil(
        caches.keys().then(function (listaClavesCache) {
            return Promise.all(
                listaClavesCache.map(function (claveCacheActual) {
                    if (claveCacheActual !== NOMBRE_CACHE_ESTATICO) {
                        return caches.delete(claveCacheActual);
                    }
                })
            );
        }).then(function () {
            return self.clients.claim();
        })
    );
});

// Semana 3 - Backend Supabase
self.addEventListener('fetch', function (eventoPeticion) {
    if (eventoPeticion.request.url.includes('supabase.co')) return;
    eventoPeticion.respondWith(
        caches.match(eventoPeticion.request).then(function (respuestaCacheada) {
            if (respuestaCacheada) {
                return respuestaCacheada;
            }
            return fetch(eventoPeticion.request).then(function (respuestaServidor) {
                if (!respuestaServidor || respuestaServidor.status !== 200 || respuestaServidor.type === 'opaque') {
                    return respuestaServidor;
                }
                var copiaRespuestaServidor = respuestaServidor.clone();
                caches.open(NOMBRE_CACHE_ESTATICO).then(function (instanciaCache) {
                    instanciaCache.put(eventoPeticion.request, copiaRespuestaServidor);
                });
                return respuestaServidor;
            }).catch(function () {
                if (eventoPeticion.request.mode === 'navigate') {
                    return caches.match('index.html');
                }
            });
        })
    );
});
