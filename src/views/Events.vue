<template>
  <div class="w-full my-5">
    <h1
      class="title-st text-5xl uppercase leading-normal mt-4 mb-2 text-gray-200"
    >
      Events
    </h1>
    <div v-if="!fetching">
      <div class="flex flex-wrap justify-center">
        <EventCard
          v-for="event in events.entities"
          :key="event"
          :event="event"
        ></EventCard>
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
import EventCard from "@/components/EventCard";
import eventsStore from "@/store/modules/events";
import { mapActions } from "vuex";
import VPagination from "@hennge/vue3-pagination";

export default defineComponent({
  name: "EventsView",
  components: { EventCard, VPagination },

  data() {
    return {
      events: eventsStore.events,
      fetching: false,
      page: 1,
    };
  },

  methods: {
    ...mapActions({
      fetchEvents: "events/fetchEvents",
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
    await this.fetchEvents({ offset: 0, limit: 20 });
    this.events = eventsStore.events;
    this.fetching = false;
  },
});
</script>
