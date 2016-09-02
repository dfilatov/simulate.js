
!function(){

function extend(dst, src){
    for (var key in src)
        dst[key] = src[key]
    return src
}
    
var Simulate = {
    event: function(element, eventName){
        if (document.createEvent) {
            var evt = document.createEvent("HTMLEvents")
            evt.initEvent(eventName, events[eventName].bubbles, events[eventName].cancelable)
            element.dispatchEvent(evt)
        }else{
            var evt = document.createEventObject()
            element.fireEvent('on' + eventName,evt)
        }
    },
    keyEvent: function(element, type, options){
        var evt,
            e = {
            bubbles: true, cancelable: true, view: window,
          	ctrlKey: false, altKey: false, shiftKey: false, metaKey: false,
          	keyCode: 0, charCode: 0
        }
        extend(e, options)
        if (document.createEvent){
            try{
                evt = document.createEvent('KeyEvents')
                evt.initKeyEvent(
                    type, e.bubbles, e.cancelable, e.view,
    				e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
    				e.keyCode, e.charCode)
    			element.dispatchEvent(evt)
    		}catch(err){
    		    evt = document.createEvent("Events")
				evt.initEvent(type, e.bubbles, e.cancelable)
				extend(evt, {
				    view: e.view,
					ctrlKey: e.ctrlKey, altKey: e.altKey,
					shiftKey: e.shiftKey, metaKey: e.metaKey,
					keyCode: e.keyCode, charCode: e.charCode
				})
				element.dispatchEvent(evt)
    		}
        }
    }
}

Simulate.keypress = function(element, chr){
    var charCode = chr.charCodeAt(0)
    this.keyEvent(element, 'keypress', {
        keyCode: charCode,
        charCode: charCode
    })
}

Simulate.keydown = function(element, chr){
    var charCode = chr.charCodeAt(0)
    this.keyEvent(element, 'keydown', {
        keyCode: charCode,
        charCode: charCode
    })
}

Simulate.keyup = function(element, chr){
    var charCode = chr.charCodeAt(0)
    this.keyEvent(element, 'keyup', {
        keyCode: charCode,
        charCode: charCode
    })
}

var events = {
    click: { bubbles: true, cancelable: true },
    focus: { bubbles: false, cancelable: false },
    blur: { bubbles: false, cancelable: false },
    focusin: { bubbles: true, cancelable: false },
    focusout: { bubbles: true, cancelable: false },
    dblclick: { bubbles: true, cancelable: true },
    input: { bubbles: true, cancelable: false },
    change: { bubbles: true, cancelable: false },
    mousedown: { bubbles: true, cancelable: true },
    mousemove: { bubbles: true, cancelable: true },
    mouseout: { bubbles: true, cancelable: true },
    mouseover: { bubbles: true, cancelable: true },
    mouseup: { bubbles: true, cancelable: true },
    resize: { bubbles: true, cancelable: true },
    scroll: { bubbles: false, cancelable: false },
    select: { bubbles: false, cancelable: false },
    submit: { bubbles: true, cancelable: true },
    load: { bubbles: false, cancelable: false },
    unload: { bubbles: false, cancelable: false }
}

for (var eventName in events){
    Simulate[eventName] = (function(eventName){
        return function(element){
            this.event(element, eventName)
        }
    }(eventName))
}

if (typeof module !== 'undefined'){
    module.exports = Simulate
}else if (typeof window !== 'undefined'){
    window.Simulate = Simulate
}else if (typeof define !== 'undefined'){
    define(function(){ return Simulate })
}

}()
