import Vue from 'vue'
import Router from 'vue-router'
import index from './pages/index/index'
import edit from "./pages/edit/index"
import preview from "./pages/preview/index"
import archive from './pages/archive/index'
import tag from './pages/tag/index'
import sort from './pages/sort/index'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'index',
            component: index
        },
        {
            path: '/edit',
            name: 'edit',
            component: edit
        },
        {
            path: '/preview',
            name: 'preview',
            component: preview
        },
        {
            path: '/archive',
            name: 'archive',
            component: archive
        },
        {
            path: '/tag',
            name: 'tag',
            component: tag
        },
        {
            path: '/sort',
            name: 'sort',
            component: sort
        },
    ],
})

