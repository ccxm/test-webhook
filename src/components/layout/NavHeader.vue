<template>
    <div class="header x-center default-hover">
        <div class="y-center c-container">
            <el-row class="c-row y-center">
                <el-col :span="3" class="yx-center nav-logo">
                    <span class="nav-title nav-item">丑小喵</span>
<!--                  <img class="nav-title nav-item" src="./../../assets/image/logo.png">-->
                </el-col>
                <el-col :span="10" class="y-center">
                    <span class="nav-item" v-for="(item,index) in urlList" :key="index" @click="jump(item.path)">{{item.title}}</span>
                </el-col>
                <el-col :span="4" :offset="7" class="y-center header--right">
                    <div class="y-center">
                        <a v-if="!isLogin" class="nav-item nav-icon" @click="showLogin = true">
                            <i class="fas fa fa-sign-in login-icon" aria-hidden="true"></i>
                        </a>
                        <el-popover v-else
                                placement="top-start"
                                width="50"
                                trigger="hover"
                                >
                            <el-button class="login-out-btn" @click="logout">登出</el-button>
                            <img class="avatar-photo" slot="reference" src="../../../public/img/head-photo.png" />
                        </el-popover>
                    </div>
                    <a class="nav-item nav-icon"  href="https://github.com/ccxm/" target="_blank">
                        <i class="fab fa-github" aria-hidden="true"></i>
                    </a>
<!--                    <a class="nav-item nav-icon">-->
<!--                        <i class="fas fa-search" aria-hidden="true"></i>-->
<!--                    </a>-->
                    <a class="nav-item nav-icon">
                        <i class="fas fa-moon" aria-hidden="true"></i>
                    </a>
                </el-col>
            </el-row>
        </div>
        <login :show-modal="showLogin" @close="onClose"/>
    </div>
</template>

<script>

    import Login from '../public/Login'
    import dataStore from '../../js/data-store'
    export default {
        name: "NavHeader",
        components: {Login},
        data() {
            return {
                showLogin: false,
                isLogin: false,
                urlList: [
                    {
                        title: '首页',
                        path: '/'
                    },
                    {
                        title: '分类',
                        path: '/sort'
                    },
                    {
                        title: '标签',
                        path: '/tag'
                    },
                    {
                        title: '归档',
                        path: '/archive'
                    },
                    // {
                    //     title: '关于',
                    //     path: '/about'
                    // },
                ]
            }
        },
        methods: {
            jump(path) {
                this.$router.push(path)
            },
            logout() {
                dataStore.deleteToken()
                this.isLogin = false
            },
            getToken() {
                return !!dataStore.getToken()
            },
            onClose() {
                this.showLogin = false
                this.isLogin = this.getToken()
            }
        },
        mounted() {
            this.isLogin = this.getToken()
        }
    }
</script>

<style lang="scss">

    .el-popover {
        .el-button {
            border: none !important;
            width: 100% !important;
        }
    }

</style>

<style scoped lang="scss">
    .header {
        display: flex;
        background: $default-background;
        height: 60px;
        width: 100%;
        box-shadow: 0 4px 10px rgba(0,0,0,0.05), 0 0 1px rgba(0,0,0,0.1);
    }

    .nav-logo {
      justify-content: flex-start;
      flex-direction: row;
      padding-left: 20px;
    }

    .c-row {
        width: 100%;
        span {
            font-size: 16px;
            color: #333;
            &:hover {
                color: #3273dc;
                cursor: pointer;
            }
        }

        .nav-item {
            padding: 5px 14px;
        }

        .login-icon {
            padding-top: 5px;
            font-size: 22px !important;
            margin-left: -5px;
            color: #242424;
        }

        .nav-title {
            font-size: 30px;
            color: #3273DC;
            font-weight: 500;
            padding-left: 0;
            font-family: Zcool, sans-serif;
        }

        .nav-icon {
            font-size: 18px;
        }

        .avatar-photo {
            width: 25px;
            height: 25px;
            border-radius: 100%;
            padding-top: 5px;
        }

        .header--right {
            justify-content: flex-end;
            padding-right: 10px;

            .fa-github {
              color: #363636;
            }
        }
    }


</style>
