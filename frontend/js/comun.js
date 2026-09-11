console.log("Level-Up Gamer iniciado correctamente");


function actualizarContadorCarrito() {

    const contador = document.getElementById("contador-carrito");

    if (contador) {

        const carrito =
            JSON.parse(localStorage.getItem("carrito")) || [];

        let cantidadTotal = 0;


        for (let producto of carrito) {

            cantidadTotal =
                cantidadTotal + producto.cantidad;

        }


        contador.innerHTML = cantidadTotal;

    }

}


actualizarContadorCarrito();