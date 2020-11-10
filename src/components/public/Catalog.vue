<template>
    <div class="small-card" :class="{'card': isMid, 'full-card': isFull}" v-loading="loading" :element-loading-text="loadingText">
        <div class="content">
            <div class="folder-header y-center__between">
                <i class="el-icon-folder-add" @click="addNewFolder"></i>
                <i v-if="!isSortPage" class="iconfont" :class="isFull ? 'icon-tuichuquanping' : 'icon-quanping2'" @click="changeSize"></i>
            </div>
        </div>
        <div class="folder-content">
            <div class="folder-container">
                <folder v-for="(item, index) in folderList" :folder-item="item" :key="index"/>
                <div class="folder-body new-folder">
                    <div class="folder-item y-flex child-folder" v-if="isNewFolder">
                        <div class="folder xy-center new-folder">
                            <i class="el-icon-arrow-right"></i>
                            <i class="fa fa-folder"></i>
                            <el-input ref="input" class="input-name" v-model="newFolderName" maxlength="10"
                                      show-word-limit
                                      :autofocus="true" @blur="clearInput" @keyup.enter.native="onKeyEnter"/>
                        </div>
                    </div>
                </div>
<!--                <folder :folder-item="trash" :is-trash="false"/>-->
            </div>
        </div>
        <file-popover :x="position.x" :y="position.y" :is-folder="isClickFolder"/>
    </div>
</template>

<script>
    import FilePopover from "./FilePopover"
    import Folder from "./Folder"
    import {pNewFolder, pNewFile, pDelFile, pDelFolder, pCopyFile, pCopyFolder} from './../../js/http/param'

    export default {
        name: "Catalog",
        components: {Folder, FilePopover},
        props: {
            isMid: {
                type: Boolean,
                default: false
            },
            isFull: {
                ype: Boolean,
                default: false
            },
            isMidShow: {
                type: Boolean,
                default: false
            },
            isSortPage: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                isNewFolder: false,
                isClickFolder: true,  // 是否为点击文件夹
                clickIndex: 0,
                newFolderName: '',
                position: {
                    x: 0,
                    y: 0
                },
                folderList: [],
                trash: {},
                loading: false,
                loadingText: '删除中'
            }
        },
        watch: {
            isMidShow(val) {
                if (val && !this.isMid) {
                    this.offListener()
                }
                if (!val && !this.isMid) {
                    this.offListener()
                    this.addListeners()
                }
            },
            folderList: {
                handler() {
                    this.notifyFolderListChange()
                },
                immediate: true,
                deep: true
            }
        },
        methods: {
            showMenu(e, isClickFolder, index) {
                console.log(e)
                console.log(e.pageX)
                this.isClickFolder = isClickFolder
                this.clickIndex = index
                this.position.x = e.clientX + 30
                this.position.y = e.clientY - 30
                if (this.isClickFolder) {
                    this.clickIndex = index
                }
            },
            rename() {
                if (this.isNewFolder) {
                    this.folderList.push({
                        folderName: this.newFolderName,
                        isFold: true
                    })
                    this.clearNewInput()
                }
            },
            addNewFolder() {
                this.isNewFolder = true
                this.autoFocus()
            },
            clearInput() {
                this.isNewFolder = false
                this.newFolderName = ''
            },
            autoFocus() {
                this.$nextTick(() => {
                    console.log(this.$refs.input)
                    this.$refs.input.focus()
                })
            },
            getFolderList(isLoading = false) {
                this.$api.getFolderList().then(res => {
                    this.folderList = res.folderList
                    this.trash = res.trash
                    if (isLoading) {
                        this.loading = false
                    }
                }).catch()
            },
            onKeyEnter() {
                pNewFolder.folderName = this.newFolderName
                this.rNewFolder()
            },
            // 新建文件夹
            onNewFolder() {
                if (!this.newFolderName) {
                    this.clearInput()
                    return
                }
                pNewFolder.folderName = this.newFolderName
                this.rNewFolder()
            },
            rNewFolder(folder = null) {
                const params = {...pNewFolder}
                pNewFolder.folderName = ''
                pNewFolder.preId = ''
                this.$api.newFolder(params).then(res => {
                    console.log(res)
                    const target = folder ? folder.childFolderList : this.folderList
                    target.push({
                        ...res,
                        childFolderList: []
                    })
                    this.clearInput()
                }).catch()
            },
            rNewFile(folder) {
                this.$api.newFile(pNewFile).then(res => {
                    res.isDel = false
                    folder.fileList.push(res)
                }).catch()
            },
            rDelFolder() {
                this.loading = true
                this.$api.deleteFolder(pDelFolder).then(() => {
                    this.getFolderList(true)
                }).catch()
            },
            rDelFile() {
                this.loading = true
                this.$api.deleteFile(pDelFile).then(() => {
                    this.getFolderList(true)
                }).catch()
            },
            rCopyFolder() {
                this.loading = true
                this.$api.copyFolder(pCopyFolder).then(() => {
                    this.getFolderList(true)
                }).catch()
            },
            rCopyFile() {
                this.loading = true
                this.$api.copyFile(pCopyFile).then(() => {
                    this.getFolderList(true)
                }).catch()
            },
            // 监听事件
            addListener() {
                this.$bus.$on('newFolder', (folder, folderName) => {
                    pNewFolder.folderName = folderName
                    pNewFolder.preId = folder.folderId
                    this.rNewFolder(folder)
                })
                this.$bus.$on('newFile', (folder, fileName) => {
                    console.log(folder, fileName)
                    pNewFile.fileName = fileName
                    pNewFile.folderId = folder.folderId
                    this.rNewFile(folder)
                })
                this.$bus.$on('delFolder', (folderId) => {
                    pDelFolder.folderId = folderId
                    this.rDelFolder()
                })
                this.$bus.$on('delFile', (folderId, fileId) => {
                    pDelFile.folderId = folderId
                    pDelFile.fileId = fileId
                    this.rDelFile()
                })
                this.$bus.$on('copyFolder', params => {
                    console.log('copyFolder1123')
                    pCopyFolder.sourceFolderId = params.sourceFolderId
                    pCopyFolder.targetFolderId = params.targetFolderId
                    this.rCopyFolder()
                })
                this.$bus.$on('copyFile', params => {
                    pCopyFile.sourceFolderId = params.sourceFolderId
                    pCopyFile.targetFolderId = params.targetFolderId
                    pCopyFile.fileId = params.fileId
                    this.rCopyFile()
                })
            },
            offListener() {
                this.$bus.$off('newFolder')
                this.$bus.$off('newFile')
                this.$bus.$off('delFolder')
                this.$bus.$off('copyFolder')
                this.$bus.$off('copyFile')
            },
            changeSize() {
                this.$emit('change')
            },
            notifyFolderListChange() {
                this.$bus.$emit('folderListChange', this.folderList)
            }
        },
        mounted() {
            this.getFolderList()
            this.addListener()
        },
        destroyed() {
            this.offListener()
        }
    }
</script>

<style lang="scss">
    .padding-left-folder {
        width: 92%;
        padding: 5px 4%;
    }

    .folder-hover {
        padding: 3px 4%;

        &:hover {
            background-color: #eee;
        }
    }

    .folder-header, .folder-body {
        @extend .padding-left-folder;
        background-color: #eee;

        i {
            font-size: 20px;
            color: #666;

            &:hover {
                color: $click-active-color;
            }

            &:active {
                opacity: .6;
            }
        }
    }

    .input-name {
        input {
            padding: 5px !important;
            height: 28px !important;
            line-height: 28px !important;
            margin-left: 5px;
        }
    }

    .folder-container {
        font-size: 14px;

        .el-icon-folder-add {
            &:hover {
                color: #409EFF;
            }
        }

        .folder-header, .folder-body {
            @extend .padding-left-folder;
            background-color: #eee;

            i {
                font-size: 20px;
                color: #666;
            }
        }

        .folder-body, .trash-body {
            width: 100%;
            background-color: unset;
            padding: 3px 0;

            .folder-item {
                font-family: Arial, serif;

                .folder {
                    @extend .folder-hover;

                    i {
                        &:nth-child(1) {
                            font-size: 14px;
                            margin-right: 3px;
                            font-weight: bold;
                            color: #aaa;
                        }

                        &:nth-child(2) {
                            margin-left: 2px;
                            color: #FFCA28;
                            width: 23px;
                        }
                    }

                    .icon-trash {
                        color: #0096FD !important;
                    }


                    span {
                        margin-left: 5px;
                        color: #4a4a4a;
                        font-weight: normal;
                        font-size: 14px;
                    }
                }

                .file {
                    @extend .folder-hover;
                    color: #333 !important;
                    font-weight: 500 !important;
                    font-family: "PingFang SC";
                    font-size: 14px;

                    .y-center {
                        margin-left: 40px;

                        i {
                            color: #649EFD;
                            margin-right: 2px;
                        }
                    }
                }

            }

        }

        .new-folder {
            padding: 0;
        }
    }

</style>

<style scoped lang="scss">

    .card {
        width: 98% !important;
        margin-bottom: 20px;
    }

    .small-card, .card {
        margin-top: 20px;
        min-height: 250px;

        &:hover {
            background-color: unset !important;
        }
    }

    .full-card {
        margin-top: 0 !important;
    }

    .folder-content {
        margin-top: 5px;
        user-select: none;
    }


</style>

