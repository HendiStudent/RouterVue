<template>
  <div :class="themeClass">
    <Navbar :toggleTheme="toggleTheme" :isDark="isDark" />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import { ref, computed, provide } from 'vue'
import Navbar from './components/Navbar.vue'

export default {
  components: { Navbar },
  setup() {
    const isDark = ref(false)

    function toggleTheme() {
      isDark.value = !isDark.value
    }

    provide('isDark', isDark)

    const themeClass = computed(() => (isDark.value ? 'dark-theme' : 'light-theme'))

    return {
      isDark,
      toggleTheme,
      themeClass
    }
  }
}
</script>

<style>
.light-theme {
  --bg-color: #fff;
  --text-color: #333;
  --nav-bg: #2e7d32;
  --nav-text: white;
  --link-hover-bg: rgba(255, 255, 255, 0.2);
  --button-bg: transparent;
  --button-border: white;
}


body, html, #app {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-color);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

main {
  padding: 20px;
  max-width: 960px;
  margin: 0 auto;
}
</style>
