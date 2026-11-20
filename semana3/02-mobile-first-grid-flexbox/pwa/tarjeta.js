// Semana 3 - Componentes Encapsulados
document.addEventListener('click', (eventoClick) => {
    if (!eventoClick.target.matches('.card-item__btn-simular')) return;
    const tarjetaActual = eventoClick.target.closest('.card-item');
    if (!tarjetaActual) return;
    const estadoTarjeta = tarjetaActual.querySelector('.card-item__estado');
    const estaActiva = tarjetaActual.classList.toggle('card-item--activo');
    if (estadoTarjeta) {
        estadoTarjeta.textContent = estaActiva ? 'Estado: Seleccionado (Simulacion)' : 'Estado: Disponible';
    }
    eventoClick.target.textContent = estaActiva ? 'Quitar Seleccion' : 'Simular Seleccion';
});
