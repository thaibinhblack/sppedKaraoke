<template>
<v-container grid-list-xs>
    <v-row>
        <v-col cols="12" sm="3" md="2">
            <div id="box-total">
                <p>Tất cả đặt chỗ <v-icon class="right">mdi-chevron-down</v-icon></p>
                <p><small class="text-green">Tổng số</small> <small class="right text-green"> 0</small> </p>
                <ul class="list">
                    <li>Tất cả đặt chỗ</li>
                </ul>
            </div>
        </v-col>
    </v-row>
</v-container>
</template>

<style scoped>
#box-total {background: #fff;padding: 15px 15px 10px 15px;position: relative;}
.right {float: right}
.text-green {color: #28ca6e}
.list {position: absolute;bottom: 20px;}
.list li {list-style: none;}
</style>