<script>
import { RouterLink } from 'vue-router'
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '../stores/user'

export default {
  name: 'LoginView',
  components: {},
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
        callback: (response) => {
          this.$emit(this.googleSignIn, response)
        }
      }
    }
  },
  methods: {
    ...mapActions(useUserStore, ['userLogin', 'googleSignIn']),
    loginSubmit() {
      this.userLogin(this.loginForm)
    },
    async handleCredentialResponse(response) {
      // console.log(response.credential, '<<< response credential google login')
      this.googleSignIn(response.credential)
    }
  },
  mounted() {
    const gClientId = '562751809124-c7i5dfoatpn5ssthsjr2k6uaf6iot7ur.apps.googleusercontent.com'
    window.google.accounts.id.initialize({
      client_id: gClientId,
      callback: this.handleCredentialResponse,
      auto_select: true
    })
    window.google.accounts.id.renderButton(this.$refs.googleLoginBtn, {
      text: 'signin', // or 'signup_with' | 'continue_with' | 'signin'
      type: 'text',
      size: 'large', // or 'small' | 'medium'
      width: '350', // max width 400
      theme: 'filled', // or 'filled_black' |  'filled_blue'
      logo_alignment: 'left', // or 'center',
      prompt: 'select'
    })
  }
}
</script>

<template>
  <!-- LogIn Page -->
  <section id="login-page" style="display: block">
    <div class="flex justify-center items-center h-full my-32">
      <div class="w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-900 dark:text-gray-100">
        <h1 class="text-2xl font-bold text-center">Login</h1>
        <form class="space-y-6" @submit.prevent="loginSubmit">
          <div class="space-y-1 text-sm">
            <label for="username" class="block dark:text-gray-400">Email</label>
            <input
              type="text"
              name="email"
              id="username"
              placeholder="Username"
              class="w-full px-4 py-3 rounded-md bg-gray-200 text-gray-500 focus:dark:border-violet-400"
              v-model="loginForm.email"
            />
          </div>
          <div class="space-y-1 text-sm">
            <label for="password" class="block dark:text-gray-400">Password</label>
            <input
              type="password"
              name="email"
              id="password"
              placeholder="Password"
              class="w-full px-4 py-3 rounded-md bg-gray-200 text-gray-500 focus:dark:border-violet-400"
              v-model="loginForm.password"
            />
            <div class="flex justify-end text-xs dark:text-gray-400">
              <a rel="noopener noreferrer" href="#">Forgot Password?</a>
            </div>
          </div>
          <button
            class="block w-full p-3 text-center rounded-md dark:text-gray-900 dark:bg-violet-400 hover:bg-violet-600 hover:text-white"
          >
            Sign in
          </button>
        </form>
        <div class="flex items-center pt-4 space-x-1">
          <div class="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p class="px-3 text-sm dark:text-gray-400">Login with social accounts</p>
          <div class="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>

        <!-- OAuth Section Logo -->

        <div class="flex justify-center items-center">
          <button ref="googleLoginBtn">Sign In With Google</button>
        </div>

        <!-- <div ref="googleLoginBtn" v-on:click.prevent="handleCredentialResponse" class="" /> -->
        <!-- <div
          class="relative bg-gray-800 flex items-center justify-center py-2 rounded-md my-4 hover:bg-green-700 hover:text-white transition-all"
          v-on:click.prevent="handleCredentialResponse"
        >
          Google SignIn
        </div> -->

        <p class="text-xs text-center sm:px-6 dark:text-gray-400">
          Don't have an account?
          <RouterLink to="/register" class="underline dark:text-gray-100">Sign up</RouterLink>
        </p>
      </div>
    </div>
  </section>
</template>
