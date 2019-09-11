<template>
    <v-col class="12" sm="12">
                <v-card>
                    <v-card-title primary-title>
                        <v-row>
                            <v-col sm="12" cols="12">
                                <span class="title-lable" style="font-size: 15px"> Danh sách thuộc tính của phòng {{room.NAME_BAR_kARAOKE}}</span>
                            </v-col>
                            <v-col cols="12" sm="12">
                                <button class="btn-add title-label" ><v-icon>mdi-plus</v-icon> Thêm mới</button>
                                
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
                 <v-row>
                    <v-col cols="12" sm="6" md="4" style="margin:auto">
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
                                <button type="submit" class="btn-add"> <v-icon>mdi-plus</v-icon> Thêm mới</button>
                            </v-card-actions>
                        </v-card>
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
                {text: 'Ngày tạo', value: 'USER_CREATE'},
                {text: 'Tác vụ', value: 'ACTION'}
            ],
            attribute: {},
            attributes: [],
            message: {
                text: null,
                type: null
            }
        }
    },
    methods: {
        ApiGetAttributeRoom(){
            this.$http.get(this.$store.state.API_URL + 'attribute?UUID_ROOM_BAR_KARAOKE='+this.room.UUID_ROOM_BAR_KARAOKE)
            .then(() => {
                this.message.type = 'success'
                this.message.text = 'Thêm thuộc tính mói thành công!'
            }).catch(() => {
                this.message.type = 'error'
                this.message.text = 'Lôi! Xin lui lòng thử lại!'
            })
        }
    },
    created()
    {

    }
}
</script>