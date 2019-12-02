<template>
    <v-card class="siebar-manager-karaoke" :class="{active: activeSidebar}">
            <v-navigation-drawer permanent width="100%" > 
                <v-list-item two-line="" >
                    <v-list-item-avatar>
                        <router-link to="/profile">
                            <v-avatar
                                size="55px"
                                color="#e2e2e2"
                            >
                                <img v-if="user.AVATAR != null" :src="$store.state.PUBLIC_URL + user.AVATAR" alt="alt">
                            </v-avatar>
                        </router-link>
                    </v-list-item-avatar>
                     <v-list-item-content>
                        <v-list-item-title class="title">
                            <router-link to="/profile">
                                <span style="font-size:14px;">
                                    {{user.DISPLAY_NAME }}
                                </span>
                            </router-link>
                            
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            <small>{{user.EMAIL}}</small>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>
    
                <!-- <v-list-item link to="dashboard">
                        <v-list-item-icon>
                            <v-icon>mdi-view-dashboard</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title class="title-menu">
                            Dashboard
                        </v-list-item-title>
                </v-list-item> -->
                <v-list-group>
                    <template v-slot:activator>
                        <v-list-item-icon>
                            <v-icon>mdi-store</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title class="title-menu">
                            Quản lý quán
                        </v-list-item-title>
                    </template>
                    <v-list-item link to="/manager-karaoke/karaoke">
                        <v-list-item-icon></v-list-item-icon>
                        <v-list-item-title class="title-menu-sub title-menu">
                            Danh sách chi nhánh
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item link to="/manager-karaoke/add-karaoke">
                        <v-list-item-icon></v-list-item-icon>
                        <v-list-item-title class="title-menu-sub title-menu">
                            Thêm chi nhánh
                        </v-list-item-title>
                    </v-list-item>
                     <!-- <v-list-item link>
                        <v-list-item-icon></v-list-item-icon>
                        <v-list-item-title class="title-menu-sub title-menu">
                            Thống kê
                        </v-list-item-title>
                    </v-list-item> -->
                </v-list-group>
                <v-list-group>
                    <template v-slot:activator>
                        <v-list-item-icon><v-icon>mdi-account</v-icon></v-list-item-icon>
                        <v-list-item-title>Quản lý nhân viên</v-list-item-title>
                    </template>
                    <v-list-item link to="/manager-karaoke/users">
                        <v-list-item-icon></v-list-item-icon>
                        <v-list-item-title class="title-menu-sub title-menu">
                            Danh sách nhân viên
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item link to="/manager-karaoke/add-user">
                        <v-list-item-icon></v-list-item-icon>
                        <v-list-item-title class="title-menu-sub title-menu">
                            Thêm mới nhân viên
                        </v-list-item-title>
                    </v-list-item>
                </v-list-group>
                <v-list-group>
                    <template v-slot:activator>
                        <v-list-item-icon><v-icon>mdi-calendar-check-outline</v-icon></v-list-item-icon>
                        <v-list-item-title>Quản lý khuyến mãi</v-list-item-title>
                    </template>
                    <v-list-item to="/manager-karaoke/promotion">
                        <v-list-item-icon></v-list-item-icon>
                        <v-list-item-content>
                            Danh sách khuyến mãi
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item to="/manager-karaoke/add-promotion">
                        <v-list-item-icon></v-list-item-icon>
                        <v-list-item-content>
                            Thêm mới khuyến mãi
                        </v-list-item-content>
                    </v-list-item>
                </v-list-group>
                <v-list-group>
                    <template v-slot:activator>
                        <v-list-item-icon>
                            <v-icon>mdi-book</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title class="title-menu">
                            Quản booking
                        </v-list-item-title>
                    </template>
                    <v-list-item to="/manager-karaoke/bookings">
                        <v-list-item-icon></v-list-item-icon>
                        <v-list-item-title>
                            Danh sách booking
                        </v-list-item-title>
                    </v-list-item>
                </v-list-group>
                <v-list-group>
                    <template v-slot:activator>
                       <v-list-item-icon><v-icon>mdi-settings-outline</v-icon></v-list-item-icon>
                       <v-list-item-title class="title-menu">Quản lý phân quyền</v-list-item-title>
                    </template>
                    <v-list-item link to="/manager-karaoke/setting"> 
                        <v-list-item-icon></v-list-item-icon>
                        <v-list-item-title class="title-menu-sub title-menu">
                            Dan sách quyền người dùng
                        </v-list-item-title>
                    </v-list-item>
                </v-list-group>
                <v-list-item link to="/manager-karaoke/historys">
                    <v-list-item-icon>
                        <v-icon>mdi-update</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>
                        Lịch sử
                    </v-list-item-title>
                </v-list-item>
            </v-navigation-drawer>
        </v-card> 
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: ["activeSidebar","user"],
    data()
    {
        return {
            stores: [],
            store: null
        }
    },
    computed: {
        ...mapGetters(["getAction"])
    },
    watch:{
        store(newVal){
            this.$store.state.ModuleManagerKaraoke.store = newVal
        },
    },
    methods: {
        ApiManagerStore()
        {
            this.$http.get(this.$store.state.API_URL + 'manager?api_token='+this.$session.get('token')).then((response) => {
                this.stores = response.data
                console.log(response.data)
               
            })
        },
       
    },
    created()
    {
        if(!this.user.UUID_USER)
        {
            this.$session.destroy()
            this.$router.push('/')
        }
        this.ApiManagerStore()
    }
}
</script>

<style scoped>
.title-menu {text-transform: uppercase;font-size: 14px;}
.title-menu-sub {text-transform: inherit}
.option-store {width: 100%;padding: 15px 0 15px 60px;outline: none}
.option-store>option {padding: 15px;}
</style>