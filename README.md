# 🎟️ Book My Ticket – Backend System

A simplified backend system for a movie ticket booking platform built using **Node.js, Express, PostgreSQL, and Docker**.

This project demonstrates how to extend an existing codebase by adding **authentication**, **protected routes**, and **safe seat booking logic**.

---

## 🚀 Features

* ✅ User Registration & Login
* 🔐 JWT-based Authentication
* 🛡️ Protected Routes
* 💺 Seat Booking System
* 🔄 Transaction-safe Booking (Prevents double booking)
* 🐳 PostgreSQL running via Docker
* 🔑 Password hashing using bcrypt

---

## 🧱 Tech Stack

* **Backend:** Node.js, Express
* **Database:** PostgreSQL
* **ORM/Driver:** pg
* **Authentication:** JWT
* **Hashing:** bcrypt
* **Containerization:** Docker

---

## 📂 Project Structure

```
book-my-ticket/
│
├── module/
│   └── auth/
|   |   ├── dto/
|   |   |    ├── register.dto.js
│   │   |    └── login.dto.js
│   |   ├── auth.controller.js
│   |   ├── auth.service.js
│   |   ├── auth.repository.js
│   |   ├── auth.middleware.js
│
├── common/
│   ├── entities/
│   │   ├── User.entity.js
│   │   └── Seats.entity.js
│   ├── utils/
|   |    ├── api-error.js
|   |    ├── api-response.entity.js
│   │    └── jwt.utils.js
|   |
│   └── middleware/
|   |    ├── globalError.middleware.js
│   │    └── validate.middleware.js
|   ├── dto/
│   │   └── base.dto.js
│
├── index.mjs
├── docker-compose.yml
└── package.json
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/book-my-ticket.git
cd book-my-ticket
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Start PostgreSQL using Docker

```bash
docker compose up -d
```

---

### 4️⃣ Run Server

```bash
node index.mjs
```

Server will start on:

```
http://localhost:8080
```

---

## 🗄️ Database Schema

### Users Table

```sql
id SERIAL PRIMARY KEY
name VARCHAR
email VARCHAR UNIQUE
password VARCHAR
refresh_token TEXT
```

---

### Seats Table

```sql
id SERIAL PRIMARY KEY
isbooked INT DEFAULT 0
name VARCHAR
user_id INT REFERENCES users(id)
```

---

## 🔐 Authentication Flow

1. User registers
2. Password is hashed using bcrypt
3. User logs in
4. JWT access + refresh tokens are generated
5. Middleware verifies token and attaches user to request

---

## 🔒 Protected Routes

| Route        | Method | Description                   |
| ------------ | ------ | ----------------------------- |
| `/seats`     | GET    | Get all seats (requires auth) |
| `/:id/:name` | PUT    | Book a seat (requires auth)   |

---

## 💺 Booking Logic

* Uses **database transactions**
* Uses **row-level locking (`FOR UPDATE`)**
* Prevents duplicate bookings
* Associates seat with authenticated user

---

## 🧪 API Testing Flow

### 1️⃣ Register

```http
POST /api/auth/register
```

```json
{
  "name": "Hrishikesh",
  "email": "test@example.com",
  "password": "123456"
}
```

---

### 2️⃣ Login

```http
POST /api/auth/login
```

Response:

```json
{
  "accessToken": "..."
}
```

---

### 3️⃣ Get Seats

```http
GET /seats
Authorization: Bearer <token>
```

---

### 4️⃣ Book Seat

```http
PUT /1/test
Authorization: Bearer <token>
```

---

## 🧠 Key Concepts Implemented

* Authentication middleware
* JWT token handling
* Secure password storage
* SQL transactions
* Row locking for concurrency
* Separation of concerns (controller → service → repository)

---

## ⚠️ Notes

* Existing endpoints were **not modified** as per assignment rules
* Booking internally uses `user_id` even though route includes `name`
* Designed to simulate real-world backend extension

---

## 🚀 Future Improvements

* 🎬 Add movies & showtimes
* 📦 Create bookings table
* ❌ Cancel booking
* 👥 Multiple seat booking
* 🌐 Add frontend

---

## 👨‍💻 Author

Hrishikesh Shanbhag

---

## ⭐ Conclusion

This project demonstrates a real-world backend workflow involving authentication, database transactions, and concurrency handling, built by extending an existing system.

---
