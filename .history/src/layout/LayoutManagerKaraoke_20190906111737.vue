<template>
    <div class="wrap-manager-karaoke row">
        <sidebar-manager :activeSidebar="activeSidebar" />
        <div class="wrap-manager-main" :class="{active: activeSidebar}">
            <header-tool-bar :menuManager="activeSidebar" @closeOpenSidebar="activeSidebar = $event" />
            <router-view></router-view>
        </div>
        
    </div>
</template>

<script>
export default {
    components: {
        'header-tool-bar': () => import('@/components/header/ToolBar.vue'),
        'sidebar-manager': () => import('@/components/sidebars/SidebarManager.vue')
    },
    data()
    {
        return {
            activeSidebar: true,
        }
    },
    created()
    {
        // this.$session.destroy()
        if(!this.$session.has('user_social') && !this.$session.has('user'))
        {
            this.$router.push('/login')
        }
        else
        {
            console.log(this.$session.get('user_social'))
        }
    }
}
</script>

<style>
.siebar-manager-karaoke.active {width: 290px;}
.wrap-manager-main.active {width: calc(100% - 290px)}
.wrap-manager-main {width: 100%}
.siebar-manager-karaoke {width: 0;}
.title-card {font-weight: bold}
</style>