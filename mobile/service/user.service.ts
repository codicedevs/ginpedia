import { User } from "../types/user.type";
import { HttpService } from "./http.service";

class UserService extends HttpService {
  constructor() {
    super("users");
  }

  getAll = async () => {
    const res = await this.get(`/`);
    return res.data;
  };

  getUserById = async (id: string) => {
    return this.get(`/${id}`);
  };

  getUserFriends = (id: string) => {
    return this.get(`${id}/friends`);
  };

  createUser = async (body: User) => {
    console.log(123, this.post);
    return this.post(`/register`, body);
  };

  editUser = async ({ id, ...body }: { id: string; body: User }) => {
    return this.put(`/edit/${id}`, body);
  };

  updatePushToken = async (id: string, pushToken: string) => {
    return this.patch(`/update-push-token/${id}/`, { pushToken });
  };

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
