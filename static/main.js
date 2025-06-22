/* ----

# BS Start Page
# By: Yubius
# Last Update: 2024-2-22

一个简洁轻巧的起始页


---- */

function KStart() {
  const obj = {
    header: {
      edit: ks.select(".action-btn.edit"),
      updated: ks.select(".action-btn.updated"),
      about: ks.select(".action-btn.about"),
      setting: ks.select(".action-btn.setting"),
    },
    main: {
      select: ks.select(".search-select"),
      search: ks.select(".search-selector"),
      input: ks.select(".input-box input"),
      submit: ks.select(".input-box .btn"),
      sites: ks.select(".navi-items"),
      bg: ks.select(".navi-background"),
    },
    window: {
      wrap: ks.select("window"),
      item: ks(".the-window, .the-drawer"),
    },
    settings: {
      search: ks.select("[name=search]"),
      background: ks.select("[name=background]"),
      sites: ks.select("[name=sites]"),
      auto_focus: ks.select("[name=auto_focus]"),
      low_animate: ks.select("[name=low_animate]"),
      theme_mode: ks.select('[name=theme_mode]'),
    },
    settingBtn: {
      reset: ks.select("#set-reset"),
      input: ks.select("#set-input"),
      output: ks.select("#set-output"),
      file: ks.select("#set-file"),
    },
    drawer: {
      sites: ks.select(".the-drawer .sites")
    },

    // 不渲染的元素
    _internal: {
      link: ks.create("a"),
      dragFrom: null
    },
  };

  const data = {
    env: undefined,
    ver: "1.2.0",
    timer: "",
    window: 0,
    sites: [],
    background_type: [
      {
        name: "无背景",
      },
      {
        name: "必应每日壁纸",
        url: "https://api.paugram.com/bing",
        set: "center/cover no-repeat",
      },
      {
        name: "随机动漫壁纸",
        url: "https://api.paugram.com/wallpaper?source=gh",
        set: "bottom right/60% no-repeat",
      },
      {
        name: "Unsplash 随机图片",
        url: "https://source.unsplash.com/random/1920x1080",
        set: "center/cover no-repeat",
      }
    ],
    search_method: [
      {
        name: "必应",
        icon: "bing",
        url: "https://cn.bing.com/search?q=%s",
      },
      {
        name: "百度",
        icon: "baidu",
        url: "https://www.baidu.com/s?wd=%s",
      },
      {
        name: "谷歌",
        icon: "google",
        url: "https://www.google.com/search?q=%s",
      },
      {
        name: "360",
        icon: "360so",
        url: "https://www.so.com/s?q=%s",
      },
      {
        name: "搜狗",
        icon: "sogou",
        url: "https://www.sogou.com/web?query=%s",
      },
      {
        name: "DuckDuckGo",
        icon: "duckduckgo",
        url: "https://duckduckgo.com/?q=%s",
      },
    ],
    motion_reduced_enum: [
      {
        name: "自适应",
      },
      {
        name: "开启",
      },
      {
        name: "关闭",
      },
    ],
    user_set: {
      search: 0,
      background: 1,
      auto_focus: false,
      low_animate: 0,
      theme_mode: "auto", // 新增：主题模式，默认跟随系统
      sites: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 16, 28, 31, 35],
      custom: [],
      custom_bg_url: '',
    },
  };

  // 各种方法
  const methods = {
    // 存储相关
    getStorage: () => {
      const storage = localStorage.getItem("paul-userset");

      return storage ? JSON.parse(localStorage.getItem("paul-userset")) : undefined;
    },
    setStorage: () => {
      localStorage.setItem("paul-userset", JSON.stringify(data.user_set));
    },
    clearStorage: () => {
      localStorage.removeItem("paul-userset");
    },

    // 修改用户设置
    setUserSettings: (newData) => {
      data.user_set = { ...data.user_set, ...newData };
    },

    // 获取地址栏用户参数
    getUser: () => {
      const name = location.search.split("u=");

      return name ? name[1] : false;
    },

    createNaviItem: (item, key) => {
      let iconHtml = '';
      if (item.favicon) {
        // 使用 Google 提供的 favicon 服务，兼容大部分网站
        iconHtml = `<img src="https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(item.url)}" alt="favicon" style="width:2.6em;height:2.6em;vertical-align:middle;">`;
      } else if (item.icon) {
        iconHtml = `<i class="${item.icon}"></i>`;
      } else {
        iconHtml = item.name.substr(0, 1);
      }
      const color = item.color || Math.random().toString(16).substring(-6);

      const el = ks.create("a", {
        href: item.url,
        class: "item",
        attr: [
          {
            name: "data-id",
            value: key ?? -1,
          },
          {
            name: "target",
            value: "_blank",
          },
        ],
        html: (
          `<figure class="navi-icon" style="background: #${color}">
              ${iconHtml}
          </figure>
          <p class="navi-title">${item.name}</p>`
        )
      });

      data.env === "local" && modifys.initDragNavi(el);

      return el;
    },

    // 弹窗和抽屉
    openWindow: (key) => {
      data.window = key;

      obj.window.wrap.classList.add("active");
      obj.window.item[key].classList.add("active");
      obj.window.item[key].classList.add("started");

      // 上次操作可能被取消，强制清除
      obj.window.item[key].classList.remove("closed");

      data.timer = clearTimeout(data.timer);
      data.timer = setTimeout(methods.openWindowEnd, 300);
    },
    openWindowEnd: () => {
      obj.window.item[data.window].classList.remove("started");
    },
    closeWindow: () => {
      obj.window.wrap.classList.remove("active");
      obj.window.item[data.window].classList.add("closed");

      // 上次操作可能被取消，强制清除
      obj.window.item[data.window].classList.remove("started");

      data.timer = clearTimeout(data.timer);
      data.timer = setTimeout(methods.closeWindowEnd, 300);
    },
    closeWindowEnd: () => {
      data.timer = clearTimeout(data.timer);

      obj.window.item[data.window].classList.remove("closed");
      obj.window.item[data.window].classList.remove("active");
      obj.window.wrap.classList.remove("active");
    },

    // 输入 Value 处理
    parseValue: (type, value) => {
      // Checkbox 直接返回 boolean
      if (type === "checked") {
        return value;
      }

      const _checkNumber = Number(value);

      return isNaN(_checkNumber) ? value : _checkNumber;
    },

    // 读取表单转数组
    getMulSelectValue: (el) => {
      let selected = [];

      for (const item of el) {
        item.selected && selected.push(parseInt(item.value));
      }

      return selected;
    },
    // 读取数组转表单
    setMulSelectValue: (el, value) => {
      for (const item of value) {
        el[item].selected = true;
      }
    },
  };

  // 涉及到 DOM 交互的操作
  const modifys = {
    // 全局委托，用于隐藏搜索下拉框
    onBodyClick: (ev) => {
      ev.target.className !== "search-select" && obj.main.search.classList.remove("active");
    },
    // 搜索里面的按钮
    selectSearchButton: () => {
      const { search } = obj.main;

      search.classList.toggle("active");
    },
    submitSearchButton: (e) => {
      e.preventDefault();
      const keyword = obj.main.input.value.trim();
      if (!keyword) {
        ks.notice("请输入搜索内容！", { color: "red", time: 2500 });
        return;
      }
      window.open(data.search_method[data.user_set.search].url.replace("%s", keyword));
    },

    // 右上方的按钮
    hideModifiedButton: () => {
      obj.header.edit.setAttribute("hidden", "");
      obj.header.setting.setAttribute("hidden", "");
    },
    editButton: () => {
      methods.openWindow(3);
    },
    updatedButton: () => {
      methods.openWindow(0);
      localStorage.setItem("paul-ver", data.ver);
      obj.header.updated.classList.remove("active");
    },
    aboutButton: () => {
      methods.openWindow(1);
    },
    settingButton: () => {
      methods.openWindow(2);
    },

    // 导航项点击，创建或删除已经设置的导航项目
    siteItemButton: (ev) => {
      const siteID = Number(ev.target.dataset.id);
      const siteIndex = data.user_set.sites.indexOf(siteID);

      ev.target.classList.toggle("active");

      // 删除
      if (siteIndex > -1) {
        data.user_set.sites.splice(siteIndex, 1);

        obj.main.sites.childNodes[siteIndex].remove();
      }
      // 添加
      else {
        data.user_set.sites.push(siteID);

        const newSiteItem = methods.createNaviItem(data.sites[siteID], siteID, true);

        obj.main.sites.appendChild(newSiteItem);
      }

      methods.setStorage();
    },

    // 设置里面的按钮
    clearButton: () => {
      methods.clearStorage();

      ks.notice("本地设置已清除，刷新页面后将读取默认配置！", { color: "green", time: 5000 });
    },
    inputButton: () => {
      obj.settingBtn.file.click();
    },
    outputButton: () => {
      const blob = new Blob([JSON.stringify(data.user_set, null, 2)], { type: "application/json" });

      obj._internal.link.href = URL.createObjectURL(blob);
      obj._internal.link.download = `userset-${parseInt(new Date().getTime() / 1000)}.json`;
      obj._internal.link.click();

      ks.notice("设置项已经导出，你可以将它上传到 GitHub 仓库以对外展示", { color: "yellow", time: 5000 });
    },
    fileInputChange: (e) => {
      const file = e.target.files && e.target.files[0];

      if (!file) {
        console.log("🔮 也许是不存在的操作？");
        return;
      }

      if (file.type !== "application/json") {
        ks.notice("导入的文件必须是 JSON 格式", { color: "red", time: 3000 });
        return;
      }

      file.text().then((text) => {
        try {
          const json = JSON.parse(text);

          data.user_set = json;
          methods.setStorage();

          ks.notice("导入成功，刷新页面后生效！", { color: "green", time: 5000 });
        }
        catch (e) {
          ks.notice("JSON 文件格式错误，请检查", { color: "red", time: 3000 });
          return;
        }
      });
    },

    // 拖拽导航项目
    onNaviDragStart: (ev) => {
      obj._internal.dragFrom = ev.target;
    },
    onNaviDragOver: (ev) => {
      ev.preventDefault();
    },
    onNaviDrop: (ev) => {
      const from = obj._internal.dragFrom;
      const to = ev.currentTarget;

      const toId = to.getAttribute("data-id");
      const set_sites = data.user_set.sites;

      const _fromIdValue = set_sites.indexOf(Number(from.getAttribute("data-id")));
      const _toIdValue = set_sites.indexOf(Number(toId));

      set_sites.splice(_toIdValue, 0, set_sites.splice(_fromIdValue, 1)[0]);

      if (_fromIdValue > _toIdValue) {
        from.parentElement.insertBefore(from, to);
      }
      else {
        from.parentElement.insertBefore(from, to.nextSibling);
      }

      methods.setStorage();
    },

    // 修改搜索方式
    changeSearch: (key) => {
      data.user_set.search = key;

      if (data.search_method[key].icon) {
        obj.main.select.innerHTML = `<i class="iconfont icon-${data.search_method[key].icon}"></i>`
      }
    },
    // 主题切换
    applyThemeMode: () => {
      // 彻底移除深色模式，始终使用浅色
      const html = document.documentElement;
      html.classList.remove("theme-light", "theme-dark", "theme-auto");
      html.classList.add("theme-light");
      document.body.classList.remove("dark");
      // 保证 select 选项始终为 auto
      if (obj.settings.theme_mode) {
        obj.settings.theme_mode.value = "auto";
        obj.settings.theme_mode.disabled = true;
      }
      data.user_set.theme_mode = "auto";
      methods.setStorage();
    },

    // 初始化背景和深色背景模式检测
    initBackground: () => {
      if (data.user_set.background == 0) {
        obj.main.bg.style = "";
        obj.main.bg.classList.remove('active');
        return;
      }
      let imgUrl, imgSet;
      if (data.user_set.background == data.background_type.length - 1) {
        imgUrl = data.user_set.custom_bg_url;
        imgSet = 'center/cover no-repeat';
        if (!imgUrl) {
          obj.main.bg.style = '';
          obj.main.bg.classList.remove('active');
          return;
        }
      } else {
        imgUrl = data.background_type[data.user_set.background].url;
        imgSet = data.background_type[data.user_set.background].set;
      }
      const img = new window.Image();
      img.crossOrigin = "Anonymous";
      img.src = imgUrl;
      img.onload = () => {
        obj.main.bg.className = 'navi-background type-' + data.user_set.background;
        obj.main.bg.style.background = `url(${img.src}) ${imgSet}`;
        obj.main.bg.classList.add('active');
        // 不再根据深色模式自动加body.dark，背景始终正常
      };
      img.onerror = () => {
        obj.main.bg.style = '';
        obj.main.bg.classList.remove('active');
        ks.notice('壁纸加载失败，请检查图片链接', {color:'red', time:4000});
      };
    },
    // 自动聚焦到搜索框
    focusSearchInput: () => {
      obj.main.input.focus();
    },
    // 初始化媒体查询事件监听
    initMediaQueryListener: () => {
      // prefers-reduced-motion 事件监听
      window.matchMedia("(prefers-reduced-motion: reduce)").addListener((e) => {
        // 当 data.user_set.low_animate 不为 0(自适应) 时，不进行处理
        if(data.user_set.low_animate !== 0) return;

        if (e.matches) {
          document.body.classList.add("low-animate");
          ks.notice("检测到减弱动画模式，已为你减弱动画效果", { color: "green", time: 2000 });
        }
        else {
          document.body.classList.remove("low-animate");
          ks.notice("减弱动画模式关闭，已启用完整动画效果", { color: "green", time: 2000 });
        }
      });
    },
    // 减淡动画
    initLowAnimate: () => {
      // 兼容性处理：对旧配置中 boolean 类型的配置项进行转换
      if (data.user_set.low_animate === true) {
        data.user_set.low_animate = 1;
      }
      else if (data.user_set.low_animate === false) {
        data.user_set.low_animate = 2;
      }

      switch (data.user_set.low_animate) {
        case 1:
          // 开启
          document.body.classList.add("low-animate");
          break;
        case 2:
          // 关闭
          document.body.classList.remove("low-animate");
          break;
        default:
          // 自适应
          window.matchMedia("(prefers-reduced-motion: reduce)").matches
            ? document.body.classList.add("low-animate")
            : document.body.classList.remove("low-animate");
          break;
      }
    },

    // 设置项被修改
    onSettingChange: (name) => {
      if (name === "background") {
        modifys.initBackground();
      }
      else if (name === "search") {
        ks.notice("默认搜索引擎已修改，刷新后生效", { color: "green", time: 3000 });
      }
      else if (name === "low_animate") {
        modifys.initLowAnimate();
      }
      else if (name === "theme_mode") {
        // 彻底移除深色模式，始终使用浅色
        modifys.applyThemeMode();
      }
    },

    // 初始化主体的元素（不受限于用户数据）
    initBody: () => {
      // 全局委托，用于隐藏搜索下拉框
      document.body.onclick = modifys.onBodyClick;

      // 搜索
      obj.main.select.onclick = modifys.selectSearchButton;
      obj.main.submit.onclick = modifys.submitSearchButton;

      data.search_method.forEach((item, key) => {
        const el = ks.create("div", {
          class: "item",
          html: `<i class="iconfont icon-${item.icon}"></i>${item.name}`,
          parent: obj.main.search
        });

        el.onclick = () => modifys.changeSearch(key);
      });

      // 打开按钮
      obj.header.edit.onclick = modifys.editButton;
      obj.header.updated.onclick = modifys.updatedButton;
      obj.header.about.onclick = modifys.aboutButton;
      obj.header.setting.onclick = modifys.settingButton;

      // 关闭面板
      obj.window.wrap.onclick = (e) => {
        const isCloseBtn = e.target.nodeName === "BUTTON" && e.target.dataset.type === "close";
        const isWindow = e.target == obj.window.wrap;

        (isWindow || isCloseBtn) && methods.closeWindow();
      };

      // 关闭按钮悬停 3D 压下效果（持续，移开恢复）
      document.querySelectorAll('.window-close').forEach(btn => {
        btn.addEventListener('mouseenter', function(e) {
          if(document.body.classList.contains('low-animate')) return; // 低动画模式下不加3D效果
          const win = btn.closest('.the-window');
          if (win) win.classList.add('flip');
        });
        btn.addEventListener('mouseleave', function(e) {
          const win = btn.closest('.the-window');
          if (win) win.classList.remove('flip');
        });
      });

      // 四角和四边区域悬停 3D 压下效果
      const windowHeadHoverArea = 80; // px，角落区域宽度
      const windowHeadEdgeArea = 40; // px，边缘区域宽度
      document.querySelectorAll('.the-window').forEach(win => {
        const head = win.querySelector('.window-head');
        if (!head) return;
        head.addEventListener('mousemove', function(e) {
          const rect = head.getBoundingClientRect();
          let flipClass = '';
          // 四角
          if (e.clientX > rect.right - windowHeadHoverArea && e.clientY < rect.top + windowHeadHoverArea) {
            flipClass = 'flip-ru'; // 右上
          } else if (e.clientX < rect.left + windowHeadHoverArea && e.clientY < rect.top + windowHeadHoverArea) {
            flipClass = 'flip-lu'; // 左上
          } else if (e.clientX > rect.right - windowHeadHoverArea && e.clientY > rect.bottom - windowHeadHoverArea) {
            flipClass = 'flip-rd'; // 右下
          } else if (e.clientX < rect.left + windowHeadHoverArea && e.clientY > rect.bottom - windowHeadHoverArea) {
            flipClass = 'flip-ld'; // 左下
          }
          // 四边（不在角落时）
          else if (e.clientX < rect.left + windowHeadEdgeArea) {
            flipClass = 'flip-l'; // 左边
          } else if (e.clientX > rect.right - windowHeadEdgeArea) {
            flipClass = 'flip-r'; // 右边
          } else if (e.clientY < rect.top + windowHeadEdgeArea) {
            flipClass = 'flip-u'; // 上边
          } else if (e.clientY > rect.bottom - windowHeadEdgeArea) {
            flipClass = 'flip-d'; // 下边
          }
          win.classList.remove('flip-ru', 'flip-lu', 'flip-rd', 'flip-ld', 'flip-l', 'flip-r', 'flip-u', 'flip-d');
          if (flipClass) win.classList.add(flipClass);
        });
        head.addEventListener('mouseleave', function() {
          win.classList.remove('flip-ru', 'flip-lu', 'flip-rd', 'flip-ld', 'flip-l', 'flip-r', 'flip-u', 'flip-d');
        });
      });

      // 重置按钮
      obj.settingBtn.reset.onclick = modifys.clearButton;
      obj.settingBtn.input.onclick = modifys.inputButton;
      obj.settingBtn.output.onclick = modifys.outputButton;
      obj.settingBtn.file.onchange = modifys.fileInputChange;

      // 版本更新提示
      if (localStorage.getItem("paul-ver") !== data.ver) {
        obj.header.updated.classList.add("active");
      }
    },

    // 初始化导航项目
    initNavi: () => {
      const { sites, custom } = data.user_set;

      // 用户自定义站点
      if (custom && Array.isArray(custom)) {
        custom.forEach((item) => {
          obj.main.sites.appendChild(methods.createNaviItem(item));
        });
      }

      // 用户选中的预设站点
      if (sites && Array.isArray(sites)) {
        sites.forEach((item) => {
          obj.main.sites.appendChild(methods.createNaviItem(data.sites[item], item));
        });
      }
      else {
        console.error("这个一般不会触发吧？");
      }
    },

    // 初始化设置表单项
    initSettingForm: () => {
      const set = data.user_set;
      for (item in set) {
        if (!obj.settings[item]) continue;
        let type, i = item;
        switch (obj.settings[item].type) {
          case "text": type = "value"; break;
          case "checkbox": type = "checked"; break;
          case "select-one": type = "value"; break;
          case "select-multiple": type = "options"; break;
        }
        if (obj.settings[item].type.indexOf("select") === 0 && obj.settings[item].dataset.key) {
          if (!obj.settings[item].options.length) {
            data[obj.settings[item].dataset.key].forEach((sitem, key) => {
              ks.create("option", {
                text: sitem.name,
                attr: {
                  name: "value",
                  value: key,
                },
                parent: obj.settings[item],
              });
            });
          }
        }
        if (type !== "options") {
          if (item === "theme_mode") {
            obj.settings[item][type] = "auto";
            obj.settings[item].disabled = true;
            data.user_set.theme_mode = "auto";
          } else {
            obj.settings[item][type] = set[item];
          }
          obj.settings[item].onchange = (ev) => {
            if (i === "theme_mode") return;
            data.user_set[i] = methods.parseValue(type, ev.target[type]);
            methods.setStorage();
            modifys.onSettingChange(i);
          };
        } else {
          methods.setMulSelectValue(obj.settings[item], set[item]);
          obj.settings[item].onchange = () => {
            data.user_set[i] = methods.parseValue(type, methods.getMulSelectValue(obj.settings[i]));
            methods.setStorage();
            modifys.onSettingChange(i);
          };
        }
      }

      // 自定义壁纸输入框逻辑
      const bgSelect = obj.settings.background;
      const customBgLabel = document.getElementById('custom-bg-url-label');
      const customBgInput = customBgLabel ? customBgLabel.querySelector('input') : null;
      function updateCustomBgInputDisplay() {
        if(bgSelect && bgSelect.value == data.background_type.length - 1) {
          customBgLabel && (customBgLabel.style.display = 'flex');
          customBgInput && (customBgInput.value = data.user_set.custom_bg_url || '');
        } else {
          customBgLabel && (customBgLabel.style.display = 'none');
        }
      }
      bgSelect && bgSelect.addEventListener('change', updateCustomBgInputDisplay);
      customBgInput && customBgInput.addEventListener('input', function() {
        data.user_set.custom_bg_url = this.value;
        methods.setStorage();
      });
      updateCustomBgInputDisplay();
    },

    // 初始化公共导航列表的拖拽功能
    initDragNavi: (el) => {
      if (el.dataset.id == -1) return;

      el.ondragstart = modifys.onNaviDragStart;
      el.ondragover = modifys.onNaviDragOver;
      el.ondrop = modifys.onNaviDrop;

      el.setAttribute("draggable", true);
    },

    // 初始化抽屉里面的导航项目
    initDrawerItems: () => {
      obj.drawer.sites.innerHTML = ""; // 修复：渲染前先清空内容，防止无内容或重复
      data.sites.forEach((site, key) => {
        const item = ks.create("span", {
          text: site.name,
          attr: {
            name: "data-id",
            value: key,
          },
          parent: obj.drawer.sites,
        });

        if (data.user_set.sites.includes(key)) {
          item.classList.add("active");
        }

        item.onclick = modifys.siteItemButton;
      });
    }
  };

  modifys.initBody();

  // 初始化，先获取预设站点数据
  fetch("site.json").then((res) => res.json()).then((res) => {
    data.sites = res;
    // 站点数据加载后再初始化抽屉内容，防止为空
    modifys.initDrawerItems();
  }).then(() => {
    const user = methods.getUser();

    // 读取在线或本地数据
    if (user) {
      const url = `https://dreamer-paul.github.io/KStart-Sites/${user}.json`;

      console.warn("Web mode");
      data.env = "web";

      return fetch(url).then((res) => res.json()).catch(err => {
        data.env = "local";
        ks.notice("获取数据出错啦", { color: "red" });
        return methods.getStorage();
      });
    }

    console.warn("Local mode");
    data.env = "local";

    return methods.getStorage();
  }).then((userData) => {
    if (userData) {
      methods.setUserSettings(userData);
    }
    // 立即应用主题，防止刷新后丢失
    modifys.applyThemeMode();
    modifys.initNavi();
    modifys.initBackground();
    modifys.initMediaQueryListener();
    modifys.initLowAnimate();

    data.env === "web" && modifys.hideModifiedButton();

    data.user_set.auto_focus && modifys.focusSearchInput();

    modifys.changeSearch(data.user_set.search);
    modifys.initSettingForm();
  });

  // 顶部时间/问候语与切换逻辑（还原：不插入额外div，不控制navi-items和input-box显示）
  // 保留原有页面结构和显示逻辑

  // 恢复右上角按钮显示
  obj.header.edit.style.display = '';
  obj.header.updated.style.display = '';
  obj.header.about.style.display = '';
  obj.header.setting.style.display = '';

  // 移除左下角corner-menu相关JS（如有）
  const oldCornerMenu = document.querySelector('.corner-menu');
  if (oldCornerMenu) oldCornerMenu.remove();

  // 恢复搜索框hover/active逻辑为原样（如有变动）
  const inputBox = document.querySelector('.input-box');
  if (inputBox) {
    inputBox.classList.remove('active');
    inputBox.onmouseenter = null;
    inputBox.onmouseleave = null;
    if (obj.main.input) {
      obj.main.input.onfocus = null;
      obj.main.input.onblur = null;
      obj.main.input.style.textAlign = '';
    }
    obj.main.select.style.display = '';
    obj.main.submit.style.display = '';
  }

  // 搜索框聚焦时背景高斯模糊
  if (obj.main.input) {
    obj.main.input.addEventListener('focus', () => {
      document.body.classList.add('blur-bg-active');
    });
    obj.main.input.addEventListener('blur', () => {
      document.body.classList.remove('blur-bg-active');
    });
  }
}

KStart();

// 删除天气API小部件相关JS代码（已用iframe替代）
// 全局网页跳转加载动画
(function(){
  // 创建加载动画元素
  const loader = document.createElement('div');
  loader.id = 'global-page-loader';
  loader.style.cssText = `
    position: fixed;left:0;top:0;width:100vw;height:100vh;z-index:99999;
    background: rgba(255,255,255,0.85);display:none;align-items:center;justify-content:center;
    transition: opacity .3s;pointer-events:none;
  `;
  loader.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;gap:1em;">'
    + '<img src="static/icon.png" alt="loading" style="width:64px;height:64px;border-radius:16px;box-shadow:0 2px 12px #158e23;">'
    + '<div style="font-size:1.3em;color:#158e23;"><i class="fa fa-spinner fa-spin"></i> 正在加载...</div>'
    + '</div>';
  document.body.appendChild(loader);

  // 监听页面所有a标签点击
  document.addEventListener('click', function(e){
    let a = e.target;
    // 向上查找a标签
    while(a && a.tagName !== 'A') a = a.parentElement;
    if(!a) return;
    // 排除锚点、js、下载、mailto、tel、target=_blank等
    const href = a.getAttribute('href');
    if(!href || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:') || a.target === '_blank') return;
    // 显示加载动画
    loader.style.display = 'flex';
    loader.style.opacity = '1';
    // 延迟跳转，保证动画可见
    setTimeout(()=>{ window.location.href = href; }, 120);
    e.preventDefault();
  }, true);

  // 页面加载完毕后隐藏动画
  window.addEventListener('pageshow', ()=>{
    loader.style.opacity = '0';
    setTimeout(()=>{ loader.style.display = 'none'; }, 300);
  });
})();
