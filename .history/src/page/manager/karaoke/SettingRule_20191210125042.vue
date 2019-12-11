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
                                <li><input v-model="function_check[index]" :disabled="fc.UUID_FUNCTION == 1" type="checkbox" :value="fc.UUID_FUNCTION + '.2'" /></li>
                                <li><input v-model="function_check[index]" type="checkbox" :value="fc.UUID_FUNCTION + '.3'" /></li>
                                <li><input v-model="function_check[index]"  :disabled="fc.UUID_FUNCTION == 1 ||fc.UUID_FUNCTION == 2 || fc.UUID_FUNCTION == 4 "  type="checkbox" :value="fc.UUID_FUNCTION + '.4'" /></li>
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
            function_check: [],
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
        checkRule(newVal)
        {
            this.api_rule_function(newVal)
        }
    },
    methods: {
        getGroupFunction()
        {
            this.$http.get(this.$store.state.API_URL + 'function?api_token='+this.$cookies.get('token')).then((response) => {
                this.functions = response.data
                response.data.forEach((element) => {
                    this.function_check.push([])
                })
            })
        },
        ApiGetRule()
        {
            this.$http.get(this.$store.state.API_URL + 'rule?api_token='+this.$cookies.get('token')).then((response) => {
                this.rules = response.data
            })
        },
        createRule()
        {
            const data = new FormData()
            data.append("NAME_RULE",this.rule.NAME_RULE)
            this.$http.post(this.$store.state.API_URL + 'rule?api_token='+this.$cookies.get('token'),data).then((response) => {
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
        api_rule_function(id)
        {
            this.axios.get(this.$store.state.API_URL + 'function_rule/'+id+'?api_token='+this.$cookies.get('token')).then((response) => {
                console.log(response.data)
                // this.function_rule = response.data
                const check_rule = []
                var object =[]
                console.log('length',this.functions.length)
                if(this.functions.length > 0)
                {
                    for (let index = 0; index < this.functions.length; index++) {
                        check_rule.push([]) 
                    }
                    for (let index = 0; index < response.data.length; index++) {
                        console.log('result',response.data.results)
                        object.push(response.data[index].FUNCTION_VIEW)
                        object.push(response.data[index].FUNCTION_CREATE)
                        object.push(response.data[index].FUNCTION_EDIT)
                        object.push(response.data[index].FUNCTION_DELETE)
                        // object.push(response.data[index].cn_xuat_file)
                        console.log('lenght',response.data[index].FUNCTION_VIEW -1 )
                        check_rule[response.data[index].UUID_FUNCTION -1 ] = object
                        console.log(object)
                        object= []
                        
                    }
                    this.function_check  = check_rule   
                }
                else
                {
                    this.function_check.push([])
                }
            })
        },
        UpdateFunction()
        {
            if(this.checkRule == null)
            {
                alert('Bạn chưa chọn quyền để cập nhật')
            }
            else
            {
                 this.function_check.forEach((check) => {
            
                    if(check.length >= 1)
                    {
                        console.log(check)
                        const id_function = check[0].slice(0,1)
                        const value_function = []
                        const function_view = null
                        check.sort()
                        const functions = []
                        const data = new FormData()
                        data.append("UUID_RULE",this.checkRule)
                        data.append("UUID_FUNCTION", id_function)
                        data.append("FUNCTIONS",check)
                        const app = this;
                        this.axios.post(this.$store.state.API_URL + 'function_rule?api_token='+this.$cookies.get('token'), data).then((response) => {
                           console.log(response.data)
                           
                        }).catch(() => {
                            
                        })
                    }
                    
                })
                alert('Cập nhật thành công')
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