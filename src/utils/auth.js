export const getStoredUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const getAccessToken = () => {
  const user = getStoredUser();
  return user?.access;
};

export const getRefreshToken = () => {
  const user = getStoredUser();
  return user?.refresh;
};

export const isAdmin = () => {
  const user = getStoredUser();
  return user?.user?.is_superuser;
};

export const getUserRole = () => {
  const user = getStoredUser();
  return user?.user?.role;
};
