import Petition from "../types/petition.type";
import { User } from "../types/user.type";
import { HttpService } from "./http.service";

class PetitionService extends HttpService {
  constructor() {
    super("petitions");
  }

  getAll = async () => {
    const res = await this.get(`/`);
    return res.data;
  };

  create = async (petition:Petition) => {
    const res = await this.post(`/`, { petition })
    return res.data;
  };
}

export default new PetitionService();
