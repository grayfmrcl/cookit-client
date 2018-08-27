import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('./views/Dashboard.vue'),
      children: [
        {
          path: 'post/:id',
          name: 'post',
          component: () => import('./components/DashboardRecipe')
        },
        {
          path: 'post/add',
          name: 'post/add',
          component: () => import('./components/UpdateRecipe')
        },
        {
          path: 'post/edit/:id',
          name: 'post/edit',
          component: () => import('./components/UpdateRecipe')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./components/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./components/Register.vue')
    },
    {
      path: '/:id',
      name: 'recipe_post',
      component: () => import('./views/Post.vue')
    }
  ]
})
