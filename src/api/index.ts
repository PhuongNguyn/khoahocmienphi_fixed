import axios from "axios";

export const fetchApi = () => {
  const defaultOptions = {
    baseURL: "https://api.khoahocmienphi.net/api/v1",

    method: "get" || "delete" || "post" || "put" || "patch",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const instance = axios.create(defaultOptions);

  instance.interceptors.request.use(function (config: any) {
    // const token = sessionStorage.getItem('access-token');
    // config.headers['x-access-token'] = token ? `${token}` : '';
    return config;
  });

  return instance;
};
