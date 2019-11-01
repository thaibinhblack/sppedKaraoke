<template>
 <div class="item-karaoke" >
    <v-icon class="icon-active" >mdi-checkbox-marked</v-icon>
    <v-row>
        <v-list-item two-line>
            <v-list-item-avatar>
                <v-avatar
                size="70px"
                color="#e2e2e2"
                >
                    <img v-if="karaoke.LOGO_BAR_KARAOKE != null" :src="$store.state.PUBLIC_URL + karaoke.LOGO_BAR_KARAOKE" :alt="karaoke.NAME_BAR_KARAOKE">
                </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
                <p><strong>{{karaoke.NAME_BAR_KARAOKE}}</strong></p>
                <P class="text-map goto" @click="goTo(karaoke)"><v-icon>mdi-map-marker</v-icon> {{karaoke.NAME_PROVINCE}}, {{karaoke.NAME_DISTRICT}}, {{karaoke.ADDRESS_BAR_KARAOKE}}</P>
                <p><v-icon color="yellow" size="12" v-for="i in karaoke.STAR_RATING" :key="i">mdi-star</v-icon></p>
                <p class="text-map"><router-link :to="'/karaoke/'+karaoke.URL_SAFE">Xem chi tiết</router-link></p>
            </v-list-item-content>
        </v-list-item>
    </v-row>
</div>
</template>
<script>
export default {
    props: ["karaoke"],
    methods: {
        goTo(karaoke)
        {
             this.commitgetFeature(karaoke.OBJECTID)
        },
    },
}
</script>