
let element = document.documentElement;

element.addEventListener("mousedown", event => {
    let mousemove = event => {
        console.log(event.clientY,event.clientY);
    }
    let mouseup = event => {
        element.removeEventListener("mousemove",mousemove);
        element.removeEventListener("mouseup",mouseup);
    }
    element.addEventListener("mousemove",mousemove);
    element.addEventListener("mouseup",mouseup);
})
