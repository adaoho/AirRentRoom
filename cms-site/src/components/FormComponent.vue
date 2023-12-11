<template>
  <section id="form">
    <div class="top-11 right-12 fixed">
      <div
        class="flex max-w-[1400px] flex-col space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0"
      >
        <!-- left side side Image -->
        <div class="relative">
          <img
            src="../assets/photo/image-register.jpg"
            alt="img"
            class="w-[400px] h-full hidden rounded-l-2xl md:block object-cover"
          />
          <!-- text on image  -->
          <!-- <div
            class="absolute hidden bottom-10 left-[30px] p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block"
          >
            <p class="mb-2 text-white text-3xl font-bold">Welcome</p>
            <span class="text-gray-400 text-[18px] font-extralight"
              >"Where belonging anywhere meets<br />unforgettable experiences"
            </span>
          </div>  -->
        </div>

        <!-- left side -->
        <div class="flex flex-col justify-center p-8 md:p-14">
          <img
            src="../assets/photo/logo-air-rent-room.png"
            alt="img"
            style="width: 150px; margin-bottom: 10px"
          />
          <span class="mb-3 text-4xl font-bold">Create New Lodging</span>
          <div class="py-3">
            <span class="mb-2 text-md">Name</span>
            <input
              v-model="name"
              type="text"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="username"
              id="regist-username"
            />
          </div>
          <div class="py-3">
            <span class="mb-2 text-md">Photo</span>
            <input
              v-model="photo"
              type="text"
              name="email"
              id="regist-email"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div>
          <div class="py-3">
            <span class="mb-2 text-md">Facility</span>
            <input
              v-model="facility"
              type="text"
              name="password"
              id="regist-password"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div>
          <div class="flex flex-row gap-x-3">
            <div class="py-3">
              <span class="mb-2 text-md">Room Capacity</span>
              <input
                v-model="roomCapacity"
                type="text"
                name="phoneNumber"
                id="regist-phoneNumber"
                class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
            </div>
            <div class="py-3">
              <span class="mb-2 text-md">Price</span>
              <input
                v-model="price"
                type="text"
                name="address"
                id="regist-address"
                class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              />
            </div>
          </div>
          <div class="py-3">
            <span class="mb-2 text-md">Category</span>
            <input
              v-model="category"
              type="text"
              name="address"
              id="regist-address"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div>

          <div class="flex flex-row gap-x-3">
            <button
              @click="$emit('closeForm')"
              class="w-full bg-gray-700 text-white p-2 rounded-lg mb-3 mt-6 hover:bg-gray-900 transition-all hover:scale-105"
            >
              Cancel
            </button>
            <button
              class="w-full bg-cream-300 text-white p-2 rounded-lg mb-3 mt-6 hover:bg-green-500 transition-all hover:scale-105"
            >
              Add New Lodging
            </button>
          </div>
        </div>
        <!-- {/* right side */} -->
      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'FormComponent',
  props: ['formType'],
  emit: ['closeForm'],
  data() {
    return {
      name: '',
      photo: '',
      facility: '',
      roomCapacity: '',
      price: ''
    }
  },
  methods: {
    submitRegister() {
      const form = {
        username: this.username,
        email: this.email,
        password: this.password,
        role: 'admin',
        phoneNumber: this.phoneNumber,
        address: this.address
      }

      this.$emit('registerFunction', form)
    }
  }
}
</script>
