<template>
<div id="detail-room">
    <header-tool-bar />
    <v-container grid-list-xs>
        <v-row>
            <v-col cols="12">

            </v-col>
        </v-row>
    </v-container>
    <v-overlay :value="$store.state.loading" style="color:#fff !important;">
        <v-progress-circular indeterminate size="32" style="color:#fff;"></v-progress-circular>
    </v-overlay>
</div>
</template>

<script>
export default {
    components:{
        'header-tool-bar': () => import('@/components/header/ToolBar.vue'),
        'header-search': () => import('@/components/header/HeaderSearch.vue'),
    },
    data()
    {
        return {
            room: {}
        }
    },
    methods: {
        ApiGetRoom()
        {
            this.$http.get(this.$store.state.API_URL + 'room?URL_SAFE='+this.$route.params.safeurl
            +'&NAME_ROOM_BAR_KARAOKE='+this.$route.params.name_room).then((response) => {
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