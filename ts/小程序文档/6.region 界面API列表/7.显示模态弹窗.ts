import {BaseOptions} from "./0.baseOpions";

export declare namespace wss {

    interface ModalOptions extends BaseOptions {
        /**
         * 提示的标题
         */
        title: string;

        /**
         * 提示的内容
         */
        content: string;

        /**
         * 是否显示取消按钮，默认为 true
         */
        showCancel?: boolean;

        /**
         * 取消按钮的文字，默认为"取消"，最多 4 个字符
         */
        cancelText?: string;

        /**
         * 取消按钮的文字颜色，默认为"#000000"
         */
        cancelColor?: string;

        /**
         * 确定按钮的文字，默认为"确定"，最多 4 个字符
         */
        confirmText?: string;

        /**
         * 确定按钮的文字颜色，默认为"#3CC51F"
         */
        confirmColor?: string;

        success?(res: {
            /**
             * 为 true 时，表示用户点击了确定按钮
             */
            confirm: boolean;
            /**
             * 为 true 时，表示用户点击了取消（用于 Android 系统区分点击蒙层关闭还是点击取消按钮关闭）
             */
            cancel: boolean;
        }): void;
    }

    /**
     * 显示模态弹窗
     */
    function showModal(options: ModalOptions): void;



}
