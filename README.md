# 🏠 RentNest – Rental Property Management System

RentNest is a modern Rental Property Management System where users can browse rental properties, send rental requests, make secure online payments, and manage their rentals. Property owners can manage properties and rental requests, while administrators can monitor and manage the entire platform.

---

# 🌐 Live Demo

### Frontend

> https:

### Backend

> https://rentnest-backend-sage.vercel.app/

---

# 📂 GitHub Repository

### Frontend Repository

> https://github.com/abusaleh233/rentnest-frontend.git

### Backend Repository

> https://github.com/abusaleh233/rentnest-backend.git


---

# 📖 Project Overview

RentNest is built to simplify the rental process for both tenants and property owners.

The application provides:

* Property browsing
* Rental request management
* Secure payment integration
* Property management
* User authentication
* Role-based authorization
* Admin dashboard

---

# ✨ Features

## 👤 User

* Register & Login
* JWT Authentication
* Browse Properties
* Search & Filter Properties
* View Property Details
* Send Rental Request
* View My Requests
* View Rental Details
* Make Payment using Stripe
* Payment History
* Responsive Dashboard

---

## 🏠 Owner

* Owner Dashboard
* Add Property
* Update Property
* Delete Property
* View My Properties
* View Rental Requests
* Approve Request
* Reject Request

---

## 🛡️ Admin

* Admin Dashboard
* Manage Users
* Manage Properties
* Manage Rental Requests
* Manage Payments
* Platform Monitoring

---

# 💳 Payment System

* Stripe Payment Gateway
* Secure Checkout
* Payment Success Page
* Payment Failed Page
* Payment History



# 🔥 API Endpoints

## Authentication

* POST /api/auth/register
* POST /api/auth/login
* GET /api/users/me

---

## Property

* GET /api/properties
* GET /api/properties/:id
* POST /api/properties
* PATCH /api/properties/:id
* DELETE /api/properties/:id

---

## Rental

* POST /api/rentals
* GET /api/rentals
* GET /api/rentals/:id

---

## Payment

* POST /api/payments/create-intent
* GET /api/payments/history

---

