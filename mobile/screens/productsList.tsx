import { Picker } from '@react-native-picker/picker';
import { MotiView } from 'moti';
import React, { useRef, useState } from 'react';
import { Div, ScrollDiv } from 'react-native-magnus';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ListCard } from '../components/cards/listCard';
import { MyHeader } from '../components/layout/header';
import { ListFilterSelector } from '../components/List/listFilterSelector';
import useFetch from '../hooks/useGet';
import { AppScreenProps, AppScreens } from '../navigation/screens';
import productService from '../service/product.service';
import { FilterOptions, filterValueProp } from '../types/list.types';
import { Product } from '../types/product.type';
import { QUERY_KEYS } from '../types/query.types';
import { customTheme } from '../utils/theme';

const filterValues = [
    {
        label: "Nombre A - Z",
        value: { action: "ASC", property: "name", id: '1' }
    },
    {
        label: "Nombre Z - A",
        value: { action: "DESC", property: "name", id: '2' }
    },
    {
        label: "Puntuación mayor a menor",
        value: { action: "ASC", property: "rating", id: '3' }
    },
    {
        label: "Puntuación menor a mayor",
        value: { action: "DESC", property: "rating", id: '4' }
    },
];

function ProductListScreen({ route, navigation }: AppScreenProps<AppScreens.PRODUCT_LIST_SCREEN>) {
    const { searchQuery } = route.params || {}
    const [option, setOption] = useState<FilterOptions>(FilterOptions.GIN);
    const [currentFilter, setCurrentFilter] = useState<any>(filterValues[0].value);
    const pickerRef = useRef<Picker<string> | null>(null);
    const [isFading, setIsFading] = useState(false);

    const bringProducts = async () => {
        const query = {
            where: {},
            order: currentFilter ? { [currentFilter.property]: currentFilter.action } : undefined,
        };

        if (searchQuery) {
            query.where = { ...query.where, name: { like: searchQuery } };
        } else {
            query.where = { ...query.where, type: option };
        }

        try {
            const res = await productService.getAll(query);
            return res;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const { data, isFetching, isFetched, refetch } = useFetch<Product[]>({ fn: bringProducts, key: [QUERY_KEYS.PRODUCTS, currentFilter.id, searchQuery] });

    const handleOption = (option: FilterOptions) => {
        setIsFading(true);
        setOption(option)
        setTimeout(() => {
            refetch()
        }, 50);
        setTimeout(() => {
            setIsFading(false);
        }, 400);
    };

    const openSelect = () => {
        if (pickerRef.current) {
            pickerRef.current.focus();
        }
    };

    const handleSelectedValue = (item: filterValueProp) => {
        if (currentFilter.id === item.id) {
            setCurrentFilter(filterValues[0].value)
        } else {
            setCurrentFilter(item)
        }
    }

    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <Div bg='background' px={'xl'} flex={1}>
                    <MyHeader />
                    <Div mb={'xl'}>
                        <ListFilterSelector handler={handleOption} value={option} currentFilter={currentFilter} openSelect={openSelect} />
                    </Div>
                    <Picker
                        ref={pickerRef}
                        selectedValue={currentFilter}
                        onValueChange={(itemValue) => handleSelectedValue(itemValue)}
                        style={{ display: 'none' }}
                    >
                        {filterValues.map((item, index) => (
                            <Picker.Item key={index} label={item.label} style={{ backgroundColor: currentFilter.id === item.value.id ? customTheme.colors.secondary : 'white' }} value={item.value} />
                        ))}
                    </Picker>
                    <Div flex={1}>
                        <ScrollDiv>
                            {data && data.map((product, index) => (
                                <MotiView
                                    key={index}
                                    from={{ opacity: 0 }}
                                    animate={{ opacity: isFading ? 0 : 1 }}
                                    transition={{ type: 'timing', duration: 500 }}
                                >
                                    <ListCard
                                        key={index}
                                        alreadyFetched={isFetched}
                                        isLoading={isFetching}
                                        product={product}
                                    />
                                </MotiView>
                            ))}
                        </ScrollDiv>
                    </Div>
                </Div>
            </SafeAreaView>
        </>
    );
}

export default ProductListScreen;
