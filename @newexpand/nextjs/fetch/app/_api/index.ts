import {
  createCustomFetch,
  type Config as FetchConfig,
} from "newexpand-nextjs-fetch";

const config: FetchConfig = {
  baseUrl: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
};

const myFetch = createCustomFetch(config);

export { myFetch };
