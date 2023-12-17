import { AxiosRequestConfig } from "axios";
import authStore from "@/store/modules/auth";
import axios from "@/helpers/http";

const { VUE_APP_API_V2 } = process.env;

export default {
  async getDownloadLink(entityId: string, fileId: string) {
    const config: AxiosRequestConfig = {};
    config.headers = { Authorization: `Bearer ${authStore.jwtToken}` };

    const res = await axios.get(
      `${VUE_APP_API_V2}/files/download?entityId=${entityId}&fileId=${fileId}`,
      config
    );

    const { data } = res;
    return data.data;
  },
};
