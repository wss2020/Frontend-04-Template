/**
 * 实现鼠标操作
 * 1.先把代码跑起来，再考虑接口如何设计。
 *      先假设有一个 element ,document.documentElement 是一定能够取到的一个容器的元素。它代表 HTML 元素。之后的代码，之前写过，这样就
 * 完成了 mousedown 的抽象。
 * */

/**
 * 2.接下来看看，触屏事件怎么样去处理，mouse事件是不能被转换成触屏事件的。 但是常见的 click 这一类更高级一点的事件，它是可以监听到的.
 *      我们使用touch 系列事件，它跟mouse系列的事件不一样，首先 touch 事件，一旦你 start 了以后，它就一定会触发这个move, 这个 move 一定是
 * 跟 start 触发在同一个元素上，不管你手的位置移动到哪里，所以说我们不需要像 mouse 一样，在mousedown之后才去监听mousemove，所以我们 touch
 * 事件的监听，它都在一起.    你可以把 touchstart、touchmove、touchend 看成 mousedown、mousemove、mouseup。   尽管他们看起来是非常
 * 相似的，但是其实它们两个的内在逻辑和我们写出来的代码是完全不一样的。
 *      touch 事件，我们可以像下面这样去监听，因为你没有办法越过 touchstart 触发 touchmove ,所以不需要像 mousedown 一样，去干这个事，而
 * 鼠标它是一直，你只要晃，它就会运动，不管你是按下晃，还是抬起来晃，这个是一个很大的不同。
 *      还有一个不同，touch 事件，因为我们很多的屏幕是支持多点触摸的，所以你会发现这个 event ,里面并不是一个触点，它这里面其实是有多个触点，
 * console.log(event.changedTouches) 查看， 它里面的 clientX、clientY ，需要我们到 changedTouches 数组里面去找。
 *      changedTouches 数组里面元素的数据，有 clientX、clientY、pageX、pageY、identifier... , identifier 是一个很神奇的东西，叫
 * 标示符，当我们去触发 touchstart 的时候，就有 start 的 touch 的点，但是到 move 的时候，我们没有办法知道是哪个点 move ,所以说它需要一个
 * 唯一的标示符去追踪它，所以说 start、move、end ,它们会各有一个标示符。 用 identifier 去表示touch 的唯一ID。
       接下来我们要做的就是把 touch 分开，我们把这些有变化的 touchs 分别的去处理，
         element.addEventListener("touchstart", event => {
            for(let touch of event.changedTouches){
                console.log(touch.clientX,touch.clientY);
            }
        })
 无论是 start、move、end ,它都会有 changedTouches 标志，这样，我们就跟鼠标事件一样了，我们得到了一串的坐标。
 这个就是对两个事件类型的一个基本处理，还要注意 touch 事件，其实比鼠标事件，它多了一个东西，就是 touchcancel。

 cancel 和 end 有什么区别？
    正常来说，touch 事件的序列 执行顺序是 start、move、end.
    cancel 表示手指这个 touch 点的序列，它是以一个异常的模式去结束的，比方说当我去 setTimeout(()=>{ alert('!!!') },3000),  3秒钟后触发
 一个 alert ,那么我的触屏，就会被这个 alert 给打断，一旦打断了，那么我们就没有办法，完整正常的 end 事件了, 那么这个end事件，就会变成一个cancel.
 诸如此类系统的操作，它都有可能会打断，我们的 touch 事件的序列，把 end 变成 cancel. 所以我们的触屏事件，它就会有一个特殊的 cancel 事件在这里。
    我们的鼠标事件就没有这样的问题，它永远不会出现一个 mousecancel 这样的一个操作。

 进行到这一步，我们已经完成了一个基本的抽象。

    接下来我们考虑一下，怎么样写一个通用的 gesture 的逻辑。 我们会用 4 个这样的函数来表示，它的4个部分。 分别是 start move end cancel. 函数
 参数我们就认为它就是一个点了，然后我们在这4个函数里面写它的主体逻辑。
    mouse系列 和 touch系列统一使用这 4个函数, 这样两个模式就是统一的一种抽象了，这样我写代码的时候，我就需要去针对具体的，鼠标还是 touch事件去做
 处理，我只需要去针对我的每一个点的 start、move、end、cancel 去写逻辑就可以了，这就是我们 gesture 的第一步。
 * */
