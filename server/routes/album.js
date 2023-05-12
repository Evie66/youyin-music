const pool = require('../pool');
const express = require('express');
const router = express.Router();

// 专辑页面列表
router.get('/list',(req,res,next)=> {
  let obj = req.query;
  console.log(obj);
  pool.query('select * from music_album',(err,data) => {
    if(err) {
      next(err);
      return;
    }
    res.send({"code":200,"msg":"查询成功","data":data});
  })
})

// 专辑歌曲列表
router.get('/detail',(req,res,next)=> {
  let obj = req.query;
  console.log(obj);
  pool.query('select * from music_list where album = ?',[obj.album],(err,data) => {
    if(err) {
      next(err);
      return;
    }
    res.send({"code":200,"msg":"查询成功","data":data});
  })
})

// 专辑信息
router.get('/info',(req,res,next)=> {
  let obj = req.query;
  console.log(obj);
  pool.query('select * from music_album where album = ?',[obj.album],(err,data) => {
    if(err) {
      next(err);
      return;
    }
    res.send({"code":200,"msg":"查询成功","data":data});
  })
})

module.exports = router;