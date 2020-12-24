/**
 * 实现鼠标操作
 * 1.先把代码跑起来，再考虑接口如何设计。
 *      先假设有一个 element ,document.documentElement 是一定能够取到的一个容器的元素。它代表 HTML 元素。
 * */

let element = document.documentElement;

element.addEventListener("mousedown", event => {
    let mousemove = event => {

    }
    let mouseup = event => {
        element.removeEventListener("mousemove",mousemove);
        element.removeEventListener("mouseup",mouseup);
    }
    element.addEventListener("mousemove",mousemove);
    element.addEventListener("mouseup",mouseup);
})
