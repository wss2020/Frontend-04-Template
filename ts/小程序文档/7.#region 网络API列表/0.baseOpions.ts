export interface BaseOptions<R = any, E = any> {
    /** 接口调用成功的回调函数 */
    success?(res: R): void;

    /** 接口调用失败的回调函数 */
    fail?(res: E): void;

    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(res: any): void;
}

export interface DataResponse {
    /** 回调函数返回的内容 */
    data: object | string | ArrayBuffer;
    /** 开发者服务器返回的 HTTP 状态码 */
    statusCode: number;
    /** 开发者服务器返回的 HTTP Response Header */
    header: object;
}

export interface TempFileResponse {
    /** 文件的临时路径 */
    tempFilePath: string;
}
