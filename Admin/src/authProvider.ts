import { axiosInstance } from "./config/axiosConfig";

export interface AuthProvider {
  login: (params: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  checkError: (error: any) => Promise<void>;
  getPermissions: () => Promise<void>;
}

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    try {
      const { data } = await axiosInstance.post("auth/signin", {
        email,
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
  checkError: async () => {},
  getPermissions: async () => {},
};
