import React, { useState } from 'react';
import { Div, ScrollDiv } from 'react-native-magnus';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ListCard } from '../components/cards/listCard';
import { MyHeader } from '../components/layout/header';
import { ListFilterSelector } from '../components/List/listFilterSelector';
import useFetch from '../hooks/useGet';
import { AppScreenProps, AppScreens } from '../navigation/screens';
import userService from '../service/user.service';
import { FilterOptions } from '../types/list.types';
import { QUERY_KEYS } from '../types/query.types';
import { User } from '../types/user.type';

function ProductListScreen({ navigation }: AppScreenProps<AppScreens.PRODUCT_LIST_SCREEN>) {
    const [option, setOption] = useState<FilterOptions>(FilterOptions.GIN)
    const { data } = useFetch<User>(userService.getAll, QUERY_KEYS.USERS, { meta: { triggerGlobalLoader: false } });
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
                        <ListCard punctuation='400' alreadyFetched={true} isLoading={false} image='random' title='Bebida' rating='7.3' />
                        <ListCard punctuation='400' alreadyFetched={true} isLoading={false} image='random' title='Bebida' rating='7.3' />
                        <ListCard punctuation='400' alreadyFetched={true} isLoading={false} image='random' title='Bebida' rating='7.3' />
                        <ListCard punctuation='400' alreadyFetched={true} isLoading={false} image='random' title='Bebida' rating='7.3' />
                        <ListCard punctuation='400' alreadyFetched={true} isLoading={false} image='random' title='Bebida' rating='7.3' />
                        <ListCard punctuation='400' alreadyFetched={true} isLoading={false} image='random' title='Bebida' rating='7.3' />
                        <ListCard punctuation='400' alreadyFetched={true} isLoading={false} image='random' title='Bebida' rating='7.3' />
                    </ScrollDiv>
                </Div>
            </Div>
        </SafeAreaView>
    )
}

export default ProductListScreen