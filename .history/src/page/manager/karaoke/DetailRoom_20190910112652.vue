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
                    <!-- <li><router-link :to="'/manager-karaoke/karaoke/'+$route.params.uuid">{{$store.ModuleManagerKaraoke.state.BarKaraoke.NAME_BAR_KARAOKE}}</router-link></li>
                    <li><v-icon>mdi-chevron-right</v-icon></li> -->
                    <li>Thêm mới</li>
                </ul>
            </v-col>
            <v-col cols="12" sm="12">
                <v-form @submit.prevent="updateRoom()">
                    <v-alert :type="message.type" v-if="message.text != null" :value="true">
                        {{message.text}}
                    </v-alert>
                    <v-card>
                        <v-card-title primary-title>
                            <v-row>
                                <v-col cols="12" sm="12">
                                    <span class="title-lable" style="font-size: 15px;">Form thông tin chi tiết phòng <strong>{{room.NAME_BAR_ROOM}}</strong> </span>
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
                                        <button v-if="create == false" class="btn-add" type="submit"><v-icon>mdi-plus</v-icon> Thêm mới</button>
                                        <button v-else class="btn-add" type="submit"><v-icon>mdi-update</v-icon> Cập nhật</button>
                                    </v-col>
                                </v-row>
                            </v-card-actions>
                        </v-card-title>
                    </v-card>
                </v-form>
                
            </v-col>
            <attribute-room v-if="create == true" :room="room" />
           
        </v-row>
    </div>
</template>

<script>
import uuid from 'uuid'
import { VueEditor } from "vue2-editor";

export default {
    components: {
        VueEditor,
        'attribute-room': () => import('@/components/manager/karaoke/AttributeRoom.vue')
    },
    data()
    {
        return {
            karaoke: {},
            room: {
                UUID_BAR_KARAOKE: this.$route.params.uuid,
                NUMBER_RATED: 0,
                STAR_RATING: 0,
                USER_CREATE: '',
               
            },
            message: {
                type: null,
                text: null
            },
            create: false
           
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
        updateRoom()
        {
             this.$http.put(this.$store.state.API_URL + 'room/'+this.room.UUID_ROOM_BAR_KARAOKE,this.room).then(() => {
                    this.message.type = 'success'
                    this.message.text = 'Cập nhật hành công'
                })
                .catch(() => {
                    this.message.type = 'error'
                    this.message.text = 'Lôi! xin vui lòng thử lại!'
                })
        
        },
        ApiGetRoom(){
            this.$http.get(this.$store.state.API_URL + 'room/'+this.$route.params.uuid_room).then((response) => {
                this.room = response.data
            })
        }
    },
    created()
    {
        this.ApiGetNameKaraoke()
        this.ApiGetRoom()
    }
}
</script>

<style scoped>
.editor {background: #e2e2e2;padding: 15px;}
.content {margin-top: 15px;}
</style>