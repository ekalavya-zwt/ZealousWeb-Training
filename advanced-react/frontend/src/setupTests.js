import "@testing-library/jest-dom";
import { beforeAll, afterAll, afterEach } from "vitest";
import { server } from "./mocks/server";

// start server before tests
beforeAll(() => server.listen());

// reset handlers after each test
afterEach(() => server.resetHandlers());

// stop server after tests
afterAll(() => server.close());
