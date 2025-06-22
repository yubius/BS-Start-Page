
<textarea id="yiyaninput" style="position:fixed;top:0;width:0;height:0;opacity:0"></textarea>
<script src="https://fastly.jsdelivr.net/gh/Dreamer-Paul/Kico-Style/kico.js"></script>
<script src="https://h.simsoft.top/js/jq.js"></script>
<script src="static/main.js?https://simsoft.top/"></script>
	<script>
	function showtime() { 
		var today = new Date() 
		var h = today.getHours() 
		var m = today.getMinutes() 
		h=checkTime(h) 
		m=checkTime(m) 
		document.getElementById('time').innerHTML=h+":"+m 
		document.getElementById('time2').innerHTML=h+":"+m 
		t=setTimeout('showtime()',1000) }  
	function checkTime(i) { if (i<10) { i="0" + i } return i }
	function getyiyan(){$.get("https://v1.hitokoto.cn/?c=i&max_length=20",function(data,status){$('#yiyan').text(data.hitokoto);});}
	function scroll2page(){$("body").attr("style","top:calc(-100vh - 100px);transition:all .5s");$(".navi-background-mask").css("opacity","1");$("#backgroundstyle").html(".navi-background{transform:scale(1.1)}");}
	function scroll1page(){$("body").attr("style","top:0;transition:all .5s");$(".navi-background-mask").css("opacity","0");$("#backgroundstyle").html(".navi-background{}");}
	function sayhello(){
		now = new Date(),hour = now.getHours()
		if(hour < 6){var word="凌晨好"}
		else if (hour < 9){var word="早上好"}
		else if (hour < 12){var word="上午好"}
		else if (hour < 14){var word="中午好"}
		else if (hour < 17){var word="下午好"}
		else if (hour < 19){var word="傍晚好"}
		else if (hour < 22){var word="晚上好"}
		else {var word="夜里好"}
		ks.notice(word+"！",{time:2000,color:"green"})
	}
	function searchstart(){$("#backgroundstyle").html(".navi-background{transform:scale(1.1)}");$(".input-box").attr("style","backdrop-filter: blur(5px);background: rgba(0,0,0,1);transition:all .2s");$(".navi-background-mask").css("opacity","1")}
	function searchstop(){$("#backgroundstyle").html(".navi-background{}");$(".input-box").attr("style","backdrop-filter:blur(35px);background: rgba(0,0,0,0.3);transition:all .2s");$(".navi-background-mask").css("opacity","0")}
	window.onload=showtime();getyiyan();sayhello();loadupdate()
	function changewall(){
	    var img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = data.back_method[data.user.background].url;
            
            img.onload = function (ev) {
                obj.main.bg.style.background = "url(" + img.src + ") " + data.back_method[data.user.background].set;
                obj.main.bg.classList.add("active");
                var one = document.createElement("canvas");
                var context = one.getContext("2d");
                context.drawImage(img, 0, 0, img.width, img.height, 0, 0, 1, 1);
                var imgData = context.getImageData(0, 0, 1, 1).data;
			}}
	function loadnewsetting(){
		ks.notice("<CENTER>请粘贴复制的内容，然后单击窗口外的任意位置：</CENTER><textarea style='width:300px;background:transparent;border:0;resize:none' onchange='savesettings()' id='import-input'></textarea>", {color: "green"});
		$("#import-input").focus()
	}
	function savesettings(){
		set=$("#import-input").val()
		localStorage.setItem("paul-navi",set)
		ks.notice("导入成功，页面即将重载...")
		location.reload();
	}
	function entersearch(event){
		if (event.keyCode == 13) {
        	window.open(data.search_method[Number(JSON.parse(localStorage.getItem("paul-navi")).search)].url+$(".input-box input").val())
			document.querySelector("body > main > section.navi-search > span > input[type=text]").value=""
    	}
	}
	function loadupdate(){
		var date = new Date();
		var y = date.getFullYear();
		var m = date.getMonth()+1;
		var d = date.getDate();
		var date=y+"/"+m+"/"+d
		document.querySelector("#update-date").innerHTML="当前版本："+date+""
	}
	console.log("Yubius-Start")
	console.log("By Yubius&YanJi.©2021")
	var scroll_events = "mousewheel DOMMouseScroll MozMousePixelScroll";
	$(document).on(scroll_events, function(e) {
		var delta = e.originalEvent.wheelDelta || e.originalEvent.detail;
		if(delta < 0) {scroll2page()}
		else {scroll1page()}
	});
	</script>
	<style id="backgroundstyle"></style>
	<style>
		*{user-select:none}
		.navi-background{z-index:-2}
		.navi-background-mask{transition:all .2s!important;z-index:-1;background:rgba(0,0,0,0.5);position:fixed;top:0;bottom:0;left:0;right:0;backdrop-filter:blur(5px);opacity:0}
		#time,#time2{transition:all .2s}
		#time:active,#time2:active{transform:scale(0.9)}
		.search-select{width:fit-content;height:40px}
		.input-box{padding:3px;padding-left:10px;width:30%;min-width:300px;transition:all .2s;display:inline-flex;height:45px;max-width:700px;color:white}
		.input-box input::placeholder{color:#dadada;transition:all .2s}
		.input-box input:focus::placeholder{color:black}
		.input-box input{padding:0;text-align:center}
		.input-box:hover{width:100%}
		.input-box:focus-within{width:100%}
		header .updated{display:block!important}
		body{position: fixed;width: 100%;}
		#backselect option[0]{background:url('https://api.paugram.com/bing')}
		.ks-notice .content{user-select:text}
		#navisites-section::-webkit-scrollbar{display:none}
		window{backdrop-filter:blur(5px)}
	</style>
	</body>
</html>