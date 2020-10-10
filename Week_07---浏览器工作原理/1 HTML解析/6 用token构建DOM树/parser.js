let currentToken = null;
let currentAttribute = {};

let stack = [{
    type:"document",
    childrdn:[]
}];

function emit(token) {
    console.log(token);

    if(token.type!="text")
        return ;
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

        top.children.push(element);
        element.parent = top;

        if(!token.isSelfClosing)
            stack.push(element);

        currentTextNode = null;

    } else if(token.type == "endTag"){
        if(top.tagName != token.tagName){
            throw new Error("Tag start end doesn't match!")
        } else {
            stack.pop();
        }
        currentTextNode = null;
    }

}

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

function afterQuotedAttributeValue(c) {

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

/****
     这一个步骤所有的代码主要都写在 emit(token) 这个里面，因为 emit(token) 会接受到我们从状态机里面，产出的所有的 token ,
 它有开始标签，结束标签，还有自封闭标签，那么我们暂时加这样的一个逻辑，如果它是文本节点，我们就给它忽略掉，
    然后我们会建一个数据结构，全局的数据结构，首先我们往里 push 一个 document 节点，这是因为如果我们写的一个配对良好的 HTML 的片段的话，
 它最后整个的栈应该是空的，这样不方便我们最后把这棵树拿出来，所以我们给这个栈让它有一个初始的根节点，就是document 到我们 DOM 里面，我们的
 HTML 元素，它的父节点也是document，首先我们每次 emit( token ) , token 来了，我们先把栈顶取出来，用一个数组来表示 stack ,那么它的
 栈顶就是最后一个元素，然后如果这个来的是个 start token ，那么我们就会对它进行一个入栈操作，但是我们不会直接把这个 token 直接入栈，
 我们会入栈一个 element ，一个 element ,
    那么我们其实有些同学会对 tag 和 element ，这两个概念含糊不清，其实你去看，写在 HTML 的文本里面的带尖括号的东西就叫 tag , 然后它背
 后所表示的那个东西，抽象的概念就叫 element . 所以我们的 DOM 树里面它只会有 note 和 element ,它不会有所谓的 tag ,所以这一步我们就会
 把它的这个东西叫做 element 了，那么 tag 它可以有 startTag 和 endTag ,但是无论是 startTag 还是 endTag ,它最终都对应着同一个 element，
 我们把这个 token 里面 tagName 就直接赋值给 element ,让它变成 element 的 tagName ,
    然后把所有的属性除了 type 和 tagName 之外的属性都给它 push 进 element 的一个属性的池子里面，这 attributes 它这个地方就是，我们
 放了一个空的数组，然后我们入栈之前就会给它把它的 top 的 children 里面加上这个元素，然后我们把元素的 parent 设成 top ,这是一个对偶的操作。
    然后接下来我们会用这个 token ，如果是自封闭的，那就没有必要去 push stack ，如果它不是自封闭的，它是个 startTag 的话，那么我们就给它
 push 进去。

    接下来，我们来看处理 endTag 的逻辑，token.type 等于 endTag 的话，那么其实我们非常的简单，我们就只是检查一下 tagName 是不是相等，
 如果是相等的，那么就说明它配对是成功的，我们 pop 就好了，如果不相等，理论上讲我们的 HTML 是有一定的容错性的，比如说你给它把外面的元素给它，
 比如说 外面是一个 p 标签，里面是一个 span 标签，它默认就会把 span 标签先给封闭掉，然后再把 p 标签放进去，当然我们这里就不做这种操作了，它
 只要不配对，我们就给它抛一个错出来，比较严格的实现了这个东西，这样我们的实现的逻辑就非常的简单清楚，毕竟我们还是要让大家去理解这个东西的运行原理，
 而不是真的做一个特别好用的浏览器，  如果想真的实现这个逻辑的话，大家也可以参考 HTML 标准里面的对应的部分。
    接下来我们说这个 token ，我们来看看它实际上是如何运行的。


 * ***/

/**
    那么我们其实有些同学会对 tag 和 element ，这两个概念含糊不清
    tag : 写在 HTML 的文本里面的带尖括号的东西。
    element : 背后所表示的那个东西，抽象的概念.


 * **/
































