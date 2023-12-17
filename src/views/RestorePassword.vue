<template>
  <div class="restore-password w-full">
    <div
      class="h-screen flex items-center justify-center py-12 xs:px-2 sm:px-6 lg:px-8"
    >
      <div class="max-w-md w-full space-y-8">
        <div v-if="isValid" class="max-w-md w-full space-y-8">
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
            <div class="shadow-sm space-y-6">
              <div>
                <label for="password" class="sr-only">New Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="password"
                  class="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 text-gray-100 focus:outline-none focus:z-10 sm:text-sm"
                  placeholder="New Password"
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
            <div class="shadow-sm space-y-6">
              <div>
                <label for="confirm-password" class="sr-only"
                  >Confirm the new password</label
                >
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autocomplete="confirm-password"
                  class="appearance-none rounded-none relative block w-full px-3 py-2 placeholder-gray-500 text-gray-100 focus:outline-none focus:z-10 sm:text-sm"
                  placeholder="Confirm password"
                  v-model="confirmPassword"
                />
                <span
                  v-if="v$.confirmPassword.$error"
                  class="flex mt-1 text-red-700 justify-left text-sm"
                >
                  {{ v$.confirmPassword.$errors[0].$message }}
                </span>
              </div>
            </div>
            <div>
              <button
                type="submit"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              >
                Change Password
              </button>
            </div>
          </form>
          <div class="flex flex-col items-start bg-gray-800 bg-opacity-70 p-4">
            <p>New password must contain:</p>
            <ul class="flex flex-col items-start mt-2 text-sm">
              <li>
                <span
                  :class="[
                    password.length > 5 ? 'text-green-500' : 'text-gray-600',
                  ]"
                  >At least 6 characters</span
                >
              </li>
              <li>
                <span
                  :class="[
                    hasLowercase(password) ? 'text-green-500' : 'text-gray-600',
                  ]"
                >
                  At least 1 lowercase character
                </span>
              </li>
              <li>
                <span
                  :class="[
                    hasUppercase(password) ? 'text-green-500' : 'text-gray-600',
                  ]"
                >
                  At least 1 uppercase character
                </span>
              </li>
              <li>
                <span
                  :class="[
                    hasNumber(password) ? 'text-green-500' : 'text-gray-600',
                  ]"
                  >At least 1 number character</span
                >
              </li>
              <li>
                <span
                  :class="[
                    hasSpecialChar(password)
                      ? 'text-green-500'
                      : 'text-gray-600',
                  ]"
                >
                  At least 1 special character {{ "(!@#$%^&*()+=<>~)" }}</span
                >
              </li>
            </ul>
          </div>
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
import { required, sameAs, helpers, minLength } from "@vuelidate/validators";
import restorePasswordStore from "@/store/modules/restorePassword";

export default defineComponent({
  name: "RestorePasswordView",
  methods: {
    ...mapActions({
      checkRestoreToken: "restorePassword/checkRestoreToken",
      restorePassword: "restorePassword/restorePassword",
    }),

    async restore() {
      this.v$.$validate();

      if (!this.v$.$error) {
        await this.restorePassword({
          token: this.$route.params.restoreToken,
          password: this.password,
          repeatPassword: this.confirmPassword,
        });

        this.errMsg = restorePasswordStore.errMsg;
        this.successMsg = restorePasswordStore.successMsg;
      }
    },
    capitalizeFirstLetter(str: string) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    async check(token: string) {
      const data = await this.checkRestoreToken({
        token,
      });

      this.errMsg = restorePasswordStore.errMsg;
      this.isValid = restorePasswordStore.isValid;
    },
    hasNumber(str: string) {
      return str.length > 0 && /[0-9]/.test(str);
    },
    hasLowercase(str: string) {
      return str.length > 0 && /[a-z]/.test(str);
    },
    hasUppercase(str: string) {
      return str.length > 0 && /[A-Z]/.test(str);
    },
    hasSpecialChar(str: string) {
      return str.length > 0 && /[!@#$%^&*()+=<>~]/.test(str);
    },
  },
  data() {
    return {
      v$: useValidate(),
      password: "",
      confirmPassword: "",
      errMsg: "",
      successMsg: "",
      isValid: false,
    };
  },
  async beforeRouteUpdate(to) {
    const token = to.params.restoreToken.toString();
    await this.check(token);
  },
  async created() {
    const token = this.$route.params.restoreToken.toString();
    await this.check(token);
  },
  validations() {
    return {
      password: {
        required,
        hasNumber: helpers.withMessage(
          "Should contain at least one digit",
          this.hasNumber
        ),
        hasLowercase: helpers.withMessage(
          "Should contain at least one lowercase character",
          this.hasLowercase
        ),
        hasUppercase: helpers.withMessage(
          "Should contain at least one uppercase character",
          this.hasUppercase
        ),
        hasSpecialChar: helpers.withMessage(
          "Should contain at least one special character",
          this.hasSpecialChar
        ),
        minLength: helpers.withMessage(
          "Should contain at least 6 characters",
          minLength(6)
        ),
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs(this.password),
      },
    };
  },
});
</script>

<style scoped lang="scss"></style>
