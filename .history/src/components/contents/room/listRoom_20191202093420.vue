<template>
 <section style="margin-top:25px;">
    <h3>Danh sách phòng của chi nhánh</h3>
    {{rooms.length}}
    <v-row style="margin:0 -5px" v-if="rooms.length > 0">
        <v-col cols="12" sm="4" md="3"  v-for="(r,index_room) in rooms" :key="index_room" style="padding:5px;">
            <div class="item-room">
                <router-link :to="'/karaoke/'+karaoke.URL_SAFE+'/'+r.UUID_ROOM_BAR_KARAOKE"><v-img :src="$store.state.PUBLIC_URL + r.IMAGE_ROOM_BAR_KARAOKE" height="180px"></v-img></router-link>
                <div class="content-room">
                    <p style="margin-top:15px;margin-bottom:0"><strong>Tên phòng: </strong> {{r.NAME_ROOM_BAR_KARAOKE}}</p>
                    <p><strong>Giá: </strong>{{r.RENT_COST.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}} <small>vnd/h</small> </p>
                    <p><v-icon size="12" color="yellow" v-for="i in Math.floor(r.STAR_RATING) " :key="i">mdi-star</v-icon> <small>({{r.NUMBER_RATED}} đánh giá), {{r.VIEW_ROOM}} lượt xem</small></p>
                </div>
            </div>
        </v-col>
    </v-row>
    <!-- <v-row v-else>
        <v-col cols="12" sm="12">
            <p align-center>Không có phòng</p>
        </v-col>
    </v-row> -->
</section>
</template>

<script>
export default {
    props: ["karaoke","rooms"],
    watch: 
    {
        rooms(newVal)
        {
            console.log(newVal)
        }
    }
   
}
</script>