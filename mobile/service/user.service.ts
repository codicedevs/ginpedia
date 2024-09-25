
import axios from "axios";
import { User } from "../types/user.type";
import { BASE_URL } from "../utils/config";
import { HttpService } from "./http.service";

class UserService extends HttpService {
    constructor() {
        super("users");
    }

    getAll = async (options?: Record<string, any>) => {
        const res = await this.get(`/`, options);
        return res.data;
    };

    register = async (email: string, password: string, name: string) => {
        return await axios.post(`${BASE_URL}/users`, { email, password, name });
    }

    getUserById = async (id: string) => {
        return this.get(`/${id}`);
    };

    editUser = async ({ id, ...body }: { id: string, body: User }) => {
        return this.put(`/edit/${id}`, body);
    };

    changePassword = async ({ currentPass, newPass }: { currentPass: string; newPass: string }) => {
        return this.post(`/changePass`, {
            currentPass: currentPass,
            newPass: newPass
        });
    };
}

export default new UserService();
