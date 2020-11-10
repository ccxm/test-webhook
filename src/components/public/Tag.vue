<template>
    <div class="tag">
        <span>{{tagName}}</span>
        <span>{{num}}</span>
    </div>
</template>

<script>
    export default {
        name: "Tag",
        props: {
            tagName: {
                type: String,
                default: 'tag'
            },
            num: {
                type: Number,
                default: 0
            }
        }
    }
</script>

<style scoped lang="scss">
    $border-radius: 4px;
    .tag {
        font-size: 11px;
        font-weight: lighter;
        color: #2a2a2a;
        margin-top: 6px;
        margin-right: 8px;
        font-family: Monda,sans-serif;
        display: inline-flex;

        span {
            &:nth-child(1) {
                border-top-left-radius: $border-radius;
                border-bottom-left-radius: $border-radius;
                background-color: #ededed;
                padding: 3px 12px;
            }
            &:nth-child(2) {
                border-top-right-radius: $border-radius;
                border-bottom-right-radius: $border-radius;
                background-color: #e4e4e4;
                padding: 3px 6px;
            }
        }
    }
</style>
