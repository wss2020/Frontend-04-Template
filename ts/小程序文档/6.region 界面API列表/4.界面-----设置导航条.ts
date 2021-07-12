import {BaseOptions} from "./0.baseOpions";

export declare namespace wss {

    interface SetNavigationBarTitleOptions extends BaseOptions {
        /** 页面标题 */
        title: string;
    }

    /**
     * 动态设置当前页面的标题。
     * @version 1.4.3
     */
    function setNavigationBarTitle(options: SetNavigationBarTitleOptions): void;

    interface SetNavigationBarColorOptions extends BaseOptions {
        /**
         * 前景颜色值，包括按钮、标题、状态栏的颜色，仅支持 #ffffff 和 #000000
         */
        frontColor: "#ffffff" | "#000000";
        /**
         * 背景颜色值，有效值为十六进制颜色
         */
        backgroundColor: string;
        /**
         * 动画效果
         */
        animation?: {
            // 动画变化时间，默认0，单位：毫秒
            duratio?: number;
            /**
             * 动画变化方式，默认 linear
             * 值    说明
             * 有效值：
             * linear    动画从头到尾的速度是相同的。
             * easeIn    动画以低速开始
             * easeOut    动画以低速结束。
             * easeInOut    动画以低速开始和结束。
             */
            timingFunc?: "linear" | "easeIn" | "easeOut" | "easeInOut";
        };
    }

    /**
     * 设置导航颜色
     * @version 1.4.3
     */
    function setNavigationBarColor(options: SetNavigationBarColorOptions): void;

    /**
     * 在当前页面显示导航条加载动画。
     * @version 1.4.3
     */
    function showNavigationBarLoading(): void;

    /**
     * 隐藏导航条加载动画。
     * @version 1.4.3
     */
    function hideNavigationBarLoading(): void;

}
