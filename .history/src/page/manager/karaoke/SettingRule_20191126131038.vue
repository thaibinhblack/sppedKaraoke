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
                                    <v-checkbox v-model="checkRule" :value="rule.UUID_RULE"></v-checkbox>
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
                          <ul class="list-function">
                                <li>Danh sách chức năng</li>
                               <li>Xem</li>
                               <li>Thêm</li>
                               <li>Sửa</li>
                               <li>Xóa</li>
                            </ul>
                        </v-row>
                        <v-row style="margin-top: 15px;">
                            <ul class="list-function" v-for="(fc,index) in functions" :key="index">
                                <li>{{fc.NAME_FUNCTION}}</li>
                                <li><input v-model="function_check[index]" type="checkbox" :value="fc.UUID_FUNCTION + '.1'" /></li>
                                <li><input v-model="function_check[index]" type="checkbox" :value="fc.UUID_FUNCTION + '.2'" /></li>
                                <li><input v-model="function_check[index]" type="checkbox" :value="fc.UUID_FUNCTION + '.3'" /></li>
                                <li><input v-model="function_check[index]" type="checkbox" :value="fc.UUID_FUNCTION + '.4'" /></li>
                            </ul>
                        </v-row>
                        <v-row>
                           <v-col cols="12" sm="12">
                                <button @click="UpdateFunction()" class="btn-add" type="button"><v-icon>mdi-update</v-icon> Cập nhật</button>
                                
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
    components: {
        'item-rule-karaoke': () => import('@/components/manager/karaoke/ItemRuleKaraoke.vue')
    },
    data()
    {
        return {
            checkRule: null,
            functions: [],
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
    watch: {
        checkRule()
        {
            
        }
    },
    methods: {
        getGroupFunction()
        {
            this.$http.get(this.$store.state.API_URL + 'function?api_token='+this.$session.get('token')).then((response) => {
                this.functions = response.data
            })
        },
        ApiGetRule()
        {
            this.$http.get(this.$store.state.API_URL + 'rule?api_token='+this.$session.get('token')).then((response) => {
                this.rules = response.data
            })
        },
        createRule()
        {
            const data = new FormData()
            data.append("NAME_RULE",this.rule.NAME_RULE)
            this.$http.post(this.$store.state.API_URL + 'rule?api_token='+this.$session.get('token'),data).then((response) => {
                this.ApiGetRule()
                // console.log(response.data)
                this.rule.success = true
                this.rule.message_success = 'Thêm quyền mới thành công!'
                this.rule.message_error = ''
            }).catch((error) => {
                // console.log(error)
                this.rule.success = false
                this.rule.message_success = ''
                this.rule.error = true
                this.rule.message_error = 'Lỗi! Xin vui lòng thử lại'
            })
        },
        UpdateFunction()
        {
            if(this.checkRule == null)
            {
                alert('Bạn chưa chọn quyền để cập nhật')
            }
        }
    },
    created()
    {
        this.getGroupFunction()
        this.ApiGetRule()
    }
}
</script>

<style scoped>
.list-function {width: 100%;}
.list-function li {list-style: none;display: inline-block;text-align: center;width: 20%;}
</style>