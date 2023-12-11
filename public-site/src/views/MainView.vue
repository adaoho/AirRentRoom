<script>
import { RouterView } from 'vue-router'
import Navbar from '../components/Navbar.vue'

export default {
  name: 'ParentView',
  components: {
    RouterView,
    Navbar
  }
}
</script>

<template>
  <Navbar />
  <div>
    <RouterView />
  </div>
</template>
