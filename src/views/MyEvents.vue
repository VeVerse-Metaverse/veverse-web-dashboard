<template>
  <div class="w-full my-5">
    <h1
      class="title-st text-5xl uppercase leading-normal mt-4 mb-2 text-gray-200"
    >
      My events
    </h1>
    <div v-if="!fetching">
      <div class="flex flex-wrap justify-center">
        <MyEventCard
          v-for="event in events.entities"
          :key="event"
          :event="event"
        ></MyEventCard>

        <div v-if="events.entities.length === 0">
          <h2 class="text-2xl font-600 leading-normal mt-4 mb-2 text-gray-500">
            No Events
          </h2>
        </div>
      </div>
      <v-pagination
        v-if="events.total > 0"
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
import MyEventCard from "@/components/MyEventCard";
import eventsStore from "@/store/modules/events";
import authStore from "@/store/modules/auth";
import { mapActions } from "vuex";
import VPagination from "@hennge/vue3-pagination";

export default defineComponent({
  name: "MyEventsView",
  components: { MyEventCard, VPagination },
  data() {
    return {
      events: eventsStore.userEvents,
      fetching: false,
      page: 1,
    };
  },
  methods: {
    ...mapActions({
      fetchMyEvents: "events/fetchMyEvents",
    }),
    async loadNextItems() {
      await this.fetchEvents({ offset: this.page * 10 - 10, limit: 10 });
      this.events = eventsStore.events;
    },
  },
  computed: {
    pages() {
      return Math.ceil(this.events.total / 10);
    },
  },
  async beforeMount() {
    this.fetching = true;
    await this.fetchMyEvents({ id: authStore.userId, offset: 0, limit: 20 });
    this.events = eventsStore.userEvents;
    this.fetching = false;
  },
});
</script>
