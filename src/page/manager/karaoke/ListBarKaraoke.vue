<template>
    <div id="page-karaoke" style="padding:15px;">
        <v-row>
            <v-col cols="12" sm="12">
                DANH SÁCH CHI NHÁNH KARAOKE 
            </v-col>
            <v-col cols="12" sm="12">
                <v-card>
                    <v-card-title primary-title>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <span style="font-size: 15px;" class="title-card"> Danh sách chi nhánh karaoke</span>
                            </v-col>
                           
                        </v-row>
                        
                    </v-card-title>
                    <v-card-text>
                        <v-data-table
                            :headers="headers"
                            :items="karaokes"
                        >
                            <template v-slot:item.LOGO_BAR_KARAOKE ="{item}">
                               <v-avatar
                                   size="70"
                                   color="#e2e2e2"
                               >
                                   <img v-if="item.LOGO_BAR_KARAOKE != null" :src="$store.state.PUBLIC_URL + item.LOGO_BAR_KARAOKE" alt="alt">
                               </v-avatar>
                            </template>
                            <template v-slot:item.ACTION ="{item}">
                               <router-link :to="'/manager-karaoke/karaoke/'+item.UUID_BAR_KARAOKE"><v-icon>mdi-chevron-right</v-icon> </router-link>
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    data()
    {
        return {
            headers: [
                {text: 'LOGO', value: 'LOGO_BAR_KARAOKE', sortable: false,align: 'center'},
                {text: 'TÊN CHI NHÁNH', value: 'NAME_BAR_KARAOKE'},
                {text: 'ĐỊA CHỈ', value: 'ADDRESS_BAR_KARAOKE'},
                {text: 'EMAIL', value: 'EMAIL_BAR_KARAOKE'},
                {text: 'PHONE', value: 'PHONE_BAR_KARAOKE'},
                {text: 'NGƯỜI TẠO', value: 'USER_CREATE'},
                {text: 'SAO', value: 'STAR_RATING', align: 'center'},
                {text: 'SL RATING', value: 'NUMBER_REATED',align: 'center'},
                {text: 'NGÀY TẠO', value: 'CREATED_AT'},
                {text: '', value: 'ACTION'},
            ],
            karaokes : [],
            store: this.$store.state.ModuleManagerKaraoke.store
        }
    },
    watch:{
        getStore(newVal)
        {
            this.ApiGetKaraoke()
        }
    },
    computed:{
        ...mapGetters(["getUser", "getStore"])
    },
    methods: {
        async ApiGetKaraoke()
        {
            this.$store.state.loading = true
            await this.$http.get(this.$store.state.API_URL + 'karaoke?api_token='+this.$cookies.get('token')).then((response) => {
                if(this.$store.state.ModuleManagerKaraoke.store != null)
                {
                    this.karaokes = response.data.filter((value,index,array) => {
                        return array[index].UUID_BAR_KARAOKE == this.$store.state.ModuleManagerKaraoke.store
                    })
                }
                else
                {
                    this.karaokes = response.data
                }
                
            })
            this.$store.state.loading = false
           
        }
    },
    updated() {
        
    },
    created()
    {
        this.ApiGetKaraoke()
    }
}
</script>