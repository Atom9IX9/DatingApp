import {
  DefaultBodyType,
  http,
  HttpResponse,
  HttpResponseResolver,
  JsonBodyType,
  PathParams,
} from "msw";

import { server } from "../server";

export const observeRequestState = (
  method: Method,
  endpoint: string,
  resolver?: HttpResponseResolver<PathParams, DefaultBodyType, JsonBodyType>,
) => {
  const state: { request: Request | null } = { request: null };

  server.use(
    http[method](endpoint, async (context) => {
      state.request = context.request;

      return resolver?.(context) ?? HttpResponse.json({});
    }),
  );

  return state;
};

type Method = "get" | "post";
