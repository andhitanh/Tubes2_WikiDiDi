# Tubes2_WikiDiDi
Tugas Besar 2 IF2211 Strategi Algoritma - Pemanfaatan Algoritma IDS dan BFS dalam Permainan WikiRace

## Table of Contents
* [General Information](#general-information)
* [Creator](#creator)
* [Features](#features)
* [Requirements](#requirements)
* [How to Run](#how-to-run)
* [Repository Structure](#repository-structure)

## General Information
WikiRace atau Wiki Game adalah permainan yang melibatkan Wikipedia, sebuah ensiklopedia daring gratis yang dikelola oleh berbagai relawan di dunia, dimana pemain mulai pada suatu artikel Wikipedia dan harus menelusuri artikel-artikel lain pada Wikipedia (dengan mengeklik tautan di dalam setiap artikel) untuk menuju suatu artikel lain yang telah ditentukan sebelumnya dalam waktu paling singkat atau klik (artikel) paling sedikit. 

## Creator
| NIM      | Nama                    | Kelas                                                                                                                                                                                                               |
|----------|-------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 13522035 | Melati Anggraini           | K-01                                                              |
| 13522060 | Andhita Naura Hariyanto    | K-02                                                              |
| 13522104 | Diana Tri                  | K-02                                                              |

## Features
- Menampilkan solusi Permainan WikiRace berdasarkan input data judul asal dan tujuan Wikipedia dari pengguna berdasarkan dua pilihan algoritma (BFS atau IDS)

## Requirements
Anda harus menginstall react dan go

1. Instalasi React
Untuk menginstal React, Anda dapat menggunakan npm (Node Package Manager), yang biasanya sudah disertakan dengan instalasi Node.js. Jadi, pastikan Anda telah menginstal Node.js terlebih dahulu. Kemudian, jalankan perintah berikut di terminal atau command prompt Anda:
```
npm install react
```

2. Instalasi Go
Untuk menginstal Go, Anda dapat mengunduh installer dari situs web resmi Go (https://golang.org/dl/) sesuai dengan sistem operasi Anda. Setelah mengunduh dan menginstal Go, Anda dapat memeriksa apakah instalasi telah berhasil dengan menjalankan command go version.

## How to Run
1. Buka terminal and clone repository berikut (https://github.com/andhitanh/Tubes2_WikiDiDi.git)

2. Buka folder frontend dengan menjalankan command berikut
```
cd src/frontend
```
```
npm install 
npm run start
```
3. Buka folder backend dan jalankan command berikut

```
cd src/go-backend
```
```
go run bfsweb.go scrap.go queue.go test.go
```


## Repository Structure
```
+---doc
|       WikiDiDi.pdf
|
+---src
+----------frontend 
|       node_modules
|       public
|       src
|           assets
|           Body
|           Searchbar
|           App.css
|           App.js
|           App.test.js
|           index.css
|           index.js
|           logo.svg
|           reportWebVital.js
|           setupTest.js
|           tailwind.config.js
|       .gitignore
|       package-lock.json
|       package.json
+----------go-backend 
|       bfsweb.go
|       queue.go
|       scrap.go
|       test.go
|
+---README.md

```