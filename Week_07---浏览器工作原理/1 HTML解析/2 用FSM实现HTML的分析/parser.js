const EOF = Symbol("EOF");    // EOF: End Of File

function data(c){

}

module.exports.parseHTML = function parseHTML(html){
     let state = data;
     for(let c of html){
         state = state(c);
     }
     state = state(EOF);
}



/****
    state 跟我们之前的状态机教的代码是一摸一样，那么我们首先给它一个初始状态，因为 HTML 标准里把初始状态叫做 data ,
 所以我们也就把它叫做 data 就可以了，然后接下来它会是一个对 html 里面的每个字符循环，然后去调用这个状态机里面 state
 这样的一个操作，注意这里最后我们用了一个小技巧，因为 html 最后是有一个文件终结的，而在这个文件终结的位置，比如说我们
 有一些文本节点，它可能仍然是面临着一个没有结束的这种状态，所以我们最后必须要额外给它一个字符，而这个字符不能是任何一个
 有效的字符，所以这里采用了一个小技巧，创建了一个 Symbol ,"EOF" 这个 Symbol ，那么这个 Symbol 本身是没有任何Symbol
 的意义的，我们只是利用了 Symbol 的这种唯一性，然后来创建一个新的一个符号 EOF，然后我们把它作为状态机的最后一个输入给
 到状态机，这样最后状态机就会强迫一些节点，最后完成截止的标志，在我们的 HTML 标准的描述里面，也会有很多的遇到 EOF 该
 怎么办这样的一些描述，我们就用这个方法来完成在 JavaScript 里面的一个语言结构，状态机的整个的流程，其实咱们在前面教
 状态机的时候已经给大家体验过了，不过多解释。
    首先我们给的是一个空的 data 函数，在下一部分我们再来尝试把它加入一些其他的状态，完成这个状态迁移，在这一步我们是
 整个的状态机是跑不起来的，因为我们data 没有去写里面的内容，所以我们也就不把它运行起来了，整个我们在第二个步骤里面加的
 代码大概是五六行。
    那么接下来我们第二步就完成了。

 第二步总结：
    我们用 FSM 来实现 HTML 的分析
    在 HTML 标准中，已经规定了 HTML 的状态
    Toy-Browser 只挑选其中一部分状态，完成一个最简版本
 
   首先就是我们还是利用有限状态机 FSM 来实现 HTML 的分析的，然后在HTML 标准里面已经规定好了 HTML 状态，所以省去了
 我们自己去设计这个状态的工作，然后咱们的 toy browser 只会挑选其中的一部分状态，我们会完成一个最简的版本。
 * ***/































