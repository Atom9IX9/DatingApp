"use client"
import { createContext } from "react";

import { UserAccountInfo } from "@/entities/user";

export const AuthContext = createContext<UserAccountInfo | null>(null);
