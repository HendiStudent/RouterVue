<template>
  <div class="flex justify-center items-center h-screen">
    <form @submit.prevent="login" class="bg-white p-8 rounded shadow-md w-80">
      <h2 class="text-2xl font-bold mb-4 text-center">Login</h2>
      <input v-model="username" placeholder="Username" class="border p-2 mb-4 w-full" required>
      <input v-model="password" placeholder="Password" type="password" class="border p-2 mb-4 w-full" required>
      <button type="submit" class="bg-green-500 text-white px-4 py-2 rounded w-full">Login</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/authStore'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()

const login = () => {
  const success = authStore.login(username.value, password.value)
  if (success) {
    router.push('/Home')
  } else {
    alert('Username atau password salah')
  }
}
</script>
