import {BaseOptions} from "./0.baseOpions";

export declare namespace wss {

    /**
     * 开始下拉刷新，调用后触发下拉刷新动画，效果与用户手动下拉刷新一致
     * @version 1.5.0
     */
    function startPullDownRefresh(options?: BaseOptions): void;

    /**
     * 停止当前页面下拉刷新
     * @version 1.5.0
     */
    function stopPullDownRefresh(options?: BaseOptions): void;

}
