<template>
  <div
    :class="[
      'flex flex-col event-card max-w-full max-w-[300px] min-w-[300px] rounded overflow-hidden shadow-lg bg-gray-800 p-4 bg-opacity-50 m-3',
      'md:max-w-[230px] md:min-w-[230px]',
    ]"
  >
    <div class="px-6 py-4">
      <div class="text-xl mb-2">{{ portal.name || "N/A" }}</div>
      <!--      <p class="text-white-400 text-base">-->
      <!--        {{ portal.name }}-->
      <!--      </p>-->
    </div>
    <div class="flex flex-col justify-end grow">
      <div class="px-2 pt-2 flex flex-wrap justify-center">
        <!--        <div class="w-full md:w-1/2 px-1 mb-6 md:mb-0">-->
        <!--          <div class="flex justify-center p-2">-->
        <!--                        <router-link-->
        <!--                          :to="'/portals/' + portal.id"-->
        <!--                          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none"-->
        <!--                        >-->
        <!--                          View-->
        <!--                        </router-link>-->
        <!--          </div>-->
        <!--        </div>-->
        <div class="w-full md:w-1/2 px-1 mb-6 md:mb-0">
          <div class="flex justify-center p-2">
            <button
              @click="setEditablePortal"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
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
export default {
  name: "PortalCard",
  components: {},
  data() {
    return {};
  },
  computed: {},
  props: {
    portal: {},
  },
  methods: {
    setEditablePortal() {
      // this.setUserEditableEvent({ event: this.event });
      this.$router.push({ path: `/portals/${this.portal.id}/edit` });
    },
  },
};
</script>

<style scoped></style>
