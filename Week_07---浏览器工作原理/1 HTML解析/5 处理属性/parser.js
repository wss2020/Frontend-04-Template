let currentToken = null;
let currentAttribute = {};

function emit(token) {
    // if(token.type!="text")
    console.log(token);
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
    } else if (c == "\"") {
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

/****
 <html  meaaa=""
    我们处理属性的状态是以 beforeAttributeName 开始，然后因为我们在写代码的时候写到,  html 写到 html 空格,
 那么这个时候可能会开始加属性了，所以在 beforeAttribute 的状态，我们就会进入到一系列处理属性的状态，那么首先如果
 我们遇到斜杠 / 或者 >  或者是 EOF ，我们就会进入到一个叫做 afterAttributeName 的状态，并且 reconsume 这个
 当前的字符属性里面肯定是，不可能在属性开头就有个等号了，那么它是一种错误，否则那么它就会遇到一个字符，一个字符，那么
 你可以理解为是个英文字母，但实际上 Unicode 里的很多字符这个都是可以的，那么这个时候我们就会创建一个新的属性，然后
 进入到一个 attributeName 的状态，
    attributeName 状态就会把当前的 c 去给它 reconsume ，也就是说 attribute 状态还会，继续处理这个c,这个c 它会有
 斜杠 /   >   EOF 三种特殊的字符的状态，那么另外空格也是一样，它都会进到一个叫做 afterAttributeName 的这样的一个
 状态，afterAttributeName 那么它是相当于我们的一个完整的属性结束了，比如说我们写  class="abc" ,后面它加了个空格，
 那么这个 attributeName 状态就结束了，那么这个时候它就会等一个 >  或者是 等一个  /> , 那么它才可以构成一个正常的
 这样的一个标签的结构，那么我们这里其实也是一样，就会进入到 afterAttributeName 状态，如果是等于说明 attributeName,
 它是对应着一个 value 的，那么它就会进入到一个 beforeAttributeValue 这样的一个状态，AttributeValue 它就又分成了
 double-quoted 、single-quoted 和 unquoted 四种情况，如果说 attributeValue 来的是一个双引号，那么就是 double-quoted,
 如果是单引号，那么就是 single-quoted，如果是啥没有，也不是什么特殊的符号，它就是 unquoted。
    那么接下里我们会进入到一个 double-quoted 的状态，double-quoted 状态它只找双引号结束，那么 single-quoted ,那么它就只找单引号结束，
 unquoted ,那么它就只找空白符结束，那么所有的属性它都会在结束的时候，把它的 attributeName 和 attributeValue 给它，
 写到当前的 currentToken ,这个 currentToken 大家还记得这个就是标签，写到当前的标签这个 token 上，那么它的整体设计就是这样。

 接下来我们来给大家实际的跑起来，然后看一下，我们从  beforeAttributeName 开始，执行起来。

    以上就是我们的一个基本逻辑了，唯一需要注意的是它会有一个 afterQuotedAttributeValue 的状态，如果是我们以引号结束，它这个地方会多一个跟
 beforeAttribute 差不多的状态，只不过是说它是不能够直接接受一个字符，创建一个属性的，也就是说我们比如去写  <div  id="a"  然后这个地方我们
 至少要有一个空格，如果没有空格，比如说接着写 <div  id="a"x=  ,那么这个属性其实是不合法的，这个 afterQuoted  就是这样的一个状态，它只有在
 single-quote 和 double-quoted 的后面会进入，这就是我们的 quoted 属性逻辑了，这样我们就会把整个的属性处理的逻辑都给大家讲完了。


 第五步总结
    属性值分为单引号、双引号、无引号三种写法，因此需要较多状态处理
    处理属性的方式跟标签类似 （也是我们用一个全局的对象去暂存）
    属性结束时，我们把属性加到标签 Token 上   **

    ** 属性结束的时候，我们把这些属性真正的作用在标签 token 上，所以我们最后emit 的还是标签 token，第五步就到这里了。

 * ***/


































