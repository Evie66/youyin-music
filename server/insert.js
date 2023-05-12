const mysql = require('mysql');
const express = require('express');
const app = express();
app.listen(8080);
const pool = mysql.createPool({
  host:'127.0.0.1',
  port:'3306',
  user:'root',
  password:'',
  database: 'music',
  connectionLimit:20
});

const fs=require('fs');
const file = "./public/jj.json";
const data = fs.readFileSync(file);

const obj = JSON.parse(data);
console.log(obj.data);
for(var key of obj.data) {
  console.log(key["title"]);
  pool.query(`insert into music_list(song,singer,album,img) values(?,?,?,?)`,[key.song,key.singer,key.album,key.img]);
  console.log(key);
}

// const fs=require('fs');
// const file = "./public/hot.json";
// const data = fs.readFileSync(file);

// const obj = JSON.parse(data);
// console.log(obj.data);
// for(var key of obj.data) {
//   pool.query(`insert into music_list(song,singer,img) values(?,?,?)`,[key.song,key.singer,key.img]);
//   console.log(key);
// }