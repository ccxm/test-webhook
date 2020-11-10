<template>
    <div style="width: 98%">
        <div class="card" style="width: 100%">
            <div class="content">
                <span class="time-year">2020</span>
                <el-timeline>
                    <el-timeline-item
                            v-for="(item, index) in sliceList"
                            :key="index"
                            placement="top"
                            :timestamp="item.createdAt | formatDate">
                        <div>
                            <span @click="selectFile(item)" class="file-name">{{item.fileName}}</span>
                            <div class="y-center">
                                <i class="fas fa-folder-open has-text-grey"></i>
                                <span>{{item.parentFolderName}}</span>
                            </div>
                        </div>
                    </el-timeline-item>
                </el-timeline>
            </div>
        </div>
        <el-pagination
                class="container-pagination"
                background
                layout="prev, pager, next"
                prev-text="上一页"
                next-text="下一页"
                :page-size="pageSize"
                :current-page.sync="curPage"
                :total="articleList.length">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: 'ArchiveContainer',
        data() {
            return {
                articleList: [],
                curPage: 1,
                pageSize: 5
            }
        },
        computed: {
            sliceList() {
                console.log(typeof this.curPage, this.curPage)
                return this.articleList.slice(this.pageSize * (this.curPage - 1), this.pageSize * this.curPage)
            }
        },
        methods: {
            getArticleList() {
                return new Promise(resolve => {
                    this.$api.getArticleList().then(res => {
                        this.articleList = res.articleList
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
                console.log(this.articleList)
            })
        },
        destroyed() {
          this.$bus.$off('folderListChange')
        }
    }
</script>

<style lang="scss">

    .content {
        .el-timeline {
            padding-top: 12px;
            padding-left: 28px;
            .el-timeline-item__wrapper {
                color: #2a2a2a;
                font-size: 14px;
                font-weight: bold;
                padding-bottom: 5px;

                .el-timeline-item__timestamp {
                    color: #7a7a7a;
                    font-weight: 100;
                    font-size: 12px;
                }

                .el-timeline-item__tail {
                    border-left: 1px solid #dbdbdb;
                }

                .el-timeline-item__node {
                    background-color: #dbdbdb;
                }

                .y-center {
                    margin-top: 4px;
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
        }

    }

</style>

<style lang="scss">
    .container-pagination {
        .btn-prev,.btn-next,.el-pager li {
            background-color: #fff !important;
            color: #666;
            font-weight: 100;
            font-size: 12px;
        }

        .el-pager {
            li.active {
                background-color: #3273dc !important;
                color: #fff;
            }
        }

        .btn-prev,.btn-next {
            width: 62px !important;
            margin: 0 !important;
            font-weight: 400 !important;
            /*padding: 6px 10px !important;*/
        }

    }

    .el-pagination::after, .el-pagination::before {
        display: none !important;
    }
</style>

<style scoped lang="scss">

    .content {
        padding: 21px;
        height: 530px;

        .time-year {
            display: block;
        }

        .file-name {
            cursor: pointer;
        }
    }

    .container-pagination {
        width: 100%;
        margin-top: 30px;
        /*border: 1px solid black;*/
        display: flex;
        justify-content: space-between;
        /*justify-content: space-around;*/
        padding: 2px 0;
    }

</style>
