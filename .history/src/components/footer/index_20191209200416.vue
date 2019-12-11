<template>
 <footer>
    <v-container grid-list-xs>
        <v-row>
            <v-col cols="12" sm="6" md="3" class="footer-left">
                <h3>SPEED KARAOKE</h3>
                <p><strong>Địa chỉ: </strong> Đại học Cần Thơ</p>
                <p><strong>Hotline: </strong> 0825468971</p>
            </v-col>
            <v-col cols="12" sm="6" md="3">
                <h3>TOP 5 TỈNH THÀNH</h3>
                <ul class="list list-province">
                    <li v-for="(province,index) in karaoke_province" :key="index">
                        <a v-if="index <= 5" :href="'/karaoke?ID_PROVINCE='+province.ID_PROVINCE">
                            {{province.NAME_PROVINCE}}
                        </a>
                    </li>
                </ul>
            </v-col>
            <v-col cols="12" sm="12" md="6">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31430.632167949738!2d105.76890410753653!3d10.030964108790453!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0883d0dac6b15%3A0xf6ae5b1bd18625!2zVHLGsOG7nW5nIMSQ4bqhaSBI4buNYyBD4bqnbiBUaMah!5e0!3m2!1svi!2s!4v1575896355392!5m2!1svi!2s" width="100%" height="auto" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
            </v-col>
        </v-row>
        <p align="center">© 2019 SPEED KARAOKE</p>
    </v-container>
    </footer>
</template>