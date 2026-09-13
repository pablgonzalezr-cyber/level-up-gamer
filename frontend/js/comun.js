console.log("Level-Up Gamer iniciado correctamente");


function actualizarContadorCarrito() {

    const contador =
        document.getElementById("contador-carrito");


    if (contador) {

        const carrito =
            JSON.parse(localStorage.getItem("carrito")) || [];


        let cantidadTotal = 0;


        for (let producto of carrito) {

            cantidadTotal =
                cantidadTotal + producto.cantidad;

        }


        contador.innerHTML =
            cantidadTotal;

    }

}



function actualizarUsuarioNavegacion() {

    const navegacion =
        document.querySelector(".nav-principal ul");


    if (!navegacion) {

        return;

    }


    const usuarioAnterior =
        document.querySelector(".usuario-navegacion");


    if (usuarioAnterior) {

        usuarioAnterior.remove();

    }


    const correo =
        localStorage.getItem("usuario");


    if (correo) {

        const elementoUsuario =
            document.createElement("li");


        elementoUsuario.className =
            "usuario-navegacion";


        elementoUsuario.innerHTML = `

            <span class="correo-usuario">

                ${correo}

            </span>


            <button
                class="boton-cerrar-sesion"
                onclick="cerrarSesion()">

                Salir

            </button>

        `;


        navegacion.appendChild(
            elementoUsuario
        );

    }

}



function cerrarSesion() {

    localStorage.removeItem("usuario");


    actualizarUsuarioNavegacion();


    alert(
        "Sesión cerrada correctamente."
    );

}



actualizarContadorCarrito();

actualizarUsuarioNavegacion();