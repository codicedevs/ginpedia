import { User } from "../types/user.type";
import { HttpService } from "./http.service";
import Match from "../types/match.type";

class MatchService extends HttpService {
  constructor() {
    super("matches");
  }

  getAll = async () => {
    const res = await this.get(`/`);
    return res.data;
  };

  createMatch = async (body: Match) => {
    return this.post(`/`, body);
  };
}

export default new MatchService();
