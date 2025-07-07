import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './Router/index'

import { Quasar } from 'quasar'
import 'quasar/dist/quasar.css'
import '@quasar/extras/material-icons/material-icons.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Quasar, { plugins: {} }) // ✅ penting

app.mount('#app')
