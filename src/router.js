import Vue from 'vue';
import Router from 'vue-router';
import Delivery from '@/components/Delivery';
import Contact from '@/components/Contact';
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
