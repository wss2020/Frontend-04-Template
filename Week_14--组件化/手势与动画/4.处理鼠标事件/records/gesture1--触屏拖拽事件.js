let element = document.documentElement;

element.addEventListener("mousedown", event => {

    console.log(event.button);
    start(event);

    let mousemove = event => {
        move(event);
    }
    let mouseup = event => {
        end(event);
        element.removeEventListener("mousemove", mousemove);
        element.removeEventListener("mouseup", mouseup);
    }
    element.addEventListener("mousemove", mousemove);
    element.addEventListener("mouseup", mouseup);
})

let contexts = new Map();

element.addEventListener("touchstart", event => {
    for (let touch of event.changedTouches) {
        let context = Object.create(null);
        contexts.set(touch.identifier, context);
        start(touch, context);
    }
})

element.addEventListener("touchmove", event => {
    for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        move(touch, context);
    }
})

element.addEventListener("touchend", event => {
    for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        end(touch, context);
        contexts.delete(touch.identifier);
    }
})

element.addEventListener("touchcancel", event => {
    for (let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        cancel(touch, context);
        contexts.delete(touch.identifier);
    }
})


let start = (point, context) => {
    //console.log("start", point.clientX, point.clientY)
    context.startX = point.clientX, context.startY = point.clientY;

    context.isTap = true;
    context.isPan = false;
    context.isPress = false;

    context.handler = setTimeout(() => {
        context.isTap = false;
        context.isPan = false;
        context.isPress = true;
        context.handler = null;
        console.log("press");
    }, 500);
}

let move = (point, context) => {
    //console.log("move", point.clientX, point.clientY)
    let dx = point.clientX - context.startX, dy = point.clientY - context.startY;

    if (!context.isPan && dx ** 2 + dy ** 2 > 100) {
        context.isTap = false;
        context.isPan = true;
        context.isPress = false;
        console.log('panStart');
        clearTimeout(context.handler);
    }

    if (context.isPan) {
        console.log(dx, dy);
        console.log("pan");
    }
}

let end = (point, context) => {
    if (context.isTap) {
        console.log("tap");
        clearTimeout(context.handler);
    }
    if (context.isPan) {
        console.log('panEnd');
    }
    if (context.isPress) {
        console.log('pressEnd');
    }
    //console.log("end", point.clientX, point.clientY)
}

let cancel = (point, context) => {
    clearTimeout(context.handler);
    //console.log("cancel", point.clientX, point.clientY)
}

















