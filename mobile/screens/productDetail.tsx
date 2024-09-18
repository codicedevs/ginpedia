import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { Button, Div, Icon, Image, ScrollDiv, Text } from 'react-native-magnus';
import Carousel from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale } from 'react-native-size-matters';
import { MyHeader } from '../components/layout/header';
import { BoldText, InfoContainer } from '../components/styled/styled';
import { AppScreenProps, AppScreens } from '../navigation/screens';
import { TitleGenerator } from '../utils/text';
import { customTheme } from '../utils/theme';

function ProductDetail({ navigation }: AppScreenProps<AppScreens.PRODUCT_DETAIL_SCREEN>) {
    const width = Dimensions.get('window').width;
    const [currentIndex, setCurrentIndex] = useState(0);
    const data = [...new Array(6).keys()];

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style='auto' />
            <Div bg='background' flex={1} px={'xl'}>
                <ScrollDiv showsVerticalScrollIndicator={false} flex={1}>
                    <MyHeader />
                    <Div mb={'xl'} alignItems='flex-start'>
                        <Icon name='arrowleft' fontSize={'3xl'} color='secondary' />
                    </Div>
                    <Carousel
                        loop
                        width={scale(300)}
                        height={verticalScale(211)}
                        data={data}
                        scrollAnimationDuration={1000}
                        onProgressChange={(_, absoluteProgress) => {
                            setCurrentIndex(Math.round(absoluteProgress));
                        }}
                        renderItem={({ index }) => (
                            <Div
                                flex={1}
                                borderWidth={scale(1)}
                                justifyContent='center'
                            >
                                <Text textAlign='center' fontSize={'xl'}>
                                    {index}
                                </Text>
                            </Div>
                        )}
                    />

                    <Div flexDir='row' justifyContent='center' mt={'lg'}>
                        {data.map((_, index) => (
                            <Div
                                w={scale(10)}
                                h={verticalScale(10)}
                                rounded={'sm'}
                                key={index}
                                bg={index === currentIndex ? customTheme.colors.secondary : 'gray'}
                                m={'sm'}
                            />
                        ))}
                    </Div>
                    <Div mb={'md'} flexDir='row' justifyContent='space-between'>
                        <Div>
                            <Div flexDir='row'>
                                <Icon color="secondary" mr={'md'} name="star" />
                                <Text fontSize={'xs'}>7.3</Text>
                            </Div>
                            <Text fontSize={'xs'}>500 calificaciones</Text>
                        </Div>
                        <Icon color="secondary" fontSize='2xl' name="heart" />
                    </Div>
                    <Div mb={'xl'}>
                        <TitleGenerator title="Nombre del producto" />
                    </Div>
                    <Text mb={10} textAlign='justify'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut eu commodo enim. Maecenas condimentum dolor a est varius, eu efficitur enim blandit. Nunc interdum sem vitae pulvinar feugiat. Nullam rutrum, lacus at vulputate lacinia, purus diam vestibulum mauris, eu fermentum mi magna vitae est. Nam molestie condimentum efficitur. Nulla aliquet mauris a condimentum mattis. Ut quis elit vitae dolor interdum fermentum vel quis diam.
                    </Text>
                    <InfoContainer>
                        <BoldText>Informacion del producto</BoldText>
                        <Div flexDir='row'>
                            <Icon mr={'sm'} fontFamily='Entypo' color="secondary" fontSize='2xl' name="location-pin" />
                            <Text>PremiumDrink,STOCK,Sweden</Text>
                        </Div>
                        <Div flexDir='row'>
                            <Icon mr={'sm'} fontFamily='Feather' color="secondary" fontSize='2xl' name="percent" />
                            <Text>37,5</Text>
                        </Div>
                    </InfoContainer>

                    <InfoContainer>
                        <BoldText>Bebidas relacionadas con este producto</BoldText>
                        <Div flexDir='row'>
                            <Icon mr={'sm'} fontFamily='MaterialCommunityIcons' color="secondary" fontSize='2xl' name="glass-cocktail" />
                            <Text>PremiumDrink,STOCK,Sweden</Text>
                        </Div>
                        <Div flexDir='row'>
                            <Icon mr={'sm'} fontFamily='MaterialCommunityIcons' color="secondary" fontSize='2xl' name="glass-cocktail" />
                            <Text>37,5</Text>
                        </Div>
                    </InfoContainer>

                    <InfoContainer>
                        <BoldText>Aderezos perfectos para esta bebida</BoldText>
                        <Div flexDir='row'>
                            <Image resizeMode='center' w={10} h={'auto'} source={require('../assets/icons/orange.png')} />
                            <Text>Menta</Text>
                        </Div>
                        <Div flexDir='row'>
                            <Image resizeMode='center' w={10} h={'auto'} source={require('../assets/icons/orange.png')} />
                            <Text>Limon</Text>
                        </Div>
                    </InfoContainer>
                    <Div flexDir='row' justifyContent='space-between' my={'2xl'}>
                        <Button bg='background' w={150} fontSize={'xl'} prefix={<Icon fontSize={'xl'} name='star' mr={10} />}>
                            Calificar
                        </Button>
                        <Button bg='secondary' color='black' w={150} fontSize={'xl'} prefix={<Icon color='black' fontFamily='Ionicons' fontSize={'xl'} name='bag-handle-outline' mr={10} />}>
                            Comprar
                        </Button>
                    </Div>
                </ScrollDiv>
            </Div>
        </SafeAreaView>
    );
}

export default ProductDetail;