<template>
  <vue-final-modal
    v-model="showChainSwitcherModal"
    classes="modal-container flex justify-center items-center overflow-y-auto
    overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal
    md:h-full"
    content-class="metamask-switch-chain-modal"
    :click-to-close="false"
  >
    <div class="relative p-4 w-full max-w-md h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow bg-gray-700">
        <!-- Modal header -->
        <div class="py-4 px-6 rounded-t border-b border-gray-600">
          <h3
            class="text-base font-semibold text-gray-900 lg:text-xl text-white"
          >
            Switch to supported chain
          </h3>
        </div>
        <!-- Modal body -->
        <div class="p-6">
          <p class="text-sm font-normal text-gray-500">
            Please switch to one of our supported chain.
          </p>
          <ul class="my-4 space-y-3">
            <li v-for="chain in listOfSupportedChain" :key="chain">
              <a
                href="#"
                @click.prevent="switchToSupportedChain(chain)"
                class="flex items-center p-3 text-base text-gray-900 rounded-lg group hover:shadow bg-gray-600 hover:bg-gray-500 text-white"
              >
                <span class="flex-1 ml-3 whitespace-nowrap">{{
                  supportedChains[chain].chainName
                }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </vue-final-modal>
</template>

<script>
import { defineComponent } from "vue";
import { BigNumber } from "ethers";
import walletStore from "@/store/modules/wallet";
import { VueFinalModal } from "vue-final-modal";
import router from "@/router";
import { mapMutations } from "vuex";

export default defineComponent({
  name: "MetamaskSwitchChain",
  components: {
    VueFinalModal,
  },
  data() {
    return {
      pageReload: false,
      showChainSwitcherModal: false,
      listOfSupportedChain: [],
      supportedChains: this.$store.state.supportedChains,
    };
  },
  methods: {
    ...mapMutations({
      setWallet: "wallet/setWallet",
    }),
    async switchToSupportedChain(chainId) {
      try {
        const { ethereum } = window;
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: this.supportedChains[chainId].chainId }],
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  async mounted() {
    const { ethereum } = window;
    this.listOfSupportedChain = Object.keys(this.supportedChains);

    if (walletStore.defaultWallet === "metamask") {
      const provider = new this.ethers.providers.Web3Provider(window.ethereum);
      const { chainId } = await provider.getNetwork();
      this.setWallet({
        wallet: "metamask",
        chainId: chainId,
        symbol: this.supportedChains[chainId]
          ? this.supportedChains[chainId].nativeCurrency.symbol
          : "",
      });

      ethereum.on("chainChanged", (chainId) => {
        const number = BigNumber.from(chainId);
        this.pageReload = true;
        this.setWallet({
          wallet: "metamask",
          chainId: number.toNumber(),
          symbol: this.supportedChains[number]
            ? this.supportedChains[number].nativeCurrency.symbol
            : "",
        });
      });
    }
  },
  computed: {
    chainId() {
      return walletStore.chainId;
    },
  },
  watch: {
    chainId(toChain, fromChain) {
      if (
        toChain !== fromChain &&
        !this.listOfSupportedChain.includes(toChain.toString())
      ) {
        this.showChainSwitcherModal = true;
      } else {
        if (this.pageReload) {
          router.go();
        }
      }
    },
  },
});
</script>

<style scoped></style>
