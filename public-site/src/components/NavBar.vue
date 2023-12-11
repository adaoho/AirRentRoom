<script>
import { mapState, mapActions } from 'pinia'
import { useUserStore } from '../stores/user'
import { RouterLink } from 'vue-router'

export default {
  name: 'Navbar',
  data() {
    return {
      customer: ''
    }
  },
  methods: {
    ...mapActions(useUserStore, ['userLogOut']),

    buttonLogout() {
      this.userLogOut()
    }
  },
  computed: {
    ...mapState(useUserStore, ['isLogin', 'checkLogin', 'customerEmail'])
  },
  created() {
    this.checkLogin()
  }
}
</script>

<template>
  <div class="navbar bg-base-100 px-16 py-4 mb-3">
    <div class="navbar-start">
      <a class="btn btn-ghost normal-case text-xl">Air Rent Room</a>
    </div>
    <div class="navbar-end" v-if="isLogin === false">
      <RouterLink to="/login" class="btn">Login</RouterLink>
    </div>

    <!-- End of The Navbar -->

    <div class="navbar-end" v-if="isLogin === true">
      <div v-if="isLogin === true" class="flex flex-row gap-x-6 mr-8">
        <p class="text-gray-500 font-thin">Welcome {{ customerEmail }} !</p>
        <RouterLink
          :to="{ component: 'MainView', path: '/' }"
          class="hover:text-purple-500 duration-300"
          >Home</RouterLink
        >
        <RouterLink to="/bookmark" class="hover:text-purple-500 duration-300"
          >My Bookmark</RouterLink
        >
      </div>
      <a class="btn" @click.prevent="buttonLogout">Logout</a>
    </div>
  </div>
</template>
