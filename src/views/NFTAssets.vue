<template>
  <div class="w-full my-5">
    <h1
      class="title-st text-5xl uppercase leading-normal mt-4 mb-2 text-gray-200"
    >
      My Assets
    </h1>
    <div class="overflow-y-scroll my-10">
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
      <div class="item-block grid mx-5">
        <NFTAssetCard
          v-for="asset in assets"
          :key="asset.objectName"
          :asset="asset"
        />
      </div>
    </div>
    <v-pagination
      v-if="pages > 1"
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
import VPagination from "@hennge/vue3-pagination";
import { mapActions } from "vuex";
import nftAssetsStore from "@/store/modules/nftAssets";
import authStore from "@/store/modules/auth";

import NFTAssetCard from "@/components/NFTAssetCard";

export default {
  name: "NFTAssets",
  components: { NFTAssetCard, VPagination },
  data() {
    return {
      assets: [],
      fetching: false,
      page: 1,
    };
  },
  async created() {
    if (authStore.jwtToken) {
      this.fetching = true;
      const filters = this.getFilters();
      await this.checkNFTAssets(filters);
      this.assets = nftAssetsStore.assets;
      this.fetching = false;
    }
  },
  methods: {
    ...mapActions({
      checkNFTAssets: "nftAssets/fetchNFTAssets",
    }),
    getFilters() {
      return { offset: this.page * 10 - 10, limit: 10 };
    },
    async loadNextItems() {
      this.fetching = true;
      const filters = this.getFilters();
      await this.checkNFTAssets(filters);
      this.assets = nftAssetsStore.assets;
      this.fetching = false;
    },
  },
  computed: {
    pages() {
      return Math.ceil(nftAssetsStore.total / 10);
    },
  },
};
</script>

<style scoped></style>
