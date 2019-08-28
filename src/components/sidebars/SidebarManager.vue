<template>
    <v-card class="siebar-manager-karaoke" :class="{active: activeSidebar}">
            <v-navigation-drawer permanent width="100%"> 
                <v-list-item two-line="">
                    <v-list-item-avatar>
                        <v-img :src="$session.get('user_facebook').photoURL"></v-img>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title class="title">
                            <span style="font-size:14px;">
                                {{$session.get('user_facebook').displayName}}
                            </span>
                            
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            <small>{{$session.get('user_facebook').email}}</small>
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
                    <v-list-item link>
                        <v-list-item-icon></v-list-item-icon>
                        <v-list-item-title class="title-menu-sub title-menu">
                            Danh sách phòng
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item link>
                        <v-list-item-icon></v-list-item-icon>
                        <v-list-item-title class="title-menu-sub title-menu">
                            Thêm phòng
                        </v-list-item-title>
                    </v-list-item>
                     <v-list-item link>
                        <v-list-item-icon></v-list-item-icon>
                        <v-list-item-title class="title-menu-sub title-menu">
                            Thống kê
                        </v-list-item-title>
                    </v-list-item>
                </v-list-group>
                <v-list-group>
                    <template v-slot:activator>
                        <v-list-item-icon>
                            <v-icon>mdi-account</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title class="title-menu">
                            Quản lý khách hàng
                        </v-list-item-title>
                    </template>
                </v-list-group>
            </v-navigation-drawer>
        </v-card> 
</template>

<script>
export default {
    props: ["activeSidebar"]
}
</script>

<style scoped>
.title-menu {text-transform: uppercase;font-size: 14px;}
.title-menu-sub {text-transform: capitalize}
</style>