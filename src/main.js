import { createApp } from 'vue'
import App from './App.vue'
import router from './Router/index.js'

const app = createApp(App)

app.use(router)

app.mount('#app')
