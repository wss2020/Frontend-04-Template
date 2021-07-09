import {wx} from '../原文档'

/**
 * App 实现的接口对象
 * 开发者可以添加任意的函数或数据到 Object 参数中，用 this 可以访问
 */
interface AppOptions {
    /**
     * 监听小程序初始化。
     * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
     * 生命周期函数
     */
    onLaunch?: (option: wx.LaunchOptions) => void;

    /**
     * 监听小程序显示。
     * 当小程序启动，或从后台进入前台显示，会触发 onShow
     * 生命周期函数
     */
    onShow?: (option: wx.LaunchOptions) => void;

    /**
     * 监听小程序隐藏。
     * 当小程序从前台进入后台，会触发 onHide
     * 生命周期函数
     */
    onHide?: () => void;

    /**
     * 错误监听函数
     * 当小程序发生脚本错误或者 api 调用失败时
     * 会触发 onError 并带上错误信息
     */
    onError?: (msg: string) => void;

    /**
     * 小程序退出时触发
     */
    onUnlaunch?: () => void;

    /**
     * 全局Data
     */
    globalData?: object;
}

