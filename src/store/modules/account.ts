import {
  Action,
  getModule,
  Module,
  Mutation,
  VuexModule,
} from "vuex-module-decorators";
import store from "../index";
import { User } from "@/api/models";
import userApi from "@/api/users";
import authStore from "@/store/modules/auth";

@Module({ dynamic: true, store, name: "account", namespaced: true })
export class AccountModule extends VuexModule {
  me: User = {} as User;
  linkMsg = "";

  @Mutation
  setMe(payload: User) {
    this.me = payload;
  }

  @Action({ rawError: true })
  async fetchMe() {
    const me = await userApi.me(authStore.jwtToken);
    this.context.commit("setMe", me.data);
  }

  @Mutation
  setLinkingMsg(payload: { [name: string]: any }) {
    this.linkMsg = payload.msg;
  }

  @Action({ rawError: true })
  async linkAccount(payload: { [name: string]: any }) {
    try {
      const { code, verified } = await userApi.linkAccount(
        payload.address,
        payload.signature,
        payload.email
      );

      if (code === 200) {
        if (verified) {
          this.context.commit("setLinkingMsg", {
            msg: "Confirmation email was sent. Please confirm linking your account and login or connect your wallet",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default getModule(AccountModule);
