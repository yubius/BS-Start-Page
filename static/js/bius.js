//© SimSoft
//本代码由SimSoft与Yubius开发，并非开源项目，如有抄袭，必究责任！

//加载功能
window.onload=pconsole();loadset();showtime();loadcolor();loadhello();loadblur();loadbgmask();getsync();loadproso();$(".preload-hide").attr("style","opacity:1;transition:all .5s")
$(document).ready(function(){}).keydown(function (e) {//监听ESC关闭任何东西
  if (e.which === 27){
    closeset();
    stopsearch()
  }
});
function pconsole(){//打印控制台
  console.clear()
  console.log("%cSim%cSoft%c丨%c布斯起始页","color:#ff7f27;font-weight:bold;font-size:2em;font-family:微软雅黑","color:#34a8ff;font-size:2em;font-family:微软雅黑","font-size:2em;font-family:微软雅黑","color:#2f88ff;font-size:2em;font-family:微软雅黑")
  console.log("%c⚠️⚠️警告⚠️⚠️%c请不要在此控制台执行任何代码，除非我们的开发团队要求您这样做。否则由此引起的账号被盗、数据丢失等不可挽回的后果，布斯起始页不负任何责任。","color:red;font-weight:bold;font-size:1.5em","color:black;font-size:1.5em;font-family:微软雅黑")
}
function cset(key,val){//设置设定项
  osetval=localStorage.getItem("Bius_Set")
  oset=JSON.parse(osetval);
  oset[key]=val;
  nset=JSON.stringify(oset)
  localStorage.setItem("Bius_Set",nset)
}
function gset(key){//读取设定项
  osetval=localStorage.getItem("Bius_Set")
  oset=JSON.parse(osetval);
  return oset[key]
}
function setsync(){//云服务上传
  if(gset("sync")!="off"){
    $.ajax({
      type:"post",
      url:"/sync/upload-basic.php",
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      data:{data:localStorage.getItem("Bius_Set")},
    })
  }
}
function getsync(){//云服务下载
  $.ajax({
    type:"get",
    url:"/sync/account.php",
    xhrFields: {
      withCredentials: true
    },
    crossDomain: true,
	success:function (data){
	  $(".logincard").html(data)
      if(data=="<span style='font-size:1.5em'>您还未登录</span><br><span class='lnotice'>一键登录，多端同步></span>"){
        sayhello();
        $("#syncs").attr("class","set off");
        $("#syncs").attr("style","opacity:0.5");
        $("#syncs").attr("onclick","notice('您还未登录，请登录后启用同步')")
        $("#logout").hide()
      }
      else{$("#loginfaq").hide();sayhellolog();}
    }
  })
  if(gset("sync")!="off"){
    $("#syncs").attr("class","set on");    
    $.ajax({
      type:"get",
      url:"/sync/down-basic.php",
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
	  success:function (data){
      	if(data!="1000"){
          var oset=localStorage.getItem("Bius_Set");
          if(data!=localStorage.getItem("Bius_Set")){
          	localStorage.setItem("Bius_Set",data)
            notice("云端数据已同步，请刷新页面使全部设置生效")
            try{JSON.parse(data);}catch(err){notice("同步数据时出现问题。请向我们反馈以下信息：<br>"+err);localStorage.setItem("Bius_Set",oset)}
          }
        }
      }
    })
  }else{$("#syncs").attr("class","set off");}
  $.ajax({
    type:"get",
    url:"/sync/notice.php",
	success:function (data){
	  if(data!="1000"){
      	$(".publicnotice").attr("style","bottom:0")
        $(".publicnotice #n-txt").html(data)
      }
    }
  })
}
function notice(txt){//消息框
  $(".notice").css("top","-100px")
  try{clearTimeout(ntc)}catch(e){}
  setTimeout(function(){
	$(".notice").css("top","7px")
    $(".notice").html(txt)
  },200)
  setTimeout(function(){
	$(".notice").css("top","3px")
  },600)
  ntc=setTimeout(function(){
    $(".notice").css("top","-100px")
  },3200)
}
function sum (m,n){var num = Math.floor(Math.random()*(m - n) + n);return num;}


//主界面
function showtime() { 
  var today = new Date();var h = today.getHours();var m = today.getMinutes();var s = today.getSeconds();h=checkTime(h);m=checkTime(m);s=checkTime(s) 
  if(gset("time")==true){
	document.getElementById('time').innerHTML=h+":"+m+":"+s
  }else{
  	document.getElementById('time').innerHTML=h+":"+m
  }
  setTimeout('showtime()',1000) }  
function checkTime(i){if (i<10){ i="0"+i}return i;}
//搜索模块
function chksearch(){//检测输入框
  setTimeout(function(){
    if($("#search").val().length!=0){
      $(".advice").attr("style","margin-top:10px;opacity:0;top:var(--toppx)")
      loadadvice()
  	}else{
      $(".advice").attr("style","")
    }
  },1)
  e = event.keyCode;if (e==13){opensearch();stopsearch()}
}
function loadadvice(){//联想
  $.ajax({
    url: "https://suggestion.baidu.com/su?cb=bius_sugg&wd="+$("#search").val(),
    dataType: "jsonp"
  });
}
function bius_sugg(data){//建议
  if($("#search").val().length!=0){
    $(".advice").attr("style","margin-top:0;opacity:1;top:var(--toppx)")
    $(".advice #oslist").text($("#search").val())
    if(data.s[1] != null){$(".advice #nlist1").text(data.s[1]);$(".advice .nlist1").show()}else{$(".advice .nlist1").hide()}
    if(data.s[2] != null){$(".advice #nlist2").text(data.s[2]);$(".advice .nlist2").show()}else{$(".advice .nlist2").hide()}
    if(data.s[3] != null){$(".advice #nlist3").text(data.s[3]);$(".advice .nlist3").show()}else{$(".advice .nlist3").hide()}
    if(data.s[4] != null){$(".advice #nlist4").text(data.s[4]);$(".advice .nlist4").show()}else{$(".advice .nlist4").hide()}
    if(data.s[5] != null){$(".advice #nlist5").text(data.s[5]);$(".advice .nlist5").show()}else{$(".advice .nlist5").hide()}
    if($("#search").val().indexOf(" ")!= -1&&gset("proso")[$("#search").val().split(" ")[0]]!=null){$(".prosolst").show();$("#prosolst").html("站点直达<br><span style='font-size:0.8em'>"+gset("proso")[$("#search").val().split(" ")[0]]+$("#search").val().slice($("#search").val().indexOf(' ') + 1)+"</span>")}else{$(".prosolst").hide()}
  	if($("#search").val().indexOf(".")!= -1){
      $(".httplst").show()
      if($("#search").val().indexOf("http://")!= -1 || $("#search").val().indexOf("https://")!= -1){var url=$("#search").val()}
      else{var url="https://"+$("#search").val()}
      $("#httplst").html("访问网页<br><span style='font-size:0.8em'>"+url+"</span>")
    }else{$(".httplst").hide()}
  }else{$(".advice").attr("style","")}
}
function advlistSearch(ele){
  window.open("https://www.baidu.com/s?wd="+$(ele).children("span")[0].innerHTML);
  stopsearch();
}
function advlistProso(ele){
  window.open(gset("proso")[$("#search").val().split(" ")[0]]+$("#search").val().slice($("#search").val().indexOf(' ') + 1))
  stopsearch();
}
function advlistHttp(ele){
  if($("#search").val().indexOf("http://")!= -1 || $("#search").val().indexOf("https://")!= -1){window.open($("#search").val())}
  else{window.open("https://"+$("#search").val())}
  stopsearch()
}
function startsearch(){//进入搜索模式
  setTimeout(function(){$("body").scrollTop(100);},100)
  $(".search").attr("class","search-focus")
  if(gset("ssyl")!=false){setTimeout(function(){$(".search-frame").attr("style","top:70px")},0)}
  $(".backimg").css("filter","var(--blur) brightness(0.6)")
  $(".backimg").css("transform","scale(1.1)")
  $(".time").fadeOut(200)
  $(".yiyan").fadeOut(200)
  $("#bg-mask").attr("onclick","stopsearch()")
}
function stopsearch(){//退出搜索模式
  $("#search").val("")
  $(".search-focus").attr("class","search");
  $(".backimg").css("filter","none")
  $(".backimg").css("transform","none")
  setTimeout(function(){$(".advice").attr("style","")},1)
  setTimeout(function(){
    $(".time").fadeIn(200)
    $(".yiyan").fadeIn(200)
  },150)
  $("#bg-mask").attr("onclick","")
  $("#search").blur()
}
function opensearch(){//新页面搜索
  if($("#search").val().indexOf(" ")!= -1&& gset("proso")[$("#search").val().split(" ")[0]]!=null){
    window.open(gset("proso")[$("#search").val().split(" ")[0]]+$("#search").val().slice($("#search").val().indexOf(' ') + 1))
  }else if($("#search").val().indexOf(".")!= -1){
    if($("#search").val().indexOf("http://")!= -1 || $("#search").val().indexOf("https://")!= -1){window.open($("#search").val())}
    else{window.open("https://"+$("#search").val())}
  }else{
    window.open("https://www.baidu.com/s?wd="+$("#search").val())
  }
}
function loadproso(){//加载ps设置
  var json=gset("proso");
  $("#proso-set").html('<tbody><tr><th style="text-align:left;width:100px;overflow:hidden;display:inline-block">功能关键字</th><th style="text-align:left;width:calc(100% - 100px);overflow:hidden;display:inline-block">访问网址</th></tr></tbody>');
  for(var p in json){
    var ohtml=$("#proso-set").html()
    $("#proso-set").html(ohtml+"<tbody onclick=delproso('"+p+"') class='slist' style='display:block;width:100%;overflow:hidden;'><tr><td style='width:100px;overflow:hidden;display:inline-block'>"+p+"</td><td style='width:calc(100% - 105px);overflow:hidden;display:inline-block'>"+json[p]+"</td></tr></tbody><br>");
  }
}
function delproso(txt){//删除ps项目
  if(confirm("确实要删除站点直达关键词“"+txt+"”吗？")){
  	var json=gset("proso")
 	delete json[txt]
  	cset("proso",json);setsync();loadproso()
  }
}
function newproso(){
  var key=prompt("请输入功能关键字")
  var val=prompt("请输入访问的网站，后方自动加参数","https://")
  if(val.indexOf("https://")==-1 && val.indexOf("http://")==-1){val="https://"+val}
  var json=gset("proso")
  json[key]=val
  cset("proso",json);setsync();loadproso()
}
//设置窗口模块
function changesetpage(ele,page){//切换页面
  $(".setting .list.active").attr("class","list")
  $(ele).attr("class","list active")
  $(".setting .page").attr("class","page")
  $(".setting .page#"+page).attr("class","page active")
}
function closeset(){//关闭设置
  $(".setting-mask").fadeOut(200)
  $(".setting").attr("style","transform:scale(1.1);opacity:0")
  setTimeout(function(){$(".setting").hide()},200)
}
function openset(){//打开设置
  $("#gongyiguanggao").attr("src","https://cn05.img.horain.top/imgs/2021/07/314e43fd097ac1bf.jpg")
  $(".wallpapers#bing").attr("src","https://retiehe.com/backend/bing/1080p")
  $(".wallpapers#randomfj").attr("src","https://api.ixiaowai.cn/gqapi/gqapi.php")
  $(".wallpapers#randomdm").attr("src","https://api.ixiaowai.cn/api/api.php")
  $(".wallpapers#wall1").attr("src","https://z3.ax1x.com/2021/06/26/RGsi1x.jpg")
  $(".wallpapers#wall2").attr("src","https://img.maocdn.cn/img/2021/05/04/78628529280e57f23df5d4f58555b44a.jpg")
  $(".wallpapers#wall3").attr("src","https://img.maocdn.cn/img/2021/05/04/1db4899abd0b18387d292ad7200b4b5d.jpg")
  $(".wallpapers#wall4").attr("src","https://img.maocdn.cn/img/2021/05/04/cdc024729ac2cde45ea7837599706372.jpg")
  $(".wallpapers#wall5").attr("src","https://img.maocdn.cn/img/2021/05/04/d6b63ad57f97d411e44831f5708587e6.jpg")
  $(".wallpapers#wall6").attr("src","https://img.maocdn.cn/img/2021/05/04/4e4edb59c3c92efb42ab543fdee88642.jpg")
  $(".wallpapers#wall7").attr("src","https://img.maocdn.cn/img/2021/05/04/09b57cb48f1e74b0472ba75e39074058.jpg")
  $(".wallpapers#wall8").attr("src","https://img.maocdn.cn/img/2021/05/04/65eee215b43e89e8aab9a07916b89c8c.jpg")
  $(".wallpapers#wall9").attr("src","https://img.maocdn.cn/img/2021/05/04/95814716699641c9accb5bd269440f1d.jpg")
  if($("#sync-frame").attr("src")!="https://bius.simsoft.top/sync/manage/bius.php"){$('#sync-frame-loading').show();$("#sync-frame").hide();$("#sync-frame").attr("src","https://bius.simsoft.top/sync/manage/bius.php")}
  $.get("update.txt", function(result){
    $("#uplog").html(result);
  });
  $(".setting-mask").fadeIn(200)
  $(".setting").attr("style","opacity:0;transform:scale(1.1);")
  setTimeout(function(){$(".setting").attr("style","")},50)
}

//设置项
function loadset(){//初始化
  if(localStorage.getItem("Bius_Set")==null){
    localStorage.setItem("Bius_Set",'{"proso":{"hy":"https://hanyu.baidu.com/s?wd=","bd":"https://www.baidu.com/s?wd=","by":"https://cn.bing.com/search?q=","tq":"https://bius.simsoft.top/api/weather.php?q="}}')
    localStorage.setItem("Bius_Sites","{}")
  }
  if(gset("time")==true){$(".set#times").attr("class","set on")}else{$(".set#times").attr("class","set off")}
  if(gset("yiyan")==false){$(".set#yiyans").attr("class","set off")}else{$(".set#yiyans").attr("class","set on");}
  loadyiyan();loadwall()
}
function ctime(ele){//精确时间设定
  if(gset("time")==true){
    $(ele).attr("class","set off");cset("time",false)
  }else{
    $(ele).attr("class","set on");cset("time",true)
  }
  notice("设置已保存");setsync()
}
function cblur(ele){//模糊设定
  if(gset("blur")==true){
    $(ele).attr("class","set off");cset("blur",false)
    notice('设置已保存')
  }else{
    $(ele).attr("class","set on");cset("blur",true)
    notice('亚克力特效已开启，如有掉帧请关闭')
  }
  setsync();loadblur()
}
function loadblur(){//加载模糊
  if(gset("blur")==true){
    $("#blurstyle").html("body{--blur:blur(10px)}")
    $("#blurs").attr("class","set on");
  }else{
    $("#blurstyle").html("body{--blur:blur(0px)}")
    $("#blurs").attr("class","set off");
  }
}
function cyiyan(ele){//一言设定
  if(gset("yiyan")==false){
    $(ele).attr("class","set on");cset("yiyan",true)
  }else{
    $(ele).attr("class","set off");cset("yiyan",false)
  }
  notice("设置已保存");setsync();loadyiyan()
}

function loadyiyan(){//加载一言
  if(gset("yiyan")!=false){
    $.ajax({
      type: "get",
      url: "https://v1.hitokoto.cn/?c=i&max_length=12", 
      success: function (data) {
        $('#yiyan').text(data.hitokoto);
        $('#yiyan').attr('onclick',"yiyannotice('" + data.from + "')")
        $('.yiyan').fadeIn(200)
        $('#time').attr('style',"font-size:2.5em")
      }, 
      error: function (err) {loadyiyan()}
    });
  }else{
    $('.yiyan').attr('style',"opacity:0")
    $('#time').attr('style',"")
  }
}
function yiyannotice(from){notice("来自《" + from + "》丨<a href=https://hanyu.baidu.com/s?wd=" + from + " target=_blank>查看详情</a>")}
function sayhello(){//打招呼
  if(gset("hello")!="off"){
	now = new Date(),hour = now.getHours()
	if(hour < 6){var word="凌晨好"}
	else if (hour < 9){var word="早上好"}
	else if (hour < 12){var word="上午好"}
	else if (hour < 14){var word="中午好"}
	else if (hour < 17){var word="下午好"}
	else if (hour < 19){var word="傍晚好"}
	else if (hour < 22){var word="晚上好"}
	else {var word="夜里好"}
	notice(word+"！",{time:2000,color:"black"})
  }
}
function sayhellolog(){//打招呼
  if(gset("hello")!="off"){
	now = new Date(),hour = now.getHours()
	if(hour < 6){var word="凌晨好"}
	else if (hour < 9){var word="早上好"}
	else if (hour < 12){var word="上午好"}
	else if (hour < 14){var word="中午好"}
	else if (hour < 17){var word="下午好"}
	else if (hour < 19){var word="傍晚好"}
	else if (hour < 22){var word="晚上好"}
	else {var word="夜里好"}
    if(gset("vip")!=true){
	  notice(word+"，"+$("div.logincard:first-child > span:first-child").html()+"！",{time:2000,color:"black"})
    }else{
	  notice(word+"，"+$("div.logincard:first-child > span:first-child").html()+"！<span class='vip' style='float:right;margin-top:2px'>赞助用户</span>",{time:2000,color:"black"})
      $(".logincard span:first:nth-child(1)").html($(".logincard span:first:nth-child(1)").html()+"<span class='vip' style='font-size:0.5em'>赞助用户</span>")
    }
  }
}
function savecolor(ele){//颜色设置
  s=ele.value
  if(s=="default"){cset("mcolort","default");cset("mcolor","rgb(52,168,255)");notice("保存成功！")}
  else if(s=="lime"){cset("mcolort","lime");cset("mcolor","rgb(112,192,0)");notice("保存成功！致敬毛若昕的<a href='//limestart.cn'>青柠起始页</a>~");}
  else if(s=="orange"){cset("mcolort","orange");cset("mcolor","orange");notice("保存成功！")}
  else if(s=="random"){cset("mcolort","random");notice("保存成功！")}
  else if(s=="diy"){$("#selectdiycolor").click();notice("请在弹出窗口设定自定义颜色<br>目前仅Chromium浏览器完美支持此功能")}
  loadcolor();setsync()
}
function sdiycolor(hex){//自定义颜色
  let c = "rgb(" + parseInt("0x" + hex.slice(1, 3)) + "," + parseInt("0x" + hex.slice(3, 5)) + "," + parseInt( "0x" + hex.slice(5, 7)) + ")";
  cset("mcolort","diy");cset("mcolor",c);notice("已设置！");loadcolor();setsync()
}
function loadcolor(){//加载颜色
  if(gset("mcolort")=="diy"){$("#maincolor").html("body{--maincolor:"+gset("mcolor")+"}");$("#mcolor-select").val("diy")}
  else if(gset("mcolort")=="lime"){$("#maincolor").html("body{--maincolor:"+gset("mcolor")+"}");$("#mcolor-select").val("lime")}
  else if(gset("mcolort")=="orange"){$("#maincolor").html("body{--maincolor:"+gset("mcolor")+"}");$("#mcolor-select").val("orange")}
  else if(gset("mcolort")=="random"){var color="rgb("+sum (50,200)+","+sum (50,200)+","+sum (50,200)+")";$("#maincolor").html("body{--maincolor:"+color+"}");$("#mcolor-select").val("random")}
  else{$("#maincolor").html("body{--maincolor:#34a8ff}");$("#mcolor-select").val("default")}
  if(navigator.userAgent.indexOf("Macintosh") != -1 || navigator.userAgent.indexOf("iPhone") != -1 || navigator.userAgent.indexOf("iPad") != -1){$("#mcolor-diy-btn").remove()}
}
function cwall(ele){//设置壁纸
  cset("wallid",ele.id);
  cset("wallurl",ele.src)
  loadwall();setsync()
}
function loadwall(){//加载壁纸
  if(gset("wallurl")!=null){
    $(".backimg").attr("src",gset("wallurl"))
    $(".backimg").attr("style","opacity:0")
    $("img.wallpapers.selected").attr("class","wallpapers")
    $("img.wallpapers#"+gset("wallid")).attr("class","wallpapers selected")
  }else{
    $(".backimg").attr("src","https://retiehe.com/backend/bing/1080p")
    $(".backimg").attr("style","opacity:0")
    $("img.wallpapers.selected").attr("class","wallpapers")
    $("img.wallpapers#bing").attr("class","wallpapers selected")
  }
  if(gset("diywallurl")==null){
    $("#diybackimg").attr("src","https://img.maocdn.cn/img/2021/05/04/No_Image.png")
  }else{
    $("#diybackimg").attr("src",gset("diywallurl"))
  }
}
function cbgmask(ele){//背景mask
  if(gset("bgmsk")==false){
    $(ele).attr("class","set on");cset("bgmsk",true)
  }else{
    $(ele).attr("class","set off");cset("bgmsk",false)
  }
  notice('设置已保存');setsync();loadbgmask()
}
function loadbgmask(){//加载mask
  if(gset("bgmsk")==false){
    $("#bg-mask").attr("style","opacity:0");
    $("#bgmasks").attr("class","set off");    
  }else{
	$("#bg-mask").attr("style","opacity:1");
    $("#bgmasks").attr("class","set on");
  }
}
function csync(ele){//同步
  if(gset("sync")=="off"){
    $(ele).attr("class","set on");cset("sync","on")
  }else{
    $(ele).attr("class","set off");cset("sync","off")
  }
  notice('设置已保存');setsync();
}
function chello(ele){//问候语
  if(gset("hello")=="off"){
    $(ele).attr("class","set on");cset("hello","on")
  }else{
    $(ele).attr("class","set off");cset("hello","off")
  }
  notice('设置已保存');loadhello();setsync();
}
function loadhello(){//问候语加载
  if(gset("hello")=="off"){
    $("#hellos").attr("class","set off");
  }else{
    $("#hellos").attr("class","set on");
  }
}
function setdiywall(){//设置自定义壁纸
  var url=prompt('输入壁纸的完整网址，以“https://”开头','https://')
  if(url!=null){
    if(url.indexOf("https://")==0){
      cset("wallid","diybackimg");
      cset("wallurl",url)
      cset("diywallurl",url)
      loadwall();setsync()
    }else{
      alert("网址不规范，请重新输入。")
      setdiywall()
    }
  }
}
function setdiywallnow(){//直接切换自定义
  if(gset("diywallurl")==null){
    setdiywall();setsync()
  }else{
    cset("wallid","diybackimg");
    cset("wallurl",gset("diywallurl"))
    loadwall();setsync()
  }
}

//if(window.location.hostname!="dev.bius.top"&&window.location.hostname!="bius.top"){
//  alert("偷代码的给爷爬，骨灰飞扬千万家")
//  window.location.href="https://bius.top"
//}