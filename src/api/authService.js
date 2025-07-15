

import API from "./axios"; 
import { getRefreshToken } from "../utils/auth";


export const loginAPI = (data) => {
  return API.post("/login/", data);
};


export const registerAPI = (data) => {
  return API.post("/register/", data);
};


export const refreshToken = () => {
  const refresh = getRefreshToken();
  return API.post("/token/refresh/", { refresh });
};
