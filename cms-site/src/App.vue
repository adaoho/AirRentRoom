<template>
  <!-- Log In Page -->
  <LoginPage
    v-if="currentPath === 'login'"
    @login-function="pageLogin"
    @change-page-function="changePath"
    @google-sign-in="googleSignIn"
  />

  <!-- Register Page -->
  <RegisterPage v-if="currentPath === 'register'" @register-function="pageRegister" />

  <!-- Show Dashboard & Sidebar -->
  <DashboardPage
    v-if="currentPath === 'dashboard'"
    :check-data-login="checkLogin"
    :dataUser="dataUser"
    :getDataLodgings="dataLodgings"
    :get-data-types="dataTypes"
    :get-data-logs="dataLogs"
  />
</template>

<script>
import axios from 'axios'
import LoginPage from './components/LoginPage.vue'
import RegisterPage from './components/RegisterPage.vue'
import DashboardPage from './components/DashboardPage.vue'

const BASE_URL = 'http://localhost:3000'

export default {
  components: {
    LoginPage,
    RegisterPage,
    DashboardPage
  },
  data() {
    return {
      currentPath: 'login',
      isLoggedIn: false,
      dataUser: [],
      dataLodgings: [],
      dataTypes: [],
      dataLogs: []
    }
  },
  methods: {
    changePath(newPath) {
      this.currentPath = newPath
    },

    async pageLogin(payload) {
      try {
        const { data } = await axios.post(BASE_URL + '/login', payload)
        localStorage.setItem('access_token', data.access_token)

        this.dataUser = data.user
        this.checkLogin()
      } catch (error) {
        console.log(error, '<<< Error from Axios Login')
      }
    },

    async pageRegister(payload) {
      try {
        const { data } = await axios.post(BASE_URL + '/register', payload)

        localStorage.setItem('access_token', data.access_token)
        this.checkLogin()
      } catch (error) {
        console.log(error, '<<< Error from Axios register')
      }
    },

    async googleSignIn(response) {
      try {
        // const { data } = await axios.post(BASE_URL + '/googleSignIn', payload, {
        //   headers: {
        //     google_token: data.access_token
        //   }
        // })
        // console.log(payload, '<<<< payload')

        console.log(response, '<<<<< response response')

        const { data } = await axios({
          url: BASE_URL + '/googleSignIn',
          method: 'post',
          headers: {
            google_token: response.credential
          }
        })

        // console.log(user, '<<< ini user')

        localStorage.setItem('access_token', data.access_token)

        this.checkLogin()
      } catch (error) {
        console.log(error, '<<< Error from Axios Login Google')
      }
    },

    async fetchLodgings() {
      try {
        const { data } = await axios.get(BASE_URL + '/lodgings', {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })

        this.dataLodgings = data.lodging
      } catch (error) {
        console.log(error)
      }
    },

    async fetchType() {
      try {
        const { data } = await axios.get(BASE_URL + '/types', {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })

        console.log(data, '<<this is data types')

        this.dataTypes = data.typeData
      } catch (error) {
        console.log(error)
      }
    },

    async fetchLogs() {
      try {
        const { data } = await axios.get(BASE_URL + '/logs', {
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })

        this.dataLogs = data.readLog
      } catch (error) {
        console.log(error)
      }
    },

    checkLogin() {
      const access_token = localStorage.getItem('access_token')
      // console.log(access_token)
      if (access_token) {
        this.currentPath = 'dashboard'
        this.dataUser
        this.fetchLodgings()
        this.fetchType()
        this.fetchLogs()
      } else {
        this.currentPath = 'login'
      }
    }
  },
  created() {
    this.checkLogin()
  }
}
</script>
