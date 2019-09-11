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
                                        <editor
                                            class="editor"
                                            autofocus
                                            holder-id="codex-editor"
                                            save-button-id="save-button"
                                           
                                        />
                                    </v-col>
                                </v-row>
                            </v-card-text>
                            <v-card-actions>
                                <v-row>
                                    <v-col cols="12" sm="12">
                                        <button class="btn-add" type="submit"><v-icon>mdi-plus</v-icon> Thêm mới</button>
                                    </v-col>
                                </v-row>
                            </v-card-actions>
                        </v-card-title>
                    </v-card>
                </v-form>
                
            </v-col>
        </v-row>
    </div>
</template>

<script>
import uuid from 'uuid'
import { Editor } from 'vue-editor-js'

export default {
    components: {
        Editor,
    },
    data()
    {
        return {
            karaoke: {},
            room: {
                NUMBER_RATED: 0,
                STAR_RATING: 0,
                UER_CREATE: ''
            }
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
</style>