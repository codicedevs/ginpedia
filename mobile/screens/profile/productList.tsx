import React from 'react';
import { Div, Text } from 'react-native-magnus';
import EmptyIcon from '../../assets/svg/emptyIcon';
import { ListCard } from '../../components/cards/listCard';
import { Product } from '../../types/product.type';

function ProductList({ data }: { data: Product[] }) {
    return (
        <>
            {
                data.length !== 0 ?
                    data.map((product) => (
                        <ListCard product={product} alreadyFetched={false} isLoading={false} />
                    ))
                    :
                    <Div flex={1} alignItems='center' justifyContent='center'>
                        <EmptyIcon />
                        <Text mt={'md'} fontSize={'xl'}>No se encuentran productos</Text>
                    </Div>
            }
        </>
    );
}

export default ProductList;
