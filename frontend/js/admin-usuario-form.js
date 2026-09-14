function guardarUsuarioAdmin() {
    const run = document.getElementById("run").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const tipoUsuario = document.getElementById("tipoUsuario").value;
    const region = document.getElementById("region").value;
    const comuna = document.getElementById("comuna").value;
    const direccion = document.getElementById("direccion").value.trim();

    const errores = [];

    if (run === "") {
        errores.push("El RUN es obligatorio.");
    } else if (!validarRun(run)) {
        errores.push("El RUN no es válido.");
    }

    if (nombre === "") {
        errores.push("El nombre es obligatorio.");
    } else if (nombre.length > 50) {
        errores.push("El nombre no puede superar los 50 caracteres.");
    }

    if (apellidos === "") {
        errores.push("Los apellidos son obligatorios.");
    } else if (apellidos.length > 100) {
        errores.push("Los apellidos no pueden superar los 100 caracteres.");
    }

    if (correo === "") {

        errores.push(
            "El correo es obligatorio."
        );

    } else if (correo.length > 100) {

        errores.push(
            "El correo no puede superar los 100 caracteres."
        );

    } else if (!validarCorreoPermitido(correo)) {

        errores.push(
            "El correo ingresado no es válido o su dominio no está permitido."
        );

    }

    if (tipoUsuario === "") {
        errores.push("Seleccione un tipo de usuario.");
    }

    if (direccion === "") {
        errores.push("La dirección es obligatoria.");
    } else if (direccion.length > 300) {
        errores.push("La dirección no puede superar los 300 caracteres.");
    }

    if (errores.length > 0) {
        mostrarErrores("mensajes-usuario-admin", errores);
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const indiceEditar = localStorage.getItem("usuarioEditar");

    const usuario = {
        run: run,
        nombre: nombre,
        apellidos: apellidos,
        correo: correo,
        fechaNacimiento: fechaNacimiento,
        tipoUsuario: tipoUsuario,
        region: region,
        comuna: comuna,
        direccion: direccion
    };

    if (indiceEditar !== null) {
        usuarios[Number(indiceEditar)] = usuario;
        localStorage.removeItem("usuarioEditar");
    } else {
        usuarios.push(usuario);
    }

    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    mostrarExito("mensajes-usuario-admin", "Usuario guardado correctamente.");
}

function cargarUsuarioEditar() {
    const indiceEditar = localStorage.getItem("usuarioEditar");
    if (indiceEditar === null) {
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuarios[Number(indiceEditar)];
    if (!usuario) {
        return;
    }

    document.getElementById("run").value = usuario.run;
    document.getElementById("nombre").value = usuario.nombre;
    document.getElementById("apellidos").value = usuario.apellidos;
    document.getElementById("correo").value = usuario.correo;
    document.getElementById("fechaNacimiento").value = usuario.fechaNacimiento || "";
    document.getElementById("tipoUsuario").value = usuario.tipoUsuario || "";
    document.getElementById("region").value = usuario.region || "";
    cargarComunas();
    document.getElementById("comuna").value = usuario.comuna || "";
    document.getElementById("direccion").value = usuario.direccion;
}

function configurarValidacionesUsuarioAdmin() {

    const run =
        document.getElementById("run");

    const nombre =
        document.getElementById("nombre");

    const apellidos =
        document.getElementById("apellidos");

    const correo =
        document.getElementById("correo");

    const tipoUsuario =
        document.getElementById("tipoUsuario");

    const direccion =
        document.getElementById("direccion");


    /* RUN */

    if (run) {

        run.addEventListener("blur", function () {

            const valor =
                run.value.trim();

            const mensaje =
                document.getElementById(
                    "error-run-admin"
                );


            if (valor === "") {

                mensaje.className =
                    "mensaje-error-dinamico";

                mensaje.textContent =
                    "El RUN es obligatorio.";

            } else if (!validarRun(valor)) {

                mensaje.className =
                    "mensaje-error-dinamico";

                mensaje.textContent =
                    "El RUN ingresado no es válido.";

            } else {

                mensaje.className =
                    "mensaje-exito-dinamico";

                mensaje.textContent =
                    "RUN válido.";

            }

        });

    }


    /* NOMBRE */

    if (nombre) {

        nombre.addEventListener("blur", function () {

            const valor =
                nombre.value.trim();

            const mensaje =
                document.getElementById(
                    "error-nombre-admin"
                );


            if (valor === "") {

                mensaje.className =
                    "mensaje-error-dinamico";

                mensaje.textContent =
                    "El nombre es obligatorio.";

            } else if (valor.length > 50) {

                mensaje.className =
                    "mensaje-error-dinamico";

                mensaje.textContent =
                    "El nombre no puede superar los 50 caracteres.";

            } else {

                mensaje.className =
                    "mensaje-exito-dinamico";

                mensaje.textContent =
                    "Nombre válido.";

            }

        });

    }


    /* APELLIDOS */

    if (apellidos) {

        apellidos.addEventListener("blur", function () {

            const valor =
                apellidos.value.trim();

            const mensaje =
                document.getElementById(
                    "error-apellidos-admin"
                );


            if (valor === "") {

                mensaje.className =
                    "mensaje-error-dinamico";

                mensaje.textContent =
                    "Los apellidos son obligatorios.";

            } else if (valor.length > 100) {

                mensaje.className =
                    "mensaje-error-dinamico";

                mensaje.textContent =
                    "Los apellidos no pueden superar los 100 caracteres.";

            } else {

                mensaje.className =
                    "mensaje-exito-dinamico";

                mensaje.textContent =
                    "Apellidos válidos.";

            }

        });

    }


    /* CORREO */

    if (correo) {

        correo.addEventListener("blur", function () {

            const valor =
                correo.value.trim();

            const mensaje =
                document.getElementById(
                    "error-correo-admin"
                );


            if (valor === "") {

                mensaje.className =
                    "mensaje-error-dinamico";

                mensaje.textContent =
                    "El correo es obligatorio.";

            } else if (valor.length > 100) {

                mensaje.className =
                    "mensaje-error-dinamico";

                mensaje.textContent =
                    "El correo no puede superar los 100 caracteres.";

            } else if (!validarCorreoPermitido(valor)) {

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


    /* TIPO DE USUARIO */

    if (tipoUsuario) {

        tipoUsuario.addEventListener("change", function () {

            const mensaje =
                document.getElementById(
                    "error-tipo-admin"
                );


            if (tipoUsuario.value === "") {

                mensaje.className =
                    "mensaje-error-dinamico";

                mensaje.textContent =
                    "Debe seleccionar un tipo de usuario.";

            } else {

                mensaje.className =
                    "mensaje-exito-dinamico";

                mensaje.textContent =
                    "Tipo de usuario seleccionado.";

            }

        });

    }


    /* DIRECCIÓN */

    if (direccion) {

        direccion.addEventListener("blur", function () {

            const valor =
                direccion.value.trim();

            const mensaje =
                document.getElementById(
                    "error-direccion-admin"
                );


            if (valor === "") {

                mensaje.className =
                    "mensaje-error-dinamico";

                mensaje.textContent =
                    "La dirección es obligatoria.";

            } else if (valor.length > 300) {

                mensaje.className =
                    "mensaje-error-dinamico";

                mensaje.textContent =
                    "La dirección no puede superar los 300 caracteres.";

            } else {

                mensaje.className =
                    "mensaje-exito-dinamico";

                mensaje.textContent =
                    "Dirección válida.";

            }

        });

    }

}

cargarRegiones();
cargarUsuarioEditar();
configurarValidacionesUsuarioAdmin();