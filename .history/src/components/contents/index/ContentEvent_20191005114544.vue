<template>

<v-col cols="12" md="3">
    
        <v-slide-group
            v-model="model"
        
            >
            <v-slide-item
                v-for="(image,index) in images"
                :key="index"
                v-slot:default="{ active, toggle }"
            >
                <v-card
                    :color="active ? 'primary' : 'grey lighten-1'"
                    height="150px"
                    width="100%"
                    class="sm-12"
                    @click="toggle"
                    >
                    <v-img :src="$store.state.PUBLIC_URL + image.URL_IMAGE"></v-img>
                </v-card>
            </v-slide-item>
        </v-slide-group>
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
        }
    },
    methods: {
        ApiGetImageKaraoke()
        {
             this.$http.get(this.$store.state.API_URL +'image/'+this.karaoke.UUID_BAR_KARAOKE+'?type=UUID_BAR_KARAOKE').then((response) => {
                    this.images = response.data
                })
        }
    },
    created()
    {
        this.ApiGetImageKaraoke()
    }
}
</script>
