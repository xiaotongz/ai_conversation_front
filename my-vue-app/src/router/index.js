import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/auth';
import LoginPage from '@/views/Login.vue';
import RegisterPage from '@/views/Register.vue';
import NotFoundPage from '@/views/NotFound.vue'; // 确保有 404 页面
import IndexPage from '@/layout/index.vue';
import HomePage from '@/views/main/Home.vue';
import PersonalInfoPage from '@/views/main/PersonalInfo.vue';
import TrainingPage from '@/views/main/Training.vue';
import ViewScoresPage from '@/views/main/ViewScores.vue';
import EmployeeManagementPage from '@/views/main/EmployeeManagement.vue';

const routes = [
  {
    path: '/index',
    name: 'IndexPage',
    component: IndexPage,
    meta: { requiresAuth: true },
    children:[
      {
        path: 'home',
        name: 'HomePage',
        component: HomePage,
        meta: { requiresAuth: true },
      },
      {
        path: 'personal',
        name: 'PersonalInfoPage',
        component: PersonalInfoPage,
        meta: { requiresAuth: false },
      },
      {
        path: 'training',
        name: 'TrainingPage',
        component: TrainingPage,
        meta: { requiresAuth: false },
      },
      {
        path: 'scores',
        name: 'ViewScoresPage',
        component: ViewScoresPage,
        meta: { requiresAuth: false },
      },
      {
        path: 'management',
        name: 'EmployeeManagementPage',
        component: EmployeeManagementPage,
        meta: { requiresAuth: false },
      },
    ]
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage,
    meta: { requiresAuth: false },
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage,
    meta: { requiresAuth: false },
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFoundPage',
    component: NotFoundPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = !!authStore.token; // 检查 token 是否存在
  console.log(authStore.token);
  console.log(isAuthenticated);

  if (to.meta.requiresAuth && !isAuthenticated) {
    // 如果需要认证但用户未认证，重定向到登录页面
    next({ name: 'LoginPage' });
  } else {
    // 允许访问页面
    next();
  }
});

export default router;
