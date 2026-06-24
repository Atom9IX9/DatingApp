"use client";

import { useRef } from "react";
import { Provider } from "react-redux";

import { makeStore } from "../model/store/store";

// Provider component that supplies context or store values for Store.
const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

// Provider that supplies Store context or state.
export default StoreProvider;
