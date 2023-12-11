<template>
  <section id="login-section" style="display: block">
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
      <div
        class="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 w-[800px]"
      >
        <!-- left side -->
        <div class="flex flex-col justify-center p-8 md:p-14">
          <img
            src="../assets/photo/logo-air-rent-room.png"
            alt="img"
            style="width: 150px; margin-bottom: 10px"
          />
          <span class="mb-3 text-[30px] font-bold">Glad to See You!</span>
          <span class="font-light text-gray-600 mb-5 text-[15px]">
            Sign in to continue using your account
          </span>
          <div class="py-4">
            <span class="mb-2 text-md">Email</span>
            <input
              v-model="email"
              type="text"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            />
          </div>
          <div class="py-4">
            <span class="mb-4 text-md">Password</span>
            <input
              v-model="password"
              type="password"
              class="w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500 mb-4"
            />
          </div>
          <!-- <div class="flex justify-between w-full py-4">
            <div class="mr-24">
              <input type="checkbox" name="ch" id="ch" class="mr-2" />
              <span class="text-md">Remember for 30 days</span>
            </div>
            <span class="font-bold text-gray-600 text-md">Forgot password</span>
          </div> -->
          <button
            class="w-full text-white p-2 rounded-lg mb-6 bg-cream-300 font-bold hover:bg-cream-300 hover:scale-105 hover:text-white transition-all"
            @click="submitLogin"
          >
            Sign in
          </button>

          <!-- Google Button Sign In -->
          <div
            class="flex relative justify-center mb-5 items-center transition-all hover:scale-110"
          >
            <a @click="googleSignIn">
              <GoogleLogin :callback="callback" prompt />
            </a>
          </div>

          <!-- <GoogleLogin :callback="callback" prompt auto-login>
            <button
              class="w-full border border-gray-300 text-md p-2 rounded-lg mb-6 hover:bg-gray-800 hover:scale-105 hover:text-white hover:duration-100 ease-out"
            >
              <img src="../assets/photo/google.svg.png" alt="img" class="w-6 h-6 inline mr-2" />
              Sign in with Google
            </button>
          </GoogleLogin> -->

          <div class="text-center text-gray-600">
            Dont'have an account?
            <button
              @click="changePath('register')"
              class="font-bold text-black hover:scale-105 hover:text-cream-300 hover:duration-100"
            >
              Sign up for free
            </button>
          </div>
        </div>
        <!-- {/* right side */} -->
        <div class="relative">
          <img
            src="../assets/photo/image-login.jpg"
            alt="img"
            class="w-[400px] h-full hidden rounded-r-2xl md:block object-cover"
          />
          <!-- text on image  -->
          <div
            class="absolute hidden bottom-10 right-3 p-6 bg-white bg-opacity-30 backdrop-blur-sm rounded drop-shadow-lg md:block"
          >
            <span class="text-white text-xl"
              >"Where belonging anywhere meets<br />unforgettable experiences"
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { GoogleLogin, decodeCredential } from 'vue3-google-login'

export default {
  components: { GoogleLogin },
  emits: ['LoginFunction', 'changePageFunction', 'googleSignIn'],
  data() {
    return {
      email: '',
      password: '',
      callback: (response) => {
        // console.log(response.credential)
        // let user = decodeCredential(response.credential)
        // console.log(response, '<><<<< response google')

        this.$emit('googleSignIn', response)
      }
    }
  },
  methods: {
    submitLogin() {
      const form = {
        email: this.email,
        password: this.password
      }
      this.$emit('LoginFunction', form)
    },
    changePath(newPage) {
      this.$emit('changePageFunction', newPage)
    }
  }
}
</script>
