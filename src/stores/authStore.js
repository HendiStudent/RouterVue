import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false
  }),
  actions: {
    login(username, password) {
      // Contoh validasi login sederhana
      if (username === 'admin' && password === '1234') {
        this.isLoggedIn = true
        return true
      } else {
        return false
      }
    },
    logout() {
      this.isLoggedIn = false
    }
  }
})
