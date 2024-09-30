export enum ProductType {
  GIN = "gin",
  TONICA = "tonica",
  ESPECIA = "especia",
}

export type RatingListEntry = {
  [key: number]: number;
};

type Combination = {
  id: number;
  name: string;
  type: ProductType
}

export type Product = {
  name: string;
  description: string;
  type: ProductType;
  image: string;
  origin: string;
  graduation: string;
  combinations?: Combination[];
  ratingList: RatingListEntry[],
  rating: number;
  punctuation?: string;
  id: string
};
