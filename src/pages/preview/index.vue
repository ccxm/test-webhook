<template>
    <container :is-preview="true"/>
</template>

<script>
    import Container from '../../components/layout/Container'

    export default {
        name: 'preview',
        components: {
            Container,
        },
        data() {
            return {
                value: ''
            }
        },
    }
</script>
