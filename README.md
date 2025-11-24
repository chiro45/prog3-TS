# Curso de TypeScript - Programación 3

Este repositorio contiene ejercicios y ejemplos progresivos de TypeScript, desde conceptos básicos hasta programación asíncrona y consumo de APIs.

## Estructura del Proyecto

```
prog3-TS/
├── 01-typescript-basico/     # Tipos primitivos y funciones básicas
├── 02-objetos-y-tipos/        # Interfaces, type aliases, union types
├── 03-dom-eventos/            # Manipulación del DOM y eventos
├── 04-dom-avanzado/           # Type guards, generics, componentes
└── 05-async-fetch/            # Async/await y fetch API
```

Cada carpeta es un **ejercicio independiente** con su propio código.

## Instalación de TypeScript

### 1. Instalar Node.js
Descarga e instala Node.js desde [nodejs.org](https://nodejs.org/)

Verifica la instalación:
```bash
node --version
npm --version
```

### 2. Instalar TypeScript globalmente
```bash
npm install -g typescript
```

Verifica la instalación:
```bash
tsc --version
```

## Compilar TypeScript a JavaScript

### Compilar un archivo específico
Para compilar el archivo TypeScript de una carpeta y generar el .js en la misma ubicación:

```bash
# Ejemplo para la carpeta 01-typescript-basico
tsc 
```

Esto generará el archivo `index.js` en la misma carpeta.

### Compilar con modo watch (recomendado para desarrollo)
Para que TypeScript compile automáticamente cada vez que guardes cambios:

```bash
# Compilar y observar cambios en un archivo
tsc  --watch

# O usando la forma corta
tsc  -w
```


## Usar los archivos en HTML

Todas las carpetas contienen un archivo `index.html` con la referencia al archivo JavaScript compilado:

```html
<!-- Ejemplo en index.html -->
<script src="index.js"></script>
```

**Pasos para ejecutar:**
1. Los archivos TypeScript ya están compilados a JavaScript (`index.js`)
2. Abre el archivo `index.html` de cualquier carpeta en tu navegador
3. Para las carpetas 01 y 02, abre la consola del navegador (F12) para ver los resultados
4. Las carpetas 03, 04 y 05 tienen interfaces interactivas en la página

**Si modificas el código TypeScript:**
1. Recompila el archivo: `tsc 03-dom-eventos/index.ts`
2. Recarga la página en el navegador (F5)

## Comandos útiles

```bash
# Compilar un archivo
tsc ruta/archivo.ts

# Compilar con watch
tsc ruta/archivo.ts --watch

# Ver ayuda
tsc --help
```

## Notas

- Los archivos `.js` generados NO están versionados en git (ver `.gitignore`)
- Debes compilar los archivos TypeScript antes de abrir el HTML en el navegador
- Se recomienda usar el modo watch durante el desarrollo para compilación automática
- Cada carpeta es un ejercicio separado e independiente
