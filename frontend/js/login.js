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

    mostrarExito("mensajes-login", "Inicio de sesión simulado correctamente.");

    document.getElementById("form-login").reset();
}