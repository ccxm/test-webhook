<template>
    <div>
        <el-dialog
                title="登录"
                :visible="showModal"
                width="370px"
                :center="true"
                :before-close="close"
                @close="close">
            <div>
                <el-form :model="ruleForm" :rules="rules" ref="loginForm" class="demo-ruleForm">
                    <el-form-item prop="account">
                        <el-input v-model="ruleForm.account" placeholder="登录账号"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="ruleForm.password" placeholder="密码" type="password" :show-password="true"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="submitForm" class="login-button">登录</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import dataStore from '../../js/data-store'
    export default {
        name: 'Login',
        props: {
            showModal: {
                type: Boolean,
                default: true,
            },
        },
        data() {
          return {
              ruleForm: {
                  account: '',
                  password: '',
              },
              rules: {
                  account: [
                      { required: true, message: '请输入账号', trigger: 'blur' },
                  ],
                  password: [
                      { required: true, message: '请输入密码', trigger: 'blur' }
                  ]
              }
          }
        },
        methods: {
            close() {
                this.$emit('close')
            },
            login() {
                this.$api.login({
                    email: this.ruleForm.account,
                    password: this.ruleForm.password
                }).then(res => {
                    dataStore.saveToken(res.token)
                    this.close()
                })
            },
            submitForm() {
                this.$refs['loginForm'].validate((valid) => {
                    if (valid) {
                        this.login()
                    } else {
                        this.$tip.tError('请将表单填写完整')
                        return false
                    }
                })
            },
        },
    }
</script>

<style lang="scss">
    .el-dialog {
        .el-dialog__title {
            font-size: 26px;
            /*font-weight: bold;*/
            color: #242424;
            font-family: Monda;
            letter-spacing: 3px;
        }

        border-radius: 10px;

        .dialog-footer {
            margin-top: -15px;
        }

        .el-dialog__headerbtn {
            position: absolute;
            top: -6px;
            right: -6px;
            padding: 0;
            background: 0 0;
            border: none;
            outline: 0;
            cursor: pointer;
            font-size: 16px;
            color: red;
            border-radius: 100%;
            width: 18px;
            height: 18px;
            background: #fff;
        }
    }

    .login-button {
        width: 98%;
        font-size: 18px;
        background-color: #3273DC;
        color: #fff;

        &:hover {
            background-color: #3273DC;
        }
    }
</style>
