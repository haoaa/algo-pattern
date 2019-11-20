> git-bash添加xx命令: 下载xx for windows到`C:\Program Files\Git\usr\bin`

### 目录结构

```
src
|-- close.js
|-- core.js
|-- default
|   |-- _animate.js   
|   `-- handleEvent.js
|-- indicator
|   |-- _initIndicators.js
|   |-- _transitionTime.js
|   |-- _transitionTimingFunction.js
|   |-- _translate.js
|   |-- build.json   
|   `-- indicator.js 
|-- infinite
|   |-- build.json   
|   |-- infinite.js  
|   `-- refresh.js 
|-- keys
|   |-- build.json 
|   `-- keys.js    
|-- open.js        
|-- probe
|   |-- _animate.js       
|   |-- _move.js
|   |-- build.json        
|   |-- indicator._move.js
|   `-- probe.js
|-- snap
|   |-- _end.js   
|   |-- build.json
|   |-- refresh.js
|   `-- snap.js   
|-- utils.js      
|-- wheel
|   |-- build.json
|   `-- wheel.js  
`-- zoom
    |-- build.json
    |-- handleEvent.js
    |-- refresh.js
    `-- zoom.js
```

### bundle zoom
打包通过拼接模块文件来实现, 主要模块+功能模块
file list包含所有代码的文件, postProcessing对代码中的变量进行替换或插入

file list: 
[
"open.js", 
"utils.js", 
"core.js", 
"indicator/_initIndicators.js", 
"zoom/zoom.js", 
"wheel/wheel.js", 
"snap/snap.js", 
"keys/keys.js", 
"default/_animate.js", 
"zoom/handleEvent.js", 
"indicator/indicator.js",
"close.js"
]

postProcessing: [ 'zoom/build.json', 'indicator/build.json', 'wheel/build.json', 'snap/build.json', 'keys/build.json' ]

```js
if ( releases[release].postProcessing ) {
  releases[release].postProcessing.forEach(function (file) {
    var postProcessing = require('./src/' + file);

    // Insert point
    for ( var i in postProcessing.insert ) {
      out = out.replace('// INSERT POINT: ' + i, value + '\n\n// INSERT POINT: ' + i );
    }

    // Replace
    for ( i in postProcessing.replace ) {
      var regex = new RegExp('\\/\\* REPLACE START: ' + i + ' \\*\\/[\\s\\S]*\\/\\* REPLACE END: ' + i + ' \\*\\/');
      out = out.replace(regex, '/* REPLACE START: ' + i + ' */' + value + '/* REPLACE END: ' + i + ' */');
    }
  });
}
```

### 初始化

创建util(raf,事件绑定,事件类型,自定义事件,样式操作,动画惯性,tween,计算边距等)

构造函数,选项覆盖
```js
function IScroll (el, options) {
  this.options = {
    ...
  }
  for ( var i in options ) {
		this.options[i] = options[i];
  }
  this._init();
	this.refresh();

	this.scrollTo(this.options.startX, this.options.startY); 滚动起始位置
	this.enable(); // 开启事件处理
}
```

初始化_init(_initEvents,_initZoom, refresh)
```js
// 事件绑定回调绑定Sroll对象, 事件触发时会调用scroll对象上的handleEvent(e)方法
eventType(target, 'touchmove', this);

_initZoom: function () {
  this.scrollerStyle[utils.style.transformOrigin] = '0 0';
},

//重新计算滚动对象的宽高和滚动边界
refresh() {
  this.wrapperWidth	= this.wrapper.clientWidth;
  this.wrapperHeight	= this.wrapper.clientHeight;
	this.scrollerWidth	= Math.round(this.scroller.offsetWidth * this.scale);
	this.scrollerHeight	= Math.round(this.scroller.offsetHeight * this.scale);

	this.maxScrollX		= this.wrapperWidth - this.scrollerWidth;
	this.maxScrollY		= this.wrapperHeight - this.scrollerHeight;
}
```

内部事件模式on,off,_execEvent

### 事件开始结束...