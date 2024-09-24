import { Product } from "../../types/product.type";

export interface CardProps {
    product: Product
    isLoading: boolean;
    alreadyFetched: boolean;
}