# Arquitectura Actualizada del Backend

Este documento detalla la arquitectura de backend refactorizada de la aplicación Ketzal, que ahora opera bajo un modelo de **micro-funciones serverless** desplegadas en Vercel.

## Visión General

La arquitectura anterior consistía en una aplicación monolítica de NestJS desplegada como una única función serverless. La nueva arquitectura descompone esta aplicación en múltiples funciones serverless más pequeñas y especializadas. Cada función corresponde a un módulo de dominio específico de la aplicación (ej. Usuarios, Productos, etc.).

Este enfoque ofrece varias ventajas:
-   **Rendimiento Mejorado:** Tiempos de inicio en frío ("cold starts") más rápidos, ya que cada función solo carga el código necesario para su dominio.
-   **Escalabilidad Independiente:** Cada endpoint puede escalar de forma autónoma según su carga de trabajo específica.
-   **Mantenimiento Simplificado:** El desarrollo y la depuración se vuelven más sencillos al trabajar con bases de código más pequeñas y aisladas.
-   **Resiliencia:** Un error en una función tiene menos probabilidades de afectar a otras partes del sistema.

## Estructura de Endpoints (Funciones Serverless)

El backend ahora se compone de las siguientes funciones serverless, ubicadas en el directorio `api/`. Cada archivo `.ts` representa un endpoint independiente:

-   `api/categories.ts`
-   `api/locations.ts`
-   `api/notifications.ts`
-   `api/planners.ts`
-   `api/products.ts`
-   `api/reviews.ts`
-   `api/services.ts`
-   `api/suppliers.ts`
-   `api/users.ts`
-   `api/wallet.ts`

## Enrutamiento (Routing)

Vercel gestiona el enrutamiento de las peticiones entrantes a la función serverless correcta a través de las reglas definidas en el archivo `vercel.json`. Las rutas de la API pública no han cambiado, garantizando la compatibilidad con los clientes existentes.

A continuación se muestra cómo las rutas de la API se mapean a sus respectivas funciones:

| Ruta (Patrón de URL)      | Función Serverless Destino |
| ------------------------- | -------------------------- |
| `/api/products(.*)`       | `api/products.ts`          |
| `/api/users(.*)`          | `api/users.ts`             |
| `/api/wallet(.*)`         | `api/wallet.ts`            |
| `/api/services(.*)`       | `api/services.ts`          |
| `/api/suppliers(.*)`      | `api/suppliers.ts`         |
| `/api/reviews(.*)`        | `api/reviews.ts`           |
| `/api/planners(.*)`       | `api/planners.ts`          |
| `/api/notifications(.*)`  | `api/notifications.ts`     |
| `/api/locations(.*)`      | `api/locations.ts`         |
| `/api/categories(.*)`     | `api/categories.ts`        |

### Ruta de Fallback

Cualquier ruta que no coincida con los patrones anteriores es dirigida a `dist/main.js`, que contiene la aplicación NestJS monolítica original. Esto asegura que cualquier endpoint que aún no haya sido migrado a su propia función serverless siga funcionando correctamente.

```json
{
    "src": "/(.*)",
    "dest": "dist/main.js"
}
```

Esta arquitectura híbrida permite una migración incremental y segura, manteniendo la funcionalidad completa de la aplicación en todo momento.
