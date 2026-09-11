function validarCorreoPermitido(correo) {

    const correoLimpio = correo.trim().toLowerCase();

    return correoLimpio.endsWith("@duoc.cl") ||
           correoLimpio.endsWith("@profesor.duoc.cl") ||
           correoLimpio.endsWith("@gmail.com");
}


function validarRun(run) {

    let runLimpio = run.trim().toUpperCase();

    if (!/^[0-9]{7,8}[0-9K]$/.test(runLimpio)) {
        return false;
    }

    const cuerpo = runLimpio.slice(0, -1);
    const digitoIngresado = runLimpio.slice(-1);

    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {

        suma = suma + Number(cuerpo[i]) * multiplicador;

        multiplicador++;

        if (multiplicador > 7) {
            multiplicador = 2;
        }
    }

    const resto = suma % 11;
    const resultado = 11 - resto;

    let digitoCalculado = "";

    if (resultado === 11) {

        digitoCalculado = "0";

    } else if (resultado === 10) {

        digitoCalculado = "K";

    } else {

        digitoCalculado = String(resultado);

    }

    return digitoCalculado === digitoIngresado;
}


function calcularEdad(fechaNacimiento) {

    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);

    let edad = hoy.getFullYear() - nacimiento.getFullYear();

    const diferenciaMes = hoy.getMonth() - nacimiento.getMonth();

    if (
        diferenciaMes < 0 ||
        (diferenciaMes === 0 && hoy.getDate() < nacimiento.getDate())
    ) {
        edad--;
    }

    return edad;
}


function mostrarErrores(idContenedor, errores) {

    const contenedor = document.getElementById(idContenedor);

    let html = "";

    for (let error of errores) {

        html += '<div class="mensaje-error">' + error + '</div>';

    }

    contenedor.innerHTML = html;
}


function mostrarExito(idContenedor, mensaje) {

    document.getElementById(idContenedor).innerHTML =
        '<div class="mensaje-exito">' + mensaje + '</div>';
}