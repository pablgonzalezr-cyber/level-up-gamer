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