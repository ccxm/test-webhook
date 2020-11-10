import {post, get, del, put} from './http'

export const login = params => post('user/login', params, {
    showTip: true,
    tipMsg: '登录成功'
})

export const getFolderList = () => get('folder/folder-list')

export const newFolder = params => post('folder/new-folder', params)

export const deleteFolder = params => del('folder/folder', params)

export const newFile = params => post('file/new-file', params)

export const deleteFile = params => del('file/file', params, {
    showTip: true,
    tipMsg: '删除成功'
})

export const copyFolder = params => post('folder/copy', params, {
    showTip: true,
    tipMsg: '复制成功'
})

export const copyFile = params => post('file/copy', params, {
    showTip: true,
    tipMsg: '复制成功'
})

export const updateFie = params => put('file/file', params, {
    showTip: true,
    tipMsg: '更新成功'
})

export const renameFile = params => post('file/rename', params)

export const renameFolder = params => put('folder/rename', params, {
    showTip: true,
    tipMsg: '重命名成功'
})

export const getStatistics = () => get('/user/statistics')

export const getTagList = () =>  get('gather/tag-list')

export const addTag = params => post('gather/tag', params, {
    showTip: true,
    tipMsg: '新增标签成功'
})

export const getLastArticleList = () => get('file/last-articles')

export const getArticleList = () => get('file/articles')

export const updatePageView = params => put('/file/pages-view', params)

export const getArticleDetail = params => get('/file/detail', params)

export const updateVisitorNum = params => put('/user/pages-view', params)

export const getVisitorNum = params => get('/user/pages-view', params)
