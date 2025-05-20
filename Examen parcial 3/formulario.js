document.getElementById("calcular").addEventListener("click", function() {
    var horas = document.getElementById("horas").value;
    var tarifa = document.getElementById("tipo").value;

    // Valida que el número de horas sea válido 
    if (horas === "" || isNaN(horas) || Number(horas) <= 0) {
        alert("Por favor, ingresa un número válido de horas.");
        return;
    }

    // Calcular el total
    var total = Number(horas) * Number(tarifa);

    // Mostrar el resultado en el párrafo correcto
    document.getElementById("resultado").textContent = `Total a pagar: $${total.toFixed(2)}`;
});