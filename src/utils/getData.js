import mockData from "../mock/data.json";

export default async function getData() {
  // To simulate responses from an API
  await new Promise((r) => setTimeout(r, 100));
  return { data: mockData };
}
