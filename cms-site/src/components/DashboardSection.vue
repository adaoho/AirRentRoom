<template>
  <section id="dashboard-section" style="display: block">
    <section id="dashboard-greeting-section">
      <h1 class="text-2xl font-bold py-4" id="title-dashboard">Dashboard</h1>
      <div class="relative flex left-0">
        <img
          src="../assets/photo/dashboard-image.jpg"
          class="relative w-[1148px] h-[308px] object-cover rounded-3xl"
        />

        <!-- Text on Image Dashboard -->
        <div class="absolute pl-[50px] pt-[40px]">
          <p class="mb-2 text-white text-[50px] font-bold capitalize">
            Hola, {{ this.dataUser.username }}!
          </p>
          <p class="text-gray-400 text-s font-extralight w-[500px]">
            "Where belonging anywhere meets unforgettable experiences Lorem impsum"
          </p>
        </div>
      </div>
    </section>

    <!-- Section Statistic -->
    <section id="dashboard-statistic-section" style="display: block">
      <h1 class="text-2xl font-bold py-4" id="title-statistic">Statistic</h1>

      <div class="flex gap-x-6">
        <!-- Card Statistic -->
        <div
          class="relative w-[366px] h-[206px] bg-white rounded-3xl justify-center flex-col flex pl-6 gap-y-3"
        >
          <p class="font-bold text-xl">Lodgings</p>
          <p class="text-[12px] w-[186px] font-extralight text-gray-500">
            Where belonging anywhere meets unforgettable experiences Lorem impsum
          </p>
          <button
            @click="$emit('changePageFunction', 'lodgings')"
            class="bg-gray-100 p-3 w-[120px] rounded-lg text-sm text-cream-300 hover:bg-cream-300 hover:text-white"
          >
            Explore More
          </button>

          <!-- Inline Text Number -->
          <div
            class="absolute right-6 bg-cream-300 w-[94px] h-[94px] rounded-[50%] flex items-center justify-center"
          >
            <p class="relative text-[60px] text-white font-bold">
              {{ this.dataLodgingDashboard.length }}
            </p>
          </div>
        </div>

        <!-- Card Statistic -->
        <div
          class="relative w-[366px] h-[206px] bg-white rounded-3xl justify-center flex-col flex pl-6 gap-y-3"
        >
          <p class="font-bold text-xl">Types</p>
          <p class="text-[12px] w-[186px] font-extralight text-gray-500">
            Where belonging anywhere meets unforgettable experiences Lorem impsum
          </p>
          <button
            @click="$emit('changePageFunction', 'lodgings')"
            class="bg-gray-100 p-3 w-[120px] rounded-lg text-sm text-cream-300 hover:bg-cream-300 hover:text-white"
          >
            Explore More
          </button>

          <!-- Inline Text Number -->
          <div
            class="absolute right-6 bg-cream-300 w-[94px] h-[94px] rounded-[50%] flex items-center justify-center"
          >
            <p class="relative text-[60px] text-white font-bold">
              {{ this.dataTypeDashboard.length }}
            </p>
          </div>
        </div>

        <!-- Card Statistic -->
        <div
          class="relative w-[366px] h-[206px] bg-white rounded-3xl justify-center flex-col flex pl-6 gap-y-3"
        >
          <p class="font-bold text-xl">Logs</p>
          <p class="text-[12px] w-[186px] font-extralight text-gray-500">
            Where belonging anywhere meets unforgettable experiences Lorem impsum
          </p>
          <button
            class="bg-gray-100 p-3 w-[120px] rounded-lg text-sm text-cream-300 hover:bg-cream-300 hover:text-white"
          >
            Explore More
          </button>

          <!-- Inline Text Number -->
          <div
            class="absolute right-6 bg-cream-300 w-[94px] h-[94px] rounded-[50%] flex items-center justify-center"
          >
            <p class="relative text-[60px] text-white font-bold">
              {{ this.dataLogDashboard.length }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: 'DashboardSection',
  emits: ['changePageFunction'],
  props: ['dataUser', 'dataLodgingDashboard', 'dataTypeDashboard', 'dataLogDashboard']
}
</script>
