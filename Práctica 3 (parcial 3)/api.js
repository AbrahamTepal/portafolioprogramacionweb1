document.addEventListener("DOMContentLoaded", function () {
    let btnDescargarPDF = document.getElementById("descargarPDF");
    btnDescargarPDF.style.display = "none"; // Oculta el botón al cargar la página
    document.getElementById("diagnosticoForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Evita el envío tradicional del formulario

        let respuestasCorrectas = {
            "pregunta1": "nilo",
            "pregunta2": "davinci",
            "pregunta3": "8",
            "pregunta4": "francia",
            "pregunta5": "pacifico",
            "pregunta6": "cervantes",
            "pregunta7": "6",
            "pregunta8": "tokio",
            "pregunta9": "oxigeno",
            "pregunta10": "litio",
        };

        let respuestasUsuario = {};
        document.querySelectorAll("input[type=radio]:checked").forEach((input) => {
            respuestasUsuario[input.name] = input.value;
        });

        let puntuaciones = [];
        Object.keys(respuestasCorrectas).forEach((pregunta, index) => {
            let puntos = respuestasUsuario[pregunta] === respuestasCorrectas[pregunta] ? 1 : 0;
            puntuaciones.push([`Pregunta ${index + 1}`, puntos]);
        });

        let resultadoDiv = document.getElementById("resultado");
        resultadoDiv.innerHTML = `<h2>Respuestas correctas: ${puntuaciones.filter(p => p[1] === 1).length}</h2>`;

        // Mostrar el botón de descargar PDF después de enviar respuestas
        btnDescargarPDF.style.display = "block";

        // Cargar Google Charts y dibujar el gráfico
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(() => {
            let data = new google.visualization.DataTable();
            data.addColumn("string", "Pregunta");
            data.addColumn("number", "Puntos");
            data.addRows(puntuaciones);

            let options = {
                title: "Resultados del diagnóstico",
                hAxis: { title: "Preguntas" },
                vAxis: { title: "Puntos obtenidos", minValue: 0, maxValue: 1 },
                legend: "none"
            };

            let chart = new google.visualization.ColumnChart(document.getElementById("grafico"));
            chart.draw(data, options);
        });
    });
});

//Generar y descargar pdf
document.getElementById("descargarPDF").addEventListener("click", function () {
    const { jsPDF } = window.jspdf;

    let graficoElement = document.getElementById("grafico"); // Captura solo el gráfico
    html2canvas(graficoElement, { scale: 2 }).then(canvas => {
        let imgData = canvas.toDataURL("image/png");
        let pdf = new jsPDF("p", "mm", "a4");

        let imgWidth = 190; // Ajuste del ancho
        let imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
        pdf.save("grafico_resultados.pdf");
    });
});