

import axios from "axios";
import { BASE_URL } from "../utils/config";
import { HttpService } from "./http.service";

export class UserService extends HttpService {
  constructor() {
    super("users");
  }

  getAll = async (options?: Record<string, any>) => {
    const res = await this.get(`/`, options);
    return res.data;
  };

  register = async (email: string, password: string, name: string) => {
    return await axios.post(`${BASE_URL}/users`, { email, password, name });
  };

  deleteUser = async (id: number) => {
    return this.delete(`/${id}`);
  };

  bringUserBookmarks = async (id: number) => {
    return this.get(`/bookmarks/${id}`)
  }

  changePassword = async ({
    currentPass,
    newPass,
  }: {
    currentPass: string;
    newPass: string;
  }) => {
    return this.post(`/changePass`, {
      currentPass: currentPass,
      newPass: newPass,
    });
  };
}

export default new UserService();
