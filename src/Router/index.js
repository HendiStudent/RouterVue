import { createRouter, createWebHistory } from 'vue-router'

// Import semua views
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Sejarah from '../views/Sejarah.vue'
import Manfaat from '../views/Manfaat.vue'
import Produksi from '../views/Produksi.vue'
import JualBeli from '../views/JualBeli.vue'
import Jasa from '../views/Jasa.vue'
import Kontak from '../views/Kontak.vue'
//import Dashboard from '../views/Dashboard.vue'

// Import Pinia store untuk auth
import { useAuthStore } from '../stores/authStore'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
//  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/sejarah', name: 'Sejarah', component: Sejarah },
  { path: '/manfaat', name: 'Manfaat', component: Manfaat },
  { path: '/produksi', name: 'Produksi', component: Produksi },
  { path: '/jualbeli', name: 'JualBeli', component: JualBeli },
  { path: '/jasa', name: 'Jasa', component: Jasa },
  { path: '/kontak', name: 'Kontak', component: Kontak },
  { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 } 
  }
})

// ✅ Navigation guard: proteksi route dashboard
router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if (to.name === 'Dashboard' && !auth.isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
