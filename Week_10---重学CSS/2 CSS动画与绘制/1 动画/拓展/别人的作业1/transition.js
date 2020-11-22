const tweenFns = {
    linear: (from, to, t, d) => from + (to - from) * (t / d)
}

/**
 * only support "linear" timing-function
 * duration unit is "ms"
 * @param {HTMLElement} el
 * @param {({prop: String, value: String, duration: Number})[]} list
 */
function transitionTo(el, list) {
    let startTime
    let oldStyle = new Map()
    let newStyle = new Map()
    for (let prop of list) {
        oldStyle.set(prop.name, window.getComputedStyle(el)[prop.name])
    }
    for (let prop of list) {
        el.style[prop.name] = prop.value
    }
    for (let prop of list) {
        newStyle.set(prop.name, window.getComputedStyle(el)[prop.name])
    }
    for (let prop of list) {
        el.style[prop.name] = oldStyle.get(prop.name)
    }


    requestAnimationFrame(run)

    function run(time) {
        if (startTime == null) startTime = time
        let t = time - startTime
        let done = true
        for (let prop of list) {
            if (t >= prop.duration) {
                el.style[prop.name] = newStyle.get(prop.name)
                continue
            }
            done = false
            let oldPropValue = oldStyle.get(prop.name)
            let newPropValue = newStyle.get(prop.name)
            if (prop.name === 'transform') {
                if (oldPropValue === 'none') oldPropValue = 'matrix(1, 0, 0, 1, 0, 0)'
                if (newPropValue === 'none') newPropValue = 'matrix(1, 0, 0, 1, 0, 0)'
            }
            el.style[prop.name] = generateNewStyle(oldPropValue, newPropValue, t, prop.duration, tweenFns.linear)
        }
        if (!done) requestAnimationFrame(run)
    }
}

function generateNewStyle(from, to, t, duration, tweenFn) {
    let fromExp = /[\d.-]+/g
    let toExp = /[\d.-]+/g
    let fromMatch
    let toMatch
    let result = ''
    let lastIndex = 0
    while (fromMatch = fromExp.exec(from)) {
        result += from.slice(lastIndex, fromMatch.index)
        toMatch = toExp.exec(to)
        result += tweenFn(+fromMatch[0], +toMatch[0], t, duration)
        lastIndex = fromExp.lastIndex
    }
    result += from.slice(lastIndex)
    return result
}
