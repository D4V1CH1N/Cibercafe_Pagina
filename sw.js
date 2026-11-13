const NOMBRE_CACHE_ESTATICO = 'levelup-arcade-v3';
const RECURSOS_PRECACHE = [
    './',
    'index.html',
    'styles.css',
    'script.js',
    'manifest.json',
    'data/snacks.json',
    'pwa/index.html',
    'pwa/styles.css',
    'pwa/script.js',
    'pwa/icons/icon-192.png',
    'pwa/icons/icon-512.png',
    'https://code.jquery.com/jquery-3.7.1.min.js',
    'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@500;600;700&display=swap'
];

self.addEventListener('install', function (eventoInstalacion) {
    eventoInstalacion.waitUntil(
        caches.open(NOMBRE_CACHE_ESTATICO).then(function (instanciaCache) {
            return instanciaCache.addAll(RECURSOS_PRECACHE);
        }).then(function () {
            return self.skipWaiting();
        })
    );
});

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

self.addEventListener('fetch', function (eventoPeticion) {
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

