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
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    name="EMAIL"
                                    label="EMAIL"
                                    prepend-icon="mdi-email"
                                    v-model="user.EMAIL"
                                    disabled
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    name="EMAIL"
                                    label="EMAIL"
                                    prepend-icon="mdi-email"
                                    v-model="user.DISPLAY_NAME"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    name="PHONE"
                                    label="PHONE"
                                    prepend-icon="mdi-phone"
                                    v-model="user.PHONE"
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    name="ADDRESS"
                                    label="ADDRESS"
                                    prepend-icon="mdi-map-marker"
                                    v-model="user.ADDRESS"
                                    disabled
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    name="GENDER"
                                    label="GIỚI TÍNH"
                                    prepend-icon="mdi-gender-male-female"
                                    v-model="user.EMAIL"
                                    disabled
                                ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    name="BIRTH_DAY"
                                    label="NGÀY SINH"
                                    prepend-icon="mdi-email"
                                    v-model="user.BIRTH_DAY"
                                    disabled
                                ></v-text-field>
                            </v-col>
                            
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field
                                    name="EMAIL"
                                    label="EMAIL"
                                    prepend-icon="mdi-email"
                                    v-model="user.EMAIL"
                                    disabled
                                ></v-text-field>
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
            await this.$http.get(this.$store.state.API_URL + 'info/user/'+this.$route.params.uuid+'?api_token='+this.$session.get('token')).then((response) => {
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