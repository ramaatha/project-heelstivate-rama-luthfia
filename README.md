# 👟 Heelstivate — Ecommerce Shoes App

Project Pair Phase 1 Hacktiv8 — Full Stack Web App menggunakan Node.js, Express, EJS, Sequelize, dan PostgreSQL.

---

## 📦 Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Template Engine:** EJS
- **ORM:** Sequelize
- **Database:** PostgreSQL
- **Auth:** bcryptjs + express-session
- **MVP Packages:** moment.js (format tanggal), qrcode (QR produk), chart.js (dashboard chart)

---

## 🗂️ Struktur Folder

```
heelstivate/
├── config/         → konfigurasi database
├── controllers/    → logic handler setiap route
├── helpers/        → fungsi bantu (formatRupiah, formatDate, timeAgo)
├── middlewares/    → isLoggedIn, isSeller
├── migrations/     → file migration database
├── models/         → definisi model + asosiasi Sequelize
├── public/css/     → stylesheet custom earthy theme
├── routes/         → definisi semua route
├── seeders/        → data awal database
├── views/          → halaman EJS
└── app.js          → entry point server
```

---

## ⚙️ Cara Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Sesuaikan konfigurasi database

Buka `config/config.json`, sesuaikan dengan PostgreSQL kamu:

```json
{
  "development": {
    "username": "postgres",
    "password": "postgres",
    "database": "Project-Heelstivate",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "port": 5432
  }
}
```

### 3. Buat database & jalankan migration

```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

### 4. Jalankan server

```bash
npm run dev
```

### 5. Buka browser

```
http://localhost:3000
```

---

## 🔑 Akun Default

| Role   | Email                    | Password  |
| ------ | ------------------------ | --------- |
| Seller | seller@heelstivate.com   | seller123 |
| Buyer  | buyer@heelstivate.com    | buyer123  |

---

## 🗄️ ERD

```
Users ──────────── Profiles   (One to One)
Users ──────────── Products   (One to Many, sebagai seller)
Categories ──────── Products  (One to Many)
Users ─── Carts ─── Products  (Many to Many via Carts)
```

| Tabel      | Kolom Utama |
| ---------- | ----------- |
| Users      | id, username, email, password, role, createdAt, updatedAt |
| Profiles   | id, address, phoneNumber, avatarUrl, userId (FK), createdAt, updatedAt |
| Categories | id, name, createdAt, updatedAt |
| Products   | id, name, description, price, size, stock, sold, imgUrl, userId (FK), categoryId (FK), createdAt, updatedAt |
| Carts      | id, quantity, userId (FK), productId (FK), createdAt, updatedAt |

---

## ✅ Requirement Checklist

| Requirement        | Status | Implementasi |
| ------------------ | ------ | ------------ |
| 3 jenis asosiasi   | ✅ | 1:1 (User-Profile), 1:M (User-Products, Category-Products), M:M (User-Product via Cart) |
| Static method      | ✅ | `Product.getAll()`, `Product.getById()` |
| Instance method    | ✅ | `product.formatPrice()`, `product.isBestSeller()` |
| Validasi Sequelize | ✅ | notNull, notEmpty, isEmail, isIn, len, min, isUrl |
| Custom validation  | ✅ | `shoeSizeRange` (Product.size), `priceReasonable` (Product.price), `quantityNotExceedStock` (Cart.quantity) |
| CRUD               | ✅ | Products (Seller), Cart (Buyer) |
| Hooks              | ✅ | `beforeCreate` — hash password di User model |
| Helper             | ✅ | `formatRupiah()`, `formatDate()`, `timeAgo()` |
| Promise chaining   | ✅ | `CartController.postAddToCart` |
| Eager loading      | ✅ | Cart + Product + Category, User + Profile |
| Login system       | ✅ | bcryptjs + express-session |
| Middleware         | ✅ | `isLoggedIn`, `isSeller` |
| Seeder             | ✅ | 4 Categories, 2 Users, 20 Products |
| MVP package        | ✅ | `moment` (timeAgo + formatDate), `qrcode` (QR di detail produk), `chart.js` (dashboard seller) |

---

## 🚨 Troubleshooting

**`Cannot find module`** → `npm install`

**`database does not exist`** → cek `config/config.json`, lalu `npx sequelize-cli db:create`

**`relation does not exist`** → `npx sequelize-cli db:migrate`

**`SequelizeEagerLoadingError`** → pastikan alias di `include` sesuai dengan `as:` di model

**Port 3000 sudah dipakai** → ganti port di `app.js`
