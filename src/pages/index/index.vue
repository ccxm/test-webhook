<template>
    <container />
</template>

<script>
    import Container from '../../components/layout/Container'

    export default {
        name: 'index',
        components: {
            Container
        },
        data() {
            return {
                value: ''
            }
        },
    }
</script>
