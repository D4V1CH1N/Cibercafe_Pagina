const NOMBRE_CACHE = 'levelup-semana3-paso01-v3';
const ARCHIVOS_ESTATICOS = [
    'index.html',
    'styles.css',
    'CSS/tarjeta.css',
    'script.js',
    'JS/tarjeta.js',
    'manifest.json',
    'data/snacks.json',
    'icons/icon-192.png',
    'icons/icon-512.png'
];

// Semana 2 - Instalacion Service Worker
self.addEventListener('install', function (eventoInstall) {
    eventoInstall.waitUntil(
        caches.open(NOMBRE_CACHE).then(function (cacheAbierta) {
            return cacheAbierta.addAll(ARCHIVOS_ESTATICOS);
        })
    );
    self.skipWaiting();
});

// Semana 2 - Activacion y Limpieza Cache
self.addEventListener('activate', function (eventoActivate) {
    eventoActivate.waitUntil(
        caches.keys().then(function (listaCaches) {
            return Promise.all(
                listaCaches.map(function (nombreClave) {
                    if (nombreClave !== NOMBRE_CACHE) {
                        return caches.delete(nombreClave);
                    }
                    return null;
                })
            );
        })
    );
    self.clients.claim();
});

// Semana 2 - Estrategia Cache Offline
self.addEventListener('fetch', function (eventoFetch) {
    if (eventoFetch.request.method !== 'GET') {
        return;
    }
    eventoFetch.respondWith(
        caches.match(eventoFetch.request).then(function (respuestaCache) {
            if (respuestaCache) {
                return respuestaCache;
            }
            return fetch(eventoFetch.request);
        })
    );
});
