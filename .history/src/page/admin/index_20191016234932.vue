<template>
    <div id="page-admin">

    </div>
</template>
<script>
export default {
    created(){
        if(!this.$session.has('token'))
        {
            this.$router.back()
        }
    }
}
</script>