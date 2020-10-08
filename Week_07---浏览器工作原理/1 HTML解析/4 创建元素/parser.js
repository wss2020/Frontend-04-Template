const EOF = Symbol("EOF");    // EOF: End Of File

function data(c) {
    if (c == "<") {
        return tagOpen;
    } else if (c == EOF) {
        return;
    } else {
        return data;
    }
}

function tagOpen(c) {
    if (c == "/") {
        return endTagOpen;
    } else if (c.match(/^[a-zA-Z]$/)) {
        return tagName;
    } else {
        return;
    }
}

function endTagOpen(c) {
    if (c.match(/^[a-zA-Z]$/)) {
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
        return tagName;
    } else if (c == ">") {
        return data;
    } else {
        return tagName;
    }
}

function beforeAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c == ">") {
        return data;
    } else if (c == "=") {
        return beforeAttributeName;
    } else {
        return beforeAttributeName;
    }
}

function selfClosingStartTag(c){

}


module.exports.parseHTML = function parseHTML(html) {
    let state = data;
    for (let c of html) {
        state = state(c);
    }
    state = state(EOF);
}

/****
 data 状态我们是一个初始状态，data 状态我们首先要关心的它是不是一个 tag ,那么 tag 它的特点是一个以小于号 也就是左尖括号 < 为
 开始的标志的，所以我们在 data 里面首先要识别的一个字符就是一个小于号，也就是左尖括号 <， 去区分这三种标签，除了左尖括号，那么如果是
 EOF 的话，那么在 data 状态应该是我们会返回一个结束的状态，我们就直接截止了，那么如果再调这个就说明报错了，因为文件结束以后我们就不可
 能再收到数据了，除了左尖括号之外的所有字符，我们都可以把它理解为是文本节点，那么咱们先处理 tag , 文本节点咱们一会再说，所以说在这里我
 们就相当于忽略了所有的小于号的符号了，一旦遇到小于号，我们就会进入到 tagOpen 状态，在 tagOpen 状态，这个时候我们还不知道它是三种
 tag 的哪一种，注意，这是标签开始，不是开始标签，这个时候我们还不知道它是三种标签类型之中的哪一种，
 然后我们来看看 tagOpen 状态，那么我们是首先有一个判断它是不是结束标签，结束标签的特点就是它在左尖括号之后，紧跟着一个正斜杠，所以
 在 tagOpen 状态，我们首先要判断的就是正斜杠，一旦检测到了正斜杠，那么我们就会进入到一个叫做 endTagOpen 的状态，也就是结束标签的开头，
 如果它是一个英文的字母，那么我们就会发现要么是一个开始标签（这里我觉得是一个结束标签），要么是一个自封闭标签，所以我们就会进入到一个 tagName
 状态，这个时候我们收集它的 tagName ,
    然后如果我们进入到 endTagOpen 状态，我们同样也要找这个 endTag 的 tagName ，endTag 的 tagName 那么它是一样也是包含小写字母 或者
 是大写字母的，所以它同样会进入到一个 tagName 的状态，如果 endTagOpen 之后，紧跟着一个大于号，也就是右尖括号 > ,那么要报错，如果这个
 endTagOpen 之后出现了 EOF ，那么它也会报错，那么这个就是一个我们正常的这样的 处理异常的一个逻辑，
    然后我们来看看 tagName 这个地方，tagName 它是以什么结束的，它肯定是以空白符结束的，在 HTML 里面有效的空白符有 4 种，分别是 tab 符、
 换行符、禁止符 和 空格， 这个 \f 是 prohibited ， \n 是换行， 然后我们如果遇到空格了，那么大家都写过 HTML 标签，如果我们遇到了一个空格，
 比如说  <html prop    第一个如果是大于号，那么它会进入到一个开始标签的状态，如果这个地方有一个空格，那么它就后面要跟属性了，对不对，所以我们
 可以认为 tagName 它是以左尖括号开始，以空格结束的这样的一段状态，那么所以我们当在 tagName 里面，遇到空格的时候，我们就会进入到一个新的状态
 叫做 beforeAttributeName ，如果我们遇到了一个正斜杠 / ，那么就说明这是一个标签名，然后后面有一个正斜杠，这说明它是一个自封闭的标签，那么我们
 就会进入到一个 selfClosingStartTag 这样的一个状态，当然如果 tagName 里面又加了这个字符的话，那么它还是在 tagName 里面，然后如果是右尖括号，
 那说明它就是一个普通的开始标签，所以我们就会结束掉这个标签，然后回到 data 状态，然后来解析下一个标签，这就是所谓的 tagName 里面的逻辑了。
    然后 beforeAttributeName ，我们这里暂时不去对它进行处理，实际上 beforeAttribute 里面，我们会期待遇到一个属性名，或者是一个正斜杠之类的
 这样的东西，但是我们暂时不处理属性，那么我们就先给它所有的可能性，都给他 return AttributeName ,除了大于号 > 可以作为终止标志，那么其他的我们
 就都等于把这个字符给它吃掉，也就是说在 beforeAttributeName 里面，我们就死等这个 右尖括号 >， 然后让它去结束，然后 selfClosingStarTag，那么
 我们分析到一个标签， <div /   已经分析到有一个杠了，后面它就只有大于号是有效的，其他的都会报错，这里报错的逻辑我们就都先不写了，我们只是不 return
    然后这就是一个状态机的雏形，跑起来看看。
 * ***/


/***
第三步总结
    主要的标签有：开始标签、结束标签 和 自封闭标签
    在这一步我们暂时忽略属性
 ***/































