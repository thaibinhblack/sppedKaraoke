<template>
 <section style="margin-top:25px;">
    <h3>Danh sách phòng của chi nhánh</h3>
    <v-row style="margin:0 -5px" v-if="rooms.length > 0">
        <v-col cols="12" sm="4" md="3"  v-for="(r,index_room) in rooms" :key="index_room" style="padding:5px;">
            <div class="item-room">
                <div class="open-close" :class="r.COLSE == 1 ? 'active' : ''">Phòng đã được đặt</div>
                <router-link :to="'/karaoke/'+karaoke.URL_SAFE+'/'+r.UUID_ROOM_BAR_KARAOKE"><v-img :src="$store.state.PUBLIC_URL + r.IMAGE_ROOM_BAR_KARAOKE" height="180px"></v-img></router-link>
                <div class="content-room">
                    <p style="margin-top:15px;margin-bottom:0"><strong>Tên phòng: </strong> {{r.NAME_ROOM_BAR_KARAOKE}}</p>
                      <p><v-icon size="12" color="yellow" v-for="i in Math.floor(r.STAR_RATING) " :key="i">mdi-star</v-icon> <small>({{r.NUMBER_RATED}} đánh giá), {{r.VIEW_ROOM}} lượt xem</small></p>
                    <p><strong>Giá: </strong>{{r.RENT_COST.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}} <small>vnd/h</small> </p>
                    <p><strong>Thiết kế:</strong> {{r.DESIGN}}</p>
                    <p><strong>Sức chứa: </strong> {{r.CAPACITY}} người / phòng</p>
                    <p><strong>Hỗ trợ tổ chức sự kiện: </strong> {{r.EVENT == 1? 'có' : 'không'}}</p>
                    
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

<style scoped>
.item-room {position: relative;}
.content-room p {margin:0;}
.open-close {position: absolute;top: 20px;left: 10px;z-index: 999;font-size: 12px;font-size: .75rem;
    background: #f65e39;
    color: #fff;display: none;
    border-radius: 1.5rem;
    letter-spacing: .5px;
    line-height: 1.375rem;
    padding: 0 .5rem;}
.open-close.active {display: block;}
</style>