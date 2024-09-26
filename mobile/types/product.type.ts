export enum ProductType {
    GIN = "gin",
    TONICA = "tonica",
    ESPECIA = "especia",
}

export type RatingListEntry = {
    [key: number]: number;
};

export type Product = {
    name: string;
    description: string;
    type: ProductType;
    image: string;
    origin: string;
    graduation: string;
    combinations?: number[];
    ratingList: RatingListEntry[],
    rating: number;
    punctuation?: string;
    id: string
};