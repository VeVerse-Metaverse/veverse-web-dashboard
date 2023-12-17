import axios from "@/helpers/http";

const { VUE_APP_API_V2 } = process.env;

export default {
  async login(email: string, password: string) {
    const res = await axios.post(`${VUE_APP_API_V2}/auth/login`, {
      email,
      password: password,
    });

    const { data } = res;
    return data;
  },

  async web3Login(
    address: string,
    signature: string,
    timestamp: number,
    message: string
  ) {
    const res = await axios.post(`${VUE_APP_API_V2}/auth/login/web3`, {
      address,
      signature,
      timestamp,
      message,
    });

    const { data } = res;
    return data;
  },

  async checkRestoreToken(token: string) {
    const res = await axios.get(
      `${VUE_APP_API_V2}/auth/restore/password/check?token=${token}`
    );

    const { data } = res;
    return data;
  },

  async sendRecoveryLink(email: string) {
    const res = await axios.post(`${VUE_APP_API_V2}/auth/restore`, {
      email: email.toLowerCase(),
    });

    const { data } = res;
    return data;
  },

  async restorePassword(
    token: string,
    password: string,
    repeatPassword: string
  ) {
    const res = await axios.post(`${VUE_APP_API_V2}/auth/restore/password`, {
      token,
      password,
      repeatPassword,
    });

    const { data } = res;
    return data;
  },
};
