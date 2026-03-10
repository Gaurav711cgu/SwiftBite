<div align="center">

# 🍔 SwiftBite

### A Full-Stack Food Delivery Web Application

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)

**Built by [Gaurav Kumar Nayak](mailto:gaurav@swiftbite.dev)**

</div>

---

## 📌 Overview

**SwiftBite** is a production-ready, full-stack food delivery platform built with the MERN stack. It features a customer-facing storefront, a complete admin dashboard, and a secure backend API — offering an end-to-end food ordering experience with real-time order tracking and Stripe-powered payments.

---

## ✨ Features

### 🛍️ Customer App
- Browse food menu by category with animated filters
- Add/remove items with a persistent cart
- User authentication (JWT-based Register & Login)
- Stripe payment gateway integration
- Real-time order status tracking
- Fully responsive dark-mode UI

### 🛠️ Admin Dashboard
- Add, list, and delete food items with image uploads
- View and manage all incoming orders
- Update order delivery status in real-time
- Secure admin-only panel

### ⚙️ Backend API
- RESTful API built with Express.js
- MongoDB with Mongoose ODM
- JWT authentication middleware
- Multer for image uploads
- Stripe webhook integration

---

## 🏗️ Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | React 18, Vite, React Router v6     |
| Styling   | Custom CSS with CSS Variables       |
| Backend   | Node.js, Express.js                 |
| Database  | MongoDB Atlas, Mongoose             |
| Auth      | JSON Web Tokens (JWT)               |
| Payments  | Stripe API                          |
| Uploads   | Multer (file handling)              |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Stripe account (for payments)

### 1. Clone the repo
```bash
git clone https://github.com/gauravkumarnayak/swiftbite.git
cd swiftbite
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

```bash
npm run server
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### 4. Admin Panel Setup
```bash
cd admin
npm install
npm run dev
```

---

## 📁 Project Structure

```
swiftbite/
├── backend/
│   ├── config/         # Database connection
│   ├── controllers/    # Business logic (food, cart, order, user)
│   ├── middleware/     # JWT auth middleware
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API route definitions
│   └── server.js       # Entry point
├── frontend/
│   └── src/
│       ├── components/ # Reusable UI components
│       ├── pages/      # Route-level pages
│       └── Context/    # Global state (React Context)
└── admin/
    └── src/
        ├── components/ # Admin UI components
        └── pages/      # Admin pages (Add, List, Orders)
```

---

## 🌐 API Endpoints

| Method | Endpoint              | Description              |
|--------|-----------------------|--------------------------|
| POST   | /api/user/register    | Register a new user      |
| POST   | /api/user/login       | Login user               |
| GET    | /api/food/list        | Get all food items       |
| POST   | /api/food/add         | Add new food (admin)     |
| DELETE | /api/food/remove      | Remove food (admin)      |
| POST   | /api/cart/add         | Add item to cart         |
| POST   | /api/cart/remove      | Remove item from cart    |
| GET    | /api/cart/get         | Get user cart            |
| POST   | /api/order/place      | Place an order (Stripe)  |
| POST   | /api/order/verify     | Verify Stripe payment    |
| GET    | /api/order/userorders | Get user's orders        |
| GET    | /api/order/list       | Get all orders (admin)   |
| POST   | /api/order/status     | Update order status      |

---

## 👤 Author

**Gaurav Kumar Nayak**
- 📧 gaurav@swiftbite.dev
- 💼 Web Developer | MERN Stack

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  <strong>⭐ If you found this useful, please give it a star!</strong>
</div>
