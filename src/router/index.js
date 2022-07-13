import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
// 路由懒加载，不用一次性加载所有页面
const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login') 
  }
];

const router = new VueRouter({
  routes
});

export default router;
