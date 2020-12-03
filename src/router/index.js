import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Products from './../views/Products'
import Product from './../views/Product'

import {auth} from './../services/firebase'
import {verifyToken} from './../services/auth'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },{
    path: '/products',
    name: 'Products',
    component: Products,
    beforeEnter(to, from, next){
      if(sessionStorage.getItem('token')){
          if(verifyToken(sessionStorage.getItem('token'))){
          next();
        }
      }else{
        $router.push('/login');
      }
    }
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: Product
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
