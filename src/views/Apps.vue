<template>
  <div class="build-jobs-container w-full my-5">
    <h1
      class="title-st text-5xl uppercase leading-normal mt-4 mb-2 text-gray-200"
    >
      Apps
    </h1>
    <div class="flex flex-col mx-10">
      <div
        :class="[
          'table-auto overflow-x-auto max-w-[calc(100vw-360px)]',
          'md:max-w-[calc(100vw-140px)]',
        ]"
      >
        <table
          class="apps-table border-collapse w-full border border-slate-500 bg-slate-800 text-sm shadow-sm"
        >
          <thead class="bg-slate-700">
            <tr>
              <th
                class="w-1/2 border border-slate-600 font-semibold p-4 text-slate-200 text-left"
              >
                App Name
              </th>
              <th
                class="w-1/2 border border-slate-600 font-semibold p-4 text-slate-200 text-left"
              >
                Description
              </th>
            </tr>
          </thead>
          <tbody :class="['relative', fetching ? 'fetching' : '']">
            <tr
              v-if="fetching"
              class="absolute flex items-center justify-center w-full h-full"
            >
              <td colspan="10">
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
              </td>
            </tr>
            <tr v-if="fetching">
              <td colspan="10" class="p-5">&nbsp;</td>
            </tr>
            <tr v-for="app in entities" :key="app.id">
              <td
                class="border border-slate-700 p-4 whitespace-nowrap text-blue-600"
              >
                <router-link :to="'/releases?appId=' + app.id">
                  {{ app.name }}
                </router-link>
              </td>
              <td class="border border-slate-700 p-4 text-slate-400">
                {{ app.description }}
              </td>
            </tr>
          </tbody>
          <tfoot v-if="entities && entities.length === 0">
            <tr>
              <td colspan="10">
                <h1 class="text-2xl py-5">No Apps</h1>
              </td>
            </tr>
          </tfoot>
        </table>
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
    <div class="flex flex-col mx-10">
      <router-link
        to="/apps/create"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create App
      </router-link>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions } from "vuex";
import appsStore from "@/store/modules/apps";
import authStore from "@/store/modules/auth";
import VPagination from "@hennge/vue3-pagination";

export default defineComponent({
  name: "AppsView",
  components: { VPagination },
  data() {
    return {
      fetching: true,
      entities: null,
      page: 1,
      completed: false,
    };
  },
  methods: {
    ...mapActions({
      fetchApps: "apps/fetchApps",
    }),
    async loadNextItems() {
      this.fetching = true;
      const filters = this.getFilters();
      await this.fetchApps(filters);
      this.entities = appsStore.entities;
      this.fetching = false;
    },
    getFilters() {
      return { offset: this.page * 10 - 10, limit: 10 };
    },
  },
  async beforeMount() {
    if (authStore.jwtToken) {
      this.fetching = true;
      const filters = this.getFilters();
      await this.fetchApps(filters);
      this.entities = appsStore.entities;
      this.fetching = false;
    }
  },
  computed: {
    pages() {
      return Math.ceil(appsStore.total / 10);
    },
  },
  watch: {
    async completed() {
      await this.loadNextItems();
    },
  },
});
</script>

<style scoped lang="scss">
.apps-table {
  tbody {
    &.fetching::after {
      content: "";
      display: block;
      padding: 20px;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      background: #17192dc9;
    }
  }
}
</style>
