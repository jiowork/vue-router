import Vue from "vue"
import VueRouter from "./vue-router"
import routes from "./router"

Vue.use(VueRouter)

export default new VueRouter({
    mode:"hash",   // hash  history
    routes
})