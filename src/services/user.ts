import cookie from "js-cookie";
import { API_URL } from "../lib/consts";
import axios from "axios";

const token = cookie.get("token");

export async function UserApi() {
  const req = await axios.get(API_URL + "/users/user", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return req.data;
}

export async function UserPoster(api: string, data: any) {
  const req = await axios.post(API_URL + api, {
    headers: { Authorization: `Bearer ${token}` },
    data,
  });
  return req;
}
