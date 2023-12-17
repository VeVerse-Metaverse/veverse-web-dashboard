import {
  getModule,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";
import store from "@/store";

export interface IWalletInterface {
  defaultWallet: string;
  chainId: number;
}

@Module({ dynamic: true, store, name: "wallet", namespaced: true })
export class WalletModule extends VuexModule implements IWalletInterface {
  defaultWallet = "metamask";
  chainId = 4;
  symbol = "ETH";

  @Mutation
  restoreSavedState(payload: { [name: string]: any }) {
    if (payload.defaultWallet) this.defaultWallet = payload.defaultWallet;
    if (payload.chainId) this.chainId = payload.chainId;
  }

  @Mutation
  setWallet(payload: { [name: string]: any }) {
    this.defaultWallet = payload.defaultWallet;
    this.chainId = payload.chainId;
    this.symbol = payload.symbol;
  }
}

export default getModule(WalletModule);
