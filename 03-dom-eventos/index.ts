// ============================================
// CLASE 3: TYPESCRIPT + DOM (PARTE 1)
// ============================================

// ============================================
// MÓDULO 3: Tipos Específicos del DOM
// ============================================

console.log("=== MÓDULO 3: Tipos del DOM ===");

const btn = document.querySelector<HTMLButtonElement>("#btn");
const input = document.querySelector<HTMLInputElement>("#input");
const titulo = document.querySelector<HTMLHeadingElement>("#titulo");

// Demostrar propiedades específicas
if (btn) {
  btn.addEventListener("click", () => {
    btn.disabled = true; // Propiedad específica de HTMLButtonElement
    btn.textContent = "¡Clickeado!";
    console.log("Botón deshabilitado");
  });
}

if (input) {
  input.addEventListener("input", () => {
    console.log("Valor del input:", input.value); // Propiedad específica de HTMLInputElement
  });
}

if (titulo) {
  titulo.addEventListener("click", () => {
    titulo.style.color = titulo.style.color === "red" ? "#333" : "red";
    console.log("Color del título cambiado");
  });
}

// ============================================
// MÓDULO 4: querySelector - Selección Individual
// ============================================

console.log("=== MÓDULO 4: querySelector ===");

const miBoton = document.querySelector<HTMLButtonElement>("#miBoton");
const mensaje = document.querySelector<HTMLParagraphElement>("#mensaje");

if (miBoton && mensaje) {
  miBoton.addEventListener("click", () => {
    mensaje.textContent = "¡Botón clickeado con TypeScript!";
    miBoton.disabled = true;
    miBoton.style.opacity = "0.5";
    console.log("querySelector: botón clickeado");
  });
}

// ============================================
// MÓDULO 5: querySelectorAll - Múltiples Elementos
// ============================================

console.log("=== MÓDULO 5: querySelectorAll ===");

const botones = document.querySelectorAll<HTMLButtonElement>(".btn");
const btnDeshabilitar =
  document.querySelector<HTMLButtonElement>("#deshabilitarTodos");

console.log(`Encontrados ${botones.length} botones con clase .btn`);

btnDeshabilitar?.addEventListener("click", () => {
  let contador = 0;

  // NodeList tiene forEach
  botones.forEach((boton) => {
    boton.disabled = true;
    boton.style.opacity = "0.5";
    contador++;
  });

  console.log(`${contador} botones deshabilitados`);

  if (btnDeshabilitar) {
    btnDeshabilitar.textContent = "¡Todos deshabilitados!";
    btnDeshabilitar.disabled = true;
  }
});

// Demostrar conversión a Array
const arrayBotones = Array.from(botones);
const textosBotones = arrayBotones.map((btn) => btn.textContent);
console.log("Textos de los botones:", textosBotones);

// ============================================
// MÓDULO 7: Event Types
// ============================================

console.log("=== MÓDULO 7: Event Types ===");

const btnClick = document.querySelector<HTMLButtonElement>("#btnClick");
const inputKey = document.querySelector<HTMLInputElement>("#inputKey");
const info = document.querySelector<HTMLParagraphElement>("#info");

// MouseEvent
btnClick?.addEventListener("click", (event: MouseEvent) => {
  if (info) {
    info.textContent = `MouseEvent - Click en coordenadas X: ${event.clientX}, Y: ${event.clientY}`;
    info.style.color = "#e74c3c";
  }
  console.log("MouseEvent:", {
    x: event.clientX,
    y: event.clientY,
    button: event.button,
  });
});

// KeyboardEvent
inputKey?.addEventListener("keydown", (event: KeyboardEvent) => {
  console.log("KeyboardEvent:", {
    key: event.key,
    code: event.code,
    ctrlKey: event.ctrlKey,
    shiftKey: event.shiftKey,
  });

  if (event.key === "Enter" && info && inputKey) {
    info.textContent = `KeyboardEvent - Presionaste Enter. Valor: "${inputKey.value}"`;
    info.style.color = "#27ae60";
    inputKey.value = "";
  }
});

// ============================================
// MÓDULO 8: target vs currentTarget
// ============================================

console.log("=== MÓDULO 8: target vs currentTarget ===");

const contenedor = document.querySelector<HTMLDivElement>("#contenedor");
const infoTarget = document.querySelector<HTMLParagraphElement>("#infoTarget");

contenedor?.addEventListener("click", (event: MouseEvent) => {
  // target: elemento específico clickeado
  const target = event.target as HTMLElement;

  // currentTarget: elemento con el listener (siempre contenedor)
  const currentTarget = event.currentTarget as HTMLDivElement;

  if (infoTarget) {
    infoTarget.innerHTML = `
      <strong>target</strong> (elemento clickeado): ${target.tagName}<br>
      <strong>currentTarget</strong> (listener en): ${currentTarget.id}
    `;
  }

  console.log("Event delegation:", {
    target: target.tagName,
    currentTarget: currentTarget.id,
  });

  // Event delegation: acción específica según tipo
  if (target instanceof HTMLButtonElement) {
    target.style.backgroundColor = "#3498db";
    target.style.color = "white";
    console.log("Clickeaste un botón");
  } else if (target instanceof HTMLParagraphElement) {
    target.style.fontWeight = "bold";
    console.log("Clickeaste un párrafo");
  }
});

// ============================================
// MÓDULO 9: Formulario de Contacto
// ============================================

console.log("=== MÓDULO 9: Formulario con Validación ===");

const form = document.querySelector<HTMLFormElement>("#contacto");
const nombreInput = document.querySelector<HTMLInputElement>("#nombre");
const emailInput = document.querySelector<HTMLInputElement>("#email");
const mensajeInput =
  document.querySelector<HTMLTextAreaElement>("#mensajeForm");
const resultado = document.querySelector<HTMLDivElement>("#resultado");

function mostrarError(msg: string): void {
  if (resultado) {
    resultado.textContent = `❌ ${msg}`;
    resultado.style.color = "#e74c3c";
    resultado.style.backgroundColor = "#ffe6e6";
    resultado.style.display = "block";
  }
  console.error("Error de validación:", msg);
}

function mostrarExito(msg: string): void {
  if (resultado) {
    resultado.textContent = `✅ ${msg}`;
    resultado.style.color = "#27ae60";
    resultado.style.backgroundColor = "#e6ffe6";
    resultado.style.display = "block";
  }
  console.log("Formulario enviado:", msg);
}

form?.addEventListener("submit", (event: Event) => {
  event.preventDefault();

  if (!nombreInput || !emailInput || !mensajeInput || !resultado) {
    console.error("Elementos del formulario no encontrados");
    return;
  }

  const nombre = nombreInput.value.trim();
  const email = emailInput.value.trim();
  const mensaje = mensajeInput.value.trim();

  // Validaciones
  if (nombre.length < 3) {
    mostrarError("El nombre debe tener al menos 3 caracteres");
    nombreInput.focus();
    return;
  }

  if (!email.includes("@") || !email.includes(".")) {
    mostrarError("Email inválido (debe contener @ y dominio)");
    emailInput.focus();
    return;
  }

  if (mensaje.length < 10) {
    mostrarError("El mensaje debe tener al menos 10 caracteres");
    mensajeInput.focus();
    return;
  }

  // Éxito
  mostrarExito(`Gracias ${nombre}, te contactaremos a ${email} pronto.`);

  console.log("Datos del formulario:", { nombre, email, mensaje });

  // Limpiar formulario
  form.reset();
});

// ============================================
// MÓDULO 10: Lista Interactiva
// ============================================

console.log("=== MÓDULO 10: Lista Interactiva ===");

const itemInput = document.querySelector<HTMLInputElement>("#itemInput");
const agregarBtn = document.querySelector<HTMLButtonElement>("#agregarBtn");
const lista = document.querySelector<HTMLUListElement>("#lista");

let itemCounter = 0;

function agregarItem(): void {
  if (!itemInput || !lista) {
    console.error("Elementos de lista no encontrados");
    return;
  }

  const texto = itemInput.value.trim();

  if (texto === "") {
    alert("⚠️ Escribe algo primero");
    itemInput.focus();
    return;
  }

  itemCounter++;

  // Crear elementos
  const li = document.createElement("li");
  li.style.cssText = `
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    margin: 8px 0;
    background: #f8f9fa;
    border-radius: 6px;
    border-left: 3px solid #3498db;
    transition: all 0.3s ease;
  `;

  const span = document.createElement("span");
  span.textContent = `${itemCounter}. ${texto}`;
  span.style.flex = "1";

  const btnEliminar = document.createElement("button");
  btnEliminar.textContent = "Eliminar";
  btnEliminar.style.cssText = `
    background: #e74c3c;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
  `;

  btnEliminar.addEventListener("click", () => {
    li.style.opacity = "0";
    li.style.transform = "translateX(20px)";
    setTimeout(() => {
      li.remove();
      console.log(`Item "${texto}" eliminado`);
    }, 300);
  });

  btnEliminar.addEventListener("mouseenter", () => {
    btnEliminar.style.backgroundColor = "#c0392b";
  });

  btnEliminar.addEventListener("mouseleave", () => {
    btnEliminar.style.backgroundColor = "#e74c3c";
  });

  li.appendChild(span);
  li.appendChild(btnEliminar);
  lista.appendChild(li);

  console.log(`Item #${itemCounter} agregado: "${texto}"`);

  // Limpiar input
  itemInput.value = "";
  itemInput.focus();
}

agregarBtn?.addEventListener("click", agregarItem);

itemInput?.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    agregarItem();
  }
});

// ============================================
// LOGS FINALES
// ============================================

console.log("✅ Clase 3 inicializada correctamente");
console.log("📚 Módulos activos: 3, 4, 5, 7, 8, 9, 10");
