<template>
<v-dialog
    v-model="dialog"
    persistent :overlay="false"
    max-width="600px"
    transition="dialog-transition"
>
    <v-card>
        <v-card-title primary-title>
            <span>Thư viện hình ảnh quán karaoke</span>
        </v-card-title>
        <v-card-text>
           <v-img :src="$store.state.PUBLIC_URL + image.URL_IMAGE"></v-img>
           <v-row>
               <hooper class="slider" height="365px" :settings="hooperSettings">
                    <slide v-for="(img,index) in images" :key="index">
                        <v-col cols="12" sm="12" style="padding:3px;">
                            <v-img :src="$store.state.PUBLIC_URL + img.URL_IMAGE"></v-img>
                        </v-col>
                    </slide>
                </hooper>
           </v-row>
        </v-card-text>
    </v-card>
</v-dialog>
</template>

<script>
import { Hooper, Slide } from 'hooper';

export default {
    props: ["dialog","image", "images"],
    components: {
        Hooper,
        Slide
    },
    data()
    {
        return {
            hooperSettings: {
                itemsToShow: 5,
                centerMode: true,
                breakpoints: {
                991:
                {
                    centerMode: false,
                    itemsToShow: 5
                },
                765: {
                    centerMode: false,
                    itemsToShow: 3
                },
                564: {
                    itemsToShow: 2,
                    pagination: 'fraction'
                }
                }
            }
        }
    }
}
</script>