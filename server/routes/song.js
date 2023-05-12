const pool = require('../pool');
const express = require('express');
const router = express.Router();

// 好歌推荐
router.get('/recommend',(req,res,next)=>{
  pool.query('select * from music_list where label like ?',['%recommend%'],(err,data)=> {
    if(err) {
      next(err)
      return;
    }
    res.send({"code":200,"msg":"获取成功","data":data});
  })
})

// 新歌榜
router.get('/newsong',(req,res,next)=>{
  pool.query('select * from music_list where label like ?',['%new%'],(err,data)=> {
    if(err) {
      next(err)
      return;
    }
    res.send({"code":200,"msg":"获取成功","data":data});
  })
})

// 热歌榜
router.get('/hotsong',(req,res,next)=>{
  pool.query('select * from music_list where label like ?',['%hot%'],(err,data)=> {
    if(err) {
      next(err)
      return;
    }
    res.send({"code":200,"msg":"获取成功","data":data});
  })
})

// 飙升榜
router.get('/surgesong',(req,res,next)=>{
  pool.query('select * from music_list where label like ?',['%surge%'],(err,data)=> {
    if(err) {
      next(err)
      return;
    }
    res.send({"code":200,"msg":"获取成功","data":data});
  })
})

// 搜索歌曲
router.get('/search',(req,res,next)=>{
  let obj = req.query;
  console.log(obj);
  let keyword = `%${obj.keyword}%`;
  pool.query('select * from music_list where song like ? or singer like ?',[keyword,keyword],(err,data)=> {
    if(err) {
      next(err)
      return;
    }
    res.send({"code":200,"msg":"获取成功","data":data});
  })
})

// 播放歌曲
router.get('/player',(req,res,next)=>{
  let obj = req.query;
  console.log(obj);
  pool.query('select * from music_list where sid = ?',[obj.sid],(err,data)=> {
    if(err) {
      next(err)
      return;
    }
    res.send({"code":200,"msg":"获取成功","data":data});
  })
})

module.exports = router;