const pool=require('../pool');
const express=require('express');
const { data } = require('cheerio/lib/api/attributes');
const router=express.Router();

// 用户注册
router.post('/reg',(req,res,next)=>{
  var obj = req.body;
  console.log(obj);

  pool.query('select * from music_user where uphone=?',[obj.uphone],(err,data)=>{
    if(err) {
      next(err);
      return;
    }
    if(!obj.uphone) {
      res.send({"code":402,"msg":"手机号不能为空"});
      return;
    }
    if(!obj.uname) {
      res.send({"code":403,"msg":"昵称不能为空"});
      return;
    }
    if(!obj.upwd) {
      res.send({"code":404,"msg":"密码不能为空"});
      return;
    }
    if(!obj.reupwd) {
      res.send({"code":405,"msg":"请确认密码"});
      return;
    }
    if(obj.upwd!==obj.reupwd) {
      res.send({"code":406,"msg":"两次密码输入不一致"});
      return;
    }                                             
    if(/^1[3-9]\d{9}$/.test(obj.uphone) == false) {
      res.send({"code":407,"msg":"手机号码格式错误"});
      return;
    }
    if(data.length==0) {
      pool.query('insert into music_user set ?',[obj],(err,data)=>{
        res.send({"code":200,"msg":"注册成功","data":data});
      });
      // pool.query('INSERT INTO music_user(`uphone`,`uname`,`upwd`) VALUES ?',[obj.uphone,obj.uname,obj.upwd],(err,data)=>{
      //   res.send({"code":200,"msg":"注册成功","data":data});
      // });
    }else {
      res.send({"code":401,"msg":"注册失败"});
    }
    console.log(data);
  });
});

// 用户登录
router.post('/login',(req,res,next)=>{
  var obj = req.body;
  console.log(obj);
  pool.query('select * from music_user where uphone=? && upwd=?',[obj.uphone,obj.upwd],(err,data)=>{
    if(err) {
      next(err);
      return;
    }
    if(/^1[3-9]\d{9}$/.test(obj.uphone) == false) {
      res.send({"code":407,"msg":"手机号码格式错误"});
      return;
    }
    if(data.length==0) {
      res.send({"code":401,"msg":"登录失败"});
    }else {
      res.send({"code":200,"msg":"登录成功","data":data});
    }
  });
});

// 手机号查重
router.get('/check',(req,res,next)=>{
  var obj = req.query;
  console.log(obj);
  pool.query('select * from music_user where uphone=?',[obj.uphone],(err,data)=>{
    if(err) {
      next(err);
      return;
    }
    if(data.length==0) {
      res.send({"code":200,"msg":"手机号可以使用"});
    }else {
      res.send({"code":401,"msg":"手机号已被使用"});
    }
  });
});

// 收藏歌曲和取消收藏
router.post('/favorite',(req,res,next)=>{
  var obj = req.body;
  console.log(obj);
  var uid = obj.uid;
  var sid = obj.sid;
  console.log(uid,sid);
  var sql = 'select * from music_user_favorite inner join music_list on music_list.sid=music_user_favorite.song_id where music_user_favorite.user_id = ? and music_user_favorite.song_id = ?';
  pool.query(sql,[uid,sid],(err,data)=>{
    if(err) {
      next(err);
      return;
    }
    if(data.length == '') {
      pool.query(`insert into music_user_favorite set user_id = ?,song_id = ?`,[uid,sid],(err,data)=>{
        if(err) {
          next(err);
          return;
        }
        res.send({"code":200,"msg":"收藏成功","data":data});
      })
    } else {
      pool.query(`delete from music_user_favorite where user_id = ? and song_id = ?`,[uid,sid],(err,data)=>{
        if(err) {
          next(err);
          return;
        }
        res.send({"code":200,"msg":"取消收藏","data":data});
      })
    }
  })
})

// 获取用户收藏歌曲列表
router.get('/getfavorite',(req,res,next)=> {
  var obj = req.query;
  console.log(obj);
  let sql = `select * from music_user_favorite inner join music_list on music_list.sid=music_user_favorite.song_id where music_user_favorite.user_id = ? order by create_time desc`;
  pool.query(sql,[obj.uid],(err,data)=>{
    if(err) {
      next(err);
      return;
    }
    res.send({"code":200,"msg":"查询成功","data":data});
  })
})

// 检查歌曲是否收藏
router.get('/getlike',(req,res,next)=> {
  var obj = req.query;
  console.log(obj);
  let sql = `select * from music_user_favorite inner join music_list on music_list.sid=music_user_favorite.song_id where music_user_favorite.user_id = ? and music_user_favorite.song_id = ?`;
  pool.query(sql,[obj.uid,obj.sid],(err,data)=>{
    if(err) {
      next(err);
      return;
    }
    res.send({"code":200,"msg":"查询成功","data":data});
  })
})

// 收藏专辑和取消收藏专辑
router.post('/favorite/album',(req,res,next)=>{
  var obj = req.body;
  console.log(obj);
  var uid = obj.uid;
  var album = obj.album;
  console.log(uid,album);
  var sql = 'SELECT * FROM music_user_favorite_album WHERE user_id = ? and album = ?';
  pool.query(sql,[uid,album],(err,data)=>{
    if(err) {
      next(err);
      return;
    }
    if(data.length == '') {
      pool.query(`insert into music_user_favorite_album set user_id = ?,album = ?`,[uid,album],(err,data)=>{
        if(err) {
          next(err);
          return;
        }
        res.send({"code":200,"msg":"收藏成功","data":data});
      })
    } else {
      pool.query(`delete from music_user_favorite_album where user_id = ? and album = ?`,[uid,album],(err,data)=>{
        if(err) {
          next(err);
          return;
        }
        res.send({"code":200,"msg":"取消收藏","data":data});
      })
    }
  })
})

// 获取用户专辑是否收藏
router.get('/getalbumlike',(req,res,next)=> {
  var obj = req.query;
  console.log(obj);
  let sql = `SELECT * FROM music_user_favorite_album WHERE user_id = ? and album = ?`;
  pool.query(sql,[obj.uid,obj.album],(err,data)=>{
    if(err) {
      next(err);
      return;
    }
    res.send({"code":200,"msg":"查询成功","data":data});
  })
})

// 获取用户喜欢专辑列表
router.get('/getfavoritealbum',(req,res,next)=> {
  var obj = req.query;
  console.log(obj);
  let sql = `select * from music_user_favorite_album  where music_user_favorite_album.user_id = ? order by create_time desc`;
  pool.query(sql,[obj.uid],(err,data)=>{
    if(err) {
      next(err);
      return;
    }
    res.send({"code":200,"msg":"查询成功","data":data});
  })
})

module.exports = router;