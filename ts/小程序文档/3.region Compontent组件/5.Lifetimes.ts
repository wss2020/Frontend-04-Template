/**
 * 组件生命周期声明对象，组件的生命周期：created、attached、ready、moved、detached将收归到lifetimes字段内进行声明，
 * 原有声明方式仍旧有效，如同时存在两种声明方式，则lifetimes字段内声明方式优先级最高
 */
interface Lifetimes {
    /**
     * 组件生命周期函数，在组件实例进入页面节点树时执行
     * 注意此时不能调用 setData
     */
    created(): void;

    /**
     * 组件生命周期函数，在组件实例进入页面节点树时执行
     */
    attached(): void;

    /**
     * 组件生命周期函数，在组件布局完成后执行，此时可以获取节点信息
     * 使用 [SelectorQuery](https://mp.weixin.qq.com/debug/wxadoc/dev/api/wxml-nodes-info.html)
     */
    ready(): void;

    /**
     * 组件生命周期函数，在组件实例被移动到节点树另一个位置时执行
     */
    moved(): void;

    /**
     * 组件生命周期函数，在组件实例被从页面节点树移除时执行
     */
    detached(): void;
}
