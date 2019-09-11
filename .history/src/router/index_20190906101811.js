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
            }
        ]
    },
]

export default new VueRouter({
    routes: routes,
    mode: 'history'
})