/**
 * 注册Vue插件
 */
// 插件引入
import Filters from './modules/filters'
// 插件注册
const InstallPlugins = {
    install(Vue) {
        Vue.use(Filters)
    }
}

export default InstallPlugins
