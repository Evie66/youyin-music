var uid = localStorage.getItem('uid');
var album = localStorage.getItem('album');
// 歌曲列表
var result_list = document.querySelector('#result-list');
// 专辑名
var album_h2 = document.querySelector('.album_h2');
// 歌手
var singer = document.querySelector('.singer');
// 专辑封面
var albumImg = document.querySelector('.albumImg');
// 背景图
var albuminfo = document.querySelector('.albuminfo');
// 收藏按钮
var love = document.querySelector('.love-wrap');
// 发行时间
var time = document.querySelector('.time');
// 请求专辑歌曲列表数据
function ajax() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
      var result = JSON.parse(xhr.responseText);
      var data = result.data;
      console.log(result);
      result_list.innerHTML = showAlbumSong(data)
    }
  }
  xhr.open('GET',`/album/albumdetail?album=${album}`,true);
  xhr.send();
}
ajax()
// 请求专辑信息数据
function ajax2() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
      var result = JSON.parse(xhr.responseText);
      var data = result.data;
      console.log(result);
      album_h2.innerHTML = data[0].album;
      singer.innerHTML = data[0].singer;
      albumImg.src = data[0].img;
      time.innerHTML = data[0].issue_time
      albuminfo.style.backgroundImage = `url('${data[0].img}')`
      document.querySelector('title').innerHTML = `${data[0].album} - ${data[0].singer}`;
      love.setAttribute('album',data[0].album)
      console.log(albumImg.src);
    }
  }
  xhr.open('GET',`/album/albumheader?album=${album}`,true);
  xhr.send();
}
ajax2()

// 渲染专辑歌曲数据
function showAlbumSong(data) {
  var html = '';
  for(let i = 0;i<data.length;i++) {
    html += `
      <tr id="1">
        <td class="pr-2">01</td>
        <td>
          <p class="mb-0"><a href="#" class="song" one-link-mark="yes">${data[i].song}</a></p>
        </td>
        <td>
          <p class="mb-0"><a href="#" class="singer" one-link-mark="yes">${data[i].singer}</a></p>
        </td>
        <td class="album">${data[i].album}</td>
      </tr>`
  }
  return html;
}

  var favorite = love.firstElementChild;
  // 为每个收藏图标添加点击事件，点击图标删除收藏专辑
  setTimeout(() => {  
    // 为收藏按钮添加监听点击事件
    love.addEventListener('click',function() {
      var love_album = this.getAttribute('album');
      if(uid==null) {
          location.href='./userlogin.html';
      }
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
          var result = JSON.parse(xhr.responseText);
          var data = result.data;
          // 每次点击都调用查询收藏函数查询用户是否收藏 然后更改like图标样式
          getFavAl();
          console.log(result);
          if(result.code == 200 && data.length == 0) {
              favorite.style.backgroundImage = `url('./img/love-full.png')`
          }else if(result.code == 200 && data.length == 1) {
              favorite.style.backgroundImage = `url('./img/love.png')`
          }
        }
      }
      xhr.open('POST','/user/favorite/album',true);
      xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
      xhr.send(`uid=${uid}&album=${love_album}`);
  })
  }, 100);

   // 查询专辑用户是否收藏
   var love_album = love.getAttribute('album');
   function getFavAl() {
    var uid = localStorage.getItem('uid');
    // var result_list = document.querySelector('#result-list');
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 200) {
        var result = JSON.parse(xhr.responseText);
        console.log(result);
        var data = result.data;
        // result_list.innerHTML = showFavorite(data);
        if(result.code == 200 && data.length!='') {
            favorite.style.backgroundImage = `url('./img/love-full.png')`
        } else {
            favorite.style.backgroundImage = `url('./img/love.png')`
        }
      }
    }
    xhr.open('GET',`/user/getalbumlike?uid=${uid}&album=${album}`,true);
    xhr.send();
}
getFavAl();