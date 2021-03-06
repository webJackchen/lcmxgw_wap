
(function($){
    var doc = $(document),
        section = $("#page .section"),
        up = $("#up"),
        logo = $("#logo");
        nowIndex = 0,
        lastIndex = 0,
        winH = $(window).height(),
        canScroll = true;

    var settings = {
        afterFnArr : [],
        leaveFnArr :[],
        start:0
    }
    $.MyScroll = function(){}
    $.MyScroll.prototype.init = function(opt){
        $.extend(settings,opt || {});
        nowIndex = settings.start;
        lastIndex = nowIndex;

        nowIndex = settings.start;
        section.eq(nowIndex).fadeIn(200);
        settings.afterFnArr[nowIndex]();
        if(nowIndex != section.length-1){
            up.fadeIn(8000);
        }
        logo.animate({
            top:15
        },1000)
        this.swipe();
        this.handclick();
    }
    var sp = $.MyScroll;
    $.MyScroll.prototype.swipe = function(){
        var This = this;
        var status = true;
        var status1 = true;
        var starY = 0;
        isTouchDevice();
        //绑定事件
        function bindEvent() {
            addEvent(document,'touchstart', touchSatrtFunc);
            addEvent(document,'touchmove', touchMoveFunc);
            addEvent(document,'touchend', touchEndFunc);
        }
        //判断是否支持触摸事件
        function isTouchDevice() {
            try {
                document.createEvent("TouchEvent");
                bindEvent(); //绑定事件
            }
            catch (e) {
                alert("不支持TouchEvent事件！" + e.message);
            }
        }
        function touchSatrtFunc(evt) {
            try
            {
                console.log(evt.target.tagName.toLowerCase())
                if(evt.target.tagName.toLowerCase() != "a"&& evt.target.tagName.toLowerCase() != "img"){
                    evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
                }
                var touch = evt.touches[0]; //获取第一个触点
                var y = Number(touch.pageY); //页面触点Y坐标
                startY = y;
            }
            catch (e) {
                alert('touchSatrtFunc：' + e.message);
            }
        }
        function touchMoveFunc(evt) {
            try
            {
                if(evt.target.tagName.toLowerCase() != "a" && evt.target.tagName.toLowerCase() != "img"){
                    evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
                }
                var touch = evt.touches[0]; //获取第一个触点
                var y = Number(touch.pageY); //页面触点Y坐标
                //判断滑动方向
                if (y - startY > 0 && Math.abs(y - startY)>20 && status1) {
                    status1 = false;
                    lastIndex = nowIndex;
                    if(nowIndex == 0){
                        status = false;
                        status1 = true;
                    }else{
                        status = true;
                        nowIndex --;
                    }
                    if( status ){
                        settings.leaveFnArr[lastIndex]();
                        section.eq(lastIndex).fadeOut(1000);
                        if(nowIndex == section.length-1){
                            up.hide();
                        }else{
                            up.fadeIn(2500);
                        }
                        section.eq(nowIndex).delay(1000).fadeIn(200,function(){
                            settings.afterFnArr[nowIndex]();
                            status1 = true;
                        })
                    }
                }else if(y - startY < 0 && Math.abs(y - startY)>20 && status1){
                    status1 = false;
                    lastIndex = nowIndex;
                    if(nowIndex == section.length-1){
                        status = false;
                        status1 = true;
                    }else{
                        status = true;
                        nowIndex ++;
                    }
                    if( status ){
                        settings.leaveFnArr[lastIndex]();
                        section.eq(lastIndex).fadeOut(1000);
                        if(nowIndex == section.length-1){
                            up.hide();
                        }else{
                            up.fadeIn(2500);
                        }
                        section.eq(nowIndex).delay(1000).fadeIn(200,function(){
                            settings.afterFnArr[nowIndex]();
                            status1 = true;
                        })
                    }
                }
            }
            catch (e) {
                alert('touchMoveFunc：' + e.message);
            }
        }
        function touchEndFunc(evt) {
            try {
                if(evt.target.tagName.toLowerCase() != "a"&& evt.target.tagName.toLowerCase() != "img"){
                    evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
                }
            }
            catch (e) {
                alert('touchEndFunc：' + e.message);
            }
        }
        function addEvent(obj,event,fn){
            if( document.addEventListener ){
                obj.addEventListener(event,fn,false);
            }else{
                attachEvent("on" + event,fn);
            }
        }
    }
    $.MyScroll.prototype.handclick = function(){
        var goUp = up.find("img");
        goUp.on("touchstart",function(){
            lastIndex = nowIndex;
            if(nowIndex == section.length-1){
                status = false;
                status1 = true;
            }else{
                status = true;
                nowIndex ++;
            }
            if( status ){
                settings.leaveFnArr[lastIndex]();
                section.eq(lastIndex).fadeOut(1000);
                if(nowIndex == section.length-1){
                    up.hide();
                }else{
                    up.fadeIn(2500);
                }
                section.eq(nowIndex).delay(1000).fadeIn(200,function(){
                    settings.afterFnArr[nowIndex]();
                    status1 = true;
                })
            }
        })
    }
})($)


