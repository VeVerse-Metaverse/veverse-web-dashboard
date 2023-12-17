<template>
  <div class="create-event-container w-full my-5 pb-10">
    <h1
      class="title-st text-5xl uppercase leading-normal mt-4 mb-2 text-gray-200"
    >
      Create Event
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
              Title
            </label>
            <input
              class="appearance-none rounded-none relative block w-full px-3 py-2 mb-3 placeholder-gray-500 text-gray-100 focus:outline-none focus:z-10 sm:text-sm"
              id="grid-title"
              type="text"
              placeholder="Title of your metaverse event"
              v-model="event.title"
            />
          </div>
          <div class="w-full px-3 mb-6">
            <label
              class="block uppercase tracking-wide text-gray-300 text-xs mb-2"
              for="grid-summary"
            >
              Summary
            </label>
            <textarea
              class="appearance-none rounded-none relative block w-full px-3 py-2 mb-3 placeholder-gray-500 text-gray-100 focus:outline-none focus:z-10 sm:text-sm"
              id="grid-summary"
              type="text"
              placeholder="Enter summary so people understand what your event is about"
              v-model="event.summary"
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
              placeholder="Description for people who would like to know more about your event"
              v-model="event.description"
            />
          </div>
        </div>
        <div class="flex flex-col items-center mb-6">
          <div
            class="w-full px-3 mb-6"
            v-if="worlds !== null && worlds.entities.length > 0"
          >
            <label
              class="block uppercase tracking-wide text-gray-300 text-xs mb-2"
            >
              Space
            </label>
            <div class="relative">
              <v-select
                class="style-chooser"
                :options="worlds.entities"
                label="name"
                :clearable="false"
                v-model="selectedWorld"
                :reduce="(world) => world.id"
              >
                <template #option="{ name, id }">
                  <em>{{ name || `Noname - ${id}` }}</em>
                </template>
                <template #selected-option="{ name, id }">
                  <em>{{ name || `Noname - ${id}` }}</em>
                </template>
              </v-select>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-300 text-xs mb-2"
            >
              Schedule
            </label>
          </div>
          <Datepicker class="w-full px-3 mb-6" v-model="date" dark range />
        </div>

        <div class="flex flex-wrap mb-2">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-300 text-xs mb-2"
              for="grid-state"
            >
              Event Type
            </label>
            <div class="relative">
              <v-select
                class="style-chooser"
                :options="eventTypes"
                label="title"
                :clearable="false"
                v-model="event.selectedEventType"
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
                @click.prevent="onPayButtonClicked"
              >
                Pay and Schedule
              </button>
            </div>
          </div>
          <div class="w-full md:w-1/2 px-1 mb-6 md:mb-0">
            <div class="flex justify-center p-2">
              <button
                :disabled="isSaving"
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                @click.prevent="scheduleLater"
              >
                Create and Schedule later
              </button>
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
import Datepicker from "@vuepic/vue-datepicker";
import { loadStripe } from "@stripe/stripe-js";

import "@vuepic/vue-datepicker/dist/main.css";
import eventsStore from "@/store/modules/events";
import portalsStore from "@/store/modules/portals";

export default defineComponent({
  name: "CreateEventView",
  components: { Datepicker },
  data() {
    return {
      stripe: undefined,
      isSaving: false,
      eventTypes: [
        {
          id: "price_1",
          product_id: "prod_1",
          title: "Exclusive",
          description: "up to 50 person event",
          price: "249.95",
        },
        {
          id: "price_2",
          product_id: "prod_2",
          title: "Mega",
          description: "up to 100 person event",
          price: "499.95",
        },
      ],
      date: [],
      placeholder:
        "https://lh3.googleusercontent.com/H0hU6qzTUJc-FBHiJoCd-Fw24RhHoXx3cER87tbJZaiYDiAXi85RSuU4QXa6DK3xV4r1zqneGxATRflqPr1XqVowYslivIh7WHFcTlE=w600",
      event: {
        title: "",
        summary: "",
        description: "",
        startsAt: new Date().getTime(),
        endsAt: new Date().getTime(),
        selectedEventType: "price_1",
      },
      publishableKey: "",
      successURL: "http://localhost:8080/#/events/my",
      cancelURL: `http://localhost:8080/#/events/create&`,
      loading: false,
      worlds: null,
      selectedWorld: null,
    };
  },
  methods: {
    ...mapActions({
      createEvent: "events/createEvent",
      fetchWorlds: "portals/fetchWorlds",
    }),
    async onPayButtonClicked() {
      // console.log(this.stripe.checkout);
      // const response = await this.stripe.checkout.session.create({
      //   mode: "payment",
      //   lineItems: [
      //     {
      //       // price: "price_1",
      //       price: this.event.selectedEventType,
      //       quantity: 1,
      //     },
      //   ],
      //   metadata: this.this.event,
      //   successUrl: this.successURL,
      //   cancelUrl: this.cancelURL,
      // });
      // this.stripe.redirectToCheckout({
      //   mode: "payment",
      //   lineItems: [
      //     {
      //       // price: "price_1",
      //       price: this.event.selectedEventType,
      //       quantity: 1,
      //     },
      //   ],
      //   cancelUrl: this.cancelURL,
      //   successUrl: this.successURL,
      // });
      //
      // this.event.startsAt.getTime()
      // this.event.endsAt.getTime()
    },
    async scheduleLater() {
      this.isSaving = true;
      await this.createEvent(this.event);
      this.event = eventsStore.userEditableEvent;

      this.$toasts.push({
        type: "success",
        message: `Event ${this.event.title} created!`,
        duration: 5000,
      });

      this.clearData();
    },
    clearData() {
      this.event = {
        title: "",
        summary: "",
        description: "",
        startsAt: new Date().getTime(),
        endsAt: new Date().getTime(),
        selectedEventType: "price_1",
      };
    },
  },
  async beforeMount() {
    this.stripe = await loadStripe(this.publishableKey);

    await this.fetchWorlds({ offset: 0, limit: 100 });
    this.worlds = portalsStore.worlds;
  },
  watch: {
    date() {
      this.event.startsAt = new Date(this.date[0]).getTime();
      this.event.endsAt = new Date(this.date[1]).getTime();
    },
  },
});
</script>
