<script>
import { mapActions, mapState } from 'pinia'
import { useLodgingStore } from '../stores/lodging'
import { RouterLink } from 'vue-router'

export default {
  name: 'PaginationComponent',
  data() {
    return {
      page: 1
    }
  },
  props: ['totalPage'],
  emits: ['changePage'],
  methods: {
    newPage(page) {
      // console.log(page)
      this.$emit('changePage', page)
    }
  }
}
</script>
<template>
  <div class="relative join h-[100px]">
    <button
      v-for="pageNumber in totalPage"
      :key="pageNumber"
      class="join-item btn"
      @click="newPage(pageNumber)"
    >
      {{ pageNumber }}
    </button>
  </div>
</template>
