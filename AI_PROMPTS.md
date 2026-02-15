# AI-Assisted Development Summary



---

## 1. Database Schema Design

**Representative prompt:**  
*"I have a CRM backend. I need a Prisma schema with User and Lead models. User: id, email (unique), hashed password, createdAt. Lead: id, name, email (unique), phone, status enum (NEW, CONTACTED, QUALIFIED, LOST), value (decimal), created_at. Use PostgreSQL."*




---

## 2. Seed Script

**Representative prompt:**  
*"Create a Prisma seed script that: creates an admin user if not exists (email admin@example.com, password hashed with bcrypt), inserts 15 mock leads with different statuses, uses Prisma Client properly, avoids duplicate admin, uses async/await cleanly."*





---

## 3. Authentication Implementation

**Representative prompts:**  
- *"Generate a LoginDto for NestJS with class-validator: valid email, password min 8 chars, at least one uppercase and one number."*  
- *"Generate a login method that finds user by email, compares password with bcrypt, throws UnauthorizedException for invalid credentials, returns JWT using JwtService."*  
- *"Generate a clean JWT strategy for NestJS using passport-jwt: extract token from Authorization Bearer header, validate payload, return user object."*


---

## 4. Leads Listing (Pagination, Filtering, Sorting)

**Representative prompt:**  
*"Generate a service method for GET /api/leads that supports: pagination (page, limit), dynamic filtering by name, email, phone, status, value, dynamic sorting by any column with order asc/desc. Use Prisma findMany. Query params from a DTO. Avoid SQL injection. Clean, readable code."*



---

## 5. CSV Export

**Representative prompt:**  
*"Implement GET /api/leads/export in NestJS: protected by JWT guard, same filtering/pagination/sorting as list endpoint, convert to CSV with json2csv, set Content-Type and Content-Disposition for attachment filename leads.csv, return CSV response."*





---


