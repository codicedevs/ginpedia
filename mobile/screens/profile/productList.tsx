import React from 'react';
import { ListCard } from '../../components/cards/listCard';
import useFetch from '../../hooks/useGet';
import productService from '../../service/product.service';
import { Product } from '../../types/product.type';

function ProductList() {
    const bringProducts = async () => {
        const res = await productService.getAll()
        // const res = await productService.getAll(
        //{
        // where: {
        //     type: option
        // } hay q ver como voy a enviar los datos al back
        //    }
        // );
        console.log(res, 'q ')
        return res;
    };

    const { data: products, isFetching, isFetched } = useFetch<Product[]>(bringProducts, ['productsList']);
    console.log(products)
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
