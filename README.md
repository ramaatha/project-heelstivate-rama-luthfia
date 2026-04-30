# Heelstivate — Ecommerce Shoes App

Pair Project Phase 1 Hacktiv8 — Full Stack Web App menggunakan Node.js, Express, EJS, Sequelize, dan PostgreSQL.

---

## Tech Stack

| Layer | Library / Tool |
|---|---|
| Runtime | Node.js |
| Framework | Express.js v5 |
| Template Engine | EJS |
| ORM | Sequelize v6 |
| Database | PostgreSQL |
| Auth | bcryptjs + express-session |
| Date Format | moment.js |
| QR Code (MVP) | qrcode |
| Chart (MVP) | chart.js |
| CSS Framework | Bootstrap 5 |

---

## Struktur Folder

```
heelstivate/
├── config/
├── controllers/
│   ├── AuthController.js
│   ├── CartController.js
│   ├── DashboardController.js
│   ├── ProductController.js
│   └── ProfileController.js
├── data/
│   ├── categories.json
│   └── products.json
├── helpers/
│   └── helper.js
├── middlewares/
│   └── auth.js
├── migrations/
├── models/
│   ├── user.js
│   ├── product.js
│   ├── category.js
│   ├── profile.js
│   ├── cart.js
│   └── index.js
├── public/css/
│   └── main.css
├── routes/
│   └── index.js
├── seeders/
├── views/
│   ├── auth/
│   ├── cart/
│   ├── dashboard/
│   ├── partials/
│   ├── products/
│   ├── profile/
│   └── landing.ejs
└── app.js
```

---

## Cara Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Sesuaikan konfigurasi database

Buka `config/config.json`, sesuaikan dengan PostgreSQL lokal kamu:

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

### 3. Buat database & jalankan migration + seeder

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

## Akun Default (dari Seeder)

| Role   | Email                  | Password  |
|--------|------------------------|-----------|
| Seller | seller@heelstivate.com | seller123 |
| Buyer  | buyer@heelstivate.com  | buyer123  |

---

## ERD (Entity Relationship Diagram)

```
Users ─────────────── Profiles    (One to One)
Users ─────────────── Products    (One to Many — sebagai seller)
Categories ─────────── Products   (One to Many)
Users ─── Carts ─────── Products  (Many to Many via tabel Carts)
```

### Skema Tabel

| Tabel      | Kolom Utama |
|------------|-------------|
| Users      | id, username, email, password, role, createdAt, updatedAt |
| Profiles   | id, address, phoneNumber, avatarUrl, userId (FK), createdAt, updatedAt |
| Categories | id, name, createdAt, updatedAt |
| Products   | id, name, description, price, size, stock, sold, imgUrl, userId (FK), categoryId (FK), createdAt, updatedAt |
| Carts      | id, quantity, userId (FK), productId (FK), createdAt, updatedAt |

---

## Daftar Route

| Method | Path | Middleware | Handler |
|--------|------|------------|---------|
| GET | `/` | — | Landing page |
| GET | `/login` | — | `AuthController.getLogin` |
| POST | `/login` | — | `AuthController.postLogin` |
| GET | `/register` | — | `AuthController.getRegister` |
| POST | `/register` | — | `AuthController.postRegister` |
| GET | `/logout` | — | `AuthController.logout` |
| GET | `/products` | — | `ProductController.getProducts` |
| GET | `/products/add` | isLoggedIn, isSeller | `ProductController.getAddProduct` |
| POST | `/products` | isLoggedIn, isSeller | `ProductController.postAddProduct` |
| GET | `/products/:id` | — | `ProductController.getProductDetail` |
| GET | `/products/:id/edit` | isLoggedIn, isSeller | `ProductController.getEditProduct` |
| POST | `/products/:id/update` | isLoggedIn, isSeller | `ProductController.postEditProduct` |
| POST | `/products/:id/delete` | isLoggedIn, isSeller | `ProductController.postDeleteProduct` |
| GET | `/cart` | isLoggedIn | `CartController.getCart` |
| POST | `/cart/:productId` | isLoggedIn | `CartController.postAddToCart` |
| POST | `/cart/:id/delete` | isLoggedIn | `CartController.postDeleteCart` |
| GET | `/profile` | isLoggedIn | `ProfileController.getProfile` |
| POST | `/profile/update` | isLoggedIn | `ProfileController.postUpdateProfile` |
| GET | `/dashboard` | isLoggedIn, isSeller | `DashboardController.getDashboard` |

---

## Fitur per Role

### Guest (belum login)
- Lihat landing page
- Lihat daftar produk (search, sort, filter kategori, tombol Reset filter)
- Lihat detail produk
- Register & Login

### Buyer (login sebagai buyer)
- Semua fitur guest
- Pilih ukuran & masukkan produk ke keranjang
- Lihat & hapus item di keranjang
- Checkout dengan konfirmasi total pembayaran
- Edit profil (alamat, no. HP, upload foto dari device)

### Seller (login sebagai seller)
- Semua fitur guest
- Tambah, edit, hapus produk milik sendiri
- Lihat dashboard penjualan (statistik + chart)
- Edit profil

---

## Troubleshooting

**`Cannot find module`** → jalankan `npm install`

**`database does not exist`** → cek `config/config.json`, lalu jalankan `npx sequelize-cli db:create`

**`relation does not exist`** → jalankan `npx sequelize-cli db:migrate`

**`SequelizeEagerLoadingError`** → pastikan alias `as:` di `include` sama persis dengan `as:` di bagian `associate` model

**`invalid input syntax for type integer`** → jangan biarkan field harga/ukuran/stok kosong, atau pastikan controller sudah melakukan null coercion (`price !== "" ? price : null`)

**Port 3000 sudah dipakai** → ganti port di `app.js` → `app.listen(3001, ...)`
