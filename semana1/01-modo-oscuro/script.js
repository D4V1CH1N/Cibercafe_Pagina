// Semana 1 - Inicializacion DOM y Eventos
document.addEventListener('DOMContentLoaded', function () {
    var botonTema = document.getElementById('btn-tema');
    if (botonTema) {
        // Semana 1 - Modo Oscuro y Claro
        botonTema.addEventListener('click', function () {
            document.body.classList.toggle('modo-claro');
        });
    }
});
