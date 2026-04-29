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
├── config/           → konfigurasi database (config.json)
├── controllers/      → logic handler setiap route
│   ├── AuthController.js
│   ├── CartController.js
│   ├── DashboardController.js
│   ├── ProductController.js
│   └── ProfileController.js
├── helpers/
│   └── helper.js     → formatRupiah(), formatDate(), timeAgo()
├── middlewares/
│   └── auth.js       → isLoggedIn, isSeller
├── migrations/       → file migration database
├── models/           → definisi model + asosiasi Sequelize
│   ├── user.js
│   ├── product.js
│   ├── category.js
│   ├── profile.js
│   ├── cart.js
│   └── index.js
├── public/css/
│   └── main.css      → earthy theme custom stylesheet
├── routes/
│   └── index.js      → definisi semua route
├── seeders/          → data awal database
├── views/
│   ├── auth/         → login.ejs, register.ejs
│   ├── cart/         → index.ejs
│   ├── dashboard/    → index.ejs
│   ├── partials/     → navbar.ejs
│   ├── products/     → index.ejs, detail.ejs, add.ejs, edit.ejs
│   ├── profile/      → index.ejs
│   └── landing.ejs
└── app.js            → entry point server
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

| Role   | Email                  | Password   |
|--------|------------------------|------------|
| Seller | seller@heelstivate.com | seller123  |
| Buyer  | buyer@heelstivate.com  | buyer123   |

---

## ERD (Entity Relationship Diagram)

```
Users ─────────────── Profiles   (One to One)
Users ─────────────── Products   (One to Many — sebagai seller)
Categories ─────────── Products  (One to Many)
Users ─── Carts ─────── Products  (Many to Many via tabel Carts)
```

### Skema Tabel

| Tabel      | Kolom Utama |
|------------|-------------|
| Users      | id, username, email, password, role, createdAt, updatedAt |
| Profiles   | id, address, phoneNumber, avatarUrl, userId (FK), createdAt, updatedAt |
| Categories | id, name, createdAt, updatedAt |
| Products   | id, name, description, price, size, stock, sold, imgUrl, userId (FK), categoryId (FK), createdAt, updatedAt |
| Carts      | id, quantity, size, userId (FK), productId (FK), createdAt, updatedAt |

---

## Daftar Route

| Method | Path | Middleware | Handler |
|--------|------|-----------|---------|
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
- Lihat daftar produk (search, sort, filter kategori)
- Lihat detail produk
- Register & Login

### Buyer (login sebagai buyer)
- Semua fitur guest
- Pilih ukuran & tambah produk ke keranjang
- Lihat & hapus item di keranjang
- Checkout (konfirmasi pembayaran via alert)
- Edit profil (alamat, no. HP, avatar)

### Seller (login sebagai seller)
- Semua fitur guest
- Tambah, edit, hapus produk milik sendiri
- Lihat dashboard penjualan (chart, statistik)
- Edit profil

---

## Requirements Pointer Map

Panduan cepat untuk presentasi — tiap requirement dipetakan ke file & baris kode.

### Database

| Requirement | File | Detail |
|---|---|---|
| ERD / relasi antar tabel | `models/` (semua file) | Lihat bagian `associate` di tiap model |
| Tabel Users (email, password, role) | `models/user.js` | `User.init({ email, password, role })` |
| Asosiasi 1:1 (User–Profile) | `models/user.js` | `User.hasOne(models.Profile, { foreignKey: 'userId' })` |
| Asosiasi 1:M (User–Products) | `models/user.js` | `User.hasMany(models.Product, { foreignKey: 'userId' })` |
| Asosiasi M:M (User–Product via Cart) | `models/user.js` | `User.belongsToMany(models.Product, { through: models.Cart })` |
| Migrations | `migrations/` | 5 file migration (users, categories, products, profiles, carts) |
| Migration tambahan (FK) | `migrations/` | File migration ke-3, ke-4, ke-5 yang menambahkan FK |
| Seeders | `seeders/` | 4 Categories, 2 Users, 20 Products |

### Routes

| Requirement | File | Detail |
|---|---|---|
| Semua route | `routes/index.js` | Seluruh GET/POST route terdaftar di sini |
| Route logout | `routes/index.js` | `router.get("/logout", AuthController.logout)` |
| Middleware isLoggedIn | `middlewares/auth.js` | Fungsi `isLoggedIn` — redirect ke `/login` jika belum login |
| Middleware isSeller | `middlewares/auth.js` | Fungsi `isSeller` — redirect ke `/products` jika bukan seller |

### Aplikasi

| Requirement | File | Detail |
|---|---|---|
| Search produk | `models/product.js` | `getAll()` — `Op.iLike: '%' + search + '%'` |
| Sort produk | `models/product.js` | `getAll()` — `order` array: price_asc, price_desc, terlaris |
| Static method | `models/product.js` | `Product.getAll()` dan `Product.getById()` |
| Instance method | `models/product.js` | `product.formatPrice()` dan `product.isBestSeller()` |
| Validasi Sequelize (builtin) | `models/product.js` | `notNull, notEmpty, min, isUrl` — tiap field |
| Validasi Sequelize (custom) | `models/product.js` | `shoeSizeRange` (size), `priceReasonable` (price) |
| Validasi custom lainnya | `models/cart.js` | `quantityNotExceedStock` (quantity) |
| Validasi user | `models/user.js` | `len` (username), `isEmail` (email), `isIn` (role) |
| Tampil error validasi | `views/products/add.ejs` | Loop `errors.forEach` — tampil merah di atas form |
| Tampil error validasi register | `views/auth/register.ejs` | Loop serupa di form register |
| CRUD Products | `controllers/ProductController.js` | `getProducts, postAddProduct, postEditProduct, postDeleteProduct` |
| Hooks beforeCreate | `models/user.js` | `hooks: { beforeCreate(user) { user.password = bcrypt.hashSync(...) } }` |
| Helper functions | `helpers/helper.js` | `formatRupiah()`, `formatDate()`, `timeAgo()` |
| Promise chaining | `controllers/ProductController.js` | `postDeleteProduct` — `.then().then().catch()` |
| Eager loading | `controllers/CartController.js` | `Cart.findAll({ include: [Product → Category] })` |

### Halaman / Views

| Requirement | File | Detail |
|---|---|---|
| Landing page | `views/landing.ejs` | Halaman utama (`GET /`) |
| Halaman Register | `views/auth/register.ejs` | Form register dengan validasi error |
| Halaman Login | `views/auth/login.ejs` | Form login |
| Halaman Produk | `views/products/index.ejs` | Daftar produk + search + sort + filter |
| Halaman Detail Produk | `views/products/detail.ejs` | Detail + size picker + QR code |
| Halaman Tambah Produk | `views/products/add.ejs` | Form seller — validasi error merah |
| Halaman Edit Produk | `views/products/edit.ejs` | Form edit produk |
| Halaman Keranjang | `views/cart/index.ejs` | Cart buyer + tombol checkout |
| Halaman Dashboard | `views/dashboard/index.ejs` | Statistik seller + chart.js |
| Halaman Profil | `views/profile/index.ejs` | Edit profil user |

### Fitur Tambahan / Explore

| Requirement | File | Detail |
|---|---|---|
| Session management | `app.js` + `controllers/AuthController.js` | `express-session` setup + `req.session.userId / role` |
| bcrypt hash password | `models/user.js` | `beforeCreate` hook + `bcrypt.hashSync(user.password, 10)` |
| bcrypt compare login | `controllers/AuthController.js` | `bcrypt.compareSync(password, user.password)` |
| MVP — QR Code | `controllers/ProductController.js` | `QRCode.toDataURL(productUrl)` di `getProductDetail` |
| MVP — QR Code tampil | `views/products/detail.ejs` | `<img src="<%= qrCode %>">` |
| MVP — moment.js | `helpers/helper.js` | `formatDate()` dan `timeAgo()` menggunakan `moment` |
| MVP — chart.js | `views/dashboard/index.ejs` | `new Chart(ctx, { type: 'bar', ... })` |

---

## Requirement Checklist

| # | Requirement | Status | Lokasi |
|---|---|---|---|
| 1 | Minimal 3 jenis asosiasi (1:1, 1:M, M:M) | ✅ | `models/user.js` |
| 2 | Static method di model | ✅ | `models/product.js` — `getAll`, `getById` |
| 3 | Instance method di model | ✅ | `models/product.js` — `formatPrice`, `isBestSeller` |
| 4 | Validasi Sequelize (builtin + custom) | ✅ | `models/product.js`, `models/user.js`, `models/cart.js` |
| 5 | CRUD lengkap | ✅ | `controllers/ProductController.js` |
| 6 | Hooks | ✅ | `models/user.js` — `beforeCreate` hash password |
| 7 | Helper function | ✅ | `helpers/helper.js` |
| 8 | Promise chaining | ✅ | `controllers/ProductController.js` — `postDeleteProduct` |
| 9 | Eager loading | ✅ | `controllers/CartController.js` — `getCart` |
| 10 | Login + session | ✅ | `controllers/AuthController.js` |
| 11 | Middleware (isLoggedIn, isSeller) | ✅ | `middlewares/auth.js` |
| 12 | Seeder | ✅ | `seeders/` — Categories, Users, Products |
| 13 | MVP package (min. 1) | ✅ | `qrcode`, `moment`, `chart.js` |
| 14 | Landing page | ✅ | `views/landing.ejs` |
| 15 | Halaman Register & Login | ✅ | `views/auth/` |

---

## Troubleshooting

**`Cannot find module`** → jalankan `npm install`

**`database does not exist`** → cek `config/config.json`, lalu jalankan `npx sequelize-cli db:create`

**`relation does not exist`** → jalankan `npx sequelize-cli db:migrate`

**`SequelizeEagerLoadingError`** → pastikan alias `as:` di `include` sama persis dengan yang di `associate` model

**Port 3000 sudah dipakai** → ganti port di `app.js` → `app.listen(3001, ...)`
