<template>

<v-col cols="12" md="3">
    <v-img :src="$store.state.PUBLIC_URL + karaoke.BANNER_BAR_KARAOKE" height="180px"></v-img>
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
</style>
