import { createRouter, createWebHistory } from 'vue-router'

// Import semua views
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Sejarah from '../views/Sejarah.vue'
import Manfaat from '../views/Manfaat.vue'
import Produksi from '../views/Produksi.vue'
import JualBeli from '../views/JualBeli.vue'
import Jasa from '../views/Jasa.vue'
import DetailPemesan from '../views/DetailPemesan.vue'

import { useAuthStore } from '../stores/authStore'

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/', name: 'Home', component: Home, meta: { requiresAuth: true } },
  { path: '/sejarah', name: 'Sejarah', component: Sejarah, meta: { requiresAuth: true } },
  { path: '/manfaat', name: 'Manfaat', component: Manfaat, meta: { requiresAuth: true } },
  { path: '/produksi', name: 'Produksi', component: Produksi, meta: { requiresAuth: true } },
  { path: '/jualbeli', name: 'JualBeli', component: JualBeli, meta: { requiresAuth: true } },
  { path: '/jasa', name: 'Jasa', component: Jasa, meta: { requiresAuth: true } },
  { path: '/detail-pemesan', name: 'DetailPemesan', component: DetailPemesan, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', redirect: '/login' } // jika route tidak cocok, redirect ke login
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// ✅ Navigation guard
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    next('/login')
  } else if (to.name === 'Login' && auth.isLoggedIn) {
    next('/')
  } else {
    next()
  }
})

export default router
