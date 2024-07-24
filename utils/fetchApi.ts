import axios from "axios";
export default async function fetchApi<T>(
  path: string,
  method: string,
  body?: any
): Promise<T | any> {
  const url = process.env.NEXT_PUBLIC_API_URL + path;
  const headers = {
    "Content-Type": "application/json",
  };
  const options = {
    method,
    headers,
    ...(body && { data: JSON.stringify(body) }),
  };
  try {
    const response = await axios(url, options);
    return response.data;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
}

export async function getAPIWithParams(path: string, params: any) {
  const url = process.env.NEXT_PUBLIC_API_URL + path;
  const headers = {
    "Content-Type": "application/json",
  };
  const options = {
    method: "GET",
    headers,
    params,
  };
  try {
    const response = await axios(url, options);
    return response.data;
  } catch (error: any) {
    console.error(error);
    return error.response.data;
  }
}
