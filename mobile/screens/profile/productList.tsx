import React from 'react';
import { ListCard } from '../../components/cards/listCard';
import productService from '../../service/product.service';
import { Product } from '../../types/product.type';

function ProductList({ data }: { data: Product[] }) {
    const bringProducts = async () => {
        const res = await productService.getAll()
        return res;
    };

    return (
        <>
            {
                data &&
                data.map((product) => (
                    <ListCard product={product} alreadyFetched={false} isLoading={false} />
                ))
            }
        </>
    );
}

export default ProductList;
