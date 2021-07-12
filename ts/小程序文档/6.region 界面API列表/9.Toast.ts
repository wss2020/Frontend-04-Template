import {BaseOptions} from "./0.baseOpions";

export declare namespace wss {

    interface ToastOptions extends BaseOptions {
        /**
         * 提示的内容
         */
        title: string;
        /**
         * 图标，只支持"success"、"loading", @version 1.9.0开始支持"none"
         * 图标为"success"/"loading"时，title文本最多显示7个汉字长度
         * 图标为"none"时不显示图标，title文本最多可显示两行
         */
        icon?: "success" | "loading" | "none";
        /**
         * 自定义图标的本地路径，image 的优先级高于 icon
         */
        image?: string;
        /**
         * 提示的延迟时间，单位毫秒，默认：1500
         */
        duration?: number;
        /**
         * 是否显示透明蒙层，防止触摸穿透，默认：false
         */
        mask?: boolean;
    }

    /**
     * 显示消息提示框
     */
    function showToast(options: ToastOptions): void;

    function hideToast(): void;


}
