function obtenerProductosAdmin() {

    return JSON.parse(
        localStorage.getItem("productos")
    ) || [];

}



function mostrarProductosAdmin() {

    const cuerpoTabla =
        document.getElementById("cuerpo-productos");


    if (!cuerpoTabla) {

        return;

    }


    const listaProductos =
        obtenerProductosAdmin();


    let html = "";


    if (listaProductos.length === 0) {

        html = `

            <tr>

                <td colspan="7">

                    No existen productos registrados.

                </td>

            </tr>

        `;

    } else {


        for (let producto of listaProductos) {


            let estadoStock =
                producto.stock;


            if (
                producto.stockCritico !== "" &&
                producto.stockCritico !== null &&
                producto.stock <= producto.stockCritico
            ) {

                estadoStock = `

                    <span class="stock-critico">

                        ${producto.stock}
                        - STOCK CRÍTICO

                    </span>

                `;

            }


            html += `

                <tr>

                    <td>
                        ${producto.codigo}
                    </td>


                    <td>
                        ${producto.nombre}
                    </td>


                    <td>
                        ${producto.categoria}
                    </td>


                    <td>

                        $${producto.precio.toLocaleString("es-CL")}

                    </td>


                    <td>
                        ${estadoStock}
                    </td>


                    <td>
                        ${producto.stockCritico}
                    </td>


                    <td>

                        <button
                            class="boton-admin"
                            onclick="editarProducto('${producto.codigo}')">

                            Editar

                        </button>


                        <button
                            class="boton-admin boton-eliminar"
                            onclick="eliminarProducto('${producto.codigo}')">

                            Eliminar

                        </button>

                    </td>

                </tr>

            `;

        }

    }


    cuerpoTabla.innerHTML = html;

}



function nuevoProducto() {

    localStorage.removeItem(
        "productoEditar"
    );


    window.location.href =
        "producto-form.html";

}



function editarProducto(codigo) {

    localStorage.setItem(
        "productoEditar",
        codigo
    );


    window.location.href =
        "producto-form.html";

}



function eliminarProducto(codigo) {

    const confirmar =
        confirm(
            "¿Está seguro de eliminar este producto?"
        );


    if (!confirmar) {

        return;

    }


    const listaProductos =
        obtenerProductosAdmin();


    const nuevosProductos = [];


    for (let producto of listaProductos) {

        if (producto.codigo !== codigo) {

            nuevosProductos.push(producto);

        }

    }


    localStorage.setItem(
        "productos",
        JSON.stringify(nuevosProductos)
    );


    mostrarProductosAdmin();

}


mostrarProductosAdmin();