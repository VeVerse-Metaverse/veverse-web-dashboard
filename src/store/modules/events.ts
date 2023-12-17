import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";

import store from "@/store";
import eventApi from "@/api/events";
import filesApi from "@/api/files";

import { EventMetadata, EventPayload, FileMetadata } from "@/api/models";

@Module({ dynamic: true, store, name: "events", namespaced: true })
export class EventsModule extends VuexModule {
  uploadedFile: FileMetadata = {} as FileMetadata;
  events: EventPayload = {} as EventPayload;
  event: EventMetadata = {} as EventMetadata;
  userEvents: EventPayload = {} as EventPayload;
  userEditableEvent: EventMetadata = {} as EventMetadata;

  @Mutation
  setUserEditableEvent(payload: { [name: string]: any }) {
    this.userEditableEvent = payload.event;
  }

  @Mutation
  setEventUploadedFile(payload: { [name: string]: any }) {
    this.uploadedFile = payload.file;
  }

  @Mutation
  setEvent(payload: { [name: string]: any }) {
    this.event = payload.event;
  }

  @Mutation
  setEvents(payload: { [name: string]: any }) {
    this.events = payload.events;
  }

  @Mutation
  setUserEvents(payload: { [name: string]: any }) {
    this.userEvents = payload.events;
  }

  @Mutation
  changeEditableFile(payload: { type: string; data: any }) {
    const index = this.userEditableEvent.files.length;
    this.userEditableEvent.files[index] = payload.data;
  }

  @Action({ rawError: true })
  async fetchEvents(payload: { [name: string]: any }) {
    try {
      const events = await eventApi.index(
        payload.offset ? payload.offset : 0,
        payload.limit ? payload.limit : 20
      );
      this.context.commit("setEvents", {
        events: events.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  @Action({ rawError: true })
  async fetchEvent(payload: { [name: string]: any }) {
    try {
      const event = await eventApi.get(payload.id);
      this.context.commit("setEvent", {
        event: event.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  @Action({ rawError: true })
  async fetchMyEvents(payload: { [name: string]: any }) {
    try {
      const events = await eventApi.getMyEvents(
        payload.id,
        payload.offset ? payload.offset : 0,
        payload.limit ? payload.limit : 20
      );

      this.context.commit("setUserEvents", {
        events: events.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  @Mutation
  setEventPreviewUrl(payload: { [name: string]: any }) {
    const file = this.event.files.find((file) => file.id == payload.fileId);
    if (file) {
      file.downloadUrl = payload.url;
    }
  }

  @Mutation
  setEventsPreviewUrl(payload: { [name: string]: any }) {
    const event = this.events.entities.find((event) => event.id == payload.id);
    if (event) {
      const file = event.files.find((file) => file.id == payload.fileId);
      if (file) {
        file.downloadUrl = payload.url;
      }
    }
  }

  @Mutation
  setUserEventsPreviewUrl(payload: { [name: string]: any }) {
    const event = this.userEvents.entities.find(
      (event) => event.id == payload.id
    );

    if (event) {
      const file = event.files.find((file) => file.id == payload.fileId);
      if (file) {
        file.downloadUrl = payload.url;
      }
    }
  }

  @Mutation
  setUserEditableEventPreviewUrl(payload: { [name: string]: any }) {
    const files = this.userEditableEvent.files;
    const file = files.reverse().find((file) => file.id == payload.fileId);

    if (file) {
      file.downloadUrl = payload.url;
    }
  }

  @Action({ rawError: true })
  async createEvent(payload: { [name: string]: any }) {
    try {
      const event = await eventApi.create({
        title: payload.title,
        summary: payload.summary,
        description: payload.description,
        public: payload.public,
        startsAt: payload.startsAt,
        type: payload.type,
        endsAt: payload.endsAt,
      });

      this.context.commit("setUserEditableEvent", { event: event.data });
    } catch (error) {
      console.log(error);
    }
  }

  @Action({ rawError: true })
  async getPreviewUrl(payload: { [name: string]: any }) {
    const id = payload.id;
    const fileId = payload.fileId;

    const url = await filesApi.getDownloadLink(id, payload.fileId);
    this.context.commit(payload.type, {
      id,
      fileId,
      url,
    });

    return url;
  }

  @Action({ rawError: true })
  async patchEvent(payload: { [name: string]: any }) {
    try {
      const event = await eventApi.updateEvent(payload.id, {
        name: payload.name,
        title: payload.title,
        description: payload.description,
        public: payload.public,
        startsAt: new Date(payload.startsAt),
        endsAt: new Date(payload.endsAt),
      });

      this.context.commit("setUserEditableEvent", {
        event: event.data,
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default getModule(EventsModule);
