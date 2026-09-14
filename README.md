Level-Up Gamer 

Proyecto semestral desarrollado para la asignatura Desarrollo Full Stack II - DSY1104.
Level-Up Gamer corresponde a una tienda gamer online orientada al mercado chileno. En esta primera etapa del proyecto se desarrolló el Front-End utilizando HTML, CSS y JavaScript, incorporando navegación entre vistas, validaciones, persistencia con `localStorage`, carrito de compras y mantenedores administrativos.
Integrantes
Pablo Gonzalez
Gabriel Chodil
Tecnologías utilizadas
HTML5
CSS3
JavaScript
LocalStorage
Git
GitHub
Visual Studio Code
Live Server
> Esta versión corresponde a la **EV1**, por lo que no utiliza todavía backend, base de datos, API REST ni autenticación real.
Funcionalidades implementadas
Tienda pública
Página de inicio con identidad visual Level-Up Gamer.
Navegación responsive entre las principales vistas.
Catálogo dinámico de productos.
Vista de detalle de producto.
Productos destacados en el HOME.
Carrito de compras con persistencia en `localStorage`.
Aumento y disminución de cantidades.
Eliminación individual de productos.
Vaciado del carrito.
Control de stock disponible.
Máximo de 5 unidades por producto.
Cálculo de subtotal y total.
Descuento de 20% para usuarios con correo `@duoc.cl` o `@profesor.duoc.cl`.
Productos con precio `0` mostrados como FREE.
Compra simulada para esta etapa del proyecto.
Registro de usuarios.
Validación de RUN chileno.
Validación de edad mínima de 18 años.
Selección de Región y Comuna.
Validación de correos permitidos:
`@duoc.cl`
`@profesor.duoc.cl`
`@gmail.com`
Inicio de sesión simulado.
Visualización del usuario conectado y cierre de sesión.
Formulario de contacto con validaciones.
Sección Nosotros.
Blog con dos artículos y sus vistas de detalle.
Video embebido relacionado con gaming.
Diseño adaptable a escritorio, tablet y dispositivos móviles.
Área administrativa
El sistema incluye un panel administrativo accesible desde:
```text
frontend/admin/index.html
```
Administración de productos
Listar productos.
Crear productos.
Editar productos.
Eliminar productos.
Validar código, nombre, descripción, precio y stock.
Manejar stock crítico.
Seleccionar categoría.
Permitir productos con precio `0`.
Los cambios realizados se reflejan en el catálogo público mediante `localStorage`.
Administración de usuarios
Listar usuarios.
Crear usuarios.
Editar usuarios.
Eliminar usuarios.
Validar RUN, nombre, apellidos, correo y dirección.
Seleccionar Región y Comuna.
Asignar tipo de usuario:
Administrador
Cliente
Vendedor
Validaciones
Las validaciones se realizan con JavaScript y mensajes personalizados.
Se utilizan validaciones tanto al enviar los formularios como durante la interacción del usuario mediante eventos como `blur` y `change`.
Entre las principales reglas se encuentran:
RUN chileno válido y sin puntos ni guion.
Correos con formato y dominio permitido.
Contraseña entre 4 y 10 caracteres.
Usuario mayor de 18 años al registrarse.
Campos obligatorios.
Límites máximos de caracteres.
Precio mayor o igual a 0.
Stock mayor o igual a 0 y entero.
Control de stock crítico.
Prevención de usuarios repetidos por RUN o correo.
Persistencia con LocalStorage
El proyecto utiliza `localStorage` para simular persistencia de información sin necesidad de una base de datos.
Entre los datos almacenados se encuentran:
```text
productos
carrito
usuarios
usuario
productoSeleccionado
productoEditar
usuarioEditar
```
Gracias a esto, productos, usuarios, sesión simulada y carrito pueden mantenerse después de actualizar la página.
Estructura del proyecto
```text
level-up-gamer/
│
├── frontend/
│   │
│   ├── admin/
│   │   ├── index.html
│   │   ├── productos.html
│   │   ├── producto-form.html
│   │   ├── usuarios.html
│   │   └── usuario-form.html
│   │
│   ├── css/
│   │   ├── style.css
│   │   ├── formularios.css
│   │   ├── admin.css
│   │   └── blog.css
│   │
│   ├── img/
│   │   └── logo-level-up.png
│   │
│   ├── js/
│   │   ├── comun.js
│   │   ├── productos.js
│   │   ├── carrito.js
│   │   ├── validaciones.js
│   │   ├── registro.js
│   │   ├── login.js
│   │   ├── contacto.js
│   │   ├── regiones-comunas.js
│   │   ├── video.js
│   │   ├── admin-productos.js
│   │   ├── admin-producto-form.js
│   │   ├── admin-usuarios.js
│   │   └── admin-usuario-form.js
│   │
│   ├── index.html
│   ├── productos.html
│   ├── detalle-producto.html
│   ├── carrito.html
│   ├── registro.html
│   ├── login.html
│   ├── nosotros.html
│   ├── blog.html
│   ├── blog-detalle-1.html
│   ├── blog-detalle-2.html
│   └── contacto.html
│
└── README.md
```
Cómo ejecutar el proyecto
Opción recomendada: Visual Studio Code + Live Server
Clonar el repositorio:
```bash
git clone https://github.com/pablgonzalezr-cyber/level-up-gamer.git
```
Abrir la carpeta `level-up-gamer` en Visual Studio Code.
Tener instalada la extensión Live Server.
Abrir:
```text
frontend/index.html
```
Presionar clic derecho y seleccionar:
```text
Open with Live Server
```
No es necesario instalar dependencias, ejecutar Maven, levantar una base de datos ni configurar un servidor backend.
Inicio de sesión en EV1
El login implementado en esta etapa es simulado.
Para realizar una prueba se debe ingresar:
Un correo válido con dominio permitido.
Una contraseña entre 4 y 10 caracteres.
El correo queda almacenado temporalmente en `localStorage` como usuario conectado.
La autenticación real será incorporada en etapas posteriores del proyecto.
Trabajo colaborativo
El proyecto fue desarrollado utilizando Git y GitHub, con commits separados por integrante.
Pablo Gonzalez
Participó principalmente en:
Estructura inicial del proyecto.
Navegación principal.
Sección Nosotros.
Catálogo dinámico de productos.
Detalle de productos.
Carrito de compras.
Persistencia y reglas de stock.
Administración de productos.
Integración final del HOME.
Productos destacados.
Video.
Reglas de negocio y ajustes finales.
Gabriel Chodil
Participó principalmente en:
Registro de usuarios.
Inicio de sesión.
Formulario de contacto.
Blog y detalles de noticias.
Administración de usuarios.
Diseño responsive.
Integración del logo.
Navegación y consistencia visual.
Validaciones dinámicas.
Ajustes finales de experiencia de usuario.
Repositorio
```text
https://github.com/pablgonzalezr-cyber/level-up-gamer
```
Estado del proyecto
Esta versión corresponde a la primera entrega del proyecto semestral.
En etapas posteriores se contempla continuar la evolución del sistema incorporando tecnologías como React, servicios backend, base de datos y mecanismos de autenticación reales según los requerimientos de las siguientes evaluaciones.