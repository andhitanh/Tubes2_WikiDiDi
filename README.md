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
Program ini menggunakan Algoritma Brute Force untuk menyelesaikan persoalan pencarian optimal pola dengan nilai terbesar yang terinspirasi dari permasalahan Breach Protocol pada permainan Cyberpunk 2077. Program akan menerima masukan berupa data token, matriks dari token, ukuran buffer, sekuens, dan nilai dari tiap sekuens. Kemudian, program akan mengembalikan data pola token yang memberikan nilai reward paling optimal jika pola token paling optimal terdapat pada matriks token.

## Creator
| NIM      | Nama                    | Kelas                                                                                                                                                                                                               |
|----------|-------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| 13522035 | Melati Anggraini           | K-01                                                              |
| 13522060 | Andhita Naura Hariyanto    | K-02                                                              |
| 13522104 | Diana Tri                  | K-02                                                              |

## Features
- Menampilkan solusi Permainan WikiRace berdasarkan input data judul asal dan tujuan Wikipedia dari pengguna berdasarkan dua pilihan algoritma (BFS atau IDS)

## Requirements
Anda harus menginstall ... untuk menjalankan program ini.

## How to Run
1. Buka terminal and clone repository berikut (https://github.com/andhitanh/Tubes2_WikiDiDi.git)

2. Buka folder src dengan menjalankan command berikut pada folder utama di
```
cd src
```

3. Jalankan program utama dengan perintah berikut

```
python main.py
```

## Repository Structure
```
+---bin
|
+---doc
|       WikiDiDi.pdf
|
+---src
+----------frontend 
+----------backend 
|       main.py
|       randomize.py
|       sekuens.py
|       tokens.py
|       tree.py
|
+---test
+----------output                
|               testcase1output.txt
|               testcase2output.txt
|               testcase4output.txt
|               testcase6output.txt
|               testcase7output.txt
|       testcase1.txt
|       testcase2.txt
|       testcase3.txt
|       testcase4.txt
|       testcase5.txt
|       testcase6.txt
```