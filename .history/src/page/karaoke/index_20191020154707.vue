<template>
    <div id="page-karaoke">
        <header-tool-bar />
        <v-container grid-list-xs>
            <v-row>
                <v-col cols="12" sm="12" class="group-link" style="text-align:left;">
                    <ul class="list-link">
                        <li>{{address.NAME_PROVINCE}}</li>
                        <li><v-icon>mdi-chevron-right</v-icon></li>
                        <li>{{address.NAME_DISTRICT}}</li>
                    </ul>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    data()
    {
        return {
            address: {}
        }
    },
     components:{
        'header-tool-bar': () => import('@/components/header/ToolBar.vue'),
    },
    methods:{
        ApiGetAddress()
        {
            if(this.$route.query.ID_DISTRICT)
            {
                this.$http.get(this.$store.state.API_URL + 'district/'+this.$route.query.ID_DISTRICT).then((response) => {
                   this.address = response.data
                })
                this.$http.get(this.$store.state.API_URL + 'karaoke?ID_DISTRICT='+this.$route.query.ID_DISTRICT).then((response) => {
                    console.log(response.data)
                })
            }
        }
    },
    created()
    {
        this.ApiGetAddress()
    }   
}
</script>