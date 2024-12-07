/**
 * Lista de productos iniciales.
 * @type {Array<{id: number, nombre: string, cantidad: number, precioUnidad: number}>}
 */
const listaProductos = [
    { id: 1, nombre: "Tomate", cantidad: 10, precioUnidad: 20 },
    { id: 2, nombre: "Peras", cantidad: 5, precioUnidad: 10 },
    { id: 3, nombre: "Manzanas", cantidad: 15, precioUnidad: 12 },
];

/**
 * Verifica si el valor proporcionado no es un número válido.
 * @param {number|null} numero - Número a validar.
 * @returns {boolean} Verdadero si no es un número válido.
 */
function validarSiEsNumero(numero) {
    return isNaN(numero) || numero === null;
}

/**
 * Solicita al usuario una respuesta numérica válida.
 * @param {string} pregunta - Mensaje a mostrar al usuario.
 * @returns {number|null} Número válido ingresado por el usuario o `null` si cancela.
 */
function validaRespuesta(pregunta) {
    let numero;
    do {
        const entrada = prompt(pregunta);
        if (entrada === null) {
            return null;
        }
        numero = Number(entrada);
    } while (validarSiEsNumero(numero));
    return numero;
}

/**
 * Recorre un array de productos y genera un mensaje con sus detalles.
 * @param {Array<{id: number, nombre: string, cantidad: number, precioUnidad: number}>} array - Array de productos.
 * @returns {string} Mensaje con los detalles de los productos.
 */
function recorreArray(array) {
    let mensaje = "";
    array.forEach(producto => {
        mensaje += `${producto.nombre}\n   Cantidad: ${producto.cantidad}\n   Precio por Unidad: $${producto.precioUnidad}\n`;
    });
    return mensaje;
}

/**
 * Verifica si un valor existe en un campo específico de una lista de productos.
 * @param {Array<{id: number, nombre: string, cantidad: number, precioUnidad: number}>} lista - Lista de productos.
 * @param {"id"|"nombre"} campo - Campo a verificar (ID o nombre).
 * @param {number|string} valor - Valor a buscar.
 * @returns {boolean} Verdadero si el valor existe.
 */
function valorExiste(lista, campo, valor) {
    return lista.some(producto => {
        if (campo === "id") {
            return producto.id === valor;
        } else if (campo === "nombre") {
            return producto.nombre.toLowerCase() === valor.toLowerCase();
        }
        return false;
    });
}

/**
 * Solicita al usuario un valor único para un campo específico.
 * @param {Array<{id: number, nombre: string, cantidad: number, precioUnidad: number}>} lista - Lista de productos.
 * @param {"id"|"nombre"} campo - Campo a verificar.
 * @param {string} mensaje - Mensaje a mostrar al usuario.
 * @returns {number|string|null} Valor único ingresado por el usuario o `null` si cancela.
 */
function solicitaValor(lista, campo, mensaje) {
    let valor;
    do {
        valor = (campo === "id") ? validaRespuesta(mensaje) : prompt(mensaje);
        if (valor === null) {
            return null; 
        }
        if (valorExiste(lista, campo, valor)) {
            alert(`El ${campo} ingresado ya existe. Por favor, elija otro.`);
        }
    } while (valorExiste(lista, campo, valor));
    return valor;
}

/**
 * Agrega un producto a la lista.
 * @param {Array<{id: number, nombre: string, cantidad: number, precioUnidad: number}>} lista - Lista de productos.
 */
function agregarProducto(lista) {
    const id = solicitaValor(lista, "id", "Ingrese una ID única para el producto:");
    if (id === null) return;

    const nombre = solicitaValor(lista, "nombre", "Ingrese un nombre único para el producto:");
    if (nombre === null) return;

    const cantidad = validaRespuesta("Ingrese la cantidad del producto:");
    if (cantidad === null) return;

    const precioUnidad = validaRespuesta("Ingrese el precio por unidad del producto:");
    if (precioUnidad === null) return;

    const nuevoProducto = { id, nombre, cantidad, precioUnidad };
    lista.push(nuevoProducto);

    alert(`Producto agregado:\nID: ${id}\nNombre: ${nombre}\nCantidad: ${cantidad}\nPrecio por Unidad: $${precioUnidad}`);
}

/**
 * Busca un producto en la lista por su ID.
 * @param {Array<{id: number, nombre: string, cantidad: number, precioUnidad: number}>} lista - Lista de productos.
 * @param {number} id - ID del producto a buscar.
 * @returns {Object|null} Producto encontrado o `null` si no existe.
 */
function buscarProductoPorId(lista, id) {
    return lista.find(producto => producto.id === id);
}

/**
 * Edita un producto en la lista (modificar o eliminar).
 * @param {Array<{id: number, nombre: string, cantidad: number, precioUnidad: number}>} lista - Lista de productos.
 */
function editarProducto(lista) {
    const id = validaRespuesta("Ingrese la ID del producto que desea editar:");
    if (id === null) return;

    const producto = buscarProductoPorId(lista, id);
    if (!producto) {
        alert("El producto con esa ID no existe.");
        return;
    }

    const propiedad = validaRespuesta(
        `Producto seleccionado:\nID: ${producto.id}\nNombre: ${producto.nombre}\nCantidad: ${producto.cantidad}\nPrecio por Unidad: $${producto.precioUnidad}\n\n¿Qué desea hacer?\n1- Modificar Nombre\n2- Modificar Cantidad\n3- Modificar Precio por Unidad\n4- Eliminar Producto\n5- Cancelar`
    );

    if (propiedad === null || propiedad === 5) return;

    switch (propiedad) {
        case 1: {
            const nuevoNombre = solicitaValor(lista, "nombre", "Ingrese el nuevo nombre del producto:");
            if (nuevoNombre === null) return;
            producto.nombre = nuevoNombre;
            break;
        }
        case 2: {
            const nuevaCantidad = validaRespuesta("Ingrese la nueva cantidad del producto:");
            if (nuevaCantidad === null) return;
            producto.cantidad = nuevaCantidad;
            break;
        }
        case 3: {
            const nuevoPrecio = validaRespuesta("Ingrese el nuevo precio por unidad del producto:");
            if (nuevoPrecio === null) return;
            producto.precioUnidad = nuevoPrecio;
            break;
        }
        case 4: {            
            const confirmacion = confirm(`¿Está seguro de que desea eliminar el producto con ID ${id}?`);
            if (confirmacion) {
                const indice = lista.indexOf(producto);
                lista.splice(indice, 1);
                alert(`El producto con ID ${id} fue eliminado exitosamente.`);
            } else {
                alert("El producto no fue eliminado.");
            }
            break;
        }
        default:
            alert("Opción no válida.");
            return;
    }

    if (propiedad !== 4) {
        alert(`Producto actualizado:\nID: ${producto.id}\nNombre: ${producto.nombre}\nCantidad: ${producto.cantidad}\nPrecio por Unidad: $${producto.precioUnidad}`);
    }
}

/**
 * Función principal que controla el flujo del programa.
 */
function main() {
    let marcador = true;

    while (marcador) {
        const decision = validaRespuesta(
            "¡Bienvenido!\nProductos:\n" +
                recorreArray(listaProductos) +
                "\n¿Qué desea hacer?\n1- Agregar\n2- Modificar o Eliminar\n3- Salir"
        );

        if (decision === null) break;

        switch (decision) {
            case 1:
                agregarProducto(listaProductos);
                break;
            case 2:
                editarProducto(listaProductos);
                break;
            case 3:
                alert("¡Hasta luego!");
                marcador = false;
                break;
            default:
                alert("Opción no válida. Intente de nuevo.");
                break;
        }
    }
}

main();
