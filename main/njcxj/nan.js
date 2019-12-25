var btn = document.getElementById('btn');
var spread = document.getElementById('spread');
var iSpread = false;
/*高度*/
var height = spread.scrollHeight;
/*总时间*/
var time = 420;
/*间隔*/
var interval = 8.4;
/*速度*/
var speed = height/(time/interval);
/*点击事件*/
btn.onclick = function (e) {
    btn.disabled = 'disabled';
    if(!iSpread){
        var speeds = 0;
        var timer = setInterval(function () {
            speeds += speed;
            spread.style.height = speeds + 'px';

            if(parseInt(spread.style.height) >=height){
                clearTimeout(timer);
                btn.disabled = '';
            }
        },interval)
        this.innerHTML = '收回';
    }else {
        var speeds = height
        this.innerHTML = '更多介绍';
        var timer = setInterval(function () {
            speeds -= speed
            spread.style.height = speeds + 'px';
            if(speeds <= 0){
                clearTimeout(timer)
                btn.disabled = '';
            }
        },interval);
    }
    iSpread = !iSpread;
}


function getStyle(obj, attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, null)[attr];
	}
}
function animate(obj,json,callback){
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var isStop = true;
		for(var attr in json){
			var now = 0;
			if(attr == 'opacity'){
				now = parseInt(getStyle(obj,attr)*100);
			}else{
				now = parseInt(getStyle(obj,attr));
			}
			var speed = (json[attr] - now) / 8;
			speed = speed>0?Math.ceil(speed):Math.floor(speed);
			var cur = now + speed;
			if(attr == 'opacity'){
				obj.style[attr] = cur / 100;
			}else{
				obj.style[attr] = cur + 'px';
			}
			if(json[attr] !== cur){
				isStop = false;
			}
		}
		if(isStop){
			clearInterval(obj.timer);
			callback&&callback();
		}
	}, 30)
}
var box = document.getElementById('box');
var oNavlist = document.getElementById('nav').children;
var slider = document.getElementById('slider');
var left = document.getElementById('left');
var right = document.getElementById('right');
var index = 1;
var isMoving = false;
//前进
function next(){
	if(!isMoving){
		isMoving = true;
		index++;
		nacvhange();
		animate(slider,{left:-630*index},function(){
			if(index === 6){
			slider.style.left == "-630px";
			index =1;
			}
			isMoving = false;
		});
	}	
} 
//后退
function prev(){
	if(isMoving){
		return;
	}
	isMoving = true;
	index--;
	nacvhange();
	animate(slider,{left:-630*index},function(){
		if(index === 0){
			slider.style.left == "-3150px";
			index =5;
		}
		isMoving = false;	
	});
}
var timer =setInterval(next, 3000);
// 鼠标划入清定时器
box.onmouseover = function(){
	animate(left,{opacity:50});
	animate(right,{opacity:50});
	clearInterval(timer);
}
// 鼠标划出开定时器
box.onmouseout = function(){
	animate(left,{opacity:0});
	animate(right,{opacity:0});
	timer = setInterval(next,3000);
}
right.onclick = next;
left.onclick = prev;
for(var i = 0 ;i<oNavlist.length;i++){
	oNavlist[i].idx = i;
	oNavlist[i].onclick = function(){
		index = this.idx +1;
		nacvhange();
		animate(slider,{left:-630*index})
	}
}
//小按钮背景色
function nacvhange(){
	for(var i = 0 ; i<oNavlist.length;i++){
		oNavlist[i].className = '';
	}
	if(index == 6){
		oNavlist[0].className = 'active';
	}else if(index == 0){
		oNavlist[4].className = 'active';
	}else{
		oNavlist[index-1].className = 'active';
	}			
}
// 评论

//评论信息储存
var comments = ["差", "一般", "中等", "还行", "好"];

//获取页面元素
var imgs=new Array()
imgs[0] = document.getElementById('im1');
imgs[1] = document.getElementById('im2');
imgs[2] = document.getElementById('im3');
imgs[3] = document.getElementById('im4');
imgs[4] = document.getElementById('im5');

var text = document.getElementById("txtc");
var clickPos = -1;

function show(index) {
    for (var x = (index + 1); x < imgs.length; x++) { //清空
        imgs[x].src = "imp/star0.png";
    }
    if (index < 2) { //哭脸
        for (var j = 0; j <= index; j++) {
            imgs[j].src = "imp/star1.png";
        }
    } else { //笑脸
        for (var j = 0; j <= index; j++) {
            imgs[j].src = "imp/star2.png";
        }
    }
    text.value = comments[index]? comments[index]:"";

}

for (var i = 0; i < imgs.length; i++) {
    imgs[i].index = i;
    //悬浮
    imgs[i].onmouseover = function() {
        var pos = this.index;
        show(pos);
    };

    //点击
    imgs[i].onclick = function() {
        clickPos = this.index;
        show(clickPos);
    };

    //离开
    imgs[i].onmouseout = function() {
        show(clickPos);
    };
}