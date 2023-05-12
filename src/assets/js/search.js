let uid = localStorage.getItem('uid')
let id =  JSON.parse(localStorage.getItem('id'))
if(!id) id = [];
let arrMusicJson = JSON.parse(localStorage.getItem('songInfo'))
if(!arrMusicJson) arrMusicJson = [];
let music = document.querySelector('#music');
  // 获取搜索的关键词
  var keyword = localStorage.getItem('keyword');
  console.log(keyword);
  let searchlist = document.querySelector('#result-list');
  let search_input = document.querySelector('#search-input');
  // 把关键词添加到搜索框
  search_input.value = keyword;

  search_input.addEventListener('keyup',function(e) {
    if(e.keyCode==13) {
      keyword = search_input.value;
      search_nav();
    }
  })
  
  // 搜索
  function search_nav() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 200) {
        var result = JSON.parse(xhr.responseText);
        var data = result.data;
        console.log(result);
        searchlist.innerHTML = showSearchList(data);
        console.log(111);
      }
    }
    xhr.open('GET',`/song/search?keyword=${keyword}`,true);
    xhr.send();
  }
  search_nav();

  // 渲染搜索到的歌曲数据
  function showSearchList(data) {
    var html = '';
    for(let i = 0;i<data.length;i++) {
      html += `<tr id="${data[i].sid}">
        <td class="pl-3 pr-2">${i<9? '0'+(i+1) : i+1}</td>
        <td>
          <p class="mb-0"><a href="#" class="song" one-link-mark="yes">${data[i].song}</a></p>
        </td>
        <td>
          <p class="mb-0"><a href="#" class="singer" one-link-mark="yes">${data[i].singer}</a></p>
        </td>
        <td class="album">《${data[i].album}》</td>
        <td><div class="add"><div class="icon cur" id=${data[i].sid}></div></div></td>
      </tr>`
    }
    return html;
  }
  // let arrMusicJson = localStorage.getItem('songInfo') != "[]" && localStorage.getItem('songInfo') ? JSON.parse(localStorage.getItem('songInfo')) : 0
  // let userInfo = localStorage.getItem('songInfo') != "[]" && localStorage.getItem('songInfo') ? JSON.parse(localStorage.getItem('songInfo')) : 0
  // let id = localStorage.getItem('id') != "[]" && localStorage.getItem('id') ? JSON.parse(localStorage.getItem('id')) : []
  // 点击歌曲播放对应音乐
  setTimeout(() => {
    var plays = document.querySelectorAll('#result-list tr');
    console.dir(plays);
    plays.forEach(item => {
      item.onclick = function() {
        console.log(this.id);
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
          if(xhr.readyState == 4 && xhr.status == 200) {
            var result = JSON.parse(xhr.responseText);
            console.log(result);
            var data = result.data[0];
            // 设置session
            // setSession(data);
            arrMusicJson.unshift(data);
	          localStorage.setItem('songInfo', JSON.stringify(arrMusicJson))
            // 设置音频url
            setTimeout(() => {
              console.log(data);
              play(data.url);
              // 打开播放页面
              // window.open('./player.html','_blank');
            }, 100);
          }
        }
        xhr.open('GET',`/song/search/player?sid=${this.id}`,true);
        xhr.send();
      }
    })
  }, 100);

    // 点击添加按钮添加到音乐播放列表
    setTimeout(() => {  
      var add = document.querySelectorAll('.add');
      // 为收藏按钮添加监听点击事件
      add.forEach(item => {
        var addSong = item.firstElementChild;
        item.addEventListener('click',function(e){
          console.log(addSong.id);
          // var arr ={sid: addSong.id };
          var arr = Number(addSong.id);
          // 阻止事件冒泡，防止点击删除图标跳转到歌曲播放界面
          e.stopPropagation();
          // let id = localStorage.getItem('id')
          console.log(arr);
            // id.unshift(arr)
            // localStorage.setItem('id', JSON.stringify(id))
          // let id = JSON.parse(localStorage.getItem('id'));
          // localStorage.setItem('id', JSON.stringify(arr))
          // let item = JSON.parse(localStorage.getItem('id'))
          console.log(item);
          console.log(id);
          // console.log(typeof id,id);
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200) {
              var result = JSON.parse(xhr.responseText);
              console.log(result);
              var data = result.data[0];
              arrMusicJson.unshift(data);
              localStorage.setItem('songInfo', JSON.stringify(arrMusicJson))
              // 每次点击删除都重新查询收藏歌曲列表
              // getlist();
            }
          }
          xhr.open('GET',`/song/search/player?sid=${addSong.id}`,true);
        xhr.send();
          
        })
      })
    }, 100);