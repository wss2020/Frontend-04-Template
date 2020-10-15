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

function specificity(selector) {
    let p = [0, 0, 0, 0];
    let selectorParts = selector.split(" ");
    for (let part of selectorParts) {
        if (part.charAt(0) == "#") {
            p[1] += 1;
        } else if (part.charAt(0) == ".") {
            p[2] += 1;
        } else {
            p[3] += 1;
        }
    }
    return p;
}

function compare(sp1, sp2) {
    if (sp1[0] - sp2[0])
        return sp1[0] - sp2[0];
    if (sp1[2] - sp2[1])
        return sp1[1] - sp2[1];
    if (sp1[2] - sp2[2])
        return sp1[2] - sp2[2];

    return sp1[3] - sp2[3];
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
            let sp = specificity(rule.selectors[0]);
            let computedStyle = element.computedStyle;
            for(let declaration of rule.declarations){
                if(!computedStyle[declaration.property])
                    computedStyle[declaration.property] = {}

                if(!computedStyle[declaration.property].specificity){
                    computedStyle[declaration.property].value = declaration.value;
                    computedStyle[declaration.property].specificity = sp;
                }else if(compare(computedStyle[declaration.property]).specificity, sp){
                    computedStyle[declaration.property].value = declaration.value;
                    computedStyle[declaration.property].specificity = sp;
                }
            }
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
    上一步我们已经暴露了一个问题，就是选择器它现在 我们的逻辑是不管三七二十一的往上覆盖，但是其实在咱们的 CSS 里是有一个对选择器
 的 specification 的这样的一个规定，咱们的中文有时候会把它翻译成优先级，从它的结果来看，优先级是对的，但是大家也都知道英文里优
 先级是 priority 这个词对不对，specificity 这个英文单词的原意其实是表示这种专指的程度，那么其实我们从语义上来讲，确实 id 它的
 专指的程度就会高于 class , class 它的专指的程度就会高于 tagName ,那么当多个 id 或者是 多个 class 联合作用的时候，它有可能
 专指的程度会高于单个，所以我们这边就会有一个叫做 specificity 的这样的计算逻辑.

    我们会编写一个计算 specificity 的逻辑，那么这里我们就会把 selector 进行一个 split ，然后得到 selectorParts 这个跟我们
 之前的假设一样，这个地方是一个复合选择器，它是选择单个元素用的，但是我们做了一个假设，就是复合选择器里面就只有简单选择器，所以我们就
 去逐个循环就好了，如果我们要再把它拆开的话，我们在这个地方又要加一层的正则，大概就是这样的一个逻辑，那么带井号的，那么我们就会在这个
 位加1，带点的我们就在这个位加1，什么都不带的就是 tag , 那么我们就在最后一位 p[3]+1 ,然后就把它 return 就可以了，同样作为一个
 optional 的这样的一个作业，就是请同学们尝试在 selectorParts 里面，去解析复合选择器，
    compare 也是比较简单，就是高位 能 比出来就直接 return 了，低位 最后我们一位一位的看，如果比不出来是 0 的话，我们就继续去比
 地位，如果一直到最后一位都是相同的，那么两个选择器就是同等的优先级，接下来我们看如何去应用它，
    首先我们要把当前的 selector 的 specificity 给它计算出来，然后我们去应用的时候，我们要先比较一下当前的 specificity ，我们
 是去比较 property 上的 specificity ,首先看它有没有，如果没有的话，那我们就直接到 else 的逻辑里面了，如果是有的话，那么我们就
 需要进行一次比较，如果是比较新来的，如果旧的更小的话，那么我们就让新的区域覆盖它，所以这样的话我们就可以根据这个，然后来完成优先级的
 判断了，我们就完成了带 specificity 的 CSS Computing , 我们到这里所有的 CSS 的 specificity 就已经都结束了，


 第七步总结
    CSS 规则是根据 specificity 和 后来优先规则覆盖
    specificity 是个四元组，越左边权重越高
    一个 CSS 规则的 specificity 根据包含的简单选择器相加而成



 补充：  priority 优先级
        specificity 特性、专一性

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





























