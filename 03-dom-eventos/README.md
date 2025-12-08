# Clase 3: TypeScript + DOM (Parte 1)

## 🎯 Objetivo de la clase
Enseñar las **peculiaridades de TypeScript al trabajar con el DOM**. Los estudiantes ya conocen JavaScript y manipulación del DOM, ahora deben aprender **qué cambia al usar TypeScript**.

## 📚 Pre-requisitos
- JavaScript intermedio
- Manipulación del DOM (querySelector, addEventListener, etc.)
- TypeScript básico (tipos primitivos, interfaces)

## 🎓 Objetivos de aprendizaje
Al finalizar esta clase, los estudiantes podrán:
1. Explicar por qué TypeScript hace el código DOM más seguro
2. Usar genéricos en querySelector/querySelectorAll correctamente
3. Manejar valores nullable (null | undefined) con verificaciones
4. Diferenciar entre NodeList y Array
5. Tipar eventos (MouseEvent, KeyboardEvent) correctamente

---

## 📖 Estructura de la clase (5 módulos)

### **Módulo 1: El problema sin tipos en el DOM**
**Duración**: 5 minutos
**Objetivo**: Motivar el uso de tipos mostrando errores comunes

#### Conceptos clave:
- En JavaScript, `querySelector` puede retornar `null` sin advertencia
- Acceder a propiedades de `null` causa errores en runtime
- TypeScript detecta estos errores en tiempo de compilación

#### Guión sugerido:
```javascript
// JavaScript - No hay advertencias
const button = document.querySelector('#miBoton');
button.disabled = true; // ¿Y si button es null? 💥 Runtime error

// TypeScript - Error en tiempo de compilación
const button = document.querySelector<HTMLButtonElement>('#miBoton');
button.disabled = true; // ❌ Error: Object is possibly 'null'
```

**Mensaje clave**: TypeScript nos obliga a pensar en casos extremos (null, undefined) **antes** de ejecutar el código.

---

### **Módulo 2: HTMLElement y sus variantes**
**Duración**: 10 minutos
**Objetivo**: Entender que cada elemento HTML tiene un tipo específico

#### Conceptos clave:
- `HTMLButtonElement` tiene propiedades como `disabled`, `type`
- `HTMLInputElement` tiene propiedades como `value`, `placeholder`, `checked`
- `HTMLHeadingElement`, `HTMLDivElement`, etc.
- **Peculiaridad TS**: Usar genéricos `<TipoEspecífico>` para obtener autocompletado

#### Ejemplo de código:
```typescript
// Sin genérico - tipo muy genérico
const btn = document.querySelector("#btn");
// Tipo: Element | null (no tiene 'disabled')

// Con genérico - tipo específico
const btn = document.querySelector<HTMLButtonElement>("#btn");
// Tipo: HTMLButtonElement | null (tiene 'disabled', 'type', etc.)

if (btn) {
  btn.disabled = true; // ✅ TypeScript conoce esta propiedad
}
```

#### Demostración interactiva:
- Botón que se deshabilita al hacer click
- Input que muestra su valor en consola
- Título que cambia de color al hacer click

**Mensaje clave**: Los genéricos le dicen a TypeScript **qué tipo específico de elemento** esperas, dándote autocompletado y verificación de tipos.

---

### **Módulo 3: querySelector - Selección individual**
**Duración**: 10 minutos
**Objetivo**: Manejar correctamente el tipo nullable que retorna querySelector

#### Conceptos clave:
- `querySelector` **siempre** retorna `TipoEspecificado | null`
- TypeScript te obliga a verificar si el elemento existe
- **Peculiaridad TS**: Type narrowing con `if`

#### Patrón recomendado:
```typescript
// 1. Seleccionar con tipo genérico
const boton = document.querySelector<HTMLButtonElement>('#miBoton');
const mensaje = document.querySelector<HTMLParagraphElement>('#mensaje');

// 2. Verificar con if (ambos elementos)
if (boton && mensaje) {
  // 3. Dentro del if, TS sabe que NO son null
  boton.addEventListener('click', () => {
    mensaje.textContent = '¡Clickeado!';
    boton.disabled = true;
  });
}
```

#### Demostración interactiva:
- Botón que muestra mensaje al hacer click
- El botón se deshabilita después del primer click

**Mensaje clave**:
- querySelector puede retornar `null` → **SIEMPRE verifica con if**
- Dentro del `if`, TypeScript hace "type narrowing" (sabe que no es null)

---

### **Módulo 4: querySelectorAll - Múltiples elementos**
**Duración**: 12 minutos
**Objetivo**: Entender la diferencia entre NodeList y Array

#### Conceptos clave:
- `querySelectorAll` retorna `NodeListOf<Tipo>` (nunca null, pero puede estar vacía)
- `NodeList` tiene `forEach` ✅ pero NO tiene `map`, `filter`, `reduce` ❌
- **Peculiaridad TS**: Convertir a Array con `Array.from()`

#### Ejemplo comparativo:
```typescript
const botones = document.querySelectorAll<HTMLButtonElement>('.btn');
// Tipo: NodeListOf<HTMLButtonElement>

// ✅ FUNCIONA: forEach está disponible
botones.forEach(boton => {
  boton.disabled = true;
});

// ❌ ERROR: map no existe en NodeList
const textos = botones.map(btn => btn.textContent); // Error

// ✅ SOLUCIÓN: Convertir a Array
const arrayBotones = Array.from(botones);
const textos = arrayBotones.map(btn => btn.textContent); // ✅
```

#### Demostración interactiva:
- Tres botones con clase `.btn`
- Un botón que deshabilita a todos usando `forEach`
- Consola muestra el array de textos usando `map`

**Mensaje clave**:
- `NodeList` parece un array pero NO lo es
- Tiene `forEach` pero no `map/filter/reduce`
- Convertir con `Array.from()` para usar métodos de array

---

### **Módulo 5: Event Types - MouseEvent y KeyboardEvent**
**Duración**: 13 minutos
**Objetivo**: Tipar eventos correctamente para acceder a sus propiedades

#### Conceptos clave:
- Eventos tienen tipos específicos: `MouseEvent`, `KeyboardEvent`, `Event`
- Cada tipo tiene propiedades únicas
- **Peculiaridad TS**: Tipar el parámetro del callback

#### MouseEvent:
```typescript
btn.addEventListener('click', (event: MouseEvent) => {
  //                                   ^^^^^^^^^^
  //                                   Tipo específico

  console.log(event.clientX);  // ✅ Coordenada X del click
  console.log(event.clientY);  // ✅ Coordenada Y del click
  console.log(event.button);   // ✅ Qué botón (0=izq, 1=medio, 2=der)
  console.log(event.ctrlKey);  // ✅ ¿Ctrl presionado?
});
```

#### KeyboardEvent:
```typescript
input.addEventListener('keydown', (event: KeyboardEvent) => {
  //                                       ^^^^^^^^^^^^^

  console.log(event.key);      // ✅ Tecla presionada ('Enter', 'a')
  console.log(event.code);     // ✅ Código físico ('KeyA', 'Space')
  console.log(event.ctrlKey);  // ✅ ¿Ctrl presionado?
  console.log(event.shiftKey); // ✅ ¿Shift presionado?
});
```

#### Demostración interactiva:
- Botón que muestra coordenadas del click
- Input que detecta cuando presionas Enter
- Consola muestra todas las propiedades del evento

**Mensaje clave**:
- Tipar eventos da acceso a propiedades específicas
- `MouseEvent` tiene coordenadas, `KeyboardEvent` tiene teclas
- TypeScript previene errores como `event.clientX` en un KeyboardEvent

---

## 📝 Resumen de peculiaridades TypeScript

| Concepto | JavaScript | TypeScript |
|----------|-----------|------------|
| **querySelector** | Retorna `Element` | Retorna `TipoEspecífico \| null` |
| **Genéricos** | No existen | `<HTMLButtonElement>` para especificar tipo |
| **Null safety** | No verifica null | Te obliga a verificar con `if` |
| **NodeList** | Es NodeList | Es `NodeListOf<Tipo>` |
| **Eventos** | Tipo genérico | `MouseEvent`, `KeyboardEvent` específicos |
| **Type narrowing** | No existe | Dentro del `if`, TS sabe que no es null |

---

## 🎯 Buenas prácticas enseñadas

✅ **Siempre** especificar el tipo genérico en querySelector:
```typescript
// ❌ Evitar
const btn = document.querySelector('#btn');

// ✅ Correcto
const btn = document.querySelector<HTMLButtonElement>('#btn');
```

✅ **Siempre** verificar null antes de usar:
```typescript
// ❌ Evitar
const btn = document.querySelector<HTMLButtonElement>('#btn');
btn.disabled = true; // Error si btn es null

// ✅ Correcto
if (btn) {
  btn.disabled = true;
}
```

✅ Convertir NodeList a Array cuando necesites `map/filter`:
```typescript
const botones = document.querySelectorAll<HTMLButtonElement>('.btn');
const textos = Array.from(botones).map(b => b.textContent);
```

✅ Tipar eventos para acceder a sus propiedades:
```typescript
// ❌ Evitar
btn.addEventListener('click', (event) => { // event es Event genérico
  event.clientX; // Error
});

// ✅ Correcto
btn.addEventListener('click', (event: MouseEvent) => {
  event.clientX; // ✅
});
```

---

## 💡 Tips para enseñar

### Momento "Aha!" para cada módulo:

1. **Módulo 1**: Mostrar un error real de "Cannot read property 'disabled' of null" en JavaScript
2. **Módulo 2**: Demostrar el autocompletado de VS Code con y sin genéricos
3. **Módulo 3**: Mostrar cómo TypeScript marca error si no verificas null
4. **Módulo 4**: Intentar usar `.map()` en NodeList y ver el error
5. **Módulo 5**: Intentar acceder a `event.key` en un MouseEvent (error)

### Errores comunes a anticipar:

❌ Olvidar el genérico: `querySelector('#btn')` en vez de `querySelector<HTMLButtonElement>('#btn')`
❌ No verificar null: `btn.disabled = true` sin `if (btn)`
❌ Usar `.map()` en NodeList sin convertir a Array
❌ No tipar eventos: `(event) =>` en vez de `(event: MouseEvent) =>`

---

## 🔧 Archivos del proyecto

```
03-dom-eventos/
├── README.md           # Esta guía
├── index-nuevo.html    # HTML minimalista (~82 líneas)
├── index-nuevo.ts      # TypeScript con comentarios explicativos (~186 líneas)
├── index-nuevo.js      # Compilado automáticamente
└── tsconfig.json       # Configuración de TypeScript
```

---

## 🚀 Cómo usar este material

1. **Antes de la clase**:
   - Lee este README completo
   - Abre `index-nuevo.html` en el navegador
   - Abre la consola del navegador
   - Interactúa con cada módulo para ver cómo funciona

2. **Durante la clase**:
   - Sigue el orden de los módulos (1 → 2 → 3 → 4 → 5)
   - Muestra el código en VS Code para ver los errores de TypeScript
   - Ejecuta en el navegador para ver la funcionalidad
   - Revisa la consola para ver los logs explicativos

3. **Ejercicios sugeridos**:
   - Pide que agreguen un nuevo botón con tipo genérico
   - Que conviertan un NodeList a Array y usen `.filter()`
   - Que timen un evento de formulario (`submit`)

---

## 📖 Próxima clase (Parte 2)

Temas a cubrir:
- **FormData**: API moderna para formularios
- **Type Guards avanzados**: `typeof`, `instanceof`, custom type guards
- **Event delegation**: Manejar eventos de múltiples elementos desde un padre
- **Crear elementos**: `document.createElement` con tipos
- **Proyecto integrador**: Lista de tareas (CRUD completo)

---

## 🎓 Recursos adicionales

- [TypeScript Handbook - DOM Manipulation](https://www.typescriptlang.org/docs/handbook/dom-manipulation.html)
- [MDN - Event reference](https://developer.mozilla.org/en-US/docs/Web/Events)
- [TypeScript Deep Dive - Type System](https://basarat.gitbook.io/typescript/type-system)

---

**Duración total estimada**: 50-60 minutos
**Nivel**: Intermedio
**Última actualización**: Diciembre 2025
