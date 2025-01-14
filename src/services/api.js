import { API_URL } from "../lib/consts";
import axios from "axios";
export async function poster(data, api) {
  const req = await axios.post(API_URL + api, data);
  return req.data;
}

export async function fetcher(api) {
  const req = await axios.get(API_URL + api);
  return req.data;
}
