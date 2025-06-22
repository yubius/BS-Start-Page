<window>
    <section class="the-window updated">
        <div class="window-head">
            <img src="static/icon.png" style="height:30px;float:left">
            <button>×</button>
            <h3>更新日志</h3>
        </div>
        <div class="window-body">
            <article>
                <h2>更新日期:2022/5/28</h2>
                <li>修复由于jsdelivr被污染无法正常使用的问题</li>
                </ul>
                <a href="https://github.com/yubius/yubius.github.io/releases"> 
                    <p style="text-align: center;">                    
                    <img src="https://imgcdn.simsoft.top/upload/22-04-03-11-14-22-update.jpg" width="380%" height="280%" />
                    </p>
                    </a>
                    <h3> </h3>
                    <a href="https://github.com/yubius/yubius.github.com/discussions"> 
                        <p style="text-align: center;">                    
                        <img src="https://imgcdn.simsoft.top/upload/22-01-29-16-24-50-fk.png" width="380%" height="280%" />
                        </p>
                    </a>
            </article>
        </div>
    </section>
    <section class="the-window about">
        <div class="window-head">
            <img src="static/icon.png" style="height:30px;float:left">
            <button>×</button>
            <h3>关于</h3>
        </div>
        <div class="window-body">
            <article>
                <a href="https://github.com/yubius/yubius.github.com/discussions/categories/%E7%BD%91%E5%9D%80%E6%8F%90%E4%BA%A4"><img src="https://imgcdn.simsoft.top/1651928049-dev.jpg" alt="欢迎站长投递网站至捷径"></a>

                <h2>    </h2>
                <h2>你好！欢迎访问布斯起始页</h2>
                <h2>更新日期：2022/5/28</h2>
                <h2>Based on BiusUI</h2>

                <h2>本项目建设于2021/2/22</h2>
                <h3>贡献者：</h3>
                <a href="https://space.bilibili.com/18853927" target="_blank">YuXuan(Yubius)</a> | <a href="https://simsoft.top/" target="_blank">YanJi(SimSoft)</a> | <a href="https://paul.ren/" target="_blank">奇趣保罗</a>
                <h3>联系我们：</h3>
                <a href="https://space.bilibili.com/18853927"> 
                    <p style="text-align: center;">                    
                    <img src="https://imgcdn.simsoft.top/upload/22-04-03-10-08-08-bilibili.jpg" width="380%" height="280%" />
                    </p>
                 </a>
                 <h3> </h3>

                 <a href="https://jq.qq.com/?_wv=1027&k=rU9gu8El"> 
                    <p style="text-align: center;">                    
                    <img src="https://imgcdn.simsoft.top/upload/22-01-30-21-14-33-QQ.jpg" width="380%" height="280%" />
                    </p>
                 </a>
                 
                <h3>类似项目：</h3>
                <a href="https://utab.rth1.me/"> 
                    <p style="text-align: center;">                    
                    <img src="https://imgcdn.simsoft.top/upload/22-01-30-21-06-43-wx.jpg" width="380%" height="280%" />
                    </p>
                    </a>
                <h3>意见反馈：</h3>
                <a href="https://github.com/yubius/yubius.github.com/discussions"> 
                    <p style="text-align: center;">                    
                    <img src="https://imgcdn.simsoft.top/upload/22-01-29-16-24-50-fk.png" width="380%" height="280%" />
                    </p>
                    </a>
        </div>
    </section>
    
    <section class="the-window setting">
        <div class="window-head">
            <img src="static/icon.png" style="height:30px;float:left">
            <button>×</button>
            <h3>设定</h3>
        </div>
        <div class="window-body">
            <fieldset>
                <label>
                    <span>搜索引擎偏好</span>
                    <select name="search" data-key="search_method"></select>
                </label>
                <label>
                    <span>亚克力特效</span>
                    <img src="https://imgcdn.simsoft.top/upload/22-01-29-17-26-12-help.png" style="float:right;margin-top: 5px;" onclick="ks.notice('使用亚克力特效会带来更好看的界面，但在大屏设备上会带来严重掉帧卡顿。如果您在使用过程中发现不流畅，建议关闭此选项。',{color:'green',time:5000})" height="15px">
                    <select id="blur-set" onchange="saveblur()">
						<option value="on">允许使用亚克力特效</option>
						<option value="off">关闭亚克力特效</option>
                    </select>
                </label>
                <label>
                    <span>致美壁纸</span>
                    <img src="https://imgcdn.simsoft.top/upload/22-01-29-17-26-12-help.png" style="float:right;margin-top: 5px;" onclick="ks.notice('首次切换壁纸可能需要更长的时间',{color:'green',time:2000})" height="15px">
                    <select name="background" data-key="back_method" id="backselect"></select>
                </label>
				<label id="setdiy-area">
                    <textarea style='width:100%;border-radius:2px;background:transparent;border:1px solid #cccccc;resize:none;height:1em' onchange='savebackground()' id='backurl-input' placeholder="在此处输入自定义壁纸的网址"></textarea>
                </label>
				<label>
                    <span>编辑捷径</span>
                    <img src="https://imgcdn.simsoft.top/upload/22-01-29-17-26-12-help.png" style="float:right;margin-top: 5px;" onclick="ks.notice('Windows用户请按住Ctrl键多选<br>Mac用户请按住Command键多选',{color:'green',time:2000})" height="15px">
                    <select multiple name="sites" data-key="sites" style="height: 15em" id="set-site"></select>
                </label>
          
                <p align="center" style="display:none">
                    <button class="btn small blue" name="reset">恢复默认</button>
                    <button class="btn small blue" name="output">导出</button>
                    <button class="btn small blue" name="input" onclick="loadnewsetting()">导入</button>
                </p>
            </fieldset>
        </div>
    </section>
</window>