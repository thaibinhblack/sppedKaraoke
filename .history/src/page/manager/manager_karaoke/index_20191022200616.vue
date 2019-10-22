<template>
<div id="manager-karaoke">
    <header-tool />
</div>
</template>

<script>
export default {
    components:{
        'header-tool': () => import('@/components/header/HeaderSearch.vue')
    }
}
</script>
