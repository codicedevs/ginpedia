import { FilterParamsProps } from "../types/query.types";
import { HttpService } from "./http.service";

class ProductService extends HttpService {
  constructor() {
    super("products");
  }

  getAll = async (filter?: FilterParamsProps) => {
    if (filter) {
      if (filter.where && typeof filter.where === 'object') {
        filter.where = JSON.stringify(filter.where);
      }
      if (filter.order && typeof filter.order === 'object') {
        filter.order = JSON.stringify(filter.order);
      }
    }
    const res = await this.get(``, { params: filter });
    return res.data;
  };

  getById = async (id: string) => {
    const res = await this.get(`/${id}?withCombination=true`);

    return res.data;
  };
}

export default new ProductService();
