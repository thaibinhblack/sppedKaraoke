<template>
    <v-col class="12" sm="12">
                <v-card>
                    <v-card-title primary-title>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <span style="font-size: 15px;" class="title-label">DANH SÁCH PHÒNG CỦA CHI NHÁNH {{NAME_BAR_KARAOKE}}</span>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <button class="btn-add"><router-link :to="'/manager-karaoke/karaoke/'+$route.params.uuid+'/add-room'"><v-icon>mdi-plus</v-icon> Thêm phòng mới</router-link></button>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-card-text>
                        <v-data-table
                            :headers="headers"
                            :items="room"
                        >
                            <template v-slot:item.ACTION="{item}">
                                <router-link :to="'/manager-karaoke/karaoke/'+$route.params+uuid+'/room/'+item.UUID_ROOM_BAR_KARAOKE"><v-icon>mdi-chevron-right</v-icon></router-link>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
</template>

<script>

import uuid from 'uuid'
export default {
    props: ["NAME_BAR_KARAOKE"],
    data()
    {
        return{
            headers: [
                {text: 'Tên phòng', value: 'NAME_ROOM_BAR_KARAOKE', align: 'center'},
                {text: 'Gía thuê / giờ', value: 'RENT_COST'},
                {text: 'Sức chứa', value: 'CAPACITY', align: 'center'},
                {text: 'Người tạo', value: 'USER_CREATE'},
                {text: 'Rating', value: 'STAR_RATING', align: 'center'},
                {text: 'SL rating', value: 'NUMBER_RATED'},
                {text: 'Ngày tạo', value: 'CREATED_AT', align: 'center'},
                {text: '', value: 'ACTION'},
            ],
            room: []
        }
    },
    methods:{
         ApiGetRoom()
        {
            this.$http.get(this.$store.state.API_URL +'room?UUID_BAR_KARAOKE='+this.$route.params.uuid).then((response) => {
                this.room = response.data
            })
        }
    },
    created()
    {
        this.ApiGetRoom()
    }
}
</script>