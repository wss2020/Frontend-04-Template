import {wx} from "../原文档";

interface ComponentRelation<D = any, P = any> {
    /** 目标组件的相对关系，可选的值为 parent 、 child 、 ancestor 、 descendant */
    type: "parent" | "child" | "ancestor" | "descendant";

    /** 如果这一项被设置，则它表示关联的目标节点所应具有的behavior，所有拥有这一behavior的组件节点都会被关联 */
    target?: string;

    /** 关系生命周期函数，当关系被建立在页面节点树中时触发，触发时机在组件attached生命周期之后 */
    linked?: (target: wx.Component<D, P>) => void;

    /** 关系生命周期函数，当关系在页面节点树中发生改变时触发，触发时机在组件moved生命周期之后 */
    linkChanged?: (target: wx.Component<D, P>) => void;

    /** 关系生命周期函数，当关系脱离页面节点树时触发，触发时机在组件detached生命周期之后 */
    unlinked?: (target: wx.Component<D, P>) => void;
}

