<script>
import CardComponent from '../components/CardComponent.vue'
import CarouselComponent from '../components/CarouselComponent.vue'
import CheckBox from '../components/CheckBox.vue'
import Navbar from '../components/Navbar.vue'
import PaginationComponent from '../components/PaginationComponent.vue'
import { mapActions, mapState } from 'pinia'
import { useLodgingStore } from '../stores/lodging'
import { RouterLink } from 'vue-router'

// Import Pinianya di sini

export default {
  name: 'HomeView',
  props: ['label'],
  data() {
    return {
      type: 'home',
      paramsFilter: {
        name: '',
        page: 1,
        location: '',
        pmin: 0,
        pmax: 1000000
      }
    }
  },
  components: { Navbar, CarouselComponent, CardComponent, CheckBox, CheckBox, PaginationComponent },
  computed: {
    ...mapState(useLodgingStore, ['dataLodgings', 'isBookmark'])
  },
  methods: {
    ...mapActions(useLodgingStore, ['getLodgings']),
    filterSubmit() {
      this.getLodgings(this.paramsFilter)
    },
    changePage(page) {
      this.paramsFilter.page = page
      this.getLodgings(this.paramsFilter)
    }
  },
  created() {
    this.getLodgings(this.paramsFilter)
    this.dataLodgings
  }
}
</script>

<template>
  <CarouselComponent />

  <!-- Dasboard -->
  <section id="dasboard-main">
    <div class="flex gap-x-5 py-5 mx-20">
      <!-- Left Component -->
      <form
        class="flex flex-col h-[730px] w-3/12 bg-base-300 gap-y-5 rounded-box sticky top-10 justify-center"
        @submit.prevent="filterSubmit"
      >
        <div class="flex flex-col -gap-y-3 mx-5">
          <h2>Accomodation Type</h2>
          <CheckBox :label="'High Floor'" />
          <CheckBox :label="'Comfort Zone'" />
          <CheckBox :label="'Fresh Air'" />
          <CheckBox :label="'Double Size'" />
          <CheckBox :label="'Near Store'" />
        </div>
        <div class="flex flex-col gap-y-2 mx-5">
          <h2>Price</h2>
          <div class="relative flex flex-row items-center justify-center">
            <input
              type="number"
              placeholder="Price Minimum"
              class="flex input input-bordered max-w-xs"
              v-model="paramsFilter.pmin"
            />
            <div
              class="relative bg-purple-950 w-[60px] h-[50px] text-white rounded-l-none rounded-r-md -ml-2 text-sm justify-center items-center flex"
            >
              Min
            </div>
          </div>
          <div class="relative flex flex-row items-center justify-center">
            <input
              type="number"
              placeholder="Price Minimum"
              class="flex input input-bordered max-w-xs"
              v-model="paramsFilter.pmax"
            />
            <div
              class="relative bg-purple-950 w-[60px] h-[50px] text-white rounded-l-none rounded-r-md -ml-2 text-sm justify-center items-center flex"
            >
              Max
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-y-2 mx-5">
          <h2>Accomodation Location</h2>
          <input
            type="text"
            placeholder="Location"
            class="input input-bordered w-full max-w-xs"
            v-model="paramsFilter.location"
          />
        </div>
        <div class="flex flex-col gap-y-2 mx-5">
          <h2>Accomodation Name</h2>
          <input
            type="text"
            placeholder="Lodging Name"
            class="input input-bordered w-full max-w-xs"
            v-model="paramsFilter.name"
          />
        </div>
        <div class="divider -my-3 relative px-5"></div>
        <div class="flex flex-col gap-y-2 mx-5">
          <button class="btn btn-primary">Search</button>
        </div>
      </form>

      <!-- Right Component -->

      <div
        class="flex flex-row w-10/12 flex-wrap h-full card rounded-box -mx-5 relative justify-center"
      >
        <!-- {{ console.log(dataLodgings.lodgings, '<<< ini ada di homeView') }} -->
        <section id="card-component" class="flex justify-center flex-row flex-wrap gap-x-6">
          <RouterLink
            v-for="lodging in dataLodgings.lodgings"
            :key="lodging.id"
            :to="`/bookmark/${lodging.id}`"
          >
            <CardComponent :lodging="lodging" :type="type" />
          </RouterLink>

          <!-- <div
            class="flex flex-row items-center justify-center"
            v-if="dataLodgings.lodgings.length === 0"
          >
            <h1>Searching data not found</h1>
          </div> -->
        </section>
        <div class="flex flex-col w-full justify-center items-center">
          <PaginationComponent
            @changePage="changePage"
            :totalPage="dataLodgings.totalPage"
            class="flex flex-row"
          />
        </div>
      </div>
    </div>
  </section>
</template>
