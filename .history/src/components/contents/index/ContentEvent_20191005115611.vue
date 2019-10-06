<template>

<v-col cols="12" md="3">
    <!-- <slick
        class="slick-slider"
        ref="slick"
        :options="slickOptions">
        <a href="http://placehold.it/2000x1000"><img src="http://placehold.it/2000x1000" alt=""></a>
        <a href="http://placehold.it/2000x1000"><img src="http://placehold.it/2000x1000" alt=""></a>
        <a href="http://placehold.it/2000x1000"><img src="http://placehold.it/2000x1000" alt=""></a>
        <a href="http://placehold.it/2000x1000"><img src="http://placehold.it/2000x1000" alt=""></a>
        <a href="http://placehold.it/2000x1000"><img src="http://placehold.it/2000x1000" alt=""></a>            
    </slick> -->
    <a :href="'/karaoke/'+karaoke.URL_SAFE">
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
                </v-list-item-title>
            </v-list-item>
            <div class="content-main" v-html="karaoke.CONTENT_BAR_KARAOKE">
            
            </div>
        </div>
    </a>
</v-col>
            
</template>

<script>
import Slick from 'vue-slick'; 
export default {
    props: ["karaoke"],
    components: {
        Slick,
    },
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
    methods: {
        ApiGetImageKaraoke()
        {
            this.$http.get(this.$store.state.API_URL +'image/'+this.karaoke.UUID_BAR_KARAOKE+'?type=UUID_BAR_KARAOKE').then((response) => {
                this.images = response.data[0]
                console.log(this.images)
            })
        },
        next() {
            this.$refs.slick.next();
        },
 
        prev() {
            this.$refs.slick.prev();
        },
 
    },
    created()
    {
        this.ApiGetImageKaraoke()
    }
}
</script>

<style scoped>
.slick-slider, .slick-slider img {width: 100%}
.slick-slider img {height: auto}
</style>
