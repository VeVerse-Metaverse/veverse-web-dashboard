<template>
  <div class="reset-password w-full">
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
          <form
            @submit.prevent="restore"
            class="restore-password-form mt-6 space-y-6"
          >
            <div>
              <label for="email-address" class="sr-only">Email address</label>
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
              <button
                type="submit"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              >
                Send recovery link
              </button>
            </div>
          </form>
        </div>
        <div
          class="bg-black-100 bg-opacity-40 border border-red-700 text-red-700 px-4 py-2 relative"
          v-if="errMsg !== ''"
        >
          <span class="err-lbl">{{ capitalizeFirstLetter(errMsg) }}</span>
        </div>
        <div
          class="bg-black-100 bg-opacity-40 border border-green-700 text-green-700 px-4 py-2 relative"
          v-if="successMsg !== ''"
        >
          <span class="err-lbl">{{ capitalizeFirstLetter(successMsg) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import useValidate from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import restorePasswordStore from "@/store/modules/restorePassword";

export default defineComponent({
  name: "ResetPasswordView",
  data() {
    return {
      v$: useValidate(),
      email: "",
      errMsg: "",
      successMsg: "",
      isValid: false,
    };
  },
  methods: {
    ...mapActions({
      sendRecoveryLink: "restorePassword/sendRecoveryLink",
    }),

    async restore() {
      this.v$.$validate();

      if (!this.v$.$error) {
        await this.sendRecoveryLink({ email: this.email });
        this.errMsg = restorePasswordStore.errMsg;
        this.successMsg = restorePasswordStore.successMsg;
      }
    },
    capitalizeFirstLetter(str: string) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
  validations() {
    return {
      email: { required, email },
    };
  },
});
</script>

<style scoped lang="scss"></style>
