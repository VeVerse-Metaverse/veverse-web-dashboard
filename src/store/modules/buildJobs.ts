import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";
import store from "@/store/index";
import buildJobsApi from "@/api/buildJobs";

import { BuildJobEntity } from "@/api/models";

@Module({ dynamic: true, store, name: "buildJobs", namespaced: true })
export class BuildJobsModule extends VuexModule {
  jobs: Array<BuildJobEntity> = [];
  offset = 0;
  limit = 10;
  totalPackages = 0;
  totalReleases = 0;
  errMsg = "";

  @Mutation
  setJobs(payload: { [name: string]: any }) {
    this.jobs = payload.jobs;
    this.offset = payload.offset;
    this.limit = payload.limit;

    if (payload.type === "Package") this.totalPackages = payload.total;
    if (payload.type === "Release") this.totalReleases = payload.total;
  }

  @Action({ rawError: true })
  async fetchJobs(payload: { [name: string]: any }) {
    try {
      const {
        data: { jobs, offset, limit, total },
      }: {
        data: {
          jobs: Array<BuildJobEntity>;
          offset: number;
          limit: number;
          total: number;
        };
      } = await buildJobsApi.index(
        payload.offset,
        payload.limit,
        payload.status,
        payload.type
      );

      this.context.commit("setJobs", {
        jobs: jobs,
        type: payload.type,
        offset,
        limit,
        total,
      });
    } catch (error) {
      console.log(error);
    }
  }
  @Action({ rawError: true })
  async rescheduleJob(payload: { [name: string]: any }) {
    try {
      const data = await buildJobsApi.rescheduleJob(payload.id);
    } catch (error) {
      console.log(error);
    }
  }

  @Action({ rawError: true })
  async cancelJob(payload: { [name: string]: any }) {
    try {
      const data = await buildJobsApi.cancelJob(payload.id);
    } catch (error) {
      console.log(error);
    }
  }
}

export default getModule(BuildJobsModule);
