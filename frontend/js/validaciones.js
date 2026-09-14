function validarCorreoPermitido(correo) {

    const correoLimpio =
        correo.trim().toLowerCase();


    const formatoCorreo =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!formatoCorreo.test(correoLimpio)) {

        return false;

    }


    return correoLimpio.endsWith("@duoc.cl") ||
           correoLimpio.endsWith("@profesor.duoc.cl") ||
           correoLimpio.endsWith("@gmail.com");

}



function validarRun(run) {

    const runLimpio =
        run.trim().toUpperCase();


    if (
        runLimpio.length < 7 ||
        runLimpio.length > 9
    ) {

        return false;

    }


    if (
        !/^[0-9]{6,8}[0-9K]$/.test(runLimpio)
    ) {

        return false;

    }


    const cuerpo =
        runLimpio.slice(0, -1);


    const digitoIngresado =
        runLimpio.slice(-1);


    let suma = 0;

    let multiplicador = 2;


    for (
        let i = cuerpo.length - 1;
        i >= 0;
        i--
    ) {

        suma =
            suma +
            Number(cuerpo[i]) * multiplicador;


        multiplicador++;


        if (multiplicador > 7) {

            multiplicador = 2;

        }

    }


    const resto =
        suma % 11;


    const resultado =
        11 - resto;


    let digitoCalculado = "";


    if (resultado === 11) {

        digitoCalculado = "0";

    } else if (resultado === 10) {

        digitoCalculado = "K";

    } else {

        digitoCalculado =
            String(resultado);

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


function validarRegistroRunDinamico() {

const campoRun = document.getElementById("run");
const mensaje = document.getElementById("error-run");

if (!campoRun || !mensaje) {
    return;
}

const run = campoRun.value.trim();

if (run === "") {
    mensaje.innerHTML = "";
    return;
}

if (!validarRun(run)) {

    mensaje.innerHTML =
        '<div class="mensaje-error">' +
        'El RUN ingresado no es válido.' +
        '</div>';

} else {

    mensaje.innerHTML =
        '<div class="mensaje-exito">' +
        'RUN válido.' +
        '</div>';
}


}

function validarRegistroCorreoDinamico() {

const campoCorreo = document.getElementById("correo");
const mensaje = document.getElementById("error-correo");

if (!campoCorreo || !mensaje) {
    return;
}

const correo = campoCorreo.value.trim();

if (correo === "") {
    mensaje.innerHTML = "";
    return;
}

if (!validarCorreoPermitido(correo)) {

    mensaje.innerHTML =
        '<div class="mensaje-error">' +
        'El correo ingresado no es válido o el dominio no está permitido.' +
        '</div>';

} else {

    mensaje.innerHTML =
        '<div class="mensaje-exito">' +
        'Correo válido.' +
        '</div>';
}


}

function validarRegistroClaveDinamica() {

const campoClave = document.getElementById("clave");
const mensaje = document.getElementById("error-clave");

if (!campoClave || !mensaje) {
    return;
}

const clave = campoClave.value;

if (clave === "") {
    mensaje.innerHTML = "";
    return;
}

if (clave.length < 4 || clave.length > 10) {

    mensaje.innerHTML =
        '<div class="mensaje-error">' +
        'La contraseña debe tener entre 4 y 10 caracteres.' +
        '</div>';

} else {

    mensaje.innerHTML =
        '<div class="mensaje-exito">' +
        'Longitud de contraseña válida.' +
        '</div>';
}


}

function validarConfirmarClaveDinamica() {

const campoClave = document.getElementById("clave");
const campoConfirmar =
    document.getElementById("confirmarClave");

const mensaje =
    document.getElementById("error-confirmar-clave");

if (
    !campoClave ||
    !campoConfirmar ||
    !mensaje
) {
    return;
}

const clave = campoClave.value;
const confirmar = campoConfirmar.value;

if (confirmar === "") {
    mensaje.innerHTML = "";
    return;
}

if (clave !== confirmar) {

    mensaje.innerHTML =
        '<div class="mensaje-error">' +
        'Las contraseñas no coinciden.' +
        '</div>';

} else {

    mensaje.innerHTML =
        '<div class="mensaje-exito">' +
        'Las contraseñas coinciden.' +
        '</div>';
}


}

function iniciarValidacionesRegistro() {

const campoRun =
    document.getElementById("run");

const campoCorreo =
    document.getElementById("correo");

const campoClave =
    document.getElementById("clave");

const campoConfirmar =
    document.getElementById("confirmarClave");


if (campoRun) {

    campoRun.addEventListener(
        "blur",
        validarRegistroRunDinamico
    );
}


if (campoCorreo) {

    campoCorreo.addEventListener(
        "blur",
        validarRegistroCorreoDinamico
    );
}


if (campoClave) {

    campoClave.addEventListener(
        "blur",
        validarRegistroClaveDinamica
    );
}


if (campoConfirmar) {

    campoConfirmar.addEventListener(
        "blur",
        validarConfirmarClaveDinamica
    );
}


}

iniciarValidacionesRegistro();