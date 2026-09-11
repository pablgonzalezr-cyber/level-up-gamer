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
        errores.push("El correo es obligatorio.");
    } else if (!validarCorreoPermitido(correo)) {
        errores.push("El dominio del correo no está permitido.");
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

cargarRegiones();
cargarUsuarioEditar();