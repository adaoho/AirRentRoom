import './assets/style.css'

import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
const CLIENT_ID = '562751809124-c7i5dfoatpn5ssthsjr2k6uaf6iot7ur.apps.googleusercontent.com'

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

app.use(pinia)
app.use(router)

app.mount('#app')
