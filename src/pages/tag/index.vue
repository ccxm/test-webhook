<template>
    <container :show-article="false" :is-tag-page="true"/>
</template>

<script>
    import Container from '../../components/layout/Container'

    export default {
        name: 'tag',
        components: {
            Container,
        }
    }
</script>
