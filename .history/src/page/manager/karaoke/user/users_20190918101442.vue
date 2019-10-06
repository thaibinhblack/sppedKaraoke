<template>
    <div id="page-karaoke" style="padding:15px;">
        <v-row>
            <v-col cols="12" sm="12">
                DANH SÁCH CHI NHÂN VIÊN
            </v-col>
            <v-col cols="12" sm="12">
                <v-card>
                    <v-card-title primary-title>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <span style="font-size: 15px;" class="title-card"> Danh sách nhân viên</span>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <button class="btn-add"> <router-link to='/manager-karaoke/add-user'><v-icon>mdi-plus</v-icon> Thêm chi nhân viên</router-link></button>
                            </v-col>
                        </v-row>
                        
                    </v-card-title>
                    <v-card-text>
                        <v-data-table
                            :headers="headers"
                            :items="users"
                        >
                            <template v-slot:item.LOGO_BAR_KARAOKE ="{item}">
                               <v-avatar
                                   size="70"
                                   color="#e2e2e2"
                               >
                                   <img v-if="item.LOGO_BAR_KARAOKE != null" :src="$store.state.PUBLIC_URL + item.LOGO_BAR_KARAOKE" alt="alt">
                               </v-avatar>
                            </template>
                            <template v-slot:item.ACTION ="{item}">
                               <router-link :to="'/manager-karaoke/user/'+item.UUID_BAR_KARAOKE"><v-icon>mdi-chevron-right</v-icon> </router-link>
                            </template>
                        </v-data-table>
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
            headers: [
                {text: 'Tên người quản lý', value: 'DISPLAY_NAME'},
                {text: 'Email', value: 'EMAIL'},
                {text: 'SĐT', value: 'PHONE'},
                {text: 'Giới tính', value: 'GENDER', sortable: false},
                {text: 'Tác vụ', value: 'ACTION', sortable: false}
            ],
            users : []
        }
    },
    methods: {
        ApiGetUser()
        {
            this.$http.get(this.$store.state.API_URL + 'karaoke?api_token='+this.$session.get('token')).then((response) => {
                    this.users = response.data
            })
           
        }
    },
    created()
    {
        this.ApiGetUser()
    }
}
</script>