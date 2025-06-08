import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/auth';

import Home from '../views/Home.vue';
import Login from '../views/auth/Login.vue';
import Register from '../views/auth/Register.vue';
import ChargerList from '../views/chargers/ChargerList.vue';
import ChargerMap from '../views/chargers/ChargerMap.vue';
import AddCharger from '../views/chargers/AddCharger.vue';
// import EditCharger from '../views/chargers/EditCharger.vue';
import AdminDashboard from '../views/admin/AdminDashboard.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { public: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { public: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { public: true }
  },
  {
    path: '/chargers',
    name: 'ChargerList',
    component: ChargerList,
    meta: { requiresAuth: true }
  },
  {
    path: '/chargers/map',
    name: 'ChargerMap',
    component: ChargerMap,
    meta: { requiresAuth: true }
  },
  {
    path: '/chargers/add',
    name: 'AddCharger',
    component: AddCharger,
    // meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/chargers/edit/:id',
    name: 'EditCharger',
      component: () => import('../views/chargers/EditCharger.vue'),
    // meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin',
    name: 'AdminDashboard',
    component: AdminDashboard,
    // meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { public: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});

router.beforeEach((to, _from, next) => {
  const authStore = useAuthStore();

  // Always check token on navigation
  authStore.checkAuth();

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'Login' });
    return;
  }

  if (authStore.isAuthenticated && (to.name === 'Login' || to.name === 'Register')) {
    next({ name: 'ChargerList' });
    return;
  }

  next();
});

export default router;