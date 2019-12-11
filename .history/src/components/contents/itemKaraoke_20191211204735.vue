<template>
    <v-col cols="12" sm="4" md="3" style="padding: 5px;" > 
                            <div class="item-karaoke">
                                <div class="image-karaoke">
                                    <router-link :to="'/karaoke/'+karaoke.URL_SAFE"><v-img height="160px" :v-if="karaoke.BANNER_BAR_KARAOKE !=null" :src="$store.state.PUBLIC_URL + karaoke.BANNER_BAR_KARAOKE"> </v-img></router-link>
                                </div>
                                 <div class="content-karaoke">
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
                                                <small> ({{karaoke.NUMBER_REATED}})</small>
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
</template>

<script>
export default {
    props: ["karaoke"]
}
</script>

<style scoped>
.item-karaoke {background: #fff;border-radius: 5px;}
.content-karaoke {padding: 10px;}
</style>