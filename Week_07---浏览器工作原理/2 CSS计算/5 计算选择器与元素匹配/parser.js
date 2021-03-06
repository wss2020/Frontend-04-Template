const css = require('css');
let currentToken = null;
let currentAttribute = null;
let currentTextNode = null;

let stack = [{
    type:"document",
    children:[]
}];

// 加入一个新的函数 addCSSRules ，这里我们把 CSS 规则暂存在一个数组里
let rules = [];
function addCSSRules(text){
    let  ast = css.parse(text);
    rules.push(...ast.stylesheet.rules);
}

function match(element,selector){
    if(!selector || !element.attributes)
        return false;

    if(selector.charAt(0) == "#"){
        let attr = element.attributes.filter(attr => attr.name === "id" )[0]
        if(attr && attr.value === selector.replace("#",""))
            return true;
    }else if(selector.charAt(0) == "."){
        let attr = element.attributes.filter(attr => attr.name === "class")[0]
        if(attr && attr.value === selector.replace(".",""))
            return true;
    }else{
        if(element.tagName === selector){
            return true;
        }
    }
    return false;
}

function computeCss(element){
    let elements = stack.slice().reverse();
    if(!element.computedStyle)
        element.computedStyle = {};

    for(let rule of rules){
        let selectorParts = rule.selectors[0].split(" ").reverse();

        if(!match(element, selectorParts[0]))
            continue;

        let matched = false;

        let j = 1;
        for(let i=0; i<element,length; i++){
            if(match(element[i], selectorParts[j])){
                j++;
            }
        }
        if(j >= selectorParts.length){
            matched = true;
        }

        if(matched){
            // 如果匹配到，我们要加入
            console.log("Element",element, "matched rule",rule);
        }

    }

}

function emit(token) {
    console.log(token);

    // if(token.type!="text")
    //     return ;
    let top = stack[stack.length = 1];

    if(token.type == "startTag"){
        let element = {
            type:"element",
            children: [],
            attributes: []
        };

        element.tagName = token.tagName;

        for(let p in token){
            if(p != "type" && p != "tagName"){
                element.attributes({
                    name:p,
                    value:token[p]
                })
            }
        }

        computeCss(element);

        top.children.push(element);
        element.parent = top;

        if(!token.isSelfClosing)
            stack.push(element);

        currentTextNode = null;

    } else if(token.type == "endTag"){
        if(top.tagName != token.tagName){
            throw new Error("Tag start end doesn't match!")
        } else {
            // ++++++++++++++遇到style标签时，执行添加CSS规则的操作 +++++++++++++++++++//
            if(top.tagName === "style"){
                addCSSRules(top.chidren[0].conten);
            }
            stack.pop();
        }
        currentTextNode = null;
    } else if(token.type == "text"){
        if(currentTextNode == null){
            currentTextNode = {
                type:"text",
                content:""
            }
            top.children.push(currentTextNode);
        }
        currentTextNode += token.content;
    }
}


/****
    第五步，实现 match 函数里面的内容，
    来代码，match 函数它接受两个参数，一个是 element ，一个是 selector，这里我们就假设 selector 都是简单选择器，
 简单选择器它就主要有三种，一种是这种以点开头的 class 选择器 .className ,另一种是以井号开头的 id 选择器 #idName，
 还有一种什么都不带的 tagName 选择器，我们做选择器的话，这里面其实是可以，这个 selector ,如果我们是真实的 browser
 它是可以把这些选择器连起来写，tagName 选择器一定要在前面，那么形成一个这种所谓的复合选择器，比如：div.a#a  ，这复合
 选择器仍然是对一个元素的某些特征进行判断，但是他们互相之间是一种与的关系，如果这样写一个选择器就必须是一个 div,并且它
 必须有 .a 的 class ,必须有一个 a 的id ,也就是说它的 class 和 id 都是 a ，另外我们这里会假设 class ,大家不会
 写多个，所以我们还是做了很多的简化的，但是如果同学们想把复合选择器写上，那么也不难，这个地方我们用正则去拆分一下 selector
 然后在这里加一点关系就可以了，
    好，那么接下来我们来看看 match 函数如何去实现，首先我们要检查一下 selector ，另外我们用 attributes 来判断，
 这个元素是否是一个文本节点，如果是文本节点的，我们就根本不用去看它到底跟 selector 匹配不匹配了，然后我们用一个if
 这样的结构去对三种简单选择器进行一下拆分，
    第一种就是 id 选择器，第二种是 class 选择器，第三种就是啥都没有，默认，我们就认为它是一个 tagName 选择器，
 因为这个时候元素里面的 attributes ,我们都是用这个数组去存储的，所以说我们用一个 filter ,先把 attribute 找
 出来，然后我们把它取出 attribute , 然后看看如果有 attribute 的，并且 attribute 的值是我们 selector 里
 所指定的值，那么我们就 return true , class 也一样，其实 class 我们是还需，正常我们还需要在这步做一个分割，
 把 attribute 给它用空格分开来有一个匹配到， 我们就认为它具有这个class，  最后 tagName 匹配就比前两个更简单，
 逻辑就是检查一下，因为 tagName 并不是一个 attribute ,它是一个固有的标签的特性，那么我们就会直接检查它是不是
 等于 selector 的值，如果是的话那么就 return ，
    如果说有的同学还希望加入我们的 attribute selector 之类的，这种更新的 selector 的话，那么大家都可以在
 match 函数里面去自由的去扩展。

    下一步我们的逻辑，在 if(matched){ }  里面，接下来我们做一下总结，


 第五步总结：
    根据选择器的类型和元素属性，计算是否与当前元素匹配
    这里仅仅实现了三种基本选择器，实际的浏览器中要处理复合处理器选择器
    作业（可选）：实现复合选择器，实现支持空格的 class 选择器



    首先我们是会根据选择器的类型和元素属性去计算，选择器是否与当前的元素匹配，咱们这里偷个懒仅仅实现了三种基本选择器，
 实际的浏览器中要处理复合选择器，也不难，所以我们要留一个可选的作业，就是大家在这个基础上去实现我们的带复合选择器的版
 本，并且我们把刚才讲的支持空格的 Class 选择器也给它实现掉，


 * ***/


const EOF = Symbol("EOF");    // EOF: End Of File

function data(c) {
    if (c == "<") {
        return tagOpen;
    } else if (c == EOF) {
        emit({
            type: "EOF"
        });
        return;
    } else {
        emit({
            type: "text",
            content: c
        });
        return data;
    }
}

function tagOpen(c) {
    if (c == "/") {
        return endTagOpen;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: "startTag",
            tagName: ""
        }
        return tagName(c);
    } else {
        return;
    }
}

function endTagOpen(c) {
    if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: "endTag",
            tagName: ""
        }
        return tagName(c);
    } else if (c == ">") {

    } else if (c == EOF) {

    } else {

    }
}

function tagName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c == "/") {
        return selfClosingStartTag;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += c  //.toLowerCase()
        return tagName;
    } else if (c == ">") {
        emit(currentToken);
        return data;
    } else {
        return tagName;
    }
}

function beforeAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c == "/" || c == ">" || c == EOF) {
        return afterAttributeName(c);
    } else if (c == "=") {

    } else {
        currentAttribute = {
            name: "",
            value: ""
        }
        // console.log("currentAttribut",currentAttribute);
        return attributeName(c);
    }
}

function attributeName(c) {
    // console.log(currentAttribute);
    if (c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == EOF) {
        return afterAttributeName(c);
    } else if (c == "=") {
        return beforeAttributeValue;
    } else if (c == "\u0000") {

    } else if (c == "\"" || c == "'" || c == "<") {

    } else {
        currentAttribute.name += c;
        return attributeName;
    }
}

function beforeAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == EOF) {
        return beforeAttributeValue;
    } else if (c == "\'") {
        return doubleQuoteAttributeValue;
    } else if (c == "\'") {
        return singleQuoteAttributeValue;
    } else if (c == ">") {

    } else {
        return UnquotedAttributeValue(c);
    }
}

function doubleQuoteAttributeValue(c) {
    if (c == "\"") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if (c == "\u0000") {

    } else if (c == EOF) {

    } else {
        currentAttribute.value += c;
        return doubleQuoteAttributeValue;
    }
}

function singleQuoteAttributeValue(c) {
    if (c == "\'") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if (c == "\u0000") {

    } else if (c == EOF) {

    } else {
        currentAttribute.value += c;
        return doubleQuoteAttributeValue;
    }
}

function afterQuotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c == "/") {
        return selfClosingStartTag;
    } else if (c == ">") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (c == EOF) {

    } else {
        currentAttribute.value += c;
        return doubleQuoteAttributeValue;
    }
}

function UnquotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return beforeAttributeName;
    } else if (c == "/") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return selfClosingStartTag;
    } else if (c == ">") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (c == "\u0000") {

    } else if (c == "\"" || c == "'" || c == "<" || c == "=" || c == "`") {

    } else if (c == EOF) {

    } else {
        currentAttribute.value += c;
        return UnquotedAttributeValue;
    }
}

function afterAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return afterAttributeName;
    } else if (c === "/") {
        return selfClosingStartTag;
    } else if (c === ">") {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken)
        return data;
    } else if (c === EOF) {

    } else {
        currentToken[currentAttribute.name] = currentAttribute.value;
        currentAttribute = {
            name: '',
            value: '',
        };
        return attributeName(c);
    }
}

function selfClosingStartTag(c) {
    if (c == ">") {
        currentToken.isSelfClosing = true;
        return data;
    } else if (c == "EOF") {

    } else {

    }
}

module.exports.parseHTML = function parseHTML(html) {
    let state = data;
    for (let c of html) {
        state = state(c);
    }
    state = state(EOF);
}




// 别人优秀代码
function match1(element,allSelector){
    if(!allSelector || !element.attributes){
        return false;
    }
    let tagSelector = [];
    let idSelector = [];
    let classSelector = [];
    let start = selectorStart;
    let currentSelectorName = "";
    for(let c of allSelector){
        start = start(c);
    }
    start(EOF);
    function selectorStart(c){
        if(c === "."){
            return classSelectorName;
        }else if(c === '#'){
            return idSelectorName;
        }else if(c == EOF){
            return ;
        }else{
            return selectorName(c)
        }
    }
    function idSelectorName(c){
        if(c === '.' || c === '#' || c === EOF){
            idSelector.push(currentSelectorName);
            currentSelectorName = '';
            return selectorStart(c);
        }else{
            currentSelectorName += c;
            return idSelectorName;
        }
    }
    function selectorName(c){
        if(c==='.' || c === '#' || c === EOF ){
            tagSelector.push(currentSelectorName);
            currentSelectorName = "";
            return selectorStart()
        }else{
            currentSelectorName += c;
            return selectorName;
        }
    }
    let count = 0;
    if(idSelector.length !== 0){
        let attr = element.attributes.filter(attr => attr.name === "id")[0];
        if(attr){
            let ids = attr.value.split(" ");
            for(let i=0; i<idSelector.length; i++){
                if(ids.includes(idSelector[i]))
                    count++;
            }
        }
    }
    if(classSelector.length !== 0){
        let attr = element.attributes.filter(item=>item.name === "class")[0];
        if(attr){
            let className = attr.value.split(" ");
            for(let i=0; i<classSelector.length; i++){
                if(className.includes(classSelector[i]))
                    count++;
            }
        }
    }
    if(tagSelector.length !==0){
        if(element.tagName === tagSelector[0]){
            count ++;
        }
    }
    let sumLength = idSelector.length + classSelector.length + tagSelector.length;
    return count === sumLength;

    // TODO 新的selector

}





























