import { createRouter, createWebHashHistory } from "vue-router"
import isAuthenticatedGuard from "./guards"

const routes = [
  { 
    path: '/dashboard',
    name: 'dashboard', 
    beforeEnter: [ isAuthenticatedGuard ],
    component: () => import('../modules/app/layout/Inicio.vue'),
    children: [
      {
        path: 'inicio',
        name: 'inicio',
        component: () => import('../modules/app/pages/Inicio.vue')
      },
      {
        path: 'pagina',
        name: 'pagina',
        component: () => import('../modules/app/pages/Pagina.vue')
      },
      {
        path: '/',
        redirect: { name: 'inicio' }
      }
    ]
  },

  { 
    path: '/login', 
    name: 'login',
    component: () => import('../modules/login/layout/Login.vue' ),
    children: [
      {
        path: 'singin',
        name: 'singin',
        component: () => import('../modules/login/pages/SingIn.vue')
      },
      {
        path: 'singup',
        name: 'singup',
        component: () => import('../modules/login/pages/SingUp.vue')
      },
      {
        path: 'restore-password',
        name: 'restore-password',
        component: () => import('../modules/login/pages/RestoredPass.vue')
      },
      {
        path: '',
        redirect: { name: 'singin' }
      }
    ]
  },

  { 
    path: '/:pathMatch(.*)*', 
    name: 'page404', 
    component: () => import('../shared/pages/Page404.vue') 
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

export default router