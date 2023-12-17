import { createStore } from "vuex";
import VuexPersist from "vuex-persist";

const getDefaultState = () => {
  return {
    supportedChains: {
      4: {
        chainId: "0x4",
        rpcUrls: ["https://rinkeby.infura.io/v3/"],
        chainName: "Rinkeby Test Network",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        blockExplorerUrls: ["https://rinkeby.etherscan.io"],
        explorerAddressPath: ["/address/"],
      },
      1: {
        chainId: "0x1",
        rpcUrls: ["https://mainnet.infura.io/v3/"],
        chainName: "Ethereum Mainnet",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        blockExplorerUrls: ["https://etherscan.io"],
        explorerAddressPath: ["/address/"],
      },
      89: {
        chainId: "0x89",
        rpcUrls: ["https://rpc-mainnet.matic.network/"],
        chainName: "Polygon Mainnet",
        nativeCurrency: {
          name: "MATIC",
          symbol: "MATIC",
          decimals: 18,
        },
        blockExplorerUrls: ["https://polygonscan.com/"],
      },
    },
  };
};

export const authLocalStorage = new VuexPersist({
  key: "auth",
  storage: window.localStorage,
  reducer: (state: any) => {
    const { auth } = state;

    return {
      userId: auth.userId,
      isLoggedIn: auth.isLoggedIn,
      apiKey: auth.apiKey,
      jwtToken: auth.jwtToken,
      expiry: auth.expiry,
      walletAddress: auth.walletAddress,
      isUserWalletLinked: auth.isUserWalletLinked,
    };
  },
});

export const walletLocalStorage = new VuexPersist({
  key: "wallet",
  storage: window.localStorage,
  reducer: (state: any) => {
    const { wallet } = state;

    return {
      defaultWallet: wallet.defaultWallet,
      chainId: wallet.chainId,
      symbol: wallet.symbol,
    };
  },
});

export default createStore({
  state: getDefaultState,
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
  plugins: [authLocalStorage.plugin, walletLocalStorage.plugin],
});
