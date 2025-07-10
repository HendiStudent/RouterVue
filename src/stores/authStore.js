import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isLoggedIn: false
  }),
  actions: {
    login(username, password) {
      
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
