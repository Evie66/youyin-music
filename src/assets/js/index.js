// const { default: $ } = require("swiper/shared/dom");

// 获取我的主页和退出登录按钮
var login = document.getElementById('login');
var userinfo = document.getElementsByClassName('userinfo')[0];
// 搜索框
var search_top = document.querySelector('#search');
// 搜索小图标
var search_icon = document.querySelector('#search-icon');
// audio标签
// var music = document.getElementById('music');

// 搜索歌曲
console.dir(search_top);
search_top.addEventListener('keyup', function (e) {
  let keyword = search_top.value;
  console.log(e);
  if (e.keyCode == 13) {
    localStorage.setItem('keyword', keyword);
    window.location.href = './search.html';
    console.log(keyword);
  }
})
search_icon.onclick = function () {
  let keyword = search_top.value;
  localStorage.setItem('keyword', keyword);
  window.location.href = './search.html';
  console.log(keyword);
}
// let arrMusicJson = localStorage.getItem('songInfo') != "[]" && localStorage.getItem('songInfo') ? JSON.parse(localStorage.getItem('songInfo')) : 0

// 设置session
function setSession(data) {
  var songInfo = {
    'id': `${data[0].sid}`,
    'song': `${data[0].song}`,
    'singer': `${data[0].singer}`,
    'album': `${data[0].album}`,
    'lyric': `${data[0].lyric}`,
    'img': `${data[0].img}`,
    'm_img': `${data[0].img}`,
    'url': `${data[0].url}`
  }
  localStorage.setItem("songInfo", JSON.stringify(songInfo));
  // localStorage.setItem("songInfo", JSON.stringify(arrMusicJson));
  window.localStorage.setItem('id', `${data[0].sid}`);
  // localStorage.setItem('song', `${data[0].song}`);
  // localStorage.setItem('singer', `${data[0].singer}`);
  // localStorage.setItem('album', `${data[0].album}`);
  // localStorage.setItem('lyric', `${data[0].lyric}`);
  // localStorage.setItem('img', `${data[0].img}`);
  // localStorage.setItem('m_img', `${data[0].img}`);
  // localStorage.setItem('url', `${data[0].url}`);
  // console.log(getDecode(data[0].lyric));
  console.log(window);
}

// 对歌词base64格式进行转码
function getDecode(str) {
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

// 设置音频url
function play(url) {
  console.log(url);
  // music.src = url;
  // music.play();
  // document.querySelector('#player').style.display = 'block';
  // window.location.href = './player.html';
  window.open('./player.html','_blank');
}

// 获取用户头像
function getUser() {
  var avatar = localStorage.getItem('avatar');
  if (avatar == null) {
    login.innerHTML = '登录';
    userinfo.style.display = 'none';
  } else {
    login.href = './userhome.html';
    login.innerHTML = `<img src="${avatar}" width="40px" style="border-radius:50%;">`;
    // userinfo.mouseenter.style.display = 'block';
  }
}
getUser();


// 退出登录
function logout() {
  localStorage.clear();
  location.reload();
}
$("#secondDiv").carousel("cycle");
	var pastItem;
	$("#secondDiv").on("slide.bs.carousel",function(){
	var	pastItemob=$(this).find(".item.active");
	pastItem=pastItemob.index();
	})
	
	$("#secondDiv").on("slid.bs.carousel",function(){
	 var showItem=$(this).find(".item.active");
	$(".carousel-caption")[pastItem].style.display="none";
	showItem.children(".carousel-caption").fadeIn(300);
	
	})
