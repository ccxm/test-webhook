<template>
    <div class="user-info card small-card">
        <div class="content yx-center">
            <el-avatar :size="80" class="avatar">
                <img src="./../../../public/img/head-photo.png">
            </el-avatar>
            <span class="nick-name">丑小喵</span>
            <span class="motto">只有敢于做梦才能圆梦</span>
            <div>
                <i class="fas fa-map-marker-alt mr-1"></i>
                <span>广东茂名</span>
            </div>
            <div class="y-center__between">
                <div class="yx-center">
                    <span>文章</span>
                    <span>{{articleNum}}</span>
                </div>
                <div class="yx-center">
                    <span>分类</span>
                    <span>{{sortNum}}</span>
                </div>
                <div class="yx-center">
                    <span>标签</span>
                    <span>{{tagNum}}</span>
                </div>
            </div>
            <el-button class="fork-me" round @click="forkMe">关注我</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserInfo",
        data() {
            return {
                articleNum: 0,
                sortNum: 0,
                tagNum: 0
            }
        },
        methods: {
            getStatistics() {
                this.$api.getStatistics().then(res => {
                    this.articleNum = res.articleNum
                    this.sortNum = res.sortNum
                    this.tagNum = res.tagNum
                }).catch(() => {})
            },
            forkMe() {
                window.open('https://github.com/ccxm/')
            }
        },
        mounted() {
            this.getStatistics()
        }
    }
</script>

<style scoped lang="scss">
    $color: #4a4a4a;

    .user-info {
        padding-bottom: 25px;
        /*position: fixed;*/

        .avatar {
            margin-top: 20px;
            transition: all .5s linear;
            &:hover {
                transform: rotate(360deg);
                -ms-transform:rotate(360deg); 	/* IE 9 */
                -moz-transform:rotate(360deg); 	/* Firefox */
                -webkit-transform:rotate(360deg); /* Safari 和 Chrome */
                -o-transform:rotate(360deg);
            }
        }

        .content {
            .nick-name {
                margin-top: 10px;
                font-size: 20px;
                font-weight: 600;
            }

            .motto {
                color: #4a4a4a;
                font-size: 15px;
            }

            div {
                color: #4a4a4a;
                font-size: 15px;

                span {
                    margin-left: 5px;
                }
            }

            .y-center__between {
                width: 80%;
                span {
                    display: block;
                }

                .yx-center {
                    margin-top: 10px;
                    span {
                        &:nth-child(1) {
                            font-size: 12px;
                        }
                        &:nth-child(2) {
                            font-size: 25px;
                            color: #242424;
                        }
                    }
                }
            }

            .fork-me {
                margin-top: 15px;
                width: 85%;
                background-color: #3273DC;
                color: #fff;
            }
        }
    }


</style>
