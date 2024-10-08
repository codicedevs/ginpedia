import { StatusBar } from "expo-status-bar";
import React from "react";
import { Div, Icon, ScrollDiv, Text } from "react-native-magnus";
import { SafeAreaView } from "react-native-safe-area-context";
import { verticalScale } from "react-native-size-matters";
import { FeaturedCard } from "../components/cards/featuredCard";
import { ListCard } from "../components/cards/listCard";
import { MyHeader } from "../components/layout/header";
import useFetch from "../hooks/useGet";
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

    const { data, isFetching, isFetched } = useFetch<Product[]>(fetchFeature, ['products'], true);

    const navigateList = () => {
        navigation.navigate(AppScreens.PRODUCT_LIST_SCREEN, {})
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style='auto' />
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
                                <FeaturedCard alreadyFetched={true} isLoading={false} product={product} />
                            ))
                        }
                    </ScrollDiv>
                    <Div mb={'xl'}>
                        <TitleGenerator title="Añadidos recientemente" />
                    </Div>
                    {
                        data &&
                        data?.map((product) => (
                            <ListCard alreadyFetched={true} isLoading={false} product={product} />
                        ))
                    }
                    <Div flexDir='row' mx={'md'} h={verticalScale(100)} py={'xl'} alignItems='flex-start'>
                        <Text onPress={navigateList} color='secondary'>Ver todos</Text>
                        <Icon mx={10} color='secondary' fontSize={'xl'} name='arrowright' />
                    </Div>
                </ScrollDiv>
            </Div>
        </SafeAreaView>
    )
}

export default HomeScreen
