import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import('@/page/Index.vue'),
    },
    {
        path: '/profile',
        component: () => import('@/page/profile/index.vue'),
        children: [
            {
                path: 'edit-account/info',
                component: () => import('@/page/profile/editInfo.vue'),
            },
            {
                path: 'edit-account/password',
                component: () => import('@/page/profile/password.vue')
            },
            {
                path: 'bookings',
                component: () => import('@/page/profile/bookings.vue')
            }
        ]
    },
    {
        path: '/map',
        component: () => import('@/page/map/index.vue'),
    },
    {
        path: '/karaoke/:safeurl',
        component: () => import('@/page/karaoke/DetailKaraoke.vue')
    },
    {
        path: '/karaoke/:safeurl/:name_room',
        component: () => import('@/page/room/DetailRoom.vue')
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
            },
            {
                path: 'setting',
                component: () => import('@/page/manager/karaoke/SettingRule.vue'),
            },
            {
                path: 'users',
                component: () => import('@/page/manager/karaoke/user/users.vue'),
            },
            {
                path: 'user/:uuid',
                component: () => import('@/page/manager/karaoke/user/profile.vue'),
            },
            {
                path: 'add-user',
                component: () => import('@/page/manager/karaoke/user/addUser.vue')
            },
            {
                path: 'historys',
                component: () => import('@/page/manager/karaoke/history/historys.vue')
            },
            {
                path: 'bookings',
                component: () => import('@/page/manager/karaoke/booking/bookings.vue')
            }
        ]
    },
]

export default new VueRouter({
    routes: routes,
    mode: 'history'
})