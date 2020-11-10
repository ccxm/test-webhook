/**
 * 请求参数列表
 * 用object.seal来约束请求参数
 * 防止在代码中对请求参数添加其他数据
 * 请求参数以p开头
 * 即params的意思
 */

export const pNewFolder = Object.seal({
    folderName: '',
    preId: '',
    userId: ''
})

export const pNewFile = Object.seal({
    fileName: '',
    folderId: '',
    userId: ''
})

export const pDelFolder = Object.seal({
    folderId: '',
    userId: ''
})

export const pDelFile = Object.seal({
    folderId: '',
    fileId: '',
    userId: ''
})

export const pCopyFolder = Object.seal({
    sourceFolderId: '',
    targetFolderId: '',
    userId: ''
})

export const pCopyFile = Object.seal({
    fileId: '',
    sourceFolderId: '',
    targetFolderId: '',
    userId: ''
})

export const pUpdateFile = Object.seal({
    fileId: '',
    folderId: '',
    fileContent: '',
    tagList: [],
    userId: ''
})

export const pRenameFile = Object.seal({
    fileId: '',
    folderId: '',
    newFileName: '',
    userId: ''
})

export const pRenameFolder = Object.seal({
    folderId: '',
    folderName: '',
    userId: ''
})

export const pAddTag = Object.seal({
    tagName: '',
    userId: ''
})
