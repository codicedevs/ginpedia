export enum QUERY_KEYS {
    USERS = 'users',
    PRODUCTS = 'products'
}

export interface FilterParamsProps {
    where?: {
        [key: string]: string;
    } | string
    order?: {
        [key: string]: string;
    } | string
}