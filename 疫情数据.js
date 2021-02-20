<script>
window.callbackstaticdata = function(res){
    console.log(res);
    //数据输出，
    console.log(JSON.stringify(res));
}
 
////t 为时间戳，防止缓存
$.getScript("https://cdn.mdeer.com/data/yqstaticdata.js?callback=callbackstaticdata&t="+(+new Date));
//数据有几百KB，您用我们的格式化工具格式化下就可以看到。全世界各国，中国各个省份的详细数据都有。
</script>
