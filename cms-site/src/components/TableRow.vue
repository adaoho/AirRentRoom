<template>
  <tr
    v-if="path === 'lodgings'"
    class="bg-white border-b text-blue-950 text-[12px] content-center text-center"
  >
    <td class="px-6 py-4">{{ index + 1 }}</td>
    <td class="px-6 py-4 font-bold text-[15px]">{{ lodging.name }}</td>
    <td class="px-6 py-4">
      <img
        :src="lodging.imgUrl"
        alt=""
        class="w-[250px] h-[130px] overflow-x-auto rounded-lg object-cover"
      />
    </td>
    <td class="px-6 py-4">
      {{ lodging.facility }}
    </td>
    <td class="px-6 py-4">
      {{ lodging.roomCapacity }}
    </td>
    <td class="px-6 py-4">
      {{ this.currencyFormatted(lodging.price) }}
    </td>
    <td class="px-6 py-4">
      {{ lodging.User.email }}
    </td>
    <td class="px-6 py-4">
      <select name="" id="" class="p-3 bg-blue-950 rounded-lg text-white text-center">
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="archived">Archived</option>
      </select>
    </td>
    <td class="px-6 py-4">
      <div class="flex items-center justify-center gap-x-2 text-center">
        <a type="submit"
          ><img
            src="../assets/icons/edit-icon.svg"
            alt=""
            class="relative hover:brightness-150 hover:scale-110"
        /></a>
        <a type="submit"
          ><img
            src="../assets/icons/delete-icon.svg"
            alt=""
            class="relative hover:brightness-150 hover:scale-110"
        /></a>
      </div>
    </td>
  </tr>

  <tr v-if="path === 'types'" class="bg-white border-b text-blue-950 text-[12px] content-center">
    <td class="px-6 py-4 text-center">{{ index + 1 }}</td>
    <td class="px-6 py-4 font-bold text-[15px] text-left">{{ type.name }}</td>
    <td class="px-6 py-4">
      <div class="flex items-center justify-center gap-x-2 text-center">
        <a type="submit"
          ><img
            src="../assets/icons/edit-icon.svg"
            alt=""
            class="relative hover:brightness-150 hover:scale-110"
        /></a>
        <a type="submit"
          ><img
            src="../assets/icons/delete-icon.svg"
            alt=""
            class="relative hover:brightness-150 hover:scale-110"
        /></a>
      </div>
    </td>
  </tr>

  <tr
    v-if="path === 'logs'"
    class="bg-white border-b text-blue-950 text-[12px] content-center text-center"
  >
    <td class="px-6 py-4 font-bold text-[15px]">{{ log.name }}</td>
    <td class="px-6 py-4 text-[15px]">{{ log.description }}</td>
    <td class="px-6 py-4 text-[15px]">{{ log.User.email }}</td>
    <td class="px-6 py-4">{{ log.createdAt }}</td>
  </tr>
</template>

<script>
export default {
  name: 'TableRowLodgings',
  props: ['lodging', 'index', 'path', 'type', 'log'],
  data() {
    return {}
  },
  methods: {
    currencyFormatted(number) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
      }).format(number)
    }
  }
}
</script>
