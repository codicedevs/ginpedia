import { axiosInstance } from "./config/axiosConfig";

export interface AuthProvider {
  login: (params: { username: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  checkError: (error: any) => Promise<void>;
  getPermissions: () => Promise<void>;
}

export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    try {
      const { data } = await axiosInstance.post("auth/signin", {
        email: username,
        password,
      });
      localStorage.setItem("token", JSON.stringify(data.accessToken));
      localStorage.setItem("name", JSON.stringify(data.user.name));
    } catch (err) {
      const error = err as Error;
      throw new Error("Ocurrio un error: " + error.message);
    }
  },
  logout: async () => {
    localStorage.clear();
    return Promise.resolve();
  },
  checkAuth: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return Promise.reject();
    } else {
      return Promise.resolve();
    }
  },
  checkError: async (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.clear();
      return Promise.reject();
    }
    return Promise.resolve();
  },
  getPermissions: async () => {
    return localStorage.getItem("token") ? Promise.resolve() : Promise.reject();
  },
};
