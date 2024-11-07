import React from "react";
import { TouchableOpacity } from "react-native";
import { Div, Icon, ScrollDiv, Text } from "react-native-magnus";
import { SafeAreaView } from "react-native-safe-area-context";
import { verticalScale } from "react-native-size-matters";
import { FeaturedCard } from "../components/cards/featuredCard";
import { ListCard } from "../components/cards/listCard";
import { FadeWrapper } from "../components/fadeView";
import { MyHeader } from "../components/layout/header";
import useFetch from "../hooks/useGet";
import { mockProductList } from "../mocks/Product";
import { AppScreenProps, AppScreens } from "../navigation/screens";
import productService from "../service/product.service";
import { Product } from "../types/product.type";
import { TitleGenerator } from "../utils/text";

const HomeScreen: React.FC<AppScreenProps<AppScreens.HOME_SCREEN>> = ({
    navigation,
}) => {
    const fetchFeature = async () => {
        const res = await productService.getAll();
        const sortedProducts = res.sort((a: any, b: any) => b.rating - a.rating);
        return sortedProducts;
    };

    const { data, isFetching, isFetched } = useFetch<Product[]>({
        fn: fetchFeature,
        key: ['products'],
        triggerLoader: false,
        initialData: mockProductList
    });

    const navigateList = () => {
        navigation.navigate(AppScreens.PRODUCT_LIST_SCREEN, {})
    }

    return (
        <FadeWrapper>
            <SafeAreaView style={{ flex: 1 }}>
                <Div bg='background' flex={1} px={'xl'}>
                    <ScrollDiv showsVerticalScrollIndicator={false} flex={1}>
                        <MyHeader />
                        <Div mb={'xl'}>
                            <TitleGenerator title="Destacados" />
                        </Div>
                        <ScrollDiv flexDir='row' horizontal showsHorizontalScrollIndicator={false} mb={'2xl'}>
                            {
                                data &&
                                data?.slice(0, 3).map((product) => (
                                    <FeaturedCard alreadyFetched={isFetched} isLoading={isFetching} product={product} />
                                ))
                            }
                        </ScrollDiv>
                        <Div mb={'xl'}>
                            <TitleGenerator title="Añadidos recientemente" />
                        </Div>
                        {
                            data &&
                            data?.map((product) => (
                                <ListCard alreadyFetched={isFetched} isLoading={isFetching} product={product} />
                            ))
                        }
                        <TouchableOpacity onPress={navigateList}>
                            <Div flexDir='row' mx={'md'} h={verticalScale(100)} py={'xl'} alignItems='flex-start'>
                                <Text color='secondary'>Ver todos</Text>
                                <Icon mx={10} color='secondary' fontSize={'xl'} name='arrowright' />
                            </Div>
                        </TouchableOpacity>
                    </ScrollDiv>
                </Div>
            </SafeAreaView>
        </FadeWrapper>
    )
}

export default HomeScreen
