import { TextEncoder, TextDecoder } from "util";

import dotenv from "dotenv";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;

dotenv.config({ path: ".env.local" });

import "isomorphic-fetch";
import "@testing-library/jest-dom";
import { server } from "@/shared/tests";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
