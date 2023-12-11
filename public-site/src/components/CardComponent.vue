<script>
import { HeartIcon } from '@heroicons/vue/24/solid'
import { mapState, mapWritableState } from 'pinia'
import { useLodgingStore } from '../stores/lodging'

export default {
  name: 'CardComponent',
  components: { HeartIcon },
  props: ['lodging', 'type', 'bookmark', 'redirectToBookmark'],
  computed: {
    ...mapWritableState(useLodgingStore, ['isBookmark'])
  },
  methods: {
    currencyFormatted(number) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
      }).format(number)
    },
    isBookmarkCheck() {
      if (!this.isBookmark) {
        this.isBookmark = true
      } else {
        this.isBookmark = false
      }
    }
  }
}
</script>
<template>
  <!-- Home Card -->
  <section id="homeCard" v-if="type === 'home'" @click="redirectToBookmark">
    <div class="card w-[320px] h-[304px] bg-base-100 shadow-2xl mb-5">
      <figure>
        <img :src="lodging.imgUrl" alt="Shoes" class="object-cover" />
        <HeartIcon
          class="h-6 w-6 absolute right-3 top-2 text-gray-700 hover:text-primary"
          v-if="isBookmark === false"
          @click.prevent="isBookmarkCheck()"
        />
        <HeartIcon
          class="h-6 w-6 absolute right-3 top-2 text-primary hover:text-gray-700"
          v-if="isBookmark === true"
          @click.prevent="isBookmarkCheck()"
        />
      </figure>
      <div class="card-body flex flex-col items-start">
        <div class="flex items-center justify-between gap-x-2">
          <h2 class="card-title">{{ lodging.name }}</h2>
          <div class="card-actions justify-end">
            <div
              class="badge badge-outline text-[9px] items-center justify-center hover:text-yellow-100"
            >
              {{ lodging.Type.name }}
            </div>
          </div>
        </div>
        <p class="text-[13px] text-gray-600">{{ lodging.location }}</p>
        <p class="text-[15px] font-bold">{{ this.currencyFormatted(lodging.price) }}</p>
      </div>
    </div>
  </section>

  <!-- Bookmark Card -->
  <section id="homeCard" v-if="type === 'bookmark'" @click="redirectToBookmark">
    <div class="card w-[320px] h-[304px] bg-base-100 shadow-2xl mb-5">
      <figure>
        <img :src="bookmark.Lodging.imgUrl" alt="Shoes" class="object-cover" />
        <HeartIcon
          class="h-6 w-6 absolute right-3 top-2 text-gray-700 hover:text-primary"
          v-if="isBookmark === false"
          @click.prevent="isBookmarkCheck()"
        />
        <HeartIcon
          class="h-6 w-6 absolute right-3 top-2 text-primary hover:text-gray-700"
          v-if="isBookmark === true"
          @click.prevent="isBookmarkCheck()"
        />
      </figure>
      <div class="card-body flex flex-col items-start">
        <div class="flex items-center justify-between gap-x-2">
          <h2 class="card-title">{{ bookmark.Lodging.name }}</h2>
          <div class="card-actions justify-end">
            <div
              class="badge badge-outline text-[9px] items-center justify-center hover:text-yellow-100"
            >
              {{ bookmark.Lodging.Type.name }}
            </div>
          </div>
        </div>
        <p class="text-[13px] text-gray-600">{{ bookmark.Lodging.location }}</p>
        <p class="text-[15px] font-bold">{{ this.currencyFormatted(bookmark.Lodging.price) }}</p>
      </div>
    </div>
  </section>
</template>
