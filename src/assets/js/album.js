var albumlist = document.querySelector('#albumlist');
function ajax() {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200) {
      var result = JSON.parse(xhr.responseText);
      var data = result.data;
      console.log(result);
      albumlist.innerHTML = showAlbumList(data);
    }
  }
  xhr.open('GET','/album/list',true);
  xhr.send();
}
ajax();
// 渲染专辑数据
function showAlbumList(data) {
  var html = '';
  for(let i = 0;i<data.length;i++) {
    html += `
      <div class="item col-6 col-md-6 col-lg-4 col-xl-3">
        <div class="wrap" album="${data[i].album}">
          <a href="#" class="d-block pic">
            <span class="cd"></span>
            <div class="box">
              <span class="play"></span>
              <img src="${data[i].img}" alt="">
            </div>
          </a>
          <div class="album-name">
            <a href="#">${data[i].album}</a>
            <a href="#">${data[i].singer}</a>
          </div>
        </div>
      </div>`
  }
  return html;
}
setTimeout(() => {
  var albums = document.querySelectorAll('#albumlist .wrap');
  console.log(albums);
  albums.forEach(item => {
    item.onclick = function () {
      var album = this.attributes.album.nodeValue;
      console.log(album);
      localStorage.setItem('album', album);
      window.location.href = './albumdetail.html';
    }
  })
}, 200);