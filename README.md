# GearUp 🏋️  
## Rent Sports & Outdoor Gear Instantly

GearUp is a backend API for a sports and outdoor equipment rental platform. Customers can browse available gear, place rental orders, make payments, and track rental status. Providers can manage their gear inventory and rental orders, while admins can manage users, categories, and platform activities.

---

# 🚀 Project Overview

GearUp provides a complete rental management system with three different roles:

- **Customer** → Rent sports equipment, make payments, track orders, and submit reviews.
- **Provider** → Add and manage gear inventory, view rental requests, and update order status.
- **Admin** → Manage users, gear listings, categories, and rental operations.

---

# 👥 User Roles & Permissions

| Role | Description | Permissions |
|------|-------------|-------------|
| Customer | Users who rent sports gear | Browse gear, create rental, payment, review |
| Provider | Gear owners/vendors | Manage inventory, handle rental orders |
| Admin | Platform manager | Manage users, categories, gear, rentals |

---

# 🛠️ Technology Stack

## Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL

## Authentication

- JWT Authentication
- Role Based Authorization
- bcrypt Password Hashing

## Payment

- Stripe Payment Gateway

## Tools

- Git & GitHub
- Postman
- Prisma Studio
- Vercel Deployment

---

# ✨ Features

## 🔐 Authentication

- User registration
- User login
- JWT based authentication
- Role based access control

Available roles AdminRole:
 - "email": "loi2@gmail.com",
 - "password": "12345678"



---

# 🔗 API Endpoints

## Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

---

# Gear API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/gear` | Get all gear |
| GET | `/api/gear/:id` | Get gear details |
| GET | `/api/categories` | Get categories |

---

# Rental API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/rentals` | Create rental order |
| GET | `/api/rentals` | Get user rentals |
| GET | `/api/rentals/:id` | Get rental details |

---

# Payment API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/payments/create` | Create Stripe payment session |
| POST | `/api/payments/confirm` | Confirm payment |
| GET | `/api/payments` | Get payment history |
| GET | `/api/payments/:id` | Get payment details |

---

# Provider API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/provider/gear` | Add gear |
| PUT | `/api/provider/gear/:id` | Update gear |
| DELETE | `/api/provider/gear/:id` | Delete gear |
| GET | `/api/provider/orders` | Get orders |
| PATCH | `/api/provider/orders/:id` | Update order status |

---

# Review API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/reviews` | Create review |

---

# Admin API

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/admin/users` | Get all users |
| PATCH | `/api/admin/users/:id` | Update user status |
| GET | `/api/admin/gear` | Get all gear |
| GET | `/api/admin/rentals` | Get all rentals |

---


---

# 🏕️ Customer Features

- Browse all available gear
- Search gear by category, price, brand, availability
- View gear details
- Create rental orders
- Make payment using Stripe
- Confirm payment
- View payment history
- Track rental status
- Submit reviews after returning gear
- Manage profile

---

# 🏪 Provider Features

- Add new gear items
- Update gear information
- Delete gear
- Manage available quantity
- View rental orders
- Update rental order status



