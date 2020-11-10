<template>
    <div class="c-container container-table">
        <el-row style="width: 100%">
            <el-col :span="6" :md="7" :lg="6" class="yx-center" >
                <user-info />
                <catalog v-if="!showFullCatalog" :is-full="showFullCatalog" @change="showFullCatalog = !showFullCatalog" :is-mid-show="showFullCatalog"/>
                <tag-container v-if="showFullCatalog" />
            </el-col>
            <el-col v-if="isPreview" :span="18" class="yx-center">
                <article-body :is-preview="isPreview"/>
            </el-col>
            <el-col v-else :span="12" :md="17" :lg="12" class="yx-center">
                <catalog :is-mid="true" v-if="showFullCatalog" :is-full="showFullCatalog" :is-sort-page="isSortPage" @change="showFullCatalog = !showFullCatalog" :is-mid-show="showFullCatalog"/>
                <archive-container v-if="showArchive"/>
                <article-body v-if="showArticle"/>
                <tag-container v-if="isTagPage" :show-full="true"/>
            </el-col>
            <el-col :span="6" class="yx-center hidden-md-and-down" v-if="!isPreview">
                <work-show />
                <last-article />
                <tag-container v-if="!isTagPage && !showFullCatalog" />
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import UserInfo from "../public/UserInfo"
    import ArticleBody from "../public/ArticleBody"
    import Catalog from "../public/Catalog"
    import TagContainer from "../public/TagContainer"
    import LastArticle from "../public/LastArticle"
    import WorkShow from "../public/WorkShow"
    import ArchiveContainer from '../public/ArchiveContainer'
    export default {
        name: "Container",
        components: {
            ArchiveContainer,
            WorkShow,
            LastArticle,
            TagContainer,
            Catalog,
            UserInfo,
            ArticleBody
        },
        props: {
            isPreview: {
                type: Boolean,
                default: false
            },
            showArticle: {
                type: Boolean,
                default: true
            },
            showArchive: {
                type: Boolean,
                default: false
            },
            isTagPage: {
                type: Boolean,
                default: false
            },
            showFullCatalog: {
                type: Boolean,
                default: false
            },
            isSortPage: {
                type: Boolean,
                default: false
            }
        },
        // data() {
        //     return {
        //         showFullCatalog: false
        //     }
        // }
    }
</script>

<style scoped lang="scss">
    .container-table {
        /*border: 1px solid black;*/
        width: 80%;
        margin-bottom: 160px;
    }

</style>
