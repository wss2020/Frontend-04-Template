// Type definitions for wx-app 2.2
// Project: https://mp.weixin.qq.com/debug/wxadoc/dev/api/
// Definitions by: taoqf <https://github.com/taoqf>
//                 AlexStacker <https://github.com/AlexStacker>
//                 Jimexist <https://github.com/Jimexist>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

export declare namespace wx {
    // #region 基本参数
    interface DataResponse {
        /** 回调函数返回的内容 */
        data: object | string | ArrayBuffer;
        /** 开发者服务器返回的 HTTP 状态码 */
        statusCode: number;
        /** 开发者服务器返回的 HTTP Response Header */
        header: object;
    }
    interface ErrMsgResponse {
        /** 成功：ok，错误：详细信息 */
        errMsg: "ok" | string;
    }
    interface TempFileResponse {
        /** 文件的临时路径 */
        tempFilePath: string;
    }
    interface BaseOptions<R = any, E = any> {
        /** 接口调用成功的回调函数 */
        success?(res: R): void;
        /** 接口调用失败的回调函数 */
        fail?(res: E): void;
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?(res: any): void;
    }
    interface ErrCodeResponse {
        errCode: number;
    }
    // #endregion










    // #region 媒体API列表
    // 媒体-----图片
    type ImageSizeType = "original" | "compressed";
    type ImageSourceType = "album" | "camera";
    type VideoSourceType = "album" | "camera";
    type CameraDevice = "front" | "back";
    interface TempFile {
        /** 本地文件路径 */
        path: string;
        /** 本地文件大小，单位：B */
        size: number;
    }
    interface TempFilesData {
        /** 文件的临时路径 */
        tempFilePaths: string;
        /**
         * 图片的本地文件列表，每一项是一个 File 对象
         * @version 1.2.0
         */
        tempFiles: TempFile[];
    }
    interface ChooseImageOptions extends BaseOptions {
        /** 最多可以选择的图片张数，默认9 */
        count?: number;
        /** original 原图，compressed 压缩图，默认二者都有 */
        sizeType?: ImageSizeType[];
        /** album 从相册选图，camera 使用相机，默认二者都有 */
        sourceType?: ImageSourceType[];
        /** 成功则返回图片的本地文件路径列表 tempFilePaths */
        success(res: TempFilesData): void;
    }
    /**
     * 从本地相册选择图片或使用相机拍照。
     */
    function chooseImage(options: ChooseImageOptions): void;

    interface CompressImageOptions extends BaseOptions {
        /** 图片路径，图片的路径，可以是相对路径、临时文件路径、存储文件路径 */
        src: string;
        /** 压缩质量，范围0～100，数值越小，质量越低，压缩率越高。默认值: 80*/
        quality?: number;
    }
    /**
     * 压缩图片接口，可选压缩质量
     * @param options
     * @version 2.4.0
     */
    function compressImage(options: CompressImageOptions): void;
    interface PreviewImageOptions extends BaseOptions {
        /** 当前显示图片的链接，不填则默认为 urls 的第一张 */
        current?: string;
        /** 需要预览的图片链接列表 */
        urls: string[];
    }
    /**
     * 预览图片。
     */
    function previewImage(options: PreviewImageOptions): void;
    interface GetImageInfoOptions extends BaseOptions {
        /**
         * 图片的路径，可以是相对路径，临时文件路径，存储文件路径，网络图片路径
         */
        src: string;
    }
    /**
     * 获取图片信息
     */
    function getImageInfo(options: GetImageInfoOptions): void;
    interface SaveImageToPhotosAlbumOptions extends BaseOptions {
        /**
         * 图片的路径，可以是相对路径，临时文件路径，存储文件路径，网络图片路径
         */
        filePath: string;
        success(res: { errMsg: string }): void;
    }
    /**
     * 保存图片到系统相册。
     * 需要用户授权 scope.writePhotosAlbum
     * @version 1.2.0
     */
    function saveImageToPhotosAlbum(options: SaveImageToPhotosAlbumOptions): void;
    // 媒体-----录音
    interface StartRecordAudioOptions extends BaseOptions {
        /** 录音成功后调用，返回录音文件的临时文件路径，res = {tempFilePath: '录音文件的临时路径'} */
        success?(res: TempFileResponse): void;
    }
    /**
     * 开始录音。当主动调用wx.stopRecord，
     * 或者录音超过1分钟时自动结束录音，返回录音文件的临时文件路径。
     * 注：文件的临时路径，在小程序本次启动期间可以正常使用，
     * 如需持久保存，需在主动调用wx.saveFile，在小程序下次启动时才能访问得到。
     * @deprecated 1.6.0
     */
    function startRecord(options: StartRecordAudioOptions): void;

    interface StopRecordAudioOptions extends BaseOptions {
        success?(res: TempFileResponse): void;
    }
    /**
     * 主动调用停止录音。
     */
    function stopRecord(options?: StopRecordAudioOptions): void;
    type EncodeBitRate =
        | 8000
        | 11025
        | 12000
        | 16000
        | 22050
        | 24000
        | 32000
        | 44100
        | 48000;
    interface RecorderManagerStartOptions {
        /**
         * 指定录音的时长，单位 ms
         * 如果传入了合法的 duration
         * 在到达指定的 duration 后会自动停止录音，最大值 600000（10 分钟）,默认值 60000（1 分钟）
         */
        duration?: number;
        /**
         * 采样率，有效值 8000/16000/44100
         */
        sampleRate?: number;
        /**
         * 否 录音通道数，有效值 1/2
         */
        numberOfChannels?: number;
        /**
         * 编码码率
         * 采样率和码率有一定要求，具体有效值如下：
         * 采样率 编码码率
         * + 8000 16000 ~ 48000
         * + 11025 16000 ~ 48000
         * + 12000 24000 ~ 64000
         * + 16000 24000 ~ 96000
         * + 22050 32000 ~ 128000
         * + 24000 32000 ~ 128000
         * + 32000 48000 ~ 192000
         * + 44100 64000 ~ 320000
         * + 48000 64000 ~ 320000
         */
        encodeBitRate: number;
        /** 音频格式，有效值 aac/mp3 */
        format: string;
        /**
         * 指定帧大小，单位 KB
         * 传入 frameSize 后，每录制指定帧大小的内容后
         * 会回调录制的文件内容，不指定则不会回调。暂仅支持 mp3 格式。
         */
        frameSize: number;
    }
    interface OnRecorderManagerStopOptions {
        tempFilePath: string;
    }
    interface OnFrameRecordedOptions {
        /**  录音分片结果数据 */
        frameBuffer: ArrayBuffer;
        /** 当前帧是否正常录音结束前的最后一帧 */
        isLastFrame: boolean;
    }
    interface RecorderManager {
        /** 开始录音 */
        start(options?: RecorderManagerStartOptions): void;
        /** 暂停录音 */
        pause(): void;
        /** 继续录音 */
        resume(): void;
        /** 停止录音 */
        stop(): void;
        /** 录音开始事件 */
        onStart(callback?: () => void): void;
        /** 录音暂停事件 */
        onPause(callback?: () => void): void;
        /** 录音恢复事件 */
        onResume(callback?: () => void): void;
        /** 录音停止事件，会回调文件地址 */
        onStop(callback?: (options: OnRecorderManagerStopOptions) => void): void;
        /** 已录制完指定帧大小的文件，会回调录音分片结果数据。如果设置了 frameSize ，则会回调此事件 */
        onFrameRecorded(callback?: (options: OnFrameRecordedOptions) => void): void;
        /** 录音错误事件, 会回调错误信息 */
        onError(callback?: (err: ErrMsgResponse) => void): void;
    }
    /**
     * 获取全局唯一的录音管理器 recorderManager
     * @version 1.6.0
     */
    function getRecorderManager(): RecorderManager;
    // 媒体-----音频播放控制
    interface PlayVoiceOptions extends BaseOptions {
        /** 需要播放的语音文件的文件路径 */
        filePath: string;
    }
    /**
     * 开始播放语音，同时只允许一个语音文件正在播放，
     * 如果前一个语音文件还没播放完，将中断前一个语音播放。
     * @deprecated 1.6.0
     */
    function playVoice(options: PlayVoiceOptions): void;
    /**
     * 暂停正在播放的语音。
     * 再次调用wx.playVoice播放同一个文件时，会从暂停处开始播放。
     * 如果想从头开始播放，需要先调用 wx.stopVoice。
     * @deprecated 1.6.0
     */
    function pauseVoice(): void;
    /**
     * 结束播放语音。
     * @deprecated 1.6.0
     */
    function stopVoice(): void;
    // 媒体-----音乐播放控制
    interface BackgroundAudioPlayerState {
        /** 选定音频的长度（单位：s），只有在当前有音乐播放时返回 */
        duration: number;
        /** 选定音频的播放位置（单位：s），只有在当前有音乐播放时返回 */
        currentPosition: number;
        /** 播放状态（2：没有音乐在播放，1：播放中，0：暂停中） */
        status: number;
        /** 音频的下载进度（整数，80 代表 80%），只有在当前有音乐播放时返回 */
        downloadPercent: number;
        /** 歌曲数据链接，只有在当前有音乐播放时返回 */
        dataUrl: string;
    }
    interface GetBackgroundAudioPlayerStateOptions extends BaseOptions {
        /** 接口调用成功的回调函数 */
        success?(state: BackgroundAudioPlayerState): void;
        /** 接口调用失败的回调函数 */
        fail?(): void;
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?(): void;
    }
    /**
     * 获取音乐播放状态。
     * @deprecated 1.2.0
     */
    function getBackgroundAudioPlayerState(
        options: GetBackgroundAudioPlayerStateOptions
    ): void;
    interface PlayBackgroundAudioOptions extends BaseOptions {
        /** 音乐链接 */
        dataUrl: string;
        /** 音乐标题 */
        title?: string;
        /** 封面URL */
        coverImgUrl?: string;
    }
    /**
     * 播放音乐，同时只能有一首音乐正在播放。
     * @deprecated 1.2.0
     */
    function playBackgroundAudio(options: PlayBackgroundAudioOptions): void;
    /**
     * 暂停播放音乐。
     * @deprecated 1.2.0
     */
    function pauseBackgroundAudio(options?: PlayBackgroundAudioOptions): void;
    interface SeekBackgroundAudioOptions extends BaseOptions {
        /** 音乐位置，单位：秒 */
        position: number;
    }
    /**
     * 控制音乐播放进度。
     * @deprecated 1.2.0
     */
    function seekBackgroundAudio(options: SeekBackgroundAudioOptions): void;
    /**
     * 停止播放音乐。
     * @deprecated 1.2.0
     */
    function stopBackgroundAudio(options?: PlayBackgroundAudioOptions): void;
    /**
     * 监听音乐播放。
     * @deprecated 1.2.0
     */
    function onBackgroundAudioPlay(callback: () => void): void;
    /**
     * 监听音乐暂停。
     * @deprecated 1.2.0
     */
    function onBackgroundAudioPause(callback: () => void): void;
    /**
     * 监听音乐停止。
     * @deprecated 1.2.0
     */
    function onBackgroundAudioStop(callback: () => void): void;
    interface BackgroundAudioManager {
        /** 当前音频的长度（单位：s），只有在当前有合法的 src 时返回 */
        readonly duration: number;
        /** 当前音频的播放位置（单位：s），只有在当前有合法的 src 时返回 */
        readonly currentTime: number;
        /** 当前是是否暂停或停止状态，true 表示暂停或停止，false 表示正在播放 */
        readonly paused: boolean;
        /** 音频的数据源，默认为空字符串，当设置了新的 src 时，会自动开始播放 ，目前支持的格式有 m4a, aac, mp3, wav */
        src: string;
        /** 音频开始播放的位置（单位：s） */
        startTime: number;
        /** 音频缓冲的时间点，仅保证当前播放时间点到此时间点内容已缓冲。 是 */
        buffered: number;
        /** 音频标题，用于做原生音频播放器音频标题。原生音频播放器中的分享功能，分享出去的卡片标题，也将使用该值。 */
        title: string;
        /** 专辑名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值 */
        epname: string;
        /** 歌手名，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值 */
        singer: string;
        /** 封面图url，用于做原生音频播放器背景图。原生音频播放器中的分享功能，分享出去的卡片配图及背景也将使用该图。 */
        coverImgUrl: string;
        /** 页面链接，原生音频播放器中的分享功能，分享出去的卡片简介，也将使用该值 */
        webUrl: string;
        /** 播放 */
        play(): void;
        /** 暂停 */
        pause(): void;
        /** 停止 */
        stop(): void;
        /** 跳转到指定位置，单位 s */
        seek(position: number): void;
        /** 背景音频进入可以播放状态，但不保证后面可以流畅播放 */
        onCanplay(callback: (res: ErrCodeResponse) => void): void;
        /** 背景音频播放事件 */
        onPlay(callback: (res: ErrCodeResponse) => void): void;
        /** 背景音频暂停事件 */
        onPause(callback: (res: ErrCodeResponse) => void): void;
        /** 背景音频停止事件 */
        onStop(callback: (res: ErrCodeResponse) => void): void;
        /** 背景音频自然播放结束事件 */
        onEnded(callback: (res: ErrCodeResponse) => void): void;
        /** 背景音频播放进度更新事件 */
        onTimeUpdate(callback: (res: ErrCodeResponse) => void): void;
        /** 用户在系统音乐播放面板点击上一曲事件（iOS only） */
        onPrev(callback: (res: ErrCodeResponse) => void): void;
        /** 用户在系统音乐播放面板点击下一曲事件（iOS only） */
        onNext(callback: (res: ErrCodeResponse) => void): void;
        /** 背景音频播放错误事件 */
        onError(callback: (res: ErrCodeResponse) => void): void;
        /** 音频加载中事件，当音频因为数据不足，需要停下来加载时会触发 */
        onWaiting(callback: (res: ErrCodeResponse) => void): void;
    }
    /**
     * 获取全局唯一的背景音频管理器 backgroundAudioManager。
     * @version 1.2.0
     */
    function getBackgroundAudioManager(): BackgroundAudioManager;
    // 媒体-----音频组件控制
    /**
     * audioContext 通过 audioId 跟一个 <audio/> 组件绑定，通过它可以操作对应的 <audio/> 组件。
     */
    interface AudioContext {
        /**
         * 音频的地址
         */
        setSrc(src: string): void;
        /**
         * 播放
         */
        play(): void;
        /**
         * 暂停
         */
        pause(): void;
        /**
         * 跳转到指定位置，单位 s
         */
        seek(position: number): void;
    }
    /**
     * 创建并返回 audio 上下文 audioContext 对象
     * @param audioId audio标签id <audio  src="{{src}}" id="myAudio" ></audio>
     * @example
     * <!-- audio.wxml -->
     * <audio  src="{{src}}" id="myAudio" ></audio>
     * <button type="primary" bindtap="audioPlay">播放</button>
     * <button type="primary" bindtap="audioPause">暂停</button>
     * <button type="primary" bindtap="audio14">设置当前播放时间为14秒</button>
     * <button type="primary" bindtap="audioStart">回到开头</button>
     * // audio.js
     * Page({
     * onReady: function (e) {
     *   // 使用 wx.createAudioContext 获取 audio 上下文 context
     *   this.audioCtx = wx.createAudioContext('myAudio')
     *   this.audioCtx.setSrc('http://ws.stream.qqmusic.qq.com/
     * M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&
     * uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&
     * fromtag=46')
     *   this.audioCtx.play()
     * },
     * data: {
     *   src: ''
     * },
     * audioPlay: function () {
     *   this.audioCtx.play()
     * },
     * audioPause: function () {
     *   this.audioCtx.pause()
     * },
     * audio14: function () {
     *   this.audioCtx.seek(14)
     * },
     * audioStart: function () {
     *   this.audioCtx.seek(0)
     * }
     * })
     * @deprecated 1.6.0
     */
    function createAudioContext(audioId: string, instance: any): AudioContext;
    interface InnerAudioContext {
        /** 当前音频的长度（单位：s），只有在当前有合法的 src 时返 */
        readonly duration: number;
        /** 当前音频的播放位置（单位：s），只有在当前有合法的 src 时返回，时间不取整，保留小数点后 6  */
        readonly currentTime: number;
        /** 当前是是否暂停或停止状态，true 表示暂停或停止，false 表示正在播 */
        readonly paused: boolean;
        /**  音频缓冲的时间点，仅保证当前播放时间点到此时间点内容已缓冲 */
        readonly buffered: number;
        /** 音频的数据链接，用于直接播放。 */
        src: string;
        /** 开始播放的位置（单位：s），默认 0 */
        startTime: number;
        /** 是否自动开始播放，默认 false */
        autoplay: boolean;
        /** 是否循环播放，默认 false */
        loop: boolean;
        /** 是否遵循系统静音开关，当此参数为 false 时，即使用户打开了静音开关，也能继续发出声音，默认值 true */
        obeyMuteSwitch: boolean;
        /** 播放 */
        play(): void;
        /** 暂停 */
        pause(): void;
        /** 停止 */
        stop(): void;
        /** 跳转到指定位置，单位 s */
        seek(position: number): void;
        /** 销毁当前实例 */
        destroy(): void;
        /** 音频进入可以播放状态，但不保证后面可以流畅播放 */
        onCanplay(callback: (res: ErrCodeResponse) => void): void;
        /** 音频播放事件 */
        onPlay(callback: (res: ErrCodeResponse) => void): void;
        /** 音频暂停事件 */
        onPause(callback: (res: ErrCodeResponse) => void): void;
        /** 音频停止事件 */
        onStop(callback: (res: ErrCodeResponse) => void): void;
        /** 音频自然播放结束事件 */
        onEnded(callback: (res: ErrCodeResponse) => void): void;
        /** 音频播放进度更新事件 */
        onTimeUpdate(callback: (res: ErrCodeResponse) => void): void;
        /** 音频播放错误事件 */
        onError(callback: (res: ErrCodeResponse) => void): void;
        /** 音频加载中事件，当音频因为数据不足，需要停下来加载时会触发 */
        onWaiting(callback: (res: ErrCodeResponse) => void): void;
        /** 音频进行 seek 操作事件 */
        onSeeking(callback: (res: ErrCodeResponse) => void): void;
        /** 音频完成 seek 操作事件 */
        onSeeked(callback: (res: ErrCodeResponse) => void): void;
    }
    /**
     * 创建并返回内部 audio 上下文 innerAudioContext 对象。
     * 本接口是 wx.createAudioContext 升级版。
     * @version 1.6.0
     */
    function createInnerAudioContext(): InnerAudioContext;
    // 媒体-----视频
    interface ChooseVideoOptions extends BaseOptions {
        /** album 从相册选视频，camera 使用相机拍摄，默认为：['album', 'camera'] */
        sourceType?: VideoSourceType[];
        /** 是否压缩所选的视频源文件，默认值为true，需要压缩 */
        compressed?: boolean;
        /** 拍摄视频最长拍摄时间，单位秒。最长支持60秒 */
        maxDuration?: number;
        /** 前置或者后置摄像头，默认为前后都有，即：['front', 'back'] */
        camera?: CameraDevice;
        /** 接口调用成功，返回视频文件的临时文件路径，详见返回参数说明 */
        success?(res: VideoData): void;
    }
    /**
     * 拍摄视频或从手机相册中选视频，返回视频的临时文件路径。
     */
    function chooseVideo(options: ChooseVideoOptions): void;

    interface SaveVideoOptions extends BaseOptions {
        filePath: string; // 视频文件路径，可以是临时文件路径也可以是永久文件路径
        success(errMsg: string): void;
    }

    /** 保存视频到系统相册。需要用户授权 scope.writePhotosAlbum */
    function saveVideoToPhotosAlbum(options: SaveVideoOptions): void;
    // 媒体-----视频组件控制
    interface VideoContext {
        /**
         * 播放
         */
        play(): void;
        /**
         * 暂停
         */
        pause(): void;
        /**
         * 跳转到指定位置，单位 s
         */
        seek(position: number): void;
        /**
         * 发送弹幕，danmu 包含两个属性 text, color。
         */
        sendDanmu(danmu: { text: string; color: number | string }): void;
        /**
         *  设置倍速播放，支持的倍率有 0.5/0.8/1.0/1.25/1.5
         */
        playbackRate(rate: 0.5 | 0.8 | 1.0 | 1.25 | 1.5): void;
        /**
         *  进入全屏
         */
        requestFullScreen(options?: {
            direction: 0 | 90 | -90; // 设置全屏时视频的方向，不指定则根据宽高比自动判断。有效值为 0（正常竖向）, 90（屏幕逆时针90度）, -90（屏幕顺时针90度）
        }): void; // 进入全屏
        /**
         * 退出全屏
         */
        exitFullScreen(): void; // 退出全屏
    }
    interface VideoData {
        /** 选定视频的临时文件路径 */
        tempFilePath: string;
        /** 选定视频的时间长度 */
        duration: number;
        /** 选定视频的数据量大小 */
        size: number;
        /** 返回选定视频的长 */
        height: number;
        /** 返回选定视频的宽 */
        width: number;
    }
    /**
     * 创建并返回 video 上下文 videoContext 对象
     * @param videoId video标签id <video  src="{{src}}" id="myVideo" ></video>
     */
    function createVideoContext(videoId: string): VideoContext;
    interface TakePhotoOptions extends BaseOptions {
        /** 成像质量，值为high, normal, low，默认normal */
        quality?: string;
        success?(res: { tempImagePath: string }): void;
    }
    interface RecordResponse {
        tempThumbPath: string;
        tempVideoPath: string;
    }
    interface StartRecordOptions extends BaseOptions {
        /** 超过30s或页面onHide时会结束录像 */
        timeoutCallback?(res: RecordResponse): void;
    }
    interface StopRecordOptions extends BaseOptions {
        success?(res: RecordResponse): void;
    }
    interface CameraContext {
        /** 拍照，可指定质量，成功则返回图片 */
        takePhoto(options: TakePhotoOptions): void;
        /** 开始录像 */
        startRecord(options: StartRecordOptions): void;
        /** 结束录像，成功则返回封面与视频 */
        stopRecord(options: StopRecordOptions): void;
    }
    /**
     * 创建并返回 camera 上下文 cameraContext 对象
     * cameraContext 与页面的 camera 组件绑定
     * 一个页面只能有一个camera，通过它可以操作对应的 <camera/> 组件。
     * 在自定义组件下，第一个参数传入组件实例this，以操作组件内 <camera/> 组件
     * @version 1.6.0
     */
    function createCameraContext(instance?: any): CameraContext;
    interface RequestFullScreenOptions extends BaseOptions {
        /** 有效值为 0（正常竖向）, 90（屏幕逆时针90度）, -90（屏幕顺时针90度） */
        direction: number;
    }
    interface LivePlayerContext {
        /** 播放 */
        play(options: BaseOptions): void;
        /** 停止 */
        stop(options: BaseOptions): void;
        /** 静音 */
        mute(options: BaseOptions): void;
        /** 进入全屏 */
        requestFullScreen(options: RequestFullScreenOptions): void;
        /** 退出全屏 */
        exitFullScreen(options: BaseOptions): void;
    }
    /**
     * 操作对应的 <live-player/> 组件。
     * 创建并返回 live-player 上下文 LivePlayerContext 对象。
     * 在自定义组件下，第二个参数传入组件实例this，以操作组件内 <live-player/> 组件
     * @version 1.7.0
     */
    function createLivePlayerContext(
        id: string,
        instance: any
    ): LivePlayerContext;
    // 文件
    interface SavedFileData {
        /** 文件的保存路径 */
        savedFilePath: string;
    }
    interface SaveFileOptions extends BaseOptions {
        /** 需要保存的文件的临时路径 */
        tempFilePath: string;
        /** 返回文件的保存路径，res = {savedFilePath: '文件的保存路径'} */
        success?(res: SavedFileData): void;
    }
    /**
     * 保存文件到本地。
     * 本地文件存储的大小限制为 10M
     */
    function saveFile(options: SaveFileOptions): void;
    interface File {
        /**
         * 文件的本地路径
         */
        filePath: string;
        /**
         * 文件的保存时的时间戳，从1970/01/01 08:00:00 到当前时间的秒数
         */
        createTime: number;
        /**
         * 文件大小，单位B
         */
        size: number;
    }
    interface GetFileInfoOptions extends BaseOptions {
        /** 本地文件路径 */
        filePath: string;
        /** 计算文件摘要的算法，默认值 md5，有效值：md5，sha1 */
        digestAlgorithm?: string;
        success?(options: GetFileInfoSuccess): void;
    }
    interface GetFileInfoSuccess {
        /** 文件大小，单位：B */
        size: number;
        /** 按照传入的 digestAlgorithm 计算得出的的文件摘要 */
        digest: string;
        /** 调用结果 */
        errMsg: string;
    }
    /**
     *  获取文件信息
     * @version 1.4.0
     */
    function getFileInfo(options: GetFileInfoOptions): void;

    interface AccessFailResp {
        /** 错误信息，合法值: "fail no such file or directory ${path}"	文件/目录不存在*/
        errMsg: string;
    }
    interface AccessOptions extends BaseOptions<any, AccessFailResp> {
        /** 要判断是否存在的文件/目录路径 */
        path: string;
    }
    interface AppendFileFailResp {
        /**
         *  错误信息，合法值:
         *  + "fail no such file or directory, open ${filePath}"	指定的 filePath 文件不存在
         *  + 'fail illegal operation on a directory, open "${filePath}"' 指定的 filePath 是一个已经存在的目录
         *  + "fail permission denied, open ${dirPath}" 指定的 filePath 路径没有写权限
         *  + "fail sdcard not mounted" 指定的 filePath 是一个已经存在的目录
         */
        errMsg: string;
    }
    interface AppendFileOptions extends BaseOptions<any, AppendFileFailResp> {
        /** 要追加内容的文件路径 */
        filePath: string;
        /** 要追加的文本或二进制数据 */
        data: string | ArrayBuffer;
        /**
         * 指定写入文件的字符编码,合法值:"ascii", "base64", "binary", "hex", "ucs2/ucs-2/utf16le/utf-16le",
         * "utf-8/utf8", "latin1",默认值: "utf8"
         */
        encoding?: string;
    }

    interface CopyFileFailResp {
        /**
         *  错误信息，合法值:
         *  + "fail permission denied, copyFile ${srcPath} -> ${destPath}"	指定目标文件路径没有写权限
         *  + "fail no such file or directory, copyFile ${srcPath} -> ${destPath}" 源文件不存在，或目标文件路径的上层目录不存在
         */
        errMsg: string;
    }

    interface CopyFileOptions extends BaseOptions<any, CopyFileFailResp> {
        /** 源文件路径，只可以是普通文件 */
        srcPath: string;
        /** 目标文件路径 */
        destPath: string;
    }

    interface FileInfoOptions extends BaseOptions {
        /** 要读取的文件路径 */
        filePath: string;
        success?(res: {
            /** 文件大小，以字节为单位 */
            size: number;
        }): void;
        fail?(res: {
            /** fail file not exist	指定的 filePath 找不到文件 */
            errMsg: string;
        }): void;
    }

    interface MakeDirOptions extends BaseOptions {
        /** 创建的目录路径 */
        dirPath: string;
        /**
         * 是否在递归创建该目录的上级目录后再创建该目录。如果对应的上级目录已经存在，则不创建该上级目录。如 dirPath 为 a/b/c/d 且
         * recursive 为 true，将创建 a 目录，再在 a 目录下创建 b 目录，以此类推直至创建 a/b/c 目录下的 d 目录。
         * @version 2.3.0
         */
        recursive?: boolean;
        fail?(res: {
            /**
             * 错误信息，合法值:
             * + fail no such file or directory ${dirPath}	上级目录不存在
             * + fail permission denied, open ${dirPath}	指定的 filePath 路径没有写权限
             * + fail file already exists ${dirPath}	有同名文件或目录
             */
            errMsg: string;
        }): void;
    }
    type RmDirOptions = MakeDirOptions;

    interface ReadDirOptions extends BaseOptions {
        /** 要读取的目录路径 */
        dirPath: string;
        success?(res: {
            /** 指定目录下的文件名数组 */
            files: Array<string>;
        }): void;
        fail?(res: {
            /**
             * 错误信息，合法值:
             * + fail no such file or directory ${dirPath}	目录不存在
             * + fail not a directory ${dirPath}	dirPath 不是目录
             * + fail permission denied, open ${dirPath}	指定的 filePath 路径没有读权限
             */
            errMsg: string;
        }): void
    }

    interface ReadFileOptions extends BaseOptions {
        /** 要读取的文件的路径 */
        filePath: string;
        /**
         * 指定读取文件的字符编码，如果不传 encoding，则以 ArrayBuffer 格式读取文件的二进制内容
         * 合法值: "ascii", "base64", "binary", "hex", "ucs2/ucs-2/utf16le/utf-16le", "utf-8/utf8", "latin1"
         */
        encoding: string;
        success?(res: {
            /** 文件内容 */
            data: string | ArrayBuffer;
        }): void;
        fail?(res: {
            /**
             * 错误信息，合法值:
             * + fail no such file or directory, open ${filePath}	指定的 filePath 所在目录不存在
             * + fail permission denied, open ${dirPath}	指定的 filePath 路径没有读权限
             */
            errMsg: string;
        }): void;
    }

    interface RenameOptions extends BaseOptions {
        /** 	源文件路径，可以是普通文件或目录 */
        oldPath: string;
        /** 新文件路径 */
        newPath: string;
        fail?(res: {
            /**
             * 错误信息，合法值:
             * + fail permission denied, rename ${oldPath} -> ${newPath}	指定源文件或目标文件没有写权限
             * + fail no such file or directory, rename ${oldPath} -> ${newPath}	源文件不存在，或目标文件路径的上层目录不存在
             */
            errMsg: string;
        }): void;
    }

    interface SaveFileOptions extends BaseOptions {
        /** 临时存储文件路径 */
        tempFilePath: string;
        /** 要存储的文件路径 */
        filePath?: string;
        success?(res: {
            /** 存储后的文件路径 */
            savedFilePath: string;
        }): void;
        fail?(res: {
            /**
             * 错误信息， 合法值:
             * + fail tempFilePath file not exist	指定的 tempFilePath 找不到文件
             * + fail permission denied, open "${filePath}"	指定的 filePath 路径没有写权限
             * + fail no such file or directory "${dirPath}"	上级目录不存在
             */
            errMsg: string;
        }): void;
    }

    /**
     * 描述文件状态的对象
     */
    interface Stats {
        /** 文件的类型和存取的权限，对应 POSIX stat.st_mode */
        mode: string;
        /** 文件大小，单位：B，对应 POSIX stat.st_size */
        size: number;
        /** 文件最近一次被存取或被执行的时间，UNIX 时间戳，对应 POSIX stat.st_atime */
        lastAccessedTime: number;
        /** 文件最后一次被修改的时间，UNIX 时间戳，对应 POSIX stat.st_mtime */
        lastModifiedTime: number;

        /** 判断当前文件是否一个目录 */
        isDirectory(): boolean;
        /** 判断当前文件是否一个普通文件 */
        isFile(): boolean;
    }

    interface StatOptions extends BaseOptions {
        /** 文件/目录路径 */
        path: string;
        /** 是否递归获取目录下的每个文件的 Stats 信息, 默认值：false*/
        recursive?: boolean;
        success?(res: {
            /**
             * 当 recursive 为 false 时，res.stats 是一个 Stats 对象。当 recursive 为 true 且 path 是一个目录的路径时，
             * res.stats 是一个 Object，key 以 path 为根路径的相对路径，value 是该路径对应的 Stats 对象。
             */
            stat: Stats | object
        }): void;
        fail?(res: {
            /**
             * 错误信息，合法值:
             * + fail permission denied, open ${path}	指定的 path 路径没有读权限
             * + fail no such file or directory ${path}	文件不存在
             */
            errMsg: string;
        }):void;
    }

    interface UnlinkOptions extends BaseOptions {
        /** 要删除的文件路径 */
        filePath: string;
        fail?(res: {
            /**
             * 错误信息，合法值：
             * + fail permission denied, open ${path}	指定的 path 路径没有读权限
             * + fail no such file or directory ${path}	文件不存在
             * + fail operation not permitted, unlink ${filePath}	传入的 filePath 是一个目录
             */
            errMsg: string;
        }): void;
    }

    interface UnzipOptions extends BaseOptions {
        /** 源文件路径，只可以是 zip 压缩文件 */
        zipFilePath: string;
        /** 目标目录路径 */
        targetPath: string;

        fail?(res: {
            /**
             * 错误信息，合法值:
             * + fail permission denied, unzip ${zipFilePath} -> ${destPath}	指定目标文件路径没有写权限
             * + fail no such file or directory, unzip ${zipFilePath} -> "${destPath}	源文件不存在，或目标文件路径的上层目录不存在
             */
            errMsg: string;
        }): void;
    }

    interface WriteFileOptions extends BaseOptions {
        /** 要写入的文件路径 */
        filePath: string;
        /** 要写入的文本或二进制数据 */
        data: string | ArrayBuffer;
        /**
         *  指定写入文件的字符编码，合法值:"ascii", "base64", "binary", "hex", "ucs2/ucs-2/utf16le/utf-16le","utf-8/utf8", "latin1"
         *  默认值:utf8
         */
        encoding?: string;
        fail?(res: {
            /**
             * 错误信息，合法值:
             * + fail no such file or directory, open ${filePath}	指定的 filePath 所在目录不存在
             * + fail permission denied, open ${dirPath}	指定的 filePath 路径没有写权限
             */
            errMsg: string
        }): void;
    }
    /**
     * 文件管理器
     * @version 1.9.9
     */
    interface FileSystemManager {
        /**
         * 判断文件/目录是否存在
         * @param option
         */
        access(option: AccessOptions): void;

        /**
         * FileSystemManager.access 的同步版本
         * @param path 要判断是否存在的文件/目录路径
         * 文件不存在时，抛出异常
         * fail no such file or directory ${path}	文件/目录不存在
         */
        accessSync(path: string): void;

        /**
         * 在文件结尾追加内容
         * @param option
         * @version 2.1.0
         */
        appendFile(option: AppendFileOptions): void;

        /**
         * FileSystemManager.appendFile 的同步版本，失败时抛出异常:
         * + fail no such file or directory, open ${filePath}	指定的 filePath 文件不存在
         * + fail illegal operation on a directory, open "${filePath}"	指定的 filePath 是一个已经存在的目录
         * + fail permission denied, open ${dirPath}	指定的 filePath 路径没有写权限
         * + fail sdcard not mounted	指定的 filePath 是一个已经存在的目录
         * @param filePath 要追加内容的文件路径
         * @param data 要追加的文本或二进制数据
         * @param encoding 指定写入文件的字符编码,合法值:"ascii", "base64", "binary", "hex", "ucs2/ucs-2/utf16le/utf-16le","utf-8/utf8", "latin1"
         */
        appendFileSync(filePath: string, data: string | ArrayBuffer, encoding: string): void;

        /**
         * 复制文件
         * @param option
         */
        copyFile(option: CopyFileOptions): void;

        /**
         * FileSystemManager.copyFile 的同步版本，失败时抛出异常
         *  + "fail permission denied, copyFile ${srcPath} -> ${destPath}"	指定目标文件路径没有写权限
         *  + "fail no such file or directory, copyFile ${srcPath} -> ${destPath}" 源文件不存在，或目标文件路径的上层目录不存在
         * @param srcPath 源文件路径，只可以是普通文件
         * @param destPath 目标文件路径
         */
        copyFileSync(srcPath: string, destPath: string): void;

        /**
         * 获取该小程序下的 本地临时文件 或 本地缓存文件 信息
         * @param option
         */
        getFileInfo(option: FileInfoOptions): void;

        /**
         * 获取该小程序下已保存的本地缓存文件列表
         */
        getSavedFileList(option: {
            success?(res: {
                fileList: Array<{
                    /** 本地路径 */
                    filePath: string;
                    /** 本地文件大小，以字节为单位 */
                    size: number;
                    /** 文件保存时的时间戳，从1970/01/01 08:00:00 到当前时间的秒数 */
                    createtime: number;
                }>;
            }): void;
            fail?(res:any): void;
            complete?(res:any): void;
        }): void;

        /**
         * 创建目录
         * @param option
         */
        mkdir(option: MakeDirOptions): void;

        /**
         * FileSystemManager.mkdir 的同步版本
         * @param dirPath 创建的目录路径
         * @param recursive 是否在递归创建该目录的上级目录后再创建该目录。如果对应的上级目录已经存在，则不创建该上级目录。如 dirPath 为 a/b/c/d 且 recursive 为 true，将创建 a 目录，再在 a 目录下创建 b 目录，以此类推直至创建 a/b/c 目录下的 d 目录。
         */
        mkdirSync(dirPath: string, recursive: boolean): void;

        /**
         * 读取目录内文件列表
         * @param option
         */
        readdir(option: ReadDirOptions): void;

        /**
         * FileSystemManager.readdir 的同步版本
         * @param dirPath 要读取的目录路径
         * @return 指定目录下的文件名数组。
         */
        readdirSync(dirPath: string): Array<string>;

        /**
         * 读取本地文件内容
         * @param option
         */
        readFile(option: ReadFileOptions): void;

        /**
         * FileSystemManager.readFile 的同步版本
         * @param filePath 要读取的文件的路径
         * @param encoding 指定读取文件的字符编码，如果不传 encoding，则以 ArrayBuffer 格式读取文件的二进制内容
         * @return 文件内容
         * @throws
         * + fail no such file or directory, open ${filePath}	指定的 filePath 所在目录不存在
         * + fail permission denied, open ${dirPath}	指定的 filePath 路径没有读权限
         */
        readFileSync(filePath: string, encoding?: string): string | ArrayBuffer;

        /**
         * 删除该小程序下已保存的本地缓存文件
         * @param option
         */
        removeSavedfile(option: RemoveSavedFileOptions): void;

        /**
         * 重命名文件。可以把文件从 oldPath 移动到 newPath
         * @param option
         */
        rename(option: RenameOptions): void;

        /**
         * FileSystemManager.rename 的同步版本
         * @param oldPath 源文件路径，可以是普通文件或目录
         * @param newPath 新文件路径
         * @throws
         * + fail permission denied, rename ${oldPath} -> ${newPath}	指定源文件或目标文件没有写权限
         * + fail no such file or directory, rename ${oldPath} -> ${newPath}	源文件不存在，或目标文件路径的上层目录不存在
         */
        renameSync(oldPath: string, newPath: string): void;

        /**
         * 删除目录
         * @param options fail的errMsg合法值:
         * + fail no such file or directory ${dirPath}	目录不存在
         * + fail directory not empty	目录不为空
         * + fail permission denied, open ${dirPath}	指定的 dirPath 路径没有写权限
         */
        rmdir(options: RmDirOptions): void;

        /**
         * FileSystemManager.rmdir 的同步版本
         * @param dirPath 要删除的目录路径
         * @param recursive 是否递归删除目录。如果为 true，则删除该目录和该目录下的所有子目录以及文件。
         * @throws
         * + fail no such file or directory ${dirPath}	目录不存在
         * + fail directory not empty	目录不为空
         * + fail permission denied, open ${dirPath}	指定的 dirPath 路径没有写权限
         */
        rmdirSync(dirPath: string, recursive: boolean): void;

        /**
         * 保存临时文件到本地。此接口会移动临时文件，因此调用成功后，tempFilePath 将不可用。
         * @param option
         */
        saveFile(option: SaveFileOptions): void;

        /**
         * FileSystemManager.saveFile 的同步版本
         * @param tempFilePath 临时存储文件路径
         * @param filePath 要存储的文件路径
         * @return 存储后的文件路径
         * @throws
         * + fail tempFilePath file not exist	指定的 tempFilePath 找不到文件
         * + fail permission denied, open "${filePath}"	指定的 filePath 路径没有写权限
         * + fail no such file or directory "${dirPath}"	上级目录不存在
         */
        saveFileSync(tempFilePath: string, filePath: string): string;

        /**
         * 获取文件 Stats 对象
         * @param option
         */
        stat(option: StatOptions): void;

        /**
         * FileSystemManager.stat 的同步版本
         * @param path 文件/目录路径
         * @param recursive 是否递归获取目录下的每个文件的 Stats 信息
         * @return 当 recursive 为 false 时，res.stats 是一个 Stats 对象。当 recursive 为 true 且 path 是一个目录的路径时，res.stats 是一个 Object，key 以 path 为根路径的相对路径，value 是该路径对应的 Stats 对象。
         * @throws
         * + fail permission denied, open ${path}	指定的 path 路径没有读权限
         * + fail no such file or directory ${path}	文件不存在
         */
        statSync(path: string, recursive?: boolean): Stats | object;

        /**
         * 删除文件
         * @param option
         */
        unlink(option: UnlinkOptions): void;

        /**
         * FileSystemManager.unlink 的同步版本
         * @param filePath 要删除的文件路径
         * @throws
         * + fail permission denied, open ${path}	指定的 path 路径没有读权限
         * + fail no such file or directory ${path}	文件不存在
         * + fail operation not permitted, unlink ${filePath}	传入的 filePath 是一个目录
         */
        unlinkSync(filePath: string): void;

        /**
         * 解压文件
         * @param option
         */
        unzip(option: UnzipOptions): void;

        /**
         * 写文件
         * @param option
         */
        writeFile(option: WriteFileOptions): void;

        /**
         * FileSystemManager.writeFile 的同步版本
         * @param filePath 要写入的文件路径
         * @param data 要写入的文本或二进制数据
         * @param encoding  指定写入文件的字符编码,合法值:"ascii", "base64", "binary", "hex", "ucs2/ucs-2/utf16le/utf-16le","utf-8/utf8", "latin1"
         * @throws
         * + fail no such file or directory, open ${filePath}	指定的 filePath 所在目录不存在
         * + fail permission denied, open ${dirPath}	指定的 filePath 路径没有写权限
         */
        wirteFileSync(filePath: string, data: string|ArrayBuffer, encoding: string): void;
    }

    /**
     * 获取全局唯一的文件管理器
     * @version 1.9.9
     */
    function getFileSystemManager(): FileSystemManager

    interface GetSavedFileListData {
        /**
         * 接口调用结果
         */
        errMsg: string;
        /**
         * 文件列表
         */
        fileList: File[];
    }
    interface GetSavedFileListOptions extends BaseOptions {
        /** 接口调用成功的回调函数 */
        success?(res: GetSavedFileListData): void;
    }
    /**
     * 获取本地已保存的文件列表
     */
    function getSavedFileList(options: GetSavedFileListOptions): void;
    interface SavedFileInfoData {
        /**
         * 接口调用结果
         */
        errMsg: string;
        /**
         * 文件大小，单位B
         */
        size: number;
        /**
         * 文件的保存是的时间戳，从1970/01/01 08:00:00 到当前时间的秒数
         */
        createTime: number;
    }
    interface GetSavedFileInfoOptions extends BaseOptions {
        filePath: string;
        /** 接口调用成功的回调函数 */
        success?(res: SavedFileInfoData): void;
    }
    /**
     * 获取本地文件的文件信息
     */
    function getSavedFileInfo(options: GetSavedFileInfoOptions): void;
    type RemoveSavedFileOptions = GetSavedFileInfoOptions;
    /**
     * 删除本地存储的文件
     */
    function removeSavedFile(options: RemoveSavedFileOptions): void;
    interface OpenDocumentOptions extends BaseOptions {
        /**
         * 文件路径，可通过 downFile 获得
         */
        filePath: string;
        /**
         * 文件类型，指定文件类型打开文件，有效值 doc, xls, ppt, pdf, docx, xlsx, pptx
         */
        fileType?: "doc" | "xls" | "ppt" | "pdf" | "docx" | "xlsx" | "pptx";
    }
    /**
     * 新开页面打开文档，支持格式：doc, xls, ppt, pdf, docx, xlsx, pptx
     */
    function openDocument(options: OpenDocumentOptions): void;
    // 数据缓存
    interface SetStorageOptions extends BaseOptions {
        /** 本地缓存中的指定的 key */
        key: string;
        /** 需要存储的内容 */
        data: any | string;
    }
    /**
     * 将数据存储在本地缓存中指定的 key 中，
     * 会覆盖掉原来该 key 对应的内容，这是一个异步接口。
     */
    function setStorage(options: SetStorageOptions): void;
    /**
     * 将 data 存储在本地缓存中指定的 key 中，
     * 会覆盖掉原来该 key 对应的内容，这是一个同步接口。
     *
     * @param key 本地缓存中的指定的 key
     * @param data 需要存储的内容
     */
    function setStorageSync(key: string, data: any | string): void;
    interface GetStorageOptions extends BaseOptions {
        /** 本地缓存中的指定的 key */
        key: string;
        /** 接口调用的回调函数,res = {data: key对应的内容} */
        success(res: { data: Record<string, any> | string | undefined }): void;
    }
    /**
     * 从本地缓存中异步获取指定 key 对应的内容。
     */
    function getStorage(options: GetStorageOptions): void;
    /**
     * 从本地缓存中同步获取指定 key 对应的内容。
     *
     */
    function getStorageSync(key: string): any | string;
    interface StorageInfo {
        /**
         * 当前storage中所有的key
         */
        keys: string[];
        /**
         * 当前占用的空间大小, 单位kb
         */
        currentSize: number;
        /**
         * 限制的空间大小，单位kb
         */
        limitSize: number;
    }
    interface GetStorageInfoOptions extends BaseOptions {
        success(res: StorageInfo): void;
    }
    /**
     * 异步获取当前storage的相关信息
     */
    function getStorageInfo(options: GetStorageInfoOptions): void;
    function getStorageInfoSync(): StorageInfo;
    interface RemoveStorageOptions extends BaseOptions {
        key: string;
        success?(res: DataResponse): void;
    }
    function removeStorage(options: RemoveStorageOptions): void;
    function removeStorageSync(key: string): DataResponse;
    /**
     * 清理本地数据缓存。
     */
    function clearStorage(): void;
    /**
     * 同步清理本地数据缓存
     */
    function clearStorageSync(): void;
    // #endregion










    // #region 位置API列表
    // 位置-----获取位置
    interface LocationData {
        /** 纬度，浮点数，范围为-90~90，负数表示南纬 */
        latitude: number;
        /** 经度，浮点数，范围为-180~180，负数表示西经 */
        longitude: number;
        /** 速度，浮点数，单位m/s */
        speed: number;
        /** 位置的精确度 */
        accuracy: number;
    }
    interface GetLocationOptions extends BaseOptions {
        /** 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于wx.openLocation的坐标 */
        type?: "wgs84" | "gcj02";
        altitude?: boolean; // 传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度
        /** 接口调用成功的回调函数，返回内容详见返回参数说明。 */
        success(res: LocationData): void;
    }
    /**
     * 获取当前的地理位置、速度。
     */
    function getLocation(options: GetLocationOptions): void;
    interface ChooseLocationData {
        /**
         * 位置名称
         */
        name: string;
        /**
         * 详细地址
         */
        address: string;
        /**
         * 纬度，浮点数，范围为-90~90，负数表示南纬
         */
        latitude: number;
        /**
         * 经度，浮点数，范围为-180~180，负数表示西经
         */
        longitude: number;
    }
    interface ChooseLocationOptions extends BaseOptions {
        success(res: ChooseLocationData): void;
    }
    /**
     * 打开地图选择位置
     */
    function chooseLocation(options: ChooseLocationOptions): void;
    // 位置-----查看位置
    interface OpenLocationOptions extends BaseOptions {
        /** 纬度，范围为-90~90，负数表示南纬 */
        latitude: number;
        /** 经度，范围为-180~180，负数表示西经 */
        longitude: number;
        /** 缩放比例，范围1~28，默认为28 */
        scale?: number;
        /** 位置名 */
        name?: string;
        /** 地址的详细说明 */
        address?: string;
    }
    /**
     * 使用微信内置地图查看位置
     */
    function openLocation(options: OpenLocationOptions): void;
    // 位置-----地图组件控制
    interface GetCenterLocationOptions extends BaseOptions {
        success(res: { longitude: number; latitude: number }): void;
    }
    /**
     * mapContext 通过 mapId 跟一个 <map/> 组件绑定，通过它可以操作对应的 <map/> 组件。
     */
    interface MapContext {
        /**
         * 获取当前地图中心的经纬度，返回的是 gcj02 坐标系，可以用于 wx.openLocation
         */
        getCenterLocation(options: GetCenterLocationOptions): OpenLocationOptions;
        /**
         * 将地图中心移动到当前定位点，需要配合map组件的show-location使用
         */
        moveToLocation(): void;
    }
    /**
     * 创建并返回 map 上下文 mapContext 对象
     */
    function createMapContext(mapId: string): MapContext;
    // #endregion










    // #region 设备API列表
    // 设备-----系统信息
    interface SystemInfo {
        /** 手机品牌 */
        brand: string;
        /** 手机型号 */
        model: string;
        /** 设备像素比 */
        pixelRatio: number;
        /** 屏幕宽度 */
        screenWidth: number;
        /** 屏幕高度 */
        screenHeight: number;
        /** 窗口宽度 */
        windowWidth: number;
        /** 窗口高度 */
        windowHeight: number;
        /** 状态栏的高度 */
        statusBarHeight: number;
        /** 微信设置的语言 */
        language: string;
        /** 微信版本号 */
        version: string;
        /** 操作系统版本 */
        system: string;
        /** 客户端平台 */
        platform: string;
        /** 用户字体大小设置。以“我-设置-通用-字体大小”中的设置为准，单位 px。 */
        fontSizeSetting: number;
        /** 客户端基础库版本 */
        SDKVersion: string;
    }
    interface GetSystemInfoOptions extends BaseOptions {
        /** 成功获取系统信息的回调 */
        success(res: SystemInfo): void;
    }
    /**
     * 获取系统信息。
     */
    function getSystemInfo(options: GetSystemInfoOptions): void;
    function getSystemInfoSync(): SystemInfo;
    /**
     * 判断小程序的API，回调，参数，组件等是否在当前版本可用。
     * String参数说明：
     * 使用 ${API}.${method}.${param}.${options}
     * 或者 ${component}.${attribute}.${option}方式来调用
     * 例如：
     * ${API} 代表 API 名字
     * ${method} 代表调用方式，有效值为return, success, object, callback
     * ${param} 代表参数或者返回值
     * ${options} 代表参数的可选值
     * ${component} 代表组件名字
     * ${attribute} 代表组件属性
     * ${option} 代表组件属性的可选值
     */
    function canIUse(api: string): boolean;
    // 设备-----网络状态
    type networkType = "2g" | "3g" | "4g" | "wifi" | "unknown" | "none";
    interface NetworkTypeData {
        /** 返回网络类型2g，3g，4g，wifi */
        networkType: networkType;
    }
    interface GetNetworkTypeOptions extends BaseOptions {
        /** 接口调用成功，返回网络类型 networkType */
        success(res: NetworkTypeData): void;
    }
    /**
     * 获取网络类型。
     */
    function getNetworkType(options: GetNetworkTypeOptions): void;
    /**
     * 监听网络状态变化。
     * 微信客户端 6.5.6 版本开始支持
     * @version 1.1.0
     */
    function onNetworkStatusChange(
        callback: (
            res: {
                isConnected: boolean;
                networkType: networkType;
            }
        ) => void
    ): void;
    // 设备-----加速度计
    interface AccelerometerData {
        /** X 轴 */
        x: number;
        /** Y 轴 */
        y: number;
        /** Z 轴 */
        z: number;
    }
    type AccelerometerChangeCallback = (res: AccelerometerData) => void;
    /**
     * 监听重力感应数据，频率：5次/秒
     */
    function onAccelerometerChange(callback: AccelerometerChangeCallback): void;
    type AccelerometerOptions = BaseOptions;
    /**
     * 开始监听加速度数据。
     * 微信客户端 6.5.6 版本开始支持
     * @version 1.1.0
     */
    function startAccelerometer(options: AccelerometerOptions): void;
    /**
     * 停止监听加速度数据。
     * 微信客户端 6.5.6 版本开始支持
     * @version 1.1.0
     */
    function stopAccelerometer(options: AccelerometerOptions): void;
    // 设备-----罗盘
    interface CompassData {
        /** 面对的方向度数 */
        direction: number;
    }
    type CompassChangeCallback = (res: CompassData) => void;
    /**
     * 监听罗盘数据，频率：5次/秒，接口调用后会自动开始监听，可使用wx.stopCompass停止监听。
     */
    function onCompassChange(callback: CompassChangeCallback): void;
    type CompassOptions = BaseOptions;
    /**
     * 开始监听罗盘数据。
     * 微信客户端 6.5.6 版本开始支持
     * @version 1.1.0
     */
    function startCompass(options: CompassOptions): void;
    function stopCompass(options: CompassOptions): void;
    // 设备-----拨打电话
    interface MakePhoneCallOptions extends BaseOptions {
        /**
         * 需要拨打的电话号码
         */
        phoneNumber: string;
    }
    /**
     * 拨打电话
     */
    function makePhoneCall(options: MakePhoneCallOptions): void;
    // 设备-----扫码
    type scanType = "qrCode" | "barCode";
    interface ScanCodeData {
        /**
         * 所扫码的内容
         */
        result: string;
        /**
         * 所扫码的类型
         */
        scanType: scanType;
        /**
         * 所扫码的字符集
         */
        charSet: string;
        /**
         * 当所扫的码为当前小程序的合法二维码时，会返回此字段，内容为二维码携带的 path
         */
        path: string;
    }
    interface ScanCodeOptions extends BaseOptions {
        /**
         * 是否只能从相机扫码，不允许从相册选择图片
         * @version 1.2.0
         */
        onlyFromCamera?: boolean;
        /**
         * 扫码类型，参数类型是数组
         * 二维码是'qrCode'，一维码是'barCode'，DataMatrix是‘datamatrix’，pdf417是‘pdf417’。
         * @version 1.7.0
         */
        scanType?: string[];
        success(res: ScanCodeData): void;
    }
    /**
     * 调起客户端扫码界面，扫码成功后返回对应的结果
     */
    function scanCode(options: ScanCodeOptions): void;
    // 设备-----剪贴板
    interface SetClipboardDataOptions extends BaseOptions {
        data: string;
    }
    /**
     * 设置系统剪贴板的内容
     * 微信客户端 6.5.6 版本开始支持
     * @version 1.1.0
     */
    function setClipboardData(options: SetClipboardDataOptions): void;
    /**
     * 获取系统剪贴板内容
     * 微信客户端 6.5.6 版本开始支持
     * @version 1.1.0
     */
    function getClipboardData(options: BaseOptions): void;
    // 设备-----蓝牙
    interface OpenBluetoothAdapterOptions extends BaseOptions {
        success(res: any): void;
    }
    /**
     * 初始化蓝牙适配器
     * @version 1.1.0
     */
    function openBluetoothAdapter(options: OpenBluetoothAdapterOptions): void;
    interface CloseBluetoothAdapterOptions extends BaseOptions {
        success(res: any): void;
    }
    /**
     * 关闭蓝牙模块。调用该方法将断开所有已建立的链接并释放系统资源
     * @version 1.1.0
     */
    function closeBluetoothAdapter(options: CloseBluetoothAdapterOptions): void;
    interface BluetoothAdapterState {
        /**
         * 蓝牙适配器是否可用
         */
        available: boolean;
        /**
         * 蓝牙适配器是否处于搜索状态
         */
        discovering: boolean;
    }
    interface BluetoothAdapterStateData extends ErrMsgResponse {
        /**
         * 蓝牙适配器信息
         */
        adapterState: BluetoothAdapterState;
    }
    interface GetBluetoothAdapterStateOptions extends BaseOptions {
        success(res: BluetoothAdapterStateData): void;
    }
    /**
     * 获取本机蓝牙适配器状态
     * @version 1.1.0
     */
    function getBluetoothAdapterState(
        options: GetBluetoothAdapterStateOptions
    ): void;
    /**
     * 监听蓝牙适配器状态变化事件
     * @version 1.1.0
     */
    function onBluetoothAdapterStateChange(
        callback: (res: BluetoothAdapterState) => void
    ): void;
    interface StartBluetoothDevicesDiscoveryOptions extends BaseOptions {
        /**
         * 蓝牙设备主 service 的 uuid 列表
         * 某些蓝牙设备会广播自己的主 service 的 uuid。如果这里传入该数组，那么根据该 uuid 列表，只搜索有这个主服务的设备。
         */
        services?: string[];
        /**
         * 否允许重复上报同一设备， 如果允许重复上报，则onDeviceFound 方法会多次上报同一设备，但是 RSSI 值会有不同
         */
        allowDuplicatesKey?: boolean;
        /**
         * 上报设备的间隔，默认为0，意思是找到新设备立即上报，否则根据传入的间隔上报
         */
        interval?: number;
    }
    /**
     * 开始搜寻附近的蓝牙外围设备。
     * 注意，该操作比较耗费系统资源，请在搜索并连接到设备后调用 stop 方法停止搜索。
     * @example
     * // 以微信硬件平台的蓝牙智能灯为例，主服务的 UUID 是 FEE7。传入这个参数，只搜索主服务 UUID 为 FEE7 的设备
     * wx.startBluetoothDevicesDiscovery({
     *   services: ['FEE7'],
     *   success: function (res) {
     *     console.log(res)
     *   }
     * });
     */
    function startBluetoothDevicesDiscovery(
        options: StartBluetoothDevicesDiscoveryOptions
    ): void;
    interface StopBluetoothDevicesDiscoveryOptions extends BaseOptions {
        success(res: ErrMsgResponse): void;
    }
    /**
     * 停止搜寻附近的蓝牙外围设备。请在确保找到需要连接的设备后调用该方法停止搜索。
     * @version 1.1.0
     */
    function stopBluetoothDevicesDiscovery(
        options: StopBluetoothDevicesDiscoveryOptions
    ): void;
    /**
     * 蓝牙设备信息
     */
    interface BluetoothDevice {
        /**
         * 蓝牙设备名称，某些设备可能没有
         */
        name: string;
        /**
         * 用于区分设备的 id
         */
        deviceId: string;
        /**
         * int 当前蓝牙设备的信号强度
         */
        RSSI: number;
        /**
         * 当前蓝牙设备的广播内容
         */
        advertisData: ArrayBuffer;
    }
    interface GetBluetoothDevicesOptions extends BaseOptions {
        success(
            res: {
                devices: BluetoothDevice[];
            } & ErrMsgResponse
        ): void;
    }
    /**
     * 获取所有已发现的蓝牙设备，包括已经和本机处于连接状态的设备
     */
    function getBluetoothDevices(options: GetBluetoothDevicesOptions): void;
    /**
     * 监听寻找到新设备的事件
     * @version 1.1.0
     */
    function onBluetoothDeviceFound(
        callback: (
            res: {
                devices: BluetoothDevice[];
            }
        ) => void
    ): void;
    interface GetConnectedBluetoothDevicesOptions extends BaseOptions {
        services: string[];
        success(
            res: {
                devices: BluetoothDevice[];
            } & ErrMsgResponse
        ): void;
    }
    /**
     * 根据 uuid 获取处于已连接状态的设备
     * @version 1.1.0
     */
    function getConnectedBluetoothDevices(
        options: GetConnectedBluetoothDevicesOptions
    ): void;
    interface CreateBLEConnectionOptions extends BaseOptions {
        /**
         * 蓝牙设备 id，参考 getDevices 接口
         */
        deviceId: string;
        success(res: ErrMsgResponse): void;
    }
    /**
     * 低功耗蓝牙接口
     * @version 1.1.0
     */
    function createBLEConnection(options: CreateBLEConnectionOptions): void;
    interface CloseBLEConnectionOptions extends BaseOptions {
        /**
         * 蓝牙设备 id，参考 getDevices 接口
         */
        deviceId: string;
        success(res: ErrMsgResponse): void;
    }
    /**
     * 断开与低功耗蓝牙设备的连接
     * @version 1.1.0
     */
    function closeBLEConnection(options: CloseBLEConnectionOptions): void;
    interface GetBLEDeviceServicesOptions extends BaseOptions {
        /**
         * 蓝牙设备 id，参考 getDevices 接口
         */
        deviceId: string;
        /**
         * 成功则返回本机蓝牙适配器状态
         */
        success(
            res: {
                services: Array<{
                    uuid: string;
                    isPrimary: boolean;
                }>;
            } & ErrMsgResponse
        ): void;
    }
    /**
     * 获取蓝牙设备所有 service（服务）
     */
    function getBLEDeviceServices(options: GetBLEDeviceServicesOptions): void;
    interface GetBLEDeviceCharacteristicsOptions extends BaseOptions {
        /**
         * 蓝牙设备 id，参考 device 对象
         */
        deviceId: string;
        /**
         * 蓝牙服务 uuid
         */
        serviceId: string;
        /**
         * 成功则返回本机蓝牙适配器状态
         */
        success(
            res: {
                characteristics: Array<{
                    uuid: string;
                    properties: Array<{
                        /**
                         * 该特征值是否支持 read 操作
                         */
                        read: boolean;
                        /**
                         * 该特征值是否支持 write 操作
                         */
                        write: boolean;
                        /**
                         * 该特征值是否支持 notify 操作
                         */
                        notify: boolean;
                        /**
                         * 该特征值是否支持 indicate 操作
                         */
                        indicate: boolean;
                    }>;
                }>;
            } & ErrMsgResponse
        ): void;
    }
    /**
     * 获取蓝牙设备所有 characteristic（特征值）
     */
    function getBLEDeviceCharacteristics(
        options: GetBLEDeviceCharacteristicsOptions
    ): void;

    interface WriteBLECharacteristicValue extends BaseOptions {
        /**
         * 蓝牙设备 id，参考 device 对象
         */
        deviceId: string;
        /**
         * 蓝牙特征值对应服务的 uuid
         */
        serviceId: string;
        /**
         * 蓝牙特征值的 uuid
         */
        characteristicId: string;
        /**
         * 蓝牙设备特征值对应的二进制值
         */
        value: ArrayBuffer;
        fail?(): void;
        success(res: ErrMsgResponse): void;
        complete?(): void;
    }

    interface NotifyBLECharacteristicValueChanged extends BaseOptions {
        /**
         * 蓝牙设备 id，参考 device 对象
         */
        deviceId: string;
        /**
         * 蓝牙特征值对应服务的 uuid
         */
        serviceId: string;
        /**
         * 蓝牙特征值的 uuid
         */
        characteristicId: string;
        /**
         * true: 启用 notify; false: 停用 notify
         */
        state: boolean;
        success(res: ErrMsgResponse): void;
    }

    interface ReadBLECharacteristicValue extends BaseOptions {
        /**
         * 蓝牙设备 id，参考 device 对象
         */
        deviceId: string;
        /**
         * 蓝牙特征值对应服务的 uuid
         */
        serviceId: string;
        /**
         * 蓝牙特征值的 uuid
         */
        characteristicId: string;
        success(
            res: {
                characteristic: {
                    /**
                     * 蓝牙设备特征值的 uuid
                     */
                    characteristicId: string;
                    /**
                     * 蓝牙设备特征值对应服务的 uuid
                     */
                    serviceId: string;
                    /**
                     * 蓝牙设备特征值对应的二进制值
                     */
                    value: ArrayBuffer;
                };
            } & ErrMsgResponse
        ): void;
    }

    /**
     * 读取低功耗蓝牙设备的特征值的二进制数据值。
     * 注意：必须设备的特征值支持read才可以成功调用，具体参照 characteristic 的 properties 属性
     */
    function readBLECharacteristicValue(
        options: ReadBLECharacteristicValue
    ): void;
    /**
     * 向低功耗蓝牙设备特征值中写入二进制数据。
     * 注意：必须设备的特征值支持write才可以成功调用，具体参照 characteristic 的 properties 属性
     * tips: 并行调用多次读写接口存在读写失败的可能性
     */
    function writeBLECharacteristicValue(
        options: WriteBLECharacteristicValue
    ): void;
    /**
     * 启用低功耗蓝牙设备特征值变化时的 notify 功能。
     * 注意：必须设备的特征值支持notify才可以成功调用，具体参照 characteristic 的 properties 属性
     * 另外，必须先启用notify才能监听到设备 characteristicValueChange 事件
     */
    function notifyBLECharacteristicValueChanged(
        options: NotifyBLECharacteristicValueChanged
    ): void;
    /**
     * 监听低功耗蓝牙连接的错误事件，包括设备丢失，连接异常断开等等。
     */
    function onBLEConnectionStateChanged(
        callback: (
            res: {
                /**
                 * 蓝牙设备 id，参考 device 对象
                 */
                deviceId: string;
                /**
                 * 连接目前的状态
                 */
                connected: boolean;
            }
        ) => void
    ): void;
    /**
     * 监听低功耗蓝牙设备的特征值变化。必须先启用notify接口才能接收到设备推送的notification。
     */
    function onBLECharacteristicValueChange(
        callback: (
            res: {
                /**
                 * 蓝牙设备 id，参考 device 对象
                 */
                deviceId: string;
                /**
                 * 特征值所属服务 uuid
                 */
                serviceId: string;
                /**
                 * 特征值 uuid
                 */
                characteristicId: string;
                /**
                 * 特征值最新的值
                 */
                value: ArrayBuffer;
            }
        ) => void
    ): void;
    // #region iBeacon
    interface StartBeaconDiscoveryOptions extends BaseOptions {
        /**
         * iBeacon设备广播的 uuids
         */
        uuids: string | string[];
        success?(res: ErrMsgResponse): void;
    }
    interface StopBeaconDiscoveryOptions extends BaseOptions {
        fail?(): void;
        success?(res: ErrMsgResponse): void;
        complete?(): void;
    }
    /**
     * 开始搜索附近的iBeacon设备
     * @version 1.2.0
     */
    function startBeaconDiscovery(options: StartBeaconDiscoveryOptions): void;
    /**
     * 停止搜索附近的iBeacon设备
     * @version 1.2.0
     */
    function stopBeaconDiscovery(options: StopBeaconDiscoveryOptions): void;
    interface Beacon {
        /** iBeacon 设备广播的 uuid */
        uuid: string;
        /** iBeacon 设备的主 id */
        major: string;
        /** iBeacon 设备的次 id */
        minor: string;
        /** 表示设备距离的枚举值 */
        proximity: number;
        /** iBeacon 设备的距离 */
        accuracy: number;
        /** 表示设备的信号强度 */
        rssi: number;
    }
    interface GetBeaconsSuccess {
        beacons: Beacon[];
        errMsg: string;
    }
    interface GetBeaconsOptions extends BaseOptions {
        success?(options: GetBeaconsSuccess): void;
    }
    /**
     * 获取所有已搜索到的iBeacon设备
     * @version 1.2.0
     */
    function getBeacons(options: GetBeaconsOptions): void;
    /**
     * 监听 iBeacon 设备的更新事件
     * @version 1.2.0
     */
    function onBeaconUpdate(callback?: (beacons: Beacon[]) => void): void;
    /**
     * 监听 iBeacon 服务的状态变化
     * @version 1.2.0
     */
    function onBeaconServiceChange(
        callback?: (available: boolean, discovering: boolean) => void
    ): void;
    // #endregion
    // 设备-----屏幕亮度
    interface SetScreenBrightnessOptions extends BaseOptions {
        /** 屏幕亮度值，范围 0~1，0 最暗，1 最亮 */
        value: number;
    }
    /**
     * 设置屏幕亮度
     * @version 1.2.0
     */
    function setScreenBrightness(options: SetScreenBrightnessOptions): void;
    interface GetScreenBrightnessOptions extends BaseOptions {
        /** 屏幕亮度值，范围 0~1，0 最暗，1 最亮 */
        success(value: number): void;
    }
    /**
     * 获取屏幕亮度
     * @version 1.2.0
     */
    function getScreenBrightness(options?: GetScreenBrightnessOptions): void;
    interface SetKeepScreenOnOptions extends BaseOptions {
        /** 是否保持屏幕常亮 */
        keepScreenOn: boolean;
        success?(res: { errMsg: string }): void;
    }
    /**
     * 设置是否保持常亮状态。
     * 仅在当前小程序生效，离开小程序后设置失效。
     * @version 1.4.0
     */
    function setKeepScreenOn(options?: SetKeepScreenOnOptions): void;
    // 设备-----震动
    /**
     * 使手机发生较长时间的振动（400ms）
     * @version 1.2.0
     */
    function vibrateLong(options?: BaseOptions): void;
    /**
     * 使手机发生较短时间的振动（15ms）
     * @version 1.2.0
     */
    function vibrateShort(options?: BaseOptions): void;
    /**
     * 监听用户主动截屏事件，用户使用系统截屏按键截屏时触发此事件
     * @version 1.4.0
     */
    function onUserCaptureScreen(callback?: (res: any) => void): void;
    // 设备-----手机联系人
    interface PhoneContact extends BaseOptions {
        /** 头像本地文件路径 */
        photoFilePath?: string;
        /** 昵称 */
        nickName?: string;
        /** 姓氏 */
        lastName?: string;
        /** 中间名 */
        middleName?: string;
        /** 名字 */
        firstName: string;
        /** 备注 */
        remark?: string;
        /** 手机号 */
        mobilePhoneNumber?: string;
        /** 微信号 */
        weChatNumber?: string;
        /** 联系地址国家 */
        addressCountry?: string;
        /** 联系地址省份 */
        addressState?: string;
        /** 联系地址城市 */
        addressCity?: string;
        /** 联系地址街道 */
        addressStreet?: string;
        /** 联系地址邮政编码 */
        addressPostalCode?: string;
        /** 公司 */
        organization?: string;
        /** 职位 */
        title?: string;
        /** 工作传真 */
        workFaxNumber?: string;
        /** 工作电话 */
        workPhoneNumber?: string;
        /** 公司电话 */
        hostNumber?: string;
        /** 电子邮件 */
        email?: string;
        /** 网站 */
        url?: string;
        /** 工作地址国家 */
        workAddressCountry?: string;
        /** 工作地址省份 */
        workAddressState?: string;
        /** 工作地址城市 */
        workAddressCity?: string;
        /** 工作地址街道 */
        workAddressStreet?: string;
        /** 工作地址邮政编码 */
        workAddressPostalCode?: string;
        /** 住宅传真 */
        homeFaxNumber?: string;
        /** 住宅电话 */
        homePhoneNumber?: string;
        /** 住宅地址国家 */
        homeAddressCountry?: string;
        /** 住宅地址省份 */
        homeAddressState?: string;
        /** 住宅地址城市 */
        homeAddressCity?: string;
        /** 住宅地址街道 */
        homeAddressStreet?: string;
        /** 住宅地址邮政编码 */
        homeAddressPostalCode?: string;
    }
    /**
     * 增加 手机联系人
     * 调用后，用户可以选择将该表单以“新增联系人”或“添加到已有联系人”的方式
     * 写入手机系统通讯录
     * 完成手机通讯录联系人和联系方式的增加。
     * @version 1.2.0
     */
    function addPhoneContact(options: PhoneContact): void;
    // 设备-----Wi-Fi
    /**
     * 初始化 Wi-Fi 模块。
     * @version 1.6.0
     */
    function startWifi(options?: BaseOptions): void;
    /**
     * 关闭 Wi-Fi 模块。
     * @version 1.6.0
     */
    function stopWifi(options?: BaseOptions): void;
    interface ConnectWiFiOptions extends BaseOptions {
        /** Wi-Fi 设备ssid */
        SSID: string;
        /** Wi-Fi 设备bssid */
        BSSID: string;
        /** Wi-Fi 设备密码 */
        password?: string;
    }
    /**
     * 连接 Wi-Fi。
     * 若已知 Wi-Fi 信息，可以直接利用该接口连接。
     * 仅 Android 与 iOS 11 以上版本支持。
     * @version 1.6.0
     */
    function connectWifi(options?: ConnectWiFiOptions): void;
    /**
     * 请求获取 Wi-Fi 列表
     * 在 onGetWifiList 注册的回调中返回 wifiList 数据。
     * iOS 将跳转到系统的 Wi-Fi 界面，Android 不会跳转。
     * iOS 11.0 及 iOS 11.1 两个版本因系统问题，该方法失效。但在 iOS 11.2 中已修复。
     * @version 1.6.0
     */
    function getWifiList(options?: BaseOptions): void;
    interface WiFi {
        /** Wi-Fi 的SSID */
        SSID: string;
        /** Wi-Fi 的BSSID */
        BSSID: string;
        /** Wi-Fi 是否安全 */
        secure: boolean;
        /** Wi-Fi 信号强度 */
        signalStrength: number;
    }
    interface GetWifiListOptions {
        /** Wi-Fi 列表数据 */
        wifiList: WiFi[];
    }
    /**
     * 监听在获取到 Wi-Fi 列表数据时的事件，在回调中将返回 wifiList。
     * @version 1.6.0
     */
    function onGetWifiList(callback?: (res: GetWifiListOptions) => void): void;
    interface SetWifiList {
        /** Wi-Fi 设备ssid */
        SSID: string;
        /** Wi-Fi 设备bssid */
        BSSID: string;
        /** Wi-Fi 设备密码 */
        password: string;
    }
    interface SetWifiListOptions extends BaseOptions {
        /** 提供预设的 Wi-Fi 信息列表 */
        wifiList: SetWifiList[];
    }
    /**
     * iOS特有接口 在 onGetWifiList 回调后，利用接口设置 wifiList 中 AP 的相关信息。
     * 注意：
     * + 该接口只能在 onGetWifiList 回调之后才能调用。
     * + 此时客户端会挂起，等待小程序设置 Wi-Fi 信息，请务必尽快调用该接口，若无数据请传入一个空数组。
     * + 有可能随着周边 Wi-Fi 列表的刷新，单个流程内收到多次带有存在重复的 Wi-Fi 列表的回调。
     * @version 1.6.0
     */
    function setWifiList(options: SetWifiListOptions): void;
    /**
     * 监听连接上 Wi-Fi 的事件。
     * @version 1.6.0
     */
    function onWifiConnected(callback?: (wifi: WiFi) => void): void;
    interface GetConnectedWifiOptions extends BaseOptions {
        success(wifi: WiFi): void;
    }
    /**
     * 获取已连接中的 Wi-Fi 信息
     * @version 1.6.0
     */
    function getConnectedWifi(options?: GetConnectedWifiOptions): void;
    // #endregion







    // #region 第三方平台
    interface ExtConfig {
        /** 第三方平台自定义的数据 */
        extConfig: any;
    }
    interface GetExtConfigOptions extends BaseOptions {
        success(
            res: {
                /* 调用结果 */
                errMsg: string;
            } & ExtConfig
        ): void;
    }
    /**
     * 获取第三方平台自定义的数据字段。
     * @version 1.1.0
     */
    function getExtConfig(options?: GetExtConfigOptions): void;
    /**
     * 获取第三方平台自定义的数据字段的同步接口。
     * @version 1.1.0
     */
    function getExtConfigSync(): ExtConfig;
    // #endregion












    // #region 开放接口
    // 开放接口-----签名加密
    // [签名加密](https://mp.weixin.qq.com/debug/wxadoc/dev/api/signature.html)
    /**
     * 登录态维护
     * 通过 wx.login() 获取到用户登录态之后，需要维护登录态。
     * 开发者要注意不应该直接把 session_key、openid 等字段作为用户的标识
     * 或者 session 的标识，而应该自己派发一个 session 登录态（请参考登录时序图）。
     * 对于开发者自己生成的 session，应该保证其安全性且不应该设置较长的过期时间。
     * session 派发到小程序客户端之后，可将其存储在 storage ，用于后续通信使用。
     * 通过wx.checkSession() 检测用户登录态是否失效。并决定是否调用wx.login()
     * 重新获取登录态
     */
    interface LoginResponse {
        /** 调用结果 */
        errMsg: string;
        /**
         * 用户允许登录后，回调内容会带上 code（有效期五分钟），
         * 开发者需要将 code 发送到开发者服务器后台，
         * 使用code 换取 session_key api，
         * 将 code 换成 openid 和 session_key
         */
        code: string;
    }
    interface LoginOptions extends BaseOptions {
        /** 接口调用成功的回调函数 */
        success?(res: LoginResponse): void;
    }
    /**
     * 调用接口获取登录凭证（code）进而换取用户登录态信息，
     * 包括用户的唯一标识（openid） 及本次登录的 会话密钥（session_key）。
     * 用户数据的加解密通讯需要依赖会话密钥完成。
     */
    function login(option: LoginOptions): void;
    type CheckSessionOption = BaseOptions;
    /**
     * 检测当前用户登录态是否有效。
     * 通过wx.login获得的用户登录态拥有一定的时效性。用户越久未使用小程序，用户登录态越有可能失效。
     * 反之如果用户一直在使用小程序，则用户登录态一直保持有效。具体时效逻辑由微信维护，对开发者透明。
     * 开发者只需要调用wx.checkSession接口检测当前用户登录态是否有效。
     * 登录态过期后开发者可以再调用wx.login获取新的用户登录态。
     */
    function checkSession(options: CheckSessionOption): void;

    // scope 列表
    type Scope =
        | "scope.userInfo"
        | "scope.userLocation"
        | "scope.address"
        | "scope.invoiceTitle"
        | "scope.invoice"
        | "scope.werun"
        | "scope.record"
        | "scope.writePhotosAlbum"
        | "scope.camera";

    // 开放接口-----设置
    interface AuthorizeOption {
        scope: Scope;
        success?(res: ErrMsgResponse): void;
        fail?(): void;
        complete?(): void;
    }

    /**
     * 提前向用户发起授权请求。
     * 调用后会立刻弹窗询问用户是否同意授权小程序使用某项功能或获取用户的某些数据，
     * 但不会实际调用对应接口。如果用户之前已经同意授权，则不会出现弹窗，直接返回成功。
     */
    function authorize(options: AuthorizeOption): void;
    // 开放接口-----用户信息
    interface UserInfo {
        nickName: string;
        avatarUrl: string;
        gender: number;
        province: string;
        city: string;
        country: string;
    }
    interface UserInfoResponse {
        /** 用户信息对象，不包含 openid 等敏感信息 */
        userInfo: UserInfo;
        /** 不包括敏感信息的原始数据字符串，用于计算签名。 */
        rawData: string;
        /** 使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息。 */
        signature: string;
        /** 包括敏感数据在内的完整用户信息的加密数据，详细见加密数据解密算法 */
        encryptData: string;
    }
    interface GetUserInfoOptions extends BaseOptions {
        withCredentials?: boolean; // 是否带上登录态信息
        lang?: string; // 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。默认为en。
        /** 接口调用成功的回调函数 */
        success?(res: UserInfoResponse): void;
    }
    /**
     * 获取用户信息，需要先调用 wx.login 接口。
     */
    function getUserInfo(options: GetUserInfoOptions): void;
    // 开放接口-----微信支付
    type PaymentSignType = "MD5" | "HMAC-SHA256";
    interface RequestPaymentOptions extends BaseOptions {
        /** 时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间 */
        timeStamp: string | number;
        /** 随机字符串，长度为32个字符以下。 */
        nonceStr: string;
        /** 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=* */
        package: string;
        /** 签名算法，默认为MD5，支持HMAC-SHA256和MD5 */
        signType: PaymentSignType;
        /** 签名,具体签名方案参见微信公众号支付帮助文档; */
        paySign: string;
    }
    /**
     * 发起微信支付。
     */
    function requestPayment(options: RequestPaymentOptions): void;


    interface ShareMenuOptions extends BaseOptions {
        withShareTicket?: boolean;
    }
    /**
     * 显示分享按钮
     *
     */
    function showShareMenu(options?: ShareMenuOptions): void;

    /**
     * 隐藏分享按钮
     * @version 1.1.0
     */
    function hideShareMenu(options?: ShareMenuOptions): void;
    interface UpdateShareMenuOptions extends BaseOptions {
        /** 是否使用带 shareTicket 的转发详情 */
        withShareTicket?: boolean;
    }
    /**
     * 更新转发属性
     * @version 1.2.0
     */
    function updateShareMenu(options?: UpdateShareMenuOptions): void;
    interface GetShareInfoOptions extends BaseOptions {
        /** shareTicket */
        shareTicket: string;
        success(res: {
            /** 错误信息 */
            errMsg: string;
            /** 包括敏感数据在内的完整转发信息的加密数据，详细见[加密数据解密算法](https://mp.weixin.qq.com/debug/wxadoc/dev/api/signature.html#%E5%8A%A0%E5%AF%86%E6%95%B0%E6%8D%AE%E8%A7%A3%E5%AF%86%E7%AE%97%E6%B3%95) */
            encryptedData: string;
            /** 加密算法的初始向量，详细见[加密数据解密算法](https://mp.weixin.qq.com/debug/wxadoc/dev/api/signature.html#%E5%8A%A0%E5%AF%86%E6%95%B0%E6%8D%AE%E8%A7%A3%E5%AF%86%E7%AE%97%E6%B3%95) */
            iv: string;
        }): void;
    }
    /**
     * 获取转发详细信息
     * @version 1.1.0
     */
    function getShareInfo(options?: GetShareInfoOptions): void;
    // 开放接口-----收货地址
    interface ChooseAddressOptions extends BaseOptions {
        success?(res: {
            /**
             * 调用结果
             *
             */
            errMsg: string;
            /**
             * 收货人姓名
             *
             */
            userName: string;
            /**
             * 邮编
             *
             */
            postalCode: string;
            /**
             * 国标收货地址第一级地址
             *
             */
            provinceName: string;
            /**
             * 国标收货地址第二级地址
             *
             */
            cityName: string;
            /**
             * 国标收货地址第三级地址
             *
             */
            countyName: string;
            /**
             * 详细收货地址信息
             *
             */
            detailInfo: string;
            /**
             * 收货地址国家码
             *
             */
            nationalCode: string;
            /**
             * 收货人手机号码
             *
             */
            telNumber: string;
        }): void;
    }
    function chooseAddress(options: ChooseAddressOptions): void;
    // 开放接口-----卡券
    interface Card {
        cardId: string;
        cardExt: string;
        code?: string;
    }
    interface CardOptions extends BaseOptions {
        cardList: Card[];
        fail?(): void;
        success?(): void;
        complete?(): void;
    }
    interface CardExe extends BaseOptions {
        // 仅自定义 code 模式的卡券须填写，非自定义 code 模式卡券不可填写，详情
        code?: string;
        // 指定领取者的openid，只有该用户能领取。 bind_openid 字段为 true 的卡券必须填写，bind_openid 字段为 false 不可填写。
        openid?: string;
        // 时间戳，东八区时间,UTC+8，单位为秒
        timestamp: number;
        /**
         * 随机字符串，由开发者设置传入，加强安全性（若不填写可能被重放请求）。随机字符串，不长于 32 位。
         * 推荐使用大小写字母和数字，不同添加请求的 nonce_str 须动态生成，若重复将会导致领取失败。
         */
        nonce_str?: string;
        /**
         * 卡券在第三方系统的实际领取时间，为东八区时间戳（UTC+8,精确到秒）。
         * 当卡券的有效期类为 DATE_TYPE_FIX_TERM 时专用，标识卡券的实际生效时间，
         * 用于解决商户系统内起始时间和领取微信卡券时间不同步的问题。
         */
        fixed_begintimestamp?: number;
        // 领取渠道参数，用于标识本次领取的渠道值。
        outer_str?: string;
        // 签名，商户将接口列表中的参数按照指定方式进行签名,签名方式使用 SHA1，具体签名方案参见：卡券签名
        signature: string;
    }

    /**
     * 批量添加卡券。
     */
    function addCard(options: CardOptions): void;
    interface OpenCardOptions extends BaseOptions {
        cardList: Array<{
            cardId: string;
            code: string;
        }>;
    }

    /**
     * 查看微信卡包中的卡券。
     *
     */
    function openCard(options: OpenCardOptions): void;

    interface OpenSettingOptions extends BaseOptions {
        success?(res: { authSetting: { [key in Scope]: boolean } }): void;
    }
    /**
     * 调起客户端小程序设置界面，返回用户设置的操作结果。
     * 注：设置界面只会出现小程序已经向用户请求过的权限。
     * @version 1.1.0
     */
    function openSetting(options: OpenSettingOptions): void;
    /**
     * 获取用户的当前设置。
     * 注：返回值中只会出现小程序已经向用户请求过的权限。
     * @version 1.2.0
     */
    function getSetting(options: OpenSettingOptions): void;
    // #endregion'










    // #region 微信运动
    interface StepInfo {
        /** 时间戳，表示数据对应的时间 */
        timestamp: number;
        /** 微信运动步数 */
        step: number;
    }
    /** 用户过去三十天的微信运动步数 */
    interface StepInfoList {
        stepInfoList: StepInfo[];
    }
    interface WeRunDataOptions extends BaseOptions {
        success?(res: {
            errMsg: string; // 调用结果
            encryptedData: string; // 包括敏感数据在内的完整用户信息的加密数据，详细见加密数据解密算法
            iv: string; // 加密算法的初始向量，详细见加密数据解密算法
        }): void;
    }
    /**
     * 获取用户过去三十天微信运动步数
     * 需要先调用 wx.login 接口。
     * 需要用户授权 scope.werun
     */
    function getWeRunData(options?: WeRunDataOptions): void;

    type AuthModes = "fingerPrint" | "facial" | "speech";
    interface CheckIsSupportSoterAuthenticationOptions extends BaseOptions {
        success?(res: {
            supportMode: AuthModes[]; // 该设备支持的可被SOTER识别的生物识别方式
            errMsg: string; // 接口调用结果
        }): void;
    }
    /**
     * 获取本机支持的 SOTER 生物认证方式
     */
    function checkIsSupportSoterAuthentication(
        options: CheckIsSupportSoterAuthenticationOptions
    ): void;
    interface StartSoterAuthenticationOptions extends BaseOptions {
        requestAuthModes: AuthModes[]; // 请求使用的可接受的生物认证方式
        challenge: string; // 挑战因子。挑战因子为调用者为此次生物鉴权准备的用于签名的字符串关键是别信息，将作为result_json的一部分，供调用者识别本次请求。例如：如果场景为请求用户对某订单进行授权确认，则可以将订单号填入此参数。
        authContent?: string; // 验证描述，即识别过程中显示在界面上的对话框提示内容
        success?(res: {
            errCode: number; // 错误码
            authMode: string; // 生物认证方式
            resultJSON: string; // 在设备安全区域（TEE）内获得的本机安全信息（如TEE名称版本号等以及防重放参数）以及本次认证信息（仅Android支持，本次认证的指纹ID）（仅Android支持，本次认证的指纹ID）
            resultJSONSignature: string; // 用SOTER安全密钥对result_json的签名(SHA256withRSA / PSS, saltlen = 20)
            errMsg: string; // 接口调用结果
        }): void;
    }
    /**
     * 开始 SOTER 生物认证
     */
    function startSoterAuthentication(
        options: StartSoterAuthenticationOptions
    ): void;

    interface CheckIsSoterEnrolledInDeviceOptions extends BaseOptions {
        checkAuthMode: AuthModes; // 认证方式
        success?(res: {
            isEnrolled: boolean; // 是否已录入信息
            errMsg: string; // 接口调用结果
        }): void;
    }
    /**
     * 获取设备内是否录入如指纹等生物信息的接口
     */
    function checkIsSoterEnrolledInDevice(
        options: CheckIsSoterEnrolledInDeviceOptions
    ): void;

    interface ChooseInvoiceTitleOptions extends BaseOptions {
        success?(res: {
            type: string; // 抬头类型（0：单位，1：个人）
            title: string; // 抬头名称
            taxNumber: string; // 抬头税号
            companyAddress: string; // 单位地址
            telephone: string; // 手机号码
            bankName: string; // 银行名称
            bankAccount: string; // 银行账号
            errMsg: string; // 接口调用结果
        }): void;
    }
    /**
     * 选择用户的发票抬头。
     */
    function chooseInvoiceTitle(options: ChooseInvoiceTitleOptions): void;

    interface NavigateToMiniProgramOptions extends BaseOptions {
        appId: string; // 要打开的小程序 appId
        path?: string; // 打开的页面路径，如果为空则打开首页
        extraData?: any; // 包括 encrypt_card_id, outer_str, biz三个字段，须从 step3 中获得的链接中获取参数
        envVersion?: string; // 要打开的小程序版本，有效值 develop（开发版），trial（体验版），release（正式版） ，仅在当前小程序为开发版或体验版时此参数有效；如果当前小程序是体验版或正式版，则打开的小程序必定是正式版。默认值 release
        success?(res: { errMsg: string }): void;
    }

    /**
     * 打开同一公众号下关联的另一个小程序。
     */
    function navigateToMiniProgram(options: NavigateToMiniProgramOptions): void;

    interface NavigateBackMiniProgramOptions extends BaseOptions {
        extraData?: any; // 需要返回给上一个小程序的数据，上一个小程序可在 App.onShow() 中获取到这份数据。详情
        success?(res: { errMsg: string }): void;
    }
    /**
     * 返回到上一个小程序，只有在当前小程序是被其他小程序打开时可以调用成功
     */
    function navigateBackMiniProgram(
        options: NavigateBackMiniProgramOptions
    ): void;

    // #endregion














    // #region Worker
    /**
     * Worker 实例，主线程中可通过 wx.createWorker 接口获取，worker 线程中可通过全局变量 worker 获取。
     * Tips
     * + Worker 最大并发数量限制为 1 个，创建下一个前请用 Worker.terminate() 结束当前 Worker
     * + Worker 内代码只能 require 指定 Worker 路径内的文件，无法引用其它路径
     * + Worker 的入口文件由 wx.createWorker() 时指定，开发者可动态指定 Worker 入口文件
     * + Worker 内不支持 wx 系列的 API
     * + Workers 之间不支持发送消息
     */
    interface Worker {
        /**
         * 向主线程/Worker 线程发送的消息。
         * @param message 需要发送的消息，必须是一个可序列化的 JavaScript 对象。
         */
        postMessage(message: object): void;

        /** 结束当前 Worker 线程。仅限在主线程 worker 对象上调用。 */
        terminate(): void;

        /**
         * 监听主线程/Worker 线程向当前线程发送的消息的事件。
         * @param callback 主线程/Worker 线程向当前线程发送的消息的事件的回调函数
         */
        onMessage(callback: (message: object) => void): void
    }
    /**
     * 创建一个 Worker 线程。目前限制最多只能创建一个 Worker，创建下一个 Worker 前请先调用 Worker.terminate
     * @param scriptPath worker 入口文件的绝对路径
     * @version 1.9.90
     */
    function createWorker(scriptPath: string): Worker;

    // #endregion










    // #region 接口
    interface Logger {
        /**
         * 写log日志，可以提供任意个参数，每个参数的类型为Object/Array/Number/String，参数p1到pN的内容会写入日志
         */
        log(...args: any[]): void;
        /**
         * 写warn日志，参数同log方法
         */
        warn(...args: any[]): void;
        /**
         * 写debug日志，参数同log方法
         */
        debug(...args: any[]): void;
        /**
         * 写info日志，参数同log方法
         */
        info(...args: any[]): void;
    }







    // #region LogManager
    /**
     * 获取日志管理器 logManager 对象。logManager提供log、info、warn、debug四个方法写日志到文件，
     * 这四个方法接受任意个类型为Object/Array/Number/String的参数，
     * 每次调用的参数的总大小不超过100Kb。最多保存5M的日志内容，超过5M后，旧的日志内容会被删除。
     * 用户可以通过设置Button组件的open-type为feedback来上传打印的日志。
     * 用户上传的日志可以通过登录小程序管理后台后进入左侧菜单“客服反馈”页面获取到。
     */
    function getLogManager(): Logger;

    /**
     * 自定义业务数据监控上报接口。使用前，需要在小程序管理后台-运维中心-性能监控-业务数据监控中新建监控事件，
     * 配置监控描述与告警类型。每一个监控事件对应唯一的监控ID，开发者最多可以创建128个监控事件。
     * @param name 监控ID，在小程序管理后台新建数据指标后获得
     * @param value 上报数值，经处理后会在小程序管理后台上展示每分钟的上报总量
     */
    function reportMonitor(name: string, value: number): void;

    /**
     * 自定义分析数据上报接口。使用前，需要在小程序管理后台自定义分析中新建事件，配置好事件名与字段。
     *
     * @param eventName 事件名
     * @param data 上报的自定义数据
     */
    function reportAnalytics(eventName: string, data: object): void;

    /**
     * 用于延迟一部分操作到下一个时间片再执行（类似于 setTimeout）。
     * @param func
     * @version 2.2.3
     */
    function nextTick(func: () => any): void;

    function setEnableDebug(options: EnableDebugOptions): void;
    // #endregion




    // #endregion

    interface EnableDebugOptions extends BaseOptions {
        enableDebug: boolean;
    }





    /**
     * There are two valid ways to define the type of data / properties:
     *
     * 1. { name: valueType }
     * 2. { name: { type: valueType, value?: value } }
     *
     * and this conditional type will extract that out so the call-site will typecheck.
     *
     * Note this is different from PropOptions as it is the definitions you passed to Component function
     * whereas this type is for call-site.
     */
    type DataValueType<Def> = Def extends {
            type: (...args: any[]) => infer T;
            value?: infer T;
        }
        ? T
        : Def extends (...args: any[]) => infer T
            ? T
            : never;


    // #endregion






    // 云开发
    // 文档：https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html
    interface Cloud {
        /**
         * 初始化方法（全局只需一次）
         */
        init: (options: InitCloudOptions) => void;
        /**
         * 接受一个可选对象参数 env：环境 ID，获取数据库的引用
         */
        database: (options: { env: string }) => {};
        /**
         * 接受一个 name 参数，指定需引用的集合名称
         */
        collection: (name: string) => {};
    }
    /**
     * 定义了云开发的默认配置，该配置会作为之后调用其他所有云 API 的默认配置
     */
    interface InitCloudOptions {
        /**
         * 默认环境配置，传入字符串形式的环境 ID 可以指定所有服务的默认环境，传入对象 initCloudEnvOptions 可以分别指定各个服务的默认环境
         * 默认值： default
         */
        env?: string | InitCloudEnvOptions;
        /**
         * 是否在将用户访问记录到用户管理中，在控制台中可见
         * 默认值： false
         */
        traceUser?: boolean;
    }
    /**
     * initCloudOptions 的 env 参数，可以指定各个服务的默认环境
     */
    interface InitCloudEnvOptions {
        /**
         * 数据库 API 默认环境配置
         * 默认值： default
         */
        database?: string;
        /**
         * 存储 API 默认环境配置
         * 默认值： default
         */
        storage?: string;
        /**
         * 云函数 API 默认环境配置
         * 默认值： default
         */
        functions?: string;
    }

    //region mDNS

    /**
     * 取消监听mDNS 服务停止搜索的事件
     * @param callback mDNS 服务停止搜索的事件的回调函数
     * @version 2.4.0
     */
    function offLocalServiceDiscoveryStop(callback: () => void): void;

    /**
     * 取消监听mDNS 服务发现的事件
     * @param callback mDNS 服务发现的事件的回调函数
     * @version 2.4.0
     */
    function offLocalServiceFound(callback: () => void): void;
    /**
     * 取消监听mDNS 服务离开的事件
     * @param callback mDNS 服务离开的事件的回调函数
     * @version 2.4.0
     */
    function offLocalServiceLost(callback: () => void): void;

    /**
     * 取消监听mDNS 服务解析失败的事件
     * @param callback mDNS 服务解析失败的事件的回调函数
     * @version 2.4.0
     */
    function offLocalServiceResolveFail(callback: () => void): void;

    /**
     * 监听mDNS 服务停止搜索的事件
     * @param callback mDNS 服务停止搜索的事件的回调函数
     * @version 2.4.0
     */
    function onLocalServiceDiscoveryStop(callback: () => void): void;

    /**
     * 监听mDNS 服务发现的事件
     * @param callback mDNS 服务发现的事件的回调函数
     * @version 2.4.0
     */
    function onLocalServiceFound(callback: (res: {
        serviceType: string,
        serviceName: string,
        ip: string,
        port: number
    }) => void): void;

    /**
     * 监听mDNS 服务离开的事件
     * @param callback mDNS 服务离开的事件的回调函数
     * @version 2.4.0
     */
    function onLocalServiceLost(callback: (res: {
        serviceType: string,
        serviceName: string
    }) => void): void;

    /**
     * 监听mDNS 服务解析失败的事件
     * @param callback mDNS 服务解析失败的事件的回调函数
     * @version 2.4.0
     */
    function onLocalServiceResolveFail(callback: (res: {
        serviceType: string,
        serviceName: string
    }) => void): void;

    interface StartLocalServiceDiscoverOption {
        /** 要搜索的服务类型 */
        serviceType: string,
        /** 接口调用成功的回调函数 */
        success?: () => void,
        /** 接口调用失败的回调函数 */
        fail?: (res: {
            /**
             * 合法值:
             * + "invalid param" serviceType为空
             * + "scan task already exist" 在当前 startLocalServiceDiscovery 发起的搜索未停止的情况下，再次调用 startLocalServiceDiscovery
             */
            errMsg: string
        }) => void,
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: () => void
    }

    /**
     * 开始搜索局域网下的 mDNS 服务。搜索的结果会通过 wx.onLocalService* 事件返回。
     * @param option
     * Tips:
     * 1. wx.startLocalServiceDiscovery 是一个消耗性能的行为，开始 30 秒后会自动 stop 并执行 wx.onLocalServiceDiscoveryStop 注册的回调函数。
     * 2. 在调用 wx.startLocalServiceDiscovery 后，在这次搜索行为停止后才能发起下次 wx.startLocalServiceDiscovery。停止本次搜索行为的操作包括调用 wx.stopLocalServiceDiscovery 和 30 秒后系统自动 stop 本次搜索。
     * @version 2.4.0
     */
    function startLocalServiceDiscovery(option: StartLocalServiceDiscoverOption): void;

    interface StopLocalServiceDiscoverOption {
        /** 接口调用成功的回调函数 */
        success?: () => void,
        /** 接口调用失败的回调函数 */
        fail?: (res: {
            /**
             * 错误信息，合法值:
             * + "task not found" 在当前没有处在搜索服务中的情况下调用 stopLocalServiceDiscovery
             */
            errMsg: string
        }) => void,
        /** 接口调用结束的回调函数（调用成功、失败都会执行） */
        complete?: () => void
    }
    /**
     * 停止搜索 mDNS 服务
     * @param option
     * @version 2.4.0
     */
    function stopLocalServiceDiscovery(option: StopLocalServiceDiscoverOption): void;
    //endregion
}


