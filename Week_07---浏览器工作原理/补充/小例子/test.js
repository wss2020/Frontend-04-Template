// 状态模式
let data = {
    products: [  {child: [{id: 1}, {id: 3}]},    {child: [{id: 4}, {id: 5}]}  ],
    _index: 1
};
function getField(object, key) {
    let parts = key.split('.');
    if (parts.length == 1) {
        let index1 = key.indexOf('[')
        let index2 = key.indexOf(']')
        if (index1 > 0 && index2 - index1 > 1) {
            let field = key.substr(0, index1);
            let f = object[field];
            if (f == null) {
                return null;
            }
            if (f instanceof Array) {
                let indexName = key.substr(index1 + 1, index2 - index1 - 1);
                let index = parseInt(indexName);
                if(isNaN(index)) {
                    index = getField(object, indexName);
                    if(index == null) {
                        return null;
                    }
                }
                if (f.length > index) {
                    return f[index];
                } else {
                    return null;
                }
            } else {
                return null;
            }
        }
        return object[key];
    } else {
        let right = parts.pop();
        let left = parts.join('.');
        let parent = getField(object, left);
        if(parent == null) {
            return null;
        } else {
            return getField(parent, right);
        }
    }
}
console.log(getField(data, "products[_index].child[0].id"));
