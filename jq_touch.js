//
//(function ($) {
//    "use strict";
//
//    var touch = {},
//        touchTimeout, tapTimeout, swipeTimeout, longTapTimeout,
//        longTapDelay = 750,
//        gesture;
//
//    function swipeDirection(x1, x2, y1, y2) {
//        return Math.abs(x1 - x2) >=
//            Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down');
//    }
//
//    function longTap() {
//        longTapTimeout = null;
//        if (touch.last) {
//            touch.el.trigger('longTap');
//            touch = {};
//        }
//    }
//
//    function cancelLongTap() {
//        if (longTapTimeout) {
//            clearTimeout(longTapTimeout);
//        }
//        longTapTimeout = null;
//    }
//
//    function cancelAll() {
//        if (touchTimeout) {
//            clearTimeout(touchTimeout);
//        }
//        if (tapTimeout) {
//            clearTimeout(tapTimeout);
//        }
//        if (swipeTimeout) {
//            clearTimeout(swipeTimeout);
//        }
//        if (longTapTimeout) {
//            clearTimeout(longTapTimeout);
//        }
//        touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null;
//        touch = {};
//    }
//
//    function isPrimaryTouch(event) {
//        return (event.pointerType === 'touch' ||
//            event.pointerType === event.MSPOINTER_TYPE_TOUCH) && event.isPrimary;
//    }
//
//    function isPointerEventType(e, type) {
//        return (e.type === 'pointer' + type ||
//            e.type.toLowerCase() === 'mspointer' + type);
//    }
//
//    $(document).ready(function () {
//        var now, delta, deltaX = 0, deltaY = 0, firstTouch, _isPointerType;
//
//        if ('MSGesture' in window) {
//            gesture = new MSGesture();
//            gesture.target = document.body;
//        }
//
//        $(document)
//            .on('MSGestureEnd', function (e) {
//                e = e.originalEvent;
//                var swipeDirectionFromVelocity =
//                    e.velocityX > 1 ? 'Right' : e.velocityX < -1 ? 'Left' : e.velocityY > 1 ? 'Down' : e.velocityY < -1 ? 'Up' : null;
//                if (swipeDirectionFromVelocity) {
//                    touch.el.trigger('swipe');
//                    touch.el.trigger('swipe' + swipeDirectionFromVelocity);
//                }
//            })
//            .on('touchstart MSPointerDown pointerdown', function (e) {
//                e = e.originalEvent;
//                if ((_isPointerType = isPointerEventType(e, 'down')) && !isPrimaryTouch(e)) {
//                    return;
//                }
//                firstTouch = _isPointerType ? e : e.touches[0];
//                if (e.touches && e.touches.length === 1 && touch.x2) {
//                    touch.x2 = undefined;
//                    touch.y2 = undefined;
//                }
//                now = Date.now();
//                delta = now - (touch.last || now);
//                touch.el = $('tagName' in firstTouch.target ?
//                    firstTouch.target : firstTouch.target.parentNode);
//                if (touchTimeout) {
//                    clearTimeout(touchTimeout);
//                }
//                touch.x1 = firstTouch.pageX;
//                touch.y1 = firstTouch.pageY;
//                if (delta > 0 && delta <= 250) {
//                    touch.isDoubleTap = true;
//                }
//                touch.last = now;
//                longTapTimeout = setTimeout(longTap, longTapDelay);
//                if (gesture && _isPointerType) {
//                    gesture.addPointer(e.pointerId);
//                }
//            })
//            .on('touchmove MSPointerMove pointermove', function (e) {
//                e = e.originalEvent;
//                if ((_isPointerType = isPointerEventType(e, 'move')) && !isPrimaryTouch(e)) {
//                    return;
//                }
//                firstTouch = _isPointerType ? e : e.touches[0];
//                cancelLongTap();
//                touch.x2 = firstTouch.pageX;
//                touch.y2 = firstTouch.pageY;
//
//                deltaX += Math.abs(touch.x1 - touch.x2);
//                deltaY += Math.abs(touch.y1 - touch.y2);
//            })
//            .on('touchend MSPointerUp pointerup', function (e) {
//                e = e.originalEvent;
//                if ((_isPointerType = isPointerEventType(e, 'up')) && !isPrimaryTouch(e)) {
//                    return;
//                }
//                cancelLongTap();
//
//                // swipe
//                if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
//                    (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30)) {
//                    swipeTimeout = setTimeout(function () {
//                        touch.el.trigger('swipe');
//                        touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)));
//                        touch = {};
//                    }, 0);
//                }
//                else if ('last' in touch) {
//                    if (deltaX < 30 && deltaY < 30) {
//                        tapTimeout = setTimeout(function () {
//                            var event = $.Event('tap');
//                            event.cancelTouch = cancelAll;
//                            touch.el.trigger(event);
//                            if (touch.isDoubleTap) {
//                                if (touch.el) {
//                                    touch.el.trigger('doubleTap');
//                                }
//                                touch = {};
//                            }
//                            else {
//                                touchTimeout = setTimeout(function () {
//                                    touchTimeout = null;
//                                    if (touch.el) {
//                                        touch.el.trigger('singleTap');
//                                    }
//                                    touch = {};
//                                }, 250);
//                            }
//                        }, 0);
//                    } else {
//                        touch = {};
//                    }
//                }
//                deltaX = deltaY = 0;
//
//            })
//            .on('touchcancel MSPointerCancel pointercancel', cancelAll);
//        $(window).on('scroll', cancelAll);
//    });
//
//    $.each(['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown',
//        'doubleTap', 'tap', 'singleTap', 'longTap'], function (index, item) {
//        $.fn[item] = function (callback) {
//            return this.on(item, callback);
//        };
//    });
//})(jQuery);



(function($){
    var doc = $(document),
        section = $("#page .section"),
        up = $("#up");
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
        this.swipe();
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
            document.addEventListener('touchstart', touchSatrtFunc, false);
            document.addEventListener('touchmove', touchMoveFunc, false);
            document.addEventListener('touchend', touchEndFunc, false);
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
        //touchstart事件
        function touchSatrtFunc(evt) {
            try
            {
                evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等

                var touch = evt.touches[0]; //获取第一个触点
                var y = Number(touch.pageY); //页面触点Y坐标
                //记录触点初始位置
                startY = y;

            }
            catch (e) {
                alert('touchSatrtFunc：' + e.message);
            }
        }

        //touchmove事件，这个事件无法获取坐标
        function touchMoveFunc(evt) {
            try
            {
                evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
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

        //touchend事件
        function touchEndFunc(evt) {
            try {
                evt.preventDefault(); //阻止触摸时浏览器的缩放、滚动条滚动等
            }
            catch (e) {
                alert('touchEndFunc：' + e.message);
            }
        }

    }




})($)


