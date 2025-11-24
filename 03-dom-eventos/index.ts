// ============================================
// CLASE 3: TYPESCRIPT + DOM (PARTE 1)
// ============================================

// ============================================
// MÓDULO 3: Tipos del DOM - HTMLElement
// ============================================

const btnTipos = document.querySelector<HTMLButtonElement>("#btn-tipos");
const inputTipos = document.querySelector<HTMLInputElement>("#input-tipos");
const resultadoTipos =
  document.querySelector<HTMLDivElement>("#resultado-tipos");

btnTipos?.addEventListener("click", () => {
  if (inputTipos && resultadoTipos) {
    const valor = inputTipos.value;
    resultadoTipos.textContent = `Escribiste: ${valor}`;
    resultadoTipos.style.color = "blue";
  }
});

// ============================================
// MÓDULO 4: querySelector con Tipos Genéricos
// ============================================

// Especificar el tipo con genéricos
const button = document.querySelector<HTMLButtonElement>("#mi-boton");
const input = document.querySelector<HTMLInputElement>("#email");
const form = document.querySelector<HTMLFormElement>("#formulario");

// Verificar si existe antes de usar
if (button) {
  button.textContent = "Hacer click";
  button.disabled = false;
}

if (input) {
  input.placeholder = "Ingrese su email";
}

// ============================================
// MÓDULO 5: getElementById y querySelectorAll
// ============================================

// getElementById
const titulo = document.getElementById("titulo");
if (titulo) {
  titulo.style.color = "#007bff";
}

// querySelectorAll - retorna NodeList
const botones = document.querySelectorAll<HTMLButtonElement>(".btn");

// NodeList tiene forEach
botones.forEach((boton, index) => {
  boton.addEventListener("click", () => {
    console.log(`Clickeaste el botón ${index + 1}`);
  });
});

// getElementsByClassName retorna HTMLCollection
const items = document.getElementsByClassName("item");
const arrayItems = Array.from(items);
arrayItems.forEach((item, index) => {
  item.textContent = `Item ${index + 1} - Actualizado`;
});

// ============================================
// MÓDULO 7: Event Types - Tipos de Eventos
// ============================================

const btnEventos = document.querySelector<HTMLButtonElement>("#btn");
const inputTexto = document.querySelector<HTMLInputElement>("#texto");
const resultadoEventos =
  document.querySelector<HTMLDivElement>("#resultado-eventos");

// MouseEvent
btnEventos?.addEventListener("click", (event: MouseEvent) => {
  if (resultadoEventos) {
    resultadoEventos.textContent = `Click en X: ${event.clientX}, Y: ${event.clientY}`;
  }
});

// KeyboardEvent
inputTexto?.addEventListener("keydown", (event: KeyboardEvent) => {
  console.log("Tecla presionada:", event.key);

  if (event.key === "Enter" && resultadoEventos) {
    resultadoEventos.textContent = `Presionaste Enter! Valor: ${inputTexto.value}`;
  }
});

// FocusEvent
inputTexto?.addEventListener("focus", (event: FocusEvent) => {
  console.log("Input tiene foco");
  if (inputTexto) {
    inputTexto.style.borderColor = "blue";
  }
});

inputTexto?.addEventListener("blur", (event: FocusEvent) => {
  console.log("Input perdió el foco");
  if (inputTexto) {
    inputTexto.style.borderColor = "#ddd";
  }
});

// ============================================
// MÓDULO 8: event.target y event.currentTarget
// ============================================

const contenedor = document.querySelector<HTMLDivElement>("#contenedor");
const resultadoTarget =
  document.querySelector<HTMLDivElement>("#resultado-target");

contenedor?.addEventListener("click", (event: MouseEvent) => {
  // target: el elemento específico clickeado
  const target = event.target as HTMLElement;

  // currentTarget: siempre es el contenedor
  const currentTarget = event.currentTarget as HTMLDivElement;

  if (resultadoTarget) {
    resultadoTarget.innerHTML = `
      <p><strong>Target (elemento clickeado):</strong> ${target.tagName}</p>
      <p><strong>CurrentTarget (listener en):</strong> ${currentTarget.id}</p>
    `;
  }
});

// ============================================
// MÓDULO 9: Ejemplo Práctico - Formulario
// ============================================

const formulario = document.querySelector<HTMLFormElement>("#formulario");
const nombreInput = document.querySelector<HTMLInputElement>("#nombre");
const emailInput = document.querySelector<HTMLInputElement>("#email");
const resultado = document.querySelector<HTMLDivElement>("#resultado");

formulario?.addEventListener("submit", (event: Event) => {
  event.preventDefault();

  if (!nombreInput || !emailInput || !resultado) {
    console.error("Elementos no encontrados");
    return;
  }

  const nombre = nombreInput.value.trim();
  const email = emailInput.value.trim();

  // Validaciones
  if (nombre === "") {
    resultado.textContent = "El nombre es requerido";
    resultado.style.color = "red";
    resultado.style.backgroundColor = "#ffe6e6";
    resultado.style.padding = "10px";
    return;
  }

  if (email === "" || !email.includes("@")) {
    resultado.textContent = "Email inválido";
    resultado.style.color = "red";
    resultado.style.backgroundColor = "#ffe6e6";
    resultado.style.padding = "10px";
    return;
  }

  // Éxito
  resultado.textContent = `¡Bienvenido ${nombre}! Email: ${email}`;
  resultado.style.color = "green";
  resultado.style.backgroundColor = "#e6ffe6";
  resultado.style.padding = "10px";

  // Limpiar formulario
  nombreInput.value = "";
  emailInput.value = "";
});

// ============================================
// MÓDULO 10: Ejemplo Práctico - Lista de Tareas
// ============================================

const inputTarea = document.querySelector<HTMLInputElement>("#nuevaTarea");
const btnAgregar = document.querySelector<HTMLButtonElement>("#agregarBtn");
const listaTareas = document.querySelector<HTMLUListElement>("#listaTareas");

function agregarTarea(): void {
  if (!inputTarea || !listaTareas) return;

  const textoTarea = inputTarea.value.trim();

  if (textoTarea === "") {
    alert("Por favor ingresa una tarea");
    return;
  }

  // Crear elementos
  const li = document.createElement("li");
  li.textContent = textoTarea;

  // Crear botón eliminar
  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Eliminar";

  // Evento para eliminar
  btnEliminar.addEventListener("click", (event: MouseEvent) => {
    const target = event.currentTarget as HTMLButtonElement;
    const liElement = target.parentElement as HTMLLIElement;
    liElement.remove();
  });

  li.appendChild(btnEliminar);
  listaTareas.appendChild(li);

  // Limpiar input
  inputTarea.value = "";
  inputTarea.focus();
}

btnAgregar?.addEventListener("click", agregarTarea);

// También agregar con Enter
inputTarea?.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    agregarTarea();
  }
});

// ============================================
// EJEMPLOS ADICIONALES
// ============================================

// Cambiar clases CSS
const elemento1 = document.querySelector<HTMLDivElement>("#contenedor");
if (elemento1) {
  elemento1.classList.add("activo");
  const tieneClase = elemento1.classList.contains("activo");
  console.log("Tiene clase activo:", tieneClase);
}

// Trabajar con checkboxes (ejemplo)
const crearCheckboxEjemplo = () => {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "miCheckbox";

  checkbox.addEventListener("change", (event: Event) => {
    const target = event.target as HTMLInputElement;
    console.log("Checkbox está:", target.checked ? "marcado" : "desmarcado");
  });
};
