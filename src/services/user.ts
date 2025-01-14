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
