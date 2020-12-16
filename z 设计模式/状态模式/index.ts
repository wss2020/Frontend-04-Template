/**
     基本状态类声明所有具体状态都应使用的方法实现，并提供对与State相关联的Context对象的反向引用。
 各国可以使用此反向引用来过渡与另一个国家的关系。
 */
abstract class State {
    protected context: Context;
    public setContext(context: Context) {
        this.context = context;
    }
    public abstract handle1(): void;
    public abstract handle2(): void;
}

/**
    上下文定义了客户感兴趣的接口。它还保持了引用State子类的实例，该实例代表当前上下文状态。*/
class Context {
    /** @type {State}  对上下文当前状态的引用。   */
    private state: State;
    constructor(state: State) {
        this.transitionTo(state);
    }
    /** 上下文允许在运行时更改State对象。*/
    public transitionTo(state: State): void {
        console.log(`Context: Transition to ${(<any>state).constructor.name}.`);
        this.state = state;
        this.state.setContext(this);
    }
    /**  上下文将其行为的一部分委托给当前的State对象。 */
    public request1(): void {
        this.state.handle1();
    }
    public request2(): void {
        this.state.handle2();
    }
}


/** 具体状态实现与上下文状态相关的各种行为。 */
class ConcreteStateA extends State {
    public handle1(): void {
        console.log('ConcreteStateA 处理 request1。.');
        console.log('ConcreteStateA 想要更改上下文状态');
        this.context.transitionTo(new ConcreteStateB());
    }
    public handle2(): void {
        console.log('ConcreteStateA 处理 request2.');
    }
}


class ConcreteStateB extends State {
    public handle1(): void {
        console.log('ConcreteStateB 处理 request1.');
    }
    public handle2(): void {
        console.log('ConcreteStateB 处理 request2.');
        console.log('ConcreteStateB 想要更改上下文状态.');
        this.context.transitionTo(new ConcreteStateA());
    }
}

/**
 * 客户端代码。
 */
const context = new Context(  new ConcreteStateA()  );
context.request1();
context.request2();
