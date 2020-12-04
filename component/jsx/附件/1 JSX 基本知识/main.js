function createElement(type,attribute, ...children){
    let element;
    if( typeof type === "string")
        element = new ElementWrapper(type);
    else
        element = new type;

    for( let name in attribute){
        element.setAttribute(name,attribute[name]);
    }
    for( let child of children){
        if( typeof child === "string"){
            child = new TextWrapper(child);
        }
        element.appendChild(child);
    }
    return element;
}

class TextWrapper{
    constructor(type) {
        this.root = document.createTextNode(type);
    }
    mountTo(parent){
        parent.appendChild(this.root);
    }
}

class ElementWrapper{
    constructor(type) {
        this.root = document.createElement(type);
    }
    setAttribute(name,value){
        this.root.setAttribute(name,value);
    }
    appendChild(child){
        child.mountTo(this.root);
    }
    mountTo(parent){
        parent.appendChild(this.root);
    }
}

class Div{
    constructor() {
        this.root = document.createElement("div");
    }
    setAttribute(name,value){
        this.root.setAttribute(name,value);
    }
    appendChild(child){
        child.mountTo(this.root);
    }
    mountTo(parent){
        parent.appendChild(this.root);
    }
}


let a = <Div  id="a">
            Hello world!
            <span>a</span>
        </Div>;


a.mountTo(document.body)







