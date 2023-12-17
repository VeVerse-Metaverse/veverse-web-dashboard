import { AxiosRequestConfig } from "axios";
import authStore from "@/store/modules/auth";
import axios from "@/helpers/http";

const { VUE_APP_API_V2 } = process.env;

export default {
  async fetchNFTAssets(offset: number, limit: number) {
    const config: AxiosRequestConfig = {};
    config.headers = { Authorization: `Bearer ${authStore.jwtToken}` };

    const res = await axios.get(
      `${VUE_APP_API_V2}/nft/assets?offset=${offset}&limit=${limit}`,
      config
    );

    const {
      data: { data },
    } = res;
    return data;
  },
};
