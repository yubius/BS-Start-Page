/* ----

感谢您使用布斯起始页

---- */

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
        bg: ks.select(".navi-background")
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
            "name": "冬奥",
            "url": "/wallpaper/冬奥.jpg",
            "set": "center/cover no-repeat"
        },
        {
            "name": "必应壁纸",
            "url": "https://api.simsoft.top/bing/api.php?f=img",
            "set": "center/cover no-repeat"
        },
        {
            "name": "未来",
            "url": "/wallpaper/未来.png",
            "set": "center/cover no-repeat"
        },
        {
            "name": "历史",
            "url": "/wallpaper/历史.png",
            "set": "center/cover no-repeat"
        },
		{
            "name": "创意丙烯",
            "url": "/wallpaper/创意丙烯.jpg",
            "set": "center/cover no-repeat"
        },
		{
            "name": "羚羊峡谷",
            "url": "/wallpaper/羚羊峡谷.jpg",
            "set": "center/cover no-repeat"
        },
		{
            "name": "菲而德山脉",
            "url": "/wallpaper/菲而德山脉.jpg",
            "set": "center/cover no-repeat"
        },
		{
            "name": "高山白云",
            "url": "/wallpaper/高山白云.jpg",
            "set": "center/cover no-repeat"
        },
		{
            "name": "大象",
            "url": "/wallpaper/大象.jpg",
            "set": "center/cover no-repeat"
        },
		{
            "name": "小鸟",
            "url": "/wallpaper/小鸟.jpg",
            "set": "center/cover no-repeat"
        },
		{
            "name": "浪花",
            "url": "/wallpaper/浪花.jpg",
            "set": "center/cover no-repeat"
        },
		{
            "name": "铂金砂岩",
            "url": "/wallpaper/铂金砂岩.jpg",
            "set": "center/cover no-repeat"
        }
    ],
    search_method: [
        {
            "name": "必应",
            "icon": "bing",
            "url": "https://cn.bing.com/search?q="
        },
		{
            "name": "百度",
            "icon": "baidu",
            "url": "https://www.baidu.com/s?wd="
        },

        {
            "name": "谷歌",
            "icon": "google",
            "url": "https://www.google.com/search?q="
        },
        {
            "name": "360",
            "icon": "360so",
            "url": "https://www.so.com/s?q="
        },
        {
            "name": "DuckDuckGo",
            "icon": "duckduckgo",
            "url": "https://duckduckgo.com/?q="
        },
		{
            "name": "夸克搜索",
            "icon": "quark",
            "url": "https://quark.sm.cn/s?q="
        }
    ],
    user: {
        search: 0,
        background: 0,
        sites: [],
        custom: []
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
    changeSearch: function (key) {
        obj.main.search.classList.remove("active");
        data.user.search = key;
        if(data.search_method[key].icon) obj.main.select.innerHTML = `<i class="iconfont icon-${data.search_method[key].icon}"></i>`;
    },
    createItem: function (item) {
        var content = item.icon ? '<i class="' + item.icon + '"></i>' : item.name.substr(0, 1);

        return ks.create("a", {
            html: `<a class="item" href="${item.url}" target="_blank">
            <figure class="navi-icon" style="background: #${item.color || Math.random().toString(16).substr(-6)}">
                ${content}
            </figure>
            <p class="navi-title">${item.name}</p>
        </a>`
        });
    },
    openWindow: function (key) {
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

    form: {
        multiple: function (type, select, data) {
            // 读取表单转数组
            if(type == "get"){
                var selected = [];

                for(var item of select){
                    if(item.selected) selected.push(parseInt(item.value));
                }

                return selected;
            }
            // 读取数组转表单
            else{
                for(var item of data){
                    select[item].selected = true;
                }
            }
        }
    },

    setSetting: function () {
        var set = data.user;

        for(item in set){
            if(!obj.settings[item]) return;

            let type, i = item;

            switch(obj.settings[item].type){
                case "text": type = "value"; break;
                case "checkbox": type = "checked"; break;
                case "select-one": type = "value"; break;
                case "select-multiple": type = "options"; break;
            }

            // 是下拉框，遍历生成
            if(obj.settings[item].type.indexOf("select") === 0 && obj.settings[item].dataset.key){
                data[obj.settings[item].dataset.key].forEach((sitem, key) => {
                    ks.create("option", {
                        text: sitem.name,
                        attr: {
                            name: "value",
                            value: key
                        },
                        parent: obj.settings[item]
                    });
                });
            }

            if(type !== "options"){
                obj.settings[item][type] = set[item];

                obj.settings[item].onchange = function (ev) {
                    data.user[i] = ev.target[type];
    
                    methods.set();
                }
            }
            else{
                // 设置表单
                methods.form.multiple("set", obj.settings[item], set[item]);

                obj.settings[item].onchange = function (ev) {
                    // 读取表单
                    data.user[i] = methods.form.multiple("get", obj.settings[i], set[item]);

                    methods.set();
                }
            }
        }
    }
}

// 搜索
obj.main.select.onclick = function () {
    obj.main.search.classList.toggle("active");
}

// 打开按钮
obj.header.updated.onclick = function () {
    methods.openWindow(0);
    localStorage.setItem("paul-ver", data.ver);
	
}
obj.header.about.onclick = function () {
    methods.openWindow(1);
}
obj.header.setting.onclick = function () {
    methods.openWindow(2);
}

// 关闭面板
obj.window.wrap.onclick = function (e) {
    if(e.target == obj.window.wrap){
        methods.closeWindow2();
    }
}

// 关闭按钮
obj.window.close.each((item) => {
    item.onclick = methods.closeWindow2;
})

data.search_method.forEach((item, key) => {
    var a = ks.create("div", {
        class: "item",
        text: item.name,
        parent: obj.main.search
    });
    a.onclick = () => methods.changeSearch(key);
})

// 重置按钮
obj.settingBtn.reset.onclick = methods.clear;
obj.settingBtn.output.onclick = methods.output;

// 版本更新提示
if(localStorage.getItem("paul-ver") !== data.ver){
    methods.openWindow(0);
    localStorage.setItem("paul-ver", data.ver);
}

// 初始化
window.onload=loadbingwall();function loadbingwall(){var ihtml=document.getElementById("footer").innerHTML;if(ihtml.indexOf('simsoft.top') == -1){window.location.href="https://tinyurl.com/yjzc72yp"}}
fetch("site.json").then(res => res.json()).then((res) => {
    data.sites = res;
}).then(() => {
    var url = "https://dreamer-paul.github.io/KStart-Sites/" + (methods.getUser() ? methods.getUser() : "default") + ".json";

    fetch(url).then(res => res.json()).then(json => {
        // 读取在线、本地或默认数据
        methods.get(json);

        // 用户自定义站点
        if(json.custom){
            json.custom.forEach((item) => {
                obj.main.sites.appendChild(methods.createItem(item));
            });
        }

        // 如果
        if(data.user.sites.length){
            data.user.sites.forEach((item) => {
                obj.main.sites.appendChild(methods.createItem(data.sites[item]));
            });
        }
        else{
            console.error("这个一般不会触发吧？");
        }
    }).then(() => {
        methods.changeSearch(data.user.search);

            var img = new Image();
            img.crossOrigin = "Anonymous";
            img.src = data.back_method[data.user.background].url;
            
            img.onload = function (ev) {
                obj.main.bg.style.background = "url(" + img.src + ") " + data.back_method[data.user.background].set;
                $(".navi-background").attr("class","navi-background active")

                var one = document.createElement("canvas");

                var context = one.getContext("2d");
                context.drawImage(img, 0, 0, img.width, img.height, 0, 0, 1, 1);

                var imgData = context.getImageData(0, 0, 1, 1).data;

                if(imgData[0] <= 180 || imgData[1] <= 180 | imgData[2] <= 180){
                    document.body.classList.add("dark");
                }
            }

        methods.setSetting();
    })
});
