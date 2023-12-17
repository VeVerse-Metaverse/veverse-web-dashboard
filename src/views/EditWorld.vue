<template>
  <h1
    class="title-st text-5xl uppercase leading-normal mt-4 mb-2 text-gray-200"
  >
    Edit World
  </h1>
  <div class="grid place-items-center">
    <form class="w-full max-w-xl">
      <div class="flex flex-col items-center mb-6">
        <div
          class="world-image-block max-w-[240px] max-h-[240px] mb-6 relative"
        >
          <v-lazy-image
            v-if="imageUrl !== ''"
            :src="imageUrl"
            :src-placeholder="placeholder"
            class="max-w-[240px] max-h-[240px]"
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

      <div class="flex flex-wrap mb-6">
        <div class="w-full px-3 mb-6">
          <label
            class="block uppercase tracking-wide text-gray-300 text-xs mb-2"
          >
            Name
          </label>
          <input
            class="appearance-none rounded-none relative block w-full px-3 py-2 mb-3 placeholder-gray-500 text-gray-100 focus:outline-none focus:z-10 sm:text-sm"
            id="grid-title"
            type="text"
            placeholder="Name"
            v-model="editableWorld.name"
          />
        </div>
        <div class="w-full px-3 mb-6">
          <label
            class="block uppercase tracking-wide text-gray-300 text-xs mb-2"
          >
            Map
          </label>
          <input
            class="appearance-none rounded-none relative block w-full px-3 py-2 mb-3 placeholder-gray-500 text-gray-100 focus:outline-none focus:z-10 sm:text-sm"
            id="grid-title"
            type="text"
            placeholder="Map"
            v-model="editableWorld.map"
          />
        </div>
        <div class="w-full px-3 mb-6">
          <label
            class="block uppercase tracking-wide text-gray-300 text-xs mb-2"
          >
            Description
          </label>
          <input
            class="appearance-none rounded-none relative block w-full px-3 py-2 mb-3 placeholder-gray-500 text-gray-100 focus:outline-none focus:z-10 sm:text-sm"
            id="grid-title"
            type="text"
            placeholder="Description"
            v-model="editableWorld.description"
          />
        </div>
        <div
          v-if="me.isAdmin !== undefined && me.isAdmin === true"
          class="w-full px-3 mb-6"
        >
          <label
            class="block uppercase tracking-wide text-gray-300 text-xs mb-2"
          >
            Uploaded by:
          </label>
          <p class="text-gray-200 text-xs">
            {{ world.owner && world.owner.name }}
          </p>
        </div>
        <div class="w-full px-3 mb-6">
          <label
            class="block uppercase tracking-wide text-gray-300 text-xs mb-2"
          >
            Public
          </label>
          <input
            id="grid-title"
            type="checkbox"
            placeholder="Map"
            v-model="editableWorld.public"
          />
        </div>
      </div>
      <div class="w-full mb-6 md:mb-0 flex justify-center">
        <button
          class="group relative w-full flex justify-center py-2 border border-transparent text-sm font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
          @click.prevent="saveWorld"
        >
          <span v-if="isSaving">
            <svg
              class="inline mr-2 w-4 h-4 text-gray-200 animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#1C64F2"
              />
            </svg>
          </span>
          <span v-else>Save</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import worldsStore from "@/store/modules/worlds";
import { mapActions } from "vuex";
import VLazyImage from "v-lazy-image";
import accountStore from "@/store/modules/account";

export default defineComponent({
  name: "EditWorldView",
  components: { VLazyImage },
  data() {
    return {
      isSaving: false,
      me: accountStore.me,
      world: {},
      editableWorld: {},
      imageUrl: "",
      placeholder:
        "https://lh3.googleusercontent.com/H0hU6qzTUJc-FBHiJoCd-Fw24RhHoXx3cER87tbJZaiYDiAXi85RSuU4QXa6DK3xV4r1zqneGxATRflqPr1XqVowYslivIh7WHFcTlE=w200",
    };
  },
  methods: {
    ...mapActions({
      fetchWorld: "worlds/fetchWorld",
      getPreviewUrl: "worlds/getPreviewUrl",
      patchWorld: "worlds/patchWorld",
    }),
    async saveWorld() {
      this.isSaving = true;

      await this.patchWorld({
        id: this.editableWorld.id,
        ...(this.editableWorld.name !== this.world.name && {
          name: this.editableWorld.name,
        }),
        ...(this.editableWorld.map !== this.world.map && {
          map: this.editableWorld.map,
        }),
        ...(this.editableWorld.public !== this.world.public && {
          public: this.editableWorld.public,
        }),
        ...(this.editableWorld.description !== this.world.description && {
          description: this.editableWorld.description,
        }),
      });

      this.isSaving = false;
    },
  },

  async created() {
    this.fetching = true;
    await this.fetchWorld({ id: this.$route.params.id });
    this.world = worldsStore.world;

    this.editableWorld = {
      id: this.world.id,
      name: this.world.name,
      map: this.world.map,
      description: this.world.description,
      public: this.world.public,
    };

    this.fetching = false;

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
});
</script>

<style scoped></style>
