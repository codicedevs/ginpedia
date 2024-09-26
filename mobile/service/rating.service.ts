
import { HttpService } from "./http.service";

class RatingService extends HttpService {
    constructor() {
        super("ratings");
    }

    createRating = async (productId: string, userId: number, rating: number) => {
        const res = await this.post(`/`, { productId, userId, rating });
        return res.data;
    };

}

export default new RatingService();
