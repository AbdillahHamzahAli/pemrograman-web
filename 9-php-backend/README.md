# Aplikasi Pendaftaran Siswa Baru (PHP & MySQL)

Aplikasi CRUD sederhana untuk pendaftaran siswa baru. Dibuat dengan PHP prosedural dan MySQL/MariaDB.

## Fitur
- **Create**: Form pendaftaran siswa baru (`form-daftar.php` → `proses-pendaftaran.php`).
- **Read**: Daftar seluruh siswa yang sudah mendaftar (`list-siswa.php`).
- **Update**: Edit data siswa (`form-edit.php` → `proses-edit.php`).
- **Delete**: Hapus data siswa (`hapus.php`).

## Kebutuhan
- **PHP** 7.x+ (Laragon/XAMPP/WAMP)
- **MySQL/MariaDB**
- Web server lokal (mis. Apache bawaan Laragon/XAMPP)

## Konfigurasi
Atur koneksi database di `config.php`:
```php
$server = "localhost";
$user = "root";
$password = "";
$nama_database = "pendaftaran_siswa";
```

## Setup Database
1. Buat database dan tabel (jalankan SQL di bawah pada phpMyAdmin atau MySQL client):
```sql
CREATE DATABASE IF NOT EXISTS pendaftaran_siswa;
USE pendaftaran_siswa;

CREATE TABLE IF NOT EXISTS calon_siswa (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nama VARCHAR(64) NOT NULL,
  alamat TEXT NOT NULL,
  jenis_kelamin ENUM('laki-laki','perempuan') NOT NULL,
  agama VARCHAR(16) NOT NULL,
  sekolah_asal VARCHAR(64) NOT NULL
);
```
2. Pastikan kredensial di `config.php` sesuai dengan server lokal Anda.

## Cara Menjalankan
1. Salin folder ini ke direktori web server Anda, contoh Laragon: `c:/laragon/www/9-php-backend/`.
2. Nyalakan Apache dan MySQL.
3. Akses di browser: `http://localhost/9-php-backend/`.
4. Gunakan menu:
   - **Daftar Baru**: tambah data siswa.
   - **Pendaftar**: lihat, edit, hapus data.

## Struktur Berkas
- `index.php` — Halaman beranda + menu.
- `config.php` — Koneksi database.
- `form-daftar.php` — Form tambah data.
- `proses-pendaftaran.php` — Proses simpan data baru.
- `list-siswa.php` — Daftar siswa.
- `form-edit.php` — Form edit data.
- `proses-edit.php` — Proses update data.
- `hapus.php` — Hapus data.

## Catatan
- Contoh ini ditujukan untuk pembelajaran. Belum ada validasi input, proteksi CSRF, maupun prepared statements (rentan SQL Injection). Gunakan prepared statements (mysqli/PDO), validasi, dan sanitasi input untuk produksi.
