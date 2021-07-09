// #region Page
import {wx} from "../原文档";

interface Page<D = object, P = object> extends Component<D, P> {
    /**
     * data
     */
    data: any;

    /**
     * 强制更新
     */
    forceUpdate(): void;

    /**
     * 字段可以获取到当前页面的路径。
     */
    route(): void;

    /**
     * 更新
     */
    update(): void;

    /**
     * 将页面滚动到目标位置。
     *
     * scrollTop 滚动到页面的目标位置（单位px）
     * [duration] 滚动动画的时长，默认300ms，单位 ms
     * @version 1.4.0
     */
    pageScrollTo(option?: PageScrollToOptions): void;
}


// #region 位置API
interface PageScrollToOptions {
    /** 滚动到页面的目标位置（单位px */
    scrollTop: number;

    /** 滚动动画的时长，默认300ms，单位 ms */
    duration?: number;
}

/**
 * Component实例方法
 */
interface Component<D, P> {
    /**
     * 组件的文件路径
     */
    is: string;

    /**
     * 节点id
     */
    id: string;

    /**
     * 节点dataset
     */
    dataset: string;

    /**
     * 组件数据，包括内部数据和属性值
     */
    data: { [key in keyof (D & P)]: wx.DataValueType<(D & P)[key]> };

    /**
     * 组件数据，包括内部数据和属性值（与 data 一致）
     */
    properties: { [key in keyof (D & P)]: wx.DataValueType<(D & P)[key]> };

    /**
     * 将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值
     * 1. 直接修改 this.data 而不调用 this.setData 是无法改变页面的状态的，还会造成数据不一致。
     * 2. 单次设置的数据不能超过1024kB，请尽量避免一次设置过多的数据。
     * 3. 请不要把 data 中任何一项的 value 设为 undefined ，否则这一项将不被设置并可能遗留一些潜在问题
     * @param data object 以 key，value 的形式表示将 this.data 中的 key 对应的值改变成 value
     * @param [callback] callback 是一个回调函数，在这次setData对界面渲染完毕后调用
     */
    setData(
        data: {
            [key in keyof D]?:
            | string
            | number
            | boolean
            | symbol
            | object
            | null
            | any[]
        },
        callback?: () => void
    ): void;

    /**
     * 检查组件是否具有 behavior
     * 检查时会递归检查被直接或间接引入的所有behavior
     */
    hasBehavior(behavior: any): boolean;

    /**
     * 触发事件，参见 [组件事件](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/custom-component/events.html)
     */
    triggerEvent(
        name: string,
        details?: any,
        options?: Partial<{
            bubbles: boolean;
            composed: boolean;
            capturePhase: boolean;
        }>
    ): void;

    /**
     * 创建一个 SelectorQuery 对象
     * 选择器选取范围为这个[组件实例](https://mp.weixin.qq.com/debug/wxadoc/dev/api/wxml-nodes-info.html)内
     */
    createSelectorQuery(): wx.SelectorQuery;

    /**
     * 节点布局交叉状态API可用于监听两个或多个组件节点在布局位置上的相交状态。这一组API常常可以用于推断某些节点是否可以被用户看见、有多大比例可以被用户看见。
     * https://developers.weixin.qq.com/miniprogram/dev/api/intersection-observer.html
     */
    createIntersectionObserver(
        options?: wx.CreateIntersectionObserverOption
    ): IntersectionObserver;

    /**
     * 使用选择器选择组件实例节点
     * 返回匹配到的第一个组件实例对象
     */
    selectComponent(selector: string): Component<any, any>;

    /**
     * selector  使用选择器选择组件实例节点，返回匹配到的全部组件实例对象组成的数组
     */
    selectAllComponents(selector: string): Array<Component<any, any>>;

    /**
     * 获取所有这个关系对应的所有关联节点，参见 [组件间关系](https://mp.weixin.qq.com/debug/wxadoc/dev/framework/custom-component/relations.html)
     */
    getRelationNodes(relationKey: string): wx.ComponentRelation[];
}
