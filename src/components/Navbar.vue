<template>
  <nav :style="{ backgroundColor: 'var(--nav-bg)', color: 'var(--nav-text)' }" class="navbar">
    <ul class="nav-links">
      <li><router-link to="/" exact>Home</router-link></li>
      <li><router-link to="/sejarah">Sejarah</router-link></li>
      <li><router-link to="/manfaat">Manfaat</router-link></li>
      <li><router-link to="/produksi">Produksi</router-link></li>
      <li><router-link to="/jualbeli">Jual Beli</router-link></li>
      <li><router-link to="/jasa">Jasa</router-link></li>
      <li><router-link to="/kontak">Kontak</router-link></li>
    </ul>

    <div class="flex gap-2 items-center">
      <button class="theme-toggle" @click="toggleTheme" :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'">
        <span v-if="isDark">☀️ Light Mode</span>
        <span v-else>🌙 Dark Mode</span>
      </button>

      <!-- ✅ Tombol Login/Logout -->
      <button v-if="!auth.isLoggedIn" @click="router.push('/login')" class="theme-toggle">Login</button>
      <button v-else @click="logout" class="theme-toggle">Logout</button>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'
import { toRefs } from 'vue'

const props = defineProps({
  toggleTheme: { type: Function, required: true },
  isDark: { type: Boolean, required: true }
})

const { toggleTheme, isDark } = toRefs(props)
const auth = useAuthStore()
const router = useRouter()

const logout = () => {
  auth.logout()
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  user-select: none;
}

.nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
}

.nav-links li {
  font-weight: 600;
}

a {
  color: var(--nav-text);
  text-decoration: none;
  padding: 6px 10px;
  border-radius: 6px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

a.router-link-exact-active {
  background-color: #fbc02d;
  color: #333;
  font-weight: 700;
}

a:hover {
  background-color: var(--link-hover-bg);
  color: var(--nav-text);
}

.theme-toggle {
  background-color: var(--button-bg);
  border: 1.5px solid var(--button-border);
  color: var(--nav-text);
  padding: 7px 14px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  user-select: none;
}

.theme-toggle:hover {
  background-color: var(--link-hover-bg);
}

/* Responsive */
@media (max-width: 680px) {
  .navbar {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  .nav-links {
    flex-wrap: wrap;
    gap: 12px;
  }
}
</style>
