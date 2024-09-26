export enum ProductType {
  GIN = "gin",
  TONICA = "tonica",
  ESPECIA = "especia",
}

export type Product = {
  name: string;
  description: string;
  type: ProductType;
  image: string;
  origin: string;
  graduation: string;
  combinations?: any[];
  rating: string;
  punctuation?: string;
  id: string;
};
