
import { HttpService } from "./http.service";

class ProductService extends HttpService {
    constructor() {
        super("products");
    }

    getAll = async (filter?: any) => {
        const res = await this.get(`/`, { ...filter });
        return res.data;
    };

}

export default new ProductService();
