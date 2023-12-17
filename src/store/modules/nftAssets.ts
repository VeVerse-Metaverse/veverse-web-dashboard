import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";
import store from "@/store/index";
import nftAssetsApi from "@/api/nftAssets";

import { NFTAssetEntity, PaginationRequestMetadata } from "@/api/models";

@Module({ dynamic: true, store, name: "nftAssets", namespaced: true })
export class NFTAssetsModule extends VuexModule {
  assets: Array<NFTAssetEntity> = [];
  total = 0;
  errMsg = "";

  @Mutation
  setAssets(payload: { [name: string]: any }) {
    this.assets = payload.assets;
    this.total = payload.total;
  }

  @Action({ rawError: true })
  async fetchNFTAssets(payload: PaginationRequestMetadata) {
    try {
      const {
        entities,
        total,
      }: {
        entities: Array<NFTAssetEntity>;
        total: number;
      } = await nftAssetsApi.fetchNFTAssets(payload.offset, payload.limit);

      this.context.commit("setAssets", { assets: entities, total });
    } catch (error) {
      console.log(error);
    }
  }
}

export default getModule(NFTAssetsModule);
