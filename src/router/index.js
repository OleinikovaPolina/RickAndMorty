import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Episodes from "../views/Episodes"
import Characters from "../views/Characters"
import Locations from "../views/Locations"
import Character from "../views/Character";
import Episode from "../views/Episode";
import Location from "../views/Location"
import NotFound from "../components/NotFound";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/locations',
        component: Locations
    },
    {
        path: '/characters',
        component: Characters
    },
    {
        path: '/episodes',
        component: Episodes
    },
    {
        path: '/character/:id',
        component: Character
    },
    {
        path: '/episode/:id',
        component: Episode
    },
    {
        path: '/location/:id',
        component: Location
    },
    {
        path: "*",
        component: NotFound
    }
]

const router = new VueRouter({
    mode: 'hash',
    routes
})

export default router
