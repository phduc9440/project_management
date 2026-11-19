# 🛒 Project Management — E-Commerce & Real-Time Chat Platform

> A full-stack web application built with **Node.js**, **Express**, **MongoDB**, and **Socket.IO** — featuring a complete e-commerce storefront, a real-time chat system, and a powerful admin dashboard.

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Database Models](#-database-models)
- [API Routes](#-api-routes)
- [Environment Variables](#-environment-variables)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)

---

## 🌐 Overview

This project is a multi-role web platform with two distinct sides:

| Side | URL Prefix | Description |
|------|-----------|-------------|
| **Client** | `/` | Storefront for end users — browsing, cart, checkout, chat |
| **Admin** | `/admin` | Dashboard for administrators — manage products, orders, accounts, roles |

---

## ✨ Features

### 🛍️ Client Side
- **Home page** with featured products
- **Product listing & detail** pages with search and filtering
- **Shopping cart** with persistent cookie-based session
- **Checkout & order management**
- **User authentication** — register, login, logout, forgot password (via email OTP)
- **Real-time 1-on-1 chat** between registered users
- **Friend system** — send/accept friend requests, manage friend list
- **User profile** management with avatar upload

### 🔧 Admin Dashboard
- **Dashboard** overview
- **Product management** — create, edit, soft-delete, restore, change status, set position, upload thumbnail via Cloudinary, rich text description with TinyMCE
- **Product category management** — hierarchical tree structure
- **Role & permission management** — define roles with granular permissions
- **Account management** — create/edit admin accounts, assign roles
- **My Account** — admin self-profile editing
- **General settings** — website name, logo, etc.
- **Auth** — login / logout with cookie-based token

---

## 🧰 Tech Stack

| Category | Technology |
|----------|-----------|
| Runtime | Node.js |
| Framework | Express.js v4 |
| Database | MongoDB (via Mongoose v8) |
| Template Engine | Pug v3 |
| Real-time | Socket.IO v4 |
| Image Storage | Cloudinary + Multer + Streamifier |
| Email | Nodemailer |
| Rich Text Editor | TinyMCE v7 |
| Auth | Cookie-parser + Express-session + MD5 |
| Dev Tool | Nodemon |
| Utilities | Moment.js, Method-override, Express-flash, mongoose-slug-updater |

---

## 📁 Project Structure

```
project-management/
├── index.js                   # App entry point — setup Express, Socket.IO, routes
├── vercel.json                # Vercel deployment config
├── package.json
├── .env                       # Environment variables (not committed)
│
├── config/
│   ├── database.js            # MongoDB connection helper
│   └── system.js              # Global config (admin prefix path)
│
├── models/                    # Mongoose schemas
│   ├── account.model.js       # Admin accounts
│   ├── cart.model.js          # Shopping cart
│   ├── chat.model.js          # Chat messages
│   ├── forgot-password.model.js
│   ├── order.model.js
│   ├── product.model.js
│   ├── product-category.model.js
│   ├── role.model.js
│   ├── room-chat.model.js     # Chat rooms between users
│   ├── settings-general.model.js
│   └── user.model.js          # Client users
│
├── controllers/
│   ├── admin/                 # Admin controllers
│   │   ├── auth.controller.js
│   │   ├── dasboard.controller.js
│   │   ├── account.controller.js
│   │   ├── product.controller.js
│   │   ├── product-category.controller.js
│   │   ├── role.controller.js
│   │   ├── my-account.controller.js
│   │   └── setting.controller.js
│   └── client/                # Client controllers
│       ├── home.controller.js
│       ├── product.controller.js
│       ├── cart.controller.js
│       ├── checkout.controller.js
│       ├── user.controller.js
│       ├── users.controller.js
│       ├── chat.controller.js
│       ├── rooms-chat.controller.js
│       └── search.controller.js
│
├── routers/
│   ├── admin/                 # Admin route definitions
│   │   ├── index.route.js
│   │   ├── auth.route.js
│   │   ├── dasboard.route.js
│   │   ├── product.route.js
│   │   ├── products-category.route.js
│   │   ├── role.route.js
│   │   ├── accounts.route.js
│   │   ├── my-account.route.js
│   │   └── setting.route.js
│   └── client/                # Client route definitions
│       ├── index.route.js
│       ├── home.route.js
│       ├── product.route.js
│       ├── cart.route.js
│       ├── checkout.route.js
│       ├── user.route.js
│       ├── users.route.js
│       ├── chat.route.js
│       ├── rooms-chat.route.js
│       └── search.route.js
│
├── middlewares/
│   ├── admin/
│   │   ├── auth.middleware.js         # Admin auth guard (token check)
│   │   └── uploadCloud.middlewares.js # Cloudinary image upload
│   └── client/
│       ├── auth.middlerware.js        # Client auth guard
│       ├── cart.middlerware.js        # Cart ID injection
│       ├── category.middlerware.js    # Category data injection
│       ├── setting.middlerware.js     # General settings injection
│       ├── user.middlerware.js        # Logged-in user info injection
│       └── chat.middlerware.js        # Chat room data
│
├── sockets/
│   └── client/
│       ├── chat.socket.js    # Real-time message events
│       └── users.socket.js   # Online status, friend requests
│
├── helpers/                   # Utility/helper modules
│   ├── create-tree.js         # Build hierarchical category tree
│   ├── filterStatus.js        # Product status filter helper
│   ├── generate.js            # Random string / OTP generation
│   ├── pagination.js          # Pagination logic
│   ├── product.js             # Product query helpers
│   ├── products-category.js   # Category query helpers
│   ├── search.js              # Search keyword helper
│   ├── sendMail.js            # Nodemailer email sender
│   └── storageMulter.js       # Multer memory storage config
│
├── validates/                 # Input validation
│   ├── admin/
│   └── client/
│
├── views/                     # Pug templates
│   ├── admin/
│   └── client/
│
└── public/                    # Static assets (CSS, JS, images)
```

---

## 🗄️ Database Models

| Model | Collection | Description |
|-------|------------|-------------|
| `Account` | `accounts` | Admin users with role assignment and token-based auth |
| `User` | `users` | Client users with friend list, online status, and chat rooms |
| `Product` | `products` | Products with slug, stock, discount, soft-delete, and audit trail |
| `ProductCategory` | `product-categories` | Hierarchical product categories |
| `Cart` | `carts` | Shopping cart linked by cookie |
| `Order` | `orders` | Placed orders |
| `Role` | `roles` | Admin role definitions with permissions |
| `RoomChat` | `room-chats` | Private chat rooms between two users |
| `Chat` | `chats` | Individual chat messages |
| `ForgotPassword` | `forgot-passwords` | OTP tokens for password reset |
| `SettingsGeneral` | `settings-generals` | Website-wide settings |

---

## 🔀 API Routes

### Client Routes (`/`)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | Home page |
| GET | `/products` | Product listing |
| GET | `/products/:slug` | Product detail |
| GET | `/search` | Search products |
| GET/POST | `/cart` | View / add to cart |
| GET/POST | `/checkout` | Checkout |
| GET/POST | `/user/register` | User registration |
| GET/POST | `/user/login` | User login |
| GET | `/user/logout` | User logout |
| GET/POST | `/user/forgot-password` | Forgot password |
| GET/PATCH | `/user/info` | View / update profile |
| GET | `/users` | User list (auth required) |
| GET | `/chat` | Chat page (auth required) |
| GET | `/rooms-chat` | Chat rooms (auth required) |

### Admin Routes (`/admin`)

| Method | Path | Description |
|--------|------|-------------|
| GET/POST | `/admin/` | Admin login |
| GET/POST | `/admin/auth/logout` | Admin logout |
| GET | `/admin/dasboard` | Dashboard |
| GET/POST | `/admin/products` | Product list / create |
| PATCH/DELETE | `/admin/products/:id` | Update / soft-delete product |
| GET/POST | `/admin/products-category` | Category list / create |
| GET/POST | `/admin/roles` | Role list / create |
| GET/POST | `/admin/accounts` | Account list / create |
| GET/PATCH | `/admin/my-account` | View / update own profile |
| GET/PATCH | `/admin/settings` | General settings |

---

## 🧪 Tester Accounts

If you want to quickly test the application features without registering a new account, you can use the following default tester credentials:

### 🛡️ Admin Dashboard (`/admin`)
- **Email:** `admin@gmail.com`
- **Password:** `123456`
- **Role:** Super Admin (Full permissions)

### 👤 Client Storefront (`/`)
- **Email:** `test@gmail.com`
- **Password:** `123456`

> **Note:** Please do not change the passwords of these accounts so that others can continue to test the system.

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory with the following keys:

```env
# Server
PORT=3010

# MongoDB
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.xxx.mongodb.net/project-management

# Cloudinary (Image Upload)
CLOUD_NAME=your_cloud_name
CLOUD_KEY=your_api_key
CLOUD_SECRET=your_api_secret

# Email (Nodemailer — Gmail App Password)
SEND_MAIL_EMAIL=your_email@gmail.com
SEND_MAIL_PASSWORD=your_app_password
```

> **Note:** Never commit your `.env` file. It is already listed in `.gitignore`.

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18.x
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (or local MongoDB)
- A [Cloudinary](https://cloudinary.com/) account
- A Gmail account with [App Password](https://myaccount.google.com/apppasswords) enabled

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/project-management.git
cd project-management

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
# Fill in your actual values in .env

# 4. Start the development server
npm start
```

The application will be available at: **http://localhost:3010**

| Section | URL |
|---------|-----|
| Client storefront | http://localhost:3010/ |
| Admin dashboard | http://localhost:3010/admin |

---

## ☁️ Deployment

This project includes a `vercel.json` configuration for deployment on **Vercel**.

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

> Make sure to add all environment variables in your Vercel project dashboard under **Settings → Environment Variables**.

---

## 📄 License

This project is licensed under the **ISC License**.
