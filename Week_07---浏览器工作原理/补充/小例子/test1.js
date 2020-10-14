let data = {
    products: [{child: [{id: 1}, {id: 3}]}, {child: [{id: 4}, {id: 5}]}],
    _index: 1
};

function getField(object, key) {
    let keys = key + '/';
    let result = null;
    let current = object;
    let attributeValue = '';

    let state = start;
    for (let c of keys) {
        state = state(c);
        if (state === end) return false;
    }
    return current;

    function end() {
        return end;
    }

    function start(c) {
        if (c === "[") {
            if (current[attributeValue]) {
                current = current[attributeValue];
                attributeValue = '';
                return betweenAttributeBefore;
            } else {
                return end;
            }
        } else if (c.match(/^[a-zA-z]$/)) {
            attributeValue += c;
            return start;
        } else if (c === '/') {   // 自定义结束标识
            return betweenAttribute(c);
        } else {
            result = null
            return end;
        }
    }

    function Restart(c) {
        if (c === "[" || c === ".") {
            return betweenAttributeBefore;
        } else if (c === "]") {
            return Restart;
        } else if (c.match(/^[a-zA-z]$/)) {
            attributeValue += c;
            return start;
        } else {
            result = null
            return end;
        }
    }

    function betweenAttributeBefore(c) {
        if (c instanceof Number || /^\d+$/.test(c)) {
            current = current[Number(c)];
            return Restart;
        } else if (c === "[" || c === "]" || c === ".") {
            return betweenAttribute(c);
        } else if (c === '/') {   // 自定义结束标识
            return betweenAttribute(c);
        } else {
            attributeValue += c;
            return betweenAttributeBefore;
        }
    }

    function betweenAttribute(c) {
        let arrAttr = Object.keys(object);
        if (arrAttr.includes(attributeValue)) {
            current = current[object[attributeValue]];
            attributeValue = '';
            return c === "[" ? betweenAttributeBefore : Restart;
        } else if (current[attributeValue]) {
            current = current[attributeValue];
            attributeValue = '';
            return c === "[" ? betweenAttributeBefore : Restart;
        } else {
            result = null
            return end;
        }
    }


}

// console.log(getField(data, "products"));
console.log(getField(data, "products[_index].child[0].id"));
console.log(getField(data, "products[1].child[_index].id"));
console.log(getField(data, "products[_index].child[_index].id"));

console.log(getField(data, "product[_index].child[_index].id"));
console.log(getField(data, "products[_index].child[_index].is"));


