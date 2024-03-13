import { myFetch } from "./_api";

export default async function Page() {
  const data = await myFetch.get("/posts/1");

  console.log(data);
  return <h1>Hello, Next.js!</h1>;
}
