import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/MoviesPageView.vue'
import ActorView from '../views/ActorPageView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/actor/:id',
    name: 'actor',
    component: ActorView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
