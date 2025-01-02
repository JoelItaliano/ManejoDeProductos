const contenedorProductos = document.querySelector('.productos');
const carritoIcono = document.getElementById("icono-carrito");
const carrito = document.getElementById("carrito");
const carritoProductos = [];

const listaProductos = [
    { id: 1, nombre: "Lapicera", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLxlcmXv0_ctrKEZ2qCZ6HB8gZgagF3B3kpQ&s", cantidad: 10, precioUnidad: 20 },
    { id: 2, nombre: "Goma de borrar", img:"https://libreriaoasis.com.ar/cdn/shop/products/005813907-400x400_grande.jpg?v=1579739668", cantidad: 5, precioUnidad: 10 },
    { id: 3, nombre: "Tijeras", img:"https://www.officedepot.com.mx/medias/75879.jpg-1200ftw?context=bWFzdGVyfHJvb3R8OTQ0MTh8aW1hZ2UvanBlZ3xhRFJqTDJobU9TODVOek0xTnpVek1qQXpOelF5TG1wd1p3fGNhNmUzMGE1YmIyNTJlODVjZjFjMzM2Mzk0MGRlZTI0MmRiODBmNDA0OTdiZDYzNmQyMGQ3NDRiODk0MzQxNmM", cantidad: 15, precioUnidad: 12 },
    { id: 4, nombre: "Goma de pegar", img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQJp-sOhKgFOWTXpCMDJQt26KxZpLLwf3yYA&s", cantidad: 15, precioUnidad: 12 },
    { id: 5, nombre: "Liquid Paper", img:"https://http2.mlstatic.com/D_NQ_NP_738879-MLA51321774945_082022-O.webp", cantidad: 15, precioUnidad: 12 }
];



function expandirCarrito() {
    carrito.classList.toggle("visible");
    carrito.classList.toggle("oculto");
}

carritoIcono.addEventListener("click", (e) => {
    if (carrito.style.display === "none" || carrito.style.display === "") {
        carrito.style.display = "block"; 
    } else {
        carrito.style.display = "none"; 
    }
    e.preventDefault(); 
    expandirCarrito();
});

function asignarEventosBotones() {
    const botones = document.querySelectorAll(".card-producto button");

    botones.forEach(boton => {
        boton.addEventListener("click", (e) => {
            const productoId = parseInt(e.target.getAttribute("data-id"));
            const productoSeleccionado = listaProductos.find(prod => prod.id === productoId);
            agregarAlCarrito(productoSeleccionado);
        });
    });
}


function insertarProductos(productos) {
    let contenidoHTML = "";

    productos.forEach(producto => {
        contenidoHTML += `
            <div class="card-producto">
                <h2 class="descrip-producto">${producto.nombre}</h2>
                <div class="cont-img-producto">
                    <img class="img-prodcuto" src="${producto.img}" alt="${producto.nombre}">
                </div>
                <div class="cont-precio-producto">
                    <p class="precio-producto">$${producto.precioUnidad}</p>
                </div>
                <div class="cont-cantidad">
                    <p>Cantidad: <span class="Cantidad">${producto.cantidad}</span></p>
                </div>
                <button data-id="${producto.id}">Comprar</button>
            </div>
        `;
    });

    contenedorProductos.innerHTML = contenidoHTML;

    asignarEventosBotones();
}

function agregarAlCarrito(producto) {
    const productoEnCarrito = carritoProductos.find(item => item.id === producto.id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carritoProductos.push({ ...producto, cantidad: 1 });
    }

    actualizarVistaCarrito();
}

function actualizarVistaCarrito() {
    carrito.innerHTML = "";

    if (carritoProductos.length === 0) {
        carrito.innerHTML = "<p>El carrito está vacío</p>";
        return;
    }

    carritoProductos.forEach(producto => {
        const itemCarrito = document.createElement("div");
        itemCarrito.classList.add("item-carrito");
        itemCarrito.innerHTML = `
            <p>${producto.nombre}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <p>Total: $${producto.cantidad * producto.precioUnidad}</p>
        `;
        carrito.appendChild(itemCarrito);
    });
}

insertarProductos(listaProductos);
