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
                        {{karaoke.NAME_BAR_KARAOKE}} 
                        <p> 
                            <v-icon v-for="(star,i) in karaoke.STAR_RATING" :key="i" color="yellow" size="13px">mdi-star</v-icon>
                            <small> ({{karaoke.NUMBER_REATED}} đánh giá)</small>
                        </p>
                        
                            <div id="fb-root">
                                <div class="fb-share-button" :data-href="'/manager/'+karaoke.URL_SAFE" data-layout="button_count" data-size="small"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Chia sẻ</a></div>
                            </div>
                            
                    </v-list-item-title>
                </v-list-item>
            </div>
        </a>
   </div>
</v-col>
            
</template>
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v4.0&appId=295289041071566&autoLogAppEvents=1"></script>
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
