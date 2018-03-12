import Vue from 'vue'
import Router from 'vue-router'

const Editor = resolve => require(['@/views/Editor'], resolve)
const Help = resolve => require(['@/views/Help'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: Editor
    },
    {
        path: '/help',
        component: Help,
        meta: {
            title: 'Shapes 手册'
        }
    }
]

export default new Router({
    mode: 'history',
    routes: routes
})
