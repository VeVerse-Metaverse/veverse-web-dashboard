import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";

import store from "../index";
import { FileMetadata } from "@/api/models";
import eventsStore from "@/store/modules/events";
import entityApi from "@/api/entities";

@Module({ dynamic: true, store, name: "entities", namespaced: true })
export class EntitiesModule extends VuexModule {
  uploadedFile: FileMetadata = {} as FileMetadata;

  @Mutation
  setUploadedFile(payload: { [name: string]: any }) {
    this.uploadedFile = payload.file;
  }

  @Action({ rawError: true })
  async uploadFile(payload: { [name: string]: any }) {
    try {
      const file = await entityApi.uploadFile(
        { id: eventsStore.userEditableEvent.id },
        payload.file
      );

      if (!file.err) {
        this.context.commit("setUploadedFile", { file });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default getModule(EntitiesModule);
