import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Div, Icon, ScrollDiv, Text } from 'react-native-magnus'
import { SafeAreaView } from 'react-native-safe-area-context'
import { verticalScale } from 'react-native-size-matters'
import { FeaturedCard } from '../components/cards/featuredCard'
import { ListCard } from '../components/cards/listCard'
import { TitleText } from '../components/styled/styled'
import useFetch from '../hooks/useGet'
import { AppScreenProps, AppScreens } from '../navigation/screens'
import productService from '../service/product.service'
import { Product } from '../types/product.type'
import { TitleGenerator } from '../utils/text'

const HomeScreen: React.FC<AppScreenProps<AppScreens.HOME_SCREEN>> = ({ navigation }) => {
    const fetchFeature = async () => {

        const res = await productService.getAll()

        const sortedProducts = res.sort((a, b) => b.rating - a.rating);

        return sortedProducts;
    };

    const { data, isFetching, isFetched } = useFetch<Product>(fetchFeature, 'products', true);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style='auto' />
            <Div flex={1} px={'xl'}>
                <ScrollDiv showsVerticalScrollIndicator={false} flex={1}>
                    <Div flexDir='row' justifyContent='space-between' alignItems='center' py={'lg'} mb={'sm'} >
                        <TitleText>Ginpedia</TitleText>
                        <Div h={50} w={50} bg='black' rounded={'circle'}></Div>
                    </Div>
                    <Div mb={'xl'}>
                        <TitleGenerator title="Destacados" />
                    </Div>
                    <ScrollDiv flexDir='row' horizontal showsHorizontalScrollIndicator={false} mb={'xl'}>
                        {
                            data &&
                            data?.slice(0, 3).map((d) => (
                                <FeaturedCard alreadyFetched={true} isLoading={false} image='random' title={d.name} rating={d.rating} />
                            ))
                        }
                    </ScrollDiv>
                    <Div mb={'xl'}>
                        <TitleGenerator title="Añadidos recientemente" />
                    </Div>
                    {/* {
                        data.map((e) => {
                            return (
                                <ListCard isLoading={isFetching} image='random' title='Bebida' rating='7.3' alreadyFetched={isFetched} />
                            )
                        }) Prueba con datos falsos
                    } */}
                    {
                        data &&
                        data?.map((d) => (
                            <ListCard alreadyFetched={true} isLoading={false} image='random' title={d.name} rating={d.rating} />
                        ))
                    }
                    <Div flexDir='row' mx={'md'} h={verticalScale(100)} py={'xl'} alignItems='flex-start'>
                        <Text color='secondary'>Ver todos</Text>
                        <Icon mx={10} color='secondary' fontSize={'xl'} name='arrowright' />
                    </Div>
                </ScrollDiv>
            </Div>
        </SafeAreaView>
    )
}

export default HomeScreen