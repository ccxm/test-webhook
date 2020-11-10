<template>
    <div class="input-button">
        <el-input v-model="input" placeholder="请输入标签" v-if="isInput" autofocus="true" @keyup.native.enter="onEnter">
            <i slot="suffix" class="el-icon-close close-button" @click="isInput = false"></i>
        </el-input>
        <el-button v-else type="primary" plain icon="el-icon-plus" @click="isInput = true">新增标签</el-button>
    </div>
</template>

<script>
    import {pAddTag} from '../../js/http/param'

    export default {
        name: "InputButton",
        data() {
            return {
                input: '',
                isInput: false
            }
        },
        methods: {
            onEnter() {
                console.log('enter')
                pAddTag.tagName = this.input
                this.$api.addTag(pAddTag).then(() => {
                    this.isInput = false
                    this.$emit('change')
                })
            }
        }
    }
</script>

<style lang="scss">
    .input-button {
        display: flex;
        height:40px;
        .el-input__suffix {
            right: 10px;
            display: flex;
            align-items: center;
        }

        .el-input,.el-button {
            width: 150px;
        }

        .close-button {
            &:hover {
                background: #409EFF;
                color: #fff;
                border-radius: 50%;
                padding: 2px;
            }

            &:active {
                opacity: .6;
                transition: all ease .4s;
            }
        }
    }
</style>
