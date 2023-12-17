<template>
  <div class="build-jobs-container w-full my-5">
    <h1
      class="title-st text-5xl uppercase leading-normal mt-4 mb-2 text-gray-200"
    >
      Build Jobs
    </h1>
    <h3 class="title-st text-4xl uppercase leading-normal mt-10 text-gray-200">
      Releases
    </h3>
    <JobsTable type="Release" />

    <h3 class="title-st text-4xl uppercase leading-normal mt-10 text-gray-200">
      Packages
    </h3>
    <JobsTable type="Package" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import JobsTable from "@/components/JobsTable";

export default defineComponent({
  name: "BuildJobsView",
  components: { JobsTable },
  data() {
    return {};
  },
  methods: {},
});
</script>
