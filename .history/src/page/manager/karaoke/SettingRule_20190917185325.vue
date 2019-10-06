<template>
    <div id="page-setting-rule" style="padding:15px;">
        <v-row>
            <v-col cols="12" sm="12">
                <span class="label-title">PHÂN QUYỀN CHO HỆ THỐNG</span>
            </v-col>
            <v-col cols="12" sm="4" md="3">
                <v-card>
                    <v-card-title primary-title>
                        <v-row>
                            <v-col cols="12" sm="7">
                                <span class="title-label">Quyền</span>
                            </v-col>
                            <v-col cols="12" sm="5" style="text-align:right">
                                <button><v-icon>mdi-plus</v-icon></button>
                            </v-col>
                        </v-row>
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
                        </v-row>
                        <item-rule-karaoke v-for="(group, index) in groups" :key="index" :group="group" />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    components: {
        'item-rule-karaoke': () => import('@/components/manager/karaoke/ItemRuleKaraoke.vue')
    },
    data()
    {
        return {
            checkRule: null,
            groups: [],
            rules: []
        }
    },
    methods: {
        getGroupFunction()
        {
            this.$http.get(this.$store.state.API_URL + 'group').then((response) => {
                this.groups = response.data
            })
        },
        ApiGetRule()
        {
            this.$http.get(this.$store.staete.API_URL + 'rule?user_create='+this.$session.get('user').EMAIL).then((response) => {
                this.rules = response.data
            })
        },
        createRule()
        {
            const data = new FormData()
            data.append("NAME_RULE",this.rule.NAME_RULE)
            data.append("USER_CREATE",this.$session.get('usser').EMAIL)
            this.$http.post(this.$store.state.API_URL + 'rule',data).then(() => {

            })
        }
    },
    created()
    {
        this.getGroupFunction()
    }
}
</script>