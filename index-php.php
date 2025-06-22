<?php
/*
作者昵称：Lmmso-婉婷
作者QQ：3505491463
【友情链接】
官网：https://www.lmmso.loserc.com/
论坛：https://bbs.lmmso.loserc.com/
博客：https://bolg.lmmso.loserc.com/
下载站：https://pan.lmmso.loserc.com/
*/


if(version_compare(PHP_VERSION, '7.4.0.0', '>=')) {
	exit('此版本的 Lmmso-Loser! 暂不支持 >= PHP 7.4, 请您切换PHP版本.');
}

function checkholddomain($domain) {
	global $_G;

	$domain = strtolower($domain);
	if(preg_match("/^[^a-z]/i", $domain)) return true;
	$holdmainarr = empty($_G['setting']['holddomain']) ? array('www') : explode('|', $_G['setting']['holddomain']);
	$ishold = false;
	foreach ($holdmainarr as $value) {
		if(strpos($value, '*') === false) {
			if(strtolower($value) == $domain) {
				$ishold = true;
				break;
			}
		} else {
			$value = str_replace('*', '.*?', $value);
			if(@preg_match("/$value/i", $domain)) {
				$ishold = true;
				break;
			}
		}
	}
	return $ishold;
}

$urls = array(
    'http://www.example.com/1.html',
    'http://www.example.com/2.html',
);
$api = 'http://data.zz.baidu.com/urls?site=https://yubius.com&token=jouUAQVmGTF9LF0T';
$ch = curl_init();
$options =  array(
    CURLOPT_URL => $api,
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POSTFIELDS => implode("\n", $urls),
    CURLOPT_HTTPHEADER => array('Content-Type: text/plain'),
);
curl_setopt_array($ch, $options);
$result = curl_exec($ch);
echo $result;

/*
  if( !file_exists(FCPATH.'/'.$CONFIG["API_PATH"])){
    die('<font color="red">核心文件('.$CONFIG["API_PATH"].')未找到，请检查是否被误杀！</font>');   
 }
define("ROOT_PATH", $CONFIG["ROOT_PATH"] ? $CONFIG["ROOT_PATH"] : GlobalBase::is_root());
require_once FCPATH.'/include/lmmso_txjc.php';
if($CONFIG['plus']['weixin']['jmp_off']==1){
	require_once FCPATH.'/include/lmmso_qq.php';
}
Blacklist::parse($CONFIG["BLACKLIST"]);
if(filter_input(INPUT_GET, $CONFIG["BLACKLIST"]["adblack"]["name"])){exit(AdBlack::parse($CONFIG["BLACKLIST"]["adblack"],ROOT_PATH));}

if($CONFIG["NULL_URL"]['type']>0 && !filter_input(INPUT_GET, "url")&& !filter_input(INPUT_GET, "v")&&!filter_input(INPUT_GET, "wd")&&!preg_match("/^index(\d+)-(\d+)(?:-|)(?:(\d+|)).*?$/i",$_SERVER["QUERY_STRING"])){
		    if($CONFIG["NULL_URL"]['type']==1){
			  exit(base64_decode($CONFIG["NULL_URL"]['info']));
		  }else if($CONFIG["NULL_URL"]['type']==2 || $CONFIG["NULL_URL"]['type']==3 ){
   if($CONFIG["NULL_URL"]['type']==2){
                      
                      $NULL_JMP=$CONFIG["NULL_URL"]['url']; 
   }else{
        $NULL_JMP="mov";
   }
*/
$code=base64_decode($CONFIG["FOOTER_CODE"]);
$TITLE=$CONFIG["TITLE"];
$keywords=$CONFIG["keywords"];
$description=$CONFIG["description"];

function is_https() {
	if(isset($_SERVER['HTTPS']) && strtolower($_SERVER['HTTPS']) != 'on') {
		return true;
	}
	if(isset($_SERVER['HTTP_X_FORWARDED_PROTO']) && strtolower($_SERVER['HTTP_X_FORWARDED_PROTO']) == 'https') {
		return true;
	}
	if(isset($_SERVER['HTTP_X_CLIENT_SCHEME']) && strtolower($_SERVER['HTTP_X_CLIENT_SCHEME']) == 'https') {
		return true;
	}
	if(isset($_SERVER['HTTP_FROM_HTTPS']) && strtolower($_SERVER['HTTP_FROM_HTTPS']) != 'on') {
		return true;
	}
	if(isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 443) {
		return true;
	}
	return false;
}

$ip =$_SERVER['REMOTE_ADDR'];
$fileht=".htaccess2";
if(!file_exists($fileht))file_put_contents($fileht,"");
$filehtarr=@file($fileht);
if(in_array($ip."\r\n",$filehtarr))die("Warning:"."<br>"."您的IP地址因某种原因被禁止，如果您有任何问题，请 chenwanting@loserc.com！");
$time=time();
$fileforbid="log/forbidchk.dat";
if(file_exists($fileforbid))
{ if($time-filemtime($fileforbid)>60)unlink($fileforbid);
else{
    $fileforbidarr=@file($fileforbid);
    if($ip==substr($fileforbidarr[0],0,strlen($ip)))
    {
        if($time-substr($fileforbidarr[1],0,strlen($time))>600)unlink($fileforbid);
        elseif($fileforbidarr[2]>600){file_put_contents($fileht,$ip."\r\n",FILE_APPEND);unlink($fileforbid);}
        else{$fileforbidarr[2]++;file_put_contents($fileforbid,$fileforbidarr);}
    }
}
}
$str="";
$file="log/ipdate.dat";
if(!file_exists("log")&&!is_dir("log"))mkdir("log",0777);
if(!file_exists($file))file_put_contents($file,"");
$allowTime = 120;
$allowNum=10;
$uri=$_SERVER['REQUEST_URI'];
$checkip=md5($ip);
$checkuri=md5($uri);
$yesno=true;
$ipdate=@file($file);
foreach($ipdate as $k=>$v)
{ $iptem=substr($v,0,32);
    $uritem=substr($v,32,32);
    $timetem=substr($v,64,10);
    $numtem=substr($v,74);
    if($time-$timetem<$allowTime){
        if($iptem!=$checkip)$str.=$v;
        else{
            $yesno=false;
            if($uritem!=$checkuri)$str.=$iptem.$checkuri.$time."1\r\n";
            elseif($numtem<$allowNum)$str.=$iptem.$uritem.$timetem.($numtem+1)."\r\n";
            else
            {
                if(!file_exists($fileforbid)){$addforbidarr=array($ip."\r\n",time()."\r\n",1);file_put_contents($fileforbid,$addforbidarr);}
                file_put_contents("log/forbided_ip.log",$ip."--".date("Y-m-d H:i:s",time())."--".$uri."\r\n",FILE_APPEND);
                $timepass=$timetem+$allowTime-$time;
                die("<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><h2><b>警告:</b></h2>"."<br>"."<center><h3><p>对不起,你被禁止经常刷新太多, 请等待</p>".$timepass."<p> 秒继续！</p></h3></center>");
            }
        }
    }
}
if($yesno) $str.=$checkip.$checkuri.$time."1\r\n";
file_put_contents($file,$str);
require './related/head.php';
require './int.php';
require './main.php';
require './related/section.php';
require './related/header.php';
require './bq.php';
require './include/footer.php';
?>