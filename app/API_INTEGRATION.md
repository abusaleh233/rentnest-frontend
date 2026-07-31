# RentNest Frontend - API Integration Documentation

## Overview
This document outlines the API endpoints, authentication headers, and request/response payloads integrated into the RentNest Frontend Next.js application.

**Base URL:** `https://rentnest-backend-sage.vercel.app/api`

---

## Authorization
All protected endpoints require a JWT bearer token passed in the `Authorization` header:
`Authorization: Bearer <token>`

The client stores this token in browser Cookies via `js-cookie`.

---

## Endpoints

### 1. Authentication
- **POST `/auth/register`**
  - Payload: `{ name, email, password, role: "USER" | "OWNER" }`
  - Response: `{ token, user }`
- **POST `/auth/login`**
  - Payload: `{ email, password }`
  - Response: `{ token, user }`
- **GET `/auth/me`**
  - Headers: `Authorization`
  - Response: Current User Object

### 2. Properties
- **GET `/properties`**
  - Query Params: `location`, `minPrice`, `maxPrice`
  - Response: List of available properties
- **GET `/properties/:id`**
  - Response: Single property details
- **POST `/properties`** (Role: OWNER)
  - Payload: `{ title, description, price, location, images: string[] }`

### 3. Rental Requests
- **POST `/rentals`** (Role: USER)
  - Payload: `{ propertyId }`
- **GET `/rentals`** (Role: USER)
  - Response: Array of rental requests submitted by the user
- **GET `/landlord/requests`** (Role: OWNER)
  - Response: Requests submitted for properties owned by the landlord
- **PATCH `/landlord/requests/:id`** (Role: OWNER)
  - Payload: `{ status: "APPROVED" | "REJECTED" }`

### 4. Payments
- **POST `/payments/create-intent`** (Role: USER)
  - Payload: `{ rentalId }`
  - Response: `{ url }` (Stripe Checkout URL)

### 5. Admin Management
- **GET `/admin/users`** (Role: ADMIN)
  - Response: List of all registered users
- **DELETE `/admin/users/:id`** (Role: ADMIN)
  - Response: Success status