<template>
<v-col cols="12" sm="7" md="8">
    <label for="PASSWORD">Mật khẩu hiện tại</label>
    <v-text-field
        name="PASSWORD"
        label="Mật khẩu hiện tại"
        v-model="user.PASSWORD"
        required
    ></v-text-field>
     <label for="PASSWORD_NEW">Mật khẩu mới</label>
    <v-text-field
        name="PASSWORD_NEW"
        label="Mật khẩu mới"
        v-model="user.PASSWORD_NEW"
        required
    ></v-text-field>
     <label for="PASSWORD_COFIRM">Nhập lại mật khẩu</label>
    <v-text-field
        name="PASSWORD_COFIRM"
        label="Nhập lại mật khẩu"
        v-model="user.PASSWORD_COFIRM"
        required
    ></v-text-field>

    <button class="btn btn-add">Cập nhật</button>
</v-col>
</template>