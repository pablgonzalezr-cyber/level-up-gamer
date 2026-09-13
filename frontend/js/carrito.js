function obtenerCarrito() {

    return JSON.parse(localStorage.getItem("carrito")) || [];

}


function guardarCarrito(carrito) {

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    actualizarContadorCarrito();

}


function mostrarCarrito() {

    const contenedor =
        document.getElementById("lista-carrito");

    const resumen =
        document.getElementById("resumen-carrito");


    if (!contenedor || !resumen) {
        return;
    }


    const carrito = obtenerCarrito();


    if (carrito.length === 0) {

        contenedor.innerHTML = `
            <div class="carrito-vacio">

                <h3>Tu carrito está vacío</h3>

                <p>
                    Agrega productos desde nuestro catálogo.
                </p>

                <a
                    class="boton-principal"
                    href="productos.html">

                    Ver productos

                </a>

            </div>
        `;


        resumen.innerHTML = `
            <h3>Resumen</h3>

            <p>Subtotal: $0</p>

            <p>Total: $0</p>
        `;

        return;
    }


    let html = "";


    for (let item of carrito) {

        let productoCompleto = null;


        for (let producto of productos) {

            if (producto.codigo === item.codigo) {

                productoCompleto = producto;

            }

        }


        let imagen =
            "https://placehold.co/180x130/111111/39FF14?text=Producto";


        if (productoCompleto) {

            imagen = productoCompleto.imagen;

        }


        const totalProducto =
            item.precio * item.cantidad;


        html += `

            <article class="item-carrito">

                <img
                    src="${imagen}"
                    alt="${item.nombre}">


                <div class="info-item-carrito">

                    <h3>${item.nombre}</h3>

                    <p>
                        Código: ${item.codigo}
                    </p>

                    <p class="precio-producto">
                        $${item.precio.toLocaleString("es-CL")}
                    </p>

                </div>


                <div class="cantidad-carrito">

                    <button
                        onclick="disminuirCantidad('${item.codigo}')">

                        -

                    </button>


                    <span>
                        ${item.cantidad}
                    </span>


                    <button
                        onclick="aumentarCantidad('${item.codigo}')">

                        +

                    </button>

                </div>


                <div class="subtotal-producto">

                    <p>
                        $${totalProducto.toLocaleString("es-CL")}
                    </p>

                </div>


                <button
                    class="boton-eliminar-carrito"
                    onclick="eliminarDelCarrito('${item.codigo}')">

                    Eliminar

                </button>

            </article>

        `;

    }


    contenedor.innerHTML = html;


    mostrarResumenCarrito();

}


function aumentarCantidad(codigo) {

    const carrito = obtenerCarrito();


    for (let item of carrito) {

        if (item.codigo === codigo) {

            if (item.cantidad < 5) {

                item.cantidad++;

            } else {

                alert(
                    "Solo puede agregar un máximo de 5 unidades por producto."
                );

                return;
            }

        }

    }


    guardarCarrito(carrito);

    mostrarCarrito();

}


function disminuirCantidad(codigo) {

    const carrito = obtenerCarrito();


    for (let item of carrito) {

        if (item.codigo === codigo) {

            if (item.cantidad > 1) {

                item.cantidad--;

            }

        }

    }


    guardarCarrito(carrito);

    mostrarCarrito();

}


function eliminarDelCarrito(codigo) {

    const carrito = obtenerCarrito();

    const nuevoCarrito = [];


    for (let item of carrito) {

        if (item.codigo !== codigo) {

            nuevoCarrito.push(item);

        }

    }


    guardarCarrito(nuevoCarrito);

    mostrarCarrito();

}


function vaciarCarrito() {

    const carrito = obtenerCarrito();


    if (carrito.length === 0) {

        alert("El carrito ya está vacío.");

        return;

    }


    const confirmar =
        confirm(
            "¿Está seguro de vaciar todo el carrito?"
        );


    if (confirmar) {

        localStorage.removeItem("carrito");

        actualizarContadorCarrito();

        mostrarCarrito();

    }

}


function calcularSubtotal() {

    const carrito = obtenerCarrito();

    let subtotal = 0;


    for (let item of carrito) {

        subtotal =
            subtotal +
            item.precio * item.cantidad;

    }


    return subtotal;

}


function obtenerDescuentoDuoc(subtotal) {

    const usuario =
        localStorage.getItem("usuario") || "";


    const correo =
        usuario.toLowerCase();


    if (
        correo.endsWith("@duoc.cl") ||
        correo.endsWith("@profesor.duoc.cl")
    ) {

        return subtotal * 0.20;

    }


    return 0;

}


function mostrarResumenCarrito() {

    const resumen =
        document.getElementById("resumen-carrito");


    const subtotal =
        calcularSubtotal();


    const descuento =
        obtenerDescuentoDuoc(subtotal);


    const total =
        subtotal - descuento;


    let html = `

        <h3>Resumen de compra</h3>

        <div class="fila-resumen">

            <span>Subtotal</span>

            <span>
                $${subtotal.toLocaleString("es-CL")}
            </span>

        </div>

    `;


    if (descuento > 0) {

        html += `

            <div class="fila-resumen descuento-duoc">

                <span>
                    Descuento Duoc 20%
                </span>

                <span>
                    -$${descuento.toLocaleString("es-CL")}
                </span>

            </div>

        `;

    }


    html += `

        <div class="fila-resumen total-carrito">

            <span>Total</span>

            <span>
                $${total.toLocaleString("es-CL")}
            </span>

        </div>


        <button
            class="boton-pagar"
            onclick="finalizarCompra()">

            Finalizar compra

        </button>

    `;


    resumen.innerHTML = html;

}


function finalizarCompra() {

    const carrito = obtenerCarrito();


    if (carrito.length === 0) {

        alert(
            "Debe agregar productos antes de finalizar la compra."
        );

        return;

    }


    alert(
        "Compra simulada correctamente. La compra real se implementará en una etapa posterior."
    );

}


mostrarCarrito();