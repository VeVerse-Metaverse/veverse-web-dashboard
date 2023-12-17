<template>
  <aside
    :class="[
      'sticky top-0 min-w-[280px] flex flex-col h-screen',
      'md:p-[10px] md:pt-6 md:z-[100] md:min-w-[70px]',
      'bg-gradient-to-r from-[#030408] to-[rgba(3,4,8,0)] md:to-[rgba(3,4,8,0.5)]',
    ]"
  >
    <!--    <div-->
    <!--      class="fixed flex flex-col min-h-[100vh] bg-gradient-to-r from-[#030408] to-[rgba(3,4,8,0)] md:to-[rgba(3,4,8,0.5)]"-->
    <!--    >-->
    <a href="#" class="flex pt-6 pl-7 md:p-0 md:flex md:justify-center">
      <img
        src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTQ2IiBoZWlnaHQ9IjM3OSIgdmlld0JveD0iMCAwIDU0NiAzNzkiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgICA8cGF0aCBkPSJNOTYuMDAyNiAwSDBMMTc1Ljc1NyAzNDkuOTYySDI2OS4wNTNMMzEzLjMzOSAyNjAuNDk2SDQ4Ni4zMDFMNDQ0LjUyMyAxNzcuMTQxSDI3MS41NkwyMjUuNjA0IDI2MC42OThMOTYuMDAyNiAwWiIKICAgICAgICAgIGZpbGw9IndoaXRlIi8+CiAgICA8cGF0aCBkPSJNMjEyLjIzNiA1OS4zMjU3TDI1MC42NzMgMTM1LjY2MUg0MjMuNjM1TDM4NS4xOTkgNTkuMzI1N0gyMTIuMjM2WiIgZmlsbD0id2hpdGUiLz4KICAgIDxwYXRoIGQ9Ik0zMzQuMjI5IDMwMi40NzZMMzcyLjY2NSAzNzguODExSDU0NS4yODhMNTA3LjE5MSAzMDIuNDc2SDMzNC4yMjlaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K"
        class="w-12 h-12"
        alt="VeVerse"
      />
    </a>
    <div
      id="compact-menu"
      :class="[
        'hidden mt-10',
        '2xl:hidden',
        'xl:hidden',
        'md:block md:overflow-y-auto',
      ]"
    >
      <router-link to="/account/settings" class="flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </router-link>
      <router-link
        to="/nft/assets"
        :class="[
          'flex justify-center',
          linkEnabled ? 'text-gray-300' : 'text-gray-800',
        ]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
          />
        </svg>
      </router-link>
      <i class="block w-full h-[1px] bg-gray-700" />
      <!--        INTERGALACTIC MARKETPLACE-->
      <router-link
        to="/metaverses"
        :class="[
          'flex justify-center',
          linkEnabled ? 'text-gray-300' : 'text-gray-800',
        ]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"
          />
        </svg>
      </router-link>
      <router-link
        to="/worlds/nft"
        :class="[
          'flex justify-center',
          linkEnabled ? 'text-gray-300' : 'text-gray-800',
        ]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
          />
        </svg>
      </router-link>
      <router-link
        to="/portals"
        :class="[
          'flex justify-center',
          linkEnabled ? 'text-gray-300' : 'text-gray-800',
        ]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M7.5 3.75H6A2.25 2.25 0 003.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0120.25 6v1.5m0 9V18A2.25 2.25 0 0118 20.25h-1.5m-9 0H6A2.25 2.25 0 013.75 18v-1.5M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </router-link>
      <router-link
        to="/avatar"
        :class="[
          'flex justify-center',
          linkEnabled ? 'text-gray-300' : 'text-gray-800',
        ]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="{1.5}"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
          />
        </svg>
      </router-link>

      <i v-if="me.isAdmin" class="block w-full h-[1px] bg-gray-700" />

      <router-link
        v-if="me.isAdmin"
        to="/build-jobs"
        :class="[
          'flex justify-center',
          linkEnabled ? 'text-gray-300' : 'text-gray-800',
        ]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
          />
        </svg>
      </router-link>
      <router-link
        v-if="me.isAdmin"
        to="/apps"
        :class="[
          'flex justify-center',
          linkEnabled ? 'text-gray-300' : 'text-gray-800',
        ]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25"
          />
        </svg>
      </router-link>
      <router-link
        v-if="me.isAdmin"
        to="/releases"
        :class="[
          'flex justify-center',
          linkEnabled ? 'text-gray-300' : 'text-gray-800',
        ]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="{1.5}"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
          />
        </svg>
      </router-link>
    </div>
    <ul
      id="left-nav"
      :class="['relative px-1 pt-8 pb-10 overflow-y-auto', 'md:hidden']"
    >
      <li class="relative py-5">
        <p class="left-nav-lbl px-6 h-12">
          {{ me.name.toUpperCase() }}
        </p>
      </li>
      <li class="relative">
        <router-link
          class="flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-gray-300 text-ellipsis whitespace-nowrap rounded hover:text-indigo-500 transition duration-300 ease-in-out"
          to="/account/settings"
        >
          Profile
        </router-link>
      </li>
      <li class="relative">
        <router-link
          :class="[
            'flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:text-indigo-500 transition duration-300 ease-in-out',
            linkEnabled ? 'text-gray-300' : 'text-gray-800',
          ]"
          to="/nft/assets"
        >
          My Assets
        </router-link>
      </li>
      <li class="relative py-5">
        <p class="left-nav-lbl px-6 h-12">INTERGALACTIC MARKETPLACE</p>
      </li>
      <!--      <li class="relative">-->
      <!--        <router-link-->
      <!--          :class="[-->
      <!--            'flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:text-indigo-500 transition duration-300 ease-in-out',-->
      <!--            linkEnabled ? 'text-gray-300' : 'text-gray-800',-->
      <!--          ]"-->
      <!--          to="/events"-->
      <!--        >-->
      <!--          All Events-->
      <!--        </router-link>-->
      <!--      </li>-->
      <!--      <li class="relative">-->
      <!--        <router-link-->
      <!--          :class="[-->
      <!--            'flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:text-indigo-500 transition duration-300 ease-in-out',-->
      <!--            linkEnabled ? 'text-gray-300' : 'text-gray-800',-->
      <!--          ]"-->
      <!--          to="/events/my"-->
      <!--        >-->
      <!--          My Events-->
      <!--        </router-link>-->
      <!--      </li>-->
      <!--      <li class="relative">-->
      <!--        <router-link-->
      <!--          :class="[-->
      <!--            'flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:text-indigo-500 transition duration-300 ease-in-out',-->
      <!--            linkEnabled ? 'text-gray-300' : 'text-gray-800',-->
      <!--          ]"-->
      <!--          to="/events/create"-->
      <!--        >-->
      <!--          Schedule Event-->
      <!--        </router-link>-->
      <!--      </li>-->
      <li class="relative">
        <router-link
          :class="[
            'flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:text-indigo-500 transition duration-300 ease-in-out',
            linkEnabled ? 'text-gray-300' : 'text-gray-800',
          ]"
          to="/metaverses"
        >
          Metaverses
        </router-link>
      </li>
      <li class="relative">
        <router-link
          :class="[
            'flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:text-indigo-500 transition duration-300 ease-in-out',
            linkEnabled ? 'text-gray-300' : 'text-gray-800',
          ]"
          to="/worlds/nft"
        >
          ENS World
        </router-link>
      </li>
      <li class="relative">
        <router-link
          :class="[
            'flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:text-indigo-500 transition duration-300 ease-in-out',
            linkEnabled ? 'text-gray-300' : 'text-gray-800',
          ]"
          to="/worlds"
        >
          Worlds
        </router-link>
      </li>
      <!--      <li class="relative">-->
      <!--        <router-link-->
      <!--          :class="[-->
      <!--            'flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:text-indigo-500 transition duration-300 ease-in-out',-->
      <!--            linkEnabled ? 'text-gray-300' : 'text-gray-800',-->
      <!--          ]"-->
      <!--          to="/metaverses/my"-->
      <!--        >-->
      <!--          My Metaverses-->
      <!--        </router-link>-->
      <!--      </li>-->
      <li class="relative">
        <router-link
          :class="[
            'flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:text-indigo-500 transition duration-300 ease-in-out',
            linkEnabled ? 'text-gray-300' : 'text-gray-800',
          ]"
          to="/portals"
        >
          Portals
        </router-link>
      </li>
      <li class="relative">
        <router-link
          :class="[
            'flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:text-indigo-500 transition duration-300 ease-in-out',
            linkEnabled ? 'text-gray-300' : 'text-gray-800',
          ]"
          to="/avatar"
        >
          Avatar
        </router-link>
      </li>
      <li class="relative py-2" v-if="me.isAdmin">
        <p class="left-nav-lbl flex items-center px-6 h-12">DEVELOPER TOOLS</p>
      </li>
      <li class="relative" v-if="me.isAdmin">
        <router-link
          :class="[
            'flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:text-indigo-500 transition duration-300 ease-in-out',
            linkEnabled ? 'text-gray-300' : 'text-gray-800',
          ]"
          to="/build-jobs"
        >
          Build Jobs
        </router-link>
      </li>
      <li class="relative" v-if="me.isAdmin">
        <router-link
          :class="[
            'flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:text-indigo-500 transition duration-300 ease-in-out',
            linkEnabled ? 'text-gray-300' : 'text-gray-800',
          ]"
          to="/apps"
        >
          Apps
        </router-link>
      </li>
      <li class="relative" v-if="me.isAdmin">
        <router-link
          :class="[
            'flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:text-indigo-500 transition duration-300 ease-in-out',
            linkEnabled ? 'text-gray-300' : 'text-gray-800',
          ]"
          to="/releases"
        >
          Releases
        </router-link>
      </li>
      <!--      <li class="relative">-->
      <!--        <router-link-->
      <!--          :class="[-->
      <!--            'flex items-center text-lg py-4 px-6 h-12 overflow-hidden text-ellipsis whitespace-nowrap rounded hover:text-indigo-500 transition duration-300 ease-in-out',-->
      <!--            linkEnabled ? 'text-gray-300' : 'text-gray-800',-->
      <!--          ]"-->
      <!--          to="/portals"-->
      <!--        >-->
      <!--          Assets-->
      <!--        </router-link>-->
      <!--      </li>-->
    </ul>
    <!--    </div>-->
    <i class="bg-blue-400 hidden"></i>
  </aside>
</template>

<script>
import { defineComponent } from "vue";
import authStore from "@/store/modules/auth";
import { mapActions, mapGetters, mapMutations } from "vuex";
import accountStore from "@/store/modules/account";

export default defineComponent({
  name: "LeftNav",
  data() {
    return {
      me: {
        name: "",
      },
    };
  },
  methods: {
    ...mapMutations({
      setUnlinkedMsg: "auth/setUnlinkedMsg",
    }),
    ...mapActions({
      fetchMe: "account/fetchMe",
      logout: "auth/logout",
    }),
    ...mapGetters({
      hasApiKey: "auth/hasApiKey",
    }),
  },
  async mounted() {
    if (this.hasApiKey()) {
      this.isLoading = true;
      await this.fetchMe();
      this.me = accountStore.me;
      this.isLoading = false;
    }
  },
  computed: {
    showUnlinkedMsg() {
      return authStore.showUnlinkedWalletMsg;
    },
    linkEnabled() {
      return authStore.isUserWalletLinked || authStore.apiKey !== "";
    },
  },
  watch: {
    showUnlinkedMsg() {
      if (this.showUnlinkedMsg) {
        this.$toasts.push({
          type: "base",
          message:
            "To view unreachable pages you should link your wallet to your account",
          duration: 5000,
        });
      }

      this.setUnlinkedMsg({ showMsg: false });
    },
  },
});
</script>

<style scoped lang="scss">
#left-nav {
  li {
    text-align: left;

    p {
      display: inline;
    }
  }
}

#compact-menu {
  a {
    padding: 1em 0;
  }
}
</style>
