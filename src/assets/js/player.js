// 获取歌曲详情信息
// var id = localStorage.getItem('id');
// var song = localStorage.getItem('song');
// var singer = localStorage.getItem('singer');
// var album = localStorage.getItem('album');
// var lyric = localStorage.getItem('lyric');
// var img = localStorage.getItem('img');
// var m_img = localStorage.getItem('m_img');
// var url = localStorage.getItem('url');

// var arrMusicJson = JSON.parse(localStorage.getItem("songInfo"))

let index = 0, site = 0, timer = null, timerOne = null, flag = true, active = true, initLeft,muiscSite = 0,musicTime = [];
let arrMusicJson = JSON.parse(localStorage.getItem('songInfo'))
if(!arrMusicJson) {
  arrMusicJson = []
}
console.log(arrMusicJson);
let $ = s => document.querySelector(s);
// 初始化歌词滚动条
let mainBar = new ScrollBar({
    div: $('.main'),
    width:5
})
let listBar = new ScrollBar({
	div: $('.bar'),
	width: 8
})
// 获取歌曲信息函数
function getMusic() {
    moveEach(timerOne, 20)
    $('#content-title').innerHTML = arrMusicJson[0].song;   //歌名
    $('#left-content').innerHTML = arrMusicJson[0].album;  //专辑
    $('#right-content').innerHTML = arrMusicJson[0].singer; //歌手
    $('#left-img').src = `${arrMusicJson[0].img}?param=300y300&quality=100`;    //歌曲封面
    $('#mu-bg').src = `${arrMusicJson[0].img}?param=100y100&quality=100`;     //背景图
    $('#img-bg').style.backgroundImage = `url('${arrMusicJson[0].img}?param=300y300&quality=100')`;     //底部小图片
    $('#music').src = arrMusicJson[0].url;  //设置音乐链接
    // 给like-icon添加一个id
    $('.love').innerHTML = `<div class="icon" id="${arrMusicJson[0].id}"></div>`;
    // initList(songInfo[0])
  console.log(arrMusicJson[0].song);
    // 声明一个空数组保存每句歌词对应的时间
    musicTime = [];
    // 获取歌词，切割成数组
    let txt = getDecode(arrMusicJson[0].lyric).split('[');
    // console.log(txt);
    for (var i = 1; i < txt.length; i++) {
        let text = txt[i].split(']');
        let time = text[0].split(':');
        // 获取每句歌词对应的时间                  //转为数值类型
        let eachTime = Math.round(time[0] * 60 + (+time[1]))
        console.log(eachTime);
        // 把歌词显示到页面上
        $('.main-content').innerHTML += `<p>${text[1]}</p>`
        // 每句歌词对应时间添加到数组中
        musicTime.push(eachTime);
    }
    console.log(musicTime);

    // 初始化歌词滚动条
    mainBar.init()
    $('.main').children[1].style.transition = 'top .3s ease-out';
  $('#music').ontimeupdate = function () {
    //获取播放的当前时间
    var currentTime = Math.round($('#music').currentTime);
        // console.log(currentTime);
        // console.log(musicTime.includes(currentTime));
    if (musicTime.includes(currentTime)) {
      muiscSite = musicTime.findIndex(time => time === currentTime)
    }
        // 调用歌词滚动函数
    lyricsMove(muiscSite);
    //     console.log(muiscSite);
    // console.log(musicTime);
  }
}

// 调用函数获取音乐信息
getMusic();
console.log(getDecode(arrMusicJson[0].lyric));
// 播放音乐
$('#music').play();
// lyricsMove(muiscSite);

$('.play-bar').className = 'play-bar play-active';
// 点击播放按钮设置歌曲封面旋转
$('.content-left').className = 'content-left';

// 将时间转为分秒格式
function time(t) {
  if (!t) return '00:00';
  let F = parseInt(t / 60) < 10 ? parseInt(t / 60).toString().padStart(2, 0) : parseInt(t / 60);
  let M = t % 60 < 10 ? (t % 60).toString().padStart(2, 0) : t % 60;
  return F + ':' + M
}

// 底部进度条实时更新
function moveEach(ele, t) {
  clearInterval(ele)
  ele = setInterval(function () {
        // 设置已经播放的音乐进度条宽度
    $('.progress-w').style.width = ($('.progress').offsetWidth - 11) / $('#music').duration * $('#music').currentTime + 'px';
        // console.log($('.progress-w').offsetWidth);
        // 设置小圆点距离左边偏离量
    $('.progress-x').style.left = ($('.progress').offsetWidth - 11) / $('#music').duration * $('#music').currentTime + 'px';
        // 设置播放时间实时变化
    $('#content-time').innerText = time(parseInt($('#music').currentTime)) + ' / ' + time(parseInt($('#music').duration));
  }, 500)
}

// 歌词滚动
function lyricsMove(index) {
  if (index !== -1) {
    [...$('.main-content').children].map(h => h.removeAttribute("class", "action"))
    $('.main-content').children[index].setAttribute("class", "action");
    //移动歌词
    if (!active) return;
    mainBar.conMoveTarget = -(40 * (index - 4));
    let top = parseInt($('.main-content').offsetTop * (($('.main').children[1].offsetHeight - $('.main').offsetHeight) / ($('.main').offsetHeight - $('.main-content').offsetHeight)))
    //移动滚动条
    if (-top < 0) top = 0;
    if (-top > ($('.main').offsetHeight - $('.main').children[1].offsetHeight)) top = -($('.main').offsetHeight - $('.main').children[1].offsetHeight);
    mainBar.scrMoveTarget = -top;
    mainBar.updateTop()
  }

}

// 对歌词base64格式进行转码
function getDecode(str){
  return decodeURIComponent(atob(str).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

function time(t) {
  if (!t) return '00:00';
  let F = parseInt(t / 60) < 10 ? parseInt(t / 60).toString().padStart(2, 0) : parseInt(t / 60);
  let M = t % 60 < 10 ? (t % 60).toString().padStart(2, 0) : t % 60;
  return F + ':' + M
}

// 开始播放
$('.pause').onclick = function() {
    $('#music').play();
    // 切换按钮
    $('.play-bar').className = 'play-bar play-active';
    // 点击播放按钮设置歌曲封面旋转
    $('.content-left').className = 'content-left';
    // 隐藏播放按钮
    this.style.display = 'none';
    // 显示暂停按钮
    $('.play').style.display = 'inline-block';
}
// 暂停播放
$('.play').addEventListener('click',function(){
    // 暂停播放
    $('#music').pause();
    // 隐藏暂停按钮
    this.style.display='none';
    // 显示播放按钮
    $('.pause').style.display = 'inline-block';
    // 图片停止旋转
    $('.content-left').className = 'content-left left-active';
})

// 对歌词base64格式进行转码
function getDecode(str) {
    return decodeURIComponent(atob(str).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

//当歌曲播放完
let status = 0;
let posArr = ['-64px -179px', '0 -179px', '-128px -179px']
$('.icon').onclick = function () {
	status++;
	if (status > posArr.length - 1) status = 0;
	this.style.backgroundPosition = posArr[status];
}
$('#music').onended = function () {
	switch (status) {
		case 0:
			$('.next').click();
			break;
		case 1:
			$('#music').play();
			break;
		case 2:
			$('#ul-list').children[parseInt(Math.random() * arrMusicJson.length - 1)].click()
			break;
	}
}

window.addEventListener('storage',function (e) {
  console.log(JSON.parse(e.newValue));
  console.log('更新localStorage');
  // $('#content-title').innerHTML = JSON.parse(e.newValue)[0].song;
  // $('#music').src = JSON.parse(e.newValue)[0].url;
})

//打开播放列表和关闭播放列表
$('.mlist').addEventListener('click', function (e) {
	if (e.target.className == 'mlist' || e.target.className == 'icon' || e.target.className == 'num') {
		if ($('.mlist-content').style.display == 'block') {
			$('.mlist-content').style.display = 'none';
		} else {
			$('.mlist-content').style.display = 'block';
			listBar.init();
		}
	}
})

function strUrl() {
	let str = '';
	if (decodeURI($('#music').src).includes('音乐播放器')) {
		str = '.' + decodeURI($('#music').src).split('音乐播放器')[1]
	} else if (decodeURI($('#music').src).includes('http://127.0.0.1:8896/')) {
    str = './' + decodeURI($('#music').src).split('http://127.0.0.1:8896/')[1]
	}
	else {
		str = decodeURI($('#music').src);
	}
	return str;
}

function select() {
	let urlIndex = arrMusicJson.findIndex(e => e.url ===  strUrl());
	if (urlIndex == -1) return;
	for (let i = 0; i < $('#ul-list').children.length; i++) {
		$('#ul-list').children[i].children[1].className = 'nameList';
	}
	$('#ul-list').children[urlIndex].children[1].className = 'active nameList';
}

//把歌曲显示到列表中
function initList(arr) {
	$('#ul-list').innerHTML = ''
	$('.num').innerText = arrMusicJson.length;
	arr.forEach(function (ele, pos) {
		let li = document.createElement('li');
		li.innerHTML = `<span class="id">${pos + 1}</span> <span class="nameList">${ele.song} - ${ele.singer}</span> <span class="del iconfont" id=${ele.sid}></span>`;
    // console.log(ele);
		$('#ul-list').appendChild(li);
		li.onclick = function (e) {
			// if (arrMusicJson.length > 0) {
			// 	$('.hint').style.display = 'none';
			// }
			if (e.target.className !== 'del iconfont') {
				getMusic(arrMusicJson[pos])
				flag = true;
				$('#music').play();
				moveEach(timerOne, 20)
				$('.play').style.display = 'inline-block';
				$('.pause').style.display = 'none';
				for (let i = 0; i < $('#ul-list').children.length; i++) {
					$('#ul-list').children[i].children[1].className = 'nameList';
				}
				this.children[1].className = 'active nameList';
			}
			if (e.target.className === 'del iconfont') {
        // 删除播放列表对应歌曲
				arrMusicJson.splice(pos, 1)
        console.log(pos);
        console.dir(this.lastElementChild.id);
        // 重新设置播放列表信息
				localStorage.setItem('songInfo', JSON.stringify(arrMusicJson));
        // 重新加载播放列表
				initList(arrMusicJson)
				select();
				listBar.updateTop();
			}
		}
	})
}
initList(arrMusicJson)

//切换下一首歌
$('.next').onclick = function () {
	if (arrMusicJson.length < 1) return;
	//当前索引 + 1
	site = arrMusicJson.findIndex(e => {
    e.url === strUrl()
    console.log(e.url);
    console.log(strUrl());
  }) + 1;
  console.log(site);
  console.log(arrMusicJson);
	//定时器的锁
	flag = true;
	//开启定时器
	moveEach(timerOne, 20)
	if (site > arrMusicJson.length - 1) site = 0;
	//页面切换
	getMusic(arrMusicJson[site])
  // play(arrMusicJson[site].url)
	//播放
	$('#music').play();
	//切换按钮
	$('.play-bar').className = 'play-bar play-active'
	$('.content-left').className = 'content-left'
	$('.pause').style.display = 'none';
	$('.play').style.display = 'inline-block';
	//当前播放的歌曲在列表高亮
	// select();
}