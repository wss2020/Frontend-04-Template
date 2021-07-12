import {BaseOptions} from "./0.baseOpions";

export declare namespace wss {

    interface SetTopBarTextOptions extends BaseOptions {
        /**
         * 置顶栏文字内容
         */
        text: string;
    }

    /**
     * 动态设置置顶栏文字内容
     * 只有当前小程序被置顶时能生效，如果当前小程序没有被置顶，也能调用成功，但是不会立即生效
     * 只有在用户将这个小程序置顶后才换上设置的文字内容。
     * 注意：调用成功后，需间隔 5s 才能再次调用此接口，如果在 5s 内再次调用此接口，会回调
     * fail，errMsg："setTopBarText: fail invoke too frequently"
     * @version 1.4.3
     */
    function setTopBarText(options?: SetTopBarTextOptions): void;

}
