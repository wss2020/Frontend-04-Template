
/**
 * Page 实现的接口对象
 */
interface PageOptions {
    /** 页面的初始数据 */
    data?: any;

    /**
     * 生命周期函数--监听页面加载
     * @param options 接收页面参数 可以获取wx.navigateTo和wx.redirectTo及<navigator/>中的 query
     */
    onLoad?: (options: object) => void;

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady?: () => void;

    /**
     * 生命周期函数--监听页面显示
     */
    onShow?: () => void;

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide?: () => void;

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload?: () => void;

    /**
     * 下拉刷新
     * 在 Page 中定义 onPullDownRefresh 处理函数，监听该页面用户下拉刷新事件。
     * 需要在 config 的window选项中开启 enablePullDownRefresh。
     * 当处理完数据刷新后，wx.stopPullDownRefresh可以停止当前页面的下拉刷新。
     */
    onPullDownRefresh?: () => void;

    /**
     * 页面上拉触底事件的处理函数
     * 监听用户上拉触底事件。
     * 可以在app.json的window选项中或页面配置中设置触发距离onReachBottomDistance。
     * 在触发距离内滑动期间，本事件只会被触发一次。
     */
    onReachBottom?: () => void;

    /**
     * 在 Page 中定义 onShareAppMessage 函数，设置该页面的转发信息。
     * + 只有定义了此事件处理函数，右上角菜单才会显示 “转发” 按
     * + 用户点击转发按钮的时候会调
     * + 此事件需要 return 一个 Object，用于自定义转发内容
     */
    onShareAppMessage?: (
        options?: PageShareAppMessageOptions
    ) => ShareAppMessage;

    /**
     * 页面滚动触发事件的处理函数
     * 监听用户滑动页面事件。
     * 参数为 Object，包含以下字段：
     */
    onPageScroll?: (option: { scrollTop: number }) => void;

    /**
     * 当前是 tab 页时，点击 tab 时触发
     */
    onTabItemTap?: (item: any) => void;
}

interface PageShareAppMessageOptions {
    /** 转发事件来源。button：页面内转发按钮；menu：右上角转发菜单 */
    from: "button" | "menu";
    /** 如果 from 值是 button，则 target 是触发这次转发事件的 button，否则为 undefined */
    target: object | undefined;
}

// 开放接口-----分享
interface ShareAppMessage extends BaseOptions {
    /**
     * 分享标题  默认为当前小程序名称
     *
     */
    title?: string;

    /**
     * 分享描述, 默认为当前小程序名称
     */
    desc?: string;

    /**
     * 自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径，支持PNG及JPG
     * 不传入 imageUrl 则使用默认截图。显示图片长宽比是 5:4
     * @version 1.5.0
     */
    imageUrl?: string;

    /**
     * 分享路径  当默认为前页面 path ，
     * 必须是以 / 开头的完整路径
     */
    path?: string;

    success?(res: {
        /** 每一项是一个 shareTicket ，对应一个转发对象 */
        shareTickets: string[];
    }): void;
}

interface BaseOptions<R = any, E = any> {
    /** 接口调用成功的回调函数 */
    success?(res: R): void;

    /** 接口调用失败的回调函数 */
    fail?(res: E): void;

    /** 接口调用结束的回调函数（调用成功、失败都会执行） */
    complete?(res: any): void;
}
