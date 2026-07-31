# RentNest 🏠 - House Rental Web Application

RentNest is a full-stack modern rental platform that connects property owners with tenants. Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Zod**.

---

## 🚀 Key Features

- **Multi-Role Authentication**: Tenant (USER), Landlord (OWNER), and Admin (ADMIN).
- **Property Discovery**: Search & filter properties by location and price range.
- **Rental Request Workflow**: Tenants apply -> Landlords Approve/Reject -> Tenants Pay.
- **Stripe Integration**: Secure payment handling for approved rental requests.
- **Admin Management Panel**: Manage users, properties, and overall system status.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router, Server & Client Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Form Handling & Validation**: React Hook Form, Zod Schema Validation
- **State & HTTP**: Axios Client, Cookies (`js-cookie`)

---

## 📁 Directory Structure

```text
├── app/                  # Next.js App Router Pages
├── components/           # Reusable UI & Business Components
├── hooks/                # Custom React Hooks
├── lib/                  # Axios Client & Zod Schemas
├── types/                # TypeScript Type Definitions
├── middleware.ts         # Route Guard & Auth Middleware
└── API_INTEGRATION.md    # API Mapping Docs