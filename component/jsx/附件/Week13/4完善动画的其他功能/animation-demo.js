import {Animation, Timeline} from "./animation";
import {ease, easeIn, easeInOut} from "./ease";

let tl = new Timeline();

tl.start();

tl.add(new Animation(
    document.querySelector("#el").style,
    'transform',0,500,2000,0,easeInOut,v=>`translateX(${v}px)`))

document.querySelector('#el2').style.transition = '2s ease-in-out';
document.querySelector('#el2').style.transform = 'translateX(500px)';

document.querySelector('#pause-btn').addEventListener('click',()=> tl.pause());
document.querySelector('#resume-btn').addEventListener('click',()=> tl.resume());
