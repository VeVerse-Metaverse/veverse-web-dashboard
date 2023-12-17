<template>
  <div class="w-full my-5">
    <h1
      class="title-st text-5xl uppercase leading-normal mt-4 mb-2 text-gray-200"
    >
      Worlds
    </h1>
    <div v-if="fetching" class="flex justify-center my-5">
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
    <div v-if="worlds.entities" class="item-block grid mx-5">
      <WorldCard
        v-for="world in worlds.entities"
        :key="world.id"
        :world="world"
      />
    </div>
    <div
      class="flex justify-center"
      v-if="worlds.entities && worlds.entities.length === 0"
    >
      <h2 class="text-2xl font-600 leading-normal mt-4 mb-2 text-gray-500">
        No Worlds
      </h2>
    </div>
    <v-pagination
      v-if="worlds.entities && worlds.entities.length > 0"
      v-model="page"
      :pages="pages"
      :range-size="1"
      active-color="#DCEDFF"
      @update:modelValue="loadNextItems"
      class="inline-flex justify-center items-center -space-x-px m-4"
    />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import VPagination from "@hennge/vue3-pagination";
import { mapActions } from "vuex";
import worldsStore from "@/store/modules/worlds";
import WorldCard from "@/components/WorldCard";

export default defineComponent({
  name: "WorldsView",
  components: { VPagination, WorldCard },
  data() {
    return {
      worlds: { entities: [], total: 0, files: undefined },
      fetching: false,
      page: 1,
    };
  },
  methods: {
    ...mapActions({
      fetchWorlds: "worlds/fetchWorlds",
    }),
    async loadNextItems() {
      await this.fetchWorlds({ offset: this.page * 12 - 12, limit: 12 });
      this.worlds = worldsStore.worlds;
    },
  },

  computed: {
    pages() {
      return Math.ceil(this.worlds.total / 12);
    },
  },

  async beforeMount() {
    this.fetching = true;
    await this.loadNextItems();
    this.fetching = false;
  },
});
</script>

<style scoped></style>
