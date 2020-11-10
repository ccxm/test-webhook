<template>
    <div id="app">
      <nav-header v-if="showNav"/>
        <div class="app-container" :class="{'edit-container': !showNav}">
          <router-view />
        </div>
      <nav-footer v-if="showNav"/>
    </div>
</template>

<script>
    import storage from './js/storage'
    import NavHeader from '@/components/layout/NavHeader';
    import NavFooter from '@/components/layout/NavFooter';

    export default {
        name: 'App',
        components: { NavFooter, NavHeader },
        data() {
          return {
            showNav: true
          }
        },
        watch: {
          '$route': {
            handler() {
              if (this.$route.name === 'edit') {
                this.showNav = false
                console.log(this.showNav)
              }
            },
            immediate: true
          }
        },
        mounted() {
            this.$api.updateVisitorNum({userId: storage.get('userId')})
        }
    }
</script>

<style lang="scss">
    #app {
        width: 100%;
        min-height: 100vh;
        background: $default-background;
        position: relative;
    }

    .app-container {
        background: $default-background;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-top: 20px;
    }

    .edit-container {
      margin-top: 0;
    }
</style>
