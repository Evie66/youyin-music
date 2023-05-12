var avatar = localStorage.getItem('avatar');
var uname = localStorage.getItem('uname');
var avatar_img = document.querySelector('#avatar_img')
var uname_span = document.querySelector('#uname')
// avatar_img.src = avatar;
uname_span.innerHTML = uname;