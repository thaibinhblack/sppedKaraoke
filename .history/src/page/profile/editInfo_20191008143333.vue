<template>
    <v-row>
        <v-col cols="12" sm="7" md="6" >
            <v-list-item two-line>
                <v-list-item-avatar>
                    <v-avatar
                        size="70px"
                        color="#e2e2e2"
                    >
                        <img v-if="LOGO != null" :src="LOGO" alt="">
                        <img v-else-if="user.AVATAR != null" :src="$store.state.PUBLIC_URL + user.AVATAR" alt="alt">
                    </v-avatar>
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>
                        <h3>{{user.EMAIL}} - Thông tin tài khoản</h3>
                    </v-list-item-title>
                    <v-list-item-subtitle style="margin-top:7px;">
                        <small>Cá nhân hóa tài khoản bằng việc cập nhật thông tin của bạn</small>
                    </v-list-item-subtitle>
                </v-list-item-content>
            </v-list-item>
        </v-col>
        <v-col cols="12" sm="5" md="6" style="text-align:right">
            <button class="btn btn-manager">Trở thành chủ nhà</button>
        </v-col>
        <v-col cols="12" sm="5" md="4">
            <v-list class="list-edit-account">
                <v-list-item to="/profile/edit-account/info-account">
                    <v-list-item-title>
                        Thông tin tài khoản
                    </v-list-item-title>
                </v-list-item>
                <v-list-item to="/profile/edit-account/password">
                    <v-list-item-title>
                        Thay đổi mật khẩu
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-col>
        <v-col cols="12" sm="7" md="8">
            <v-form @submit.prevent="updateUser()">
                <v-alert :type="message.type" v-if="message.text != null" :value="true">
                    {{message.text}}
                </v-alert>
                <v-list-item two-line style="margin-bottom:25px;">
                        <v-list-item-avatar>
                            <v-avatar
                            size="80"
                            color="#e2e2e2"
                            >
                                <img v-if="LOGO != null" :src="LOGO" alt="">
                                <img v-else-if="user.AVATAR != null" :src="$store.state.PUBLIC_URL + user.AVATAR" alt="alt">    
                            </v-avatar>
                        </v-list-item-avatar>
                    <v-list-item-content>
                        <v-list-item-title>
                            <button class="btn btn-avatar"> Đổi ảnh đại diện</button>
                            <input type="file" ref="myAvatar" class="myAvatar" @change="renderLogo()">
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <label for="EMAIL">Email</label>
                <v-text-field

                    name="EMAIL"
                    label="EMAIL"
                    prepend-icon="mdi-email"
                    v-model="user.EMAIL"
                    disabled
                ></v-text-field>
                <label for="NAME">Họ & Tên</label>
                <v-text-field
                    name="NAME"
                    label="Họ & Tên"
                    prepend-icon="mdi-account"
                    required
                    v-model="user.DISPLAY_NAME"
                ></v-text-field>
                <label for="PHONE">Số điện thoại</label>
                <v-text-field
                    name="PHONE"
                    label="Họ & Tên"
                    prepend-icon="mdi-phone"
                    required
                    v-model="user.PHONE"
                ></v-text-field>
                <label for="ADDRESS">Địa chỉ</label>
                <v-text-field
                    name="ADDRESS"
                    label="Địa chỉ"
                    prepend-icon="mdi-map-marker"
                    required
                    v-model="user.ADDRESS"
                    required
                ></v-text-field>
                <v-menu
                    ref="menu1"
                    v-model="menu1"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px">
                    <template v-slot:activator="{ on }">
                        <v-text-field
                        v-model="dateFormatted"
                        label="Ngày sinh"
                        hint="MM/DD/YYYY format"
                        persistent-hint
                        prepend-icon="mdi-calendar-range"
                        @blur="date = parseDate(dateFormatted)"
                        required
                        v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
                </v-menu>
                <button type="submit" class="btn btn-add" style="margin-top: 15px;">Cập nhật</button>
            </v-form>
        </v-col>
    </v-row>
</template>

<script>
export default {
    data()
    {
        return {
            user: null,
            date: new Date().toISOString().substr(0, 10),
            dateFormatted: this.formatDate(new Date().toISOString().substr(0, 10)),
            menu1: false,
            LOGO: null,
            message: {
                type: null,
                text: null
            }
        }
    }
}
</script>