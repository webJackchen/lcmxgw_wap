(function($){
    var distY = 0;
    var dist = 0;
    var i = 0;
    addEvent(document,"touchstart",function(ev){
        var touch = ev.changedTouches[0];
        distY = touch.pageY;
        console.log(i++);
    });
    addEvent(document,"touchmove",function(ev){
        var touch = ev.changedTouches[0];
        dist = touch.pageY - distY;
        if( dist < 0 && Math.abs(dist) > 20 ){
            document.write("up");
        }else if( dist > 0 && Math.abs(dist) > 20 ){
            document.write("down");
        }
    })
    addEvent(document,"touchend",function(ev){
        dist = 0;
    })
    function addEvent(obj,event,fn){
        if(document.addEventListener){
            obj.addEventListener(event,fn,false);
        }else{
            attachEvent(obj,fn);
        }
    }
})($)
