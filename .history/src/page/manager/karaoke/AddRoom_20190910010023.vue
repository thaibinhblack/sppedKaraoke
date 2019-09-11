<template>
    <div id="page-add-room">
        <v-row>
            <v-col cols="12" sm="5">
                <span>THÊM PHÒNG MỚI</span>
            </v-col>
            <v-col cols="12" sm="7" class="group-link">
                <ul class="list-link">
                    <li><router-link to="/manager-karaoke/dashboard"><v-icon>mdi-view-dashboard</v-icon> Home</router-link></li>
                    <li><v-icon>mdi-chevron-right</v-icon></li>
                    <li><router-link :to="'/manager-karaoke/karaoke/'+$route.params.uuid"></router-link></li>
                </ul>
            </v-col>
        </v-row>
    </div>
</template>