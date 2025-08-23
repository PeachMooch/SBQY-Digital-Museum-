import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    // 根路径重定向逻辑：每次访问都进入HeroPage
    beforeEnter: (to, from, next) => {
      next('/heropage');
    }
  },
  {
    path: '/homepage',
    name: 'homepage',
    // Homepage 路由 - 返回首页使用此路径
    meta: { title: '首页' },
    component: () => import(/* webpackChunkName: "homepage" */ '../views/Homepage.vue')
  },
  {
    path: '/heropage',
    name: 'heropage', 
    // HeroPage 路由 - 第一次进入网站显示
    meta: { title: '实践队风采' },
    component: () => import(/* webpackChunkName: "heropage" */ '../views/HeroPage.vue')
  },
  {
    path: '/results',
    name: 'practice-results',
    meta: { title: '社会实践 · 成果展示' },
    component: () => import(/* webpackChunkName: "results" */ '../views/PracticeResultsPage.vue')
  },
  // 山西数字博物馆主要页面路由
  {
    path: '/home',
    name: 'shanxi-home',
    meta: { title: '山西数字博物馆 · 首页' },
    component: () => import(/* webpackChunkName: "shanxi-home" */ '../views/shanxi/ShanxiHomePage.vue')
  },
  {
    path: '/index',
    name: 'shanxi-index',
    meta: { title: '山西数字博物馆 · 导览' },
    component: () => import(/* webpackChunkName: "shanxi-index" */ '../views/shanxi/ShanxiIndexPage.vue')
  },
  // F2展厅 - 运斤成风
  {
    path: '/F2',
    name: 'f2-home',
    meta: { title: 'F2 展厅 · 运斤成风' },
    component: () => import(/* webpackChunkName: "f2" */ '../views/shanxi/exhibitions/F2HomePage.vue')
  },
  {
    path: '/Detail1',
    name: 'f2-detail1',
    meta: { title: 'F2 展厅 · 展项一' },
    component: () => import(/* webpackChunkName: "f2-detail1" */ '../views/shanxi/exhibitions/F2Detail1.vue')
  },
  {
    path: '/Detail2',
    name: 'f2-detail2',
    meta: { title: 'F2 展厅 · 展项二' },
    component: () => import(/* webpackChunkName: "f2-detail2" */ '../views/shanxi/exhibitions/F2Detail2.vue')
  },
  {
    path: '/Detail3',
    name: 'f2-detail3',
    meta: { title: 'F2 展厅 · 展项三' },
    component: () => import(/* webpackChunkName: "f2-detail3" */ '../views/shanxi/exhibitions/F2Detail3.vue')
  },
  // F3展厅 - 非遗珍馐
  {
    path: '/F3',
    name: 'f3-home',
    meta: { title: 'F3 展厅 · 非遗珍馐' },
    component: () => import(/* webpackChunkName: "f3" */ '../views/shanxi/exhibitions/F3HomePage.vue')
  },
  {
    path: '/Detail11',
    name: 'f3-detail1',
    meta: { title: 'F3 展厅 · 展项一' },
    component: () => import(/* webpackChunkName: "f3-detail1" */ '../views/shanxi/exhibitions/F3Detail1.vue')
  },
  {
    path: '/Detail12',
    name: 'f3-detail2',
    meta: { title: 'F3 展厅 · 展项二' },
    component: () => import(/* webpackChunkName: "f3-detail2" */ '../views/shanxi/exhibitions/F3Detail2.vue')
  },
  {
    path: '/Detail13',
    name: 'f3-detail3',
    meta: { title: 'F3 展厅 · 展项三' },
    component: () => import(/* webpackChunkName: "f3-detail3" */ '../views/shanxi/exhibitions/F3Detail3.vue')
  },

  // F4展厅 - 三晋揽胜
  {
    path: '/F4',
    name: 'f4-home',
    meta: { title: 'F4 展厅 · 三晋揽胜' },
    component: () => import(/* webpackChunkName: "f4" */ '../views/shanxi/exhibitions/F4HomePage.vue')
  },

  // 农业非遗特展
  {
    path: '/agriculture',
    name: 'agriculture',
    meta: { title: '农业非遗特展' },
    component: () => import(/* webpackChunkName: "agriculture" */ '../views/AgriculturePage.vue')
  },
  // 农具演进史页面
  {
    path: '/agriculture-tools',
    name: 'agriculture-tools',
    meta: { title: '农具演进史' },
    component: () => import(/* webpackChunkName: "agriculture-tools" */ '../views/AgricultureToolsPage.vue')
  },
  // 404
  {
    path: '*',
    name: 'not-found',
    meta: { title: '页面未找到' },
    component: () => import(/* webpackChunkName: "not-found" */ '../views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    // 如果是浏览器前进/后退，恢复之前的位置
    if (savedPosition) {
      return savedPosition
    }
    
    // 对于跳转到首页的情况，强制滚动到顶部
    if (to.path === '/' || to.name === 'homepage') {
      return new Promise((resolve) => {
        setTimeout(() => {
          window.scrollTo(0, 0);
          resolve({ x: 0, y: 0 });
        }, 100);
      });
    }
    
    // 其他情况也滚动到顶部
    return { x: 0, y: 0 }
  }
})

// 全局前置守卫 - 确保页面跳转时正确处理滚动
router.beforeEach((to, from, next) => {
  // 如果跳转到首页，确保滚动到顶部
  if (to.path === '/' || to.name === 'homepage') {
    // 立即滚动到顶部
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);
  }
  next();
});

// 全局后置钩子 - 设置页面标题
router.afterEach((to) => {
  const defaultTitle = '溯智 | 数字博物馆';
  const pageTitle = to && to.meta && to.meta.title ? `${to.meta.title} | 数字博物馆` : defaultTitle;
  document.title = pageTitle;
});

export default router
