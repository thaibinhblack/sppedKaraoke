<template>
    <div id="page-admin">

    </div>
</template>
<script>
export default {
    created(){
        if(!this.$cookies.isKey('token'))
        {
            this.$router.push('/login')
        }
    }
}
</script>