<template>
  <div
    class="event-card max-w-full rounded overflow-hidden shadow-lg bg-gray-800 p-4 bg-opacity-50 m-3"
  >
    <div class="mb-2">
      <label class="font-600 mt-4 mb-2 text-gray-200">Domain name: </label>
      <span>{{ mintedWorld.name }}</span>
    </div>
    <div class="flex flex-col items-center">
      <div
        class="max-w-[240px] max-h-[240px] mb-4"
        v-if="mintedWorld.image_data && mintedWorld.image_data !== ''"
        v-html="mintedWorld.image_data"
      ></div>
      <div
        class="max-w-[240px] max-h-[240px] mb-4 relative"
        v-else-if="mintedWorld.image"
      >
        <div
          v-if="awaitImageUpload"
          class="flex absolute bg-black bg-opacity-50 z-10 w-full h-full"
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
              Setting NFT Image...
            </h1>
          </div>
        </div>
        <img
          :src="
            !imageSelected
              ? getNFTStorageLink(mintedWorld.image)
              : mintedWorld.image
          "
          alt="nft-image"
        />
      </div>
      <div v-if="!awaitImageUpload" class="flex flex-col items-center">
        <label
          class="flex items-center my-1 focus:outline-none cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white mx-1 px-8 py-2 text-sm disabled:bg-indigo-300"
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
        <button
          v-if="imageSelected"
          @click="storeNFTImage"
          class="flex items-center my-1 focus:outline-none cursor-pointer focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white mx-1 px-8 py-2 text-sm disabled:bg-indigo-300"
        >
          Set Image
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { setNftImage } from "@veverse/world_nfts";
import { utils } from "@le7el/web3_crs";
import walletStore from "@/store/modules/wallet";
import { getErrMsg } from "@/helpers/error";

export default {
  name: "WorldNFTCard",
  props: ["world"],
  data() {
    return {
      imageSelected: false,
      mintedWorld: this.world,
      selectedNFTImageFile: {},
      awaitImageUpload: false,
    };
  },
  methods: {
    getNFTStorageLink(IPFSLink) {
      const domain = ".ipfs.nftstorage.link";
      IPFSLink = IPFSLink.replace("ipfs", "https");
      const pos = IPFSLink.lastIndexOf("/");
      return `${IPFSLink.substr(0, pos)}${domain}${IPFSLink.substr(pos)}`;
    },
    async selectNFTImage(file) {
      if (!file.length) return;

      this.imageSelected = true;
      this.mintedWorld.selectedNFTImageFile = file;
      this.mintedWorld.image_data = "";
      this.mintedWorld.image = "";
      this.mintedWorld.image = URL.createObjectURL(file[0]);
    },
    async storeNFTImage() {
      try {
        const file = this.mintedWorld.selectedNFTImageFile;
        const formData = new FormData();
        formData.append("image", file[0], file[0].name);
        formData.append("name", this.mintedWorld.name);

        this.awaitImageUpload = true;
        const { status, data } = await axios.post(
          "https://blockchain.veverse.com/storage/upload/image",
          formData,
          {}
        );

        if (status === 200) {
          const provider = new this.ethers.providers.Web3Provider(
            window.ethereum
          );

          const { metadata } = data;
          const node = utils.nameToNode(this.mintedWorld.name);
          const tr = await setNftImage(node, metadata, walletStore.chainId);
          await provider.waitForTransaction(tr.hash);

          this.$toasts.push({
            type: "success",
            message: `Setting new NFT image successfully`,
            duration: 10000,
          });

          this.awaitImageUpload = false;
        }
      } catch (err) {
        this.awaitImageUpload = false;

        console.error(err);
        const message = getErrMsg(err);
        this.$toasts.push({
          type: "error",
          message,
          duration: 30000,
        });
      }
    },
  },
};
</script>

<style scoped></style>
