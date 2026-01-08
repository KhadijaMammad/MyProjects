const ACCESS_KEY = "accessToken";
const REFRESH_KEY = "refreshToken";
const EXPIRE_KEY = "autoLoginExpire";

export const setAuth = (accessToken: string, refreshToken: string) => {
  const expireDate = new Date();
  expireDate.setDate(expireDate.getDate() + 14);

  localStorage.setItem(ACCESS_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(EXPIRE_KEY, expireDate.toISOString());
};

export const isAuthenticated = (): boolean => {
  const access = localStorage.getItem(ACCESS_KEY);
  const expire = localStorage.getItem(EXPIRE_KEY);

  if (!access || !expire) return false;

  return new Date(expire) > new Date();
};


export const logout = () => {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(EXPIRE_KEY);
};

export const isExpired = (): boolean => {
  const expire = localStorage.getItem(EXPIRE_KEY);
  if (!expire) return true;

  return new Date(expire) <= new Date();
};
