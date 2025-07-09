<template>
  <nav class="navbar">
    <div class="nav-container">
      <!-- Logo & Brand -->
      <div class="nav-brand">
        <div class="logo">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" 
                  fill="currentColor" class="star-icon"/>
            <path d="M12 8C8.13 8 5 11.13 5 15C5 18.87 8.13 22 12 22C15.87 22 19 18.87 19 15C19 11.13 15.87 8 12 8Z" 
                  fill="currentColor" class="palm-icon"/>
            <path d="M12 10V20M8 12L16 18M16 12L8 18" 
                  stroke="white" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        </div>
        <span class="brand-text">
          <span class="brand-main">Sawit</span>
          <span class="brand-accent">Kita</span>
        </span>
      </div>

      <!-- Mobile Menu Button -->
      <button class="mobile-menu-btn" @click="toggleMobileMenu">
        <span :class="['hamburger', { 'active': isMobileMenuOpen }]"></span>
        <span :class="['hamburger', { 'active': isMobileMenuOpen }]"></span>
        <span :class="['hamburger', { 'active': isMobileMenuOpen }]"></span>
      </button>

      <!-- Navigation Links -->
      <div :class="['nav-content', { 'mobile-open': isMobileMenuOpen }]">
        <ul class="nav-links">
          <li>
            <router-link to="/" exact @click="closeMobileMenu">
              <svg class="nav-icon" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
              <span>Home</span>
            </router-link>
          </li>
          <li>
            <router-link to="/sejarah" @click="closeMobileMenu">
              <svg class="nav-icon" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span>Sejarah</span>
            </router-link>
          </li>
          <li>
            <router-link to="/manfaat" @click="closeMobileMenu">
              <svg class="nav-icon" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span>Manfaat</span>
            </router-link>
          </li>
          <li>
            <router-link to="/produksi" @click="closeMobileMenu">
              <svg class="nav-icon" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span>Produksi</span>
            </router-link>
          </li>

          <!-- MENU KHUSUS ADMIN -->
          <template v-if="auth.isLoggedIn">
            <li>
              <router-link to="/jualbeli" @click="closeMobileMenu">
                <svg class="nav-icon" viewBox="0 0 24 24">
                  <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12L8.1 13h7.45c.75 0 1.41-.41 1.75-1.03L21.7 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
                </svg>
                <span>Jual Beli</span>
              </router-link>
            </li>
            <li>
              <router-link to="/jasa" @click="closeMobileMenu">
                <svg class="nav-icon" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>Jasa</span>
              </router-link>
            </li>
            <li>
              <router-link to="/detail-pemesan" @click="closeMobileMenu">
                <svg class="nav-icon" viewBox="0 0 24 24">
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>
                </svg>
                <span>Detail Pemesan</span>
              </router-link>
            </li>
          </template>
        </ul>

        <!-- Action Buttons -->
        <div class="nav-actions">
          <div class="auth-section">
            <button v-if="!auth.isLoggedIn" @click="handleLogin" class="auth-btn login-btn">
              <svg class="auth-icon" viewBox="0 0 24 24">
                <path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v12z"/>
              </svg>
              <span>Login</span>
            </button>
            <button v-else @click="logout" class="auth-btn logout-btn">
              <svg class="auth-icon" viewBox="0 0 24 24">
                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
              </svg>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const auth = useAuthStore()
const router = useRouter()

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

const handleLogin = () => {
  router.push('/login')
  closeMobileMenu()
}

const logout = () => {
  auth.logout()
  router.push('/login')
  closeMobileMenu()
}
</script>


<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: linear-gradient(135deg, #2d5a27 0%, #4a7c59 50%, #2d5a27 100%);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
}

.logo {
  width: 45px;
  height: 45px;
  background: linear-gradient(135deg, #ff6b35, #f7931e);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
  transition: all 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 25px rgba(255, 107, 53, 0.4);
}

.logo svg {
  width: 24px;
  height: 24px;
  color: white;
}

.star-icon {
  opacity: 0.8;
}

.palm-icon {
  opacity: 0.6;
}

.brand-text {
  font-size: 1.8rem;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.brand-main {
  color: #ffffff;
}

.brand-accent {
  color: #ff6b35;
  margin-left: 2px;
}

.mobile-menu-btn {
  display: none;
  flex-direction: column;
  gap: 4px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.mobile-menu-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.hamburger {
  width: 24px;
  height: 3px;
  background: white;
  transition: all 0.3s ease;
  border-radius: 2px;
}

.hamburger.active:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.hamburger.active:nth-child(2) {
  opacity: 0;
}

.hamburger.active:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

.nav-content {
  display: flex;
  align-items: center;
  gap: 30px;
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 8px;
}

.nav-links li {
  position: relative;
}

.nav-links a {
  display: flex;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  padding: 12px 16px;
  border-radius: 10px;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-links a::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.nav-links a:hover::before {
  left: 100%;
}

.nav-links a:hover {
  color: white;
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.nav-links a.router-link-active {
  color: #ff6b35;
  background: rgba(255, 107, 53, 0.15);
  font-weight: 600;
}

.nav-links a.router-link-active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 30px;
  height: 3px;
  background: #ff6b35;
  border-radius: 2px;
  transform: translateX(-50%);
}

.nav-icon {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 15px;
}

.theme-toggle {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.theme-icon {
  width: 20px;
  height: 20px;
  fill: currentColor;
}

.auth-section {
  display: flex;
  align-items: center;
  gap: 10px;
}

.auth-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  text-decoration: none;
}

.login-btn {
  background: linear-gradient(135deg, #ff6b35, #f7931e);
  color: white;
  border: 2px solid transparent;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 53, 0.4);
  border-color: rgba(255, 255, 255, 0.3);
}

.logout-btn {
  background: transparent;
  color: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.logout-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.5);
}

.auth-icon {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .mobile-menu-btn {
    display: flex;
  }

  .nav-content {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #2d5a27 0%, #4a7c59 50%, #2d5a27 100%);
    backdrop-filter: blur(10px);
    flex-direction: column;
    gap: 20px;
    padding: 30px 20px;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .nav-content.mobile-open {
    transform: translateX(0);
  }

  .nav-links {
    flex-direction: column;
    width: 100%;
    gap: 10px;
  }

  .nav-links a {
    padding: 15px 20px;
    font-size: 1rem;
    justify-content: flex-start;
  }

  .nav-actions {
    width: 100%;
    justify-content: center;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 20px;
  }

  .auth-btn {
    width: 100%;
    justify-content: center;
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: 0 15px;
  }

  .brand-text {
    font-size: 1.5rem;
  }

  .logo {
    width: 40px;
    height: 40px;
  }

  .logo svg {
    width: 20px;
    height: 20px;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .navbar {
    background: linear-gradient(135deg, #1a2e1a 0%, #2d4a2d 50%, #1a2e1a 100%);
  }
}

/* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}

/* Focus styles for accessibility */
.nav-links a:focus,
.auth-btn:focus,
.theme-toggle:focus {
  outline: 2px solid #ff6b35;
  outline-offset: 2px;
}
</style>