````md
# Academic CMS – Matana Force

Academic CMS adalah aplikasi manajemen data akademik berbasis web yang dibuat menggunakan React, TypeScript, Vite, dan Tailwind CSS.

Aplikasi ini digunakan untuk mengelola data periode akademik seperti:

- Tahun Ajaran
- Semester
- Jadwal Kuliah
- Jadwal UTS & UAS
- Status Periode Akademik

---

# Teknologi yang Digunakan

- React
- TypeScript
- Vite
- Tailwind CSS
- Lucide React

---

# Fitur Aplikasi

- Menampilkan data akademik
- Menambahkan data akademik
- Edit data akademik
- Hapus data akademik
- Multi select data
- Search data
- Filter data
- Export JSON
- Print detail data
- Status management

---

# Struktur Folder Project

```bash
src/
│
├── components/
│   ├── ModalTambah.tsx
│   ├── ModalDetail.tsx
│   ├── PrintLayout.tsx
│
├── data/
│   └── academicData.json
│
├── types/
│   └── AcademicData.ts
│
├── utils/
│   └── exportToCSV.ts
│
├── App.tsx
├── main.tsx
├── App.css
└── index.css
````

---

# Cara Install dan Menjalankan Program

## 1. Install Node.js

Download dan install Node.js terlebih dahulu:

[https://nodejs.org/](https://nodejs.org/)

Disarankan menggunakan versi LTS.

Untuk mengecek apakah Node.js berhasil terinstall:

```bash
node -v
```

Untuk mengecek npm:

```bash
npm -v
```

---

## 2. Extract File Project

Extract file project `test_matanaforce.zip`.

---

## 3. Buka Project di VS Code

Buka folder project menggunakan Visual Studio Code.

---

## 4. Buka Terminal

Buka terminal di VS Code.

Shortcut:

```bash
Ctrl + `
```

---

## 5. Masuk ke Folder Project

Ketik perintah berikut:

```bash
cd test_matanaforce
```

---

## 6. Install Dependency

Jalankan perintah berikut:

```bash
npm install
```

Perintah ini akan menginstall seluruh dependency project.

---

# Dependency yang Digunakan

Berikut package utama yang digunakan pada project:

```bash
npm install react react-dom
npm install vite
npm install typescript
npm install tailwindcss
npm install lucide-react
```

---

# Cara Menjalankan Program

Setelah seluruh dependency berhasil diinstall, jalankan program dengan perintah:

```bash
npm run dev
```

---

# Membuka Aplikasi

Jika berhasil, terminal akan menampilkan link seperti:

```bash
http://localhost:5173/
```

Buka link tersebut di browser.

---

# Cara Build Project

Untuk build project production:

```bash
npm run build
```

Hasil build akan muncul pada folder:

```bash
dist/
```

---

# Cara Preview Build

Untuk menjalankan hasil build:

```bash
npm run preview
```

---

# Penjelasan Fitur

## Tambah Data

Digunakan untuk menambahkan data periode akademik baru.

Field yang tersedia:

* Kode Periode
* Tahun Ajaran
* Semester
* Nama Periode
* Nama Singkat
* Tanggal Awal Kuliah
* Tanggal Akhir Kuliah
* Jadwal UTS
* Jadwal UAS
* Status

---

## Edit Data

Digunakan untuk mengubah detail data akademik.

---

## Hapus Data

Digunakan untuk menghapus data akademik secara individual maupun multiple select.

---

## Search dan Filter

Digunakan untuk mencari dan memfilter data berdasarkan periode akademik.

---

## Export JSON

Digunakan untuk mengexport detail data akademik menjadi file JSON.

---

## Print Data

Digunakan untuk mencetak detail data akademik menggunakan layout print khusus.

---

# Status Data Akademik

| Status      | Keterangan                       |
| ----------- | -------------------------------- |
| Aktif       | Periode akademik sedang berjalan |
| Tidak Aktif | Periode akademik belum aktif     |
| Selesai     | Periode akademik telah selesai   |

---

# Struktur Tampilan

Aplikasi terdiri dari:

* Dashboard data akademik
* Modal tambah data
* Modal detail data
* Print layout data akademik

---


# Penjelasan Import

```tsx
import { useState } from "react";
````

Digunakan untuk membuat dan mengelola state pada React.

---

```tsx
import { CheckCircle, Eye, Trash2 } from "lucide-react";
```

Digunakan untuk menampilkan icon pada tombol aksi.

* `CheckCircle` → tombol ubah status
* `Eye` → tombol detail
* `Trash2` → tombol hapus

---

```tsx
import academicData from "./data/academicData.json";
```

Mengambil data awal akademik dari file JSON.

---

```tsx
import type { AcademicData } from "./types/AcademicData";
```

Mengambil interface/type data akademik untuk TypeScript.

---

```tsx
import ModalTambah from "./components/ModalTambah";
import ModalDetail from "./components/ModalDetail";
import PrintLayout from "./components/PrintLayout";
```

Mengimpor component terpisah yang digunakan pada aplikasi.

* `ModalTambah` → form tambah data
* `ModalDetail` → detail data akademik
* `PrintLayout` → layout khusus print

---

# Penjelasan EMPTY_FORM

```tsx
const EMPTY_FORM: Omit<AcademicData, "id">
```

Digunakan untuk membuat template data kosong saat menambahkan data baru.

Function `Omit` digunakan untuk menghilangkan field `id` karena id dibuat otomatis menggunakan:

```tsx
Date.now()
```

---

# Penjelasan State

## Data Akademik

```tsx
const [data, setData]
```

Menyimpan seluruh data akademik.

---

## Search Filter

```tsx
const [filter, setFilter]
```

Digunakan untuk mencari data berdasarkan nama periode.

---

## Multi Select

```tsx
const [selectedRows, setSelectedRows]
```

Digunakan untuk menyimpan data yang dipilih menggunakan checkbox.

---

## Filter Periode

```tsx
const [selectedPeriode, setSelectedPeriode]
```

Digunakan untuk filter berdasarkan nama periode.

---

## Modal Tambah

```tsx
const [isOpen, setIsOpen]
```

Mengontrol apakah modal tambah data ditampilkan atau tidak.

---

## Detail Data

```tsx
const [selectedDetail, setSelectedDetail]
```

Menyimpan data detail yang dipilih user.

---

## Form Data

```tsx
const [form, setForm]
```

Menyimpan data input form tambah akademik.

---

# Penjelasan Filter Data

```tsx
const filteredData = data.filter(...)
```

Digunakan untuk:

* melakukan search data
* melakukan filter periode

Data hanya ditampilkan jika:

* nama periode sesuai pencarian
* sesuai filter periode

---

# Penjelasan Function

## handleAdd()

```tsx
const handleAdd = ()
```

Function untuk menambahkan data baru ke tabel akademik.

Langkah yang dilakukan:

1. Menambahkan data baru ke array
2. Membuat id otomatis menggunakan `Date.now()`
3. Menutup modal tambah
4. Reset form menjadi kosong

---

## toggleStatus()

```tsx
const toggleStatus = (id: number)
```

Digunakan untuk mengubah status data akademik.

Perubahan status:

| Dari        | Menjadi |
| ----------- | ------- |
| Tidak Aktif | Aktif   |
| Aktif       | Selesai |

---

## deleteData()

```tsx
const deleteData = (id: number)
```

Digunakan untuk menghapus satu data akademik berdasarkan id.

---

## deleteSelected()

```tsx
const deleteSelected = ()
```

Digunakan untuk menghapus banyak data sekaligus berdasarkan checkbox yang dipilih.

---

## toggleSelect()

```tsx
const toggleSelect = (id: number)
```

Digunakan untuk memilih atau membatalkan pilihan checkbox.

---

## toggleSelectAll()

```tsx
const toggleSelectAll = ()
```

Digunakan untuk memilih seluruh data pada tabel.

---

# Penjelasan Tampilan Utama

Program memiliki beberapa bagian utama:

---

## Header

```tsx
<h1>Academic CMS</h1>
```

Menampilkan judul aplikasi.

---

## Toolbar

Toolbar berisi:

* Tombol tambah data
* Tombol hapus data
* Search input
* Dropdown filter

---

## Tabel Data Akademik

Tabel digunakan untuk menampilkan seluruh data akademik.

Kolom tabel:

* Kode
* Periode
* Tanggal mulai
* Tanggal akhir
* UTS
* UAS
* Status
* Aksi

---

# Penjelasan Tombol Aksi

## Tombol Status

```tsx
<CheckCircle />
```

Digunakan untuk mengubah status akademik.

---

## Tombol Detail

```tsx
<Eye />
```

Digunakan untuk membuka detail data akademik.

---

## Tombol Hapus

```tsx
<Trash2 />
```

Digunakan untuk menghapus data akademik.

---

# Penjelasan ModalTambah

```tsx
<ModalTambah />
```

Component popup untuk menambahkan data baru.

Props yang dikirim:

* form
* setForm
* onSave
* onClose

---

# Penjelasan ModalDetail

```tsx
<ModalDetail />
```

Component popup untuk melihat dan mengedit detail data akademik.

Props yang dikirim:

* data
* selectedDetail
* setData
* setSelectedDetail

---

# Penjelasan PrintLayout

```tsx
<PrintLayout item={selectedDetail} />
```

Digunakan untuk menampilkan layout khusus print.

Component ini hanya muncul saat data detail dipilih.

---

# Konsep React yang Digunakan

Program ini menggunakan beberapa konsep React, yaitu:

* Component Based Architecture
* State Management menggunakan `useState`
* Conditional Rendering
* Props
* Event Handling
* Array Mapping
* Filtering Data
* Dynamic Rendering

---

# Kesimpulan

File `App.tsx` merupakan pusat utama aplikasi Academic CMS yang mengatur:

* data akademik
* interaksi user
* filter
* modal
* status data
* tampilan tabel
* print layout

Program dibuat menggunakan konsep component agar kode lebih rapi, reusable, dan mudah dikembangkan.

```
```


# Author

Nama: Hanum
Program Studi: Informatika

---

# Catatan

Jika dependency error:

```bash
npm install
```

Jika server gagal berjalan:

```bash
npm run dev
```

Jika port digunakan aplikasi lain:

```bash
npm run dev -- --host
```

```
```
