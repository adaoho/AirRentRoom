<template>
  <section v-if="path === 'lodgings'" id="lodging-table">
    <div class="relative flex gap-x-4 items-center my-5 h-[32px] transition-all">
      <h1 class="text-[30px] font-bold" id="title-dashboard">Lodgings</h1>
      <a @click="showForm"
        ><img
          src="../assets/icons/plus-icon.svg"
          alt=""
          class="relative bg-cream-300 p-2 rounded-md hover:bg-green-600 hover:scale-125 transition-all"
      /></a>
    </div>
    <div class="relative overflow-x-auto rounded-lg">
      <table class="rounded-full w-[1133px] text-sm text-left text-gray-500">
        <thead class="text-s border-b-2 text-white bg-cream-300 shadow-md text-center">
          <tr>
            <th scope="col" class="px-6 py-3 w-2">No</th>
            <th scope="col" class="px-6 py-3 w-[50px]">Name</th>
            <th scope="col" class="px-6 py-3">Photo</th>
            <th scope="col" class="px-6 py-3">Facility</th>
            <th scope="col" class="px-6 py-3 w-[8px]">Capacity</th>
            <th scope="col" class="px-6 py-3 w-[120px]">Price</th>
            <th scope="col" class="px-6 py-3">Auhtor</th>
            <th scope="col" class="px-6 py-3">Status</th>
            <th scope="col" class="px-6 py-3 w-24"></th>
          </tr>
        </thead>
        <tbody>
          <TableRow
            v-for="(lodging, index) in dataLodgingsTable"
            :index="index"
            :lodging="lodging"
            :key="lodging.id"
            :path="path"
          />
        </tbody>
      </table>
    </div>
  </section>

  <section v-if="path === 'types'" id="lodging-table">
    <div class="relative flex gap-x-4 items-center my-5 h-[32px] transition-all">
      <h1 class="text-[30px] font-bold" id="title-dashboard">Types</h1>
    </div>
    <div class="relative overflow-x-auto rounded-lg">
      <table class="rounded-full w-[1133px] text-sm text-left text-gray-500">
        <thead class="text-s border-b-2 text-white bg-cream-300 shadow-md text-center">
          <tr>
            <th scope="col" class="px-6 py-3 w-4">No</th>
            <th scope="col" class="px-6 py-3 w-12">Categories</th>
            <th scope="col" class="px-6 py-3 w-24"></th>
          </tr>
        </thead>
        <tbody>
          <TableRow
            v-for="(type, index) in dataTypesTable"
            :index="index"
            :type="type"
            :key="type.id"
            :path="path"
          />
        </tbody>
      </table>
    </div>
  </section>

  <section v-if="path === 'logs'" id="lodging-table">
    <div class="relative flex gap-x-4 items-center my-5 h-[32px] transition-all">
      <h1 class="text-[30px] font-bold" id="title-dashboard">Logs</h1>
    </div>
    <div class="relative overflow-x-auto rounded-lg">
      <table class="rounded-full w-[1133px] text-sm text-left text-gray-500">
        <thead
          class="text-s border-b-2 text-white bg-cream-300 shadow-md text-center justify-evenly"
        >
          <tr>
            <th scope="col" class="py-3">Name</th>
            <th scope="col" class="py-3">Description</th>
            <th scope="col" class="py-3">Updated By</th>
            <th scope="col" class="py-3">Created At</th>
          </tr>
        </thead>
        <tbody>
          <TableRow
            v-for="(log, index) in dataLogsTable"
            :index="index"
            :log="log"
            :key="log.id"
            :path="path"
          />
        </tbody>
      </table>
    </div>
  </section>

  <!-- Form Component untuk Insert ataupun Edit -->
  <FormComponent v-if="this.isForm === true" @closeForm="showForm" />
</template>
<script>
import FormComponent from './FormComponent.vue'
import TableRow from './TableRow.vue'

export default {
  name: 'LodgingTable',
  props: ['dataLodgingsTable', 'path', 'dataTypesTable', 'dataLogsTable'],
  components: { TableRow, FormComponent },
  data() {
    return {
      isForm: false,
      formType: 'lodging'
    }
  },
  methods: {
    showForm() {
      if (this.isForm === false) {
        this.isForm = true
      } else {
        this.isForm = false
      }
    }
  }
}
</script>
