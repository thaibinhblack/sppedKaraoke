<template>
<div id="detail-room">
    <header-tool-bar />
    <header-search />
</div>
</template>

<script>
export default {
    components:{
        'header-tool-bar': () => import('@/components/header/ToolBar.vue'),
        'header-search': () => import('@/components/header/HeaderSearch.vue'),
    },
}
</script>