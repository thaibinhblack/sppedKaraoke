<template>
    <div id="page-add-room" style="padding:15px;">
        <v-row>
            <v-col cols="12" sm="5">
                <span>THÊM PHÒNG MỚI</span>
            </v-col>
            <v-col cols="12" sm="7" class="group-link">
                <ul class="list-link">
                    <li><router-link to="/manager-karaoke/dashboard"><v-icon>mdi-view-dashboard</v-icon> Home</router-link></li>
                    <li><v-icon>mdi-chevron-right</v-icon></li>
                    <li><router-link :to="'/manager-karaoke/karaoke/'+$route.params.uuid">{{karaoke.NAME_BAR_kARAOKE}}</router-link></li>
                    <li><v-icon>mdi-chevron-right</v-icon></li>
                    <li>Thêm mới</li>
                </ul>
            </v-col>
            <v-col cols="12" sm="12">
                <v-form @submit.prevent="createRoom()">
                    <v-alert :type="message.type" v-if="message.text != null" :value="true">
                        {{message.text}}
                    </v-alert>
                    <v-card>
                        <v-card-title primary-title>
                            <v-row>
                                <v-col cols="12" sm="12">
                                    <span class="title-lable" style="font-size: 15px;">Form thêm phòng mới</span>
                                </v-col>
                            </v-row>
                            <v-card-text>
                                <v-row>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            name="NAME_BAR_ROOM"
                                            label="Tên phòng"
                                            placeholder="Nhập tên phòng"
                                            prepend-icon="mdi-rename-box"
                                            v-model="room.NAME_ROOM_BAR_KARAOKE"
                                            required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            name="RENT_COST"
                                            label="Gía thuê / giờ"
                                            placeholder="Nhập giá thuê"
                                            prepend-icon="mdi-cash"
                                            v-model="room.RENT_COST"
                                            required
                                        ></v-text-field>
                                    </v-col>
                                    
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            name="CAPACITY"
                                            label="Sức chứa tối đa"
                                            placeholder="Nhập sức chứa tối đa của phòng"
                                            prepend-icon="mdi-account-question-outline"
                                            v-model="room.CAPACITY"
                                            required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            name="STAR_RATING"
                                            label="Rating"
                                            disabled
                                            prepend-icon="mdi-star"
                                            v-model="room.STAR_RATING"
                                            required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            name="NUMBER_RATED"
                                            label="Số lượt đánh giá"
                                            disabled
                                            prepend-icon="mdi-thumb-up-outline"
                                            v-model="room.NUMBER_RATED"
                                            required
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="12">
                                        <label class="title-lable" style="font-weight:bold;margin-bottom:15px;">Nội dung</label>
                                        <vue-editor class="content" v-model="room.CONTENT"></vue-editor>
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-card-actions>
                                <v-row>
                                    <v-col cols="12" sm="12">
                                        <button v-if="room.create == false" class="btn-add" type="submit"><v-icon>mdi-plus</v-icon> Thêm mới</button>
                                        <button v-else class="btn-add" type="submit"><v-icon>mdi-update</v-icon> Cập nhật</button>
                                    </v-col>
                                </v-row>
                            </v-card-actions>
                        </v-card-title>
                    </v-card>
                </v-form>
                
            </v-col>
            <v-col class="12" sm="12">
                <v-card>
                    <v-card-title primary-title>
                        <v-row>
                            <v-col sm="12" cols="12">
                                <span class="title-lable" style="font-size: 15px"> Danh sách thuộc tính của phòng {{room.NAME_BAR_kARAOKE}}</span>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <button class="btm-add"><v-icon>mdi-plus</v-icon> Thêm mới</button>
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-card-text>
                        <v-data-table
                        :headers="headers"
                        :items="attributes">
                        <template v-slot:item.ACTION="{item}">
                            <v-icon>mdi-pencel</v-icon>
                            <v-icon>mdi-delete</v-icon>
                        </template>
                    </v-data-table>
                    </v-card-text>  
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import uuid from 'uuid'
import { VueEditor } from "vue2-editor";

export default {
    components: {
        VueEditor
    },
    data()
    {
        return {
            karaoke: {},
            room: {
                UUID_BAR_KARAOKE: this.$route.params.uuid,
                NUMBER_RATED: 0,
                STAR_RATING: 0,
                UER_CREATE: '',
                create: false
            },
            message: {
                type: null,
                text: null
            },
            headers: [
                {text: 'Tên thuộc tính', value: 'NAME_ATTRIBUTE', },
                {text: 'Nội dung thuộc tính', value: 'CONTENT_ATTRIBUTE'},
                {text: 'Người tạo', value: 'USER_CREATE'},
                {text: 'Ngày tạo', value: 'USER_CREATE'},
                {text: 'Tác vụ', value: 'ACTION'}
            ],
            attributes: []
        }
    },
    methods: {
        ApiGetNameKaraoke()
        {
            this.$http.get(this.$store.state.API_URL + 'karaoke/'+this.$route.params.uuid)
            .then((response) => {
                this.karaoke = response.data
                console.log(this.karaoke)
            })
        },
        createRoom()
        {
            this.room.UUID_ROOM_BAR_KARAOKE = uuid.v4()
            if(this.$session.has("user"))
            {
                this.room.USER_CREATE = this.$$ession.get("user").EMAIL
            }
            else
            {
                this.room.USER_CREATE = this.$$ession.get("user_social").email
            }
            this.$http.post(this.$store.state.API_URL + 'room',this.room)
            .then(() => {
                this.message.type = 'success'
                this.message.text = 'Thêm phòng mới thành công'
                this.room.create = true
            }).catch(() => {
                this.message.type = 'error'
                this.message.text = 'Lôi! xin vui lòng thử lại!'
            })
        }
    },
    created()
    {
        this.ApiGetNameKaraoke()

    }
}
</script>

<style scoped>
.editor {background: #e2e2e2;padding: 15px;}
.content {margin-top: 15px;}
</style>