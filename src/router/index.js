import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
// 路由懒加载，不用一次性加载所有页面
const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login') 
  },
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home') 
      },
      {
        path: '/qa',
        component: () => import('@/views/QA') 
      },
      {
        path: '/video',
        component: () => import('@/views/Video') 
      },
      {
        path: '/profile',
        component: () => import('@/views/My') 
      }
    ]
  },
  {
    path: '/search',
    component: () => import('@/views/Search')  
  },
  {
    path: '/detail/:article_id',
    component: () => import('@/views/Detail')   
  },
  {
    path: '/user',
    component: () => import('@/views/User')   
  }

];

const router = new VueRouter({
  routes
});

export default router;
