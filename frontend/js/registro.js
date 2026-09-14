function registrarUsuario() {

    const run = document.getElementById("run").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
    const region = document.getElementById("region").value
    const comuna = document.getElementById("comuna").value;
    const direccion = document.getElementById("direccion").value.trim();
    const clave = document.getElementById("clave").value;
    const confirmarClave = document.getElementById("confirmarClave").value;

    const errores = [];

    if (run === "") {
        errores.push("El RUN es obligatorio.");
    } else if (run.length < 7 || run.length > 9) {
        errores.push("El RUN debe tener entre 7 y 9 caracteres.");
    } else if (!validarRun(run)) {
        errores.push("El RUN ingresado no es válido.");
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
        errores.push("El correo es obligatorio.");
    } else if (correo.length > 100) {
        errores.push("El correo no puede superar los 100 caracteres.");
    } else if (!validarCorreoPermitido(correo)) {
        errores.push("Solo se permiten correos @duoc.cl, @profesor.duoc.cl y @gmail.com.");
    }

    if (fechaNacimiento === "") {
        errores.push("Debe ingresar su fecha de nacimiento.");
    } else if (calcularEdad(fechaNacimiento) < 18) {
        errores.push("Debe ser mayor de 18 años para registrarse.");
    }

    if (
        region !== "" &&
        comuna === ""
    ) {

        errores.push(
            "Debe seleccionar una comuna para la región elegida."
        );

    }

    if (direccion === "") {
        errores.push("La dirección es obligatoria.");
    } else if (direccion.length > 300) {
        errores.push("La dirección no puede superar los 300 caracteres.");
    }

    if (clave === "") {
        errores.push("La contraseña es obligatoria.");
    } else if (clave.length < 4 || clave.length > 10) {
        errores.push("La contraseña debe tener entre 4 y 10 caracteres.");
    }

    if (clave !== confirmarClave) {
        errores.push("Las contraseñas no coinciden.");
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    for (let usuario of usuarios) {

        if (
            usuario.run.toUpperCase() ===
            run.toUpperCase()
        ) {

            errores.push(
                "Ya existe un usuario registrado con ese RUN."
            );

        }


        if (
            usuario.correo.toLowerCase() ===
            correo.toLowerCase()
        ) {

            errores.push(
                "Ya existe un usuario registrado con ese correo."
            );

        }

    }

    if (errores.length > 0) {
        mostrarErrores("mensajes-registro", errores);
        return;
    }

    const nuevoUsuario = {
        run: run,
        nombre: nombre,
        apellidos: apellidos,
        correo: correo,
        fechaNacimiento: fechaNacimiento,
        direccion: direccion,
        tipoUsuario: "Cliente",
        region: region,
        comuna: comuna
    };

    usuarios.push(nuevoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mostrarExito("mensajes-registro", "Usuario registrado correctamente.");

    document.getElementById("form-registro").reset();
}

function configurarValidacionesRegistro() {

    const run =
        document.getElementById("run");

    const correo =
        document.getElementById("correo");

    const clave =
        document.getElementById("clave");

    const confirmarClave =
        document.getElementById("confirmarClave");


    if (run) {

        run.addEventListener("blur", function () {

            const valor =
                run.value.trim();

            const mensaje =
                document.getElementById("error-run");


            if (valor === "") {

                mensaje.innerHTML = "";

                return;

            }


            if (!validarRun(valor)) {

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


    if (correo) {

        correo.addEventListener("blur", function () {

            const valor =
                correo.value.trim();

            const mensaje =
                document.getElementById("error-correo");


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
                document.getElementById("error-clave");


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


    if (confirmarClave) {

        confirmarClave.addEventListener("blur", function () {

            const claveValor =
                clave.value;

            const confirmarValor =
                confirmarClave.value;

            const mensaje =
                document.getElementById("error-confirmar-clave");


            if (confirmarValor === "") {

                mensaje.innerHTML = "";

                return;

            }


            if (claveValor !== confirmarValor) {

                mensaje.className =
                    "mensaje-error-dinamico";

                mensaje.textContent =
                    "Las contraseñas no coinciden.";

            } else {

                mensaje.className =
                    "mensaje-exito-dinamico";

                mensaje.textContent =
                    "Las contraseñas coinciden.";

            }

        });

    }

}


configurarValidacionesRegistro();


cargarRegiones();