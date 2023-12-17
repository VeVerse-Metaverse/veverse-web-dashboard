<template>
  <div class="create-event-container w-full my-5 pb-10">
    <h1
      class="title-st text-5xl uppercase leading-normal mt-4 mb-2 text-gray-200"
    >
      Create App
    </h1>
    <div class="grid place-items-center">
      <form class="w-full max-w-xl">
        <div class="flex flex-col items-center mb-6">
          <div class="flex flex-wrap mb-6">
            <div class="w-full px-3">
              <div class="m-4">
                <div class="flex items-center justify-center w-full">
                  <label
                    class="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-opacity-40 hover:bg-gray-800 hover:border-gray-400"
                  >
                    <div class="flex flex-col items-center justify-center pt-7">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p
                        class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600"
                      >
                        Attach a file
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <p class="text-gray-400 text-xs italic mb-4">
                You can upload one JPEG or PNG image up to 1 MB
              </p>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap mb-6">
          <div class="w-full px-3 mb-6">
            <label
              class="block uppercase tracking-wide text-gray-300 text-xs mb-2"
              for="grid-title"
            >
              Name
            </label>
            <input
              class="appearance-none rounded-none relative block w-full px-3 py-2 mb-3 placeholder-gray-500 text-gray-100 focus:outline-none focus:z-10 sm:text-sm"
              id="grid-name"
              type="text"
              placeholder="Name of your metaverse app"
              v-model="app.name"
            />
          </div>
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-300 text-xs mb-2"
              for="grid-description"
            >
              Description
            </label>
            <textarea
              class="appearance-none rounded-none relative block w-full px-3 py-2 mb-3 placeholder-gray-500 text-gray-100 focus:outline-none focus:z-10 sm:text-sm"
              id="grid-description"
              type="text"
              placeholder="Description for people who would like to know more about your app"
              v-model="app.description"
            />
          </div>
        </div>

        <div class="flex flex-wrap mb-2">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-300 text-xs mb-2"
              for="grid-state"
            >
              App Type
            </label>
            <div class="relative">
              <v-select
                class="style-chooser"
                :options="appTypes"
                label="name"
                :clearable="false"
                v-model="app.selectedAppType"
                :reduce="(type) => type.id"
              >
                <template #option="{ title, price }">
                  <em>{{ title }} - ${{ price }}</em>
                </template>
                <template #selected-option="{ title, price }">
                  <em>{{ title }} - ${{ price }}</em>
                </template>
              </v-select>
              <div
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"
              >
                <svg
                  class="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/2 px-1 mb-6 md:mb-0">
            <div class="flex justify-center p-2">
              <button
                :disabled="isSaving"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                @click.prevent="onSubmitButtonClicked"
              >
                Place an Order
              </button>
            </div>
            <div class="flex justify-center p-2">
              <p class="disclaimer">
                * Note that it will take some time to process the
                application.<br />
                When processing is complete, you will receive an email.
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
    <i class="bg-green-400 hidden"></i>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import { loadStripe } from "@stripe/stripe-js";

import "@vuepic/vue-datepicker/dist/main.css";

export default defineComponent({
  name: "CreateAppView",
  components: {},
  data() {
    return {
      stripe: undefined,
      isSaving: false,
      appTypes: [
        {
          id: "free",
          product_id: "",
          name: "Free",
          description: "up to 5 concurrent users included",
          price: "0.00",
        },
        {
          id: "contact",
          product_id: "",
          name: "Architect",
          description: "up to 50 concurrent users included",
          price: "49.95",
        },
        {
          id: "creator",
          product_id: "",
          name: "Creator",
          description: "up to 250 concurrent users included",
          price: "499.95",
        },
      ],
      date: [],
      placeholder:
        "https://lh3.googleusercontent.com/H0hU6qzTUJc-FBHiJoCd-Fw24RhHoXx3cER87tbJZaiYDiAXi85RSuU4QXa6DK3xV4r1zqneGxATRflqPr1XqVowYslivIh7WHFcTlE=w600",
      app: {
        name: "",
        description: "",
        startsAt: new Date().getTime(),
        endsAt: new Date().getTime(),
        selectedAppType: "free",
      },
      publishableKey: "",
      successURL: "http://localhost:8080/#/apps/my",
      cancelURL: `http://localhost:8080/#/apps/create&`,
      loading: false,
    };
  },
  methods: {
    ...mapActions({
      createApp: "apps/createApp",
    }),
    async onSubmitButtonClicked() {
      this.isSaving = true;
      const response = await this.createApp(this.app);
      this.isSaving = false;
      if (response) {
        this.$router.push({ name: "apps.my" });
      }
    },
    clearData() {
      this.app = {
        name: "",
        description: "",
        startsAt: new Date().getTime(),
        endsAt: new Date().getTime(),
        selectedAppType: "free",
      };
    },
  },
  async beforeMount() {
    this.stripe = await loadStripe(this.publishableKey);
  },
  watch: {
    date() {
      this.app.startsAt = new Date(this.date[0]).getTime();
      this.app.endsAt = new Date(this.date[1]).getTime();
    },
  },
});
</script>
