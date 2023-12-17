import NProgress from "nprogress";
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import SignIn from "../views/SignIn.vue";

import Metaverses from "../views/Metaverses.vue";
import MyMetaverse from "../views/MyMetaverse.vue";

import Events from "@/views/Events.vue";
import MyEvents from "@/views/MyEvents.vue";
import ViewEvent from "@/views/ViewEvent.vue";
import CreateEvent from "@/views/CreateEvent.vue";
import EditEvent from "@/views/EditEvent.vue";
import Success from "@/views/Success.vue";
import Error from "@/views/Error.vue";

import ViewPortal from "@/views/ViewPortal.vue";
import EditPortal from "@/views/EditPortal.vue";
import Portals from "@/views/Portals.vue";

import AccountSettings from "@/views/AccountSettings.vue";
import ENSWorlds from "@/views/ENSWorlds.vue";
import NFTAssets from "@/views/NFTAssets.vue";
import Avatar from "@/views/Avatar.vue";
import BuildJobs from "@/views/BuildJobs.vue";
import Releases from "@/views/Releases.vue";
import Apps from "@/views/Apps.vue";

import Worlds from "@/views/Worlds.vue";
import ViewWorld from "@/views/ViewWorld.vue";
import EditWorld from "@/views/EditWorld.vue";

import authStore from "@/store/modules/auth";
import { rehydrateStore } from "@/helpers/store";

import "../styles/_index.scss";
import RestorePassword from "@/views/RestorePassword.vue";
import ResetPassword from "@/views/ResetPassword.vue";
import CreateApp from "@/views/CreateApp.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: SignIn,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/login/reset-password",
    name: "reset-password",
    component: ResetPassword,
    meta: {
      title: "Reset Password",
    },
  },
  {
    path: "/auth/restore/:restoreToken",
    name: "restore",
    component: RestorePassword,
    meta: {
      title: "Restore password",
    },
  },
  {
    path: "/events",
    name: "events",
    component: Events,
    meta: {
      title: "Events",
      needsAuth: true,
      checkUserWalletLinked: true,
    },
    alias: "/",
  },
  {
    path: "/events/my",
    name: "events-my",
    component: MyEvents,
    meta: {
      title: "My Events",
      needsAuth: true,
      checkUserWalletLinked: true,
    },
  },
  {
    path: "/events/create",
    name: "events-new",
    component: CreateEvent,
    meta: {
      title: "Create Event",
      needsAuth: true,
      checkUserWalletLinked: true,
    },
  },
  {
    path: "/events/:id",
    name: "events-view",
    component: ViewEvent,
    meta: {
      title: "View Event",
      needsAuth: true,
      checkUserWalletLinked: true,
    },
  },
  {
    path: "/events/:id/edit",
    name: "events-edit",
    component: EditEvent,
    meta: {
      title: "Edit Event",
      needsAuth: true,
      checkUserWalletLinked: true,
    },
  },
  {
    path: "/metaverses",
    name: "metaverses",
    component: Metaverses,
    meta: {
      title: "Metaverses",
      needsAuth: true,
      checkUserWalletLinked: true,
    },
  },
  {
    path: "/metaverses/my",
    name: "my-metaverse",
    component: MyMetaverse,
    meta: {
      title: "My Metaverse",
      needsAuth: true,
      checkUserWalletLinked: true,
    },
  },
  {
    path: "/portals",
    name: "portals",
    component: Portals,
    meta: {
      title: "Portals",
      needsAuth: true,
      checkUserWalletLinked: true,
    },
  },
  {
    path: "/portals/:id",
    name: "portal-view",
    component: ViewPortal,
    meta: {
      title: "View Portal",
      needsAuth: true,
      checkUserWalletLinked: true,
    },
  },
  {
    path: "/portals/:id/edit",
    name: "portal-edit",
    component: EditPortal,
    meta: {
      title: "Edit Portal",
      needsAuth: true,
      checkUserWalletLinked: true,
    },
  },
  {
    path: "/worlds/nft",
    name: "nft-worlds",
    component: ENSWorlds,
    meta: {
      title: "ENS World",
      needsAuth: true,
      checkUserWalletLinked: true,
    },
  },
  {
    path: "/worlds",
    name: "worlds",
    component: Worlds,
    meta: {
      title: "Worlds",
      needsAuth: true,
      checkUserWalletLinked: true,
    },
  },
  {
    path: "/worlds/:id",
    name: "world-view",
    component: ViewWorld,
    meta: {
      title: "View World",
      needsAuth: true,
      checkUserWalletLinked: true,
    },
  },
  {
    path: "/worlds/:id/edit",
    name: "world-edit",
    component: EditWorld,
    meta: {
      title: "Edit World",
      needsAuth: true,
      checkUserWalletLinked: true,
    },
  },
  {
    path: "/account/settings",
    name: "account-settings",
    component: AccountSettings,
    meta: {
      title: "Account Settings",
      needsAuth: true,
    },
  },
  {
    path: "/nft/assets",
    name: "nft-assets",
    component: NFTAssets,
    meta: {
      title: "My assets",
      needsAuth: true,
      checkUserWalletLinked: true,
    },
  },
  {
    path: "/avatar",
    name: "avatar",
    component: Avatar,
    meta: {
      title: "Avatar",
      needsAuth: true,
      checkUserWalletLinked: true,
    },
  },
  {
    path: "/success",
    name: "success-page",
    component: Success,
    meta: {
      title: "Success",
      needsAuth: true,
    },
  },
  {
    path: "/error",
    name: "error-page",
    component: Error,
    meta: {
      title: "Error",
      needsAuth: true,
    },
  },
  {
    path: "/build-jobs",
    name: "buildJobs",
    component: BuildJobs,
    meta: {
      title: "Build Jobs",
      needsAuth: true,
      isAdmin: true,
      checkUserWalletLinked: true,
    },
  },
  {
    path: "/releases",
    name: "releases",
    component: Releases,
    meta: {
      title: "Releases",
      needsAuth: true,
      isAdmin: true,
      checkUserWalletLinked: true,
    },
  },
  {
    path: "/apps",
    name: "apps",
    component: Apps,
    meta: {
      title: "Apps",
      needsAuth: true,
      isAdmin: true,
      checkUserWalletLinked: true,
    },
  },
  {
    path: "/apps/create",
    name: "apps-create",
    component: CreateApp,
    meta: {
      title: "Create App",
      needsAuth: true,
      isAdmin: true,
      checkUserWalletLinked: true,
    },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.needsAuth)) {
    await rehydrateStore();
    if (!authStore.loggedIn) {
      authStore.loggedOut();
      next({ name: "login" });
    } else {
      if (to.matched.some((record) => record.meta.checkUserWalletLinked)) {
        if (!authStore.isUserWalletLinked && authStore.apiKey === "") {
          authStore.setUnlinkedMsg({ showMsg: true });
          next({ name: "account-settings" });
          return;
        }
      }
      // else if (to.matched.some((record) => !record.meta.isAdmin)) {
      //   next({ name: "account-settings" });
      //   return;
      // }

      next();
    }
  } else {
    if (authStore.loggedIn && to.path === "/login") {
      next({ name: "events" });
    } else {
      next();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }

  next();
});

export default router;
