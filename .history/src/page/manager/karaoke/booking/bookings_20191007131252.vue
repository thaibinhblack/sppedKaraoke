<template>
<div id="page-booking" style="padding:15px;">
    <v-row>
        <v-col cols="12" sm="12">
            Danh sách booking
        </v-col>
        <v-col cols="12" sm="12">
            <v-card>
                <v-card-text>
                    <v-data-table
                        :headers="headers"
                        :items="bookings"
                    >
                        
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
            bookings: [],
            headers: [
                {text: 'AVATAR', value: 'AVATAR', align: 'center', sortable: false},
                {text: 'TÊN', value: 'DISPLAY_NAME', align: 'center'},
                {text: 'GIỚI TÍNH', value: 'GENDER', align: 'center', sortable: false},
                {text: 'NGÀY SINH', value: 'BIRTH_DAY'},
                {text: 'SĐT', value: 'PHONE'},
                {text: 'EMAIL', value: 'EMAIL'},
                {text: 'ĐIỂM BOOKING', value: 'RELIABILITY', align: 'center'},
                {text: 'TGIAN BOOK', value: 'CREATED_AT'},
                {text: 'TRẠNG THÁI', value: 'STATUS'}

            ]
        }
    },
    computed: {
        ...mapGetters(["getStore"])
    },
    methods: {
        async ApiGetBooking()
        {
            this.$store.state.loading = true
            await this.$http.get(this.$store.state.API_URL + 'booking?api_token='+this.$session.get('token')+'&UUID_BAR_KARAOKE='+this.getStore)
            .then((response) => {
                console.log(response.data)
            })
            this.$store.state.loading = false
        }
    },
    created()
    {
        this.ApiGetBooking()
    }
}
</script>