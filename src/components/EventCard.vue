<template>
  <div
    class="flex flex-col event-card max-w-full max-w-[300px] min-w-[300px] rounded overflow-hidden shadow-lg bg-gray-800 p-4 bg-opacity-50 m-3"
  >
    <v-lazy-image
      class="w-full"
      :src="imageUrl"
      :src-placeholder="placeholder"
    />
    <div class="px-6 py-4">
      <div class="text-xl mb-2">{{ event.title }}</div>
      <p class="text-white-400 text-base">
        {{ event.summary }}
      </p>
    </div>
    <div class="flex flex-col justify-end grow">
      <div class="px-6 px-2 flex justify-center">
        <span
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2"
          >#metaverse</span
        >
        <span
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2"
          >#events</span
        >
        <span
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs font-semibold text-gray-700 mr-2 mb-2"
          >#schedule</span
        >
      </div>
      <div class="px-6 pt-4 flex flex-wrap justify-center">
        <div class="w-full md:w-1/2 px-1 mb-6 md:mb-0">
          <div class="flex justify-center p-2">
            <router-link
              :to="'/events/' + event.id"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            >
              View
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VLazyImage from "v-lazy-image";
import eventsStore from "@/store/modules/events";

export default {
  name: "EventCard",
  components: {
    VLazyImage,
  },
  data() {
    return {
      imageUrl: "",
      placeholder:
        "https://lh3.googleusercontent.com/H0hU6qzTUJc-FBHiJoCd-Fw24RhHoXx3cER87tbJZaiYDiAXi85RSuU4QXa6DK3xV4r1zqneGxATRflqPr1XqVowYslivIh7WHFcTlE=w600",
    };
  },
  async created() {
    if (this.event.files) {
      const files = this.event.files;
      const file = files.reverse().find((f) => f.type === "image_preview");

      if (file) {
        const result = await eventsStore.getPreviewUrl({
          type: "setEventsPreviewUrl",
          id: this.event.id,
          fileId: file.id,
        });

        this.imageUrl = result;
      } else {
        this.imageUrl = this.placeholder + `?`;
      }
    }
  },
  computed: {},
  props: {
    event: {},
  },
};
</script>

<style scoped></style>
