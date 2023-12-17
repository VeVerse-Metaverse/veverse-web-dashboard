import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";
import store from "@/store/index";
import appsApi from "@/api/apps";

import { AppReleaseEntity, FileEntity, AppEntity } from "@/api/models";

@Module({ dynamic: true, store, name: "apps", namespaced: true })
export class AppsModule extends VuexModule {
  latestRelease: Array<AppReleaseEntity> = [];
  entities: Array<AppEntity> = [];
  offset = 0;
  limit = 10;
  total = 0;
  releaseAppId: undefined;
  errMsg = "";

  @Mutation
  setLatestReleases(payload: { [name: string]: any }) {
    this.latestRelease = payload.releases;
    this.offset = payload.offset;
    this.limit = payload.limit;
    this.total = payload.total;
  }

  @Action({ rawError: true })
  async fetchLatestReleases(payload: { [name: string]: any }) {
    try {
      const {
        data: { entities, offset, limit, total },
      }: {
        data: {
          entities: any[];
          offset: number;
          limit: number;
          total: number;
        };
      } = await appsApi.indexLatestReleases(
        payload.appId,
        payload.offset,
        payload.limit
        // payload.status
      );

      let e = [];
      if (entities && entities.length > 0) {
        e = entities.reduce(
          (
            result,
            { appId, appName, description, name, public: p, version, files }
          ) =>
            result.concat(
              files.map((file: any) => ({
                appId,
                appName,
                description,
                name,
                public: p,
                releaseVersion: version,
                ...file,
              }))
            ),
          []
        );
      }

      this.context.commit("setLatestReleases", {
        releases: e,
        offset,
        limit,
        total,
      });
    } catch (error) {
      console.log(error);
    }
  }

  @Mutation
  setApps(payload: { [name: string]: any }) {
    this.entities = payload.entities;
    this.offset = payload.offset;
    this.limit = payload.limit;
    this.total = payload.total;
  }

  @Action({ rawError: true })
  async fetchApps(payload: { [name: string]: any }) {
    try {
      const {
        data: { entities, offset, limit, total },
      }: {
        data: {
          entities: AppEntity[];
          offset: number;
          limit: number;
          total: number;
        };
      } = await appsApi.indexApps(
        payload.appId,
        payload.offset,
        payload.limit
        // payload.status
      );

      this.context.commit("setApps", {
        entities,
        offset,
        limit,
        total,
      });
    } catch (error) {
      console.log(error);
    }
  }

  @Mutation
  setReleaseAppId(payload: { [name: string]: any }) {
    this.releaseAppId = payload.appId;
  }

  @Action
  async createApp(payload: { [name: string]: any }) {
    try {
      const { data }: { data: AppEntity } = await appsApi.createApp(payload);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
}

export default getModule(AppsModule);
