import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Add from '../views/Add.vue'
import Chart from '../views/Chart.vue'
import Dashboard from '../views/Dashboard.vue'
import * as firebase from '../firebase'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Dashboard',
        component: Dashboard,
    },
    {
        path: '/add',
        name: 'Add',
        component: Add,
    },
    {
        path: '/chart',
        name: 'Chart',
        component: Chart,
        props(route) {
            return { chartid: route.query.chartid };
        },
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
