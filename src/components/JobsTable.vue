<template>
  <div class="flex flex-col mx-10">
    <div class="jobs-filters-block mb-5 flex justify-end">
      <div class="flex items-center px-4 rounded border border-gray-700">
        <input
          :id="`${type}-completed-chk`"
          type="checkbox"
          v-model="completed"
          class="w-4 h-4 text-blue-600 cursor-pointer rounded ring-blue-500 ring-offset-gray-800 bg-gray-700 border-gray-600"
        />
        <label
          :for="`${type}-completed-chk`"
          class="py-4 ml-2 cursor-pointer w-full text-sm font-medium text-gray-300"
          >Completed</label
        >
      </div>
    </div>
    <div
      :class="[
        'table-auto overflow-x-auto max-w-[calc(100vw-360px)]',
        'md:max-w-[calc(100vw-140px)]',
      ]"
    >
      <table
        class="job-table border-collapse w-full border border-slate-500 bg-slate-800 text-sm shadow-sm"
      >
        <thead class="bg-slate-700">
          <tr>
            <th
              v-if="type === 'Release'"
              class="w-1/2 border border-slate-600 font-semibold p-4 text-slate-200 text-left"
            >
              App Name
            </th>
            <th
              v-if="type === 'Package'"
              class="w-1/2 border border-slate-600 font-semibold p-4 text-slate-200 text-left"
            >
              Package Name
            </th>
            <th
              class="w-1/2 border border-slate-600 font-semibold p-4 text-slate-200 text-left"
            >
              Configuration
            </th>
            <th
              class="w-1/2 border border-slate-600 font-semibold p-4 text-slate-200 text-left"
            >
              Platform
            </th>
            <th
              class="w-1/2 border border-slate-600 font-semibold p-4 text-slate-200 text-left"
            >
              Base Release
            </th>
            <th
              class="w-1/2 border border-slate-600 font-semibold p-4 text-slate-200 text-left"
            >
              Deployment
            </th>
            <th
              v-if="type === 'Package'"
              class="w-1/2 border border-slate-600 font-semibold p-4 text-slate-200 text-left"
            >
              Map
            </th>
            <!--            <th-->
            <!--              class="w-1/2 border border-slate-600 font-semibold p-4 text-slate-200 text-left"-->
            <!--            >-->
            <!--              Release-->
            <!--            </th>-->
            <!--            <th-->
            <!--              class="w-1/2 border border-slate-600 font-semibold p-4 text-slate-200 text-left"-->
            <!--            >-->
            <!--              Version-->
            <!--            </th>-->
            <th
              class="w-1/2 border border-slate-600 font-semibold p-4 text-slate-200 text-left"
            >
              Created At
            </th>
            <th
              class="w-1/2 border border-slate-600 font-semibold p-4 text-slate-200 text-left"
            >
              Status
            </th>
            <th
              v-if="jobs && jobs.length > 0"
              class="w-1/2 border border-slate-600 font-semibold p-4 text-slate-200 text-left"
            ></th>
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
          <tr v-for="job in jobs" :key="job.id">
            <td
              v-if="type === 'Release'"
              class="border border-slate-700 p-4 text-slate-400"
            >
              <div class="flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-4 h-4 inline mr-1"
                  v-tooltip="`${job.appDescription}`"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                  />
                </svg>
                {{ job.appName }}
              </div>
            </td>
            <td
              v-if="type === 'Package'"
              class="border border-slate-700 p-4 text-slate-400"
            >
              {{ job.packageName }}
            </td>
            <td class="border border-slate-700 p-4 text-slate-400">
              {{ job.configuration }}
            </td>
            <td class="border border-slate-700 p-4 text-slate-400">
              {{ job.platform }}
            </td>
            <td class="border border-slate-700 p-4 text-slate-400">
              {{ job.releaseVersion }}
            </td>
            <td class="border border-slate-700 p-4 text-slate-400">
              {{ job.deployment }}
            </td>
            <td
              v-if="type === 'Package'"
              class="border border-slate-700 p-4 text-slate-400"
            >
              {{ job.map }}
            </td>
            <!--            <td class="border border-slate-700 p-4 text-slate-400">-->
            <!--              {{ job.releaseName }}-->
            <!--            </td>-->
            <!--            <td class="border border-slate-700 p-4 text-slate-400">-->
            <!--              {{ job.version }}-->
            <!--            </td>-->
            <td
              class="border border-slate-700 p-4 text-slate-400 whitespace-nowrap"
            >
              {{ formatDate(job.createdAt) }}
            </td>
            <td
              class="border border-slate-700 p-4 text-slate-400 whitespace-nowrap"
            >
              {{ job.status }}
            </td>
            <td
              v-if="jobs && jobs.length > 0"
              class="border border-slate-700 p-4 text-slate-400 whitespace-nowrap"
            >
              <button
                v-if="
                  ['completed', 'canceled'].includes(
                    job.status.toLowerCase()
                  ) ||
                  (job.updatedAt &&
                    checkHowLongDate(job.createdAt, job.updatedAt))
                "
                @click="rescheduleBuildJob(job.id)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="green"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </button>
              <button
                v-if="['unclaimed'].includes(job.status)"
                @click.prevent="cancelBuildJob(job.id)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="red"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
        <tfoot v-if="jobs && jobs.length === 0">
          <tr>
            <td colspan="10">
              <h1 class="text-2xl py-5">No Jobs</h1>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <v-pagination
      v-if="pages > 0"
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
import { mapActions } from "vuex";
import buildJobsStore from "@/store/modules/buildJobs";
import authStore from "@/store/modules/auth";
import VPagination from "@hennge/vue3-pagination";

import { format } from "fecha";

import "floating-vue/dist/style.css";

export default defineComponent({
  name: "JobsTable",
  components: { VPagination },
  props: ["type"],
  data() {
    return {
      fetching: true,
      jobs: null,
      page: 1,
      completed: false,
    };
  },
  methods: {
    ...mapActions({
      fetchJobs: "buildJobs/fetchJobs",
      rescheduleJob: "buildJobs/rescheduleJob",
      cancelJob: "buildJobs/cancelJob",
    }),
    formatDate(date) {
      return format(new Date(date), "YYYY-MM-DD hh:mm");
    },
    async cancelBuildJob(id) {
      await this.cancelJob({ id });
      await this.loadNextItems();
    },
    async rescheduleBuildJob(id) {
      await this.rescheduleJob({ id });
      await this.loadNextItems();
    },
    async loadNextItems() {
      this.fetching = true;
      const filters = this.getFilters();
      await this.fetchJobs(filters);
      this.jobs = buildJobsStore.jobs;
      this.fetching = false;
    },
    getFilters() {
      let filters = { offset: this.page * 10 - 10, limit: 10 };

      if (this.completed) {
        filters.status = "completed";
      }

      if (this.type) {
        filters.type = this.type;
      }

      return filters;
    },
    checkHowLongDate(createdAt, updatedAt) {
      const diff = new Date() - new Date(updatedAt);
      return diff / (1000 * 60 * 60) > 5;
    },
  },
  async beforeMount() {
    if (authStore.jwtToken) {
      this.fetching = true;
      const filters = this.getFilters();
      await this.fetchJobs(filters);
      this.jobs = buildJobsStore.jobs;
      this.fetching = false;
    }
  },
  computed: {
    pages() {
      if (this.type === "Release")
        return Math.ceil(buildJobsStore.totalReleases / 10);
      else return Math.ceil(buildJobsStore.totalPackages / 10);
    },
  },
  watch: {
    async completed() {
      await this.loadNextItems();
    },
  },
});
</script>

<style scoped></style>

<style scoped lang="scss">
.job-table {
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
