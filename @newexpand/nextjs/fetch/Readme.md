※ This document is based on version 1.1.0.

# newexpand-nextjs-fetch

The `newexpand-nextjs-fetch` library is a utility designed to enhance the capabilities of the native fetch API in Next.js 14, providing a more powerful and flexible way to make HTTP requests. It introduces features such as request and response interceptors, automatic handling of different content types, request cancellation, and configurable timeouts, making it an ideal choice for developers looking for an extended fetch utility in their Next.js projects.

## Features

`newexpand-nextjs-fetch` is designed to enhance the developer experience by providing a suite of features that make HTTP requests more manageable and efficient in Next.js applications. Here are some of the key features:

- **Configurable Base URL**: Set a base URL for all your requests, simplifying the management of API endpoints across your application.
- **Timeouts**: Define a global timeout for all requests to ensure your application remains responsive, even if a server response is delayed.
- **Request and Response Interceptors**: Interceptors allow you to modify requests before they are sent and responses before they are processed. This is useful for adding headers, logging, or handling errors globally.
- **Automatic Retries**: Configure automatic retries for requests that fail due to network issues or server errors, improving the reliability of your application.
- **Request Cancellation**: Cancel in-flight requests using a unique request ID, giving you control over resource usage and network traffic.
- **Automatic Content Type Handling**: Automatically handles JSON, text, FormData, Blob, and more based on the Content-Type.
- **Flexible Body Types**: Supports various body types, including `FormData`, `URLSearchParams`, `Blob`, and more, allowing you to easily work with different content types.
- **TypeScript Support**: Comes with TypeScript definitions out of the box, providing auto-completion and type checking to enhance development speed and reduce errors.

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

```typescript
import { createCustomFetch, type Config } from "newexpand-nextjs-fetch";
```

### Creating an Instance

Create a custom fetch instance with optional configuration:

```typescript
// typescript

import { createCustomFetch, Config } from "newexpand-nextjs-fetch";

const config: Config = {
  baseUrl: "https://api.example.com",
  timeout: 10000, // 10 seconds
  retryAttempts: 2,
  retryDelay: 2000, // 2 seconds
  headers: {
    "Content-Type": "application/json",
  },
};

const myFetch = createCustomFetch(config);
```

### Request and Response Interceptors\*\*

You can add multiple request and response interceptors, including asynchronous ones.

#### Adding a Request Interceptor

```typescript
// typescript

config.requestInterceptors = [
  async (requestOptions) => {
    // Add a token to the request headers
    requestOptions.headers = {
      ...requestOptions.headers,
      Authorization: `Bearer YOUR_TOKEN_HERE`,
    };
    return requestOptions;
  },
];
```

#### Adding a Response Interceptor

```typescript
// typescript

config.responseInterceptors = [
  async (response) => {
    // Check for a specific condition in the response
    if (!response.ok) {
      throw new Error("An error occurred");
    }
    return response;
  },
];
```

### Making HTTP Requests

#### GET Request

```typescript
// typescript

const fetchData = async () => {
  const { data, isLoading, isError } = await myFetch.get("/path/to/resource");
  if (isError) {
    console.error("Error fetching data");
    return;
  }
  if (isLoading) {
    console.log("Loading...");
    return;
  }
  console.log("Data:", data);
};
```

#### POST Request

```typescript
// typescript

const postData = async () => {
  const body = { key: "value" };
  const { data, isLoading, isError } = await myFetch.post(
    "/path/to/resource",
    body
  );
  // Handle response as in the GET example
};
```

### Canceling a Request

You can cancel a request using the cancelRequest method. Each request is identified by a unique ID.

```typescript
// typescript

const requestId = "unique-request-id";

// Start a request
myFetch.get("/path/to/resource", {}, requestId);

// Cancel the request
myFetch.cancelRequest(requestId);
```

## Supported Body Types

When making `POST`, `PUT`, `PATCH`, or `DELETE` requests, you can send data in various formats. Below is a table of the supported body types and their descriptions, ensuring you can work with a wide range of content types effectively.

| Body Type         | Description                                                                                  |
| ----------------- | -------------------------------------------------------------------------------------------- |
| `string`          | A plain text string. Useful for sending JSON as a string after using `JSON.stringify()`.     |
| `FormData`        | Use for multipart/form-data requests, such as file uploads.                                  |
| `URLSearchParams` | Encodes data as query string parameters. Useful for form submissions.                        |
| `Blob`            | Use for binary data, such as files.                                                          |
| `ArrayBuffer`     | Use for binary data when you need to manipulate the bytes before sending.                    |
| `ArrayBufferView` | A view on an `ArrayBuffer` (e.g., `Uint8Array`, `Float32Array`). For binary data operations. |
| `ReadableStream`  | A stream of data. Useful for uploading large files without reading them into memory first.   |
| `null`            | Indicates no body should be sent with the request.                                           |
| `undefined`       | Similar to `null`, it indicates that no body is set, resulting in no body being sent.        |

## Automatic Content Type Handling

`newexpand-nextjs-fetch` simplifies the handling of different response types by automatically processing the response based on the `Content-Type` header. This feature ensures that you receive the data in the appropriate format without needing to manually parse the response for common content types.

Below is a table detailing how different `Content-Type` responses are handled:

| Content-Type                                             | Handled As   | Description                                                                               |
| -------------------------------------------------------- | ------------ | ----------------------------------------------------------------------------------------- |
| `application/json`                                       | JSON         | Automatically parsed into a JavaScript object.                                            |
| `text/*`                                                 | Text         | Treated as plain text, including `text/html`, `text/plain`, etc.                          |
| `multipart/form-data`                                    | FormData     | Returned as `FormData`, useful for processing forms and file uploads.                     |
| `image/*`, `application/pdf`, `application/octet-stream` | Blob         | Binary data, including images and PDFs, is returned as a `Blob`.                          |
| `Other`                                                  | Error Thrown | If the content type is not supported, an error is thrown indicating the unsupported type. |

|

## Advanced Configuration

The `Config` object allows for advanced configuration such as setting custom headers, configuring retry attempts and delays, and more. Refer to the Config interface for all available options.

## Contributing

Contributions are welcome! If you have suggestions or want to improve the library, feel free to create issues or pull requests on the GitHub repository.

## License

This library is open-sourced software licensed under the MIT license.
