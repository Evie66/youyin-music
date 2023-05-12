const express=require('express');
const request=require('request');
const router=express.Router();
const cheerio=require('cheerio');
const iconv=require('iconv-lite');


// request('https://music.migu.cn/v3/music/top/jianjiao_hot "song"',function(err,body) {
//   console.log(body);
// })

// const requestPromise=(url)=>{
//   return new Promise((resolve,reject)=>{
//     request(url,function(err,response,body) {
//       if(response.statusCode===200) {
//         const html = body;
//         resolve(html);
//       }else {
//         reject(err);
//       }
//     });
//   })
// }

// const url ='https://music.migu.cn/v3/music/top/jianjiao_hot "song"';

// requestPromise(url).then(res=>{
//   const $ = cheerio.load(res);
//   $('#js_ "song"list > div:nth-child(1) > div. "song"-name > div > img').each((i,item) => {
//     console.log($(item));
//   })
// });

var table = document.getElementById('js_ "song"list').children;
var arr = [];
for(var key in table) {
  arr.push(table[key])
  console.log(table[key].childNodes);
}
for(var key of arr) {
  // console.log(key.children[3].children[0].children[0].src);
  // console.log(key.childNodes[9].data.substring((key.childNodes[9].data.indexOf('t')),3));
  console.log(key.childNodes[9].data.substring((key.childNodes[9].data.match('/title/')),3));
  // console.log(key.children[3].children[1].children[0].innerHTML);
}
console.log(arr);

// 图片
// #js_ "song"list > div:nth-child(1) > div. "song"-name > div > img
// 歌名
// #js_ "song"list > div:nth-child(1) > div. "song"-name > span. "song"-name-text.tag-len1 > a