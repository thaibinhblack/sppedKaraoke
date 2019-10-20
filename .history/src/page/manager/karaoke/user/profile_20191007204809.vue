<template>
    <div id="page-profile" style="padding:15px;">
        <v-row>
            <v-col cols="12" sm="4">
                THÔNG TIN CÁ NHÂN
            </v-col>
            <v-col cols="12" sm="8" class="group-link">
                <ul class="list-link">
                    <li><router-link to="/manager-karaoke/dashboard"><v-icon>mdi-view-dashboard</v-icon> Home</router-link></li>
                    <li><v-icon>mdi-chevron-right</v-icon></li>
                    <li>Profile</li>
                </ul>
            </v-col>
            <v-col cols="12" sm="12">
                <v-card>
                    <v-card-text>
                        <v-row>
                            <v-col cols="12" sm="12">
                                <v-avatar
                                    size="150px"
                                    color="#e2e2e2"
                                >
                                    <!-- <img src="src" alt="alt"> -->
                                </v-avatar>
                            </v-col>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    data(){
        return {
            user: {}
        }
    },
    methods: {
        async ApiDetailUser()
        {
            this.$store.state.loading = true
            await this.$http.get(this.$store.state.API_URL + 'user/'+this.$route.params.uuid).then((response) => {
                this.user = response.data
            })
            this.$store.state.loading = false
        }
    },
    created()
    {
        this.ApiDetailUser()
    }
}
</script>