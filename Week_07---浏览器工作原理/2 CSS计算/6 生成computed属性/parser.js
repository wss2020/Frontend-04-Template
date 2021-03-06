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
            let computedStyle = element.computedStyle;
            for(let declaration of rule.declarations){
                if(!computedStyle[declaration.property])
                    computedStyle[declaration.property] = {}
                // computedStyle[declaration.property].value = declaration.value;
                computedStyle[declaration.property].value = declaration.value;
            }
            console.log(element.computedStyle);
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
    第六步，就是我们把最后的 computed 的属性给它生成，我们从 CSS rules 里面，因为 CSS rules 里面它就有我们的 declarations,
 就是声明的属性，我们只需要把这个声明里面的属性，一条一条的给它作用到我们元素的 computed 的属性上面就可以了。

    看代码，这部分所有的代码，都在我们的    if(matched){ } 里面，首先把 element ,我们已经创建好的 computedStyle 取出来，然后
 我们还记得刚才 ast 里面的 rule 里面，它是一个数组，这里我们用一个 for 循环，把这里面每一条 declaration 给它取出来，接着我们就可
 以去循环访问 declaration 的里面的属性了，如果我们 computedStyle 没有这个属性的话，那么我们就给它创建一个对象，用一个对象来保存属
 性的值，为什么我们不把 property 的 value 直接写上去，主要是为了方便我们存储一些 value 之外的值，这个也是为我们的下一步作准备，那么
 这一步我们就只需要把它的 declaration 里面的 value 给它存到 computedStyle 的属性的 value 上去，我们就完成了。


 第六步总结
    一旦选择匹配，就应用选择器到元素上，形成 computedStyle


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





























