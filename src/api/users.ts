import axios from "@/helpers/http";
import { AxiosRequestConfig } from "axios";

const { VUE_APP_API_V1, VUE_APP_API_V2 } = process.env;

export default {
  async getNonce(address: string) {
    const res = await axios.get(
      `${VUE_APP_API_V2}/users/nonce?address=${address}`
    );

    const { data } = res;
    return data;
  },

  async me(jwtToken: string) {
    const config: AxiosRequestConfig = {};
    config.headers = { Authorization: `Bearer ${jwtToken}` };

    const res = await axios.get(`${VUE_APP_API_V2}/users/me`, config);

    const { data } = res;
    return data;
  },

  async linkAccount(address: string, signature: string, emailAddress: string) {
    const metadata = { address, signature, emailAddress };

    const res = await axios.post(
      `${VUE_APP_API_V1}/users/link/address`,
      metadata
    );

    const { data } = res.data;
    return data;
  },
};
