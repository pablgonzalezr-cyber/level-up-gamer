function enviarContacto() {

    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const comentario = document.getElementById("comentario").value.trim();
    const errores = [];

    if (nombre === "") {
        errores.push("El nombre es obligatorio.");
    } else if (nombre.length > 100) {
        errores.push("El nombre no puede superar los 100 caracteres.");
    }

    if (correo !== "") {
        if (correo.length > 100) {
            errores.push("El correo no puede superar los 100 caracteres.");
        } else if (!validarCorreoPermitido(correo)) {
            errores.push("Solo se permiten correos @duoc.cl, @profesor.duoc.cl y @gmail.com.");
        }
    }

    if (comentario === "") {
        errores.push("El comentario es obligatorio.");
    } else if (comentario.length > 500) {
        errores.push("El comentario no puede superar los 500 caracteres.");
    }

    if (errores.length > 0) {
        mostrarErrores("mensajes-contacto", errores);
        return;
    }

    mostrarExito("mensajes-contacto", "Mensaje enviado correctamente.");
    document.getElementById("form-contacto").reset();
}

function configurarValidacionesContacto() {

    const nombre =
        document.getElementById("nombre");

    const correo =
        document.getElementById("correo");

    const comentario =
        document.getElementById("comentario");



    if (nombre) {

        nombre.addEventListener("blur", function () {

            const valor =
                nombre.value.trim();

            const mensaje =
                document.getElementById(
                    "error-nombre-contacto"
                );


            if (valor === "") {

                mensaje.innerHTML = "";

                return;

            }


            if (valor.length > 100) {

                mensaje.className =
                    "mensaje-error-dinamico";

                mensaje.textContent =
                    "El nombre no puede superar los 100 caracteres.";

            } else {

                mensaje.className =
                    "mensaje-exito-dinamico";

                mensaje.textContent =
                    "Nombre válido.";

            }

        });

    }


    if (correo) {

        correo.addEventListener("blur", function () {

            const valor =
                correo.value.trim();

            const mensaje =
                document.getElementById(
                    "error-correo-contacto"
                );


            if (valor === "") {

                mensaje.innerHTML = "";

                return;

            }


            if (
                valor.length > 100 ||
                !validarCorreoPermitido(valor)
            ) {

                mensaje.className =
                    "mensaje-error-dinamico";

                mensaje.textContent =
                    "El correo ingresado no es válido o su dominio no está permitido.";

            } else {

                mensaje.className =
                    "mensaje-exito-dinamico";

                mensaje.textContent =
                    "Correo válido.";

            }

        });

    }

    if (comentario) {

        comentario.addEventListener("blur", function () {

            const valor =
                comentario.value.trim();

            const mensaje =
                document.getElementById(
                    "error-comentario-contacto"
                );


            if (valor === "") {

                mensaje.innerHTML = "";

                return;

            }


            if (valor.length > 500) {

                mensaje.className =
                    "mensaje-error-dinamico";

                mensaje.textContent =
                    "El comentario no puede superar los 500 caracteres.";

            } else {

                mensaje.className =
                    "mensaje-exito-dinamico";

                mensaje.textContent =
                    "Comentario válido.";

            }

        });

    }

}


configurarValidacionesContacto();
