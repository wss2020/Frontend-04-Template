let currentToken = null;

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
    } else if (c == ">") {
        return data;
    } else if (c == "=") {
        return beforeAttributeName;
    } else {
        return beforeAttributeName;
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
 来看代码，那么首先 ParseHTML 里面的代码是一点都没有动的，我们现在要做的只是在每一个 state 的状它机里加入
 我们的这样的业务逻辑，
 首先我们要实现一个 emit(token) 这样的一个函数，因为我们最后这个状态机里面所有的状态，创建完 token 之后，
 我们要把它在同一个出口给它输出，所以我们写一个全局的这样的一个 emit(token) 函数，而这里我们先把它做一次
 console.log ,等到后面我们再研究怎么样去处理它，其他的代码没有什么变化，然后我们要有一个全局变量叫做，是因为我们
 在 HTML 里面，tag 不管有多复杂，那么它是当做一个 token 去处理的，那么所以我们要随着状态机一个一个的读进来字符
 的时候，逐步的去构造 token 里面的内容，这个跟我们前面对状态机的使用风格也是类似的，
 那么我们首先先看一下在 data 状态，如果等于 EOF 的话，我们会提交一个 EOF token ,然后如果是文本节点，那么
 我们会 emit 一个 text token ,那么 content 就是文本节点里面的一个字符，这一步我们会去一个一个字符的把它 emit
 上去，等到后面我们再想办法去构造树的时候，我们会再把这些 text 给它拼起来，在检测到一个左尖括号 < 的时候，我们是
 不知道这个时候它的字符它到底是一个什么样的 tag 的，所以说这一步暂时我们什么都不做，我们把它进入到 tagOpen 状态，
 在 tagOpen 状态，我们就可以去做一些事情了，一旦我们发现它是一个 start tag , 就是没有遇到斜杠，那就是一个
 大于号 > 开头，然后后面有一个字母，不管是什么字母，不管是 a 还是 div 的 d 我们都可以确定，它是一个开始标签或者
 是一个自封闭标签，那么所以我们就会给 currentToken 赋一个初值，那么给它指一个 type:"starTag" ,有同学就会问
 说你 type 为什么不把 selfClosingTag 给它放进去，那么我这里在数据结构上我会选择，不管是自封闭的还是不是自封闭
 的，我们都会把它称作 startTag ，而如果是自封闭的，我们用一个额外的变量叫做 isSelfClosing 来标识，所以说这个
 地方我们创建 currentToken 的时候，就什么都不用管，直接创一个 type 为 startTag ，Tag 里面它会有 tagName。
 然后接下来我们来继续，这个到 tagName 状态的逻辑跟我们前面没有任何的区别，我们只是在这里加了一段逻辑，所以
 说我们整个状态的迁移关系都跟我们，前面第三步的代码是一摸一样的，到了在 engTagOpen 的状态，那么我们就会创造一个
 engTag 标签 token ,然后我们下一步我们就会在 tagName 状态，我们来处理它，
 好，接下来就是我们的核心逻辑了，在 TagName 状态下，我们会收到一个标签名组成的字符，如果这个字符它属于字母
 的话，我们就会把它追加到当前的 token 的 tagName 上面，然后 beforeAttributeName， 我们仍然是没有去处理，
 然后 selfClosingStartTag 我们也是加了一个处理的逻辑，就是这个变量，我们给它置为了 true ,接下来我们还是
 实际的跑起来。


 第四步总结
    在状态机中，除了状态迁移，我们还会要加入业务逻辑，
    我们在标签结束状态提交标签 token


    第四步总结，我觉得主要需要大家掌握的就是在状态机中，咱们除了状态迁移，咱们还需要加入咱们自己的业务逻辑，
 在 parser 的代码里面，咱们所谓的业务逻辑就是创建 token ,然后把字符加到 token 上，然后最后 emit token,
 咱们在标签的结束状态就会提交标签 token , 注意：这不是在结束标签才提交整个的 token ,我们的开始标签和结束
 标签，其实在我们的词法的角度来讲，是两个不同的 token ,中间是一堆文本节点，我们还没有去构建树形的结构，这就
 是我们的第 4 个步骤了。

 * ***/


































