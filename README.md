# Unofficial Instagram API Wrapper

Unofficial Instagram API Wrapper merupakan Node.js Package yang memudahkan developer untuk mengkonsumsi API dari [Instagram](https://instagram.com).

# Daftar Isi
+ [Instalasi](https://github.com/dionarya23/instagram-apiwrapper-nodejs#instalasi)
+ [Penggunaan](https://github.com/dionarya23/instagram-apiwrapper-nodejs#penggunaan)
+ [Perhatian](https://github.com/dionarya23/instagram-apiwrapper-nodejs#perhatian)

# Instalasi
## Prasyarat
+ Dibutuhkan node js versi >= 12

## Cara Install
Penggunaan Package Unofficial Instagram API Wrapper membutuhkan NPM. Pada dasarnya NPM telah terinstal dengan Node.js sejak node versi 0.8.x karena itu Anda mungkin sudah memilikinya.

Selain NPM Anda juga bisa menggunakan yarn, jika anda belum familiar dengan yarn anda bisa membaca dokumentasi [yarn](https://classic.yarnpkg.com/en/docs)

Jalankan perintah di bawah ini pada terminal/cmd Anda untuk menginstall instagram-apiwrapper-nodejs dan menyimpannya di file package.json .
```cmd
npm install --save instagram-apiwrapper-nodejs
```

Atau jika anda menggunakan yarn
```cmd
yarn add instagram-apiwrapper-nodejs
```

# Penggunaan
### Menampilkan detail profile berdasarkan username
```javascript
var ig = require('instagram-apiwrapper-nodejs')

ig.getUserProfile('USERNAME').then(function (result){
    // Aksi ketika data user berhasil ditampilkan
}).catch(function (error){
    // Aksi ketika error terjadi
});
```

### Menampilkan posts berdasarkan hashtag
```javascript
var ig = require('instagram-apiwrapper-nodejs')

ig.getPostByHashtag('HASTAG').then(function (result){
    // Aksi ketika data post berhasil ditampilkan
}).catch(function (error){
    // Aksi ketika error terjadi
});
```

### Menampilkan posts berdasarkan location
```javascript
var ig = require('instagram-apiwrapper-nodejs')

ig.getPostByLocation('LOCATION_ID', 'SLUG').then(function (result){
    // Aksi ketika data post berhasil ditampilkan
}).catch(function (error){
    // Aksi ketika error terjadi
});
```

### Menampilkan detail post berdasarkan id post
```javascript
var ig = require('instagram-apiwrapper-nodejs')

ig.getDetailPost('ID_POST').then(function (result){
    // Aksi ketika data detail post berhasil ditampilkan
}).catch(function (error){
    // Aksi ketika error terjadi
});
```

# Perhatian
Package ini hanya mencakup http verb GET dan hanya bertujuan untuk mendapatkan data, tidak bisa digunakan pada akun instagram yang bersifat private