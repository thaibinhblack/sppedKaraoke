<template>
    <div id="page-karaoke" style="padding:15px;">
        <v-row>
            <v-col cols="12" sm="12">
                DANH SÁCH LỊCH SỬ NGƯỜI DÙNG
            </v-col>
            <v-col cols="12" sm="12">
                <v-card>
                    <v-card-title primary-title>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <span style="font-size: 15px;" class="title-card"> Lịch sử người dùng</span>
                            </v-col>
                        </v-row>
                        
                    </v-card-title>
                    <v-card-text>
                        <v-data-table
                            :headers="headers"
                            :items="historys"
                        >
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
            headers: [],
            historys: []
        }
    }
}
</script>