<template>
  <!--  Switch to supported chain Component -->
  <MetamaskSwitchChain></MetamaskSwitchChain>

  <div class="relative flex w-full">
    <LeftNav v-if="isLoggedIn()" />
    <div class="flex flex-col w-full">
      <TopHeader v-if="isLoggedIn()" />
      <router-view />
    </div>
  </div>

  <section class="c-section c-section--stars">
    <div class="c-section__twinkling" />
    <div class="c-section__particles">
      <div class="c-section__particle c-section__particle--1"></div>
      <div class="c-section__particle c-section__particle--2"></div>
      <div class="c-section__particle c-section__particle--3"></div>
      <div class="c-section__particle c-section__particle--4"></div>
    </div>
  </section>
</template>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
<script>
import router from "@/router";
import MetamaskSwitchChain from "@/components/MetamaskSwitchChain";
import LeftNav from "@/components/LeftNav";

import { rehydrateStore } from "@/helpers/store";
import authStore from "@/store/modules/auth";
import TopHeader from "@/components/TopHeader";
import "./env.js";

export default {
  components: { TopHeader, LeftNav, MetamaskSwitchChain },
  methods: {
    isLoggedIn() {
      return authStore.isLoggedIn;
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler(to) {
        document.title = to.meta.title || "VeVerse - Metaverse as a service";
      },
    },
  },
  async mounted() {
    await rehydrateStore();

    document.addEventListener("mouseup", async () => {
      await rehydrateStore();
      if (authStore.isLoggedIn && authStore.loggedIn === false) {
        authStore.loggedOut();
        await router.push({ name: "login" });
      }
    });
  },
};
</script>
