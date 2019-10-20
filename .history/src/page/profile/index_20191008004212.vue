<template>
    <div id="page-profile">
        <v-container grid-list-xs>
            <v-row>
                <v-col cols="12" sm="3" md="2" class="logo">
                    <h2><router-link to="/" style="color:#333;">SPEED KARAOKE</router-link></h2>
                </v-col>
                <v-col cols="12" sm="9" md="10">
                    <ul class="info-account">
                        <li>HÔM NAY</li>
                        <li>TÀI KHOẢN CỦA TÔI</li>
                    </ul>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import moment from 'moment'
export default {
    data()
    {
        return {
            now: moment(new Date()).format('YYYY MM DD')
        }
    }
}
</script>
<style scoped>
.info-account {text-align: right;width: 100%}
.info-account li {display: inline-block;list-style: none; margin: 0 15px;}
</style>