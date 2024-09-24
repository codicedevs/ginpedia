import React from 'react';
import { ListCard } from '../../components/cards/listCard';
import useFetch from '../../hooks/useGet';
import productService from '../../service/product.service';
import { Product } from '../../types/product.type';

function ProductList() {
    const bringProducts = async () => {
        const res = await productService.getAll()
        return res;
    };

    const { data: products, isFetching, isFetched } = useFetch<Product[]>(bringProducts, ['productsList']);
    return (
        <>
            {
                products &&
                products.map((product) => (
                    <ListCard product={product} alreadyFetched={isFetched} isLoading={isFetching} />
                ))
            }
        </>
    );
}

export default ProductList;
