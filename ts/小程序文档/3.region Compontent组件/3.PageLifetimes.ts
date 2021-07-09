/**
 * 组件所在页面的生命周期声明对象，目前仅支持页面的show和hide两个生命周期
 */
interface PageLifetimes {
    show(): void;

    hide(): void;
}
