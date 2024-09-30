import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Dimensions, TouchableOpacity } from "react-native";
import {
    Button,
    Div,
    Icon,
    Image,
    Overlay,
    Text
} from "react-native-magnus";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
import { scale, verticalScale } from "react-native-size-matters";
import { MyHeader } from "../components/layout/header";
import {
    BoldText,
    InfoContainer,
    RatingModalInfo,
} from "../components/styled/styled";
import useFetch from "../hooks/useGet";
import { AppScreenProps, AppScreens } from "../navigation/screens";
import productService from "../service/product.service";
import { Product } from "../types/product.type";
import { BASE_URL } from "../utils/config";
import { TitleGenerator } from "../utils/text";
import { customTheme } from "../utils/theme";


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';


const images = [
    require('../assets/Bottle.png'),
    require('../assets/yooo.png'),
    require('../assets/favicon.png'),
];
function ProductDetail({
    route,
    navigation,
}: AppScreenProps<AppScreens.PRODUCT_DETAIL_SCREEN>) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const info = [...new Array(6).keys()];
    const [open, setOpen] = useState(false);
    const { productId } = route.params;
    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const fetchProduct = async () => {
        if (!productId) return;
        const res = await productService.getById(productId);
        return res;
    };

    // function animatedStyle(index, scrollY) {
    //   return useAnimatedStyle(() => {
    //     const inputRange = [
    //       (index - 1) * 300,  // Empieza a animarse un poco antes de llegar al ítem
    //       index * 300,        // Posición en el scroll donde está el ítem
    //     ];
    //     const outputRange = [300, 0]; // Empieza fuera de la pantalla y entra a su posición final
    //     const translateX = interpolate(scrollY.value, inputRange, outputRange, Extrapolate.CLAMP);

    //     return {
    //       transform: [{ translateX }],
    //       opacity: interpolate(scrollY.value, inputRange, [0, 1], Extrapolate.CLAMP)
    //     };
    //   });
    // }

    function animatedStyle(index, scrollY) {
        return useAnimatedStyle(() => {
            const startAnimating = screenHeight * 0.1; // Comienza después del 10% del scroll
            const fullyVisibleAt = startAnimating + 50; // Totalmente visible 100px después de empezar a animar

            const inputRange = [startAnimating, fullyVisibleAt];

            // Determina la dirección de la animación basada en si el índice es par (hacia la izquierda desde la parte superior) o impar (hacia la derecha desde la parte inferior)
            const isFromLeft = index % 2 === 0;
            const isFromTop = index % 2 === 0; // Alternar la dirección también en el eje Y

            const middleOfScreen = screenWidth / 2;
            const translateX = interpolate(
                scrollY.value,
                inputRange,
                isFromLeft ? [-middleOfScreen, 0] : [middleOfScreen, 0],
                Extrapolate.CLAMP
            );

            // Movemos en el eje Y para hacer la animación diagonal
            const translateY = interpolate(
                scrollY.value,
                inputRange,
                isFromTop ? [-middleOfScreen, 0] : [middleOfScreen, 0],
                Extrapolate.CLAMP
            );

            const opacity = interpolate(scrollY.value, inputRange, [0, 1], Extrapolate.CLAMP);

            // Ajusta el espaciado vertical para que sea consistente para todas las imágenes
            const verticalSpacing = 150; // Espacio vertical entre imágenes
            const baseTopPosition = screenHeight * 0.5; // Base posición vertical al 50% de la pantalla
            const topPosition = baseTopPosition + verticalSpacing * index; // Cada imagen se coloca 150px más abajo que la anterior

            return {
                position: 'absolute',
                top: topPosition,
                left: isFromLeft ? 0 : undefined,
                right: isFromLeft ? undefined : 0,
                transform: [{ translateX }, { translateY }], // Movemos en diagonal
                opacity,
                zIndex: 1, // Bajo zIndex para estar debajo de otros elementos
            };
        });
    }





    const {
        data: product,
        isFetching,
        isFetched,
    } = useFetch<Product>(fetchProduct, ["products", productId]);

    let combiBebida = "";
    if (product?.combinations) {
        product.type === "gin"
            ? (combiBebida = "tonica")
            : (combiBebida = product.type);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="auto" />
            <Overlay
                w={scale(310)}
                h={verticalScale(363)}
                bg="#D9D9D9"
                visible={open}
                p="xl"
            >
                <Div justifyContent="space-between" h={"100%"}>
                    <Div>
                        <Div flexDir="row">
                            <Icon color="black" mr={"md"} name="star" />
                            <Text color="black">7.3</Text>
                        </Div>
                        <TitleGenerator color="black" title="Puntuá esta bebida" />
                        <Text mt={"md"} color="black">
                            500 puntuacions
                        </Text>
                    </Div>
                    <Div h={verticalScale(123)} justifyContent="space-between">
                        <RatingModalInfo>
                            {/* Despues reemplazar esto con un componente */}
                            <Text color="black">5 estrellas</Text>
                            <Div
                                rounded={"md"}
                                w={scale(160)}
                                h={verticalScale(10)}
                                bg="white"
                            >
                                <Div rounded={"md"} bg="secondary" h={"100%"} w={"70%"} />
                            </Div>
                            <Text color="black">70%</Text>
                        </RatingModalInfo>
                        <RatingModalInfo>
                            <Text color="black">4 estrellas</Text>
                            <Div
                                rounded={"md"}
                                w={scale(160)}
                                h={verticalScale(10)}
                                bg="white"
                            >
                                <Div rounded={"md"} bg="secondary" h={"100%"} w={"15%"} />
                            </Div>
                            <Text color="black">15%</Text>
                        </RatingModalInfo>
                        <RatingModalInfo>
                            <Text color="black">3 estrellas</Text>
                            <Div
                                rounded={"md"}
                                w={scale(160)}
                                h={verticalScale(10)}
                                bg="white"
                            >
                                <Div rounded={"md"} bg="secondary" h={"100%"} w={"10%"} />
                            </Div>
                            <Text color="black">10%</Text>
                        </RatingModalInfo>
                        <RatingModalInfo>
                            <Text color="black">2 estrellas</Text>
                            <Div
                                rounded={"md"}
                                w={scale(160)}
                                h={verticalScale(10)}
                                bg="white"
                            >
                                <Div rounded={"md"} bg="secondary" h={"100%"} w={"3%"} />
                            </Div>
                            <Text color="black">3%</Text>
                        </RatingModalInfo>
                        <RatingModalInfo>
                            <Text color="black">1 estrellas</Text>
                            <Div
                                rounded={"md"}
                                w={scale(160)}
                                h={verticalScale(10)}
                                bg="white"
                            >
                                <Div rounded={"md"} bg="secondary" h={"100%"} w={"2%"} />
                            </Div>
                            <Text color="black">2%</Text>
                        </RatingModalInfo>
                    </Div>
                    <Div
                        flexDir="row"
                        justifyContent="space-between"
                        w={"70%"}
                        alignSelf="center"
                    >
                        <Icon
                            fontFamily="FontAwesome"
                            color="secondary"
                            fontSize={"6xl"}
                            name="star"
                        />
                        <Icon
                            fontFamily="FontAwesome"
                            color="black"
                            fontSize={"6xl"}
                            name="star-o"
                        />
                        <Icon
                            fontFamily="FontAwesome"
                            color="black"
                            fontSize={"6xl"}
                            name="star-o"
                        />
                        <Icon
                            fontFamily="FontAwesome"
                            color="black"
                            fontSize={"6xl"}
                            name="star-o"
                        />
                        <Icon
                            fontFamily="FontAwesome"
                            color="black"
                            fontSize={"6xl"}
                            name="star-o"
                        />
                    </Div>
                    <Div
                        h={verticalScale(40)}
                        w={"100%"}
                        justifyContent="space-between"
                        flexDir="row"
                    >
                        <Button onPress={() => setOpen(false)} bg="#BEBEBE" w={scale(120)}>
                            <BoldText color="black">CANCELAR</BoldText>
                        </Button>
                        <Button w={scale(120)} bg="secondary" color="black">
                            <BoldText color="black">ENVIAR</BoldText>
                        </Button>
                    </Div>
                </Div>
            </Overlay>


            <Div bg="background" flex={1} px={"xl"}>
                <Animated.ScrollView
                    onScroll={scrollHandler}
                    scrollEventThrottle={16}
                    style={{ flex: 1 }}
                >
                    <MyHeader />
                    {images.map((source, index) => (
                        <Animated.View
                            key={index}
                            style={[
                                {
                                    alignItems: 'center',
                                    marginBottom: 20,
                                },
                                animatedStyle(index, scrollY)
                            ]}
                        >
                            <Image source={source} style={{ width: 100, height: 100 }} />
                        </Animated.View>
                    ))}
                    <Div mb={"xl"} alignItems="flex-start" zIndex={10}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="arrowleft" fontSize={"3xl"} color="secondary" />
                        </TouchableOpacity>
                    </Div>
                    <Carousel
                        loop
                        width={scale(300)}
                        height={verticalScale(211)}
                        data={info}
                        scrollAnimationDuration={1000}
                        onProgressChange={(_, absoluteProgress) => {
                            setCurrentIndex(Math.round(absoluteProgress));
                        }}
                        renderItem={({ index }) => (
                            <Div flex={1} justifyContent="center">
                                <Image
                                    resizeMode="contain"
                                    style={{ height: "100%", width: "100%" }}
                                    source={{ uri: `${BASE_URL}/${product?.image}` }}
                                />
                            </Div>
                        )}
                    />
                    <Div flexDir="row" justifyContent="center" mt={"lg"} zIndex={10}>
                        {info.map((_, index) => (
                            <Div
                                w={scale(10)}
                                h={verticalScale(10)}
                                rounded={"sm"}
                                key={index}
                                bg={
                                    index === currentIndex ? customTheme.colors.secondary : "gray"
                                }
                                m={"sm"}
                            />
                        ))}
                    </Div>
                    <Div zIndex={10} mb={"md"} flexDir="row" justifyContent="space-between">
                        <Div>
                            <Div flexDir="row">
                                <Icon color="secondary" mr={"md"} name="star" />
                                <Text fontSize={"xs"}>7.3</Text>
                            </Div>
                            <Text fontSize={"xs"}>500 calificaciones</Text>
                        </Div>
                        <Icon color="secondary" fontSize="2xl" name="heart" />
                    </Div>
                    <Div zIndex={10} mb={"xl"}>
                        <TitleGenerator title={product?.name} />
                    </Div>
                    <Text mb={"lg"} textAlign="justify">
                        {product?.description}
                    </Text>
                    <InfoContainer zIndex={10}>
                        <BoldText>Informacion del producto</BoldText>
                        <Div zIndex={10} flexDir="row">
                            <Icon
                                mr={"sm"}
                                fontFamily="Entypo"
                                color="secondary"
                                fontSize="2xl"
                                name="location-pin"
                            />
                            <Text>{product?.origin}</Text>
                        </Div>
                        <Div flexDir="row">
                            <Icon
                                mr={"sm"}
                                fontFamily="Feather"
                                color="secondary"
                                fontSize="2xl"
                                name="percent"
                            />
                            <Text>{product?.graduation}</Text>
                        </Div>
                    </InfoContainer>

                    <InfoContainer zIndex={10}>
                        <BoldText>Bebidas relacionadas con este producto</BoldText>
                        {product?.combinations &&
                            product?.combinations
                                .filter((beb) => beb.type === combiBebida)
                                .map((p) => {
                                    return (
                                        <Div flexDir="row">
                                            <Icon
                                                mr={"sm"}
                                                fontFamily="MaterialCommunityIcons"
                                                color="secondary"
                                                fontSize="2xl"
                                                name="glass-cocktail"
                                            />
                                            <Text>{p.name}</Text>
                                        </Div>
                                    );
                                })}
                    </InfoContainer>

                    <InfoContainer zIndex={10}>
                        <BoldText>Aderezos perfectos para esta bebida</BoldText>
                        {product?.combinations &&
                            product?.combinations
                                .filter((beb) => beb.type === "especia")
                                .map((p) => {
                                    return (
                                        <Div flexDir="row">
                                            <Image
                                                mr={"sm"}
                                                resizeMode="center"
                                                w={scale(10)}
                                                h={"auto"}
                                                source={require("../assets/icons/orange.png")}
                                            />
                                            <Text>{p.name}</Text>
                                        </Div>
                                    );
                                })}
                    </InfoContainer>
                    <Div zIndex={10} flexDir="row" justifyContent="space-between" my={"2xl"}>
                        <Button
                            bg="background"
                            w={scale(150)}
                            onPress={() => {
                                setOpen(true);
                            }}
                            fontSize={"xl"}
                            prefix={<Icon fontSize={"xl"} name="star" mr={"lg"} />}
                        >
                            Calificar
                        </Button>
                        <Button
                            bg="secondary"
                            color="black"
                            w={scale(150)}
                            fontSize={"xl"}
                            prefix={
                                <Icon
                                    color="black"
                                    fontFamily="Ionicons"
                                    fontSize={"xl"}
                                    name="bag-handle-outline"
                                    mr={"lg"}
                                />
                            }
                        >
                            Comprar
                        </Button>
                    </Div>
                </Animated.ScrollView>
            </Div>
        </SafeAreaView>
    );
}

export default ProductDetail;
