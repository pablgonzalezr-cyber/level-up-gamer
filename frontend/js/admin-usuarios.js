function mostrarUsuariosAdmin() {
    const cuerpoTabla = document.getElementById("cuerpo-usuarios");
    if (!cuerpoTabla) {
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    let html = "";

    if (usuarios.length === 0) {
        html = '<tr><td colspan="6">No existen usuarios registrados.</td></tr>';
    } else {
        for (let i = 0; i < usuarios.length; i++) {
            const usuario = usuarios[i];

            html +=
                '<tr>' +
                    '<td>' + usuario.run + '</td>' +
                    '<td>' + usuario.nombre + ' ' + usuario.apellidos + '</td>' +
                    '<td>' + usuario.correo + '</td>' +
                    '<td>' + usuario.tipoUsuario + '</td>' +
                    '<td>' + (usuario.region || "-") + '</td>' +
                    '<td>' +
                        '<button class="boton-admin" onclick="editarUsuario(' + i + ')">Editar</button> ' +
                        '<button class="boton-admin boton-eliminar" onclick="eliminarUsuario(' + i + ')">Eliminar</button>' +
                    '</td>' +
                '</tr>';
        }
    }

    cuerpoTabla.innerHTML = html;
}

function nuevoUsuario() {
    localStorage.removeItem("usuarioEditar");
    window.location.href = "usuario-form.html";
}

function editarUsuario(indice) {
    localStorage.setItem("usuarioEditar", indice);
    window.location.href = "usuario-form.html";
}

function eliminarUsuario(indice) {
    const confirmar = confirm("¿Está seguro de eliminar este usuario?");
    if (!confirmar) {
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    usuarios.splice(indice, 1);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    mostrarUsuariosAdmin();
}

mostrarUsuariosAdmin();
