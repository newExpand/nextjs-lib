※ This document is based on version 1.0.8.

# newexpand-nextjs-fetch

The `newexpand-nextjs-fetch` library is a utility designed to enhance the capabilities of the native fetch API in Next.js 14, providing a more powerful and flexible way to make HTTP requests. It introduces features such as request and response interceptors, automatic handling of different content types, request cancellation, and configurable timeouts, making it an ideal choice for developers looking for an extended fetch utility in their Next.js projects.

## Features

- **Base URL Configuration**: Simplify requests by setting a base URL for all calls.
- **Timeouts**: Set a default timeout for all requests to avoid hanging requests.
- **Interceptors**: Add request and response interceptors to modify requests and responses globally.
- **Automatic Content Type Handling**: Automatically handles JSON, text, FormData, Blob, and more based on the Content-Type.
- **Request Cancellation**: Cancel ongoing requests using a unique request ID.
- **Configurable Headers**: Set default headers for all requests.

## Installation

To install the library, run the following command in your project directory:

**bash**

```bash
npm install newexpand-nextjs-fetch

#or

yarn add newexpand-nextjs-fetch
```

## Usage

First, import the `createCustomFetch` function from the library:

**typescript**

```
import { createCustomFetch, type Config } from 'newexpand-nextjs-fetch';
```

Creating an Instance

Create a custom fetch instance with optional configuration:

**typescript**

```typescript
const config: Config = {
  baseUrl: "https://your-api-base-url.com",
  timeout: 10000, // 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
  requestInterceptors: [
    (requestOptions) => {
      // Modify requestOptions here
      return requestOptions;
    },
  ],
  responseInterceptors: [
    async (response) => {
      // Modify or handle response here
      return response;
    },
  ],
};

const customFetch = createCustomFetch(config);

export { customFetch };
```

Making Requests

Use the created instance to make GET, POST, PUT, DELETE, and PATCH requests:

**typescript**

```typescript
// GET request
const { data } = await customFetch.get<{ users: User[] }>(
  "/users",
  {},
  "uniqueRequestId"
);

// POST request with JSON body
const newUser = { name: "John Doe", email: "john@example.com" };
const postResponse = await customFetch.post(
  "/users",
  newUser,
  {},
  "postRequestId"
);

// PUT, DELETE, and PATCH requests are similar
```

Canceling a Request

Cancel an ongoing request using its unique request ID:

typescript
customFetch.cancelRequest('uniqueRequestId');

## Types

The library provides several TypeScript types for convenience and type safety:

- `Config`: Configuration object for creating a custom fetch instance.
- `FetchResponse<T>`: Generic type for fetch response data.

## Contributing

Contributions are welcome! If you have suggestions or want to improve the library, feel free to create issues or pull requests on the GitHub repository.

## License

This library is open-sourced software licensed under the MIT license.
