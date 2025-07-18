

import API from "./axios";
import { getRefreshToken, getStoredUser } from "../utils/auth";


export const loginAPI = (data) => {
  return API.post("/login/", data);
};


export const registerAPI = (data) => {
  return API.post("/register/", data);
};


export const resetPasswordApi = (email) => {
  return API.post('/password-rest', { email });
};

export const resetPasswordConfirmApi = ({ uid, token, new_password }) => {
  return API.post(`password-reset-confirm/${uid}/${token}/`, {
    new_password
  });
};


export const refreshToken = () => {
  const refresh = getRefreshToken();
  return API.post("/token/refresh/", { refresh });
};

export const assingnedStudentApi = () => {
  const data = getStoredUser();
  const user = data?.user;
  if (user?.role === "teacher" && user?.teacher_id) {
    return API.get(`/students/assigned-to/${user.teacher_id}/`);
  } else {
    return Promise.reject("Invalid user or teacher_id");
  }
};



