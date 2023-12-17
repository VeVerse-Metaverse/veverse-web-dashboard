<template>
  <div class="view-event-container w-full my-5">
    <h1
      class="title-st text-5xl uppercase leading-normal mt-4 mb-2 text-gray-200"
    >
      View Event
    </h1>
    <div class="grid place-items-center">
      <form v-if="!fetching" class="w-full max-w-xl">
        <div class="flex flex-col items-center mb-6">
          <div class="w-1/2">
            <label
              class="block uppercase tracking-wide text-gray-300 text-xs mb-2"
            >
              Preview image
            </label>
            <v-lazy-image :src="imageUrl" :src-placeholder="placeholder" />
          </div>
        </div>

        <div class="flex flex-wrap mb-6">
          <div class="w-full px-3 mb-6">
            <label
              class="block uppercase tracking-wide text-gray-300 text-xs mb-2"
            >
              Title
            </label>
            <p class="text-gray-200 text-xs">
              {{ event.title }}
            </p>
          </div>
          <div class="w-full px-3 mb-6">
            <label
              class="block uppercase tracking-wide text-gray-300 text-xs mb-2"
            >
              Summary
            </label>
            <p class="text-gray-200 text-xs">
              {{ event.summary }}
            </p>
          </div>
          <div class="w-full px-3 mb-6">
            <label
              class="block uppercase tracking-wide text-gray-300 text-xs mb-2"
            >
              Description
            </label>
            <p class="text-gray-200 text-xs">
              {{ event.description }}
            </p>
          </div>
        </div>

        <div class="flex flex-wrap mb-2">
          <div class="w-full md:w-1/2 px-1 mb-6 md:mb-0">
            <div class="flex justify-center p-2">
              <button
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              >
                I will come
              </button>
            </div>
          </div>
          <div class="w-full md:w-1/2 px-1 mb-6 md:mb-0">
            <div class="flex justify-center p-2">
              <button
                class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              >
                Not interested
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import VLazyImage from "v-lazy-image";

import eventsStore from "@/store/modules/events";

export default defineComponent({
  name: "ViewEventView",
  components: {
    VLazyImage,
  },
  data() {
    return {
      fetching: false,
      event: null,
      placeholder:
        "https://lh3.googleusercontent.com/H0hU6qzTUJc-FBHiJoCd-Fw24RhHoXx3cER87tbJZaiYDiAXi85RSuU4QXa6DK3xV4r1zqneGxATRflqPr1XqVowYslivIh7WHFcTlE=w600",
      imageUrl: "",
    };
  },
  methods: {
    ...mapActions({
      fetchEvent: "events/fetchEvent",
    }),
    async updatePreviewImage() {
      if (this.event.files) {
        const files = this.event.files;
        const file = files.reverse().find((f) => f.type === "image_preview");

        if (file) {
          const result = await eventsStore.getPreviewUrl({
            type: "setEventPreviewUrl",
            id: this.event.id,
            fileId: file.id,
          });

          this.imageUrl = result;
        } else {
          this.imageUrl = this.placeholder + `?`;
        }
      }
    },
  },

  async created() {
    this.fetching = true;
    await this.fetchEvent({ id: this.$route.params.id });
    this.event = eventsStore.event;
    this.fetching = false;

    await this.updatePreviewImage();
  },
});
</script>
