import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

const clientStore = {
  subscribe,
  getSnapshot: () => true,
  getServerSnapshot: () => false,
};

export const useHydration = (): boolean => {
  const isHydrated = useSyncExternalStore(
    clientStore.subscribe,
    clientStore.getSnapshot,
    clientStore.getServerSnapshot,
  );

  return isHydrated;
};
