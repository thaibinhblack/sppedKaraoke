<template>
     <v-toolbar>
                <v-row  no-gutters dense style="padding: 15px;width:100%">
                    <v-col cols="12" md="3">
                        <h3><span><v-icon class="btn-menu" :class="{active: menuManager}" @click="closeOpenSidebar()" >mdi-menu</v-icon></span> SPEED KARAOKE</h3>
                    </v-col>
                
                    <v-col cols="12" md="9">
                        <ul>
                            <li><span>Hotline: 0947164024</span></li>
                            <li><router-link class="hover-resignter" to="/login">Trở thành chủ quán karaoke</router-link></li>
                            <li><a href="./dangky">Đăng ký</a></li>
                            <li><a href="./dangnhap">Đăng nhập</a></li>
                        </ul>
                    </v-col>
                </v-row>
        </v-toolbar>
</template>
<script>
export default {
    name: 'header-tool-bar',
    props: ["menuManager"],
    methods: {
        closeOpenSidebar()
        {
            this.$emit("closeOpenSidebar", !this.menuManager)
        }
    }
}
</script>

<style scoped>
ul {text-align: right}
ul li {list-style: none;display: inline-block;padding: 7px;}
ul li a,ul li span {text-decoration: none;font-size: 13px;color: #333;}
ul li a:hover,ul li span:hover {color: #f65e39 !important}
.hover-resignter {background: #fff;border-radius: 5px;padding: 4px 10px;color: #f65e39;border:1px solid #f65e39}
.hover-resignter:hover {background: #f65e39;color: #fff !important  ;}
.btn-menu {cursor: pointer;}
/* .btn-menu.active {display: inline-block;} */
</style>
