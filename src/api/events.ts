import { AxiosRequestConfig } from "axios";
import axios from "@/helpers/http";

import { EventCreateMetadata } from "@/api/models";
import authStore from "@/store/modules/auth";

const { VUE_APP_API_V1 } = process.env;

export default {
  async index(offset: number, limit: number) {
    const config: AxiosRequestConfig = {};
    config.headers = { key: authStore.apiKey };

    const res = await axios.get(
      `${VUE_APP_API_V1}/events?offset=${offset}&limit=${limit}`,
      config
    );

    const { data } = res;
    return data;
  },

  async getMyEvents(id: string, offset: number, limit: number) {
    const config: AxiosRequestConfig = {};
    config.headers = { key: authStore.apiKey };

    const res = await axios.get(
      `${VUE_APP_API_V1}/users/${id}/events?offset=${offset}&limit=${limit}`,
      config
    );

    const { data } = res;
    return data;
  },

  async get(id: string) {
    const config: AxiosRequestConfig = {};
    config.headers = { key: authStore.apiKey };

    const res = await axios.get(`${VUE_APP_API_V1}/events/${id}`, config);

    const { data } = res;
    return data;
  },

  async create(metadata: EventCreateMetadata) {
    const config: AxiosRequestConfig = {};
    config.headers = { key: authStore.apiKey };

    if (metadata.startsAt instanceof Date) {
      metadata.startsAt = metadata.startsAt.toISOString();
    }

    if (metadata.endsAt instanceof Date) {
      metadata.endsAt = metadata.endsAt.toISOString();
    }

    const res = await axios.post(`${VUE_APP_API_V1}/events`, metadata, config);

    const { data } = res;
    return data;
  },

  async updateEvent(id: string, metadata: { [name: string]: any }) {
    const config: AxiosRequestConfig = {};
    config.headers = { key: authStore.apiKey };

    if (metadata.startsAt instanceof Date) {
      metadata.startsAt = metadata.startsAt.toISOString();
    }

    if (metadata.endsAt instanceof Date) {
      metadata.endsAt = metadata.endsAt.toISOString();
    }

    const res = await axios.patch(
      `${VUE_APP_API_V1}/events/${id}`,
      metadata,
      config
    );

    const { data } = res;
    return data;
  },
};
