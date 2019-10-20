<template>
<v-container grid-list-xs>
    <v-row>
        <v-col cols="12" sm="3" md="2">
            <div id="box-total">
                <p>Tất cả đặt chỗ <v-icon class="right">mdi-chevron-down</v-icon></p>
                <p><small class="text-green">Tổng số</small> <small class="right text-green"> 0</small> </p>
                <ul class="list" >
                    <li class="active">Tất cả đặt chỗ</li>
                    <li>Chờ xác nhận</li>
                    <li>Tất cả đặt chỗ</li>
                    <li>Tất cả đặt chỗ</li>
                    <li>Tất cả đặt chỗ</li>
                    <li>Tất cả đặt chỗ</li>
                </ul>
            </div>
        </v-col>
    </v-row>
</v-container>
</template>
<script>
export default {
    data()
    {
        return {
            status: 0
        }
    }
}
</script>
<style scoped>
#box-total {background: #fff;padding: 15px 15px 10px 15px;position: relative;}
.right {float: right}
.text-green {color: #28ca6e}
.list {position: absolute;bottom: 20px; width: calc(100% - 30px); top: 45px;border: 1px solid #e2e2e2;
box-shadow: 1px 1px 0 1px #e2e2e2;height: 150px;overflow: hidden;overflow-y: scroll;
z-index: 9999;background: #fff;}
.list li {list-style: none; padding: 7px !important;cursor: pointer;}
.list li:hover {background: #eeeeee;}
.list li.active {color: #f68a39;background: #eeeeee}

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