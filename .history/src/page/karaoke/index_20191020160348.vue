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
                <v-col cols="12" sm="4" md="3">

                </v-col>
                <v-col cols="12" sm="8" md="9">
                    <v-row>
                        <v-col cols="12" sm="6" md="4" v-for="(karaoke,index) in karaokes" :key="index"> 
                            <div class="itme-karaoke">
                                <div class="image-karaoke">
                                    <v-img height="160px" :v-if="karaoke.BANNER_BAR_KARAOKE !=null" :src="$store.state.PUBLIC_URL + karaoke.BANNER_BAR_KARAOKE"> </v-img>
                                </div>
                                 <div class="content-event-karaoke">
                                    <v-list-item two-line>
                                        <v-list-item-avatar>
                                            <v-avatar
                                                size="50px"
                                                color="#e2e2e2"
                                            >
                                                <img v-if="karaoke.LOGO_BAR_KARAOKE != null" :src="$store.state.PUBLIC_URL + karaoke.LOGO_BAR_KARAOKE" alt="">
                                            </v-avatar>
                                        </v-list-item-avatar>
                                        <v-list-item-title>
                                            
                                            <p> 
                                                <strong class="title">{{karaoke.NAME_BAR_KARAOKE}} </strong> <br/>
                                                <v-icon v-for="(star,i) in Math.floor(karaoke.STAR_RATING)" :key="i" color="yellow" size="13px">mdi-star</v-icon>
                                                <small> ({{karaoke.NUMBER_REATED}} đánh giá)</small>
                                            </p>
                                                
                                        </v-list-item-title>
                                    
                                    </v-list-item>
                                    <div class="group-address">                        
                                        <small><span><v-icon size="13px" color="#f65e39">mdi-map-marker</v-icon> {{karaoke.NAME_PROVINCE}} > {{karaoke.NAME_DISTRICT}}</span></small>
                                        <p><small class="address"><v-icon size="13px" color="#f65e39">mdi-map-marker</v-icon> {{karaoke.ADDRESS_BAR_KARAOKE}}</small></p>
                                    </div>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
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
            address: {},
            karaokes: []
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
                    this.karaokes = response.data
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