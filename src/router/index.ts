import { createRouter, createWebHistory } from 'vue-router';
import { authSetStore } from '@/stores/AuthStore';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import RestoreView from '@/views/RestoreView.vue';
import DashboardView from '@/views/DashboardView.vue';
import ColoringBooksView from '@/views/ColoringBooksView.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { layout: 'AuthLayout' }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: { layout: 'AuthLayout' }
    },
    {
      path: '/restore',
      name: 'restore',
      component: RestoreView,
      meta: { layout: 'AuthLayout' }
    },

    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { layout: 'WireframeLayout' }
    },
    {
    path: '/coloring-books',
    name: 'coloring-books',
    component:ColoringBooksView,
    meta: { layout: 'WireframeLayout' }
    }

  ]
});

router.beforeEach((to, from, next) => {
  const authStore = authSetStore();

  if (to.meta.requiresAuth && !authStore.isAuthenticated()) {
    next('/login');
  } else {
    next();
  }
});

export default router;
