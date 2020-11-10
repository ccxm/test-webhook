<template>
    <container :show-article="false" :show-archive="true"/>
</template>

<script>
    import Container from '../../components/layout/Container'

    export default {
        name: 'archive',
        components: {
            Container,
        },
        data() {
            return {
                value: ''
            }
        }
    }
</script>

