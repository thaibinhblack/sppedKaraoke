<template>
    <div id="page-karaoke">
        <header-tool-bar />
    </div>
</template>

<script>
export default {
     components:{
        'header-tool-bar': () => import('@/components/header/ToolBar.vue'),
    },
}
</script>