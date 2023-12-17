import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";
import store from "@/store";

import { PatchWorldMetadata, WorldEntity, WorldPayload } from "@/api/models";
import worldsApi from "@/api/worlds";
import filesApi from "@/api/files";
import { AxiosError } from "axios";

@Module({ dynamic: true, store, name: "worlds", namespaced: true })
export class WorldsModule extends VuexModule {
  worlds: WorldPayload = {} as WorldPayload;
  world: WorldEntity = {} as WorldEntity;
  editableWorld: WorldEntity = {} as WorldEntity;

  @Mutation
  setWorldPreviewUrl(payload: { [name: string]: any }) {
    if (this.world && this.world.files) {
      const file = this.world.files.find((file) => file.id == payload.fileId);
      if (file) {
        file.downloadUrl = payload.url;
      }
    }
  }

  @Mutation
  setWorlds(payload: { [name: string]: any }) {
    this.worlds = payload.worlds;
  }

  @Mutation
  setWorld(payload: { [name: string]: any }) {
    this.world = payload.world;
  }

  @Action({ rawError: true })
  async fetchWorlds(payload: { [name: string]: any }) {
    try {
      const worlds = await worldsApi.index(
        payload.offset ? payload.offset : 0,
        payload.limit ? payload.limit : 10
      );

      this.context.commit("setWorlds", {
        worlds: worlds.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  @Action({ rawError: true })
  async fetchWorld(payload: { [name: string]: any }) {
    try {
      const world = await worldsApi.get(payload.id);

      this.context.commit("setWorld", {
        world: world.data,
      });
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

  @Mutation
  setEditableWorld(world: WorldEntity) {
    console.log(world);

    this.editableWorld = {
      id: world.id,
      name: world.name,
      map: world.map,
      description: world.description,
      public: world.public,
    };
  }

  @Action({ rawError: true })
  async patchWorld(payload: PatchWorldMetadata) {
    try {
      const world = await worldsApi.update(payload.id, payload);
      this.context.commit("setEditableWorld", world.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        const { data }: any = error.response;
        this.context.commit("patchWorldErr", { errMsg: data });
      } else {
        console.log(error);
      }
    }
  }
}

export default getModule(WorldsModule);
