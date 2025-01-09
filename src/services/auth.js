import { API_URL } from "../lib/consts"
import axios from "axios";
export async function LoginApi({email,password}){
    const req = await axios.post(API_URL+'/users/login', {email,password});
    return req.data;
}
