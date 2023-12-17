<template>
  <div class="account-settings-container w-full my-5">
    <h1
      class="title-st text-5xl font-100 uppercase leading-normal mt-4 mb-2 text-gray-200"
    >
      Account Settings
    </h1>
    <div v-if="!isLoading" class="grid place-items-center">
      <form class="w-full max-w-xl">
        <div class="flex flex-wrap justify-center my-6">
          <div class="w-full px-3 mb-5">
            <label
              class="block uppercase tracking-wide text-gray-300 mb-2"
              for="grid-title"
              >Email address</label
            >
            <div
              v-if="hasApiKey()"
              class="flex flex-col p-2 mt-1 mb-4 border-[1px] border-gray-600"
            >
              {{ me.email }}
            </div>
            <div v-else>
              <input
                class="appearance-none rounded-none relative block w-full px-3 py-2 my-3 placeholder-gray-500 text-gray-100 focus:outline-none focus:z-10 sm:text-sm"
                id="grid-title"
                type="email"
                placeholder="Email address"
                v-model="email"
              />
            </div>
          </div>

          <div class="w-full px-3 mb-5">
            <label
              class="block uppercase tracking-wide text-gray-300 mb-2"
              for="grid-title"
            >
              Wallet address
            </label>
            <div
              class="flex flex-col p-2 mb-4 border-[1px] border-gray-600 break-all"
            >
              {{ wallet || currentAddress }}
            </div>
          </div>
          <div
            class="w-full px-3 mb-5"
            v-if="hasApiKey() && wallet === undefined"
          >
            <button
              class="group relative w-full flex justify-center py-2 border border-transparent text-sm font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              @click.prevent="link"
            >
              <span class="flex-1 ml-3 whitespace-nowrap">Link account</span>
            </button>
          </div>
          <div
            v-else-if="wallet === undefined || !hasApiKey()"
            class="w-full px-3 mb-5"
          >
            <button
              class="group relative w-full flex justify-center py-2 border border-transparent text-sm font-medium bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
              @click.prevent="link"
            >
              <span class="flex-1 ml-3 whitespace-nowrap">Link account</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions, mapGetters } from "vuex";
import authStore from "@/store/modules/auth";
import accountStore from "@/store/modules/account";

export default defineComponent({
  name: "AccountSettingsView",
  components: {},

  data() {
    return {
      isLoading: false,
      wallet: authStore.walletAddress,
      me: {},
      showWalletsModal: false,
      email: null,
      linkMsg: "",
      currentAddress: " ",
    };
  },

  methods: {
    ...mapActions({
      fetchMe: "account/fetchMe",
      linkAccount: "account/linkAccount",
      logout: "auth/logout",
    }),
    ...mapGetters({
      hasApiKey: "auth/hasApiKey",
    }),
    async link() {
      const { ethereum } = window;
      const message = `Please sign to link wallet & account email: ${this.email}`;
      await ethereum.request({ method: "eth_requestAccounts" });
      const provider = new this.ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const signature = await signer.signMessage(message);
      const address = await signer.getAddress();

      await this.linkAccount({
        address,
        signature,
        email: this.email || accountStore.me.email,
      });

      this.logout();
    },
    refreshData() {
      if (this.hasApiKey()) {
        this.me = accountStore.me;
        this.email = this.me.email;

        if (this.me.ethAddress) this.wallet = this.me.ethAddress;
      }
    },
    async getWalletAddress() {
      const provider = new this.ethers.providers.Web3Provider(window.ethereum);
      const [address] = await provider.listAccounts();
      this.currentAddress = address;
    },
  },
  async created() {
    this.refreshData();
    await this.getWalletAddress();
  },

  computed: {
    accountMe() {
      return accountStore.me;
    },
  },

  watch: {
    accountMe() {
      this.refreshData();
    },
  },
});
</script>
