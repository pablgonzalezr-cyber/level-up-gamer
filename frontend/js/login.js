function iniciarSesion() {

    const correo = document.getElementById("correo").value.trim();
    const clave = document.getElementById("clave").value;
    const errores = [];

    if (correo === "") {
        errores.push("El correo es obligatorio.");
    } else if (correo.length > 100) {
        errores.push("El correo no puede superar los 100 caracteres.");
    } else if (!validarCorreoPermitido(correo)) {
        errores.push("Solo se permiten correos @duoc.cl, @profesor.duoc.cl y @gmail.com.");
    }

    if (clave === "") {
        errores.push("La contraseña es obligatoria.");
    } else if (clave.length < 4 || clave.length > 10) {
        errores.push("La contraseña debe tener entre 4 y 10 caracteres.");
    }

    if (errores.length > 0) {
        mostrarErrores("mensajes-login", errores);
        return;
    }

    localStorage.setItem("usuario", correo);

    actualizarUsuarioNavegacion();

    mostrarExito("mensajes-login", "Inicio de sesión simulado correctamente.");

    document.getElementById("form-login").reset();
}

function configurarValidacionesLogin() {

    const correo =
        document.getElementById("correo");

    const clave =
        document.getElementById("clave");


    if (correo) {

        correo.addEventListener("blur", function () {

            const valor =
                correo.value.trim();

            const mensaje =
                document.getElementById("error-correo-login");


            if (valor === "") {

                mensaje.innerHTML = "";

                return;

            }


            if (!validarCorreoPermitido(valor)) {

                mensaje.className =
                    "mensaje-error-dinamico";

                mensaje.textContent =
                    "El correo no tiene un formato válido o su dominio no está permitido.";

            } else {

                mensaje.className =
                    "mensaje-exito-dinamico";

                mensaje.textContent =
                    "Correo válido.";

            }

        });

    }


    if (clave) {

        clave.addEventListener("blur", function () {

            const valor =
                clave.value;

            const mensaje =
                document.getElementById("error-clave-login");


            if (valor === "") {

                mensaje.innerHTML = "";

                return;

            }


            if (
                valor.length < 4 ||
                valor.length > 10
            ) {

                mensaje.className =
                    "mensaje-error-dinamico";

                mensaje.textContent =
                    "La contraseña debe tener entre 4 y 10 caracteres.";

            } else {

                mensaje.className =
                    "mensaje-exito-dinamico";

                mensaje.textContent =
                    "Longitud de contraseña válida.";

            }

        });

    }

}


configurarValidacionesLogin();
