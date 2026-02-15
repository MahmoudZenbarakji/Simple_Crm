# Simple CRM Backend – Technical Assessment

## 📌 Overview

This project is a simple CRM-style REST API built using **NestJS (TypeScript)** and **Prisma ORM**.

It includes:

- JWT-based Authentication
- Leads management
  - Pagination
  - Dynamic filtering
  - Sorting
  - CSV export
- Database seeding for development

The system simulates an internal CRM where authenticated users (admins) manage business leads.

---

## 🏗 Project Structure

src/
│
├── auth/ # Authentication module (login, JWT strategy, guards)
├── leads/ # Leads module (listing, filtering, sorting, export)
├── prisma/ # Prisma service and database integration
├── common/ # Shared utilities (if needed)
└── main.ts # Application bootstrap

### Design Principles

- Clear separation between **Authentication layer** and **Business logic**
- DTO-based validation using `class-validator`
- Prisma ORM for type-safe database access
- JWT Guard to protect leads endpoints
- Clean controller → service → database flow

---

## 🔐 Authentication

### Login Endpoint

POST /api/auth/login

### Request Body

```json
{
  "email": "admin@example.com",
  "password": "Admin123!"
}
Validation Rules
Email must be valid format
Password must:
Be at least 8 characters
Contain at least one uppercase letter
Contain at least one number
Empty fields are rejected
Invalid credentials return 401 Unauthorized
Response
{
  "access_token": "JWT_TOKEN"
}
The returned token must be included in protected requests:
Authorization: Bearer <token>
👤 Seeded Admin User
A default admin is created during seeding for testing:
Field	Value
Email	admin@example.com
Password	Admin123!
⚠️ Password is securely hashed using bcrypt.
📊 Leads Management
Endpoint
GET /api/leads
Features
Pagination
?page=1&limit=10
Filtering
Filter by any column:
?status=new
?email=test@example.com
?name=John
Sorting
?sortBy=value&order=desc
Supported sorting: any column (asc/desc)
📁 CSV Export
Endpoint
GET /api/leads/export
Protected by JWT
Applies same filtering and sorting logic
Returns downloadable CSV file
Sets proper headers:
Content-Type: text/csv
Content-Disposition: attachment
🗄 Database Models
User
id (integer)
email (unique string)
password (hashed)
createdAt (datetime)
Lead
id (integer)
name (string)
email (string)
phone (string)
status (enum: new/contacted/qualified/lost)
value (decimal)
created_at (datetime)
🌱 Seeding
The seed script:
Creates default admin (if not exists)
Inserts 15 mock leads with different statuses
Run:
npx prisma db seed
⚙️ Setup Instructions
1️⃣ Install dependencies
npm install
2️⃣ Configure .env
DATABASE_URL="your_database_url"
JWT_SECRET="your_secret_key"
3️⃣ Run migrations
npx prisma migrate dev
4️⃣ Run seed
npx prisma db seed
5️⃣ Start server
npm run start:dev
Server runs on:
http://localhost:3000
🧪 Testing Flow
Login using admin credentials
Copy JWT token
Add token in Authorization header
Access leads endpoints
Test filtering, sorting, pagination, export