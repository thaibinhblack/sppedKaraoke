<template>
<div id="manager-karaoke">
    <div class="sidebar">
        <sidebar :activeSidebar="activeSidebar" :user="user" />
    </div>
    <div class="content-manager-karaoke">
        <header-tool />
    </div>
</div>
</template>

<script>
export default {
    components:{
        'header-tool': () => import('@/components/header/ToolBar.vue'),
        'sidebar': () => import('@/components/sidebars/sidebarManagerKaraoke.vue')
    }
}
</script>
