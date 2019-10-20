<template>
    <div id="page-karaoke">

    </div>
</template>

<script>
export default {
     components:{
        'header-tool-bar': () => import('@/components/header/ToolBar.vue'),
        'header-search': () => import('@/components/header/HeaderSearch.vue'),
        'media-karaoke': () => import('@/components/karaoke/KaraokeMedia.vue'),
    },
}
</script>