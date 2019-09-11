import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import('@/page/Index.vue'),
    },
    {
        path: '/login',
        component: () => import('@/page/Login.vue'),
    },
    {
        path: '/resignter',
        component: () => import('@/page/Resignter.vue'),
    },
    {
        path: '/manager-karaoke',
        component: () =>import('@/layout/LayoutManagerKaraoke.vue'),
        children: [
            {
                path: 'dashboard',
                component: () => import('@/page/manager/karaoke/DashBoard.vue'),
            },
            {
                path: 'karaoke',
                component: () => import('@/page/manager/karaoke/ListBarKaraoke.vue'),
            },
            {
                path: 'add-karaoke',
                component: () => import('@/page/manager/karaoke/AddKaraoke.vue'),
            },
            {
                path: 'karaoke/:uuid',
                component: () => import('@/page/manager/karaoke/DetailKaraoke.vue'),
            },
            {
                path: 'karaoke/:uuid/add-room',
                component: () => import('@/page/manager/karaoke/AddRoom.vue'),
            },
            {
                path: 'karaoke/:uuid/room/:uuid_room',
                component: () => import('@/page/manager/karaoke/DetailRoom.vue'),
            }
        ]
    },
]

export default new VueRouter({
    routes: routes,
    mode: 'history'
})