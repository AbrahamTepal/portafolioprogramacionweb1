function calcularTotal() {
    let selects = document.querySelectorAll("select");
    let total = document.getElementById("total");
    let precioTotal = 0;
    let resumenPedido = document.getElementById("resumenPedido");

    resumenPedido.innerHTML = ""; // Limpia el resumen antes de agregar datos

    selects.forEach(select => {
        if (select.selectedIndex !== -1) {
            let opcionSeleccionada = select.options[select.selectedIndex];
            let precio = parseFloat(opcionSeleccionada.value) || 0;
            precioTotal += precio;

            resumenPedido.innerHTML += `<p>${opcionSeleccionada.textContent}</p>`;
        }
    });

    total.textContent = "Total a pagar: $" + precioTotal.toLocaleString("es-MX") + " MXN";

    verificarFormularioCompleto();
}

function verificarFormularioCompleto() {
    let inputs = document.querySelectorAll("input[required]");
    let resumenSection = document.getElementById("resumen");

    let todosCompletos = Array.from(inputs).every(input => input.value.trim() !== "");

    resumenSection.style.display = todosCompletos ? "block" : "none";
}