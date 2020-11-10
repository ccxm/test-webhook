<template>
    <div class="footer x-center">
        <div class="c-container y-center__between">
            <div class="foot-container">
                <span>© 2020 <span class="blue-span">Cxm</span></span>
                <span>粤ICP备19127992号</span>
                <span>Powered by <span class="blue-span">Cxm</span></span>
                <span class="view-num">❤️ 累计 {{pageViewNum}}次光临！❤️</span>
            </div>
            <div class="foot-right">
                <a class="nav-item nav-icon" href="https://github.com/ccxm/" target="_blank">
                    <i class="fab fa-github" aria-hidden="true"></i>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
    import storage from '../../js/storage'
    export default {
        name: 'NavFooter',
        data() {
            return {
                pageViewNum: 0
            }
        },
        mounted() {
            this.$api.getVisitorNum({userId: storage.get('userId')}).then(res => {
                this.pageViewNum = res.pageView
            })
        }
    }
</script>

<style scoped lang="scss">

    .footer {
        //margin-top: 30px;
        display: flex;
        background: $default-background;
        height: 60px;
        width: 100%;
        box-shadow: 0 4px 10px 10px rgba(0,0,0,0.05);
        padding: 40px 0;
        position: absolute;
        left: 0;
        bottom: 0;

        .c-container {
            /*display: flex;*/
            /*justify-content: center;*/
            /*flex-direction: column;*/
        }

        .foot-container {
            display: flex;
            justify-content: center;
            flex-direction: column;
            color: #4a4a4a;
            font-size: 13px;
            padding-left: 20px;

            .blue-span {
                color: #3273dc;
            }

            .view-num {
                margin-top: 10px;
            }

        }

        .foot-right {
            padding-right: 10px;
            .fab {
              color: #363636;
            }
        }

    }

</style>
