<script>
import { mapActions, mapState } from 'pinia'
import { useLodgingStore } from '../stores/lodging'
import CardComponent from '../components/CardComponent.vue'
import { RouterLink } from 'vue-router'

export default {
  name: 'BookmarkView',
  components: {
    CardComponent
  },
  data() {
    return {
      type: 'bookmark'
    }
  },
  computed: {
    ...mapState(useLodgingStore, ['dataBookmarks'])
  },
  methods: {
    ...mapActions(useLodgingStore, ['getBookmark'])
  },
  created() {
    this.getBookmark()
  }
}
</script>
<template>
  <!-- if data bookmark exists -->
  <section id="dasboard-main" v-if="dataBookmarks.length > 0">
    <div class="flex gap-x-5 py-5 mx-20">
      <RouterLink :to="{ name: 'home' }">
        <section id="card-component" class="flex justify-center flex-row gap-x-6 flex-wrap">
          <RouterLink
            v-for="Lodging in dataBookmarks"
            :key="Lodging.id"
            :to="`/bookmark/${Lodging.LodgingId}`"
          >
            <CardComponent :bookmark="Lodging" :type="type" />
          </RouterLink>
        </section>
      </RouterLink>
    </div>
  </section>

  <!-- if data bookmark is not exists -->

  <section id="dasboard-main" v-if="dataBookmarks.length === 0">
    <div class="flex gap-x-5 py-5 mx-20 items-center justify-center h-[600px]">
      <h1>You Don't Have any Bookmark yet</h1>
    </div>
  </section>
</template>
