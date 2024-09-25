

import { IUser } from "../types/user.type";
import { HttpService } from "./http.service";

export class UserService extends HttpService {
    constructor() {
        super("users");
    }

    getAll = async (options?: Record<string, any>) => {
        const res = await this.get(`/`, options);
        return res.data;
    };

    getUserById = async (id: string) => {
        return this.get(`/${id}`);
    };

    createUser = async (body: IUser) => {
        return this.post(`/register`, body);
    };

    editUser = async ({ id, ...body }: { id: string, body: IUser }) => {
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
