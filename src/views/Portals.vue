<template>
  <div class="w-full my-5">
    <h1
      class="title-st text-5xl uppercase leading-normal mt-4 mb-2 text-gray-200"
    >
      Portals
    </h1>
    <div v-if="!fetching" class="flex flex-col">
      <div class="flex flex-wrap justify-center">
        <PortalCard
          v-for="portal in portals.entities"
          :key="portal.id"
          :portal="portal"
        ></PortalCard>
      </div>
      <v-pagination
        v-model="page"
        :pages="pages"
        :range-size="1"
        active-color="#DCEDFF"
        @update:modelValue="loadNextItems"
        class="inline-flex justify-center items-center -space-x-px m-4"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

import PortalCard from "@/components/PortalCard";
import portalsStore from "@/store/modules/portals";
import { mapActions } from "vuex";

export default defineComponent({
  name: "PortalsView",
  components: { PortalCard, VPagination },

  data() {
    return {
      portals: portalsStore.portals,
      fetching: false,
      page: 1,
    };
  },

  methods: {
    ...mapActions({
      fetchPortals: "portals/fetchPortals",
    }),
    async loadNextItems() {
      await this.fetchPortals({ offset: this.page * 12 - 12, limit: 12 });
      this.portals = portalsStore.portals;
    },
  },

  computed: {
    pages() {
      return Math.ceil(this.portals.total / 12);
    },
  },

  async beforeMount() {
    this.fetching = true;
    await this.fetchPortals({ offset: 0, limit: 12 });
    this.portals = portalsStore.portals;
    this.fetching = false;
  },
});
</script>

<style lang="scss">
.Pagination {
  .Control,
  .Page {
    background: rgb(31 41 55 / 0.5) !important;
    width: 48px;
    height: 48px;
    padding: 1em;
  }

  .Page-active {
    background: white !important;
  }
}
</style>
