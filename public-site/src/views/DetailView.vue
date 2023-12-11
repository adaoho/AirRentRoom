<script>
import { mapActions, mapState } from 'pinia'
import Navbar from '../components/Navbar.vue'
import { HomeIcon, BanknotesIcon, MapIcon, CubeIcon, UserIcon } from '@heroicons/vue/24/solid'
import { useLodgingStore } from '../stores/lodging'

export default {
  name: 'DetailView',
  components: { Navbar, HomeIcon, BanknotesIcon, MapIcon, CubeIcon, UserIcon },
  props: ['id'],
  // data() {
  //   return {
  //     // currentId: this.id ? this.id : 1
  //   }
  // },
  methods: {
    ...mapActions(useLodgingStore, ['getDetailLodging', 'postBookmark']),
    currencyFormatted(number) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
      }).format(number)
    },
    clickBookmark(id) {
      this.postBookmark(id)
    }
  },
  computed: {
    ...mapState(useLodgingStore, ['dataDetailLodging', 'qrcode'])
  },
  created() {
    this.getDetailLodging(this.$route.params.id)
  }
}
</script>
<template>
  {{ console.log(dataDetailLodging, '<<<<< at view detail lodging') }}
  <section class="bg-gray-800 dark:text-gray-100 h-screen items-center justify-center p-14">
    <!-- Left Component -->
    <div class="gap-6 mx-12 text-left flex flex-row">
      <div
        class="flex flex-col w-5/12 px-6 py-16 rounded-md sm:px-12 md:px-16 xl:col-span-2 bg-gray-900"
      >
        <span class="block mb-2 dark:text-violet-400"
          >{{ dataDetailLodging.Type.name }} Category</span
        >
        <h1 class="text-5xl font-extrabold dark:text-gray-50">{{ dataDetailLodging.name }}</h1>
        <p class="my-6 text-[15px]">
          <span class="font-medium dark:text-gray-50 text-">{{ dataDetailLodging.facility }}</span>
        </p>
        <div id="description" class="flex flex-col gap-y-2 mb-5 justify-center">
          <p class="font-semibold">What this room Offer?</p>
          <div class="flex flex-col-2 gap-x-12 py-2 justify-between">
            <div class="flex flex-col text-purple-400">
              <div class="flex flex-row gap-x-3">
                <UserIcon class="h-5 w-5 text-purple-400 hover:text-primary" />
                <p class="text-purple-400">
                  {{ dataDetailLodging.roomCapacity }}
                  {{ dataDetailLodging.roomCapacity > 1 ? 'persons' : 'person' }}
                </p>
              </div>
              <div class="flex flex-row gap-x-3">
                <HomeIcon class="h-5 w-5 text-purple-400 hover:text-primary" />
                <p class="text-purple-400">{{ dataDetailLodging.facility }}</p>

                <p class=""></p>
              </div>
            </div>
            <div class="flex flex-col">
              <div class="flex flex-row gap-x-3">
                <p class="text-gray-500">Room Capacity</p>
              </div>
              <div class="flex flex-row gap-x-3">
                <p class="text-gray-500">Facility</p>
              </div>
            </div>
          </div>
          <div class="flex flex-row gap-x-3">
            <MapIcon class="h-5 w-5" />
            <p class="">{{ dataDetailLodging.location }}</p>
          </div>
          <div class="divider my-3 relative"></div>
          <div class="flex justify-between">
            <h1>Total Before Taxes</h1>
            <h1 class="font-semibold">{{ this.currencyFormatted(dataDetailLodging.price) }}</h1>
          </div>
          <div class="divider my-3 relative"></div>
        </div>

        <div class="relative flex flex-row gap-x-2 my-2">
          <button
            type="button"
            class="w-full py-2 font-semibold rounded bg-gray-600 text-white hover:scale-110 hover:bg-gray-500 transition-all"
            onclick="my_modal_5.showModal()"
          >
            Share Now
          </button>
          <button
            type="button"
            class="w-full py-2 font-semibold rounded bg-purple-600 text-white hover:scale-110 hover:bg-purple-500 transition-all"
            @click.prevent="clickBookmark(dataDetailLodging.id)"
          >
            Add to Bookmark
          </button>
        </div>
      </div>

      <!-- Image Right Side -->
      <div class="relative flex gap-6 mx-auto text-left flex-col w-8/12">
        <img
          :src="dataDetailLodging.imgUrl"
          alt=""
          class="object-cover w-full h-full rounded-md xl:col-span-3 dark:bg-gray-500"
        />
      </div>
    </div>
  </section>

  <!-- QR Code Modal -->
  <section id="showQr">
    <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box flex justify-center items-center flex-col">
        <img :src="`data:image/png;base64,${qrcode}`" class="w-[400px] h-[400px]" />
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  </section>
</template>
