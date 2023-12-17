import {
  VuexModule,
  Module,
  Action,
  getModule,
  Mutation,
} from "vuex-module-decorators";

import { AxiosError } from "axios";
import store from "@/store/index";
import authApi from "@/api/auth";
import {
  MsgMetadata,
  RestorePasswordInput,
  RestoreTokenInput,
  RestoreTokenValidation,
} from "@/api/models";
import router from "@/router";

export interface IRestorePasswordInterface {
  errMsg: string;
  successMsg: string;
  isValid: boolean;
}

@Module({ dynamic: true, store, name: "restorePassword", namespaced: true })
class RestorePasswordModule
  extends VuexModule
  implements IRestorePasswordInterface
{
  errMsg = "";
  successMsg = "";
  isValid = false;

  @Mutation
  setDefaultState() {
    this.errMsg = "";
    this.successMsg = "";
    this.isValid = false;
  }

  @Mutation
  resetTokenErr(payload: MsgMetadata) {
    this.errMsg = payload.errMsg;
  }

  @Mutation
  setSuccessMsg(payload: MsgMetadata) {
    this.successMsg = payload.successMsg;
  }

  @Mutation
  setValidToken(payload: RestoreTokenValidation) {
    this.isValid = payload.isValid;
  }

  @Action({ rawError: true })
  async checkRestoreToken(payload: RestoreTokenInput) {
    try {
      const { data } = await authApi.checkRestoreToken(payload.token);

      if (data) {
        this.context.commit("setValidToken", { isValid: true });
      } else {
        this.context.commit("setValidToken", { isValid: false });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const { data }: any = error.response;
        this.context.commit("resetTokenErr", { errMsg: data.message });
      } else {
        this.context.commit("resetTokenErr", {
          errMsg: "Unknown error",
        });
      }
    }
  }

  @Action({ rawError: true })
  async sendRecoveryLink(payload: RestorePasswordInput) {
    try {
      this.context.commit("setDefaultState");
      const data = await authApi.sendRecoveryLink(payload.email);
      this.context.commit("setSuccessMsg", { successMsg: data.message });
    } catch (error) {
      if (error instanceof AxiosError) {
        const { data }: any = error.response;
        this.context.commit("resetTokenErr", { errMsg: data.message });
      } else {
        this.context.commit("resetTokenErr", {
          errMsg: "Unknown error",
        });
      }
    }
  }

  @Action({ rawError: true })
  async restorePassword(payload: RestorePasswordInput) {
    try {
      this.context.commit("setDefaultState");
      const data = await authApi.restorePassword(
        payload.token,
        payload.password,
        payload.repeatPassword
      );

      this.context.commit("setSuccessMsg", { successMsg: data.message });
      await router.push({ name: "login" });
    } catch (error) {
      if (error instanceof AxiosError) {
        const { data }: any = error.response;
        this.context.commit("resetTokenErr", { errMsg: data.message });
      } else {
        this.context.commit("resetTokenErr", {
          errMsg: "Unknown error",
        });
      }
    }
  }
}

export default getModule(RestorePasswordModule);
