<template>
    <div class="small-card">
        <div class="small-card-content">
            <span class="small-content-title">我的作品</span>
            <div v-for="(item,index) in workList" :key="index">
                <div class="work-item xy-center">
                    <div class="y-center" @click="openWork(item.url)">
                        <i class="fa fa-circle"></i>
                        <span>{{item.name}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "WorkShow",
        data() {
            return {
                workList: [
                    {
                        name: '丑小喵商城',
                        url: 'https://mall.cxmmao.com/#/'
                    },
                    {
                        name: '丑小喵商城接口文档',
                        url: 'https://mall.cxmmao.com/cat-mall-api-doc/'
                    }
                ]
            }
        },
        methods: {
            openWork(url) {
                window.open(url)
            }
        }
    }
</script>

<style scoped lang="scss">
    .work-item {
        height: 37px;

        .y-center {
            width: 92%;
            font-size: 16px;
            padding: 3px 4px;
            border-radius: 4px;

            &:hover {
                background-color: $default-background;
                box-shadow:0 0 5px #CCCCCC;
                cursor: pointer;
            }

            i {
                font-size: 12px;
                display: inline-block;
                padding-top: 3px;
                transform: scale(0.5);
            }

            span {
                margin-left: 5px;
                font-size: 15px;
            }
        }
    }
</style>
