# Transportation E-Ticketing Backend
## Project Architecture Guide

Version: 1.0

---

# 1. Project Overview

This project is a production-level Transportation E-Ticketing Backend built using modern backend engineering practices.

The goal is to build a scalable, maintainable, secure, and enterprise-ready backend while learning professional backend development.

The backend follows:

- Layered Architecture
- Repository Pattern
- Service Layer
- Modular Design
- Dependency Injection (where appropriate)
- Standardized API Responses
- Centralized Error Handling
- Structured Logging
- Request Validation
- Clean Code Principles

---

# 2. Technology Stack

Runtime

- Node.js

Framework

- Express 5

Language

- TypeScript

Database

- PostgreSQL

ORM

- Prisma ORM

Authentication

- JWT
- Refresh Tokens

Validation

- Zod

Logging

- Pino

Password Hashing

- bcrypt

Package Manager

- npm

---

# 3. Project Structure

src/

    app.ts
    server.ts

    common/

    config/

    database/

    middleware/

    generated/

    modules/

Each feature lives inside its own module.

---

# 4. Module Structure

Every module follows exactly the same structure.

Example

modules/

    users/

        constants/

        controllers/

        dto/

        interfaces/

        mappers/

        repositories/

        routes/

        services/

        types/

        validation/

        index.ts

No exceptions.

---

# 5. Request Flow

Every HTTP request follows this flow.

Client

↓

Express Route

↓

Validation Middleware

↓

Controller

↓

Service

↓

Repository

↓

Prisma

↓

PostgreSQL

↓

Response Helper

↓

Client

Business logic never skips layers.

---

# 6. Responsibilities

Routes

Responsible for:

- Registering endpoints
- Applying middleware
- Connecting controllers

Routes never contain business logic.

---

Controllers

Responsible for:

- Receiving Request
- Calling Service
- Returning Response

Controllers never:

- Query Database
- Hash Passwords
- Generate JWT
- Write Prisma Queries

---

Services

Responsible for:

- Business Logic
- Rules
- Calculations
- Authentication
- Authorization
- Transactions

Services never:

- Return HTTP Responses
- Access Express objects

---

Repositories

Responsible only for database access.

Repositories contain:

Prisma

SQL equivalent operations

Repositories never contain:

Business logic

Validation

JWT

bcrypt

---

Mappers

Responsible for converting

DTO

↓

Prisma Input

↓

Response DTO

No conversions happen inside Controllers.

---

DTO

DTOs define data entering or leaving the system.

Database models should never be exposed directly.

---

Validation

Every endpoint validates input using Zod.

Validation happens before Controllers.

Never validate manually inside Services.

---

# 7. Error Handling

The project uses centralized error handling.

Rules

Never

return res.status(...)

inside Services.

Always

throw new AppError(...)

Global Error Handler handles responses.

---

# 8. API Responses

Every response uses

sendResponse()

Never call

res.json()

directly unless absolutely necessary.

Response format is standardized.

---

# 9. Logging

Project uses Pino.

Never use

console.log()

Log

Requests

Errors

Authentication

Database Connection

Important Business Events

---

# 10. Validation

Validation middleware expects

validate({

body,

params,

query,

headers

})

Not

validate(schema)

---

# 11. Prisma

Never assume default Prisma imports.

Always inspect generated Prisma client.

Repositories communicate with Prisma.

Services do not.

---

# 12. Database

Use Prisma Migrations.

Never edit migration history.

Relationships belong inside schema.prisma.

Enums belong in schema.prisma.

---

# 13. Passwords

Passwords are never stored.

Only passwordHash is stored.

bcrypt handles hashing.

---

# 14. Authentication

Authentication belongs inside Auth Module.

Users Module is NOT responsible for login.

Auth owns

Register

Login

Logout

Refresh Token

Forgot Password

Reset Password

---

# 15. Users Module

Responsible for

User CRUD

Profile

Status

Password Change

Not authentication.

---

# 16. Roles & Permissions

Authorization will use

Roles

Permissions

Middleware

Policies

Never hardcode permissions.

---

# 17. Coding Standards

Use

TypeScript strict mode

ES Modules

Named exports when appropriate

Meaningful variable names

Small functions

Small controllers

Readable code

Avoid duplicated code.

---

# 18. Naming Convention

Files

users.service.ts

users.repository.ts

users.controller.ts

create-user.dto.ts

Routes

users.routes.ts

Validation

create-user.schema.ts

Constants

user.constants.ts

---

# 19. Imports

Prefer project imports.

Avoid unnecessary relative imports when aliases are configured.

Never invent import paths.

Match project structure.

---

# 20. Dependency Injection

Prefer constructor injection.

Example

Service

↓

Repository

Repository is injected.

Not created everywhere.

---

# 21. Transactions

Whenever multiple database operations must succeed together,

Use

prisma.$transaction()

Examples

Registration

Booking

Payment

Ticket Purchase

---

# 22. Security

Validate every request.

Hash every password.

Never expose passwordHash.

Never trust client input.

Use JWT.

Use Refresh Tokens.

Use HTTPS in production.

---

# 23. Testing Strategy

Later

Unit Tests

Repository Tests

Service Tests

Integration Tests

API Tests

---

# 24. Documentation

Swagger/OpenAPI

Every endpoint should eventually be documented.

---

# 25. Future Modules

Modules planned

Auth

Roles

Permissions

Users

Vehicles

Drivers

Schedules

Routes

Trips

Bookings

Tickets

Payments

Reports

Dashboard

Notifications

Audit Logs

Settings

---

# 26. AI Collaboration Rules

When generating code:

Never generate tutorial code.

Never assume helper signatures.

Always inspect the project.

Reuse existing infrastructure.

Match coding style.

Never recreate utilities already implemented.

Explain architecture before code.

Explain why.

Explain alternatives.

Explain tradeoffs.

Build production-ready code.

---

End of Document