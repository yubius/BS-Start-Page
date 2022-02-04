<?php 
if($_GET["act"]=="edit"){
	if(stristr($_GET["url"],"http://")){echo "仅支持HTTPS协议的链接";}
	elseif(stristr($_GET["url"],"https://")){setcookie("wallurl", $_GET["url"], time()+360000);echo"设置成功，刷新页面生效";}
	else{setcookie("wallurl", "https://".$_GET["url"], time()+360000);echo"设置成功，刷新页面生效";}	
}
if($_GET["act"]=="get"){
	if($_COOKIE["wallurl"])
	{
		header("Location:".$_COOKIE["wallurl"]);
	}else{
		header("Location:/wallpaper/NoDiy.png");
	}
}