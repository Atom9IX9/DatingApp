export const APP_ROUTES = {
  GUEST: {
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",
    START: "/"
  },

  AUTH: {
    HOME: "/home",
  },
} as const;

export const GUEST_ROUTES = Object.values(APP_ROUTES.GUEST);

export const AUTH_ROUTES = Object.values(APP_ROUTES.AUTH);

export const isAuthRoute = (path: string) => AUTH_ROUTES.includes(path as any);

export const isGuestRoute = (path: string) => GUEST_ROUTES.includes(path as any);