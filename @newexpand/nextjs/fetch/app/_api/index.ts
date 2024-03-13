import { createCustomFetch } from "newexpand-nextjs-fetch";

const myFetch = createCustomFetch({
  baseUrl: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export { myFetch };
