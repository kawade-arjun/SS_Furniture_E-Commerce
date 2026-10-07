# SS Furniture — Luxury E-Commerce & Custom Interior Showroom

[![Node.js](https://img.shields.io/badge/Node.js-v18+-68a063?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5.0+-646cff?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Express.js](https://img.shields.io/badge/Express.js-4.19-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-Cloud-47a248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![AdminJS](https://img.shields.io/badge/AdminJS-Admin_Portal-4268F6?style=for-the-badge&logoColor=white)](https://adminjs.co/)

**SS Furniture** is a full-stack, cloud-native luxury e-commerce web platform designed for bespoke solid wood furniture manufacturers and modern interior showrooms. Built with a **React + Vite** frontend and an **Express + Node.js + MongoDB Atlas** backend, it provides dynamic catalogue browsing, 3D parametric custom quote building, customer lead capture, order management, and a complete visual Admin Dashboard.

---

## 🌟 Key Features

### 🛍️ Dynamic Product Catalogue
- **Live Search & Category Filter**: Search across item titles, categories, and wood descriptions without page reloads.
- **Product Quick View**: High-resolution image showcases, dimension breakdowns, warranty details, and instant WhatsApp enquiry redirects.
- **Stock Badges & Reviews**: Highlights top-sellers, trending pieces, and star review averages.

### 📐 Parametric Custom Furniture Estimator
- **Interactive Dimension Builder**: Allows customers to choose room setups, premium wood types (Teak, Walnut, Sheesham, Oak), and upholstery fabrics (Italian Leather, Velvet, Suede).
- **Instant Cost Calculation**: Dynamically computes pricing estimates based on surface area and material rates.
- **Direct WhatsApp Quote Link**: Pre-populates custom measurements into a structured WhatsApp message for the sales team.

### 🖼️ Showroom Portfolio & Lightbox
- **Filterable Media Grid**: Organizes master craftsmanship photos by room categories (*Living, Bedroom, Dining, Office, Custom*).
- **Keyboard-Controlled Lightbox**: Full-screen modal with left/right arrow navigation and Escape-to-close functionality.

### 🛒 E-Commerce Order Lifecycle
- Supports online checkout and order placement with customer address details.
- Tracks order stages (`Pending`, `Confirmed`, `In Production`, `Out for Delivery`, `Delivered`).
- Payment method support (`Cash on Delivery`, `UPI / Online`, `Bank Transfer`).

### 🛡️ AdminJS Management Portal
- Visual back-office interface accessible at `/admin`.
- Authenticated login system for store operators.
- Full CRUD operations: manage inventory, view customer orders, approve reviews, and review custom lead inquiries without writing raw database queries.

### ☁️ 100% Cloud-Powered with MongoDB Atlas
- Replaced local storage with an encrypted, production-ready cloud database on AWS (Mumbai).
- Automated database seeding pipeline (`npm run seed`) to upload initial catalogs and showroom assets instantly.

---

## 🏗️ System Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                    React Frontend (SPA)                     │
│    Vite • Tailwind CSS • Glassmorphic UI • Port: 5173       │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP REST (/api/...)
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                 Node.js / Express Server                    │
│                     Port: 5001                              │
├──────────────────────────────┬──────────────────────────────┤
│      Public REST APIs        │      AdminJS Dashboard       │
│  (Products, Categories,      │      (/admin portal)         │
│   Orders, Leads, FAQs)       │      Role Authentication     │
└──────────────────────────────┴──────────────┬───────────────┘
                                              │ Mongoose ODM
                                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    MongoDB Atlas (Cloud)                    │
│   AWS ap-south-1 Cluster • Database: ss_furniture           │
│   Collections: products, categories, orders, inquiries...   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗄️ Database Collections ("Tables")

| Collection | Schema / Model | Description |
| :--- | :--- | :--- |
| `products` | [`Product.js`](backend/models/Product.js) | Furniture inventory, pricing, wood specs, review ratings, images |
| `categories` | [`Category.js`](backend/models/Category.js) | Dynamic room categories (Living, Beds, Dining, Modular, Office) |
| `orders` | [`Order.js`](backend/models/Order.js) | Customer orders, cart items, delivery addresses, payment status |
| `inquiries` | [`Inquiry.js`](backend/models/Inquiry.js) | General contact requests & custom quote builder measurements |
| `testimonials` | [`Testimonial.js`](backend/models/Testimonial.js) | Verified customer reviews, ratings, and homeowner quotes |
| `galleries` | [`Gallery.js`](backend/models/Gallery.js) | Showroom portfolio gallery images and room tags |
| `faqs` | [`Faq.js`](backend/models/Faq.js) | FAQ accordion questions and answers |
| `subscribers` | [`Subscriber.js`](backend/models/Subscriber.js) | Newsletter email capture leads |

---

## 📁 Directory Structure

```text
IT_Based_Skill_Enhancing/
├── backend/
│   ├── config/
│   │   └── db.js                 # Cloud MongoDB Atlas connection via Mongoose
│   ├── data/                     # Seed datasets in JSON format
│   │   ├── products.json
│   │   ├── categories.json
│   │   ├── testimonials.json
│   │   ├── gallery.json
│   │   └── faqs.json
│   ├── models/                   # Mongoose database models
│   │   ├── Product.js
│   │   ├── Category.js
│   │   ├── Order.js
│   │   ├── Testimonial.js
│   │   ├── Inquiry.js
│   │   ├── Gallery.js
│   │   ├── Faq.js
│   │   └── Subscriber.js
│   ├── scripts/
│   │   └── seed.js               # Automated cloud database populator
│   ├── .env                      # Environment variables (Atlas URI, Admin credentials)
│   ├── package.json              # Backend dependencies & scripts
│   └── server.js                 # Express server, AdminJS routes & REST API
│
├── frontend/
│   ├── src/
│   │   ├── components/           # Reusable UI (Navbar, Footer, Slider, Customizer, Modals)
│   │   ├── pages/                # Route pages (Home, Products, Categories, About, Contact...)
│   │   ├── App.jsx               # React Router configuration
│   │   ├── main.jsx              # Entry point
│   │   └── index.css             # Tailwind utilities & custom glassmorphism styles
│   ├── index.html
│   ├── vite.config.js            # Vite bundler & API proxy configuration
│   └── package.json
│
├── package.json                  # Root runner script (concurrent frontend + backend)
└── README.md
```

---

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- An active [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (or cloud MongoDB connection string)

---

### 1. Clone the Repository
```bash
git clone https://github.com/sabalegayatri23/IT_Based_Skill_Enhancing.git
cd IT_Based_Skill_Enhancing
```

---

### 2. Install Dependencies
Install dependencies for both root, backend, and frontend with a single command:
```bash
npm run install-all
```

---

### 3. Configure Environment Variables
Inside the `backend/` directory, create or verify the `.env` file:
```bash
# Path: backend/.env
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/ss_furniture?appName=SS-Furniture
PORT=5001

# Admin Portal Credentials
ADMIN_EMAIL=admin@ssfurniture.com
ADMIN_PASSWORD=admin123
ADMIN_COOKIE_PASSWORD=super-secret-password-must-be-long-32-chars-minimum
```

---

### 4. Seed the Cloud Database
Populate your MongoDB Atlas cloud database with the default furniture catalogue, categories, reviews, and gallery:
```bash
npm run seed --prefix backend
```
*Output:*
```text
Connecting to Cloud MongoDB...
Cloud MongoDB connected successfully.
Seeded 14 products.
Seeded 8 categories.
Seeded 6 testimonials.
Seeded 9 gallery items.
Seeded 5 FAQ questions.
Database seeding completed successfully.
```

---

### 5. Run the Full-Stack Application
Start both the Express backend and Vite React frontend concurrently:
```bash
npm run dev
```

* **Frontend**: [http://localhost:5173](http://localhost:5173)
* **Backend API**: [http://localhost:5001/api/products](http://localhost:5001/api/products)
* **Admin Dashboard**: [http://localhost:5001/admin](http://localhost:5001/admin)
  - **Email**: `admin@ssfurniture.com`
  - **Password**: `admin123`

---

## 📡 REST API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/products` | Retrieve all furniture products |
| `GET` | `/api/categories` | Retrieve all furniture categories |
| `GET` | `/api/testimonials` | Retrieve featured customer reviews |
| `POST` | `/api/testimonials` | Submit a new customer review |
| `GET` | `/api/gallery` | Retrieve showroom gallery items |
| `GET` | `/api/faqs` | Retrieve help-center FAQs |
| `POST` | `/api/inquiries` | Submit a general contact form inquiry |
| `POST` | `/api/custom-quotes`| Submit custom furniture builder specs |
| `POST` | `/api/orders` | Place a customer purchase order |
| `GET` | `/api/orders/:orderId` | Track status of an existing order |
| `POST` | `/api/newsletter` | Subscribe email to promotional newsletter |

---

## 🛠️ Tech Stack & Libraries

- **Frontend**: React 18, Vite 5, Tailwind CSS, Lucide Icons, React Router DOM v6
- **Backend**: Node.js (ES Modules), Express.js 4, Mongoose 8
- **Admin Engine**: AdminJS v7, `@adminjs/express`, `@adminjs/mongoose`
- **Database**: MongoDB Atlas (Cloud Database-as-a-Service)
- **Dev Tools**: Nodemon, Concurrently   


---

## 📄 License
This project is licensed under the [ISC License](LICENSE).
