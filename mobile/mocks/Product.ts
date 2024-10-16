import { ProductType } from "../types/product.type";

export const mockProductList = [
    {
        name: "Vodka Absolut",
        description: "Un vodka premium sueco conocido por su pureza y sabor suave.",
        type: ProductType.ESPECIA,
        image: "uploads/vodka_absolut.png",
        origin: "Suecia",
        graduation: "40%",
        combinations: [
            {
                id: 2,
                name: "Tónica y Limón",
                type: ProductType.GIN,
                primaryProductId: "1",
                secondaryProductId: "2",
                description: "Perfecto con tónica y limón.",
            },
        ],
        ratingList: [
            {
                userId: "user123",
                rating: 5,
            },
            {
                userId: "user456",
                rating: 4,
            },
        ],
        rating: 4.5,
        punctuation: "Alto grado alcohólico, suave al paladar.",
        id: "product123",
    },
    {
        name: "Vodka Absolut",
        description: "Un vodka premium sueco conocido por su pureza y sabor suave.",
        type: ProductType.ESPECIA,
        image: "uploads/vodka_absolut.png",
        origin: "Suecia",
        graduation: "40%",
        combinations: [
            {
                id: 2,
                name: "Tónica y Limón",
                type: ProductType.GIN,
                primaryProductId: "1",
                secondaryProductId: "2",
                description: "Perfecto con tónica y limón.",
            },
        ],
        ratingList: [
            {
                userId: "user123",
                rating: 5,
            },
            {
                userId: "user456",
                rating: 4,
            },
        ],
        rating: 4.5,
        punctuation: "Alto grado alcohólico, suave al paladar.",
        id: "prt123",
    },
    {
        name: "Vodka Absolut",
        description: "Un vodka premium sueco conocido por su pureza y sabor suave.",
        type: ProductType.ESPECIA,
        image: "uploads/vodka_absolut.png",
        origin: "Suecia",
        graduation: "40%",
        combinations: [
            {
                id: 2,
                name: "Tónica y Limón",
                type: ProductType.GIN,
                primaryProductId: "1",
                secondaryProductId: "2",
                description: "Perfecto con tónica y limón.",
            },
        ],
        ratingList: [
            {
                userId: "user123",
                rating: 5,
            },
            {
                userId: "user456",
                rating: 4,
            },
        ],
        rating: 4.5,
        punctuation: "Alto grado alcohólico, suave al paladar.",
        id: "asdasda",
    }
] 