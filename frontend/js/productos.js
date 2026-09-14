const productosIniciales = [

    {
        codigo: "JM001",
        nombre: "Catan",
        categoria: "Juegos de Mesa",
        precio: 29990,
        stock: 10,
        stockCritico: 2,
        imagen: "img/productos/catan.jpg",
        descripcion: "Juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan."
    },

    {
        codigo: "JM002",
        nombre: "Carcassonne",
        categoria: "Juegos de Mesa",
        precio: 24990,
        stock: 8,
        stockCritico: 2,
        imagen: "img/productos/carcassonne.jpg",
        descripcion: "Juego de colocación de fichas donde los jugadores construyen un paisaje medieval."
    },

    {
        codigo: "AC001",
        nombre: "Controlador Inalámbrico Xbox Series X",
        categoria: "Accesorios",
        precio: 59990,
        stock: 12,
        stockCritico: 3,
        imagen: "img/productos/control-xbox.jpg",
        descripcion: "Control inalámbrico compatible con consolas Xbox y PC."
    },

    {
        codigo: "AC002",
        nombre: "Auriculares Gamer HyperX Cloud II",
        categoria: "Accesorios",
        precio: 79990,
        stock: 7,
        stockCritico: 2,
        imagen: "img/productos/hyperx-cloud-2.jpg",
        descripcion: "Auriculares gamer con sonido envolvente, micrófono desmontable y gran comodidad."
    },

    {
        codigo: "CO001",
        nombre: "PlayStation 5",
        categoria: "Consolas",
        precio: 549990,
        stock: 5,
        stockCritico: 2,
        imagen: "img/productos/ps5.jpg",
        descripcion: "Consola de última generación de Sony con alto rendimiento y rápidos tiempos de carga."
    },

    {
        codigo: "CG001",
        nombre: "PC Gamer ASUS ROG Strix",
        categoria: "Computadores Gamers",
        precio: 1299990,
        stock: 4,
        stockCritico: 1,
        imagen: "img/productos/asus-rog-strix.jpg",
        descripcion: "Computador gamer diseñado para ofrecer alto rendimiento en juegos exigentes."
    },

    {
        codigo: "SG001",
        nombre: "Silla Gamer Secretlab Titan",
        categoria: "Sillas Gamers",
        precio: 349990,
        stock: 6,
        stockCritico: 2,
        imagen: "img/productos/secretlab-titan.jpg",
        descripcion: "Silla gamer ergonómica diseñada para entregar comodidad durante largas sesiones."
    },

    {
        codigo: "MS001",
        nombre: "Mouse Gamer Logitech G502 HERO",
        categoria: "Mouse",
        precio: 49990,
        stock: 15,
        stockCritico: 3,
        imagen: "img/productos/logitech-g502.jpg",
        descripcion: "Mouse gamer con sensor de alta precisión y botones personalizables."
    },

    {
        codigo: "MP001",
        nombre: "Mousepad Razer Goliathus Extended Chroma",
        categoria: "Mousepad",
        precio: 29990,
        stock: 10,
        stockCritico: 2,
        imagen: "img/productos/razer-goliathus.jpg",
        descripcion: "Mousepad extendido con gran superficie e iluminación RGB."
    },

    {
        codigo: "PP001",
        nombre: "Polera Gamer Personalizada Level-Up",
        categoria: "Poleras Personalizadas",
        precio: 14990,
        stock: 20,
        stockCritico: 5,
        imagen: "img/productos/polera-level-up.jpg",
        descripcion: "Polera gamer personalizable con gamer tag o diseño favorito."
    }

];


let productos = [];


const productosGuardados =
    localStorage.getItem("productos");


if (productosGuardados) {

    productos =
        JSON.parse(productosGuardados);

} else {

    productos = productosIniciales;

    localStorage.setItem(
        "productos",
        JSON.stringify(productos)
    );

}



function mostrarProductos() {

    const contenedor =
        document.getElementById("lista-productos");


    if (contenedor) {

        let html = "";


        for (let producto of productos) {

            html += `

                <article class="tarjeta-producto">

                    <img
                        src="${producto.imagen}"
                        alt="${producto.nombre}">


                    <h3>
                        ${producto.nombre}
                    </h3>


                    <p class="categoria-producto">
                        ${producto.categoria}
                    </p>


                    <p class="precio-producto">

                        ${formatearPrecio(producto.precio)}

                    </p>


                    <div class="acciones-producto">

                        <button
                            onclick="verDetalle('${producto.codigo}')">

                            Ver detalle

                        </button>


                        <button
                            onclick="agregarAlCarrito('${producto.codigo}')">

                            Añadir

                        </button>

                    </div>

                </article>

            `;

        }


        contenedor.innerHTML = html;

    }

}



function verDetalle(codigo) {

    localStorage.setItem(
        "productoSeleccionado",
        codigo
    );


    window.location.href =
        "detalle-producto.html";

}



function agregarAlCarrito(codigo) {

    let carrito =
        JSON.parse(localStorage.getItem("carrito")) || [];


    const producto =
        productos.find(
            producto => producto.codigo === codigo
        );


    if (!producto) {

        alert(
            "No se encontró el producto."
        );

        return;

    }


    if (producto.stock <= 0) {

        alert(
            "Este producto no tiene stock disponible."
        );

        return;

    }


    const productoEnCarrito =
        carrito.find(
            item => item.codigo === codigo
        );


    if (productoEnCarrito) {

        if (
            productoEnCarrito.cantidad < 5 &&
            productoEnCarrito.cantidad < producto.stock
        ) {

            productoEnCarrito.cantidad++;

        } else {

            alert(
                "No puede agregar más unidades de este producto."
            );

            return;

        }

    } else {

        carrito.push({

            codigo: producto.codigo,

            nombre: producto.nombre,

            precio: producto.precio,

            cantidad: 1

        });

    }


    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );


    actualizarContadorCarrito();


    alert(
        "Producto añadido al carrito."
    );

}



function mostrarDetalleProducto() {

    const contenedor =
        document.getElementById("detalle-producto");


    if (contenedor) {

        const codigo =
            localStorage.getItem("productoSeleccionado");


        const producto =
            productos.find(
                producto => producto.codigo === codigo
            );


        if (producto) {

            let mensajeStock = "";


            if (producto.stock <= 0) {

                mensajeStock =
                    '<p class="sin-stock">Producto sin stock</p>';

            } else {

                mensajeStock =
                    '<p>Stock disponible: ' +
                    producto.stock +
                    '</p>';

            }


            contenedor.innerHTML = `

                <div class="detalle-imagen">

                    <img
                        src="${producto.imagen}"
                        alt="${producto.nombre}">

                </div>


                <div class="detalle-informacion">

                    <p class="categoria-producto">

                        ${producto.categoria}

                    </p>


                    <h2>
                        ${producto.nombre}
                    </h2>


                    <p>
                        ${producto.descripcion}
                    </p>


                    ${mensajeStock}


                    <p class="precio-producto precio-detalle">

                        ${formatearPrecio(producto.precio)}

                    </p>


                    <button
                        class="boton-principal"
                        onclick="agregarAlCarrito('${producto.codigo}')">

                        Añadir al carrito

                    </button>

                </div>

            `;

        } else {

            contenedor.innerHTML =

                "<p>No se encontró el producto seleccionado.</p>";

        }

    }

}

function mostrarProductosDestacados() {

    const contenedor =
        document.getElementById("productos-destacados");


    if (!contenedor) {

        return;

    }


    let html = "";


    let cantidadMostrar = 4;


    if (productos.length < 4) {

        cantidadMostrar =
            productos.length;

    }


    for (let i = 0; i < cantidadMostrar; i++) {

        const producto =
            productos[i];


        html += `

            <article class="tarjeta-producto">

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}">


                <p class="categoria-producto">

                    ${producto.categoria}

                </p>


                <h3>

                    ${producto.nombre}

                </h3>


                <p class="precio-producto">

                   ${formatearPrecio(producto.precio)}

                </p>


                <div class="acciones-producto">

                    <button
                        onclick="verDetalle('${producto.codigo}')">

                        Ver detalle

                    </button>


                    <button
                        onclick="agregarAlCarrito('${producto.codigo}')">

                        Añadir

                    </button>

                </div>

            </article>

        `;

    }


    contenedor.innerHTML =
        html;

}

function formatearPrecio(precio) {

    if (precio === 0) {

        return "FREE";

    }


    return "$" +
        precio.toLocaleString("es-CL");

}

mostrarProductos();

mostrarDetalleProducto();

mostrarProductosDestacados();