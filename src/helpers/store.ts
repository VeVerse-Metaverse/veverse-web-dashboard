import { authLocalStorage, walletLocalStorage } from "@/store";
import authStore from "@/store/modules/auth";
import walletStore from "@/store/modules/wallet";

export const rehydrateStore = async () => {
  const authSavedState = await authLocalStorage.restoreState(
    authLocalStorage.key,
    authLocalStorage.storage
  );

  const walletSavedState = await walletLocalStorage.restoreState(
    walletLocalStorage.key,
    walletLocalStorage.storage
  );

  walletStore.restoreSavedState(walletSavedState);
  authStore.signIn(authSavedState);
};
