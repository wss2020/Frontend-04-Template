
export interface BaseOptions<R = any, E = any> {
    /** 接口调用成功的回调函数 */
    success?(res: R): void;

    /** 接口调用失败的回调函数 */
    fail?(res: E): void;

    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(res: any): void;
}
