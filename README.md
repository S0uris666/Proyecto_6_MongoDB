
# Proyecto Backend – Gestión de Usuarios, Productos, Roles y Eventos.

Este proyecto es una API REST construida con Node.js, Express y MongoDB que gestiona autenticación de usuarios, asignación de roles, creación y administración de eventos y productos.

Incluye autenticación con JWT, autorización basada en roles (user, superuser, admin), y control de acceso para endpoints críticos.


## Documentación 

[La documentación interactiva de la API está disponible aquí](https://proyecto-6-mongodb-erpe.onrender.com/api-docs)


## 🚀 Tecnologías usadas

- Node.js + Express (framework backend)
- MongoDB + Mongoose (base de datos NoSQL)
- JWT (autenticación por token)
- Bcrypt.js (encriptación de contraseñas)
- Swagger (documentación interactiva de la API)
- Render (despliegue en la nube)


## ⚙️ Instalación local

Clona el repositorio e instala dependencias:

```bash
git clone https://github.com/S0uris666/Proyecto_6_MongoDB
```
```bash
cd Proyecto_6_MongoDB
```
```bash
npm install
```
Crea un archivo .env en la raíz con las variables necesarias:
```bash
PORT=3000
```
```bash
MONGO_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/<nombreBase>?retryWrites=true&w=majority&appName=<nombreApp>
```
```bash
SECRET=SECRET_KEY
```

Ejecuta el servidor en desarrollo:
```bash
npm run dev
```

## 📌 Endpoints disponibles

#### 🔑 Autenticación y Usuarios (/api/v1/users)


  

- POST /login → Iniciar sesión (devuelve JWT).
- PUT /update → Actualizar usuario (requiere token).
- GET /verify-user → Verificar usuario autenticado (requiere token).

#### 🛍️ Productos (/api/v1/products)

- GET /readall → Listar productos.
- GET /read/:id → Obtener producto por ID.
- POST /create → Crear producto (solo admin, requiere token).
- PUT /update/:id → Actualizar producto (solo admin, requiere token).
- DELETE /delete/:id → Eliminar producto (solo admin, requiere token).

#### 👤 Roles (/api/v1/users)

- POST /request-role → Solicitar rol superuser (requiere token).
- GET /role-requests-admin → Listar solicitudes de rol (solo admin).
- PUT /role-requests-admin/:id → Aprobar/Rechazar solicitud (solo admin).

Takes two numbers and returns the sum.

#### 📅 Eventos (/api/v1/events)

- GET /readall → Listar todos los eventos.
- GET /read/:id → Obtener evento por ID.
- POST /create → Crear evento (solo superuser o admin, requiere token).
- PUT /update/:id → Actualizar evento (admin o creador superuser, requiere token).
- DELETE /delete/:id → Eliminar evento (admin o creador superuser, requiere token).
## 🔒 Autenticación

La API usa JWT Bearer Tokens.
Debes incluir el token en el header de tus solicitudes privadas:



Ejemplo en Swagger:

1.- Haz login en /api/v1/users/login.

2.- Copia el token del response.

3.- Haz click en el botón Authorize en Swagger.

4.- Pega Bearer <token>.


## 📂 Estructura del proyecto



```bash
📂 src
 ┣ 📂 config         # Configuración de la aplicación (DB)
 ┣ 📂 controllers    # Lógica para cada recurso (usuarios, productos, eventos)
 ┣ 📂 middlewares    # Middlewares personalizados (autenticación, roles, validaciones)
 ┣ 📂 models         # Modelos de Mongoose (User, Product, Event, Role, etc.)
 ┣ 📂 routes         # Definición de rutas y endpoints de la API
 ┣ 📜 index.js       # Punto de entrada principal del servidor
 ┗ 📜 swagger.js     # Configuración de Swagger para documentación de la API

📜 .env             # Variables de entorno (PORT, DB_URI, JWT_SECRET, etc.)
📜 .gitignore       # Archivos y carpetas ignorados por Git
📜 package.json     # Dependencias, scripts y metadatos del proyecto
📜 package-lock.json
📜 README.md        # Documentación del proyecto
 
```
## ✅ Próximos pasos

- Mejorar validaciones en controladores.
- Implementar paginación en productos y eventos.
- Agregar pruebas unitarias con Jest o Mocha.




