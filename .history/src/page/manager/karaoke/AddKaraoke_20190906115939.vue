<template>
    <div id="page-add-karaoke" style="padding:15px;">
        <v-row>
            <v-col cols="12" sm="4">
                THÊM CHI NHÁNH MỚI
            </v-col>
            <v-col cols="12" sm="8" class="group-link">
                <ul class="list-link">
                    <li><router-link to="/manager-karaoke/dashboard"><v-icon>mdi-view-dashboard</v-icon> Home</router-link></li>
                    <li><v-icon>mdi-chevron-right</v-icon></li>
                    <li><router-link to="/manager-karaoke/karaoke"> Danh sách karaoke</router-link></li>
                    <li><v-icon>mdi-chevron-right</v-icon></li>
                    <li>Thêm mới</li>
                </ul>
            </v-col>
            <v-col class="12" sm="12">
                 <v-form>
                    <v-card>
                        <v-card-title primary-title>
                            <span class="title-label" style="font-size: 15px;">Thêm chi nhánh mới {{karaoke.NAME_BAR_KARAOKE}}</span>
                        </v-card-title>
                        <v-card-text>
                        
                            <v-row>
                                <v-col cols="12" sm="12" class="group-logo-karaoke">
                                    <v-avatar
                                        size="150"
                                        color="#e2e2e2"
                                        class="logo-karaoke">
                                        <input type="file" class="input-logo"> 
                                        <img v-if="karaoke.logo != null" :src="src" alt="alt">
                                    </v-avatar>
                                </v-col>
                            </v-row>
                        
                        </v-card-text>
                    </v-card>
                 </v-form>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    data()
    {
        return {
            karaoke: {}
        }
    }
}
</script>

<style scoped>
.group-logo-karaoke{text-align: center;}
.logo-karaoke {position: relative}
.input-logo {position: absolute;width: 100%;left: 0;top: 0;opacity: 1;z-index: 999;}
</style>