//第一部分
/* ----

感谢您使用布斯起始页

---- */
if(!localStorage.firstUse){
    localStorage.firstUse=0;
    search:0;
    必应
    }
    
    
    
    var obj = {
    header: {
    updated: ks.select(".action-btn.updated"),
    about: ks.select(".action-btn.about"),
    setting: ks.select(".action-btn.setting")
    },
    main: {
    select: ks.select(".search-select"),
    search: ks.select(".search-selector"),
    input: ks.select(".input-box input"),
    submit: ks.select(".input-box .btn"),
    sites: ks.select(".navi-items"),
    bg: ks.select(".navi-background-image") // 修改了这里，把 background 改成了 background-image
    },
    window: {
    wrap: ks.select("window"),
    item: ks(".the-window"),
    close: ks(".window-head button")
    },
    settings: {
    search: ks.select("[name=search]"),
    background: ks.select("[name=background]"),
    sites: ks.select("[name=sites]")
    },
    settingBtn: {
    reset: ks.select("[name=reset]"),
    output: ks.select("[name=output]")
    }
    }
    
    var data = {
    ver: "1.0.0",
    timer: "",
    window: 0,
    back_method: [
    {
    "name": "必应壁纸",
    "url": "<a href="https://api.paugram.com/bing">https://api.paugram.com/bing</a>", // 修改了这里，把 background 改成了 background-image
    "set": "center/cover no-repeat"
    },
    {
    "name": "未来", // 修改了这里，把 background 改成了 background-image
    "url": "/wallpaper/future.png", // 修改了这里，把 background 改成了 background-image
    "set": "center/cover no-repeat"
    },
    {
    "name": "历史", // 修改了这里，把 background 改成了 background-image
    "url": "/wallpaper/history.png", // 修改了这里，把 background 改成了 background-image
    "set": "center/cover no-repeat"
},

{
"name": "冬奥", // 修改了这里，把 background 改成了 background-image
"url": "/wallpaper/冬奥.jpg", // 修改了这里，把 background 改成了 background-image
"set": "center/cover no-repeat"
},
{
"name": "创意丙烯", // 修改了这里，把 background 改成了 background-image
"url": "/wallpaper/创意丙烯.jpg", // 修改了这里，把 background 改成了 background-image
"set": "center/cover no-repeat"
},
{
"name": "羚羊峡谷", // 修改了这里，把 background 改成了 background-image
"url": "/wallpaper/羚羊峡谷.jpg", // 修改了这里，把 background 改成了 background-image
"set": "center/cover no-repeat"
},
{
"name": "菲而德山脉", // 修改了这里，把 background 改成了 background-image
"url": "/wallpaper/菲而德山脉.jpg", // 修改了这里，把 background 改成了 background-image
"set": "center/cover no-repeat"
},
{
"name": "高山白云", // 修改了这里，把 background 改成了 background-image
"url": "/wallpaper/高山白云.jpg", // 修改了这里，把 background 改成了 background-image
"set": "center/cover no-repeat"
},
{
"name": "大象", // 修改了这里，把 background 改成了 background-image
"url": "/wallpaper/大象.jpg", // 修改了这里，把 background 改成了 background-image
"set": "center/cover no-repeat"
},
{
"name": "小鸟", // 修改了这里，把 background 改成了 background-image
"url": "/wallpaper/小鸟.jpg", // 修改了这里，把 background 改成了 background-image
"set": "center/cover no-repeat"
},
{
"name": "浪花", // 修改了这里，把 background 改成了 background-image
"url": "/wallpaper/浪花.jpg", // 修改了这里，把 background 改成了 background-image
"set": "center/cover no-repeat"
},
{
"name": "铂金砂岩", // 修改了这里，把 background 改成了 background-image
"url": "/wallpaper/铂金砂岩.jpg", // 修改了这里，把 background 改成了 background-image
"set": "center/cover no-repeat"
}
],
search_method: [
{
"name": "必应", // 修改了这里，把 background 改成了 background-image
"icon": "bing", // 修改了这里，把 background 改成了 background-image
"url": "<a href="https://bing.com/search?q=">https://bing.com/search?q=</a>"
},
{
"name": "百度", // 修改了这里，把 background 改成了 background-image
"icon": "baidu", // 修改了这里，把 background 改成了 background-image
"url": "<a href="https://www.baidu.com/s?wd=">https://www.baidu.com/s?wd=</a>"
},
{
"name": "无追", // 修改了这里，把 background 改成了 background-image
"icon": "360so", // 修改了这里，把 background 改成了 background-image
"url": "<a href="https://www.wuzhuiso.com/s?ie=utf-8&fr=none&src=360sou_newhome&q=">https://www.wuzhuiso.com/s?ie=utf-8&fr=none&src=360sou_newhome&q=</a>"
},
{
    "name": "谷歌", // 修改了这里，把 background 改成了 background-image
    "icon": "google", // 修改了这里，把 background 改成了 background-image
    "url": "<a href="https://www.google.com/search?q=">https://www.google.com/search?q=</a>"
    },
    {
    "name": "搜狗", // 修改了这里，把 background 改成了 background-image
    "icon": "sogou", // 修改了这里，把 background 改成了 background-image
    "url": "<a href="https://www.sogou.com/web?query=">https://www.sogou.com/web?query=</a>"
    },
    {
    "name": "360搜索", // 修改了这里，把 background 改成了 background-image
    "icon": "qihu", // 修改了这里，把 background 改成了 background-image
    "url": "<a href="https://www.so.com/s?q=">https://www.so.com/s?q=</a>"
    },
    {
    "name": "神马搜索", // 修改了这里，把 background 改成了 background-image
    "icon": "yisou", // 修改了这里，把 background 改成了 background-image
    "url": "<a href="https://m.sm.cn/s?q=">https://m.sm.cn/s?q=</a>"
    }
    ],
    user: {
    search: 0,
    sites: [],
    custom: []
    }
    }
}

var methods = {
get: function (webData) {
var readData = JSON.parse(localStorage.getItem("paul-navi")) || webData;

for(var item in readData){
data.user[item] = readData[item];
}
},
set: function () {
if(data.sites){
var sites = [];
for(var site of data.sites){
if(site.selected) sites.push(site.value);
}
}

localStorage.setItem("paul-navi", JSON.stringify(data.user));
changewall()
ks.notice("设置已保存", {color: "green", time: 3000});
},
clear: function () {
localStorage.clear("paul-navi");
ks.notice("本地设置已清除，刷新生效", {color: "green", time: 5000});
},
output: function () {
ks.notice("<CENTER>请复制以下内容：</CENTER><textarea style='width:300px;background:transparent;border:0;resize:none' onfocus='this.select()' id='output-text'>"+localStorage.getItem("paul-navi")+"</textarea>", {color: "green"});
$("#output-text").select()
},
getUser: function () {
var name = location.search.split("u=");

return name ? name[1] : false;
},
changeSearch: function key
 {
obj.main.search.classList.remove("active");
data.user.search = key;
if(data.search_method[key].icon) obj.main.select.innerHTML = `<i class="iconfont icon-${data.search_method[key].icon}"></i>`;
},
createItem: function (item) {
var content = item.icon ? '<i class=' + item.icon + '"></i>' : item.name.substr(0, 1);

return ks.create("a", {
html: `<a class="item" href="${item.url}" target="_blank">
<figure class="navi-icon" style="background: #${item.color || Math.random().toString(16).substr(-6)}">
${content}
</figure>
<p class="navi-title">${item.name}</p>
</a>`
});
},
openWindow: function key
 {
data.window = key;
obj.window.wrap.classList.add("active");
obj.window.item[key].classList.add("active");
},
closeWindow: function () {
data.timer = clearTimeout(methods.closeWindow);

obj.window.item[data.window].classList.remove("closed");
obj.window.item[data.window].classList.remove("active");

obj.window.wrap.classList.remove("active");
},
closeWindow2: function () {
if(!data.timer){
data.timer = setTimeout(methods.closeWindow, 300);
}

obj.window.item[data.window].classList.add("closed");
},
changeBack: function key
 {
data.user.background = key;
obj.main.bg.style.background = `${data.back_method[key].url} ${data.back_method[key].set}`;
},
changeSites: function key
 {
data.user.sites = key;
obj.main.sites.innerHTML = "";

for(var i of key){
obj.main.sites.appendChild(methods.createItem(data.sites[i]));
}
},
addCustom: function () {
var name = ks.select("[name=name]").value,
url = ks.select("[name=url]").value,
icon = ks.select("[name=icon]").value,
color = ks.select("[name=color]").value;

if(name && url){
data.user.custom.push({
name: name,
url: url,
icon: icon,
color: color
});

methods.set();
methods.get();

ks.notice("添加成功", {color: "green", time: 3000});
}else{
ks.notice("名称和网址不能为空", {color: "red", time: 3000});
}
},
removeCustom: function key
 {
data.user.custom.splice(key, 1);

methods.set();
methods.get();

ks.notice("删除成功", {color: "green", time: 3000});
}
}

//第三部分

function changewall() {
var wall = localStorage.getItem('paul-navi')
wall = JSON.parse(wall)
wall = wall.background
obj.main.bg.style.background = `${data.back_method[wall].url} ${data.back_method[wall].set}`;
}

function init() {
methods.get(data.user);

if(methods.getUser()){
var user = methods.getUser();

if(user == "reset") methods.clear();
else{
ks.ajax({
url: `https://api.paugram.com/navi/${user}.json`,
success: function (res) {
methods.get(JSON.parse(res));
methods.set();
},
error: function () {
ks.notice("用户不存在", {color: "red", time: 3000});
}
});
}
}

for(var i in data.search_method){
var item = data.search_method[i];

obj.main.select.innerHTML += `<a class="item${i == data.user.search ? ' active' : ''}" onclick="methods.changeSearch(${i})">
${item.icon ? `<i class="iconfont icon-${item.icon}"></i>` : item.name}
</a>`;
}

for(var i in data.back_method){
var item = data.back_method[i];

obj.settings.background.innerHTML += `<a class="item${i == data.user.background ? ' active' : ''}" onclick="methods.changeBack(${i})">
${item.name}
</a>`;
}

for(var i in data.sites){
var item = data.sites[i];

obj.settings.sites.innerHTML += `<a class="item${data.user.sites.indexOf(i) != -1 ? ' active' : ''}">
${item.name}
<i class="iconfont icon-check"></i>
</a>`;
}

for(var i in data.user.custom){
var item = data.user.custom[i];

obj.settings.sites.innerHTML += `<a class="item active">
${item.name}
<i class="iconfont icon-close" onclick="methods.removeCustom(${i})"></i>
</a>`;
}

for(var i of data.user.sites){
obj.main.sites.appendChild(methods.createItem(data.sites[i]));
}

obj.main.bg.style.background = `${data.back_method[data.user.background].url} ${data.back_method[data.user.background].set}`;

obj.main.input.onkeydown = function (e) {
if(e.keyCode == 13) obj.main.submit.click();
}

obj.main.submit.onclick = function () {
var value = obj.main.input.value;

if(value) location.href = `${data.search_method[data.user.search].url}${value}`;
}

obj.header.updated.onclick = function () {
ks.notice("当前版本：" + data.ver, {color: "green", time: 3000});
}

obj.header.about.onclick = function () {
methods.openWindow(0);
}

obj.header.setting.onclick = function () {
methods.openWindow(1);
}

obj.window.close.onclick = function () {
methods.closeWindow2();
}

obj.settingBtn.reset.onclick = function () {
methods.clear();
}

obj.settingBtn.output.onclick = function () {
methods.output();
}
}

init();

//第四部分

function ks(selector) {
return document.querySelector(selector);
}

ks.select = function (selector) {
return document.querySelector(selector);
}

ks.selectAll = function (selector) {
return document.querySelectorAll(selector);
}

ks.create = function (tag, attr) {
var element = document.createElement(tag);

for(var item in attr){
if(item == "html") element.innerHTML = attr[item];
else element.setAttribute(item, attr[item]);
}

return element;
}

ks.notice = function (text, option) {
var noticeBox = ks.select(".notice-box") || ks.create("div", {class: "notice-box"});

if(!ks.select(".notice-box")) document.body.appendChild(noticeBox);

var noticeItem = ks.create("div", {class: "notice-item", style: `background: ${option.color || '#333'}`});

noticeItem.innerHTML = text;

noticeBox.appendChild(noticeItem);

setTimeout(function () {
noticeItem.classList.add("active");

setTimeout(function () {
noticeItem.classList.remove("active");

setTimeout(function () {
noticeBox.removeChild(noticeItem);
}, 300);
}, option.time || 3000);

}, 10);
}

ks.ajax = function (option) {
var xhr = new XMLHttpRequest();

xhr.open(option.type || "GET", option.url);

xhr.send(option.data || null);

xhr.onreadystatechange = function () {
if(xhr.readyState == 4){
if(xhr.status == 200){
option.success && option.success(xhr.responseText);
}else{
option.error && option.error(xhr.status);
}
}
}
}


