import { createCustomFetch, type Config as FetchConfig } from "../../src";

const config: FetchConfig = {
  baseUrl: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  requestInterceptors: [
    async (request) => {
      console.log("리퀘스트", request);
      return request;
    },
  ],
  responseInterceptors: [
    async (response) => {
      console.log("리스폰스", response);
      return response;
    },
  ],
};

const myFetch = createCustomFetch(config);

export { myFetch };
