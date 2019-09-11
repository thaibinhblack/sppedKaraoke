<template>
    <v-col class="12" sm="12">
                <v-card>
                    <v-card-title primary-title>
                        <v-row>
                            <v-col sm="12" cols="12">
                                <span class="title-lable" style="font-size: 15px"> Danh sách thuộc tính của phòng <strong>{{room.NAME_ROOM_BAR_KARAOKE}}</strong></span>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <button class="btn-add title-label" @click="btnCreate()" ><v-icon>mdi-plus</v-icon> Thêm mới</button>
                                
                            </v-col>
                        </v-row>
                    </v-card-title>
                    <v-card-text>
                        <v-data-table
                        :headers="headers"
                        :items="attributes">
                        <template v-slot:item.ACTION="{item}">
                            <button class="btn-action" @click="btnUpdate(item)"><v-icon>mdi-pencil</v-icon></button>
                            <button class="btn-action" @click="deleteAttribute(item.UUID_ROOM_BAR_KARAOKE)"><v-icon>mdi-delete</v-icon></button>
                        </template>
                    </v-data-table>
                    </v-card-text>  
                </v-card>
                 <v-row v-if="show == true">
                    <v-col cols="12" sm="6" md="4" style="margin:auto">
                        <v-form @submit.prevent="createAttribute()">               
                            <v-alert :type="message.type" v-if="message.text != null" :value="true">
                                {{message.text}}
                            </v-alert>
                            <v-card style="padding: 15px;border-radius: 10px;">
                                <v-card-text>
                                    <v-text-field
                                        name="NAME_ATTRIBUTE"
                                        label="Tên thuộc tính"
                                        prepend-icon="mdi-rename-box"
                                        :counter="20"
                                        v-model="attribute.NAME_ATTRIBUTE"
                                        required
                                    ></v-text-field>
                                    <v-text-field
                                        name="CONTENT_ATTRIBUTE"
                                        label="Nội dung thuộc tính"
                                        prepend-icon="mdi-rename-box"
                                        type="textare"
                                        v-model="attribute.CONTENT_ATTRIBUTE"
                                        required
                                    ></v-text-field>
                                </v-card-text>
                                <v-card-actions>
                                    <button v-if="update == false" type="submit" class="btn-add"> <v-icon>mdi-plus</v-icon> Thêm mới</button>
                                    <button class="btn-add" v-else type="submit"><v-icon>mdi-update</v-icon> Cập nhật</button>
                                </v-card-actions>
                            </v-card>
                        </v-form>
                    </v-col>
                </v-row>
            </v-col>
</template>

<script>
import uuid from 'uuid'
export default {
    props: ["room"],
    data()
    {
        return {
             headers: [
                {text: 'Tên thuộc tính', value: 'NAME_ATTRIBUTE', },
                {text: 'Nội dung thuộc tính', value: 'CONTENT_ATTRIBUTE'},
                {text: 'Người tạo', value: 'USER_CREATE'},
                {text: 'Ngày tạo', value: 'CREATED_AT'},
                {text: 'Tác vụ', value: 'ACTION'}
            ],
            attribute: {
               
            },
            attributes: [],
            message: {
                text: null,
                type: null
            },
            show: false,
            update: false
        }
    },
    methods: {
        ApiGetAttributeRoom(){
            this.$http.get(this.$store.state.API_URL + 'attribute-room?UUID_ROOM_BAR_KARAOKE='+this.$route.params.uuid_room)
            .then((response) => {
                this.attributes = response.data
            }).catch(() => {
                
            })
        },
        createAttribute()
        {
            if(this.update == false)
            {
                this.attribute.UUID_ATTRIBUTE_ROOM = uuid.v4()
                this.attribute.UUID_ROOM_BAR_KARAOKE = this.room.UUID_ROOM_BAR_KARAOKE
                if(this.$session.has("user"))
                {   
                    this.attribute.USER_CREATE = this.$session.get("user").EMAIL
                }
                else
                {
                    this.attribute.USER_CREATE = this.$session.get("user_social").email
                }
                this.$http.post(this.$store.state.API_URL + 'attribute-room',this.attribute).then(() => {
                    this.message.type = 'success'
                    this.message.text = 'Thêm thuộc tính mói thành công!'
                    this.attribute = {}
                    this.attribute.UUID_ROOM_BAR_KARAOKE = this.room.UUID_ROOM_BAR_KARAOKE
                    this.ApiGetAttributeRoom()
                }).catch(() => {
                    this.message.type = 'error'
                    this.message.text = 'Lôi! Xin lui lòng thử lại!'
                })
            }
            else
            {
                // console.log(this.attribute)
                const data = {
                    NAME_ATTRIBUTE: this.attribute.NAME_ATTRIBUTE,
                    CONTENT_ATTRIBUTE: this.attribute.CONTENT_ATTRIBUTE
                }
                 if(this.$session.has("user"))
                {   
                    data.USER_CREATE = this.$session.get("user").EMAIL
                }
                else
                {
                    data.USER_CREATE = this.$session.get("user_social").email
                }
                this.$http.put(this.$store.state.API_URL + 'attribute-room/'+this.attribute.UUID_ATTRIBUTE_ROOM,data)
                .then(() => {
                    this.message.type = 'success'
                    this.message.text = 'Cập nhật thuộc tính thành công!'
                }).catch(() => {
                    this.message.type = 'warning'
                    this.message.text = 'Lôi! Xin vui lòng thử lại! '
                })
            }
        },
        deleteAttribute(uuid_attribute)
        {
            this.$http.delete(this.$store.state.API_URL + 'attribute-room/'+uuid_attribute+'/'+this.$route.params.uuid_room).then(() => {
                this.ApiGetAttributeRoom()
            })
        },
        btnUpdate(item)
        {
            this.show = true
            this.update = true
            this.attribute = item
            console.log(item)
        },
        btnCreate()
        {
            this.show = true
            this.update = false
            this.attribute = {}
        }
    },
    created()
    {
        this.ApiGetAttributeRoom()
    }
}
</script>

<style scoped>
.btn-action {padding: 5px;cursor: pointer;margin: 5px}
</style>