// ============================================
// CLASE 4: TYPESCRIPT + DOM (PARTE 2) + AVANZADO
// ============================================

console.log("=== CLASE 4 INICIALIZADA ===");

// ============================================
// MÓDULO 2-3: FormData en Acción
// ============================================

const form = document.querySelector<HTMLFormElement>("#registro");
const resultado = document.querySelector<HTMLDivElement>("#resultado");

form?.addEventListener("submit", (event: Event) => {
  event.preventDefault();

  console.log("=== FORMULARIO ENVIADO ===");

  const formElement = event.currentTarget as HTMLFormElement;

  // Usar FormData para extraer todos los valores
  const formData = new FormData(formElement);

  // Extraer cada campo
  const datos = {
    nombre: formData.get("nombre") as string,
    email: formData.get("email") as string,
    edad: parseInt(formData.get("edad") as string),
    pais: formData.get("pais") as string,
  };

  console.log("Datos extraídos con FormData:", datos);

  // Mostrar resultado en pantalla
  if (resultado) {
    resultado.className = "success";
    resultado.style.display = "block";
    resultado.innerHTML = `
      <h3>✅ Usuario Registrado</h3>
      <p><strong>Nombre:</strong> ${datos.nombre}</p>
      <p><strong>Email:</strong> ${datos.email}</p>
      <p><strong>Edad:</strong> ${datos.edad} años</p>
      <p><strong>País:</strong> ${datos.pais.toUpperCase()}</p>
    `;
  }

  // Limpiar formulario
  formElement.reset();

  // Ocultar resultado después de 5 segundos
  setTimeout(() => {
    if (resultado) {
      resultado.style.display = "none";
    }
  }, 5000);
});

// ============================================
// MÓDULO 4: Type Guards - typeof
// ============================================

console.log("=== MÓDULO 4: Type Guards - typeof ===");

function procesar(valor: string | number): string {
  if (typeof valor === "string") {
    return valor.toUpperCase();
  } else {
    return valor.toFixed(2);
  }
}

console.log('procesar("hola"):', procesar("hola"));
console.log("procesar(3.14159):", procesar(3.14159));

function mostrarLongitud(texto: unknown): void {
  if (typeof texto === "string") {
    console.log(`Es string, longitud: ${texto.length}`);
  } else {
    console.log("No es un string, es:", typeof texto);
  }
}

mostrarLongitud("TypeScript");
mostrarLongitud(123);
mostrarLongitud(true);

// ============================================
// MÓDULO 5: Type Guards - instanceof
// ============================================

console.log("=== MÓDULO 5: Type Guards - instanceof ===");

function manejarElemento(elemento: HTMLElement): string {
  if (elemento instanceof HTMLButtonElement) {
    return `Es un BOTÓN: "${elemento.textContent}"`;
  } else if (elemento instanceof HTMLInputElement) {
    return `Es un INPUT de tipo: ${elemento.type}`;
  } else if (elemento instanceof HTMLDivElement) {
    return `Es un DIV con id: ${elemento.id}`;
  } else {
    return `Es un ${elemento.tagName}`;
  }
}

// Probar con elementos del DOM
const botonRegistrar = document.querySelector<HTMLButtonElement>("button");
const inputNombre = document.querySelector<HTMLInputElement>('input[name="nombre"]');
const resultado2 = document.querySelector<HTMLDivElement>("#resultado");

if (botonRegistrar) {
  console.log(manejarElemento(botonRegistrar));
}

if (inputNombre) {
  console.log(manejarElemento(inputNombre));
}

if (resultado2) {
  console.log(manejarElemento(resultado2));
}

// ============================================
// MÓDULO 6: Type Guards Personalizados
// ============================================

console.log("=== MÓDULO 6: Type Guards Personalizados ===");

function esEmail(texto: string): boolean {
  return texto.includes("@") && texto.includes(".");
}

function esNumeroPositivo(valor: unknown): valor is number {
  return typeof valor === "number" && valor > 0;
}

interface Usuario {
  nombre: string;
  email: string;
  edad: number;
}

function validarUsuario(
  nombre: string,
  email: string,
  edad: unknown
): Usuario | null {
  if (nombre.length < 3) {
    console.log("❌ Nombre muy corto");
    return null;
  }

  if (!esEmail(email)) {
    console.log("❌ Email inválido");
    return null;
  }

  if (!esNumeroPositivo(edad)) {
    console.log("❌ Edad inválida");
    return null;
  }

  return { nombre, email, edad };
}

// Probar validación
const usuario1 = validarUsuario("Juan", "juan@mail.com", 25);
console.log("Usuario 1:", usuario1);

const usuario2 = validarUsuario("Al", "invalido", -5);
console.log("Usuario 2:", usuario2);

// ============================================
// MÓDULO 7-8: Generics
// ============================================

console.log("=== MÓDULO 7-8: Generics ===");

// Función genérica básica
function obtenerPrimero<T>(arr: T[]): T {
  return arr[0];
}

const primerString = obtenerPrimero(["a", "b", "c"]);
const primerNumero = obtenerPrimero([1, 2, 3]);
const primerBool = obtenerPrimero([true, false, true]);

console.log("Primer string:", primerString);
console.log("Primer número:", primerNumero);
console.log("Primer boolean:", primerBool);

// Crear arrays con generics
function crearArray<T>(elemento: T, cantidad: number): T[] {
  return Array(cantidad).fill(elemento);
}

const arrayStrings = crearArray("hola", 3);
const arrayNumeros = crearArray(5, 4);

console.log("Array de strings:", arrayStrings);
console.log("Array de números:", arrayNumeros);

// Obtener último elemento
function obtenerUltimo<T>(arr: T[]): T | undefined {
  return arr[arr.length - 1];
}

console.log("Último de [1,2,3]:", obtenerUltimo([1, 2, 3]));
console.log('Último de ["a","b","c"]:', obtenerUltimo(["a", "b", "c"]));

// ============================================
// MÓDULO 9: Generics en el DOM
// ============================================

console.log("=== MÓDULO 9: Generics en el DOM ===");

// Función helper genérica
function seleccionar<T extends HTMLElement>(selector: string): T | null {
  return document.querySelector<T>(selector);
}

// Uso con tipos específicos
const boton = seleccionar<HTMLButtonElement>('button[type="submit"]');
const input = seleccionar<HTMLInputElement>('input[name="nombre"]');
const select = seleccionar<HTMLSelectElement>('select[name="pais"]');

console.log("Botón encontrado:", boton?.textContent);
console.log("Input encontrado:", input?.placeholder);
console.log("Select encontrado:", select?.name);

// Demostrar ventaja de tipos
if (boton) {
  console.log("Botón tiene propiedad disabled:", "disabled" in boton);
}

if (input) {
  console.log("Input tiene propiedad value:", "value" in input);
}

// ============================================
// LOGS FINALES
// ============================================

console.log("✅ Clase 4 completada");
console.log("📚 Conceptos cubiertos: FormData, Type Guards, Generics");
