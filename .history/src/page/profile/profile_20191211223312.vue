<template>
<v-container grid-list-xs>
        <v-row>
            <v-col cols="12" sm="7" md="6" >
                <v-list-item two-line>
                    <v-list-item-avatar>
                        <v-avatar
                            size="70px"
                            color="#e2e2e2"
                        >
                            <img v-if="getUser.AVATAR != null" :src="$store.state.PUBLIC_URL + getUser.AVATAR" alt="alt">
                        </v-avatar>
                    </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>
                            <h3>{{getUser.EMAIL}} - Thông tin tài khoản</h3>
                        </v-list-item-title>
                        <v-list-item-subtitle style="margin-top:7px;">
                            <small>Cá nhân hóa tài khoản bằng việc cập nhật thông tin của bạn</small>
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </v-col>
            <v-col cols="12" sm="5" md="6" style="text-align:right">
                <button @click="ManagerKaraoke()" v-if="getUser.UUID_RULE == 'user-2019'" class="btn btn-manager">Trở thành chủ nhà</button>
            </v-col>
            <v-col cols="12" sm="5" md="4">
                <v-list class="list-edit-account">
                    <v-list-item to="/profile/edit-account/info">
                        <v-list-item-title>
                            Thông tin tài khoản
                        </v-list-item-title>
                    </v-list-item>
                    <!-- <v-list-item to="/profile/edit-account/payaccount">
                        <v-list-item-title>
                            Nạp tiền vào ví
                        </v-list-item-title>
                    </v-list-item> -->
                    <v-list-item to="/profile/edit-account/password">
                        <v-list-item-title>
                            Thay đổi mật khẩu
                        </v-list-item-title>
                    </v-list-item>
                     <v-list-item   @click="logout()">
                        <v-list-item-title>
                            Đăng xuất
                        </v-list-item-title>
                    </v-list-item>
                        
                </v-list>
            </v-col>
                <router-view></router-view>
        </v-row>
</v-container>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    computed: {
        ...mapGetters(["getUser"])
    },
    methods: {
        ManagerKaraoke()
        {
            this.$http.get(this.$store.state.API_URL + 'user/'+this.getUser.UUID_USER+'/manager-karaoke?api_token='+this.$session.get('token'))
            .then((response) => {
                this.$store.state.manager = true
            })
        },
        logout()
        {
            this.$cookies.remove('token')
            this.$router.push('/login')
        }
    }
}
</script>