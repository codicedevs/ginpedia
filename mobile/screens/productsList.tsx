import React, { useState } from 'react';
import { Div, ScrollDiv } from 'react-native-magnus';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ListCard } from '../components/cards/listCard';
import { MyHeader } from '../components/layout/header';
import { ListFilterSelector } from '../components/List/listFilterSelector';
import useFetch from '../hooks/useGet';
import { AppScreenProps, AppScreens } from '../navigation/screens';
import productService from '../service/product.service';
import { FilterOptions } from '../types/list.types';
import { Product } from '../types/product.type';
import { QUERY_KEYS } from '../types/query.types';

function ProductListScreen({ navigation }: AppScreenProps<AppScreens.PRODUCT_LIST_SCREEN>) {
    const [option, setOption] = useState<FilterOptions>(FilterOptions.GIN)

    const bringData = async () => {
        const res = await productService.getAll({
            where: {
                type: option
            }
        })
        return res
    }

    const { data, isFetching, isFetched } = useFetch<Product>(bringData, [QUERY_KEYS.PRODUCTS, option]);

    const handleOption = (opc: FilterOptions) => {
        setOption(opc)
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Div px={'xl'} flex={1}>
                <MyHeader />
                <Div mb={'xl'}>
                    <ListFilterSelector handler={handleOption} value={option} />
                </Div>
                <Div flex={1}>
                    <ScrollDiv >
                        {
                            data.map((inf, index) => (
                                <ListCard key={index} punctuation='400' alreadyFetched={isFetched} isLoading={isFetching} image='random' title={inf.name} rating={inf.rating} />
                            ))
                        }
                    </ScrollDiv>
                </Div>
            </Div>
        </SafeAreaView>
    )
}

export default ProductListScreen