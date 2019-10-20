<template>
    <div id="page-profile">
        <v-container grid-list-xs>
            <v-row>
                <v-col cols="12" sm="3" md="2" class="logo">
                    <h2><router-link to="/" style="color:#333;">SPEED KARAOKE</router-link></h2>
                </v-col>
                <v-col cols="12" sm="9" md="10">
                    <ul class="info-account">
                        <li>HÔM NAY <br /> {{now}}</li>
                        <li>TÀI KHOẢN CỦA TÔI <br/> </li>
                    </ul>
                </v-col>
            </v-row>
        </v-container>
        <v-overlay :value="$store.state.loading" style="color:#fff !important;">
            <v-progress-circular indeterminate size="32" style="color:#fff;"></v-progress-circular>
        </v-overlay>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    data()
    {
        return {
            now: moment(new Date()).format('YYYY MM DD'),
            user: {}
        }
    },
    methods: {
        ApiCheckToken()
        {
            this.$store.state.loading = true
            await this.$http.get(this.$store.state.API_URL + 'user/token?api_token='+this.$session.get('token')).then((response) => {
                this.user = response.data
                // console.log(response.data)
            })
            this.$store.state.loading = false
        }
    },
    created()
    {
        this.ApiCheckToken()
    }
}
</script>
<style scoped>
.info-account {text-align: right;width: 100%}
.info-account li {display: inline-block;list-style: none; margin: 0 15px;}
</style>