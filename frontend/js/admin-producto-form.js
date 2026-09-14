function guardarProducto() {

    const codigo =
        document.getElementById("codigo").value.trim();


    const nombre =
        document.getElementById("nombre").value.trim();


    const descripcion =
        document.getElementById("descripcion").value.trim();


    const precioTexto =
        document.getElementById("precio").value;


    const stockTexto =
        document.getElementById("stock").value;


    const stockCriticoTexto =
        document.getElementById("stockCritico").value;


    const categoria =
        document.getElementById("categoria").value;


    const imagen =
        document.getElementById("imagen").value.trim();


    const errores = [];


    /* CÓDIGO */

    if (codigo === "") {

        errores.push(
            "El código del producto es obligatorio."
        );

    } else if (codigo.length < 3) {

        errores.push(
            "El código debe tener al menos 3 caracteres."
        );

    }


    /* NOMBRE */

    if (nombre === "") {

        errores.push(
            "El nombre del producto es obligatorio."
        );

    } else if (nombre.length > 100) {

        errores.push(
            "El nombre no puede superar los 100 caracteres."
        );

    }


    /* DESCRIPCIÓN */

    if (descripcion.length > 500) {

        errores.push(
            "La descripción no puede superar los 500 caracteres."
        );

    }


    /* PRECIO */

    const precio =
        Number(precioTexto);


    if (precioTexto === "") {

        errores.push(
            "El precio es obligatorio."
        );

    } else if (isNaN(precio) || precio < 0) {

        errores.push(
            "El precio debe ser un número mayor o igual a 0."
        );

    }


    /* STOCK */

    const stock =
        Number(stockTexto);


    if (stockTexto === "") {

        errores.push(
            "El stock es obligatorio."
        );

    } else if (
        isNaN(stock) ||
        stock < 0 ||
        stock % 1 !== 0
    ) {

        errores.push(
            "El stock debe ser un número entero mayor o igual a 0."
        );

    }


    /* STOCK CRÍTICO */

    let stockCritico = "";


    if (stockCriticoTexto !== "") {

        stockCritico =
            Number(stockCriticoTexto);


        if (
            isNaN(stockCritico) ||
            stockCritico < 0 ||
            stockCritico % 1 !== 0
        ) {

            errores.push(
                "El stock crítico debe ser un número entero mayor o igual a 0."
            );

        }

    }


    /* CATEGORÍA */

    if (categoria === "") {

        errores.push(
            "Debe seleccionar una categoría."
        );

    }


    let listaProductos =
        JSON.parse(
            localStorage.getItem("productos")
        ) || [];


    const codigoOriginal =
        localStorage.getItem("productoEditar");


    /* VALIDAR CÓDIGO REPETIDO */

    for (let producto of listaProductos) {

        if (
            producto.codigo === codigo &&
            codigoOriginal !== codigo
        ) {

            errores.push(
                "Ya existe un producto con ese código."
            );

        }

    }


    if (errores.length > 0) {

        mostrarErrores(
            "mensajes-producto-admin",
            errores
        );

        return;

    }


    let imagenFinal = imagen;


    if (imagenFinal === "") {

        imagenFinal =
            "https://placehold.co/300x200/111111/39FF14?text=Producto";

    }


    const productoNuevo = {

        codigo: codigo,

        nombre: nombre,

        categoria: categoria,

        precio: precio,

        stock: stock,

        stockCritico: stockCritico,

        imagen: imagenFinal,

        descripcion: descripcion

    };


    if (codigoOriginal !== null) {


        for (let i = 0; i < listaProductos.length; i++) {


            if (
                listaProductos[i].codigo === codigoOriginal
            ) {

                listaProductos[i] =
                    productoNuevo;

            }

        }


        localStorage.removeItem(
            "productoEditar"
        );


    } else {


        listaProductos.push(
            productoNuevo
        );

    }


    localStorage.setItem(
        "productos",
        JSON.stringify(listaProductos)
    );


    mostrarExito(
        "mensajes-producto-admin",
        "Producto guardado correctamente."
    );


    if (
        stockCritico !== "" &&
        stock <= stockCritico
    ) {

        alert(
            "Atención: el producto se encuentra en stock crítico."
        );

    }

}



function cargarProductoEditar() {

    const codigoEditar =
        localStorage.getItem("productoEditar");


    if (codigoEditar === null) {

        return;

    }


    const listaProductos =
        JSON.parse(
            localStorage.getItem("productos")
        ) || [];


    let productoEditar = null;


    for (let producto of listaProductos) {

        if (producto.codigo === codigoEditar) {

            productoEditar =
                producto;

        }

    }


    if (!productoEditar) {

        return;

    }


    document.getElementById("codigo").value =
        productoEditar.codigo;


    document.getElementById("codigo").readOnly =
        true;


    document.getElementById("nombre").value =
        productoEditar.nombre;


    document.getElementById("descripcion").value =
        productoEditar.descripcion;


    document.getElementById("precio").value =
        productoEditar.precio;


    document.getElementById("stock").value =
        productoEditar.stock;


    document.getElementById("stockCritico").value =
        productoEditar.stockCritico;


    document.getElementById("categoria").value =
        productoEditar.categoria;


    document.getElementById("imagen").value =
        productoEditar.imagen;

}


cargarProductoEditar();

function configurarValidacionesProducto() {

    const codigo =
        document.getElementById("codigo");

    const precio =
        document.getElementById("precio");

    const stock =
        document.getElementById("stock");

    const stockCritico =
        document.getElementById("stockCritico");


    /* CÓDIGO */

    if (codigo) {

        codigo.addEventListener("blur", function () {

            const valor =
                codigo.value.trim();

            const mensaje =
                document.getElementById(
                    "error-codigo-producto"
                );


            if (valor === "") {

                mensaje.innerHTML = "";

                return;

            }


            if (valor.length < 3) {

                mensaje.className =
                    "mensaje-error-dinamico";

                mensaje.textContent =
                    "El código debe tener al menos 3 caracteres.";

            } else {

                mensaje.className =
                    "mensaje-exito-dinamico";

                mensaje.textContent =
                    "Código válido.";

            }

        });

    }


    /* PRECIO */

    if (precio) {

        precio.addEventListener("blur", function () {

            const valor =
                precio.value;

            const numero =
                Number(valor);

            const mensaje =
                document.getElementById(
                    "error-precio-producto"
                );


            if (valor === "") {

                mensaje.innerHTML = "";

                return;

            }


            if (
                isNaN(numero) ||
                numero < 0
            ) {

                mensaje.className =
                    "mensaje-error-dinamico";

                mensaje.textContent =
                    "El precio debe ser un número mayor o igual a 0.";

            } else {

                mensaje.className =
                    "mensaje-exito-dinamico";

                mensaje.textContent =
                    "Precio válido.";

            }

        });

    }


    /* STOCK */

    if (stock) {

        stock.addEventListener("blur", function () {

            const valor =
                stock.value;

            const numero =
                Number(valor);

            const mensaje =
                document.getElementById(
                    "error-stock-producto"
                );


            if (valor === "") {

                mensaje.innerHTML = "";

                return;

            }


            if (
                isNaN(numero) ||
                numero < 0 ||
                numero % 1 !== 0
            ) {

                mensaje.className =
                    "mensaje-error-dinamico";

                mensaje.textContent =
                    "El stock debe ser un número entero mayor o igual a 0.";

            } else {

                mensaje.className =
                    "mensaje-exito-dinamico";

                mensaje.textContent =
                    "Stock válido.";

            }

        });

    }


    /* STOCK CRÍTICO */

    if (stockCritico) {

        stockCritico.addEventListener("blur", function () {

            const valor =
                stockCritico.value;

            const numero =
                Number(valor);

            const mensaje =
                document.getElementById(
                    "error-stock-critico-producto"
                );


            if (valor === "") {

                mensaje.innerHTML = "";

                return;

            }


            if (
                isNaN(numero) ||
                numero < 0 ||
                numero % 1 !== 0
            ) {

                mensaje.className =
                    "mensaje-error-dinamico";

                mensaje.textContent =
                    "El stock crítico debe ser un número entero mayor o igual a 0.";

            } else {

                mensaje.className =
                    "mensaje-exito-dinamico";

                mensaje.textContent =
                    "Stock crítico válido.";

            }

        });

    }

}


configurarValidacionesProducto();
