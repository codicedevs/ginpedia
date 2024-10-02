import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Button, Div, Icon, Image, ScrollDiv, Text } from 'react-native-magnus';
import Carousel from 'react-native-reanimated-carousel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale } from 'react-native-size-matters';
import { MyHeader } from '../components/layout/header';
import RatingModal from '../components/modal/ratingModal';
import { BoldText, InfoContainer } from '../components/styled/styled';
import { AuthContext } from '../context/authProvider';
import { BookmarkContext } from '../context/bookmarkProvider';
import useFetch from '../hooks/useGet';
import useOptimistic from '../hooks/useOptimistic';
import { AppScreenProps, AppScreens } from '../navigation/screens';
import bookmarkService from '../service/bookmark.service';
import productService from '../service/product.service';
import { Product } from '../types/product.type';
import { QUERY_KEYS } from '../types/query.types';
import { Bookmark, BookmarkType } from '../types/user.type';
import { BASE_URL } from '../utils/config';
import { TitleGenerator } from '../utils/text';
import { customTheme } from '../utils/theme';
type UserBookmark = Record<BookmarkType, boolean>;

function ProductDetail({ route, navigation }: AppScreenProps<AppScreens.PRODUCT_DETAIL_SCREEN>) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { currentUser } = useContext(AuthContext)
    const info = [...new Array(6).keys()];
    const [open, setOpen] = useState(false)
    const { productId } = route.params;
    const { bookmarks, getBookmarks } = useContext(BookmarkContext)
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [isLiked, setIsLiked] = useState(false)

    const deleteBookmark = async (id) => {
        await bookmarkService.deleteBookmark(id)
    }

    const createBookmark = async (option) => {
        await bookmarkService.createBookmark({
            productId: Number(productId),
            userId: currentUser?.id,
            type: option
        })
    }

    const handleDeleteBookmark = useOptimistic({
        mutationFn: deleteBookmark,
        key: QUERY_KEYS.BOOKMARKS,
        onMutate: () => {
            setIsBookmarked(false)
        },
        onError: () => {
            setIsBookmarked(true)
        }
    })

    const handleDeleteLike = useOptimistic({
        mutationFn: deleteBookmark,
        key: QUERY_KEYS.BOOKMARKS,
        onMutate: () => {
            setIsLiked(false)
        },
        onError: () => {
            setIsLiked(true)
        }
    })

    const addBookmark = useOptimistic({
        mutationFn: createBookmark,
        key: QUERY_KEYS.BOOKMARKS,
        onMutate: () => {
            setIsBookmarked(true)
        },
        onError: () => {
            setIsBookmarked(false)
        }
    })

    const addLike = useOptimistic({
        mutationFn: createBookmark,
        key: QUERY_KEYS.BOOKMARKS,
        onMutate: () => {
            setIsLiked(true)
        },
        onError: () => {
            setIsLiked(false)
        }
    })

    const filteredBookmarks = bookmarks.filter((bookmark: Bookmark) => bookmark.productId === Number(productId))

    const fetchProduct = async () => {
        if (!productId) return;
        const res = await productService.getById(productId);
        return res;
    };



    const handleInteraction = async (option: BookmarkType) => {
        const index = filteredBookmarks.findIndex((bookmark: Bookmark) => bookmark.type === option);
        if (index > -1) {
            if (option === BookmarkType.WISHLIST) {
                handleDeleteLike.mutate(filteredBookmarks[index].id)
                return
            }
            handleDeleteBookmark.mutate(filteredBookmarks[index].id)
        } else {
            if (option === BookmarkType.WISHLIST) {
                addLike.mutate(option)
                return
            }
            addBookmark.mutate(option)
        }
        getBookmarks()
    }

    const { data: product, isFetching, isFetched } = useFetch<Product>(fetchProduct, ['products', productId]);

    let combiBebida = "";
    if (product?.combinations) {
        product.type === "gin"
            ? (combiBebida = "tonica")
            : (combiBebida = product.type);
    }

    if (!product) return null
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style="auto" />
            <RatingModal isVisible={open} setIsVisible={setOpen} rating={product.rating} ratings={product.ratingList} productId={productId} />
            <Div bg="background" flex={1} px={"xl"}>
                <ScrollDiv showsVerticalScrollIndicator={false} flex={1}>
                    <MyHeader />
                    <Div mb={"xl"} alignItems="flex-start">
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
                            <Div flex={1} borderWidth={scale(1)} justifyContent="center">
                                <Image
                                    resizeMode="contain"
                                    style={{ height: "100%", width: "100%" }}
                                    source={{ uri: `${BASE_URL}/${product?.image}` }}
                                />
                            </Div>
                        )}
                    />
                    <Div flexDir="row" justifyContent="center" mt={"lg"}>
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
                    <Div mb={"md"} flexDir="row" justifyContent="space-between">
                        <Div>
                            <Div flexDir="row">
                                <Icon color="secondary" mr={"md"} name="star" />
                                <Text fontSize={"xs"}>7.3</Text>
                            </Div>
                            <Text fontSize={"xs"}>500 calificaciones</Text>
                        </Div>
                        <Div row>
                            <TouchableOpacity onPress={() => handleInteraction(BookmarkType.WISHLIST)}>
                                <Icon mr={scale(15)} color={isLiked ? "secondary" : 'grey'} fontSize="2xl" name="heart" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleInteraction(BookmarkType.PURCHASED)}>
                                <Icon color={isBookmarked ? "secondary" : 'grey'} fontSize="2xl" fontFamily='FontAwesome' name="bookmark" />
                            </TouchableOpacity>
                        </Div>
                    </Div>
                    <Div mb={"xl"}>
                        <TitleGenerator
                            title={product?.name ? product?.name : "Producto"}
                        />
                    </Div>
                    <Text mb={"lg"} textAlign="justify">
                        {product?.description}
                    </Text>
                    <InfoContainer>
                        <BoldText>Informacion del producto</BoldText>
                        <Div flexDir="row">
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

                    <InfoContainer>
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

                    <InfoContainer>
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
                    <Div flexDir="row" justifyContent="space-between" my={"2xl"}>
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
                </ScrollDiv>
            </Div>
        </SafeAreaView>
    );
}

export default ProductDetail;
