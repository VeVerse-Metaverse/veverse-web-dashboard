import { AxiosRequestConfig } from "axios";
import axios from "@/helpers/http";
import authStore from "@/store/modules/auth";

const { VUE_APP_API_V1 } = process.env;

export default {
  async uploadFile(metadata: any, file: File) {
    const config: AxiosRequestConfig = {};
    config.headers = {
      key: authStore.apiKey,
      "Content-Type": "multipart/form-data",
    };

    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.put(
      `${VUE_APP_API_V1}/entities/${metadata.id}/files/image_preview`,
      formData,
      config
    );

    const { status, data } = res;
    if (status === 200) {
      return data.data;
    } else {
      return { err: "" };
    }
  },
};
