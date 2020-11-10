<template>
    <div class="file-popover" ref="filePopover" :style="getPosition" v-show="isShow" @mouseover="hide">
        <span @click="emit('newFolder')" :class="isFolder ? '' : 'disable-span'" :disabled="isFolder">新建文件夹</span>
        <span @click="emit('newFile')" :class="isFolder ? '' : 'disable-span'" :disabled="isFolder">新建md</span>
        <span @click="emit('rename')">重命名</span>
        <span @click="emit('copy')">复制</span>
        <span @click="emit('paste')" :class="isFolder ? '' : 'disable-span'" :disabled="isFolder">粘贴</span>
        <span @click="emit('del')">删除</span>
        <span @click="emit('cut')">剪切</span>
    </div>
</template>

<script>
    export default {
        name: "FilePopover",
        props: {
            x: Number,
            y: Number,
            isFolder: Boolean,
            folder: Object,
            file: Object
        },
        data() {
            return {
                isShow: false,
                timer: null
            }
        },
        computed: {
            getPosition() {
                console.log(this.x)
                this.hide()
                return {
                    left: this.x + 'px',
                    top: this.y + 'px'
                }
            }
        },
        methods: {
            hide() {
                if(!this.x) {
                    return
                }
                this.isShow = true
                // 重新计时
                if(this.timer) {
                    clearTimeout(this.timer)
                }
                this.timer = setTimeout(() => {
                    this.isShow = false
                },1500)
            },
            emit(event) {
                this.isShow = false
                // this.$bus.$emit(event, this.folder, this.file, this.isFolder)
                if(event === 'newFolder' || event === 'newFile') {
                    this.$emit(event)
                    return
                }
                console.log(`${event}${this.isFolder ? 'Folder' : 'File'}`)
                this.$emit(`${event}${this.isFolder ? 'Folder' : 'File'}`)
            }
        }
    }
</script>

<style scoped lang="scss">
    .file-popover {
        width: 150px !important;
        background: #f2f2f2;
        font-size: 14px !important;
        color: #2a2a2a !important;
        padding: 10px 0;
        border-radius: 3px;
        box-shadow:2px 2px 1px #969696;
        position: fixed;
        z-index: 9999;
        font-family: Monda !important;
        font-weight: normal;

        span {
            display: block;
            padding: 5px 20px;

            &:hover {
                background: #eee;
            }
        }
    }

    .disable-span {
        color: #b8b8b8 !important;
        pointer-events: none;
        &:hover {
            background-color: unset !important;
        }
    }
</style>
