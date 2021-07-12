import {BaseOptions} from "./0.baseOpions";

export declare namespace wss {

    interface ActionSheetOptions extends BaseOptions {
        /**
         * 按钮的文字数组，数组长度最大为6个
         */
        itemList: string[];
        /**
         * 按钮的文字颜色，默认为"#000000"
         */
        itemColor?: string;

        /**
         * 接口调用成功的回调函数
         */
        success?(res: {
            /**
             * 用户点击的按钮，从上到下的顺序，从0开始
             */
            tapIndex: number;
        }): void;
    }

    /**
     * 显示操作菜单
     */
    function showActionSheet(options: ActionSheetOptions): void;

}
