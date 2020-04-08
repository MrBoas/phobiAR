import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/home.vue')
    },
    {
      path: '/criarsessao',
      name: 'criarsessoesList',
      component: () => import('./views/createSession.vue')
    },
    {
      path: '/sessoes',
      name: 'sessoesList',
      component: () => import('./views/sessions.vue')
    },
    // apagar depois
    {
      path: '/sessoesold',
      name: 'sessoesListold',
      component: () => import('./views/sessions_old.vue')
    },
  ]
})