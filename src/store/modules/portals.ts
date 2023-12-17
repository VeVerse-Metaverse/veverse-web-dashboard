import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";

import portalApi from "@/api/portals";
import worldsApi from "@/api/worlds";
import store from "../index";

import {
  PortalPayload,
  PortalMetadata,
  PortalEditMetadata,
  WorldMetadata,
  PatchPortalMetadata,
  MsgMetadata,
} from "@/api/models";
import { AxiosError } from "axios";

@Module({ dynamic: true, store, name: "portals", namespaced: true })
export class PortalsModule extends VuexModule {
  portals: PortalPayload = {} as PortalPayload;
  worldPortals: PortalPayload = {} as PortalPayload;
  portal: PortalMetadata = {} as PortalMetadata;
  editablePortal: PortalEditMetadata = {} as PortalEditMetadata;
  worlds: WorldMetadata = {} as WorldMetadata;
  errMsg = "";

  @Mutation patchPortalErr(payload: MsgMetadata) {
    this.errMsg = payload.errMsg;
  }

  @Mutation
  setEditablePortal(payload: { [name: string]: any }) {
    this.editablePortal = payload.portal;
  }

  @Mutation
  setPortal(payload: { [name: string]: any }) {
    this.portal = payload.portal;
  }

  @Mutation
  setPortals(payload: { [name: string]: any }) {
    this.portals = payload.portals;
  }

  @Mutation
  setWorldPortals(payload: { [name: string]: any }) {
    this.worldPortals = payload.portals;
  }

  @Mutation
  setWorlds(payload: { [name: string]: any }) {
    this.worlds = payload.worlds;
  }

  @Action({ rawError: true })
  async fetchPortals(payload: { [name: string]: any }) {
    try {
      const portals = await portalApi.index(
        payload.worldId,
        payload.offset ? payload.offset : 0,
        payload.limit ? payload.limit : 20
      );

      if (payload.worldId && payload.worldId != "") {
        this.context.commit("setWorldPortals", {
          portals: portals.data,
        });
      } else {
        this.context.commit("setPortals", {
          portals: portals.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  @Action({ rawError: true })
  async fetchPortal(payload: { [name: string]: any }) {
    try {
      const portal = await portalApi.get(payload.id);
      this.context.commit("setPortal", {
        portal: portal.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  @Action({ rawError: true })
  async fetchWorlds(payload: { [name: string]: any }) {
    try {
      const worlds = await worldsApi.index(
        payload.offset ? payload.offset : 0,
        payload.limit ? payload.limit : 20
      );

      this.context.commit("setWorlds", {
        worlds: worlds.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  @Action({ rawError: true })
  async patchPortal(payload: PatchPortalMetadata) {
    try {
      const portal = await portalApi.updatePortal(payload.id, {
        name: payload.name,
        destinationId: payload.destinationId,
        spaceId: payload.worldId,
      });

      this.context.commit("setEditablePortal", {
        portal: portal.data,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        const { data }: any = error.response;
        this.context.commit("patchPortalErr", { errMsg: data.detail });
      } else {
        console.log(error);
      }
    }
  }
}

export default getModule(PortalsModule);
