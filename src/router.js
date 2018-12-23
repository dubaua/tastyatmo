import Vue from 'vue';
import Router from 'vue-router';
import Delivery from '@/components/Delivery';
import Contact from '@/components/Contact';
import Pies from '@/components/Pies';
import Product from '@/components/product';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/delivery',
      name: 'delivery',
      component: Delivery,
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
    },
    {
      path: '/pies',
      name: 'pies',
      component: Pies,
    },
    {
      path: '/:productId',
      name: 'product',
      component: Product,
    },
    {
      path: '/',
      name: 'home',
      component: Product,
    },
  ],
});
