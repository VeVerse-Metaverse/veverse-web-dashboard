import { AxiosRequestConfig } from "axios";
import authStore from "@/store/modules/auth";
import axios from "@/helpers/http";

const { VUE_APP_API_V2 } = process.env;

export default {
  async index(offset: number, limit: number, status?: string, type?: string) {
    const config: AxiosRequestConfig = {};
    config.headers = { Authorization: `Bearer ${authStore.jwtToken}` };

    let url = `${VUE_APP_API_V2}/jobs?offset=${offset}&limit=${limit}`;

    if (status && status != "") {
      url += `&status=${status}`;
    }

    if (type && type != "") {
      url += `&type=${type}`;
    }

    const res = await axios.get(url, config);

    const { data } = res;
    return data;
  },

  async rescheduleJob(id: string) {
    const config: AxiosRequestConfig = {};
    config.headers = { Authorization: `Bearer ${authStore.jwtToken}` };

    const res = await axios.patch(
      `${VUE_APP_API_V2}/jobs/${id}/status`,
      { status: "unclaimed" },
      config
    );

    const { data } = res;
    return data;
  },

  async cancelJob(id: string) {
    const config: AxiosRequestConfig = {};
    config.headers = { Authorization: `Bearer ${authStore.jwtToken}` };

    const res = await axios.put(
      `${VUE_APP_API_V2}/jobs/${id}/status`,
      { status: "canceled" },
      config
    );

    const { data } = res;
    return data;
  },
};
