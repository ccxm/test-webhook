<template>
    <div class="small-card">
        <div class="small-card-content">
            <span class="small-content-title">最新文章</span>
            <div v-for="(item,key) in articleList" :key="key">
                <div class="article-item">
                    <span>{{item.createdAt | formatDate}}</span>
                    <span @click="selectFile(item)" class="file-name">{{item.fileName}}</span>
                    <div class="y-center">
                        <i class="fas fa-folder-open has-text-grey"></i>
                        <span>{{item.parentFolderName}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LastArticle",
        data() {
            return {
                articleList: []
            }
        },
        methods: {
            getArticleList() {
                return new Promise(resolve => {
                    this.$api.getLastArticleList().then(res => {
                        this.articleList = res.lastArticleList
                        resolve()
                    })
                })
            },
            getParentFolderName(folderList,folderId, temp = []) {
                for(let i = 0,len = folderList.length;i < len;i++) {
                    if(folderList[i].folderId === folderId) {
                        if(temp.length < 2) {
                            temp.unshift(folderList[i].folderName)
                        }
                        if(folderList[i].preId) {
                            this.getParentFolderName(folderList, folderList[i].preId, temp)
                        }
                    }
                }
                return temp
            },
            // 扁平化数组
            flatArray(folderList, temp = []) {
                folderList.forEach(item => {
                    temp.push(item)
                    if(item.childFolderList && item.childFolderList.length) {
                        this.flatArray(item.childFolderList, temp)
                    }
                })
                return temp
            },
            selectFile(file) {
                this.$router.push(`/preview?id=${file.fileId}`)
            }
        },
        created() {
            this.$bus.$on('folderListChange', async (folderList) => {
                await this.getArticleList()
                const list = this.flatArray(folderList)
                this.articleList.forEach(item => {
                    this.$set(item, 'parentFolderName', this.getParentFolderName(list, item.folderId).join('/'))
                })
            })
        },
        destroyed() {
            this.$bus.$off('folderListChange')
        }
    }
</script>

<style scoped lang="scss">
    .small-card {
        margin-top: 20px;
    }

    .small-content-title {
        display: block;
        margin-bottom: -10px !important;
    }
    .article-item {
        margin-top: 20px;
        span {
            color: #7a7a7a;
            font-size: 12px;
            display: block;

            &:nth-child(2) {
                color: #2a2a2a;
                font-size: 15px;
                font-weight: bold;
            }
        }

        .file-name {
            cursor: pointer;
        }

        .y-center {
            margin-top: 3px;
            color: #7a7a7a;
            font-size: 14px;
            span {
                margin-left: 4px;
                color: #7a7a7a;
                font-size: 12px;
                display: inline;
                font-weight: lighter;
                letter-spacing: 1px;
            }
        }
    }
</style>
