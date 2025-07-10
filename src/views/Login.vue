<template>
  <div class="login-container">
    <div class="login-wrapper">
      <img src="../assets/logo.png" alt="Sawit Kita Logo" class="logo" />
      <form @submit.prevent="handleLogin" class="login-form">
        <h2>Login</h2>
        <div v-if="error" class="error">{{ error }}</div>
        <input v-model="username" placeholder="Username" required :disabled="isLoading" />
        <input v-model="password" type="password" placeholder="Password" required :disabled="isLoading" />
        <button type="submit" :disabled="isLoading">
          {{ isLoading ? 'Loading...' : 'Login' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref(null)
const isLoading = ref(false)

const authStore = useAuthStore()
const router = useRouter()

const handleLogin = async () => {
  isLoading.value = true
  try {
    const success = authStore.login(username.value, password.value)
    if (success) {
      error.value = null
      router.push('/')
    } else {
      error.value = 'Username atau password salah'
    }
  } finally {
    isLoading.value = false
  }
}
</script>


<style scoped>

:root {
  --bg-color: #ffffff;
  --text-color: #333333;
  --navbar-bg: linear-gradient(135deg, #2d5a27 0%, #4a7c59 50%, #2d5a27 100%);
  --accent-color: #ff6b35;
  --card-bg: #f9f9f9;
  --border-color: rgba(0, 0, 0, 0.1);
  --shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  --gradient-border: linear-gradient(135deg, #2d5a27, #4a7c59);
}


.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 70px); 
  background: var(--bg-color);
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.login-wrapper {
  max-width: 450px;
  width: 100%;
  background: var(--card-bg);
  border-radius: 16px;
  padding: 40px 30px;
  position: relative;
  box-shadow: var(--shadow);
  border: 2px solid transparent;
  background-clip: padding-box;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.login-wrapper::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: var(--gradient-border);
  border-radius: 16px;
  z-index: -1;
}

.login-wrapper:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 30px rgba(255, 107, 53, 0.2);
}

.logo {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  border: 2px solid var(--border-color);
  margin: 0 auto 20px;
  display: block;
  transition: transform 0.3s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.login-form {
  text-align: center;
}

h2 {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--accent-color);
  margin-bottom: 20px;
  text-transform: uppercase;
  letter-spacing: -0.5px;
}

.error {
  text-align: center;
  font-size: 0.9rem;
  color: #ff4444;
  background: rgba(255, 68, 68, 0.1);
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 1rem;
  background: var(--bg-color);
  color: var(--text-color);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus {
  border-color: var(--accent-color);
  box-shadow: 0 0 8px rgba(255, 107, 53, 0.3);
  outline: none;
}

input:disabled {
  background: rgba(108, 117, 125, 0.1);
  cursor: not-allowed;
}

button {
  width: 100%;
  padding: 12px;
  background: var(--navbar-bg);
  color: rgb(244, 126, 67);
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease,var(--accent-color);
}

button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(45, 90, 39, 0.4);
}

button:disabled {
  background: #455f76;
  cursor: not-allowed;
}

button:focus {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

/* Responsive */
@media (max-width: 768px) {
  .login-wrapper {
    padding: 30px 20px;
  }

  h2 {
    font-size: 1.8rem;
  }

  .logo {
    width: 80px;
    height: 80px;
  }

  input,
  button {
    font-size: 0.95rem;
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .login-wrapper {
    padding: 20px 15px;
  }

  h2 {
    font-size: 1.5rem;
  }

  .logo {
    width: 60px;
    height: 60px;
  }

  input,
  button {
    font-size: 0.9rem;
    padding: 8px;
  }
}


input:focus,
button:focus,
h2:focus,
.logo:focus {
  outline: 2px solid var(--accent-color);
  outline-offset: 2px;
}

* {
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}
</style>