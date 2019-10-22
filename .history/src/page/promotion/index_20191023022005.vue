<template>
<div id="page-promotion">
    <header-tool />
</div>
</template>

<script>
export default {
    components: {
        'header-tool': () => import ('@/components/header/ToolBar.vue')
    }
}
</script>