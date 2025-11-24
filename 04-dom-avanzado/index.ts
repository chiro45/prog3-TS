// ============================================
// CLASE 4: TYPESCRIPT + DOM (PARTE 2) + AVANZADO
// ============================================

// ============================================
// MÓDULO 2: FormData
// ============================================

const formRegistro = document.querySelector<HTMLFormElement>("#registro");
const resultadoRegistro =
  document.querySelector<HTMLDivElement>("#resultadoRegistro");

formRegistro?.addEventListener("submit", (event: Event) => {
  event.preventDefault();

  const formElement = event.currentTarget as HTMLFormElement;
  const formData = new FormData(formElement);

  const nombre = formData.get("nombre") as string;
  const email = formData.get("email") as string;
  const edad = formData.get("edad") as string;

  if (resultadoRegistro) {
    resultadoRegistro.innerHTML = `
      <div style="background: #e7f3ff; padding: 10px; border-radius: 4px;">
        <strong>Datos:</strong> ${nombre}, ${email}, ${edad} años
      </div>
    `;
  }

  console.log({ nombre, email, edad: parseInt(edad) });
});

// ============================================
// MÓDULO 3: Checkbox y Radio Buttons
// ============================================

const formPrefs = document.querySelector<HTMLFormElement>("#preferencias");
const newsletter = document.querySelector<HTMLInputElement>("#newsletter");
const resultadoPreferencias = document.querySelector<HTMLDivElement>(
  "#resultadoPreferencias"
);

formPrefs?.addEventListener("submit", (event: Event) => {
  event.preventDefault();

  // Obtener valor de checkbox
  const recibeNewsletter = newsletter?.checked || false;

  // Obtener valor de radio button
  const formData = new FormData(formPrefs);
  const plan = formData.get("plan") as string;

  if (resultadoPreferencias) {
    resultadoPreferencias.innerHTML = `
      <div style="background: #e7f3ff; padding: 10px; border-radius: 4px;">
        Newsletter: ${recibeNewsletter ? "Sí" : "No"}<br>
        Plan: ${plan || "No seleccionado"}
      </div>
    `;
  }

  console.log({ newsletter: recibeNewsletter, plan });
});

// ============================================
// MÓDULO 4: Type Guards - typeof
// ============================================

function procesarValor(valor: string | number): string {
  if (typeof valor === "string") {
    return valor.toUpperCase();
  } else {
    return valor.toFixed(2);
  }
}

const inputValor = document.querySelector<HTMLInputElement>("#inputValor");
const btnProcesar = document.querySelector<HTMLButtonElement>("#btnProcesar");
const resultado1 = document.querySelector<HTMLDivElement>("#resultado1");

btnProcesar?.addEventListener("click", () => {
  if (!inputValor || !resultado1) return;

  const valor = inputValor.value;
  const numero = parseFloat(valor);

  let resultado: string;

  if (!isNaN(numero)) {
    resultado = procesarValor(numero);
  } else {
    resultado = procesarValor(valor);
  }

  resultado1.innerHTML = `
    <div style="background: #e7f3ff; padding: 10px; border-radius: 4px;">
      Resultado: ${resultado}
    </div>
  `;
});

// ============================================
// MÓDULO 5: Type Guards - instanceof
// ============================================

function manejarElemento(elemento: HTMLElement): string {
  if (elemento instanceof HTMLButtonElement) {
    elemento.style.backgroundColor = "#28a745";
    return "Botón - fondo verde";
  } else if (elemento instanceof HTMLInputElement) {
    elemento.style.backgroundColor = "#ffc107";
    return "Input - fondo amarillo";
  } else if (elemento instanceof HTMLDivElement) {
    elemento.style.backgroundColor = "#17a2b8";
    return "Div - fondo azul";
  }
  return "Desconocido";
}

const btnTestInstanceof =
  document.querySelector<HTMLButtonElement>("#testInstanceof");

btnTestInstanceof?.addEventListener("click", () => {
  const btn1 = document.getElementById("btn1");
  const input1 = document.getElementById("input1");
  const div1 = document.getElementById("div1");

  const resultados: string[] = [];

  if (btn1) resultados.push(manejarElemento(btn1));
  if (input1) resultados.push(manejarElemento(input1));
  if (div1) resultados.push(manejarElemento(div1));

  alert(resultados.join("\n"));
});

// ============================================
// MÓDULO 6-7: Generics
// ============================================

// Función genérica
function obtenerPrimero<T>(arr: T[]): T {
  return arr[0];
}

function crearArray<T>(elemento: T, cantidad: number): T[] {
  return Array(cantidad).fill(elemento);
}

const btnTestGenerics =
  document.querySelector<HTMLButtonElement>("#testGenerics");
const resultadoGenerics =
  document.querySelector<HTMLDivElement>("#resultadoGenerics");

btnTestGenerics?.addEventListener("click", () => {
  const primerString = obtenerPrimero(["a", "b", "c"]);
  const primerNumero = obtenerPrimero([1, 2, 3]);

  const arrayStrings = crearArray("hola", 3);
  const arrayNumeros = crearArray(5, 4);

  if (resultadoGenerics) {
    resultadoGenerics.innerHTML = `
      <div style="background: #e7f3ff; padding: 10px; border-radius: 4px;">
        Primer string: ${primerString}<br>
        Primer número: ${primerNumero}<br>
        Array strings: [${arrayStrings.join(", ")}]<br>
        Array números: [${arrayNumeros.join(", ")}]
      </div>
    `;
  }
});

// ============================================
// MÓDULO 8: Ejemplo Integrador - Lista de Tareas
// ============================================

interface Tarea {
  id: number;
  texto: string;
  completada: boolean;
}

let tareas: Tarea[] = [];
let nextId = 1;

const inputTarea = document.querySelector<HTMLInputElement>("#nuevaTarea");
const btnAgregar = document.querySelector<HTMLButtonElement>("#agregar");
const lista = document.querySelector<HTMLUListElement>("#lista");

function agregarTarea(): void {
  if (!inputTarea || !lista) return;

  const texto = inputTarea.value.trim();
  if (texto === "") return;

  const tarea: Tarea = {
    id: nextId++,
    texto,
    completada: false,
  };

  tareas.push(tarea);
  renderizar();
  inputTarea.value = "";
  inputTarea.focus();
}

function renderizar(): void {
  if (!lista) return;

  lista.innerHTML = "";

  tareas.forEach((tarea) => {
    const li = document.createElement("li");
    li.textContent = tarea.texto;

    const btnEliminar = document.createElement("button");
    btnEliminar.textContent = "Eliminar";
    btnEliminar.style.marginLeft = "10px";
    btnEliminar.addEventListener("click", () => {
      tareas = tareas.filter((t) => t.id !== tarea.id);
      renderizar();
    });

    li.appendChild(btnEliminar);
    lista.appendChild(li);
  });
}

btnAgregar?.addEventListener("click", agregarTarea);

inputTarea?.addEventListener("keydown", (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    agregarTarea();
  }
});
