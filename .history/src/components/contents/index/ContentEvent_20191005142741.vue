<template>

<v-col cols="12" md="3">
   <div class="item-karaoke">
        <v-img :src="$store.state.PUBLIC_URL + karaoke.BANNER_BAR_KARAOKE" height="180px"></v-img>
        <a class="item-karaoke-bottom" :href="'/karaoke/'+karaoke.URL_SAFE">
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
                            <strong>{{karaoke.NAME_BAR_KARAOKE}} </strong> <br/>
                            <v-icon v-for="(star,i) in karaoke.STAR_RATING" :key="i" color="yellow" size="13px">mdi-star</v-icon>
                            <small> ({{karaoke.NUMBER_REATED}} đánh giá)</small>
                        </p>
                            
                    </v-list-item-title>
                   
                </v-list-item>
                 <div class="group-address">                        
                        <small><span>{{karaoke.NAME_PROVINCE}} > {{karaoke.NAME_DISTRICT}}</span></small>
                        <p><small><v-icon size="13px">mdi-map-marker</v-icon> {{karaoke.ADDRESS_BAR_KARAOKE}}</small></p>
                    </div>
            </div>
        </a>
   </div>
</v-col>
            
</template>
<script>
export default {
    props: ["karaoke"],
    data(){
        return {
            images: [],
            model: null,
            slickOptions: {
                dots: false,
                infinite: true,
                speed: 300,
                slidesToShow: 1,
                // Any other options that can be got from plugin documentation
            },
        }
    },
}
</script>

<style scoped>
.slick-slider, .slick-slider img {width: 100%}
.slick-slider img {height: auto}
.item-karaoke {background: #fff;border-radius: 5px;overflow: hidden;}
.item-karaoke-bottom {padding: 15px 0;}
</style>
