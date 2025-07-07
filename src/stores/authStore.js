import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null
  }),
  actions: {
    login(username, password) {
      // Dummy authentication
      if (username === 'admin' && password === '123') {
        this.user = { username }
        return true
      }
      return false
    },
    logout() {
      this.user = null
    }
  },
  getters: {
    isLoggedIn: (state) => !!state.user
  }
})
