// Semana 2 - Arquitectura PWA Offline-First
const NOMBRE_CACHE_PWA = 'levelup-semana3-paso04-pwa-v5';
const RECURSOS_PWA = [
    './',
    'index.html',
    'horizontal.html',
    'styles.css',
    'styles-horizontal.css',
    'tarjeta.css',
    'layout.css',
    '../JS/supabase-api.js',
    'script.js',
    'tarjeta.js',
    'layout.js',
    'manifest.json',
    '../data/snacks.json',
    'icons/icon-192.png',
    'icons/icon-512.png'
];

// Semana 2 - Instalacion Service Worker
self.addEventListener('install', function (eventoInstalacion) {
    eventoInstalacion.waitUntil(
        caches.open(NOMBRE_CACHE_PWA).then(function (instanciaCache) {
            return instanciaCache.addAll(RECURSOS_PWA);
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
                    if (claveCacheActual !== NOMBRE_CACHE_PWA) {
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
                caches.open(NOMBRE_CACHE_PWA).then(function (instanciaCache) {
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
