import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Converter from '@/views/Converter.vue'
import Curencies from '@/views/Curencies.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Конвертер',
    component: Converter
  },
  {
    path: '/currencies',
    name: 'Курсы валют',
    component: Curencies
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
