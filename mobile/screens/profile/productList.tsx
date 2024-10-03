import React from 'react';
import { ListCard } from '../../components/cards/listCard';
import { Product } from '../../types/product.type';

function ProductList({ data }: { data: Product[] }) {

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
