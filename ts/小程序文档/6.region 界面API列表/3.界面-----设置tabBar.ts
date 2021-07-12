import {BaseOptions} from "./0.baseOpions";

export declare namespace wss {

    interface SetTabBarBadgeOptions extends BaseOptions {
        /**
         * tabBar的哪一项，从左边算起
         */
        index: number;
        /**
         * 显示的文本，超过 3 个字符则显示成“…”
         */
        text: string;
    }

    /**
     * 为 tabBar 某一项的右上角添加文本
     * @version 1.9.0
     */
    function setTabBarBadge(options: SetTabBarBadgeOptions): void;

    interface TabBarBadgeOptions extends BaseOptions {
        /**
         * tabBar的哪一项，从左边算起
         */
        index: number;
    }

    /**
     * 移除 tabBar 某一项右上角的文本
     * @version 1.9.0
     */
    function removeTabBarBadge(options: TabBarBadgeOptions): void;

    /**
     * 显示 tabBar 某一项的右上角的红点
     * @version 1.9.0
     */
    function showTabBarRedDot(option: TabBarBadgeOptions): void;

    /**
     * 隐藏 tabBar 某一项的右上角的红点
     * @version 1.9.0
     */
    function hideTabBarRedDot(option: TabBarBadgeOptions): void;

    interface SetTabBarStyleOptions extends BaseOptions {
        /** tab 上的文字默认颜色 */
        color: string;
        /** tab 上的文字选中时的颜色 */
        selectedColor: string;
        /** tab 的背景色 */
        backgroundColor: string;
        /** tabbar上边框的颜色， 仅支持 black/white */
        borderStyle: string;
    }

    /**
     * 动态设置 tabBar 的整体样式
     * @version 1.9.0
     */
    function setTabBarStyle(options: SetTabBarStyleOptions): void;

    interface SetTabBarItemOptions extends BaseOptions {
        /** tabBar 的哪一项，从左边算起 */
        index: number;
        /** tab 上按钮文字 */
        text?: string;
        /**
         * 图片路径, icon 大小限制为40kb
         * 建议尺寸为 81px * 81px
         * 当 postion 为 top 时，此参数无效，不支持网络图片
         */
        iconPath?: string;
        /**
         * 选中时的图片路径
         * icon 大小限制为40kb，建议尺寸为 81px * 81px
         * 当 postion 为 top
         */
        selectedIconPath?: string;
    }

    /**
     * 动态设置 tabBar 某一项的内容
     * @version 1.9.0
     */
    function setTabBarItem(options: SetTabBarItemOptions): void;

    interface ShowTabBarOptions extends BaseOptions {
        /** 是否需要动画效果，默认无 */
        aniamtion?: boolean;
    }

    /**
     * 显示 tabBar
     * @version 1.9.0
     */
    function showTabBar(options: ShowTabBarOptions): void;

    /**
     * 隐藏 tabBar
     * @version 1.9.0
     */
    function hideTabBar(options: ShowTabBarOptions): void;

}
