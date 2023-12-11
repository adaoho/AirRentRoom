<script>
export default {
  name: 'carousel'
}
</script>

<template>
  <section>
    <div class="grid gap-6 lg:grid-cols-3 px-[80px] mb-2">
      <div class="overflow-hidden rounded lg:flex lg:col-span-3">
        <img
          src="https://source.unsplash.com/random/485x365"
          alt=""
          class="object-cover w-full h-auto max-h-96 bg-base-100"
        />
        <div class="p-6 space-y-6 lg:p-8 md:flex md:flex-col bg-base-300 shadow-lg rounded-box">
          <span class="self-start px-3 py-1 text-sm rounded-box bg-purple-300 text-black"
            >Business</span
          >
          <h2 class="text-3xl font-bold md:flex-1">
            Curating a workplace that inspires team movement
          </h2>
          <div>
            <p class="dark:text-gray-400">November 30, 2020</p>
            <p class="dark:text-gray-400">By Leroy Jenkins</p>
          </div>
        </div>
      </div>
      <div class="p-6 rounded-box lg:p-8 lg:py-12 bg-base-300">
        <h3 class="inline font-medium dark:text-gray-50">
          Designed with your ultimate comfort in mind.
        </h3>
        <p class="inline">Sink into plush, cloud-like beds, enjoy spacious living areas.</p>
      </div>
      <div class="p-6 rounded-box lg:p-8 lg:py-12 bg-base-300">
        <h3 class="inline font-medium dark:text-gray-50">
          From luxurious suites with panoramic city views
        </h3>
        <p class="inline">to charming cabins nestled in serene natural landscapes.</p>
      </div>
      <div class="p-6 rounded-box lg:p-8 lg:py-12 bg-base-300">
        <h3 class="inline font-medium dark:text-gray-50">
          Elevate your travel experience with our lodging offerings.
        </h3>
        <p class="inline">Our dedicated staff is committed to providing top-notch service.</p>
      </div>
    </div>
  </section>
</template>
