<template>
  <div class="view-portal-container w-full my-5">
    <h1
      class="title-st text-5xl uppercase leading-normal mt-4 mb-2 text-gray-200"
    >
      View Portal
    </h1>
    <!--    <div class="grid place-items-center">-->
    <!--      <form v-if="!fetching" class="w-full max-w-xl">-->
    <!--        <div class="flex flex-col items-center mb-6">-->
    <!--          <div class="w-1/2">-->
    <!--            <label-->
    <!--              class="block uppercase tracking-wide text-gray-300 text-xs  mb-2"-->
    <!--            >-->
    <!--              Preview image-->
    <!--            </label>-->
    <!--            <v-lazy-image :src="imageUrl" :src-placeholder="placeholder" />-->
    <!--          </div>-->
    <!--        </div>-->

    <!--        <div class="flex flex-wrap mb-6">-->
    <!--          <div class="w-full px-3 mb-6">-->
    <!--            <label-->
    <!--              class="block uppercase tracking-wide text-gray-300 text-xs  mb-2"-->
    <!--            >-->
    <!--              Title-->
    <!--            </label>-->
    <!--            <p class="text-gray-200 text-xs">-->
    <!--              {{ event.title }}-->
    <!--            </p>-->
    <!--          </div>-->
    <!--          <div class="w-full px-3 mb-6">-->
    <!--            <label-->
    <!--              class="block uppercase tracking-wide text-gray-300 text-xs  mb-2"-->
    <!--            >-->
    <!--              Summary-->
    <!--            </label>-->
    <!--            <p class="text-gray-200 text-xs">-->
    <!--              {{ event.summary }}-->
    <!--            </p>-->
    <!--          </div>-->
    <!--          <div class="w-full px-3 mb-6">-->
    <!--            <label-->
    <!--              class="block uppercase tracking-wide text-gray-300 text-xs mb-2"-->
    <!--            >-->
    <!--              Description-->
    <!--            </label>-->
    <!--            <p class="text-gray-200 text-xs">-->
    <!--              {{ event.description }}-->
    <!--            </p>-->
    <!--          </div>-->
    <!--        </div>-->

    <!--        <div class="flex flex-wrap mb-2">-->
    <!--          <div class="w-full md:w-1/2 px-1 mb-6 md:mb-0">-->
    <!--            <div class="flex justify-center p-2">-->
    <!--              <button-->
    <!--                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none"-->
    <!--              >-->
    <!--                I will come-->
    <!--              </button>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--          <div class="w-full md:w-1/2 px-1 mb-6 md:mb-0">-->
    <!--            <div class="flex justify-center p-2">-->
    <!--              <button-->
    <!--                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none"-->
    <!--              >-->
    <!--                Not interested-->
    <!--              </button>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </div>-->
    <!--      </form>-->
    <!--    </div>-->
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "ViewPortal",
  data() {
    return {
      fetching: false,
      portal: null,
    };
  },
  methods: {
    ...mapActions({
      // fetchEvent: "events/fetchEvent",
    }),
  },

  async created() {
    this.fetching = true;
    // await this.fetchEvent({ id: this.$route.params.id });
    // this.event = events.event;
    this.fetching = false;
  },
});
</script>
