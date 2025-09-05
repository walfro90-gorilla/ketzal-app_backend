# Ketzal App Backend - Project Context

## Project Overview

This is a **NestJS** backend application for the Ketzal App, a travel planning platform. The application is built with TypeScript and uses PostgreSQL as its database through Prisma ORM. It follows a modular architecture with separate modules for different features like users, services, products, suppliers, wallet, etc.

The application has two deployment modes:
1. Traditional server-based deployment using NestJS
2. Serverless deployment on Vercel with individual API endpoints

## Key Technologies

- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL with Prisma ORM
- **API Documentation**: Swagger/OpenAPI
- **Testing**: Jest
- **Deployment**: Docker container and Vercel serverless functions
- **Validation**: class-validator with global validation pipes

## Project Structure

```
ketzal-app_backend/
├── api/                  # Vercel serverless functions
├── prisma/               # Prisma schema and migrations
├── scripts/              # Utility scripts
├── src/                  # Main source code
│   ├── app.module.ts     # Root application module
│   ├── main.ts           # Application entry point
│   ├── categories/       # Categories feature module
│   ├── common/           # Shared utilities, filters, etc.
│   ├── locations/        # Location feature module
│   ├── notifications/    # Notifications feature module
│   ├── planners/         # Travel planner feature module
│   ├── products/         # Products feature module
│   ├── reviews/          # Reviews feature module
│   ├── services/         # Services feature module
│   ├── suppliers/        # Suppliers feature module
│   ├── users/            # Users feature module
│   ├── wallet/           # Wallet feature module
│   └── test/             # Test utilities
├── dist/                 # Compiled output
├── coverage/             # Test coverage reports
└── ...
```

## Key Features

The application implements a comprehensive travel planning platform with:

- **User Management**: Authentication, roles (user, admin, superadmin)
- **Wallet System**: Balance management in MXN and Axo currencies
- **Travel Planning**: Create and manage travel itineraries
- **Services & Products**: Browse and purchase travel services and products
- **Suppliers**: Manage service providers
- **Reviews**: User reviews for services
- **Categories**: Categorization of services and products
- **Locations**: Global location database
- **Notifications**: User notifications system

## Database Schema

The database includes models for:
- Users, Accounts, Suppliers
- Services and Products
- Travel Planners and Planner Items
- Wallets and Wallet Transactions
- Reviews
- Categories
- Global Locations
- Payments
- Wishlists and Wishlist Items
- Verification Tokens

## Development Setup

### Prerequisites
- Node.js 18+
- PostgreSQL database (configured in .env)
- npm or yarn

### Environment Configuration
The application requires a `.env` file with:
- `DATABASE_URL`: PostgreSQL connection string (for application)
- `SHADOW_DATABASE_URL`: PostgreSQL connection for Prisma migrations
- `GEMINI_API_KEY`: API key for Gemini integration

### Installation
```bash
npm install
```

### Building
```bash
# Build the application
npm run build
```

### Running
```bash
# Development mode with hot reload
npm run start:dev

# Production mode
npm run start
```

### Testing
```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run end-to-end tests
npm run test:e2e
```

### Linting
```bash
# Run linting
npm run lint
```

## Deployment

### Docker Deployment
The application includes a Dockerfile for containerized deployment:
- Uses Node.js 18 base image
- Installs all dependencies
- Generates Prisma client
- Builds the application
- Runs the application on port 4000

### Vercel Serverless Deployment
The application is configured for Vercel deployment with:
- Individual serverless functions for each module
- Route configuration in vercel.json
- Module-specific entry points in the api/ directory

### Health Checks
The application exposes:
- `/health` endpoint
- `/` root endpoint
- Both return "ok" for health checks

## Development Conventions

### Code Organization
- Each feature is implemented as a separate NestJS module
- Modules follow the standard NestJS pattern with controllers, services, and DTOs
- Prisma is used as the database interface layer
- Global prefix `/api` is applied to all routes

### Error Handling
- Global exception filter implemented in `src/common/filters/http-exception.filter.ts`
- Applied globally in main.ts

### Validation
- Global validation pipe with whitelist and transformation enabled
- DTOs used for request validation and transformation

### API Documentation
- Swagger/OpenAPI documentation available at `/api`
- Configured in main.ts

### Testing
- Unit tests written with Jest
- Test configuration in jest.config.js
- Target coverage: 80% for branches, functions, lines, and statements

## Known Issues

### Prisma Model Naming Inconsistencies
There are errors in the test files where Prisma model names are incorrectly referenced:
- `wallets` should be `wallet`
- `users` should be `user`
- `wallet_transactions` should be `walletTransaction`

These need to be corrected in the wallet service and its tests.

## API Endpoints

The application exposes RESTful APIs for all features:
- Users: `/api/users/*`
- Services: `/api/services/*`
- Products: `/api/products/*`
- Suppliers: `/api/suppliers/*`
- Reviews: `/api/reviews/*`
- Categories: `/api/categories/*`
- Locations: `/api/locations/*`
- Notifications: `/api/notifications/*`
- Planners: `/api/planners/*`
- Wallet: `/api/wallet/*`

Each module has its own controller with standard CRUD operations where applicable.