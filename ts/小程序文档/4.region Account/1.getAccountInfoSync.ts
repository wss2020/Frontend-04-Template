// #region Account
interface AccountInfo {
    /* 小程序账号信息 */
    miniProgram: {
        /*小程序 appId	 */
        appId: string;
    };
    /* 插件账号信息（仅在插件中调用时包含这一项）	 */
    plugin?: {
        /* 插件 appId	 */
        appId: string;
        /* 插件版本号	 */
        version: string;
    };
}

/**
 * 获取当前账号信息
 * @version >= 2.2.2
 */
function getAccountInfoSync(): AccountInfo{
    return {
        miniProgram:{
            appId:''
        }
    }
}
// #endregion
