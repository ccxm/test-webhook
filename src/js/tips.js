import { Message } from 'element-ui'
import { tipType } from './const-table'

export const tCommon = (message, type = tipType.SUCCESS) => {
    Message({
        message,
        type,
        duration: 3000
    })
}

export const tSuccess = message => tCommon(message)

export const tWarn = message => tCommon(message, tipType.WARNING)

export const tError = message => tCommon(message, tipType.ERROR)

export const tEmptyParam = message => {
    return Message({
        message,
        type: tipType.ERROR,
        duration: 3000
    })
}

export const tInvalidParam = message => {
    return Message({
        message,
        type: tipType.ERROR,
        duration: 3000
    })
}

export const tErrorTip = message => {
    return Message({
        message,
        type: tipType.ERROR,
        duration: 3000
    })
}

export const tSendVerifyCode = () => {
    return Message({
        message: '验证码已发送至您的邮箱，请注意查收',
        type: tipType.WARNING,
        duration: 3000
    })
}

export const tLoading = (message) => {
    return Message({
        message,
        type: tipType.SUCCESS,
        duration: 3000000,
        iconClass: 'el-icon-loading',
        customClass: 'paying-tips'
    })
}

// export default  {
//     tCommon,
//     tSuccess,
//     tWarn,
//     tErrorTip,
//     tError,
//     tEmptyParam,
//     tInvalidParam,
//     tSendVerifyCode,
//     tLoading
// }
