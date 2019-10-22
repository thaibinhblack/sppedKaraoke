<template>
<div id="manager-karaoke">
    <div class="sidebar">
        <sidebar :activeSidebar="activeSidebar" :user="user" />
    </div>
    <div class="content-manager-karaoke wrap-manager-main" :class="{active: activeSidebar}">
        <header-tool />
    </div>
</div>
</template>

<script>
export default {
    components:{
        'header-tool': () => import('@/components/header/ToolBar.vue'),
        'sidebar': () => import('@/components/sidebars/sidebarManagerKaraoke.vue')
    },
    data()
    {
        return {
            activeSidebar: true,
            user: null
        }
    },
}
</script>

<style>
.siebar-manager-karaoke.active {width: 290px;}
.wrap-manager-main.active {width: calc(100% - 290px)}
.wrap-manager-main {width: 100%}
.siebar-manager-karaoke {width: 0;}
.title-card {font-weight: bold}
</style>
