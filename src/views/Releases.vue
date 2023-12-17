<template>
  <div class="build-jobs-container w-full my-5">
    <h1
      class="title-st text-5xl uppercase leading-normal mt-4 mb-2 text-gray-200"
    >
      Releases
    </h1>
    <div class="flex flex-col mx-10">
      <div class="release-filters-block my-5 flex justify-end">
        <v-select
          class="style-chooser min-w-[200px]"
          :options="entities"
          label="name"
          :clearable="false"
          v-model="selectedApp"
          :reduce="(app) => app.id"
        >
          <template #option="{ name }">
            <em>{{ name }}</em>
          </template>
          <template #selected-option="{ name }">
            <em>{{ name }}</em>
          </template>
        </v-select>
      </div>
      <div
        :class="[
          'table-auto overflow-x-auto max-w-[calc(100vw-360px)]',
          'md:max-w-[calc(100vw-140px)]',
        ]"
      >
        <table
          class="releases-table border-collapse w-full border border-slate-500 bg-slate-800 text-sm shadow-sm"
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
                Version
              </th>
              <th
                class="w-1/2 border border-slate-600 font-semibold p-4 text-slate-200 text-left"
              >
                Deployment
              </th>
              <th
                class="w-1/2 border border-slate-600 font-semibold p-4 text-slate-200 text-left"
              >
                Name
              </th>
              <th
                class="w-1/2 border border-slate-600 font-semibold p-4 text-slate-200 text-left"
              >
                Description
              </th>
              <th
                class="w-1/2 border border-slate-600 font-semibold p-4 text-slate-200 text-left"
              >
                Platform
              </th>
              <th
                class="w-1/2 border border-slate-600 font-semibold p-4 text-slate-200 text-left"
              >
                Filename
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
            <tr v-for="release in releases" :key="release.id">
              <td class="border border-slate-700 p-4 text-slate-400">
                {{ release.appName }}
              </td>
              <td class="border border-slate-700 p-4 text-slate-400">
                {{ release.releaseVersion }}
              </td>
              <td class="border border-slate-700 p-4 text-slate-400">
                {{ release.deploymentType }}
              </td>
              <td class="border border-slate-700 p-4 text-slate-400">
                {{ release.name }}
              </td>
              <td class="border border-slate-700 p-4 text-slate-400">
                {{ release.description }}
              </td>
              <td class="border border-slate-700 p-4 text-slate-400">
                {{ release.platform }}
              </td>
              <td
                class="border border-slate-700 p-4 whitespace-nowrap text-blue-600"
              >
                <a :download="release.originalPath" :href="release.url">
                  {{ release.originalPath }}
                </a>
              </td>
            </tr>
          </tbody>
          <tfoot v-if="releases && releases.length === 0">
            <tr>
              <td colspan="10">
                <h1 class="text-2xl py-5">No App Releases</h1>
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
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapMutations } from "vuex";
import appsStore from "@/store/modules/apps";
import authStore from "@/store/modules/auth";
import VPagination from "@hennge/vue3-pagination";

export default defineComponent({
  name: "AppReleasesView",
  components: { VPagination },
  data() {
    return {
      fetching: true,
      appId: "",
      releases: null,
      apps: [],
      selectedApp: null,
      page: 1,
      completed: false,
    };
  },
  methods: {
    ...mapActions({
      fetchLatestReleases: "apps/fetchLatestReleases",
      fetchApps: "apps/fetchApps",
    }),
    ...mapMutations({
      setReleaseAppId: "apps/setReleaseAppId",
    }),
    async loadNextItems() {
      this.fetching = true;
      let appId = appsStore.releaseAppId;

      if (!appId) {
        appId = this.selectedApp;
      }

      const filters = this.getFilters(appId);
      await this.fetchLatestReleases(filters);
      this.releases = appsStore.latestRelease;
      this.fetching = false;
    },
    getFilters(appId) {
      let filters = { offset: this.page * 10 - 10, limit: 10 };

      if (appId) {
        filters.appId = appId;
      }

      return filters;
    },
    async refreshAppsFilter() {
      await this.fetchApps({ offset: 0, limit: 100 });
      this.apps = appsStore.entities;
      this.selectedApp = (this.apps[0] && this.apps[0].id) || null;
    },
  },
  async beforeMount() {
    if (authStore.jwtToken) {
      this.fetching = true;

      await this.refreshAppsFilter();

      let appId = this.$route.query.appId;
      if (!appId && this.apps.length > 0) {
        this.selectedApp = this.apps[0].id;
      } else {
        this.selectedApp = appId;
      }

      await this.loadNextItems();

      this.fetching = false;
    }
  },
  computed: {
    pages() {
      return Math.ceil(appsStore.total / 10);
    },
  },
  watch: {
    async selectedApp(selectedApp, currApp) {
      if (currApp) {
        this.$router.push({
          name: "releases",
          query: { appId: selectedApp },
        });

        this.setReleaseAppId({ appId: selectedApp });

        await this.loadNextItems();
      }
    },
  },
});
</script>

<style scoped lang="scss">
.releases-table {
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
