import {
  VuexModule,
  Module,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";

import auth from "@/api/auth";
import { timeHelper } from "@/helpers";
import router from "@/router";
import store from "../index";
import { AxiosError } from "axios";
import userApi from "@/api/users";
import { MsgMetadata } from "@/api/models";

export interface IAuthInterface {
  isLoggedIn: boolean;
  apiKey: string;
  userId: number | null;
  expiry: number;
  token: string | null;
  walletAddress: string | null;
  isUserWalletLinked: boolean;
}

@Module({ dynamic: true, store, name: "auth", namespaced: true })
class AuthModule extends VuexModule implements IAuthInterface {
  isLoggedIn = false;
  apiKey = "";
  jwtToken = "";
  userId = null;
  expiry = 0;
  errMsg = "";
  token = null;
  nonce = null;
  walletAddress = null;
  isUserWalletLinked = false;
  showUnlinkedWalletMsg = false;

  get loggedIn() {
    const now = new Date();

    return this.isLoggedIn && this.expiry > now.getTime();
  }

  get isLoginExpired() {
    const now = new Date();
    return this.expiry < now.getTime();
  }

  get hasApiKey() {
    return this.apiKey !== "";
  }

  @Mutation
  setUserApiKey(payload: { [name: string]: any }) {
    this.apiKey = payload.apiKey;
  }

  @Mutation
  signIn(payload: { [name: string]: any }) {
    this.isLoggedIn = payload.isLoggedIn;
    this.apiKey = payload.apiKey;
    this.jwtToken = payload.jwtToken;
    this.userId = payload.userId;
    this.expiry = payload.expiry;
    this.walletAddress = payload.walletAddress;

    if (this.walletAddress !== undefined && this.apiKey !== "") {
      this.isUserWalletLinked = true;
    }
  }

  @Mutation
  signInErr(payload: MsgMetadata) {
    this.errMsg = payload.errMsg;
  }

  @Mutation
  loggedOut() {
    this.isLoggedIn = false;
    this.apiKey = "";
    this.jwtToken = "";
    this.userId = null;
    this.walletAddress = null;
    this.token = null;
  }

  @Action({ rawError: true })
  async logout() {
    this.context.commit("loggedOut");
    await router.push({ name: "login" });
  }

  @Action({ rawError: true })
  async fetchLogin(payload: { [name: string]: any }) {
    try {
      const { data: jwtToken } = await auth.login(
        payload.email,
        payload.password
      );

      console.log(payload);
      const { data: user } = await userApi.me(jwtToken);
      const expiry = timeHelper.getExpirationTime(
        payload.remember ? 4320 : 4320
      );

      this.context.commit("signIn", {
        isLoggedIn: true,
        jwtToken,
        apiKey: user.apiKey,
        userId: user.id,
        expiry,
        ...(user.ethAddress && { walletAddress: user.ethAddress }),
      });

      await router.push({ name: "worlds" });
    } catch (error) {
      if (error instanceof AxiosError) {
        const { data }: any = error.response;
        console.log(data);
        this.context.commit("signInErr", { errMsg: data.message });
      } else {
        this.context.commit("signInErr", { errMsg: "Unknown error" });
        console.log(error);
      }
    }
  }

  @Mutation
  setUnlinkedMsg(payload: { [name: string]: any }) {
    this.showUnlinkedWalletMsg = payload.showMsg;
  }

  @Mutation
  setNonce(payload: { [name: string]: any }) {
    this.nonce = payload.nonce;
  }

  @Action({ rawError: true })
  async fetchNonce(payload: { [name: string]: any }) {
    try {
      const response = await userApi.getNonce(payload.address);
      const { nonce } = response.data;

      this.context.commit("setNonce", {
        nonce,
      });
    } catch (error) {
      console.log(error);
    }
  }

  @Mutation
  signWallet(payload: { [name: string]: any }) {
    this.isLoggedIn = payload.isLoggedIn;
    this.expiry = payload.expiry;
    this.token = payload.token;
    this.walletAddress = payload.address;

    if (payload.jwtToken) {
      this.jwtToken = payload.jwtToken;
    }

    if (payload.apiKey !== "") {
      this.apiKey = payload.apiKey;
      this.userId = payload.userId;
      this.isUserWalletLinked = true;
    } else {
      this.isUserWalletLinked = false;
    }
  }

  @Action({ rawError: true })
  async fetchWeb3Login(payload: { [name: string]: any }) {
    try {
      const response = await auth.web3Login(
        payload.address,
        payload.signature,
        payload.timestamp,
        payload.message
      );

      const { verified, token: jwtToken } = response.data;

      if (verified) {
        let user = null;
        if (jwtToken) {
          const { data: u } = await userApi.me(jwtToken);
          user = u;
        }

        const expiry = timeHelper.getExpirationTime(
          payload.remember ? 480 : 60
        );

        this.context.commit("signWallet", {
          isLoggedIn: true,
          address: payload.address,
          expiry,
          apiKey: "",
          ...(jwtToken !== null && { jwtToken }),
          ...(user !== null && { apiKey: user.apiKey, userId: user.id }),
        });

        if (user !== null) await router.push({ name: "worlds" });
        else await router.push({ name: "account-settings" });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const { data }: any = error.response;
        this.context.commit("signInErr", { errMsg: data.detail });
      } else {
        console.log(error);
      }
    }
  }
}

export default getModule(AuthModule);
