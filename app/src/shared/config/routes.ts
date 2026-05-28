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