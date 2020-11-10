<template>
    <div class="small-card" :class="showFull ? 'full-card' : ''">
        <div class="small-card-content">
            <span class="small-content-title">标签</span>
            <div class="tag-content">
                <tag v-for="(item, index) in tagList" :key="index" :tag-name="item.tagName" :num="item.fileList.length" class="tag-item"/>
<!--                <tag class="tag-item"/>-->
<!--                <tag class="tag-item"/>-->
<!--                <tag class="tag-item"/>-->
<!--                <tag class="tag-item"/>-->
<!--                <tag class="tag-item"/>-->
<!--                <tag class="tag-item"/>-->
<!--                <tag class="tag-item"/>-->
<!--                <tag class="tag-item"/>-->
<!--                <tag class="tag-item"/>-->
            </div>
        </div>
    </div>
</template>

<script>
    import Tag from "./Tag"
    export default {
        name: "TagContainer",
        components: {
            Tag
        },
        props: {
            showFull: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                tagList: []
            }
        },
        methods: {
            getTagList() {
                this.$api.getTagList().then(res => {
                    this.tagList = res.tagList
                })
            }
        },
        mounted() {
            this.getTagList()
        }
    }
</script>

<style scoped lang="scss">
    .small-card {
        margin-top: 20px;
    }

    .full-card {
        margin-top: 0 !important;
        width: 98%;
    }


    .tag-content {
        display: flex;
        flex-wrap: wrap;
    }

</style>
