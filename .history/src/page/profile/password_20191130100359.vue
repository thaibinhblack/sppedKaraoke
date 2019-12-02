<template>
<v-col cols="12" sm="7" md="8">
    <v-alert :type="message.type" v-if="message.text != null" :value="true">
        {{message.text}}
    </v-alert>
     <label for="PASSWORD_NEW">Mật khẩu mới</label>
    <v-text-field
        name="PASSWORD_NEW"
        label="Mật khẩu mới"
        v-model="user.confirm_password"
        required
    ></v-text-field>
     <label for="PASSWORD_COFIRM">Nhập lại mật khẩu</label>
    <v-text-field
        name="PASSWORD_COFIRM"
        label="Nhập lại mật khẩu"
        v-model="user.confirm_password"
        required
    ></v-text-field>

    <button class="btn btn-add">Cập nhật</button>
</v-col>
</template>

<script>
export default {
    data()
    {
        return {
            user: {},
            message :{
                type: null,
                text: null
            }
        }
    },
    methods: {
        update_password()
        {
            const password = new FormData();
            const app = this;
            if(this.password.new_password == this.password.confirm_password)
            {
                password.append("new_password",this.password.new_password)
                this.axios.post(this.$store.state.API_URL + 'change_password?api_token='+this.$cookies.get('token'),password).then((response) => {
                    alert('Cập nhật mật khẩu thành công')
                }).catch(() => {
                    alert('Cập nhật mật khẩu thất bại!')
                })
               
            }
            else
            {
                app.$f7.dialog.alert('Mật khẩu xác thực không đúng!')
            }
        }
    },
}
</script>