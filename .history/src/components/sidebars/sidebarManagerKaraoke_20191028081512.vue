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
                            <!-- <img v-if="getUser.AVATAR != null" :src="$store.state.PUBLIC_URL + getUser.AVATAR" alt="alt"> -->
                        </v-avatar>
                    </router-link>
                </v-list-item-avatar>
                    <v-list-item-content>
                    <v-list-item-title class="title">
                        <router-link to="/profile">
                            <span style="font-size:14px;">
                                {{getUser.DISPLAY_NAME }}
                            </span>
                        </router-link>
                        
                    </v-list-item-title>
                    <v-list-item-subtitle>
                        <small>{{getUser.EMAIL}}</small>
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item link to="dashboard">
                    <v-list-item-icon>
                        <v-icon>mdi-view-dashboard</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title class="title-menu">
                        Dashboard
                    </v-list-item-title>
            </v-list-item>
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
                <v-list-item link to="/manager-karaoke/getUsers">
                    <v-list-item-icon></v-list-item-icon>
                    <v-list-item-title class="title-menu-sub title-menu">
                        Danh sách nhân viên
                    </v-list-item-title>
                </v-list-item>
                <v-list-item link to="/manager-karaoke/add-getUser">
                    <v-list-item-icon></v-list-item-icon>
                    <v-list-item-title class="title-menu-sub title-menu">
                        Thêm mới nhân viên
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
import {mapGetters} from 'vuex'
export default {
    props: ["activeSidebar"],
    computed: {
        ...mapGetters(["getUser"])
    },
}
</script>