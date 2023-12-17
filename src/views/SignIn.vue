<template>
  <div class="sign_in w-full">
    <div
      class="h-screen flex items-center justify-center py-12 xs:px-2 sm:px-6 lg:px-8"
    >
      <div class="max-w-md w-full space-y-8">
        <div class="max-w-md w-full space-y-8">
          <div class="w-full flex justify-center">
            <img
              src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTQ2IiBoZWlnaHQ9IjM3OSIgdmlld0JveD0iMCAwIDU0NiAzNzkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8cGF0aCBkPSJNOTYuMDAyNiAwSDBMMTc1Ljc1NyAzNDkuOTYySDI2OS4wNTNMMzEzLjMzOSAyNjAuNDk2SDQ4Ni4zMDFMNDQ0LjUyMyAxNzcuMTQxSDI3MS41NkwyMjUuNjA0IDI2MC42OThMOTYuMDAyNiAwWiIKICAgICAgICAgIGZpbGw9IndoaXRlIi8+CiAgICA8cGF0aCBkPSJNMjEyLjIzNiA1OS4zMjU3TDI1MC42NzMgMTM1LjY2MUg0MjMuNjM1TDM4NS4xOTkgNTkuMzI1N0gyMTIuMjM2WiIgZmlsbD0id2hpdGUiLz4KICAgIDxwYXRoIGQ9Ik0zMzQuMjI5IDMwMi40NzZMMzcyLjY2NSAzNzguODExSDU0NS4yODhMNTA3LjE5MSAzMDIuNDc2SDMzNC4yMjlaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K"
              alt="VeVerse"
              class="w-[90px] h-[64px]"
            />
          </div>
          <form @submit.prevent="signIn" class="sign-in-form mt-6 space-y-6">
            <div class="shadow-sm space-y-6">
              <div>
                <label for="email-address" class="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="text"
                  autocomplete="email"
                  class="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 text-gray-100 focus:outline-none focus:z-10 sm:text-sm"
                  placeholder="Email"
                  v-model="email"
                />
                <span
                  v-if="v$.email.$error"
                  class="flex mt-1 text-red-700 justify-left text-sm"
                >
                  {{ v$.email.$errors[0].$message }}
                </span>
              </div>
              <div>
                <label for="password" class="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  class="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 text-gray-100 focus:outline-none focus:z-10 sm:text-sm"
                  placeholder="Password"
                  v-model="password"
                />
                <span
                  v-if="v$.password.$error"
                  class="flex mt-1 text-red-700 justify-left text-sm"
                >
                  {{ v$.password.$errors[0].$message }}
                </span>
              </div>
            </div>
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  v-model="remember"
                />
                <label for="remember" class="ml-2 block text-sm">
                  Remember me
                </label>
              </div>
              <div class="text-sm">
                <router-link
                  to="/login/reset-password"
                  class="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Can't log in?
                </router-link>
              </div>
            </div>
            <div>
              <button
                type="submit"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              >
                Log In
              </button>
            </div>
            <div
              class="bg-black-100 bg-opacity-40 border border-red-700 text-red-700 px-4 py-2 relative"
              v-if="errMsg !== ''"
            >
              <span class="err-lbl">{{ capitalizeFirstLetter(errMsg) }}</span>
            </div>
          </form>
          <div class="flex border-t border-gray-200 border-opacity-30"></div>
          <button
            @click="showWalletsModal = true"
            data-modal-toggle="crypto-modal"
            class="w-full text-gray-900 flex justify-center bg-white border-0 focus:outline-none font-medium text-sm px-5 py-2.5 text-center inline-flex items-center bg-indigo-600 text-white hover:bg-indigo-700"
          >
            <svg
              aria-hidden="true"
              class="mr-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              ></path>
            </svg>
            Connect wallet
          </button>
          <CryptoModal v-model="showWalletsModal" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import useValidate from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";
import authStore from "@/store/modules/auth";
import CryptoModal from "@/components/CryptoModal.vue";
import accountStore from "@/store/modules/account";
import restorePasswordStore from "@/store/modules/restorePassword";

export default defineComponent({
  name: "SignInView",
  data() {
    return {
      v$: useValidate(),
      email: "",
      password: "",
      remember: false,
      errMsg: "",
      showWalletsModal: false,
    };
  },
  components: {
    CryptoModal,
  },
  methods: {
    ...mapActions({
      fetchLogin: "auth/fetchLogin",
    }),

    async signIn() {
      this.v$.$validate();

      if (!this.v$.$error) {
        await this.fetchLogin({
          email: this.email,
          password: this.password,
          remember: this.remember,
        });

        this.errMsg = authStore.errMsg;
      }
    },
    capitalizeFirstLetter(str: string) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
  created() {
    if (accountStore.linkMsg !== "") {
      this.$toasts.push({
        type: "success",
        message: this.capitalizeFirstLetter(accountStore.linkMsg),
        duration: 30000,
      });
    }

    if (restorePasswordStore.successMsg !== "") {
      this.$toasts.push({
        type: "success",
        message: this.capitalizeFirstLetter(restorePasswordStore.successMsg),
        duration: 30000,
      });
    }
  },
  validations() {
    return {
      email: { required, email },
      password: { required },
    };
  },
});
</script>

<style scoped lang="scss"></style>
