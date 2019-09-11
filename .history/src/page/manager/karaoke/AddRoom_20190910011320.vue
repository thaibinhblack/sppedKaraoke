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
                <v-card>
                    <v-card-title primary-title>
                        <span class="title-lable" style="font-size: 15px;">Form thêm phòng mới</span>
                    </v-card-title>
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
            karaoke: {}
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
        }
    },
    created()
    {
        this.ApiGetNameKaraoke()
    }
}
</script>