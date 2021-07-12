// #region 位置API
import {wx} from "../原文档";

export declare namespace wss {

    interface PageScrollToOptions {
        /** 滚动到页面的目标位置（单位px */
        scrollTop: number;
        /** 滚动动画的时长，默认300ms，单位 ms */
        duration?: number;
    }

    function pageScrollTo(options: PageScrollToOptions): void;

    /**
     * 返回一个SelectorQuery对象实例。
     * 可以在这个实例上使用select等方法选择节点，并使用boundingClientRect等方法选择需要查询的信息。
     * @version 1.4.0
     */
    function createSelectorQuery(): SelectorQuery;

    /**
     * WXML节点布局相交状态
     */
    interface CreateIntersectionObserverOption {
        thresholds?: [number, number];
        initialRatio?: number;
        selectAll?: boolean;
    }

    interface Margins {
        left?: number;
        right?: number;
        top?: number;
        bottom?: number;
    }

    interface RectArea {
        /** 节点的左边界坐标 */
        left: number;
        /** 节点的右边界坐标 */
        right: number;
        /** 节点的上边界坐标 */
        top: number;
        /** 节点的下边界坐标 */
        bottom: number;
        /** 节点的宽度 */
        width: number;
        /** 节点的高度 */
        height: number;
    }

    interface ObserveResponse {
        id: string;
        dataset: any;
        time: number;
        intersectionRatio: number; // 相交区域占目标节点的布局区域的比例
        boundingClientRect: RectArea;
        intersectionRect: RectArea;
        relativeRect: RectArea;
    }

    interface IntersectionObserver {
        relativeTo(selector?: string, margins?: Margins): IntersectionObserver;

        relativeToViewport(margins?: Margins): IntersectionObserver;

        observe(
            selector?: string,
            callback?: (response: ObserveResponse) => void
        ): IntersectionObserver;

        disconnect(): void;
    }

    function createIntersectionObserver(
        context: wx.Component<any, any>,
        options?: CreateIntersectionObserverOption
    ): IntersectionObserver;

    interface NodesRefRect extends RectArea {
        /** 节点的ID */
        id: string;
        /** 节点的dataset */
        dataset: any;
    }

    interface NodeRefOffset {
        /** 节点的ID */
        id: string;
        /** 节点的dataset */
        dataset: any;
        /** 节点的水平滚动位置 */
        scrollLeft: number;
        /** 节点的竖直滚动位置 */
        scrollTop: number;
    }

    interface NodeRefFieldsOptions {
        /** 是否返回节点id */
        id?: boolean;
        /** 是否返回节点dataset */
        dataset?: boolean;
        /** 是否返回节点布局位置（left right top bottom */
        rect?: boolean;
        /** 是否返回节点尺寸（width height） */
        size?: boolean;
        /** 是否返回节点的 scrollLeft scrollTop ，节点必须是scroll-view或者viewport */
        scrollOffset?: boolean;
        /**
         * 指定属性名列表
         * 返回节点对应属性名的当前属性值（只能获得组件文档中标注的常规属性值， id class style 和事件绑定的属性值不可获取
         */
        properties?: string[];
    }

    interface NodeRefFieldsValue {
        id: {
            id: boolean;
        };
        dataset: {
            dataset: string;
        };
        rect: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        };
        size: {
            width: number;
            height: number;
        };
        scrollOffset: {
            scrollLeft: number;
            scrollTop: number;
        };
        properties: {
            properties: any;
        };
    }

    interface NodesRef {
        /**
         * 添加节点的布局位置的查询请求，相对于显示区域，以像素为单位。
         * 其功能类似于DOM的getBoundingClientRect。
         * 返回值是nodesRef对应的selectorQuery。
         * 返回的节点信息中，每个节点的位置用
         * left、right、top、bottom、width、height字段描述。
         * 如果提供了callback回调函数，在执行selectQuery的exec方法后
         * 节点信息会在callback中返回。
         */
        boundingClientRect<T extends NodesRefRect | NodesRefRect[]>(
            callback?: (rect: T) => void
        ): SelectorQuery;

        /**
         * 添加节点的滚动位置查询请求，以像素为单位。
         * 节点必须是scroll-view或者viewport。
         * 返回值是nodesRef对应的selectorQuery。
         * 返回的节点信息中，每个节点的滚动位置用scrollLeft、scrollHeight字段描述。
         * 如果提供了callback回调函数，在执行selectQuery的exec方法后，节点信息会在callback中返回。
         */
        scrollOffset(callback?: (rect: NodeRefOffset) => void): SelectorQuery;

        /**
         * 获取节点的相关信息，需要获取的字段在fields中指定。
         * 返回值是nodesRef对应的selectorQuery。
         */
        fields(
            fields: NodeRefFieldsOptions,
            callback?: (result: any) => void
        ): SelectorQuery;
    }

    /**
     * SelectorQuery对象实例
     */
    interface SelectorQuery {
        /**
         * 将选择器的选取范围更改为自定义组件component内
         * （初始时，选择器仅选取页面范围的节点，不会选取任何自定义组件中的节点
         * @version 1.6.0
         */
        in(component: wx.Component<object, object>): SelectorQuery;

        /**
         * 在当前页面下选择第一个匹配选择器selector的节点，返回一个NodesRef对象实例，可以用于获取节点信息。
         * selector类似于CSS的选择器，但仅支持下列语法。
         * + ID选择器：#the-id
         * + class选择器（可以连续指定多个）：.a-class.another-class
         * + 子元素选择器：.the-parent > .the-child
         * + 后代选择器：.the-ancestor .the-descendant
         * + 跨自定义组件的后代选择器：.the-ancestor >>> .the-descendant
         * + 多选择器的并集：#a-node, .some-other-nodes
         */
        select(selector: string): NodesRef;

        /**
         * 在当前页面下选择匹配选择器selector的节点，返回一个NodesRef对象实例。
         * 与selectorQuery.selectNode(selector)不同的是，它选择所有匹配选择器的节点。
         */
        selectAll(selector: string): NodesRef;

        /**
         * 选择显示区域，可用于获取显示区域的尺寸、滚动位置等信息
         * 返回一个NodesRef对象实例。
         */
        selectViewport(): NodesRef;

        /**
         * 执行所有的请求
         * 请求结果按请求次序构成数组，在callback的第一个参数中返回。
         */
        exec(callback?: (result: any[]) => void): void;
    }

}
