const mysql = require('mysql');
// const pool = mysql.createPool({
//   host: '192.168.0.101',
//   port: '13306',
//   user: 'music',
//   password: 'lihaoyuLHY123',
//   database: 'music',
//   connectionLimit: 15
// });

const pool = mysql.createPool({
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: '123456',
  database: 'music',
  connectionLimit: 15
});

module.exports = pool;

// const mysql=require('mysql');
// const pool=mysql.createPool({
//  host:'mfdl.i234.me',
//  port:'13306',
//  user:'8KRAW',
//  password:'lihaoyuLHY123',
//  database:'8kraw',
//  connectionLimit:20
// })
// module.exports=pool;




// 获取所有歌名歌手和封面
// var table = document.getElementById('m-table').children;
// var arr = [];
// for(var key in table) {
//   arr.push(table[key])
//   console.log(table[key][1]);
// }
// var tr = arr[1].childNodes;
// for(var key of tr) {
//   console.log({"song":key.children[2].children[1].children[2].dataset.resName,"singer":key.children[2].children[1].children[2].dataset.resAuthor,"img":key.children[2].children[1].children[2].dataset.resPic});
// }
// console.log(arr);

// var table = document.getElementById('m-table').children;
// var arr = [];
// for(var key in table) {
//   arr.push(table[key])
//   console.log(table[key][1]);
// }
// var tr = arr[1].childNodes;
// for(var key of tr) {
//   var song = key.children[2].children[1].children[2].dataset.resName;
//   var time = key.children[2].innerText
//   var songId = key.children[2].children[1].children[3].dataset.resId;
//   var singer = key.children[2].children[1].children[2].dataset.resAuthor;
//   var img = key.children[2].children[1].children[2].dataset.resPic
//   console.log({"song":song,"time":time,"songId":songId,"singer":singer,"img":img});
// }
// console.log(arr);

// 专辑
// var td = document.getElementById('box').children;
// for(var key of td) {
//   var album = key.firstElementChild.lastElementChild.firstElementChild.innerHTML;
//   var singer = key.firstElementChild.lastElementChild.lastElementChild.innerHTML;
//   var img = key.firstElementChild.children[0].children[1].children[1].getAttribute('src');
//   console.log({"singer":singer,"album":album,"img":img});
// }

// let $ = s => document.querySelector(s);

// 咪咕音乐歌曲信息
// var divs = document.querySelector('.songlist-body').children;
// for(var i = 0;i<divs.length;i++) {
//    console.log(divs[i].lastElementChild.lastElementChild.dataset.share);
// }

// var id = sessionStorage.getItem('id');
// var song = sessionStorage.getItem('song');
// var singer = sessionStorage.getItem('singer');
// var albums = sessionStorage.getItem('albums');
// var lyric = sessionStorage.getItem('lyric');
// var img = sessionStorage.getItem('img');
// var m_img = sessionStorage.getItem('m_img');
// var url = sessionStorage.getItem('url');
// $('#content-title').innerHTML = song;   //歌名
// $('#left-content').innerHTML = albums;  //专辑
// $('#right-content').innerHTML = singer; //歌手
// $('#left-img').src = `${img}?param=300y300&quality=100`;    //歌曲封面
// $('#mu-bg').src = `${m_img}?param=100y100&quality=100`;     //背景图
// $('#img-bg').style.backgroundImage = `url('${img}?param=300y300&quality=100')`;     //底部小图片
// $('#music').src = url;  //设置音乐链接