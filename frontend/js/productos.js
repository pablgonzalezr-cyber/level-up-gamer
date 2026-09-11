const productos = [

    {
        codigo: "JM001",
        nombre: "Catan",
        categoria: "Juegos de Mesa",
        precio: 29990,
        imagen: "https://placehold.co/300x200/111111/39FF14?text=Catan",
        descripcion: "Juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan."
    },

    {
        codigo: "JM002",
        nombre: "Carcassonne",
        categoria: "Juegos de Mesa",
        precio: 24990,
        imagen: "https://placehold.co/300x200/111111/39FF14?text=Carcassonne",
        descripcion: "Juego de colocación de fichas donde los jugadores construyen un paisaje medieval."
    },

    {
        codigo: "AC001",
        nombre: "Controlador Inalámbrico Xbox Series X",
        categoria: "Accesorios",
        precio: 59990,
        imagen: "https://placehold.co/300x200/111111/39FF14?text=Control+Xbox",
        descripcion: "Control inalámbrico compatible con consolas Xbox y PC."
    },

    {
        codigo: "AC002",
        nombre: "Auriculares Gamer HyperX Cloud II",
        categoria: "Accesorios",
        precio: 79990,
        imagen: "https://placehold.co/300x200/111111/39FF14?text=HyperX+Cloud+II",
        descripcion: "Auriculares gamer con sonido envolvente, micrófono desmontable y gran comodidad."
    },

    {
        codigo: "CO001",
        nombre: "PlayStation 5",
        categoria: "Consolas",
        precio: 549990,
        imagen: "https://placehold.co/300x200/111111/39FF14?text=PlayStation+5",
        descripcion: "Consola de última generación de Sony con alto rendimiento y rápidos tiempos de carga."
    },

    {
        codigo: "CG001",
        nombre: "PC Gamer ASUS ROG Strix",
        categoria: "Computadores Gamers",
        precio: 1299990,
        imagen: "https://placehold.co/300x200/111111/39FF14?text=ASUS+ROG+Strix",
        descripcion: "Computador gamer diseñado para ofrecer alto rendimiento en juegos exigentes."
    },

    {
        codigo: "SG001",
        nombre: "Silla Gamer Secretlab Titan",
        categoria: "Sillas Gamers",
        precio: 349990,
        imagen: "https://placehold.co/300x200/111111/39FF14?text=Secretlab+Titan",
        descripcion: "Silla gamer ergonómica diseñada para entregar comodidad durante largas sesiones."
    },

    {
        codigo: "MS001",
        nombre: "Mouse Gamer Logitech G502 HERO",
        categoria: "Mouse",
        precio: 49990,
        imagen: "https://placehold.co/300x200/111111/39FF14?text=Logitech+G502",
        descripcion: "Mouse gamer con sensor de alta precisión y botones personalizables."
    },

    {
        codigo: "MP001",
        nombre: "Mousepad Razer Goliathus Extended Chroma",
        categoria: "Mousepad",
        precio: 29990,
        imagen: "https://placehold.co/300x200/111111/39FF14?text=Razer+Mousepad",
        descripcion: "Mousepad extendido con gran superficie e iluminación RGB."
    },

    {
        codigo: "PP001",
        nombre: "Polera Gamer Personalizada Level-Up",
        categoria: "Poleras Personalizadas",
        precio: 14990,
        imagen: "https://placehold.co/300x200/111111/39FF14?text=Polera+Level-Up",
        descripcion: "Polera gamer personalizable con gamer tag o diseño favorito."
    }

];


function mostrarProductos() {

    const contenedor = document.getElementById("lista-productos");

    if (contenedor) {

        let html = "";

        for (let producto of productos) {

            html += `
                <article class="tarjeta-producto">

                    <img src="${producto.imagen}" alt="${producto.nombre}">

                    <h3>${producto.nombre}</h3>

                    <p class="categoria-producto">
                        ${producto.categoria}
                    </p>

                    <p class="precio-producto">
                        $${producto.precio.toLocaleString("es-CL")}
                    </p>

                    <div class="acciones-producto">

                        <button onclick="verDetalle('${producto.codigo}')">
                            Ver detalle
                        </button>

                        <button onclick="agregarAlCarrito('${producto.codigo}')">
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

    localStorage.setItem("productoSeleccionado", codigo);

    window.location.href = "detalle-producto.html";

}

function agregarAlCarrito(codigo) {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const producto = productos.find(
        producto => producto.codigo === codigo
    );

    const productoEnCarrito = carrito.find(
        item => item.codigo === codigo
    );


    if (productoEnCarrito) {

        if (productoEnCarrito.cantidad < 5) {

            productoEnCarrito.cantidad++;

        } else {

            alert("Solo puede agregar un máximo de 5 unidades por producto.");

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

    alert("Producto añadido al carrito.");

}

function mostrarDetalleProducto() {

    const contenedor = document.getElementById("detalle-producto");

    if (contenedor) {

        const codigo = localStorage.getItem("productoSeleccionado");

        const producto = productos.find(
            producto => producto.codigo === codigo
        );


        if (producto) {

            contenedor.innerHTML = `

                <div class="detalle-imagen">

                    <img src="${producto.imagen}" alt="${producto.nombre}">

                </div>


                <div class="detalle-informacion">

                    <p class="categoria-producto">
                        ${producto.categoria}
                    </p>

                    <h2>${producto.nombre}</h2>

                    <p>
                        ${producto.descripcion}
                    </p>

                    <p class="precio-producto precio-detalle">
                        $${producto.precio.toLocaleString("es-CL")}
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

mostrarProductos();

mostrarDetalleProducto();


