<template>
  <section id="register-section">
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div
        class="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0"
      >
        <!-- rigth side -->
        <div class="relative">
          <img
            src="../assets/photo/image-register.jpg"
            alt="img"
            class="w-[400px] h-full hidden rounded-l-2xl md:block object-cover"
          />
          <!-- text on image  -->
          <div
            class="absolute hidden bottom-10 left-[30px] p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block"
          >
            <p class="mb-2 text-white text-3xl font-bold">Welcome</p>
            <span class="text-gray-400 text-[18px] font-extralight"
              >"Where belonging anywhere meets<br />unforgettable experiences"
            </span>
          </div>
        </div>

        <!-- left side -->
        <div class="flex flex-col justify-center p-8 md:p-14">
          <img
            src="../assets/photo/logo-air-rent-room.png"
            alt="img"
            style="width: 150px; margin-bottom: 10px"
          />
          <span class="mb-3 text-4xl font-bold">Sign up and Enjoy</span>
          <span class="font-light text-gray-600 mb-4"> Create your account </span>
          <div class="py-3">
            <span class="mb-2 text-md">Username</span>
            <input
              v-model="username"
              type="text"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
              name="username"
              id="regist-username"
            />
          </div>
          <div class="py-3">
            <span class="mb-2 text-md">Email</span>
            <input
              v-model="email"
              type="text"
              name="email"
              id="regist-email"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div>
          <div class="py-3">
            <span class="mb-2 text-md">Password</span>
            <input
              v-model="password"
              type="password"
              name="password"
              id="regist-password"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div>
          <div class="py-3">
            <span class="mb-2 text-md">Phone Number</span>
            <input
              v-model="phoneNumber"
              type="text"
              name="phoneNumber"
              id="regist-phoneNumber"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div>
          <div class="py-3">
            <span class="mb-2 text-md">Address</span>
            <input
              v-model="address"
              type="text"
              name="address"
              id="regist-address"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div>

          <button
            @click="submitRegister"
            class="w-full bg-cream-300 text-white p-2 rounded-lg mb-3 mt-6 hover:bg-green-700 hover:text-white hover:scale-110 transition-all"
          >
            Sign Up
          </button>
        </div>
        <!-- {/* right side */} -->
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'RegisterPage',
  props: ['changePageFunction'],
  emits: ['registerFunction'],
  data() {
    return {
      username: '',
      email: '',
      password: '',
      phoneNumber: '',
      address: ''
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
