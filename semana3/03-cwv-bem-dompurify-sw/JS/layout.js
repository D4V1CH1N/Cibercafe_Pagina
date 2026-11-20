// Semana 3 - Mobile-First Grid y Flexbox
const botonSimularVista = document.getElementById('btnSimularVista');
const grillaCatalogo = document.querySelector('.catalogo-grid');

if (botonSimularVista && grillaCatalogo) {
    botonSimularVista.addEventListener('click', () => {
        grillaCatalogo.classList.toggle('catalogo-grid--sim-movil');
    });
}
