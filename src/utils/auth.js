import storage from './storage';
const TOKEN_KEY = 'HEIMA_TOUTIAO';

const getToken = () => storage.get(TOKEN_KEY);
const setToken = (token) => storage.set(TOKEN_KEY, token);
const removeToken = () => storage.remove(TOKEN_KEY);
export { getToken, setToken, removeToken };
