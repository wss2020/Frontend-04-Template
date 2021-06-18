// #region Page
import {wx} from "../原文档";

/**
 * Page() 函数用来注册一个页面。
 * 接受一个 object 参数，其指定页面的初始数据、生命周期函数、事件处理函数等。
 */
declare function Page<T extends wx.PageOptions & object>(
    page: T & ThisType<T & wx.Page>
): void;

/**
 * getCurrentPages() 函数用于获取当前页面栈的实例，
 * 以数组形式按栈的顺序给出，第一个元素为首页，最后一个元素为当前页面。
 */
declare function getCurrentPages(): wx.Page[];

// #endregion
