import {Component} from "./framework.js"
import {ease} from "./ease.js";
import {Timeline, Animation} from "./animation.js";
import {enableGesture} from "./gesture.js";

export class Carousel extends Component {
    constructor() {
        super();
        this.attributes = Object.create(null);
    }

    setAttribute(name, value) {
        this.attributes[name] = value;
    }

    render() {
        this.root = document.createElement("div");
        this.root.classList.add("carousel");
        for (let record of this.attributes.src) {
            let child = document.createElement("div");
            child.style.backgroundImage = `url('${record}')`;
            this.root.appendChild(child);
        }

        enableGesture(this.root);
        let timeline = new Timeline;
        timeline.start();

        let children = this.root.children;
        let position = 0;

        this.root.addEventListener("pan", event => {
            let x = event.clientX - event.startX;
            let current = position - ((x - x % 500) / 500);
            for (let offset of [-1, 0, 1]) {
                let pos = current + offset;
                pos = (pos % children.length + children.length) % children.length;
                children[pos].style.transition = "none";
                children[pos].style.transform = `translateX(${-pos * 500 + offset * 500 + x % 500}px)`;
            }
        })

        this.root.addEventListener("panEnd", event => {
            let x = event.clientX - event.startX;
            position = position - Math.round(x / 500);
            for (let offset of [0, -Math.sign(Math.round(x / 500) - x + 250 * Math.sign(x))]) {
                let pos = position + offset;
                pos = (pos % children.length + children.length) % children.length;
                children[pos].style.transition = "";
                children[pos].style.transform = `translateX(${-pos * 500 + offset * 500}px)`;
            }
        })


        setInterval(() => {
            let children = this.root.children;
            let nextIndex = (position + 1) % children.length;

            let current = children[position];
            let next = children[nextIndex];

            next.style.transition = "none";
            next.style.transform = `translateX(${500 - nextIndex * 500}px)`;

            timeline.add(new Animation(current.style,"transform",
                - position * 500, -500 - position * 500, 500, 0, ease,
                    v => `translateX(${v}px)`))

            timeline.add(new Animation(next.style,"transform",
                500 - nextIndex * 500,  - nextIndex * 500,500, 0, ease,
                v => `translateX(${v}px)`))

            position = nextIndex;
        }, 3000);


        /** this.root.addEventListener("mousedown", event => {
            let children = this.root.children;
            let startX = event.clientX
            let move = event => {
                let x = event.clientX - startX;

                let current = position - ((x - x%500 )/ 500);
                for(let offset of [-1,0,1]){
                    // for(let offset of [-2，-1,0,1，2]){  // 为了避免奇特的bug,算的范围大一点也没有问题。
                    let pos = current + offset;
                    pos = (pos + children.length) % children.length;

                    children[pos].style.transition = "none";
                    children[pos].style.transform = `translateX(${ -pos*500 + offset*500 + x%500}px)`;
                }
            }
            let up = event=>{
                let x = event.clientX - startX;
                position = position - Math.round(x / 500);
                for(let offset of [0,-Math.sign( Math.round( x/500 ) - x + 250 * Math.sign(x) )]){
                    let pos = position + offset;
                    pos = (pos + children.length) % children.length;

                    children[pos].style.transition = "";
                    children[pos].style.transform = `translateX(${ -pos*500 + offset*500}px)`;
                }
                document.removeEventListener("mousemove",move)
                document.removeEventListener("mouseup",up)
            }
            document.addEventListener("mousemove", move)
            document.addEventListener("mouseup", up)
        })*/


        // 关掉自动播放
        /* let currentIndex = 0;
         setInterval(()=>{
             let children = this.root.children;
             let nextIndex = (currentIndex + 1) % children.length;

             let current = children[currentIndex];
             let next = children[nextIndex];

             next.style.transition = "none";
             next.style.transform = `translateX(${100 - nextIndex * 100}%)`;

             setTimeout(()=>{
                 next.style.transition = "";
                 current.style.transform = `translateX(${-100 - currentIndex * 100 }%)`;
                 next.style.transform = `translateX(${ - nextIndex * 100 }%)`;
                 currentIndex = nextIndex;
             },16)

         },3000); */

        return this.root;
    }

    mountTo(parent) {
        console.log(this.attributes.src);
        parent.appendChild(this.render());
    }
}
