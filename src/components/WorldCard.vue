<template>
  <div
    class="world-card max-w-full rounded overflow-hidden shadow-lg bg-gray-800 p-4 bg-opacity-50 m-3"
  >
    <div class="flex flex-col items-center">
      <!--      <div-->
      <!--        class="max-w-[240px] max-h-[240px] mb-4"-->
      <!--        v-if="asset.imageUrl && asset.imageUrl !== ''"-->
      <!--        v-html="asset.imageUrl"-->
      <!--      ></div>-->
      <div class="world-image-block max-w-[240px] max-h-[240px] mb-4 relative">
        <div
          v-if="false"
          class="flex absolute bg-black bg-opacity-50 z-10 w-full h-full"
        >
          <div class="w-full flex flex-col items-center justify-center">
            <svg
              class="animate-spin h-8 w-8 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </div>
        <v-lazy-image
          v-if="imageUrl !== ''"
          class="w-full"
          :src="imageUrl"
          :src-placeholder="placeholder"
        />
        <div v-else>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            width="200"
            height="200"
            viewBox="-400 -400 1024 1024"
            xml:space="preserve"
            class="bg-white bg-opacity-5"
          >
            <defs></defs>
            <g
              style="
                stroke: none;
                stroke-width: 0;
                stroke-dasharray: none;
                stroke-linecap: butt;
                stroke-linejoin: miter;
                stroke-miterlimit: 10;
                fill: none;
                fill-rule: nonzero;
                opacity: 1;
              "
              transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
            >
              <path
                d="M 88 20.462 c -1.104 0 -2 0.896 -2 2 v 45.076 c 0 1.713 -0.675 3.268 -1.768 4.424 L 62.666 49.866 c -0.74 -0.759 -1.944 -0.808 -2.744 -0.112 L 45.115 62.63 l -2.122 -2.183 c -0.771 -0.793 -2.037 -0.809 -2.828 -0.039 s -0.81 2.036 -0.039 2.828 l 3.441 3.538 c 0.739 0.76 1.945 0.812 2.746 0.114 l 14.81 -12.878 l 19.417 19.894 c -0.324 0.05 -0.653 0.084 -0.991 0.084 H 25.162 c -1.104 0 -2 0.896 -2 2 s 0.896 2 2 2 h 54.386 c 2.036 0 3.932 -0.594 5.54 -1.605 c 0.037 -0.022 0.073 -0.042 0.109 -0.066 C 88.082 74.456 90 71.22 90 67.538 V 22.462 C 90 21.357 89.104 20.462 88 20.462 z"
                style="
                  stroke: none;
                  stroke-width: 1;
                  stroke-dasharray: none;
                  stroke-linecap: butt;
                  stroke-linejoin: miter;
                  stroke-miterlimit: 10;
                  fill: rgba(0, 0, 0, 0.27);
                  fill-rule: nonzero;
                  opacity: 1;
                "
                transform=" matrix(1 0 0 1 0 0) "
                stroke-linecap="round"
              />
              <path
                d="M 89.489 5.094 c -0.739 -0.823 -2.001 -0.892 -2.825 -0.153 l -7.882 7.07 H 10.452 C 4.688 12.01 0 16.699 0 22.462 v 45.076 c 0 4.26 2.565 7.926 6.229 9.552 l -5.565 4.992 c -0.822 0.738 -0.891 2.003 -0.153 2.825 C 0.906 85.347 1.452 85.571 2 85.571 c 0.476 0 0.953 -0.169 1.335 -0.511 l 86 -77.143 C 90.157 7.181 90.227 5.916 89.489 5.094 z M 10.452 16.01 h 63.871 L 34.509 51.724 l -9.858 -10.135 c -0.748 -0.77 -1.971 -0.81 -2.771 -0.093 L 4 57.562 v -35.1 C 4 18.904 6.894 16.01 10.452 16.01 z M 4 67.538 v -4.599 l 19.125 -17.184 l 8.404 8.641 L 9.734 73.947 C 6.513 73.588 4 70.853 4 67.538 z"
                style="
                  stroke: none;
                  stroke-width: 1;
                  stroke-dasharray: none;
                  stroke-linecap: butt;
                  stroke-linejoin: miter;
                  stroke-miterlimit: 10;
                  fill: rgba(0, 0, 0, 0.27);
                  fill-rule: nonzero;
                  opacity: 1;
                "
                transform=" matrix(1 0 0 1 0 0) "
                stroke-linecap="round"
              />
              <path
                d="M 32.889 36.844 c -4.517 0 -8.191 -3.675 -8.191 -8.191 s 3.675 -8.191 8.191 -8.191 s 8.191 3.674 8.191 8.191 S 37.406 36.844 32.889 36.844 z M 32.889 24.462 c -2.311 0 -4.191 1.88 -4.191 4.191 s 1.88 4.191 4.191 4.191 s 4.191 -1.88 4.191 -4.191 S 35.2 24.462 32.889 24.462 z"
                style="
                  stroke: none;
                  stroke-width: 1;
                  stroke-dasharray: none;
                  stroke-linecap: butt;
                  stroke-linejoin: miter;
                  stroke-miterlimit: 10;
                  fill: rgba(0, 0, 0, 0.27);
                  fill-rule: nonzero;
                  opacity: 1;
                "
                transform=" matrix(1 0 0 1 0 0) "
                stroke-linecap="round"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
    <div class="mb-1">
      <label class="world-label mt-4 mb-2 text-gray-200">Name: </label>
      <span>{{ world.name }}</span>
    </div>
    <div class="mb-2">
      <label class="world-label mt-4 mb-2 text-gray-200">Map: </label>
      <span class="break-all">{{ world.map }}</span>
    </div>
    <div class="mb-2" v-if="me.isAdmin !== undefined && me.isAdmin === true">
      <label class="world-label mt-4 mb-2 text-gray-200">Uploaded by: </label>
      <span> {{ world.owner && world.owner.name }}</span>
    </div>
    <div class="mb-2">
      <label class="world-label mt-4 mb-2 text-gray-200">Public: </label>
      <span> {{ world.public ? "Yes" : "No" }}</span>
    </div>
    <div class="flex flex-col justify-end grow">
      <div class="px-6 pt-4 flex flex-wrap justify-center">
        <div class="w-full md:w-1/2 px-1 mb-6 md:mb-0">
          <div class="flex justify-center p-2">
            <button
              @click="viewWorld"
              class="group relative w-full flex justify-center py-2 px-4 mx-1 border border-transparent text-sm font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            >
              Details
            </button>
            <button
              @click="editWorld"
              class="group relative w-full flex justify-center py-2 px-4 mx-1 border border-transparent text-sm font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VLazyImage from "v-lazy-image";

import accountStore from "@/store/modules/account";
import { mapActions } from "vuex";

export default {
  name: "WorldCard",
  props: ["world"],
  components: {
    VLazyImage,
  },
  data() {
    return {
      me: accountStore.me,
      imageUrl: "",
      placeholder:
        "https://lh3.googleusercontent.com/H0hU6qzTUJc-FBHiJoCd-Fw24RhHoXx3cER87tbJZaiYDiAXi85RSuU4QXa6DK3xV4r1zqneGxATRflqPr1XqVowYslivIh7WHFcTlE=w200",
    };
  },
  methods: {
    ...mapActions({
      getPreviewUrl: "worlds/getPreviewUrl",
    }),
    viewWorld() {
      this.$router.push({ path: `/worlds/${this.world.id}` });
    },
    editWorld() {
      // this.setUserEditableEvent({ event: this.event });
      this.$router.push({ path: `/worlds/${this.world.id}/edit` });
    },
  },
  async created() {
    if (this.world.files) {
      const files = this.world.files;
      const file = files.reverse().find((f) => f.type === "image_preview");

      if (file) {
        const result = await this.getPreviewUrl({
          id: this.world.id,
          fileId: file.id,
          url: file.url,
          type: "setWorldPreviewUrl",
        });

        this.imageUrl = result;
      } else {
        this.imageUrl = this.placeholder + `?`;
      }
    }
  },
};
</script>

<style scoped lang="scss">
.world-card {
  display: flex;
  flex-flow: column;
}

.world-image-block {
  min-height: 200px;
  min-width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-image-source: linear-gradient(
    180deg,
    rgba(93, 95, 239, 0.65),
    rgba(126, 20, 190, 0.73)
  );
  border-image-slice: 1;

  img {
    height: auto;
    width: auto;
    max-width: 200px;
    max-height: 200px;
  }
}

.world-label {
  display: block;
  margin: 5px 0 0 0;
  font-weight: 300;
  color: #f0616d;

  & + span {
    font-weight: 100;
  }
}
</style>
