import './assets/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login'

const CLIENT_ID = '562751809124-c7i5dfoatpn5ssthsjr2k6uaf6iot7ur.apps.googleusercontent.com'

const app = createApp(App)

app.use(vue3GoogleLogin, { clientId: CLIENT_ID })
app.mount('#app')
