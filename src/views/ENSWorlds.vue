<template>
  <div class="w-full my-5">
    <h1
      class="title-st text-5xl uppercase leading-normal mt-4 mb-2 text-gray-200"
    >
      ENS Worlds
    </h1>
    <!--    <div>-->
    <!--      <DropdownList align="justify-start">-->
    <!--        <li>-->
    <!--          <a-->
    <!--            class="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-400 hover:bg-gray-800"-->
    <!--            href="#"-->
    <!--            @click.prevent="toggleRegisterModal"-->
    <!--          >-->
    <!--            Register World ENS-->
    <!--          </a>-->
    <!--        </li>-->
    <!--      </DropdownList>-->
    <!--    </div>-->

    <div class="flex md:justify-center">
      <button
        class="flex items-center my-1 focus:outline-none cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white mx-1 px-8 py-2 text-sm disabled:bg-indigo-300"
        href="#"
        @click.prevent="toggleRegisterModal"
      >
        Register World ENS
      </button>
    </div>

    <!-- ENS World Registration Modal -->
    <div
      :class="[
        'py-12 flex items-center justify-center bg-gray-800 bg-opacity-50 transition duration-150 ease-in-out z-10 fixed top-0 right-0 bottom-0 left-[220px]',
        registrationData.showRegister ? '' : 'hidden',
      ]"
      id="modal"
    >
      <div role="alert" class="relative mx-auto w-11/12 md:w-2/3 max-w-lg">
        <div
          :class="[
            registrationData.awaitRegistration ? '' : 'hidden',
            'flex absolute bg-black bg-opacity-50 z-10 w-full h-full',
          ]"
        >
          <div class="w-full flex flex-col items-center justify-center">
            <svg
              class="animate-spin h-8 w-8 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <h1
              class="mt-5 text-gray-300 font-lg tracking-normal leading-tight mb-4"
            >
              {{ registrationData.registrationMsg }}
            </h1>
          </div>
        </div>
        <div
          class="sticky overflow-y-auto max-h-[90vh] h-full py-8 px-5 md:px-10 bg-gray-800 shadow-md rounded"
        >
          <h1 class="text-gray-300 font-lg tracking-normal leading-tight mb-4">
            Register ENS World
          </h1>
          <div class="mt-5 text-left">
            <label for="provider" class="text-sm leading-tight tracking-normal"
              >Provider</label
            >
            <v-select
              class="style-chooser mt-2"
              :options="registrationData.providers"
              label="name"
              :clearable="false"
              v-model="registrationData.selectedController"
              :reduce="(controller) => controller.id"
            >
              <template #option="{ name }">
                <em>{{ name.toUpperCase() }}</em>
              </template>
              <template #selected-option="{ name }">
                <em>{{ name.toUpperCase() }}</em>
              </template>
            </v-select>
          </div>

          <div class="mt-5 text-left">
            <label for="name" class="text-sm leading-tight tracking-normal">
              Metaverse Domain Name
            </label>
            <input
              id="name"
              v-model="registrationData.name"
              :disabled="registrationData.awaitDomainCheck"
              @input="checkAvailable"
              class="mb-2 mt-2 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 text-sm border-gray-300 rounded border"
              placeholder="Metaverse Domain Name"
            />
            <span
              v-if="registrationData.awaitDomainCheck !== ''"
              :class="[
                !registrationData.awaitDomainCheck
                  ? registrationData.isAvailable
                    ? 'text-green-600'
                    : 'text-red-600'
                  : '',
              ]"
            >
              {{ this.registrationData.domainAvailableMsg }}
            </span>
          </div>

          <div
            v-if="registrationData.name && registrationData.isAvailable"
            class="mt-5"
          >
            <label for="nft-image" class="text-sm leading-tight tracking-normal"
              >NFT Image</label
            >
            <div class="flex flex-col items-center w-full">
              <div
                v-if="registrationData.isDefaultNFTImage"
                class="w-1/3 h-1/3 mt-1 mb-4"
                v-html="defaultImage"
              ></div>
              <div class="w-1/3 h-1/3 mt-1 mb-4" v-else>
                <img :src="registrationData.selectedNFTImage" alt="NFT Image" />
              </div>

              <div class="flex">
                <label
                  class="flex items-center focus:outline-none cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white mx-1 px-8 py-2 text-sm disabled:bg-indigo-300"
                >
                  <input
                    @change="selectNFTImage($event.target.files)"
                    onclick="this.value=null;"
                    type="file"
                    ref="nft-image-file"
                    accept="image/*"
                    id="image-input"
                    hidden
                  />
                  Select NFT Image
                </label>
              </div>
            </div>
          </div>

          <div class="mt-5 text-left">
            <label for="name" class="text-sm leading-tight tracking-normal"
              >Duration</label
            >

            <v-select
              class="style-chooser mb-5 mt-2"
              :options="[
                { name: '1 Year', id: 365 },
                { name: '2 Year', id: 730 },
                { name: '3 Year', id: 1095 },
                { name: '4 Year', id: 1460 },
                { name: '5 Year', id: 1825 },
              ]"
              label="name"
              :clearable="false"
              v-model="registrationData.duration"
              :reduce="(duration) => duration.id"
            />

            <label
              v-if="
                registrationData.name !== '' && registrationData.isAvailable
              "
              for="name"
              class="text-sm leading-tight tracking-normal"
              >Rent Price: ~
              {{ Number(registrationData.rentPriceAmount).toFixed(8) }}
              {{ symbol }}
            </label>

            <div class="mt-5 flex items-center justify-start w-full">
              <button
                :disabled="!registrationData.isAvailable"
                @click.prevent="registerWorld"
                class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 text-sm disabled:bg-indigo-300"
              >
                Register
              </button>
            </div>
          </div>

          <button
            class="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded focus:ring-2 focus:outline-none focus:ring-gray-600"
            @click.prevent="toggleRegisterModal"
            aria-label="close modal"
            role="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="icon icon-tabler icon-tabler-x"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!--  Minted Worlds  -->
    <div class="overflow-y-scroll my-10">
      <h1
        class="title-st text-2xl font-600 uppercase leading-normal mt-4 mb-2 text-gray-200"
      >
        Minted Worlds
      </h1>

      <div v-if="fetchMintedWorld" class="flex justify-center my-5">
        <svg
          class="animate-spin h-8 w-8 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
      <div v-if="!fetchMintedWorld" class="item-block grid">
        <WorldNFTCard
          v-for="world in mintedWorlds"
          :key="world.name"
          :world="world"
        />
      </div>
    </div>

    <i class="hidden bg-red-400"></i>
  </div>
</template>

<script>
import axios from "axios";
import _debounce from "lodash.debounce";

import WorldNFTCard from "@/components/WorldNFTCard";

import {
  domainSeparator,
  getMetadataByNftId,
  makeCommitment,
  rentPrice,
  available,
  commit,
  register,
  setNftImage,
  getNftsForWallet,
} from "@veverse/world_nfts";
import { utils } from "@le7el/web3_crs";
const { erc20Approve } = utils;

import { getErrMsg } from "@/helpers/error";
import walletStore from "@/store/modules/wallet";
import authStore from "@/store/modules/auth";

export default {
  name: "WorldsView",
  components: {
    WorldNFTCard,
  },
  methods: {
    async whitelist(address, name) {
      const whitelistMessage = this.ethers.utils.keccak256(
        this.ethers.utils.defaultAbiCoder.encode(
          ["bytes32", "address", "string"],
          [await domainSeparator(walletStore.chainId), address, name]
        )
      );

      const signer = new this.ethers.Wallet(this.privateKey);
      const whitelistSignature = await signer.signMessage(
        this.ethers.utils.arrayify(whitelistMessage)
      );

      const sig = this.ethers.utils.splitSignature(
        this.ethers.utils.arrayify(whitelistSignature)
      );

      return this.ethers.utils.defaultAbiCoder.encode(
        ["uint8", "bytes32", "bytes32"],
        [sig.v, sig.r, sig.s]
      );
    },
    async registerWorld() {
      console.log("register world!");
      this.registrationData.awaitRegistration = true;

      try {
        const provider = new this.ethers.providers.Web3Provider(
          window.ethereum
        );
        const accounts = await provider.listAccounts();

        const name = this.registrationData.name;
        const registrant = accounts[0];
        this.secret = this.ethers.utils.randomBytes(32);

        this.commitment = await makeCommitment(
          name,
          registrant,
          this.secret,
          walletStore.chainId
        );

        const pass = await this.whitelist(registrant, name);
        const tr = await commit(
          name,
          this.commitment,
          pass,
          walletStore.chainId
        );

        this.registrationData.registrationMsg =
          "Awaiting transaction publishing...";
        await provider.waitForTransaction(tr.hash);

        const [token, amount] = await rentPrice(
          name,
          this.registrationData.duration * 86400000,
          walletStore.chainId
        );

        if (token === this.addressZero || amount.isZero()) {
          this.registrationData.registrationMsg = "Awaiting maturation...";

          await this.delay(60000);
          this.registrationData.registrationMsg = "Wait...";
          const controller =
            this.contracts[walletStore.chainId][this.version]["controller"];

          const tr = await erc20Approve(token, controller, amount);
          await provider.waitForTransaction(tr.hash);

          this.registrationData.registrationMsg = "ENS World registration...";
          const registerTransaction = await register(
            this.registrationData.name,
            accounts[0],
            this.registrationData.duration * 86400000,
            this.secret,
            walletStore.chainId
          );
          await provider.waitForTransaction(registerTransaction.hash);

          if (!this.registrationData.isDefaultNFTImage) {
            this.registrationData.registrationMsg = "Uploading NFT Image...";
            const domainName = `${this.registrationData.name}.${this.registrationData.selectedDomain}`;
            await this.storeNFTImage();

            const node = utils.nameToNode(domainName);
            const tr = await setNftImage(
              node,
              this.registrationData.nftMetadata,
              walletStore.chainId
            );

            await provider.waitForTransaction(tr.hash);
          }

          this.registrationData.awaitRegistration = false;
          this.registrationData.showRegister = false;
          this.$toasts.push({
            type: "success",
            message: `ENS World Registration successfully`,
            duration: 30000,
          });

          await this.getMintedWorlds();
        }
      } catch (err) {
        this.registrationData.awaitRegistration = false;
        console.error(err);
        const message = getErrMsg(err);
        this.$toasts.push({
          type: "error",
          message,
          duration: 30000,
        });
      }
    },

    toggleRegisterModal() {
      this.registrationData.showRegister = !this.registrationData.showRegister;
    },
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async getMintedWorlds() {
      this.fetchMintedWorld = true;
      this.mintedWorlds = [];
      let account = authStore.walletAddress;

      if (account) {
        const nftIds = await getNftsForWallet(account, walletStore.chainId);

        for (let i = 0; i < nftIds.length; i++) {
          const itemId = nftIds[i];
          const nftMetadata = await getMetadataByNftId(
            itemId,
            walletStore.chainId
          );
          this.mintedWorlds.push(nftMetadata);
        }
      }

      this.fetchMintedWorld = false;
    },
    async getRentPrice() {
      const [, amount] = await rentPrice(
        name,
        this.registrationData.duration * 86400000,
        walletStore.chainId
      );
      return Number(this.ethers.utils.formatUnits(amount)).toFixed(8);
    },
    checkAvailable: _debounce(async function () {
      const name = this.registrationData.name;
      if (name && name !== "") {
        const domainName = `${this.registrationData.name}.${this.registrationData.selectedDomain}`;

        this.registrationData.domainAvailableMsg = "check availability...";
        this.registrationData.awaitDomainCheck = true;
        this.registrationData.isAvailable = await available(
          name,
          walletStore.chainId
        );

        if (this.registrationData.isAvailable) {
          this.registrationData.domainAvailableMsg = `${domainName} is available`;
          this.registrationData.rentPriceAmount = await this.getRentPrice();
        } else {
          this.registrationData.domainAvailableMsg = `${domainName} is not available`;
        }

        this.registrationData.awaitDomainCheck = false;
      } else {
        this.registrationData.domainAvailableMsg = "";
      }
    }, 1000),
    async selectNFTImage(file) {
      if (!file.length) return;

      this.registrationData.isDefaultNFTImage = false;
      this.registrationData.selectedNFTImageFile = file;
      this.registrationData.selectedNFTImage = URL.createObjectURL(file[0]);
    },
    async storeNFTImage() {
      const file = this.registrationData.selectedNFTImageFile;

      const formData = new FormData();
      formData.append("image", file[0], file[0].name);
      formData.append("name", this.registrationData.name);

      const { status, data } = await axios.post(
        "https://blockchain.veverse.com/storage/upload/image",
        formData,
        {}
      );

      if (status === 200) {
        const { metadata } = data;
        this.registrationData.nftMetadata = metadata;
      }
    },
  },
  async created() {
    await this.getMintedWorlds();
  },
  watch: {
    async "registrationData.selectedController"() {
      this.registrationData.selectedDomain =
        this.registrationData.providerById[
          this.registrationData.selectedController
        ];
      if (this.registrationData.isAvailable) {
        this.registrationData.domainAvailableMsg = `${this.registrationData.name}.${this.registrationData.selectedDomain} is available`;
        this.registrationData.rentPriceAmount = await this.getRentPrice();
      } else {
        this.registrationData.domainAvailableMsg = `${this.registrationData.name}.${this.registrationData.selectedDomain}  is not available`;
      }
    },
    async "registrationData.duration"() {
      if (this.registrationData.isAvailable) {
        this.registrationData.rentPriceAmount = await this.getRentPrice();
      }
    },
  },
  data: function () {
    return {
      version: "v1",
      addressZero: "0x0000000000000000000000000000000000000000",
      privateKey: "",
      contracts: {
        4: {
          v1: {
            registry: "0xf754b8De91Bd619227B5DF74c760B58048A4095D",
            resolver: "0xc71ff4deab4ba2e99e93e8406cf2fa252dd14545",
            controller: "0x4230c3cbd66e62e96ca8d997809e0c99b9615683",
            nft: "0xdd32abef08ec0fa24d169a990cff1ee81bfa1bc0",
          },
        },
      },
      registrationData: {
        selectedDomain: "xr",
        selectedController: "controller",
        providers: [{ name: "xr", id: "controller" }],
        providerById: { controller: "xr" },
        awaitRegistration: false,
        awaitDomainCheck: false,
        domainAvailableMsg: "",
        isAvailable: false,
        isDefaultNFTImage: true,
        selectedNFTImage: "",
        selectedNFTImageFile: {},
        nftMetadata: {},
        rentPriceAmount: 0,
        showRegister: false,
        registrationMsg: "",
        name: "",
        duration: 365,
        defaultImg: "",
      },
      secret: undefined,
      commitment: undefined,
      fetchMintedWorld: true,
      symbol: walletStore.symbol,
      mintedWorlds: [],
    };
  },
  computed: {
    defaultImage() {
      const domainName = `${this.registrationData.name}.${this.registrationData.selectedDomain}`;
      return `<svg xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%" viewBox="0 0 9 9"><g><rect x="0" y="0" width="1" height="1" fill="#9803d6"></rect><rect x="1" y="0" width="1" height="1" fill="#27d0e9"></rect><rect x="2" y="0" width="1" height="1" fill="#9803d6"></rect><rect x="3" y="0" width="1" height="1" fill="#2fbadd"></rect><rect x="4" y="0" width="1" height="1" fill="#fe5ec4"></rect><rect x="5" y="0" width="1" height="1" fill="#e9409b"></rect><rect x="6" y="0" width="1" height="1" fill="#27d0e9"></rect><rect x="7" y="0" width="1" height="1" fill="#e9409b"></rect><rect x="8" y="0" width="1" height="1" fill="#27d0e9"></rect><rect x="0" y="1" width="1" height="1" fill="#00b4ff"></rect><rect x="1" y="1" width="1" height="1" fill="#2fbadd"></rect><rect x="2" y="1" width="1" height="1" fill="#e9409b"></rect><rect x="3" y="1" width="1" height="1" fill="#2fbadd"></rect><rect x="4" y="1" width="1" height="1" fill="#ec2cea"></rect><rect x="5" y="1" width="1" height="1" fill="#5ee9fe"></rect><rect x="6" y="1" width="1" height="1" fill="#ee66b0"></rect><rect x="7" y="1" width="1" height="1" fill="#df47c3"></rect><rect x="8" y="1" width="1" height="1" fill="#2fbadd"></rect><rect x="0" y="2" width="1" height="1" fill="#d65efe"></rect><rect x="1" y="2" width="1" height="1" fill="#d65efe"></rect><rect x="2" y="2" width="1" height="1" fill="#5eb5fe"></rect><rect x="3" y="2" width="1" height="1" fill="#9803d6"></rect><rect x="4" y="2" width="1" height="1" fill="#ee66b0"></rect><rect x="5" y="2" width="1" height="1" fill="#fe5ec4"></rect><rect x="6" y="2" width="1" height="1" fill="#e9409b"></rect><rect x="7" y="2" width="1" height="1" fill="#ec2cea"></rect><rect x="8" y="2" width="1" height="1" fill="#00b4ff"></rect><rect x="0" y="3" width="1" height="1" fill="#ee66b0"></rect><rect x="1" y="3" width="1" height="1" fill="#d65efe"></rect><rect x="2" y="3" width="1" height="1" fill="#27d0e9"></rect><rect x="3" y="3" width="1" height="1" fill="#2fbadd"></rect><rect x="4" y="3" width="1" height="1" fill="#5eb5fe"></rect><rect x="5" y="3" width="1" height="1" fill="#5ee9fe"></rect><rect x="6" y="3" width="1" height="1" fill="#fe5ec4"></rect><rect x="7" y="3" width="1" height="1" fill="#9803d6"></rect><rect x="8" y="3" width="1" height="1" fill="#1369d3"></rect><rect x="0" y="4" width="1" height="1" fill="#ec2cc6"></rect><rect x="1" y="4" width="1" height="1" fill="#e9409b"></rect><rect x="2" y="4" width="1" height="1" fill="#ec2cc6"></rect><rect x="3" y="4" width="1" height="1" fill="#5eb5fe"></rect><rect x="4" y="4" width="1" height="1" fill="#9803d6"></rect><rect x="5" y="4" width="1" height="1" fill="#fe5ec4"></rect><rect x="6" y="4" width="1" height="1" fill="#ee66b0"></rect><rect x="7" y="4" width="1" height="1" fill="#ec2cea"></rect><rect x="8" y="4" width="1" height="1" fill="#5ee9fe"></rect><rect x="0" y="5" width="1" height="1" fill="#27d0e9"></rect><rect x="1" y="5" width="1" height="1" fill="#df47c3"></rect><rect x="2" y="5" width="1" height="1" fill="#1369d3"></rect><rect x="3" y="5" width="1" height="1" fill="#ec2cc6"></rect><rect x="4" y="5" width="1" height="1" fill="#5ee9fe"></rect><rect x="5" y="5" width="1" height="1" fill="#fe5ec4"></rect><rect x="6" y="5" width="1" height="1" fill="#ec2cea"></rect><rect x="7" y="5" width="1" height="1" fill="#e9409b"></rect><rect x="8" y="5" width="1" height="1" fill="#5eb5fe"></rect><rect x="0" y="6" width="1" height="1" fill="#5ee9fe"></rect><rect x="1" y="6" width="1" height="1" fill="#ec2cc6"></rect><rect x="2" y="6" width="1" height="1" fill="#1369d3"></rect><rect x="3" y="6" width="1" height="1" fill="#5eb5fe"></rect><rect x="4" y="6" width="1" height="1" fill="#fe5ec4"></rect><rect x="5" y="6" width="1" height="1" fill="#1369d3"></rect><rect x="6" y="6" width="1" height="1" fill="#fe5ec4"></rect><rect x="7" y="6" width="1" height="1" fill="#df47c3"></rect><rect x="8" y="6" width="1" height="1" fill="#00b4ff"></rect><rect x="0" y="7" width="1" height="1" fill="#ee66b0"></rect><rect x="1" y="7" width="1" height="1" fill="#df47c3"></rect><rect x="2" y="7" width="1" height="1" fill="#e9409b"></rect><rect x="3" y="7" width="1" height="1" fill="#fe5ec4"></rect><rect x="4" y="7" width="1" height="1" fill="#fe5ec4"></rect><rect x="5" y="7" width="1" height="1" fill="#00b4ff"></rect><rect x="6" y="7" width="1" height="1" fill="#1369d3"></rect><rect x="7" y="7" width="1" height="1" fill="#e9409b"></rect><rect x="8" y="7" width="1" height="1" fill="#e9409b"></rect><rect x="0" y="8" width="1" height="1" fill="#d65efe"></rect><rect x="1" y="8" width="1" height="1" fill="#00b4ff"></rect><rect x="2" y="8" width="1" height="1" fill="#ec2cea"></rect><rect x="3" y="8" width="1" height="1" fill="#1369d3"></rect><rect x="4" y="8" width="1" height="1" fill="#ec2cea"></rect><rect x="5" y="8" width="1" height="1" fill="#ec2cea"></rect><rect x="6" y="8" width="1" height="1" fill="#ee66b0"></rect><rect x="7" y="8" width="1" height="1" fill="#2fbadd"></rect><rect x="8" y="8" width="1" height="1" fill="#d65efe"></rect></g><text fill="#ffffff" x="0.5" y="1.5" style="font: bold 1pt 'Readex Pro, sans-serif'">${domainName}</text></svg>`;
    },
  },
};
</script>

<style scoped></style>
