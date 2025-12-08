# Clase 4: TypeScript + DOM (Parte 2) - Avanzado

Manipulación avanzada del DOM con TypeScript, incluyendo formularios y validación de tipos en runtime.

## Contenido de la Clase

1. **FormData**: Extracción eficiente de datos de formularios
2. **Type Guards - typeof**: Validación de tipos primitivos en runtime
3. **Type Guards - instanceof**: Validación de instancias de clases
4. **Type Guards Personalizados**: Crear tus propias validaciones

---

## 1. FormData: Extracción de Datos de Formularios

FormData es una API del navegador que simplifica la extracción de datos de formularios HTML.

### ¿Por qué usar FormData?

❌ **Sin FormData** (Manual):
```typescript
const nombre = (document.querySelector('#nombre') as HTMLInputElement).value;
const email = (document.querySelector('#email') as HTMLInputElement).value;
const edad = parseInt((document.querySelector('#edad') as HTMLInputElement).value);
// ... repetir para cada campo
```

✅ **Con FormData** (Eficiente):
```typescript
const formData = new FormData(formElement);
const datos = {
  nombre: formData.get('nombre') as string,
  email: formData.get('email') as string,
  edad: parseInt(formData.get('edad') as string)
};
```

### Ejemplo Completo - Código del Proyecto

**HTML (index.html:89-106):**
```html
<form id="registro">
  <input type="text" name="nombre" placeholder="Nombre completo" required minlength="3">
  <input type="email" name="email" placeholder="Email" required>
  <input type="number" name="edad" placeholder="Edad" required min="18" max="100">
  <select name="pais" required>
    <option value="">-- Selecciona un país --</option>
    <option value="ar">Argentina</option>
    <option value="cl">Chile</option>
    <option value="uy">Uruguay</option>
    <option value="py">Paraguay</option>
    <option value="br">Brasil</option>
  </select>
  <button type="submit">Registrar Usuario</button>
</form>
<div id="resultado"></div>
```

**TypeScript (index.ts:11-56):**
```typescript
const form = document.querySelector<HTMLFormElement>("#registro");
const resultado = document.querySelector<HTMLDivElement>("#resultado");

form?.addEventListener("submit", (event: Event) => {
  event.preventDefault(); // ⚠️ Evita que recargue la página

  const formElement = event.currentTarget as HTMLFormElement;
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

  formElement.reset(); // Limpia el formulario

  // Ocultar resultado después de 5 segundos
  setTimeout(() => {
    if (resultado) resultado.style.display = "none";
  }, 5000);
});
```

### Puntos Clave

- `formData.get()` retorna `string | File | null`
- Siempre usa `event.preventDefault()` para evitar recarga de página
- Usa `as string` o `as File` para convertir el tipo según necesites
- `parseInt()` para convertir strings a números

---

## 2. Type Guards - typeof

Los Type Guards permiten validar tipos en tiempo de ejecución (runtime).

### ¿Qué problema resuelve?

TypeScript solo valida tipos en **tiempo de compilación**. Cuando los datos vienen de inputs, APIs o JSON, necesitas validar en **runtime**.

### typeof - Para Tipos Primitivos

**Código del Proyecto (index.ts:64-73):**
```typescript
function procesar(valor: string | number): string {
  if (typeof valor === "string") {
    // ✅ TypeScript sabe que aquí valor es string
    return valor.toUpperCase();
  } else {
    // ✅ TypeScript sabe que aquí valor es number
    return valor.toFixed(2);
  }
}

console.log('procesar("hola"):', procesar("hola"));     // "HOLA"
console.log("procesar(3.14159):", procesar(3.14159));   // "3.14"
```

### Tipos Validables con typeof

| Tipo | Retorno de typeof |
|------|-------------------|
| `"hola"` | `'string'` |
| `123` | `'number'` |
| `true` | `'boolean'` |
| `undefined` | `'undefined'` |
| `{}` | `'object'` |
| `() => {}` | `'function'` |
| `Symbol()` | `'symbol'` |
| `123n` | `'bigint'` |

⚠️ **Peculiaridad**: `typeof null === 'object'` (bug histórico de JavaScript)

### Type Narrowing

Cuando usas `typeof` en un `if`, TypeScript "estrecha" el tipo:

**Código del Proyecto (index.ts:75-86):**
```typescript
function mostrarLongitud(texto: unknown): void {
  if (typeof texto === "string") {
    // ✅ TypeScript infiere que texto es string aquí
    console.log(`Es string, longitud: ${texto.length}`);
  } else {
    console.log("No es un string, es:", typeof texto);
  }
}

mostrarLongitud("TypeScript"); // Es string, longitud: 10
mostrarLongitud(123);          // No es un string, es: number
mostrarLongitud(true);         // No es un string, es: boolean
```

---

## 3. Type Guards - instanceof

`instanceof` valida si un objeto es instancia de una clase específica. Es fundamental para trabajar con elementos del DOM.

### El Problema Sin instanceof

```typescript
function manejarSinTypeGuard(elemento: HTMLElement): void {
  elemento.disabled = true;
  // ❌ Error de TypeScript: 'disabled' no existe en HTMLElement
}
```

### La Solución Con instanceof

**Código del Proyecto (index.ts:105-146):**
```typescript
function analizarElemento(elemento: HTMLElement): {
  tipo: string;
  propiedadesUnicas: string[];
  ejemplo: string;
} {
  if (elemento instanceof HTMLButtonElement) {
    // ✅ TypeScript sabe que elemento es HTMLButtonElement
    return {
      tipo: "HTMLButtonElement",
      propiedadesUnicas: ["disabled", "type", "form"],
      ejemplo: `disabled = ${elemento.disabled}`,
    };
  } else if (elemento instanceof HTMLInputElement) {
    // ✅ TypeScript sabe que elemento es HTMLInputElement
    return {
      tipo: "HTMLInputElement",
      propiedadesUnicas: ["value", "placeholder", "type", "checked"],
      ejemplo: `value = "${elemento.value}", type = "${elemento.type}"`,
    };
  } else if (elemento instanceof HTMLDivElement) {
    // ✅ TypeScript sabe que elemento es HTMLDivElement
    return {
      tipo: "HTMLDivElement",
      propiedadesUnicas: ["align", "innerHTML"],
      ejemplo: `id = "${elemento.id}"`,
    };
  } else if (elemento instanceof HTMLSelectElement) {
    // ✅ TypeScript sabe que elemento es HTMLSelectElement
    return {
      tipo: "HTMLSelectElement",
      propiedadesUnicas: ["options", "selectedIndex", "value"],
      ejemplo: `selectedIndex = ${elemento.selectedIndex}`,
    };
  } else {
    return {
      tipo: `HTMLElement genérico (${elemento.tagName})`,
      propiedadesUnicas: ["className", "id", "tagName"],
      ejemplo: `tagName = "${elemento.tagName}"`,
    };
  }
}
```

### ¿Por qué es útil?

Cada tipo de elemento HTML tiene propiedades específicas:

| Tipo | Propiedades Únicas |
|------|-------------------|
| `HTMLButtonElement` | `disabled`, `type`, `form` |
| `HTMLInputElement` | `value`, `placeholder`, `checked` |
| `HTMLDivElement` | `align`, `innerHTML` |
| `HTMLSelectElement` | `options`, `selectedIndex` |

### Demo Interactiva

**HTML (index.html:116-125):**
```html
<button id="btn-demo" class="elemento-demo">Soy un Botón</button>
<input id="input-demo" class="elemento-demo" type="text" placeholder="Soy un Input">
<div id="div-demo" class="elemento-demo">Soy un Div (haz click)</div>
<select id="select-demo" class="elemento-demo">
  <option>Soy un Select</option>
</select>
```

**TypeScript (index.ts:148-176):**
```typescript
const elementosDemo = document.querySelectorAll<HTMLElement>(".elemento-demo");
const tipoInfo = document.querySelector<HTMLDivElement>("#tipo-info");
const tipoDetalle = document.querySelector<HTMLPreElement>("#tipo-detalle");

elementosDemo.forEach((elemento) => {
  elemento.addEventListener("click", () => {
    console.log("🔍 Elemento clickeado:", elemento);

    const info = analizarElemento(elemento);
    console.log("📊 Análisis:", info);

    if (tipoInfo && tipoDetalle) {
      tipoInfo.style.display = "block";
      tipoDetalle.textContent = `
Tipo detectado: ${info.tipo}

Propiedades únicas de este tipo:
${info.propiedadesUnicas.map((prop) => `  • ${prop}`).join("\n")}

Ejemplo de uso:
  ${info.ejemplo}

✅ instanceof permite acceder a propiedades específicas de forma segura
      `.trim();
    }
  });
});
```

### Contraste: typeof vs instanceof

```typescript
// typeof - tipos primitivos
typeof "hola"     // 'string'
typeof 123        // 'number'
typeof true       // 'boolean'

// instanceof - instancias de clases
button instanceof HTMLButtonElement  // true
input instanceof HTMLInputElement    // true
div instanceof HTMLDivElement        // true
```

---

## 4. Type Guards Personalizados

Los Type Guards personalizados te permiten crear tus propias funciones de validación con predicados de tipo.

### Predicados de Tipo con `is`

**Código del Proyecto (index.ts:184-219):**
```typescript
// Type Guard simple
function esEmail(texto: string): boolean {
  return texto.includes("@") && texto.includes(".");
}

// Type Guard con predicado de tipo
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

  return { nombre, email, edad }; // ✅ edad es number aquí
}

// Probar validación
const usuario1 = validarUsuario("Juan", "juan@mail.com", 25);
console.log("Usuario 1:", usuario1); // ✅ { nombre: "Juan", email: "juan@mail.com", edad: 25 }

const usuario2 = validarUsuario("Al", "invalido", -5);
console.log("Usuario 2:", usuario2); // ❌ null
```

### Ventajas de Type Guards Personalizados

1. **Reutilización**: Validaciones complejas en funciones reutilizables
2. **Type Safety**: TypeScript entiende el tipo después de la validación
3. **Legibilidad**: Código más limpio y expresivo

---

## Conceptos Clave - Resumen

### typeof
- ✅ Valida tipos primitivos (`string`, `number`, `boolean`, etc.)
- ✅ Funciona en runtime
- ⚠️ `typeof null === 'object'`

### instanceof
- ✅ Valida instancias de clases específicas
- ✅ Esencial para elementos del DOM
- ✅ Permite acceso a propiedades específicas

### Type Guards Personalizados
- ✅ Crear funciones de validación propias
- ✅ Usar predicados de tipo con `is`
- ✅ Combinar múltiples validaciones

---

## Proyecto de Ejemplo

El proyecto incluye:

### 1. Formulario con FormData (Módulo 2-3)
- Extracción automática de datos del formulario
- Validación HTML5 nativa (required, minlength, pattern)
- Mostrar resultados con feedback visual
- Auto-limpieza del formulario

### 2. Demo Interactiva de instanceof (Módulo 4-5)
- Click en diferentes elementos del DOM
- Detección automática del tipo específico
- Mostrar propiedades únicas de cada tipo
- Ejemplos de uso en tiempo real

### 3. Type Guards Personalizados (Módulo 6)
- Validación de emails
- Validación de números positivos
- Validación completa de objetos Usuario

### Estructura del Proyecto

```
04-dom-avanzado/
├── index.html          # Interfaz con formulario y elementos demo
├── index.ts            # Código TypeScript con todos los módulos
├── index.js            # Código compilado (generado por tsc)
└── README.md           # Este guion de diapositivas
```

### Cómo Ejecutar

```bash
# 1. Compilar TypeScript
tsc

# 2. Abrir en navegador
open index.html

# 3. Probar en consola
# - Completa el formulario
# - Haz click en los elementos demo
# - Revisa la consola del navegador (F12)
```

---

## Próxima Clase

🚀 **Clase 5: Fetch API + TypeScript + Generics**

1. Consumir APIs REST con Fetch
2. Trabajar con PokeAPI
3. Interfaces para respuestas de APIs
4. Manejo de Promesas tipadas
5. Generics aplicados a APIs

---

## Recursos Adicionales

- [TypeScript Handbook - Type Guards](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [MDN - FormData](https://developer.mozilla.org/es/docs/Web/API/FormData)
- [MDN - instanceof](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/instanceof)
- [MDN - typeof](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Operators/typeof)
