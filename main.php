<main>
    <h1 id="time" onclick="scroll2page()" style="font-family:'Microsoft Yahei Light','Microsoft Yahei',PingFangSC-Regular,Helvetica,sans-serif,'等线';color:white;font-size:2.5em;font-weight:normal;text-shadow:0 0 35px grey;text-align:center;margin:0;margin-bottom:20px;margin-top:80px"></h1>
    <section class="navi-search" style="height:100vh;text-align:center">
        <span class="input-box" style="backdrop-filter: blur(35px);background: rgba(0,0,0,0.3);">
            <div class="search-select" title="切换搜索引擎" style="display:none">
                <div class="iconfont icon-baidu"></div>
            </div>
            
            <div class="search-selector"></div>
            <input type="text" placeholder="搜索" onfocus="searchstart()" onblur="searchstop()" onkeydown="entersearch(event)"/>
        </span>
		<div align="center">
			<h1 onclick="copyyiyan()" id="yiyan" style="border-radius:10px;backdrop-filter:blur(5px);display:inline-block;font-family:微软雅黑;color:white;font-size:0.9em;font-weight:lighter;text-shadow:0 0 5px grey;text-align:center;margin:0;margin-top:20vh">正在撰写一言......</h1>
		</div>
    </section>
	<div style="height:calc(100vh - 300px);overflow-y:scroll;padding-bottom:30px;margin-top:30px" id="navisites-section">
		<h1 id="time2" onclick="scroll1page()" style="font-family:'Microsoft Yahei Light','Microsoft Yahei',PingFangSC-Regular,Helvetica,sans-serif,'等线';color:white;font-size:2.5em;font-weight:normal;text-shadow:0 0 5px grey;text-align:center;margin:0;margin-bottom:20px"></h1>
    	<section class="navi-items"></section>
	</div>
    <section class="navi-background" style="transition:all .2s;"></section>
    <section class="navi-background-mask" style="transition:all .2s;"></section>
    <section class="navi-loading-mask" style="transition:all .2s;" align="center">
		<img src="/static/icon.png" height="200px" width="200px" style="margin-top:calc(50vh - 100px)">
	</section>
</main>