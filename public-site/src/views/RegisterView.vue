<script>
import { RouterLink } from 'vue-router'
import { mapActions, mapState } from 'pinia'
import { useUserStore } from '../stores/user'

export default {
  name: 'Air Rent Room',
  data() {
    return {
      registerForm: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    ...mapActions(useUserStore, ['userRegister']),
    registerSubmit() {
      this.userRegister(this.registerForm)
    }
  }
}
</script>
<template>
  <!-- Register Page -->
  <section id="login-page" style="display: block">
    <div class="flex justify-center items-center h-full my-32">
      <div class="w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-900 dark:text-gray-100">
        <h1 class="text-2xl font-bold text-center">Sign Up Now</h1>
        <form class="space-y-6" @submit.prevent="registerSubmit">
          <div class="space-y-1 text-sm">
            <label for="username" class="block dark:text-gray-400">Email</label>
            <input
              type="text"
              name="email"
              id="username"
              placeholder="Username"
              class="w-full px-4 py-3 rounded-md bg-gray-200 text-gray-500 focus:dark:border-violet-400"
              v-model="registerForm.email"
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
              v-model="registerForm.password"
            />
          </div>
          <div class="flex items-center -py-3 space-x-1">
            <div class="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
            <p class="px-3 text-sm dark:text-gray-400">Create your Account Now</p>
            <div class="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          </div>
          <button
            class="block w-full p-3 text-center rounded-md dark:text-gray-900 dark:bg-violet-400 hover:bg-violet-600"
          >
            Register Now
          </button>
        </form>
        <p class="text-xs text-center sm:px-6 py-2 dark:text-gray-400">
          Already have an account?
          <RouterLink to="/login" class="underline dark:text-gray-100">Log In Right Now</RouterLink>
        </p>
      </div>
    </div>
  </section>
</template>
