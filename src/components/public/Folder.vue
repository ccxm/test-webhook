<template>
    <div class="folder-container">
        <div class="folder-body">
            <div class="folder-item y-flex">
                <div class="folder y-center" @click.right.prevent="showMenu($event, true)"
                     @click.left.prevent="isFold = !isFold">
                    <i :class="isFold ? 'el-icon-arrow-right' : 'el-icon-arrow-down'"></i>
                    <i :class="isFold ? 'fa fa-folder' : isTrash ? 'iconfont icon-trash' : 'fa fa-folder-open'"
                       class="folder-icon"></i>
<!--                    <div v-if="isRenameFolder">-->
                        <span v-if="!isRenameFolder">{{folderItem.folderName}}</span>
                        <el-input v-else ref="childInput" class="input-name" v-model="tempFolderName" maxlength="10" show-word-limit
                                  :autofocus="true" @blur="clearNewInput" @keyup.enter.native="renameFolder"/>
<!--                    </div>-->
<!--                    <div v-else class="folder-item y-flex child-folder">-->
<!--                        <div class="folder xy-center new-folder">-->
<!--                            <i class="el-icon-arrow-right"></i>-->
<!--                            <i class="fa fa-folder"></i>-->
<!--                            <el-input ref="childInput" class="input-name" v-model="tempFolderName" maxlength="10" show-word-limit-->
<!--                                      :autofocus="true" @blur="clearNewInput" @keyup.enter.native="newFolder"/>-->
<!--                        </div>-->
<!--                    </div>-->
                </div>
                <div v-if="folderItem.childFolderList.length && !isFold" class="child-folder">
                    <folder v-for="(item, index) in folderItem.childFolderList" :folder-item="item" :key="index"/>
                </div>
                <div v-if="!isFold">
                    <div class="file" v-for="(file, fileIndex) in getFileList" :key="fileIndex"
                         @contextmenu.prevent="showMenu($event,false, file)" @dblclick="editFile(file)" @click="recodeCurFile(file)">
                        <div class="y-center">
                            <i class="iconfont icon-a_markdown"></i>
                            <span v-if="!isRenameFile || curFile.fileId !== file.fileId">{{file.fileName}}</span>
                            <el-input v-else ref="childInput" class="input-name" v-model="tempFileName" maxlength="15"
                                      show-word-limit
                                      :autofocus="true" @blur="clearNewInput" @keyup.enter.native="renameFile"/>
                        </div>
                    </div>
                    <div class="file" v-if="isNewFile">
                        <div class="y-center">
                            <i class="iconfont icon-a_markdown"></i>
                            <el-input ref="childInput" class="input-name" v-model="tempFileName" maxlength="15"
                                      show-word-limit
                                      :autofocus="true" @blur="clearNewInput" @keyup.enter.native="newFile"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="folder-item y-flex child-folder" v-if="isNewFolder">
                <div class="folder xy-center new-folder">
                    <i class="el-icon-arrow-right"></i>
                    <i class="fa fa-folder"></i>
                    <el-input ref="childInput" class="input-name" v-model="tempFolderName" maxlength="10" show-word-limit
                              :autofocus="true" @blur="clearNewInput" @keyup.enter.native="newFolder"/>
                </div>
            </div>
        </div>
        <file-popover :x="position.x" :y="position.y" :is-folder="isClickFolder" :folder="folderItem" :file="curFile"
                      @newFolder="onNewFolder"
                      @newFile="onNewFile"
                      @delFolder="onDelFolder"
                      @delFile="onDelFile"
                      @copyFolder="onCopyFolder"
                      @copyFile="onCopyFile"
                      @pasteFolder="onPaste"
                      @renameFolder="onRenameFolder"
                      @renameFile="onRenameFile"
        />
    </div>
</template>

<script>
    import FilePopover from "./FilePopover"
    import storage from "../../js/storage"
    import { pRenameFolder, pRenameFile } from './../../js/http/param'

    export default {
        name: "Folder",
        components: {FilePopover},
        props: {
            isMid: {
                type: Boolean,
                default: false
            },
            isTrash: {
                type: Boolean,
                default: false
            },
            folderItem: Object
        },
        data() {
            return {
                isDown: false,
                isNewFolder: false,
                isRenameFolder: false,
                isRenameFile: false,
                isFold: true,
                isNewFile: false,
                isClickFolder: true,  // 是否为点击文件夹
                tempFolderName: '',
                tempFileName: '',
                position: {
                    x: 0,
                    y: 0
                },
                curFile: null
            }
        },
        computed: {
            getFileList() {
                if(this.isTrash) {
                    return this.folderItem.fileList
                }
                return this.folderItem.fileList.filter(item => {
                    return item.isDel === false
                })
            }
        },
        methods: {
            showMenu(e, isClickFolder, file = null) {
                this.isClickFolder = isClickFolder
                this.position.x = e.clientX + 30
                this.position.y = e.clientY - 30
                this.curFile = file
            },
            recodeCurFile(file) {
                const temp = {
                    ...file,
                    folderId: this.folderItem.folderId
                }
                const pathName = this.$route.name
                if(pathName !== 'index' || pathName !== 'preview') {
                  this.$router.push(`/preview?id=${temp.fileId}`)
                }else {
                  this.$bus.$emit('selectedFile', temp)
                }
            },
            rename() {
                if (this.isNewFolder) {
                    this.folderList.push({
                        folderName: this.tempFolderName,
                        isFold: true
                    })
                    this.clearNewInput()
                }
            },
            onNewFile() {
                console.log('新建文件')
                this.isNewFile = true
                this.isFold = false
                this.autoFocus()
            },
            onRenameFolder() {
                this.isRenameFolder = true
                this.tempFolderName = this.folderItem.folderName
                this.autoFocus()
            },
            onRenameFile() {
                this.isRenameFile = true
                this.tempFileName = this.curFile.fileName
                this.autoFocus()
            },
            onNewFolder() {
                this.isNewFolder = true
                this.autoFocus()
            },
            onDelFolder() {
                console.log('删除文件夹')
                this.$bus.$emit('delFolder', this.folderItem.folderId)
            },
            onDelFile() {
                console.log('删除文件')
                console.log(this.curFile)
                this.$bus.$emit('delFile', this.folderItem.folderId, this.curFile.fileId)
            },
            onCopyFolder() {
                storage.set('copyContext', {
                    folderId: this.folderItem.folderId,
                    isFolder: true
                })
            },
            onCopyFile() {
                storage.set('copyContext', {
                    folderId: this.folderItem.folderId,
                    fileId: this.curFile.fileId,
                    isFolder: false
                })
            },
            onPaste() {
                const copyContext = storage.get('copyContext')
                if(copyContext.isFolder) {
                    this.$bus.$emit('copyFolder', {
                        sourceFolderId: copyContext.folderId,
                        targetFolderId:  this.folderItem.folderId
                    })
                }else{
                    this.$bus.$emit('copyFile', {
                        fileId: copyContext.fileId,
                        sourceFolderId: copyContext.folderId,
                        targetFolderId:  this.folderItem.folderId
                    })
                }
                storage.set('copyContext', null)
            },
            // onRename(isFolder) {
            //     // if(isFolder) {
            //     //
            //     // }
            // },
            newFile() {
                if (!this.tempFileName) {
                    return
                }
                this.$bus.$emit('newFile', this.folderItem, this.tempFileName)
                this.clearNewInput()
            },
            clearNewInput() {
                this.isNewFolder = false
                this.isNewFile = false
                this.isRenameFolder = false
                this.isRenameFile = false
                this.tempFileName = ''
                this.tempFolderName = ''
            },
            newFolder() {
                if (!this.tempFolderName) {
                    return
                }
                this.$bus.$emit('newFolder', this.folderItem, this.tempFolderName)
                this.clearNewInput()
            },
            renameFolder() {
                pRenameFolder.folderId = this.folderItem.folderId
                pRenameFolder.folderName = this.tempFolderName
                this.$api.renameFolder(pRenameFolder).then(() => {
                    this.folderItem.folderName = this.tempFolderName
                    this.clearNewInput()
                }).catch(() => {})
            },
            renameFile() {
                pRenameFile.folderId = this.folderItem.folderId
                pRenameFile.fileId = this.curFile.fileId
                pRenameFile.newFileName = this.tempFileName
                this.$api.renameFile(pRenameFile).then(() => {
                    this.curFile.fileName = this.tempFileName
                    this.clearNewInput()
                    this.$tip.tSuccess('重命名成功')
                }).catch(() => {})
            },
            autoFocus() {
                this.$nextTick(() => {
                    this.$refs.childInput.focus()
                })
            },
            editFile(file) {
                // this.$router.push({
                //     path: '/edit',
                //     query: {
                //         folderId: this.folderItem.folderId,
                //         fileId: file.fileId,
                //         fileName: file.fileName
                //     },
                //     params: {
                //         folderId: this.folderItem.folderId
                //     }
                // })
                const { href } = this.$router.resolve({
                    path: '/edit',
                    query: {
                      folderId: this.folderItem.folderId,
                      fileId: file.fileId,
                      fileName: file.fileName
                    },
                    params: {
                      folderId: this.folderItem.folderId
                    }
                })
                window.open(href, '_blank')
            }
        },
        mounted() {
            console.log(this.folderItem)
        }
    }
</script>

<style scoped lang="scss">

    .child-folder {
        padding-left: 40px;
    }

</style>
