import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListAutos from '../module/Autos/ListarAutos.vue'
import ListarClientes from '@/Clientes/ListarClientes.vue'

export const routes = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/list-autos',
      name: 'autos',
      component: ListAutos,
    },

    {
      path: '/list-clientes',
      name: 'clientes',
      component: ListarClientes,
    },

    // {
    //   path: '/list-vetas',
    //   name: 'ventas',
    //   component: LisVentas,
    // },

    // {
    //   path: '/list-reportes',
    //   name: 'reportes',
    //   component: LisRportes,
    // },
  ],
})
