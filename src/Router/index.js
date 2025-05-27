import { createRouter, createWebHistory } from 'vue-router'

// Import semua views
import Home from '../views/Home.vue'
import Sejarah from '../views/Sejarah.vue'
import Manfaat from '../views/Manfaat.vue'
import Produksi from '../views/Produksi.vue'
import JualBeli from '../views/JualBeli.vue'
import Jasa from '../views/Jasa.vue'
import Kontak from '../views/Kontak.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
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

export default router
