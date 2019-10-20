<template>
    <div id="page-profile">
        <header-tool-bar />
    </div>
</template>

<script>
export default {
    components:{
        'header-tool-bar': () => import('@/components/header/ToolBar.vue')
    },
}
</script>