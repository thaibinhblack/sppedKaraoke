<template>
     <v-toolbar>
                <v-row  no-gutters dense style="padding: 15px;width:100%">
                    <v-col cols="12" md="3">
                        <h3><span><v-icon class="btn-menu" v-if=" user != null" :class="{active: menuManager}" @click="closeOpenSidebar()" >mdi-menu</v-icon></span> <router-link to="/" style="color:#333;">SPEED KARAOKE</router-link></h3>
                    </v-col>
                
                    <v-col cols="12" md="9">
                        <ul v-if="!$cookies.isKey('token')">
                            <li><span>Hotline: 0947164024</span></li>
                            <li><router-link class="hover-resignter" to="/login">Trở thành chủ quán karaoke</router-link></li>
                            <li><router-link to="/resignter">Đăng ký</router-link> </li>
                            <li><router-link to="/login">Đăng nhập</router-link></li>
                        </ul>
                        <ul v-if="user != null">
                            <li><span>Hotline: 0947164024</span></li>
                            <li><router-link to="/profile/edit-account/info"><span><v-icon>mdi-email</v-icon> {{user.EMAIL}} </span></router-link></li>
                             <li><span class="btn-logout" @click="logout()">Đăng xuất</span></li>
                        </ul>
                    </v-col>
                </v-row>
        </v-toolbar>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'header-tool-bar',
    props: ["menuManager"],
    data()
    {
        return {
            user: null
        }
    },
    computed: {
        ...mapGetters(["getToken"])
    },
    watch:{
        getToken()
        {
            this.ApiCheckToken()
        }
    },
    methods: {
        closeOpenSidebar()
        {
            this.$emit("closeOpenSidebar", !this.menuManager)
        },
        logout()
        {
            this.$cookies.remove('key')
            this.$router.push('/login')
        },
        ApiCheckToken()
        {
            if(this.$cookies.isKey('token'))
            {
                this.$http.get(this.$store.state.API_URL + 'user/token?api_token='+this.$cookies.get('token')).then((response) => {
                    if(response.data.success == false)
                    {
                        this.$cookies.remove('token')
                        this.$router.push('/login')
                    }
                    else
                    {
                        this.user = response.data
                        console.log(response.data)
                    }
                })
            }
            else
            {
                this.$router.push('/login')
            }
        }
    },
    created()
    {
        
        if(this.$cookies.isKey('token')){
            this.ApiCheckToken()
        }
    }
}
</script>

<style scoped>
ul {text-align: right}
ul li {list-style: none;display: inline-block;padding: 7px;}
ul li a,ul li span {text-decoration: none;font-size: 13px;color: #333;}
ul li a:hover,ul li span:hover {color: #f65e39 !important}
.hover-resignter {background: #fff;border-radius: 5px;padding: 4px 10px;color: #f65e39;border:1px solid #f65e39}
.hover-resignter:hover {background: #f65e39;color: #fff !important  ;}
.btn-menu {cursor: pointer;}
.btn-logout {cursor: pointer;}
/* .btn-menu.active {display: inline-block;} */
</style>
