let pantalla = document.getElementById("pantalla");
let historial = document.getElementById("historial");
let cientifica = document.getElementById("cientifica");

let expresion = "";
let historialDatos = JSON.parse(localStorage.getItem("historialCalc")) || [];

function agregar(valor) {
  expresion += valor;
  pantalla.value = expresion;
}

function limpiar() {
  expresion = "";
  pantalla.value = "";
}

function borrar() {
  expresion = expresion.slice(0, -1);
  pantalla.value = expresion;
}

function calcular() {
  try {
    let resultado = eval(expresion);
    pantalla.value = resultado;
    guardarHistorial(`${expresion} = ${resultado}`);
    expresion = resultado.toString();
  } catch {
    pantalla.value = "Error";
    expresion = "";
  }
}

function funcion(nombre, extra) {
  try {
    let valor = parseFloat(expresion);
    let resultado;

    if (nombre === "Math.PI") resultado = Math.PI;
    else if (nombre === "Math.E") resultado = Math.E;
    else if (nombre === "Math.pow") resultado = Math.pow(valor, extra);
    else resultado = eval(`${nombre}(${valor})`);

    pantalla.value = resultado;
    guardarHistorial(`${nombre.replace("Math.", "")}(${valor}) = ${resultado}`);
    expresion = resultado.toString();
  } catch {
    pantalla.value = "Error";
    expresion = "";
  }
}

function guardarHistorial(item) {
  historialDatos.unshift(item);
  if (historialDatos.length > 10) historialDatos.pop(); // Máximo 10
  localStorage.setItem("historialCalc", JSON.stringify(historialDatos));
  mostrarHistorial();
}

function mostrarHistorial() {
  historial.innerHTML = "";
  historialDatos.forEach(h => {
    let li = document.createElement("li");
    li.textContent = h;
    historial.appendChild(li);
  });
}

function toggleModo() {
  cientifica.style.display = cientifica.style.display === "grid" ? "none" : "grid";
}

mostrarHistorial();
