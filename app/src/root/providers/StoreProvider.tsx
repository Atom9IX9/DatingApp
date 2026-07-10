"use client";

import React, { useState } from "react";
import { Provider } from "react-redux";

import { makeStore } from "../model/store/store";

// Provider component that supplies context or store values for Store.
const StoreProvider: React.FC<Props> = ({ children }) => {
  const [store] = useState(() => makeStore());

  return <Provider store={store}>{children}</Provider>;
};

// Provider that supplies Store context or state.
export default StoreProvider;
type Props = {
  children: React.ReactNode;
};
