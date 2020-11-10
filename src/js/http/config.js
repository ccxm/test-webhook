export const HTTP_CONFIG = Object.freeze({
    BASE_URL: process.env.VUE_APP_SERVER_URL,
    IMAGE_BASE_URL: process.env.VUE_APP_IMG_SERVER_URL,
    FILE_BASE_URL: process.env.VUE_APP_FILE_BASE_URL,
    SUCCESS_CODE: 10000,
    FAIL_CODE: 40999, // 未知错误
    INVALID_PARAM_CODE: 40099, // 参数不合法
    EMPTY_PARAM_CODE: 40009 // 请求参数不能为空
})
