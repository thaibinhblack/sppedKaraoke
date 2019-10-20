<template>
    <div class="wrap-manager-karaoke row">
        <sidebar-manager :activeSidebar="activeSidebar" :user="user" />
        <div class="wrap-manager-main" :class="{active: activeSidebar}">
            <header-tool-bar :menuManager="activeSidebar" @closeOpenSidebar="activeSidebar = $event" :user="user"/>
            <router-view></router-view>
        </div>
        <v-overlay :value="$store.state.loading" style="color:#fff !important;">
            <v-progress-circular indeterminate size="32" style="color:#fff;"></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    components: {
        'header-tool-bar': () => import('@/components/header/ToolBar.vue'),
        'sidebar-manager': () => import('@/components/sidebars/SidebarManager.vue')
    },
    data()
    {
        return {
            activeSidebar: true,
            user: null
        }
    },
    methods:{
        ...mapActions(["commitUser"]),
        ApiCheckToken()
        {
            this.$http.get(this.$store.state.API_URL + 'user/token?api_token='+this.$session.get('token')).then((response) => {
                this.user = response.data
                
                if(response.data.UUID_RULE == 'user-2019')
                {
                    this.$router.push('/')
                }
            })
        }
    },
    created()
    {
        // this.$session.destroy()
        if(!this.$session.has('token'))
        {
            this.$router.push('/login')
        }
        else{
            this.ApiCheckToken()
        }
    }
}
</script>

<style>
.siebar-manager-karaoke.active {width: 290px;}
.wrap-manager-main.active {width: calc(100% - 290px)}
.wrap-manager-main {width: 100%}
.siebar-manager-karaoke {width: 0;}
.title-card {font-weight: bold}
</style>