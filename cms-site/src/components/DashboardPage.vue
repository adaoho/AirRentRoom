<template>
  <div class="w-screen min-h-screen font-sans text-gray-900 bg-gray-100 flex flex-row">
    <!-- Side Bar -->
    <SideBar @change-page-function="changePageFromSidebar" />

    <section id="main-dashboard" style="display: block">
      <div class="absolute max-w-screen min-h-screen bg-gray-100 py-6 gap-y-10 right-12">
        <!-- Profile & Notification Section -->
        <section id="dashboard-profile-notification-section" style="display: block">
          <div
            class="relative items-center flex py-4 justify-between"
            id="profile-and-notification"
          >
            <div class="flex gap-x-4">
              <img src="../assets/icons/info-icon.svg" alt="" />
              <p class="flex-col font-light text-gray-500" id="alert-notification">
                Alert this is Notification That You gonna read
              </p>
            </div>

            <!-- Profile Button -->
            <div
              class="items-center w-[210px] h-[72px] bg-white rounded-xl align-middle gap-x-2 flex"
              id="profile-button"
            >
              <img
                src="../assets/photo/profile-image.png"
                class="relative flex-col w-[61px] h-[60px] object-cover rounded-xl ml-2"
              />
              <div class="flex flex-col">
                <p class="text-black relative text-s font-bold tracking-tight capitalize">
                  {{ this.dataUser.username }}
                </p>
                <p class="text-gray-500 relative text-[10px] font-light tracking-tight">
                  {{ this.dataUser.email }}
                </p>
              </div>
            </div>
          </div>
        </section>

        <DashboardSection
          v-if="path === 'dashboard'"
          :dataUser="dataUser"
          :dataLodgingDashboard="getDataLodgings"
          :dataTypeDashboard="getDataTypes"
          :dataLogDashboard="getDataLogs"
        />

        <TableComponent
          v-if="path === 'lodgings' || path === 'types' || path === 'logs'"
          :dataLodgingsTable="getDataLodgings"
          :dataTypesTable="getDataTypes"
          :dataLogsTable="getDataLogs"
          :path="path"
        />
      </div>
    </section>
  </div>
</template>

<script>
import SideBar from './SideBar.vue'
import DashboardSection from './DashboardSection.vue'
import TableComponent from './TableComponent.vue'

export default {
  emits: ['logOutButton'],
  props: ['dataUser', 'getDataLodgings', 'getDataTypes', 'getDataLogs'],
  name: 'DashboardPage',
  components: { SideBar, DashboardSection, TableComponent },

  data() {
    return {
      path: 'dashboard'
    }
  },

  methods: {
    changePageFromSidebar(newPage) {
      this.path = newPage
    }
  }
}
</script>
