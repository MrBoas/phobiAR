import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'homeList',
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
    {
      path: '/modelos',
      name: 'modelosList',
      component: () => import('./views/models.vue')
    },
    {
      path: '/feedback',
      name: 'feedbackList',
      component: () => import('./views/feedback.vue')
    },
    {
      path: '/about',
      name: 'aboutList',
      component: () => import('./views/about.vue')
    },
  ]
})