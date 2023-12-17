<template>
  <div class="edit-event-container w-full my-5 pb-10">
    <h1
      class="title-st text-5xl uppercase leading-normal mt-4 mb-2 text-gray-200"
    >
      Edit Event
    </h1>
    <div v-if="!isLoading" class="grid place-items-center">
      <form class="w-full max-w-xl">
        <div class="flex flex-col items-center mb-6">
          <div class="w-1/2">
            <label
              class="block uppercase tracking-wide text-gray-300 text-xs mb-2"
            >
              Preview image
            </label>
            <v-lazy-image :src="imageUrl" :src-placeholder="placeholder" />
          </div>
          <div class="flex flex-wrap mb-6">
            <div class="w-full px-3">
              <div class="m-4">
                <div class="flex items-center justify-center w-full">
                  <label
                    class="flex flex-col w-full h-32 border-4 border-blue-200 border-dashed hover:bg-opacity-40 hover:bg-gray-800 hover:border-gray-400"
                  >
                    <div class="flex flex-col items-center justify-center pt-7">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-8 h-8 text-gray-400 group-hover:text-gray-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p
                        class="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600"
                      >
                        Attach a file
                      </p>
                    </div>
                    <input
                      :name="uploadFieldName"
                      class="opacity-0"
                      type="file"
                      accept="image/*"
                      @change="
                        handleFileSelected(
                          $event.target.name,
                          $event.target.files
                        )
                      "
                    />
                  </label>
                </div>
              </div>

              <p class="text-gray-400 text-xs italic mb-4">
                You can upload one JPEG or PNG image up to 1 MB
              </p>

              <div class="flex justify-center p-2">
                <button
                  class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                  @click.prevent="handleFileUpload"
                >
                  <span v-if="uploadingImage">
                    <svg
                      class="inline mr-2 w-4 h-4 text-gray-200 animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="#1C64F2"
                      />
                    </svg>
                  </span>
                  <span v-else>Upload</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-wrap mb-6">
          <div class="w-full px-3 mb-6">
            <label
              class="block uppercase tracking-wide text-gray-300 text-xs mb-2"
              for="grid-title"
            >
              Title
            </label>
            <input
              class="appearance-none rounded-none relative block w-full px-3 py-2 mb-3 placeholder-gray-500 text-gray-100 focus:outline-none focus:z-10 sm:text-sm"
              id="grid-title"
              type="text"
              placeholder="Title of your metaverse event"
              v-model="event.title"
            />
          </div>
          <div class="w-full px-3 mb-6">
            <label
              class="block uppercase tracking-wide text-gray-300 text-xs mb-2"
              for="grid-summary"
            >
              Summary
            </label>
            <div class="flex flex-col p-3 mb-5 border-[1px] border-gray-600">
              {{ event.summary }}
            </div>
          </div>
          <div class="w-full px-3 mb-6">
            <label
              class="block uppercase tracking-wide text-gray-300 text-xs mb-2"
              for="grid-description"
            >
              Description
            </label>
            <textarea
              class="appearance-none rounded-none relative block w-full px-3 py-2 mb-3 placeholder-gray-500 text-gray-100 focus:outline-none focus:z-10 sm:text-sm"
              id="grid-description"
              type="text"
              placeholder="Description for people who would like to know more about your event"
              v-model="event.description"
            />
          </div>
        </div>
        <div class="flex flex-wrap mb-6">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-300 text-xs mb-2"
            >
              Schedule
            </label>
          </div>
          <Datepicker class="w-full px-3 mb-6" v-model="date" dark range />
        </div>

        <div class="flex flex-wrap mb-2">
          <div class="w-full px-3">
            <label
              class="block uppercase tracking-wide text-gray-300 text-xs mb-2"
              for="grid-state"
            >
              Event
            </label>
            <div class="relative">
              <div class="flex flex-col p-3 mb-5 border-[1px] border-gray-600">
                <div class="flex flex-col mb-2">
                  <label class="text-gray-500">Title:</label>
                  <span>{{ eventData.title }}</span>
                </div>
                <div class="flex flex-col mb-2">
                  <label class="text-gray-500">Description:</label>
                  <span>{{ eventData.description }}</span>
                </div>
                <div class="flex flex-col">
                  <label class="text-gray-500">Price:</label>
                  <span>${{ eventData.price }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full mb-6 md:mb-0 flex justify-center">
          <button
            class="group relative w-full flex justify-center py-2 border border-transparent text-sm font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
            @click.prevent="saveEvent"
          >
            <span v-if="isSaving">
              <svg
                class="inline mr-2 w-4 h-4 text-gray-200 animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#1C64F2"
                />
              </svg>
            </span>
            <span v-else>Save</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapMutations } from "vuex";
import VLazyImage from "v-lazy-image";

import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import eventsStore from "@/store/modules/events";
import entitiesStore from "@/store/modules/entities";

export default defineComponent({
  name: "EditEventView",
  components: {
    Datepicker,
    VLazyImage,
  },
  data() {
    return {
      uploadFieldName: "eventImage",
      selectedUploadFile: {},
      eventTypes: {
        prod_1: {
          id: "prod_1",
          title: "Exclusive",
          description: "up to 50 person event",
          price: "249.95",
        },
        prod_2: {
          id: "prod_2",
          title: "Mega",
          description: "up to 100 person event",
          price: "499.95",
        },
      },
      event: null,
      isSaving: false,
      isLoading: false,
      uploadingImage: false,
      placeholder:
        "https://lh3.googleusercontent.com/H0hU6qzTUJc-FBHiJoCd-Fw24RhHoXx3cER87tbJZaiYDiAXi85RSuU4QXa6DK3xV4r1zqneGxATRflqPr1XqVowYslivIh7WHFcTlE=w600",
      imageUrl: "",
      date: [],
    };
  },
  methods: {
    ...mapActions({
      uploadFile: "entities/uploadFile",
      patchEvent: "events/patchEvent",
      fetchEvent: "events/fetchEvent",
    }),
    ...mapMutations({
      changeEditableFile: "events/changeEditableFile",
      setUserEditableEvent: "events/setUserEditableEvent",
    }),
    handleFileSelected(fieldName, fileList) {
      if (!fileList.length) return;
      this.selectedUploadFile = fileList[0];
    },
    async handleFileUpload() {
      this.uploadingImage = true;
      await this.uploadFile({ file: this.selectedUploadFile });
      this.changeEditableFile({
        type: "image_preview",
        data: entitiesStore.uploadedFile,
      });
      this.event = eventsStore.userEditableEvent;
      await this.updatePreviewImage();
      this.uploadingImage = false;
    },
    async saveEvent() {
      this.isSaving = true;
      await this.patchEvent(this.event);
      this.isSaving = false;
    },
    async getEvent() {
      const event = eventsStore.userEditableEvent;
      if (Object.keys(event).length === 0) {
        await this.fetchEvent({ id: this.$route.params.id });
        this.setUserEditableEvent({ event: eventsStore.event });
        this.event = eventsStore.userEditableEvent;
      } else {
        eventsStore.userEditableEvent.files.reverse();
        this.event = eventsStore.userEditableEvent;
      }

      this.date = [this.event.startsAt, this.event.endsAt];

      await this.updatePreviewImage();
    },
    async updatePreviewImage() {
      if (this.event.files) {
        const files = this.event.files;
        const file = files.reverse().find((f) => f.type === "image_preview");

        if (file) {
          const result = await eventsStore.getPreviewUrl({
            type: "setUserEditableEventPreviewUrl",
            id: this.event.id,
            fileId: file.id,
          });

          this.imageUrl = result;
        } else {
          this.imageUrl = this.placeholder + `?`;
        }
      }
    },
  },
  async created() {
    this.isLoading = true;
    await this.getEvent();

    this.isLoading = false;
  },
  computed: {
    eventData() {
      return this.eventTypes[this.event.type]
        ? this.eventTypes[this.event.type]
        : { title: "N/A", description: "N/A", price: "N/A" };
    },
  },
  watch: {
    date() {
      this.event.startsAt = this.date[0];
      this.event.endsAt = this.date[1];
    },
  },
});
</script>
