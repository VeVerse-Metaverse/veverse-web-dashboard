<template>
  <div class="edit-portal-container w-full my-5 pb-10">
    <h1
      class="title-st text-5xl uppercase leading-normal mt-4 mb-2 text-gray-200"
    >
      Edit Portal
    </h1>
    <div v-if="!isLoading" class="grid place-items-center">
      <form class="w-full max-w-xl">
        <div class="flex flex-wrap">
          <div class="w-full mt-5 px-3">
            <label
              class="block uppercase tracking-wide text-gray-300 text-xs mb-2"
              for="grid-name"
            >
              Portal Name
            </label>
            <input
              class="appearance-none rounded-none relative block w-full px-3 py-2 mb-3 placeholder-gray-500 text-gray-100 focus:outline-none focus:z-10 sm:text-sm"
              id="grid-name"
              type="text"
              placeholder="Portal name"
              v-model="portal.name"
            />
          </div>

          <h1
            class="text-2xl text-center w-full font-600 leading-normal mt-6 text-gray-200"
          >
            Destination
          </h1>
          <div
            class="w-full px-3 mt-5"
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
          <div
            class="w-full px-3 mt-5"
            v-if="
              worldPortals !== null &&
              worldPortals.entities &&
              worldPortals.entities.length > 0
            "
          >
            <label
              class="block uppercase tracking-wide text-gray-300 text-xs mb-2"
            >
              Portals
            </label>
            <div class="relative">
              <v-select
                class="style-chooser"
                :options="worldPortals.entities"
                label="name"
                :clearable="false"
                v-model="selectedPortal"
                :reduce="(portal) => portal.id"
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

          <div class="w-full mt-5 mb-10 px-3 flex justify-center">
            <button
              class="group relative w-full flex justify-center py-2 border border-transparent text-sm font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              @click.prevent="savePortalToDestination"
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
        </div>
        <div
          class="bg-black-100 bg-opacity-40 border border-red-700 text-red-700 px-4 py-2 mt-4 relative"
          v-if="errMsg !== ''"
        >
          {{ errMsg }}
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapMutations } from "vuex";

import "@vuepic/vue-datepicker/dist/main.css";
import portalsStore from "@/store/modules/portals";

export default defineComponent({
  name: "EditPortalView",
  components: {},
  data() {
    return {
      portal: null,
      worlds: null,
      worldPortals: null,
      selectedWorld: null,
      selectedPortal: null,
      selectedDestination: null,
      isSaving: false,
      isLoading: false,
      errMsg: "",
    };
  },
  methods: {
    ...mapActions({
      fetchPortals: "portals/fetchPortals",
      fetchPortal: "portals/fetchPortal",
      fetchWorlds: "portals/fetchWorlds",
      patchPortal: "portals/patchPortal",
    }),
    ...mapMutations({
      setEditablePortal: "portals/setEditablePortal",
    }),
    async savePortalToDestination() {
      this.isSaving = true;

      await this.patchPortal({
        id: this.portal.id,
        name: this.portal.name,
        ...(this.selectedPortal !== null && {
          destinationId: this.selectedPortal,
        }),
        ...(this.selectedWorld !== null && {
          worldId: this.selectedWorld,
        }),
      });

      this.errMsg = portalsStore.errMsg;
      this.isSaving = false;
    },
    async getPortal() {
      await this.fetchPortal({ id: this.$route.params.id });
      this.setEditablePortal({ portal: portalsStore.portal });
      this.portal = portalsStore.editablePortal;
      this.selectedDestination =
        (this.portal.destination && this.portal.destination.id) || null;
    },
  },
  async created() {
    this.isLoading = true;
    await this.getPortal();

    await this.fetchWorlds({ offset: 0, limit: 100 });
    this.worlds = portalsStore.worlds;

    this.isLoading = false;
  },

  watch: {
    async selectedWorld() {
      if (this.selectedWorld !== null) {
        await this.fetchPortals({
          worldId: this.selectedWorld,
          offset: 0,
          limit: 100,
        });

        this.worldPortals = portalsStore.worldPortals;
        this.selectedPortal = null;
      }
    },
  },
});
</script>
