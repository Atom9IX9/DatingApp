"use client";

import React, { useRef } from "react";
import { Provider } from "react-redux";

import { makeStore } from "../model/store/store";
import { CheckAuthResponseData } from "@/features/auth";

// Provider component that supplies context or store values for Store.
const StoreProvider: React.FC<Props> = ({ children }) => {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
};

// Provider that supplies Store context or state.
export default StoreProvider;
type Props = {
  children: React.ReactNode;
};
