import { AxiosRequestConfig } from "axios";
import axios from "@/helpers/http";
import authStore from "@/store/modules/auth";

const { VUE_APP_API_V1, VUE_APP_API_V2 } = process.env;

export default {
  async index(worldId: string, offset: number, limit: number) {
    const config: AxiosRequestConfig = {};
    config.headers = { Authorization: `Bearer ${authStore.jwtToken}` };

    let url = `${VUE_APP_API_V2}/portals?offset=${offset}&limit=${limit}`;
    if (worldId && worldId != "") {
      url += `&worldId=${worldId}`;
    }

    const res = await axios.get(url, config);

    const { data } = res;
    return data;
  },

  async get(id: string) {
    const config: AxiosRequestConfig = {};
    config.headers = { Authorization: `Bearer ${authStore.jwtToken}` };

    const res = await axios.get(`${VUE_APP_API_V2}/portals/${id}`, config);

    const { data } = res;
    return data;
  },

  async updatePortal(id: string, metadata: { [name: string]: any }) {
    const config: AxiosRequestConfig = {};
    config.headers = { Authorization: `Bearer ${authStore.jwtToken}` };

    const res = await axios.patch(
      `${VUE_APP_API_V2}/portals/${id}`,
      metadata,
      config
    );

    const { data } = res;
    return data;
  },
};
