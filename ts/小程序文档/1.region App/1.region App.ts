import {wx} from '../原文档'


// #region App 函数及参数

/**
 * App() 函数用来注册一个小程序。
 * 接受一个 object 参数，其指定小程序的生命周期函数等。
 */
declare function App<T extends wx.AppOptions>(
    app: T & ThisType<T & wx.App>
): void;

/**
 * 获取小程序实例
 */
declare function getApp(): wx.App;

// #endregion
