
import { FilterParamsProps } from "../types/query.types";
import { HttpService } from "./http.service";

class ProductService extends HttpService {
    constructor() {
        super("products");
    }

    getAll = async (filter?: FilterParamsProps) => {
        const res = await this.get(``, { params: filter });
        return res.data;
    };

    getById = async (id: string) => {
        const res = await this.get(`/${id}`)
        return res.data
    }
}

export default new ProductService();
