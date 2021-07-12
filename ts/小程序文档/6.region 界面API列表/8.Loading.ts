import {BaseOptions} from "./0.baseOpions";

export declare namespace wss {

    interface LoadingOptions extends BaseOptions {
        /**
         * 提示的内容
         */
        title: string;
        /**
         * 是否显示透明蒙层，防止触摸穿透，默认：false
         */
        mask?: boolean;
    }

    /**
     * 显示 loading 提示框, 需主动调用 wx.hideLoading 才能关闭提示框
     */
    function show
    (options: LoadingOptions): void;

    /**
     * 隐藏消息提示框
     */
    function hideLoading(): void;



}
