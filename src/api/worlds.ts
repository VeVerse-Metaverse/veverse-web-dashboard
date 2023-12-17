import { AxiosRequestConfig } from "axios";
import axios from "@/helpers/http";
import authStore from "@/store/modules/auth";
import { PatchWorldMetadata } from "@/api/models";

const { VUE_APP_API_V2 } = process.env;

export default {
  async index(offset: number, limit: number) {
    const config: AxiosRequestConfig = {};
    config.headers = { Authorization: `Bearer ${authStore.jwtToken}` };

    const res = await axios.get(
      `${VUE_APP_API_V2}/worlds?offset=${offset}&limit=${limit}`,
      config
    );

    const { data } = res;
    return data;
  },

  async get(id: string) {
    const config: AxiosRequestConfig = {};
    config.headers = { Authorization: `Bearer ${authStore.jwtToken}` };

    const res = await axios.get(`${VUE_APP_API_V2}/worlds/${id}`, config);

    const { data } = res;
    return data;
  },

  async update(id: string, metadata: PatchWorldMetadata) {
    const config: AxiosRequestConfig = {};
    config.headers = { Authorization: `Bearer ${authStore.jwtToken}` };

    const res = await axios.patch(
      `${VUE_APP_API_V2}/worlds/${id}`,
      metadata,
      config
    );

    const { data } = res;
    return data;
  },
};
