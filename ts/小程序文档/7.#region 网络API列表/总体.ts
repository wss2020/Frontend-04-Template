import {BaseOptions} from "./0.baseOpions";

export declare namespace wss {

    interface DataResponse {
        /** 回调函数返回的内容 */
        data: object | string | ArrayBuffer;
        /** 开发者服务器返回的 HTTP 状态码 */
        statusCode: number;
        /** 开发者服务器返回的 HTTP Response Header */
        header: object;
    }

    interface TempFileResponse {
        /** 文件的临时路径 */
        tempFilePath: string;
    }

    // #region 网络API列表
    // 发起请求
    interface RequestHeader {
        [key: string]: string;
    }

    interface RequestOptions extends BaseOptions<DataResponse> {
        /** 开发者服务器接口地址 */
        url: string;
        /** 请求的参数 */
        data?: string | object | ArrayBuffer;
        /** 设置请求的 header , header 中不能设置 Referer */
        header?: RequestHeader;
        /** 默认为 GET，有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT */
        method?:
            | "GET"
            | "OPTIONS"
            | "HEAD"
            | "POST"
            | "PUT"
            | "DELETE"
            | "TRACE"
            | "CONNECT";
        /** 如果设为json，会尝试对返回的数据做一次 JSON.parse */
        dataType?: string;
        /**
         * 设置响应的数据类型。合法值：text、arraybuffer
         * @version 1.7.0
         */
        responseType?: string;

        /** 收到开发者服务成功返回的回调函数，res = {data: '开发者服务器返回的内容'} */
        success?(res: DataResponse): void;
    }

    /**
     * 返回一个 requestTask 对象，通过 requestTask，可中断请求任务。
     */
    interface RequestTask {
        abort(): void;
    }

    /**
     * wx.request发起的是https请求。一个微信小程序，同时只能有5个网络请求连接。
     */
    function request(options: RequestOptions): RequestTask;

    interface UploadFileResponse {
        data: string; // 开发者服务器返回的数据
        statusCode: number; // 开发者服务器返回的 HTTP 状态码
    }

    interface UploadTask {
        /**
         * 监听上传进度变化
         * @version 1.4.0
         */
        onProgressUpdate(
            callback?: (
                res: {
                    /** 上传进度百分比 */
                    progress: number;
                    /** 已经上传的数据长度，单位 Bytes */
                    totalBytesSent: number;
                    /** 预期需要上传的数据总长度，单位 Bytes */
                    totalBytesExpectedToSend: number;
                }
            ) => void
        ): void;

        /**
         * 中断下载任务
         * @version 1.4.0
         */
        abort(): void;
    }

    // 上传下载
    interface UploadFileOptions extends BaseOptions {
        /** 开发者服务器 url */
        url: string;
        /** 要上传文件资源的路径 */
        filePath: string;
        /** 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容 */
        name: string;
        /** HTTP 请求 Header , header 中不能设置 Referer */
        header?: RequestHeader;
        /** HTTP 请求中其他额外的 form data */
        formData?: any;
    }

    /**
     * 将本地资源上传到开发者服务器。
     * 如页面通过 wx.chooseImage 等接口获取到一个本地资源的临时文件路径后，
     * 可通过此接口将本地资源上传到指定服务器。
     * 客户端发起一个 HTTPS POST 请求，
     * 其中 Content-Type 为 multipart/form-data 。
     */
    function uploadFile(options: UploadFileOptions): UploadTask;



    interface DownloadTask {
        /**
         * 监听下载进度变化
         * @version 1.4.0
         */
        onProgressUpdate(
            callback?: (
                res: {
                    /** 下载进度百分比 */
                    progress: number;
                    /** 已经下载的数据长度，单位 Bytes */
                    totalBytesWritten: number;
                    /** 预期需要下载的数据总长度，单位 Bytes */
                    totalBytesExpectedToWrite: number;
                }
            ) => void
        ): void;

        /**
         * 中断下载任务
         * @version 1.4.0
         */
        abort(): void;
    }

    interface DownloadFileOptions extends BaseOptions {
        /** 下载资源的 url */
        url: string;
        /** 下载资源的类型，用于客户端识别处理，有效值：image/audio/video */
        type?: string;
        /** HTTP 请求 Header */
        header?: RequestHeader;

        /** 下载成功后以 tempFilePath 的形式传给页面，res = {tempFilePath: '文件的临时路径'} */
        success?(res: TempFileResponse): void;
    }

    /**
     * 下载文件资源到本地。客户端直接发起一个 HTTP GET 请求，
     * 把下载到的资源根据 type 进行处理，并返回文件的本地临时路径。
     */
    function downloadFile(options: DownloadFileOptions): DownloadTask;




    // WebSocket
    interface ConnectSocketOptions extends BaseOptions {
        /** 开发者服务器接口地址，必须是 HTTPS 协议，且域名必须是后台配置的合法域名 */
        url: string;
        /** 请求的数据 */
        data?: any;
        /** HTTP Header , header 中不能设置 Referer */
        header?: RequestHeader;
        /** 默认是GET，有效值为： OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT */
        method?: string;
        /**
         * 子协议数组
         * @version 1.4.0
         */
        protocols?: string[];
    }

    /**
     * 创建一个 WebSocket 连接；
     * 一个微信小程序同时只能有一个 WebSocket 连接，
     * 如果当前已存在一个 WebSocket 连接，
     * 会自动关闭该连接，并重新创建一个 WebSocket 连接。
     */
    function connectSocket(options: ConnectSocketOptions): void;

    /** 监听WebSocket连接打开事件。 */
    function onSocketOpen(callback: () => void): void;

    /** 监听WebSocket错误。 */
    function onSocketError(callback: (error: any) => void): void;


    interface SendSocketMessageOptions extends BaseOptions {
        /** 需要发送的内容 */
        data: string | ArrayBuffer;
    }

    /**
     * 通过 WebSocket 连接发送数据，需要先 wx.connectSocket，
     * 并在 wx.onSocketOpen 回调之后才能发送。
     */
    function sendSocketMessage(options: SendSocketMessageOptions): void;

    /**
     * 监听WebSocket接受到服务器的消息事件。
     */
    function onSocketMessage(callback: (res: DataResponse) => void): void;

    /**
     * 关闭WebSocket连接。
     */
    interface CloseSocketOptions extends BaseOptions {
        code?: number; // 一个数字值表示关闭连接的状态号，表示连接被关闭的原因。如果这个参数没有被指定，默认的取值是1000 （表示正常连接关闭）	1.4.0
        reason?: string; // 一个可读的字符串，表示连接被关闭的原因。这个字符串必须是不长于123字节的UTF-8 文本（不是字符）
    }

    /**
     * 关闭WebSocket连接。
     */
    function closeSocket(options: CloseSocketOptions): void;

    /** 监听WebSocket关闭。 */
    function onSocketClose(callback: () => void): void;

    // #endregion


}
