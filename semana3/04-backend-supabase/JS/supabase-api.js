// Semana 3 - Backend Supabase
const SUPABASE_URL = 'https://bmcdlimkoxnlyqeyksdk.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_ci-J9b7yQEoYOqxbm3IDMA_DrOTWRr-';
const PROYECTO_ACTUAL = 'levelup';

let clienteSupabaseInstancia = null;

function obtenerClienteSupabase() {
    if (clienteSupabaseInstancia) {
        return clienteSupabaseInstancia;
    }
    if (typeof window !== 'undefined' && window.supabase && typeof window.supabase.createClient === 'function') {
        clienteSupabaseInstancia = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return clienteSupabaseInstancia;
}

async function registrarCuentaNube(nombreUsuario, claveAcceso, rolUsuario) {
    const clienteSupabase = obtenerClienteSupabase();
    if (!clienteSupabase || !navigator.onLine) {
        return { ok: false, motivo: 'offline' };
    }
    try {
        const respuesta = await clienteSupabase
            .from('cuentas')
            .insert([{
                proyecto: PROYECTO_ACTUAL,
                usuario: nombreUsuario,
                clave: claveAcceso,
                rol: rolUsuario
            }])
            .select()
            .limit(1);
        if (respuesta.error) {
            return { ok: false, error: respuesta.error.message };
        }
        return { ok: true, cuenta: respuesta.data && respuesta.data[0] ? respuesta.data[0] : null };
    } catch (errorRed) {
        return { ok: false, error: errorRed.message };
    }
}

async function autenticarCuentaNube(nombreUsuario, claveAcceso) {
    const clienteSupabase = obtenerClienteSupabase();
    if (!clienteSupabase || !navigator.onLine) {
        return { ok: false, motivo: 'offline' };
    }
    try {
        const respuesta = await clienteSupabase
            .from('cuentas')
            .select('*')
            .eq('proyecto', PROYECTO_ACTUAL)
            .eq('usuario', nombreUsuario)
            .eq('clave', claveAcceso)
            .limit(1);
        if (respuesta.error) {
            return { ok: false, error: respuesta.error.message };
        }
        if (respuesta.data && respuesta.data.length > 0) {
            return { ok: true, cuenta: respuesta.data[0] };
        }
        return { ok: false, noEncontrado: true };
    } catch (errorRed) {
        return { ok: false, error: errorRed.message };
    }
}

async function guardarPedidoNube(datosPedido) {
    const clienteSupabase = obtenerClienteSupabase();
    if (!clienteSupabase || !navigator.onLine) {
        return { ok: false, motivo: 'offline' };
    }
    try {
        const respuesta = await clienteSupabase
            .from('pedidos')
            .insert([{
                proyecto: PROYECTO_ACTUAL,
                cliente: datosPedido.cliente,
                modalidad: datosPedido.modalidad,
                forma_pago: datosPedido.formaPago || datosPedido.forma_pago,
                monto_total: Number(datosPedido.montoTotal || datosPedido.monto_total || 0),
                items: Array.isArray(datosPedido.items) ? datosPedido.items : []
            }]);
        if (respuesta.error) {
            return { ok: false, error: respuesta.error.message };
        }
        return { ok: true };
    } catch (errorRed) {
        return { ok: false, error: errorRed.message };
    }
}

async function guardarReservaNube(nombreCliente, detalleSala) {
    const clienteSupabase = obtenerClienteSupabase();
    if (!clienteSupabase || !navigator.onLine) {
        return { ok: false, motivo: 'offline' };
    }
    try {
        const respuesta = await clienteSupabase
            .from('reservas')
            .insert([{
                proyecto: PROYECTO_ACTUAL,
                cliente: nombreCliente,
                detalle_sala: detalleSala
            }]);
        if (respuesta.error) {
            return { ok: false, error: respuesta.error.message };
        }
        return { ok: true };
    } catch (errorRed) {
        return { ok: false, error: errorRed.message };
    }
}

async function guardarProductoExtraNube(nombreProducto, categoriaProducto, precioProducto, imagenProducto) {
    const clienteSupabase = obtenerClienteSupabase();
    if (!clienteSupabase || !navigator.onLine) {
        return { ok: false, motivo: 'offline' };
    }
    try {
        const respuesta = await clienteSupabase
            .from('productos_extra')
            .insert([{
                proyecto: PROYECTO_ACTUAL,
                nombre: nombreProducto,
                categoria: categoriaProducto,
                precio: Number(precioProducto || 0),
                imagen: imagenProducto || ''
            }]);
        if (respuesta.error) {
            return { ok: false, error: respuesta.error.message };
        }
        return { ok: true };
    } catch (errorRed) {
        return { ok: false, error: errorRed.message };
    }
}

async function guardarConsultaNube(nombreCliente, textoMensaje) {
    const clienteSupabase = obtenerClienteSupabase();
    if (!clienteSupabase || !navigator.onLine) {
        return { ok: false, motivo: 'offline' };
    }
    try {
        const respuesta = await clienteSupabase
            .from('consultas')
            .insert([{
                proyecto: PROYECTO_ACTUAL,
                cliente: nombreCliente,
                mensaje: textoMensaje
            }]);
        if (respuesta.error) {
            return { ok: false, error: respuesta.error.message };
        }
        return { ok: true };
    } catch (errorRed) {
        return { ok: false, error: errorRed.message };
    }
}

async function listarRegistrosProyecto(nombreTabla) {
    const clienteSupabase = obtenerClienteSupabase();
    if (!clienteSupabase || !navigator.onLine) {
        return { ok: false, registros: [], motivo: 'offline' };
    }
    try {
        const respuesta = await clienteSupabase
            .from(nombreTabla)
            .select('*')
            .eq('proyecto', PROYECTO_ACTUAL)
            .order('creado_en', { ascending: false });
        if (respuesta.error) {
            return { ok: false, registros: [], error: respuesta.error.message };
        }
        return { ok: true, registros: Array.isArray(respuesta.data) ? respuesta.data : [] };
    } catch (errorRed) {
        return { ok: false, registros: [], error: errorRed.message };
    }
}

// Semana 3 - Backend Supabase Estaciones
async function reservarEstacionNube(codigoEstacion, nombreUsuario, detalleReserva) {
    const clienteSupabase = obtenerClienteSupabase();
    if (!clienteSupabase || !navigator.onLine) {
        return { ok: false, motivo: 'offline' };
    }
    try {
        const respuesta = await clienteSupabase
            .from('reservas')
            .insert([{
                proyecto: PROYECTO_ACTUAL,
                cliente: nombreUsuario,
                detalle_sala: codigoEstacion + ' | ' + detalleReserva,
                estado: 'ocupado'
            }])
            .select()
            .limit(1);
        if (respuesta.error) {
            return { ok: false, error: respuesta.error.message };
        }
        return { ok: true, reserva: respuesta.data && respuesta.data[0] ? respuesta.data[0] : null };
    } catch (errorRed) {
        return { ok: false, error: errorRed.message };
    }
}

async function obtenerEstacionesOcupadasNube() {
    const clienteSupabase = obtenerClienteSupabase();
    if (!clienteSupabase || !navigator.onLine) {
        return { ok: false, registros: [], motivo: 'offline' };
    }
    try {
        const respuesta = await clienteSupabase
            .from('reservas')
            .select('*')
            .eq('proyecto', PROYECTO_ACTUAL)
            .eq('estado', 'ocupado')
            .order('creado_en', { ascending: false });
        if (respuesta.error) {
            return { ok: false, registros: [], error: respuesta.error.message };
        }
        return { ok: true, registros: Array.isArray(respuesta.data) ? respuesta.data : [] };
    } catch (errorRed) {
        return { ok: false, registros: [], error: errorRed.message };
    }
}

async function liberarEstacionNube(idReserva) {
    const clienteSupabase = obtenerClienteSupabase();
    if (!clienteSupabase || !navigator.onLine) {
        return { ok: false, motivo: 'offline' };
    }
    try {
        const respuesta = await clienteSupabase
            .from('reservas')
            .update({ estado: 'finalizado' })
            .eq('id', idReserva)
            .eq('proyecto', PROYECTO_ACTUAL);
        if (respuesta.error) {
            return { ok: false, error: respuesta.error.message };
        }
        return { ok: true };
    } catch (errorRed) {
        return { ok: false, error: errorRed.message };
    }
}

// Semana 3 - Backend Supabase Promociones y Actividad
async function guardarPromocionNube(datosPromo) {
    const clienteSupabase = obtenerClienteSupabase();
    if (!clienteSupabase || !navigator.onLine) {
        return { ok: false, motivo: 'offline' };
    }
    try {
        const respuesta = await clienteSupabase
            .from('promociones')
            .insert([{
                proyecto: PROYECTO_ACTUAL,
                titulo: datosPromo.titulo,
                descripcion: datosPromo.descripcion,
                precio: Number(datosPromo.precio || 0),
                texto_boton: datosPromo.textoBoton || datosPromo.texto_boton || '',
                activa: Boolean(datosPromo.activa),
                expira_en: datosPromo.expiraEn || datosPromo.expira_en
            }])
            .select()
            .limit(1);
        if (respuesta.error) {
            return { ok: false, error: respuesta.error.message };
        }
        return { ok: true, promocion: respuesta.data && respuesta.data[0] ? respuesta.data[0] : null };
    } catch (errorRed) {
        return { ok: false, error: errorRed.message };
    }
}

async function obtenerPromocionActivaNube() {
    const clienteSupabase = obtenerClienteSupabase();
    if (!clienteSupabase || !navigator.onLine) {
        return { ok: false, promocion: null, motivo: 'offline' };
    }
    try {
        const respuesta = await clienteSupabase
            .from('promociones')
            .select('*')
            .eq('proyecto', PROYECTO_ACTUAL)
            .order('creado_en', { ascending: false })
            .limit(1);
        if (respuesta.error) {
            return { ok: false, promocion: null, error: respuesta.error.message };
        }
        return { ok: true, promocion: respuesta.data && respuesta.data[0] ? respuesta.data[0] : null };
    } catch (errorRed) {
        return { ok: false, promocion: null, error: errorRed.message };
    }
}

async function registrarActividadClienteNube(nombreCliente, tipoAccion, detalleAccion) {
    const clienteSupabase = obtenerClienteSupabase();
    if (!clienteSupabase || !navigator.onLine) {
        return { ok: false, motivo: 'offline' };
    }
    try {
        const respuesta = await clienteSupabase
            .from('actividad_clientes')
            .insert([{
                proyecto: PROYECTO_ACTUAL,
                cliente: nombreCliente,
                accion: tipoAccion,
                detalle: detalleAccion
            }]);
        if (respuesta.error) {
            return { ok: false, error: respuesta.error.message };
        }
        return { ok: true };
    } catch (errorRed) {
        return { ok: false, error: errorRed.message };
    }
}

async function obtenerActividadClientesNube() {
    const clienteSupabase = obtenerClienteSupabase();
    if (!clienteSupabase || !navigator.onLine) {
        return { ok: false, registros: [], motivo: 'offline' };
    }
    try {
        const respuesta = await clienteSupabase
            .from('actividad_clientes')
            .select('*')
            .eq('proyecto', PROYECTO_ACTUAL)
            .order('creado_en', { ascending: false })
            .limit(100);
        if (respuesta.error) {
            return { ok: false, registros: [], error: respuesta.error.message };
        }
        return { ok: true, registros: Array.isArray(respuesta.data) ? respuesta.data : [] };
    } catch (errorRed) {
        return { ok: false, registros: [], error: errorRed.message };
    }
}

async function marcarPedidoEntregadoNube(idPedido) {
    const clienteSupabase = obtenerClienteSupabase();
    if (!clienteSupabase || !navigator.onLine) {
        return { ok: false, motivo: 'offline' };
    }
    try {
        const respuesta = await clienteSupabase
            .from('pedidos')
            .update({ estado: 'entregado' })
            .eq('id', idPedido)
            .eq('proyecto', PROYECTO_ACTUAL);
        if (respuesta.error) {
            return { ok: false, error: respuesta.error.message };
        }
        return { ok: true };
    } catch (errorRed) {
        return { ok: false, error: errorRed.message };
    }
}
