# Arquitectura del Repositorio

## Descripción General

Este repositorio contiene el backend de la aplicación Ketzal, una plataforma de marketplace. Está construido con [NestJS](https://nestjs.com/), un framework de Node.js para crear aplicaciones del lado del servidor eficientes y escalables.

## Tecnologías Principales

- **Framework:** NestJS
- **Lenguaje:** TypeScript
- **ORM de Base de Datos:** Prisma
- **Base de Datos:** (No especificado, pero Prisma es compatible con PostgreSQL, MySQL, SQLite, etc.)
- **Contenerización:** Docker
- **Despliegue:** Vercel (Serverless)

## Estructura del Proyecto

El proyecto sigue una arquitectura modular, una característica clave de NestJS. La lógica de negocio está organizada en módulos basados en características, que se encuentran en el directorio `src/`.

### Módulos Principales

- `src/app.module.ts`: El módulo raíz de la aplicación.
- `src/main.ts`: El punto de entrada de la aplicación.
- **Módulos de Características:**
    - `users`: Gestiona la lógica de usuarios.
    - `products`: Gestiona la lógica de productos.
    - `services`: Gestiona la lógica de servicios.
    - `suppliers`: Gestiona la lógica de proveedores.
    - `categories`: Gestiona la lógica de categorías de productos/servicios.
    - `locations`: Gestiona la lógica de ubicaciones.
    - `notifications`: Gestiona la lógica de notificaciones.
    - `planners`: Gestiona la lógica de planificadores.
    - `reviews`: Gestiona la lógica de reseñas.
    - `wallet`: Gestiona la lógica de la billetera de los usuarios.

Cada módulo de características generalmente contiene:
- Un **controlador** (`*.controller.ts`) para manejar las solicitudes HTTP entrantes.
- Un **servicio** (`*.service.ts`) para encapsular la lógica de negocio.
- Un **módulo** (`*.module.ts`) para agrupar los componentes relacionados.
- **DTOs** (Data Transfer Objects) en un directorio `dto/` para la validación de datos.
- **Entidades** en un directorio `entities/` que definen la estructura de los datos.

## Base de Datos

La interacción con la base de datos se gestiona a través de [Prisma](https://www.prisma.io/). El esquema de la base de datos se define en el archivo `prisma/schema.prisma`. Prisma Client se utiliza en los servicios para consultar la base de datos.

## API

La aplicación expone una API RESTful. Las rutas se definen en los controladores de cada módulo.

### Documentación de la API

Se utiliza [Swagger (OpenAPI)](https://swagger.io/) para generar automáticamente la documentación de la API. La documentación está disponible en el endpoint `/api` cuando la aplicación se está ejecutando.

## Despliegue

El proyecto está configurado para dos tipos de despliegue:

1.  **Contenerización con Docker:** Un `Dockerfile` está presente en la raíz del proyecto, lo que permite construir una imagen de Docker para el despliegue.

2.  **Serverless en Vercel:** La configuración en `vercel.json` indica que el proyecto está destinado a ser desplegado como una función serverless en Vercel. La configuración ha sido corregida para apuntar al punto de entrada correcto para un proyecto de TypeScript (`dist/main.js`).


