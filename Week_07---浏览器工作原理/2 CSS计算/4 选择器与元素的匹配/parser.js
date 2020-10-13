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
     第四步我们来处理选择器跟元素的匹配问题， 选择器它是有一个层级结构的，最外层的选择器叫做选择器列表，咱们的 CSS parser 已经帮
 我们做了拆分，然后选择器列表里边的叫做复杂选择器，复杂选择器是由空格分割的，我们的一系列的复杂选择器，那么它是根据亲代关系，然后去选
 择元素的，而复合选择器它是针对一个元素的本身的属性和特征的一个判断，而复合原则性选择器它又是由紧连着的一堆的简单选择器而构成的，那么
 在我们的 toy browser 里面，我们可以假设一个复杂选择器里面，它只包含简单选择器，我们就不处理这个复合的情况了，我们把这个情况当成一
 个额外的内容，有精力的同学可以去把它实现掉，就像前面80 个状态的状态机一样，所以我们拆分选择器，我们只需要对复杂选择器根据空格，进行
 一下拆分，然后就可以了，接着来看代码。

    在 computeCSS 的时候，我们通过前几个步骤已经可以拿到当前元素，所有的 elements 和 CSS rules ,这三个关键信息已经足以让我们，
 做出完整的判断了，那么我们为了判断它是否匹配，我们就会给它加一个 computedStyle 这样的一个属性，然后来保存由 CSS 来设置的属性，
 然后我们来看一下，首先根据我们之前研究的 CSS parser 给出来的 ast 的结构，我们可以知道每个 rule 它有一个 selectors 的这样的
 一个数组，因为我们基本上也不太会写 selector 的带逗号的这种list 版本，所以说我们就给它0 取出来进行 split 就好了，为了跟我们的
 elements 的顺序一致，我们把选择器也进行一次 reverse ,这样就得到了一个 selectorParts 的数组，这里面如果说我们正式来讲，这
 里面都是复合选择器，那么如果说做一个假设，它就是简单选择器，那么简单选择器首先，它最后一个也就是 reverse 之后的 0 ，它是要跟当前
 元素算是否匹配的，我们这里就把元素跟选择器做一个匹配算法，这个地方我们会调用一次 match 函数，这个 match 函数我们还没有写，后续
 步骤再实现，先写一个空的 match 函数，它始终 return false ，这样的话它就不会执行，它永远不会匹配到，因为 return 的是 undefined ,
 所以它永远不会匹配到，但是我们可以把架子的代码写完，
    然后我们接下来这个地方是一个比较复杂的部分，我们需要双循环选择器和元素的父元素来找到它们是否能够进行匹配，我们用 j 来表示当前的
 选择器的位置，我们用i 来表示当前的元素的为位置，那么一旦元素能够匹配到一个选择器，我们就让 j 自增，在最后结束的时候，我们检查是否
 所有的选择器已经都被匹配到了，如果所有的选择器都匹配到了，那么它最终我们就认为它是个匹配成功的一个选择器，
    然后接下来，我们根据匹配的结果，去把 rules 里面的所有的 CSS 的属性应用到这个元素上了，这段代码我们也留空，后面去处理，这就是一个
 基础的匹配算法了。
    下一节，我们再来补全 match 的部分。


 第四步总结：
    选择器也要从当前元素向外排列
    复杂选择器拆成针对单个元素的选择器，用循环匹配父元素队列

    只有两个要点，第一个就是说选择器跟当前元素的父元素是排列的顺序是一致的，都是我们从内向外去进行匹配，复杂选择器拆成针对单个元素的选择器，
 我们会用循环来匹配父元素队列，这是一个两个数组同时进行的一个循环，这块的算法，算是整个的选择器的匹配算法里面的一个小小的难点，希望大家在
 这个地方能够多下一点功夫去仔细钻研。


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


































