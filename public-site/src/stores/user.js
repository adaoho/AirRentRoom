import { API_URL } from '../../config/api'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      // mirip dengan data di component
      isLogin: false,
      customerEmail: ''
    }
  },
  getters: {
    // mirip dengan computed di component
  },
  actions: {
    async userRegister(registerForm) {
      try {
        const response = await axios.post(API_URL + '/public/register', registerForm)
        const data = response.data
        localStorage.setItem('access_token', data.access_token)
        this.isLogin = true
        this.router.push('/login')
      } catch (error) {
        console.log(error)
      }
    },

    async userLogin(loginForm) {
      try {
        const response = await axios.post(API_URL + '/public/login', loginForm)
        const data = response.data
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('customer', data.customer)
        this.isLogin = true
        this.customerEmail = data.customer
        this.router.push('/')
      } catch (error) {
        console.log(error)
      }
    },

    async googleSignIn(response) {
      try {
        // console.log(response, 'this is response from googleSignIn')

        const { data } = await axios({
          url: API_URL + '/public/googleLogin',
          method: 'post',
          headers: {
            google_token: response
          }
        })

        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('customer', data.customer)
        this.isLogin = true
        this.router.push('/')
      } catch (error) {
        console.log(error, '<<< Error from Axios Login Google')
      }
    },

    async userLogOut() {
      try {
        localStorage.clear()
        this.isLogin = false
        this.router.push('/')
      } catch (error) {
        console.log(error)
      }
    },

    async checkLogin() {
      try {
        const tokenCheck = localStorage.getItem('access_token')
        const getEmail = localStorage.getItem('customer')

        if (tokenCheck) {
          this.isLogin = true
          this.customerEmail = `${getEmail}`
        } else {
          this.isLogin = false
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
})
