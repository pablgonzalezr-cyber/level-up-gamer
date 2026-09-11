function registrarUsuario() {

    const run = document.getElementById("run").value.trim();
    const nombre = document.getElementById("nombre").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const fechaNacimiento = document.getElementById("fechaNacimiento").value;
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
        if (usuario.run === run) {
            errores.push("Ya existe un usuario registrado con ese RUN.");
        }
        if (usuario.correo === correo) {
            errores.push("Ya existe un usuario registrado con ese correo.");
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
        region: "",
        comuna: ""
    };

    usuarios.push(nuevoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    mostrarExito("mensajes-registro", "Usuario registrado correctamente.");

    document.getElementById("form-registro").reset();
}