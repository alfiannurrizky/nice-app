export const setToken = (token) => {
  localStorage.setItem('nice_token', token);
};

export const getToken = () => {
  return localStorage.getItem('nice_token');
};

export const removeToken = () => {
  localStorage.removeItem('nice_token');
};

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  // Basic check, ideally decode and check expiry
  return true;
};
