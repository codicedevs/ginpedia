
import { CreateBookmark } from "../types/user.type";
import { HttpService } from "./http.service";

export class UserService extends HttpService {
    constructor() {
        super("bookmarks");
    }

    createBookmark = async (body: CreateBookmark) => {
        const res = await this.post(`/`, body);
        return res.data;
    };

    deleteBookmark = async (id: number) => {
        return this.delete(`/${id}`);
    };
}

export default new UserService();
