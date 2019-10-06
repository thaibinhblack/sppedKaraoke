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
                                <button @click="create = !create"><v-icon>mdi-plus</v-icon></button>
                            </v-col>
                            <v-col cols="12" sm="12" v-if="create == true">
                                <v-text-field
                                    name="NAME_RULE"
                                    label="Tên quyền"
                                    prepend-icon="mdi-key"
                                    append-icon="mdi-check"
                                    :error="rule.error"
                                    :error-messages="rule.message_error"
                                    :success="rule.success"
                                    :success-messages="rule.message_success"
                                    v-model="rule.NAME_RULE"
                                    @click:append="createRule()"
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-card-text>
                        <v-list>
                            <v-list-item link v-for="(rule,index) in rules" :key="index">
                                <v-list-item-action>
                                    <v-checkbox v-model="checkRule" value="quantri-2019"></v-checkbox>
                                </v-list-item-action>
                                <v-list-item-title>
                                   {{rule.NAME_RULE}}
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
            rules: [],
            create: false,
            rule: {
                error: false,
                success: false,
                message_error: '',
                message_success: ''
            }
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
            this.$http.get(this.$store.state.API_URL + 'rule?user_create='+this.$session.get('user').EMAIL).then((response) => {
                this.rules = response.data
            })
        },
        createRule()
        {
            const data = new FormData()
            data.append("NAME_RULE",this.rule.NAME_RULE)
            data.append("USER_CREATE",this.$session.get('user').EMAIL)
            this.$http.post(this.$store.state.API_URL + 'rule',data).then(() => {
                this.ApiGetRule()
                this.rules = response.data
                this.rule.success = true
                this.rule.message_success = 'Thêm quyề mới thành công!'
                this.rule.error = false
                this.rule.message_error = ''
            }).catch((error) => {
                console.log(error)
                this.rule.success = false
                this.rule.message_success = ''
                this.rule.error = true
                this.rule.message_error = 'Lỗi! Xin vui lòng thử lại'
            })
        }
    },
    created()
    {
        this.getGroupFunction()
        this.ApiGetRule()
    }
}
</script>