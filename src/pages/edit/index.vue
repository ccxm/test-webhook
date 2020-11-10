<template>
    <div class="edit-container">
        <div class="edit-header y-center__between">
            <div style="display: flex;width: 80%">
              <el-input class="input-title"
                        type="text"
                        placeholder="请输入标题"
                        v-model="fileName"
                        maxlength="15"
                        show-word-limit
              />
              <el-select class="select-tag"
                         v-model="selectTag"
                         multiple
                         :multiple-limit="5"
                         style="margin-left: 20px;"
                         placeholder="请选择标签">
                <el-option
                    v-for="(item,index) in tagList"
                    :key="index"
                    :label="item.tagName"
                    :value="item.tagId">
                </el-option>
              </el-select>
            </div>
            <div style="display: flex;padding-right: 10px">
              <div class="header-input-button">
                <input-button @change="getTagList" />
              </div>
              <el-button class="save-article" icon="el-icon-upload" @click="updateFile">更新文章</el-button>
              <!--            <el-button>返回</el-button>-->
              <el-avatar :size="40" class="header-avatar">
                <img src="../../../public/img/head-photo.png">
              </el-avatar>
            </div>
        </div>
<!--        <markdown-pro v-model="value" />-->
        <le-editor class="edit-md" :style="getHeight" :image-uploader="imageUploader" @uploadImg="uploadImg" v-model="file" :hljs-css="hljsCss" ></le-editor>
    </div>
</template>

<script>
    // import MarkdownPro from 'vue-meditor'
    import InputButton from "../../components/public/InputButton"
    import axios from 'axios'
    import {HTTP_CONFIG} from '@/js/http/config'
    import {pUpdateFile, pRenameFile} from "@/js/http/param"
    import storage from '../../js/storage'

    export default {
        name: "edit",
        components: {
            InputButton,
            // MarkdownPro
        },
        data() {
            return {
                hljsCss: 'agate',
                file: '',
                fileName: '',
                tagList: [],
                selectTag: [],
                input: '',
                height: 400,
                fileId: '',
                folderId: '',
                userId: storage.get('userId'),
                imageUploader: {
                    custom: true,
                    fileType: 'photos',
                    fileNameType: '',
                    imagePrefix: HTTP_CONFIG.IMAGE_BASE_URL, // 图片前缀地址
                    type: 'server',
                    url: 'http://127.0.0.1:3003/user/upload-image' // 接口地址
                }
            }
        },
        computed: {
            getHeight() {
                return {
                    height: `${this.height - 50}px !important`
                }
            }
        },
        watch: {
            selectTag(val) {
                console.log(val)
            }
        },
        methods: {
            getFile() {
                axios.get(`${HTTP_CONFIG.FILE_BASE_URL}/${this.userId}/${pUpdateFile.folderId}/${pUpdateFile.fileId}.md`, {
                    headers: {
                        'Cache-Control': 'no-cache'
                    }
                }).then(res => {
                    this.file = res.data
                }).catch()
            },
            uploadImg:function ($vm,file) {
                // 添加图片
                // 两个参数 第一个是图片访问路径 第二个是文件名 按照如下类似的方法即可向编辑区插入上传好的图片了
                const data = new FormData();
                data.append('file', file);
                axios.post('http://127.0.0.1:3006/api/user/upload-image', data, {
                    headers: {
                        'Content-type': 'multipart/form-data'
                    }
                }).then(res => {
                    $vm.insertImg(`${$vm.config.imageUploader.imagePrefix}${res.data.data.url}`, res.data.data.url)
                })
            },
            updateFile() {
                pUpdateFile.fileContent = this.file
                pUpdateFile.tagList = this.selectTag
                this.$api.updateFie(pUpdateFile)
                this.renameFile()
            },
            renameFile() {
                pRenameFile.newFileName = this.fileName
                this.$api.renameFile(pRenameFile).then(() => {
                    this.changeRouterQuery()
                }).catch()
            },
            changeRouterQuery() {
                this.$router.push({
                    query: {
                        fileName: this.fileName,
                        fileId: pUpdateFile.fileId,
                        folderId: pUpdateFile.folderId
                    }
                })
            },
            getTagList() {
                this.$api.getTagList().then(res => {
                    this.tagList = res.tagList
                }).catch(() => {})
            }
        },
        mounted() {
            this.height = window.screen.availHeight
            window.addEventListener('resize', () => {
                console.log('window',window.screen.availHeight)
                this.height = document.documentElement.clientHeight
            })
            pUpdateFile.fileId = pRenameFile.fileId = this.$route.query.fileId
            pUpdateFile.folderId = pRenameFile.folderId = this.$route.query.folderId
            this.fileName = this.$route.query.fileName
            this.getFile()
            this.getTagList()
        }
    }
</script>

<style scoped lang="scss">
    .edit-container {
        width: 100%;
        height: 100vh;
        overflow-y: hidden;
    }

    .edit-header {
        display: flex;
        padding: 5px 10px;
        /*width: 100%;*/

        .input-title {
            width: 40%;
        }

        .select-tag {
            width: 60%;
        }

        .header-input-button {
            margin-left: 20px;
        }

        .save-article {
            background: #ff4400;
            color: #fff;
            margin-left: 20px;
        }

        .header-avatar {
            margin-left: 20px;
        }
    }

    /*.edit-md {*/
    /*    height: 600px;*/
    /*}*/
</style>
