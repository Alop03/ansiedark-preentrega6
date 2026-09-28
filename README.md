# Ansiedark — Pre-entrega 6

Sexta pre-entrega del curso de React JS de Coderhouse.

Ansiedark es un e-commerce de joyas desarrollado con React. Su propuesta se basa en una selección mensual de piezas para personas que hacen de su identidad una estética.

## Objetivo de la entrega

Esta entrega incorpora un carrito de compras funcional mediante Context API.

La aplicación permite:

- Agregar productos desde su vista de detalle.
- Seleccionar cantidades respetando el stock.
- Mantener el carrito al navegar entre rutas.
- Sumar cantidades sin duplicar productos.
- Mostrar la cantidad total en el CartWidget.
- Visualizar productos, cantidades y subtotales.
- Calcular el precio total de la compra.
- Eliminar productos individualmente.
- Vaciar completamente el carrito.
- Mostrar una vista alternativa cuando el carrito está vacío.

## Funcionalidades incorporadas

- Contexto global mediante `createContext`.
- Componente `CartProvider`.
- Hook personalizado `useCart`.
- Estado global `cart`.
- Actualizaciones inmutables.
- Prevención de productos duplicados.
- Acumulación de cantidades mediante `.map()`.
- Eliminación individual mediante `.filter()`.
- Cálculo de unidades y totales mediante `.reduce()`.
- Consulta de productos mediante `.find()` y `.some()`.
- Control de stock total y stock restante.
- CartWidget dinámico.
- Ruta `/cart`.
- Vista condicional para carrito vacío.
- Subtotal por producto.
- Total general.
- Eliminación individual.
- Vaciado completo.
- Placeholder para finalizar la compra.
- Navegación para continuar comprando.

## Arquitectura del contexto

El estado del carrito se encuentra en:

```text
src/context/CartContext.jsx
```

El hook para consumirlo se encuentra en:

```text
src/context/useCart.js
```

La aplicación está envuelta por `CartProvider` desde `main.jsx`, por lo que el contexto está disponible en todas las rutas y componentes.

```text
CartProvider
└── App
    └── Layout
        ├── Navbar
        │   └── CartWidget
        ├── Outlet
        │   ├── Catálogo
        │   ├── Detalle
        │   └── Carrito
        └── Footer
```

## Operaciones del carrito

### `addItem(item, quantity)`

Agrega un producto al carrito.

Si el producto ya existe, actualiza su cantidad mediante `.map()` sin crear un objeto duplicado.

La cantidad acumulada nunca puede superar el stock disponible.

### `removeItem(itemId)`

Elimina un producto mediante su ID utilizando `.filter()`.

### `clear()`

Vacía completamente el carrito.

### `isInCart(itemId)`

Devuelve un valor booleano indicando si el producto ya existe en el carrito.

### `getItemQuantity(itemId)`

Devuelve la cantidad actualmente agregada de un producto.

Permite calcular el stock restante antes de mostrar `ItemCount`.

### `totalItems`

Suma todas las unidades agregadas mediante `.reduce()`.

Este valor se muestra dinámicamente en `CartWidget`.

### `totalPrice`

Calcula la suma de los subtotales de todos los productos mediante `.reduce()`.

## Integración con el detalle

`ItemDetail` consume `useCart` y envía el producto junto con la cantidad seleccionada:

```js
addItem(item, cantidad)
```

El stock restante se calcula restando las unidades existentes en el carrito:

```js
const stockRestante = stock - cantidadEnCarrito
```

Cuando el usuario alcanza el stock completo, el contador deja de mostrarse y aparece un mensaje informativo.

## Vista del carrito

La ruta:

```text
/cart
```

renderiza el componente `Cart`.

Cuando el carrito contiene productos, muestra:

- Imagen.
- Nombre.
- Precio unitario.
- Cantidad.
- Subtotal.
- Botón para eliminar.
- Cantidad total de unidades.
- Precio total.
- Botón para vaciar.
- Placeholder para finalizar la compra.

Cuando el carrito está vacío, muestra un mensaje y un enlace para regresar al catálogo.

## Inmutabilidad

El estado nunca se modifica directamente.

Las operaciones utilizan:

- Spread operator para crear objetos y arrays nuevos.
- `.map()` para actualizar cantidades.
- `.filter()` para eliminar productos.
- `.reduce()` para calcular totales.
- `.find()` para localizar productos.
- `.some()` para verificar existencia.

## Persistencia

El carrito persiste mientras el usuario navega entre las diferentes rutas de la aplicación.

En esta etapa utiliza estado en memoria, por lo que se reinicia si se actualiza completamente el navegador. La persistencia definitiva se incorporará posteriormente mediante Firebase.

## Rutas disponibles

| Ruta | Función |
|---|---|
| `/` | Catálogo completo |
| `/category/:categoryId` | Productos filtrados por categoría |
| `/item/:itemId` | Detalle individual |
| `/cart` | Carrito de compras |
| `/admin` | Redirección al inicio |
| `*` | Página 404 |

## Componentes principales

### `CartProvider`

Administra el estado global y las operaciones del carrito.

### `useCart`

Permite consumir el contexto y valida que exista un Provider.

### `CartWidget`

Muestra la cantidad total de unidades y enlaza con `/cart`.

### `Cart`

Presenta el contenido del carrito, los subtotales y el total general.

### `ItemDetail`

Conecta `ItemCount` con `addItem`.

### `ItemCount`

Administra la cantidad seleccionada respetando el stock restante.

### `Layout`

Mantiene Navbar, CartWidget y Footer en todas las rutas.

## Tecnologías utilizadas

- React 19
- Context API
- React Router DOM
- Vite
- JavaScript
- CSS
- React Icons
- Git y GitHub

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/Alop03/ansiedark-preentrega6.git
```

Ingresar al proyecto:

```bash
cd ansiedark-preentrega6
```

Instalar las dependencias:

```bash
npm install
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

## Validación del proyecto

Ejecutar el analizador de código:

```bash
npm run lint
```

Generar la versión de producción:

```bash
npm run build
```

## Autor

Álvaro Sigüertt — Proyecto desarrollado para el curso de React JS de Coderhouse.