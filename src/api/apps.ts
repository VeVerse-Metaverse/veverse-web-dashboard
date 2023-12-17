import { AxiosRequestConfig } from "axios";
import authStore from "@/store/modules/auth";
import axios from "@/helpers/http";

const { VUE_APP_API_V2 } = process.env;

export default {
  async indexLatestReleases(
    appId: string,
    offset: number,
    limit: number
    // status?: string
  ) {
    const config: AxiosRequestConfig = {};
    config.headers = { Authorization: `Bearer ${authStore.jwtToken}` };

    const url = `${VUE_APP_API_V2}/apps/${appId}/releases?offset=${offset}&limit=${limit}`;

    // if (status && status != "") {
    //   url += `&status=${status}`;
    // }

    const res = await axios.get(url, config);

    const { data } = res;
    return data;
  },

  async indexApps(
    appId: string,
    offset: number,
    limit: number
    // status?: string
  ) {
    const config: AxiosRequestConfig = {};
    config.headers = { Authorization: `Bearer ${authStore.jwtToken}` };

    const url = `${VUE_APP_API_V2}/apps?offset=${offset}&limit=${limit}`;

    const res = await axios.get(url, config);

    const { data } = res;
    return data;
  },

  async createApp(payload: { [name: string]: any }) {
    const config: AxiosRequestConfig = {};
    config.headers = { Authorization: `Bearer ${authStore.jwtToken}` };

    const url = `${VUE_APP_API_V2}/apps`;

    const res = await axios.post(url, payload, config);

    const { data } = res;
    return data;
  },
};
