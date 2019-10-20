<template>
<v-container grid-list-xs>
    <v-row>
        <v-col cols="12" sm="3" md="2">
            <div id="box-total">
                <p>{{status.text}} <v-icon class="right" @click="active = !active">{{icon}}</v-icon></p>
                <p><small class="text-green">Tổng số</small> <small class="right text-green"> 0</small> </p>
                <ul class="list" :class="{'active': active}">
                    <li  v-for="(st,index) in list_status" 
                    :key="index" 
                    :value="st.value" 
                    :class="st.class"
                    @click="setActive(st)">
                        {{st.text}}
                    </li>
                </ul>
            </div>
        </v-col>
        <v-col cols="12" sm="9" md="10">
            <v-card>
                <v-data-table
                    :headers="headers"
                    :items="booking"
                >
                    <template v-slot:item.LOGO_BAR_KARAOKE="{item}">
                        <v-avatar
                            size="50"
                            color="#e2e2e2"
                        >
                            <img :src="$store.state.PUBLIC_URL + item.LOGO_BAR_KARAOKE" alt="alt">
                        </v-avatar>
                    </template>
                    <template v-slot:item.TIME_START="{item}">
                        <span>{{moment(item.TIME_START).format('DD/MM/YYYY h:i:s')}}</span>
                    </template>
                    <template v-slot:item.TIME_END="{item}">
                        <span v-if="item.TIME_END == null" >Chưa trả phòng</span>
                        <span v-else>{{item.TIME_END}}</span>
                    </template>
                    <template v-slot:item.TOTAL="{item}">
                        <span>0</span>
                    </template>
                    <template v-slot:item.PRICE="{item}">
                       <span v-if="item.TIME_END  == null">0</span>
                       <span v-else>total</span>
                    </template>
                    <template v-slot:item.STATUS="{item}">
                        <span v-if="item.STATUS == 0">Chờ xác nhận</span>
                        <span v-else-if="item.STATUS == 1"> Đã nhận phòng </span>
                        <span v-else-if="item.STATUS == 2"> Đã thanh toán </span>
                        <span v-else-if="item.STATUS == 3"> Đã hủy </span>
                        <span v-else-if="item.STATUS == 4"> Tự hủy </span>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
    </v-row>
</v-container>
</template>
<script>
import moment from 'moment'
export default {
    data()
    {
        return {
            status: 0,
            active: false,
            icon: 'mdi-chevron-up',
            status: {
                value: 'all',
                text: 'Tất cả đặt chỗ',
            },
            list_status : [
                {text: 'Tất cả đặt chỗ', value: 'all', class: 'active'},
                {text: 'Chờ xác nhận', value: 0, class: ''},
                {text: 'Đã nhận phòng', value: 1, class: ''},
                {text: 'Đã thanh toán', value: 2, class: 'acive'},
                {text: 'Đã hủy', value: 3, class: ''},
                {text: 'Tự hủy', value: 4, class: ''},
            ],
            headers: [
                {text: '', value: 'LOGO_BAR_KARAOKE', align: 'center',sortable: false},
                {text: 'Tên chi nhánh', value: 'NAME_BAR_KARAOKE'},
                {text: 'Tên phòng', value: 'NAME_ROOM_BAR_KARAOKE'},
                {text: 'Giá thuê', value: 'RENT_COST',align: 'center'},
                {text: 'Thời gian đặt', value: 'TIME_START', align: 'center'},
                {text: 'Thời gian trả', value: 'TIME_END', align: 'center'},
                {text: 'Tổng thời gian', value: 'TOTAL', align: 'center'},
                {text: 'Thành tiền', value: 'PRICE', align: 'center'},
                {text: 'Trạng thái', value: 'STATUS', align: 'center'}

            ],
            booking: []
        }
    },
    watch: {
        active(newVal)
        {
            if(newVal == true)
            {
                this.icon = 'mdi-chevron-down'
            }
            else
            {
                this.icon = 'mdi-chevron-up'
            }
        }
    },
    methods: {
        setActive(status)
        {
            this.active = false
            this.status = status
            this.list_status.filter((value,index,array) => {
                if(status.value == array[index].value)
                {
                    array[index].class = 'active'
                }
                else
                {
                   array[index].class = ''
                }
            })
            console.log('status', this.list_status, status)
        },
        getBooking()
        {
            this.$http.get(this.$store.state.API_URL + 'booking?api_token='+this.$session.get('token')+'&status='+this.status.value)
            .then((response) => {
                this.booking = response.data
            })
        }
    },
    created()
    {
        this.getBooking()
    }
}
</script>
<style scoped>
#box-total {background: #fff;padding: 15px 15px 10px 15px;position: relative;}
.right {float: right}
.text-green {color: #28ca6e}
.list {position: absolute;bottom: 20px; width: calc(100% - 30px); top: 45px;border: 1px solid #e2e2e2;
box-shadow: 1px 1px 0 1px #e2e2e2;height: 150px;overflow: hidden;overflow-y: scroll;
z-index: 9999;background: #fff;display: none;}
.list.active {display: block;}
.list li {list-style: none; padding: 7px !important;cursor: pointer;}
.list li.active, .list li:hover {color: #f68a39;background: #eeeeee}

/* width */
.list::-webkit-scrollbar {
  width: 5px;
}

/* Track */
.list::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.list::-webkit-scrollbar-thumb {
  background: #28ca6e;
}

/* Handle on hover */
.list::-webkit-scrollbar-thumb:hover {
  background: #28ca6e;
}
</style>