// let callbacks = []
let callbacks = new Map();

let usedReactivties = [];

let object = {
    a: 1,
    b: 2
}
let po = reactive(object);

effect(() => {
    console.log(po.a);
})

function effect(callback) {
    usedReactivties = [];
    callback();
    console.log(usedReactivties);

    for (let reactivity of usedReactivties) {
        if (!callbacks.has(reactivity[0])) {
            callbacks.set(reactivity[0], new Map());
        }
        if (!callbacks.get(reactivity[0]).has(reactivity[1])) {
            callbacks.get(reactivity[0]).set(reactivity[1], []);
        }
        callbacks.get(reactivity[0]).get(reactivity[1]).push(callback)
    }
}

function reactive(object) {
    return new Proxy(object, {
        set(obj, prop, val) {
            obj[prop] = val;
            // 这里我们尝试再改变 for 循环的做法，因为有索引了，所以说我们就不需要去循环整个的 callbacks 了，
            // 直接去给这个 callbacks[0] , if 这个东西没有，那么我们让它 if 有吧，然后我们给它加到这个 for 循环的条件上，
            // 那么第二层就也需要有，有对象，有属性， 然后那么我们就可以写这个 for 循环了，写for循环里面呢，我们 callbacks，我们就用
            // 这个来代替，
            if (callbacks.get(obj)) {
                console.log(11111);
                if (callbacks.get(obj).get(prop)) {
                    for (let callback of callbacks.get(obj).get(prop)) {
                        callback();
                    }
                }
            }
            return obj[prop];
        },
        get(obj, prop) {
            usedReactivties.push(obj, prop);
            return obj[prop];
        }
    })
}


// 测试
// 可以发现改 po.b 的时候，这 effect 没有被触发执行，也就是说这样的话，我们就已经正确的完成了effect 的最终的效果，
// 那么当然了，我们这个代码，是写的是比较粗糙的，也没有考虑到解除的效果，
// 但是我们的这段代码，其实基本上已经演示了 reactivity 它的实现的原理，
po.b = 2


