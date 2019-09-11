<template>
    <div id="page-setting-rule" style="padding:15px;">
        <v-row>
            <v-col cols="12" sm="12">
                <span class="label-title">PHÂN QUYỀN CHO HỆ THỐNG</span>
            </v-col>
            <v-col cols="12" sm="4" md="3">
                <v-card>
                    <v-card-title primary-title>
                        <span class="title-label">Danh sách quyền</span>
                    </v-card-title>
                    <v-card-text>
                        <v-list>
                            <v-list-item link>
                                <v-list-item-action>
                                    <v-checkbox v-model="checkRule" value="quantri-2019"></v-checkbox>
                                </v-list-item-action>
                                <v-list-item-title>
                                    Quản trị
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item link>
                                <v-list-item-action>
                                    <v-checkbox  v-model="checkRule" value="quanly-2019"></v-checkbox>
                                </v-list-item-action>
                                <v-list-item-title>
                                    Quản lý
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="12" sm="8" md="9">
                <v-card>
                    <v-card-title primary-title>
                        <span class="title-label">Danh sách chức năng hệ thống</span>
                    </v-card-title>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" sm="4">Tên nhóm chức năng</v-col>
                            <v-col cols="12" sm="2">Thêm</v-col>
                            <v-col cols="12" sm="2">Sửa</v-col>
                            <v-col cols="12" sm="2">Xóa</v-col>
                            <v-col cols="12" sm="2">Tất cả</v-col>
                            <v-col cols="12" sm="4" >
                                <v-list-item>
                                    <v-list-item-title>
                                        Quản lý chi nhánh
                                    </v-list-item-title>
                                </v-list-item>
                            </v-col>
                            <v-col cols="12" sm="2">
                                <v-checkbox></v-checkbox>
                            </v-col>
                            <v-col cols="12" sm="2">
                                <v-checkbox></v-checkbox>
                            </v-col>
                            <v-col cols="12" sm="2">
                                <v-checkbox></v-checkbox>
                            </v-col>
                            <v-col cols="12" sm="2">
                                <v-checkbox></v-checkbox>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    data()
    {
        return {
            checkRule: null
        }
    }
}
</script>