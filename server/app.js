const  songRouter = require('./routes/song');
const userRouter = require('./routes/user');
const albumRouter = require('./routes/album');
const express = require('express');
const cors = require('cors');
const app = express();
app.listen(3030,()=>{
  var day = new Date();
  console.log('启动成功'+day.toLocaleString());
});

app.use( express.urlencoded({
  extended: true
}) );

app.use(cors({
  origin: ['http://localhost:8080', 'http://127.0.0.1:8080']
}));

app.use('/song',songRouter);
app.use('/user', userRouter);
app.use('/album', albumRouter);

app.use( express.static('./public') );
app.use( express.static('./public') );

app.use((err,req,res,next)=>{
  res.status(500).send({"code":500,"msg":"服务器端错误"});
});