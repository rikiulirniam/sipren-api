# SiPren API

Backend REST API untuk aplikasi SiPren (sistem presensi siswa) berbasis Node.js, Express, dan PostgreSQL.

## Prasyarat

- Node.js dan npm
- PostgreSQL

## Instalasi

```bash
npm install
```

Buat file `.env`:

```env
HOST=http://localhost
PORT=8000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=password
DB_NAME=sipren
```

Buat database PostgreSQL, lalu import struktur tabel dari `db_sipren_pg.sql`.

## Menjalankan

```bash
npm start
```

Untuk development dengan nodemon:

```bash
npm run dev
```

API tersedia di `http://localhost:8000`.

## Seeder dan migrasi

Jika database berasal dari versi lama, jalankan migrasi presensi sekali:

```bash
npm run migrate:presensi
```

Isi data awal:

```bash
npm run seed
```

Akun pengujian lokal:

- `admin.local` / `password123`
- `guru.local` / `password123`

Endpoint autentikasi tersedia melalui `/auth`; endpoint data lainnya memerlukan token autentikasi.

