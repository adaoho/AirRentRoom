<template>
  <section id="side-bar" class="fixed top-0 left-0 h-full w-[300px]">
    <aside class="flex-col py-6 px-10 w-64 border-r border-gray-200 bg-white h-full shadow-xl">
      <img
        src="../assets/photo/logo-air-rent-room-black.svg"
        alt="img"
        style="width: 150px; margin-top: 40px"
      />
      <div class="relative flex w-[190px] h-[67px] bg-gray-100 rounded-xl items-center mt-6">
        <p class="text-gray-600 pl-4 font-medium text-sm">Look Out More</p>
        <img class="w-12 h-12 pl-4" src="../assets/icons/arrow-icon.svg" alt="" />
      </div>
      <ul class="flex flex-col gap-y-4 pt-6">
        <li
          class="flex items-center hover:bg-cream-300 hover:w-[190px] rounded-lg hover:duration-300"
        >
          <a
            @click="$emit('changePageFunction', 'dashboard')"
            class="flex items-start gap-x-2 py-2 pl-2 text-gray-500 hover:brightness-200 hover:text-white"
          >
            <img
              class="w-6 h-6 overflow-x-auto"
              src="../assets/icons/dashboard-icon.svg"
            />Dashboard</a
          >
        </li>
        <li
          class="flex items-center hover:bg-cream-300 hover:w-[190px] rounded-lg hover:duration-300"
        >
          <a
            @click="$emit('changePageFunction', 'lodgings')"
            class="flex items-start gap-x-2 py-2 pl-2 text-gray-500 hover:brightness-200 hover:text-white"
          >
            <img src="../assets/icons/lodging-icon.svg" alt="" class="w-6 h-6" />Lodgings</a
          >
        </li>
        <li
          class="flex items-center hover:bg-cream-300 hover:w-[190px] rounded-lg hover:duration-300"
        >
          <a
            @click="$emit('changePageFunction', 'types')"
            class="flex items-start gap-x-2 py-2 pl-2 text-gray-500 hover:brightness-200 hover:text-white"
          >
            <img src="../assets/icons/types-icon.svg" alt="" class="w-6 h-6" />Types</a
          >
        </li>
        <li
          class="flex items-center hover:bg-cream-300 hover:w-[190px] rounded-lg hover:duration-300"
        >
          <a
            @click="$emit('changePageFunction', 'logs')"
            class="flex items-start gap-x-2 py-2 pl-2 text-gray-500 hover:brightness-200 hover:text-white"
          >
            <img src="../assets/icons/logs-icon.svg" alt="" class="w-6 h-6" />Logs</a
          >
        </li>
      </ul>

      <a @click="logOutButton">
        <div
          id="logout-text"
          class="flex items-center justify-center w-[190px] h-[41px] rounded-lg bg-blue-950 mt-[320px] hover:bg-blue-900 transition-all"
        >
          <p class="relative text-white text-[13px]">Log Out Right Now</p>
        </div>
      </a>
    </aside>
  </section>
</template>

<script>
export default {
  name: 'SideBarPage',
  emits: ['changePageFunction', 'logOutButtonSidebar'],
  methods: {
    newPage(newPath) {
      this.$emit('changePageFunction', newPath)
    },
    logOutButton() {
      this.$emit('changePageFunction', 'login')
      localStorage.clear()
    }
  }
}
</script>
