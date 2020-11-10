<template>
    <container :show-article="false" :show-full-catalog="true" :is-sort-page="true"/>
</template>

<script>
    import Container from '../../components/layout/Container'

    export default {
        name: 'sort',
        components: {
            Container,
        }
    }
</script>
