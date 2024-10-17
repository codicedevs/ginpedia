import { MotiView } from 'moti';
import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { Button, Div, Icon, Image, Text } from 'react-native-magnus';
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale } from 'react-native-size-matters';
import AnimationDetail from '../components/AnimationDetail';
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
import { TitleGenerator } from '../utils/text';

function ProductDetail({ route, navigation }: AppScreenProps<AppScreens.PRODUCT_DETAIL_SCREEN>) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { currentUser } = useContext(AuthContext)
    const info = [...new Array(6).keys()];
    const [open, setOpen] = useState(false)
    const { productId } = route.params;
    const { bookmarks, getBookmarks } = useContext(BookmarkContext)
    const [isBookmarked, setIsBookmarked] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const filteredBookmarks = bookmarks.filter((bookmark: Bookmark) => bookmark.productId === Number(productId))
    const [isLoading, setIsLoading] = useState(false)
    const [showAnimation, setShowAnimation] = useState(true);
    const scrollY = useSharedValue(0);

    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });

    const animatedStyle = useAnimatedStyle(() => {
        const scale = interpolate(scrollY.value, [-200, 0, 200], [0.8, 1, 1.5]);
        return {
            transform: [{ scale }],
        };
    });

    const handleAnimationComplete = () => {
        setShowAnimation(false);
    };

    const deleteBookmark = async (id: number) => {
        setIsLoading(true)
        try {
            await bookmarkService.deleteBookmark(id)
        } catch (e) {
        } finally {
            setIsLoading(false)
        }
    }

    const createBookmark = async (option: BookmarkType) => {
        if (!currentUser) return
        setIsLoading(true)
        try {
            await bookmarkService.createBookmark({
                productId: Number(productId),
                userId: currentUser?.id,
                type: option
            })
        } catch (e) {
        } finally {
            setIsLoading(false)
        }
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

    const fetchProduct = async () => {
        if (!productId) return;
        const res = await productService.getById(productId);
        return res;
    };

    const screenWidth = Dimensions.get('window').width;

    const checkInteraction = async () => {
        setIsLiked(filteredBookmarks.some((bookmark: Bookmark) => bookmark.type === BookmarkType.WISHLIST))
        setIsBookmarked(filteredBookmarks.some((bookmark: Bookmark) => bookmark.type === BookmarkType.PURCHASED))
    }

    useEffect(() => { checkInteraction() }, [bookmarks])

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

    const { data: product, isFetching, isFetched } = useFetch<Product>({ fn: fetchProduct, key: ['products', productId] });

    let combiBebida = "";
    if (product?.combinations) {
        product.type === "gin"
            ? (combiBebida = "tonica")
            : (combiBebida = product.type);
    }

    if (!product) return null
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <RatingModal isVisible={open} setIsVisible={setOpen} rating={product.rating} ratings={product.ratingList} productId={productId} />
            <Div bg="background" flex={1} >
                <Animated.ScrollView showsVerticalScrollIndicator={false} onScroll={scrollHandler}>
                    <Div h={verticalScale(370)}>
                        <MotiView style={[
                            animatedStyle, {
                                justifyContent: 'center',
                                alignItems: 'center'
                            }
                        ]}>
                            <Image resizeMode='center' source={require('../assets/GinBackground.png')} h={verticalScale(370)} w={'100%'} />
                        </MotiView>
                    </Div>
                    <TouchableOpacity style={{ position: 'absolute' }} onPress={navigation.goBack}>
                        <Icon color='secondary' ml={scale(10)} mt={verticalScale(10)} fontSize={'5xl'} name='arrowleft' />
                    </TouchableOpacity>
                    <Image w={'100%'} h={verticalScale(50)} mt={verticalScale(-100)} source={require('../assets/CIRCULO.png')} />
                    <Div bg='secondary' px={"xl"} >
                        <Div mb={"md"} flexDir="row" justifyContent="space-between">
                            <Div>
                                <Div flexDir="row">
                                    <Icon color="black" mr={"md"} name="star" />
                                    <Text color='black' fontSize={"xs"}>7.3</Text>
                                </Div>
                                <Text color='black' fontSize={"xs"}>500 calificaciones</Text>
                            </Div>
                            <Div row>
                                <TouchableOpacity disabled={isLoading} onPress={() => handleInteraction(BookmarkType.WISHLIST)}>
                                    <Icon mr={scale(15)} color={isLiked ? "black" : 'grey'} fontSize="2xl" name="heart" />
                                </TouchableOpacity>
                                <TouchableOpacity disabled={isLoading} onPress={() => handleInteraction(BookmarkType.PURCHASED)}>
                                    <Icon color={isBookmarked ? "black" : 'grey'} fontSize="2xl" fontFamily='FontAwesome' name="bookmark" />
                                </TouchableOpacity>
                            </Div>
                        </Div>
                        <Div mb={"xl"}>
                            <TitleGenerator
                                color='black'
                                title={product?.name ? product?.name : "Producto"}
                                borderColor='black'
                            />
                        </Div>
                        <Text color='black' mb={"lg"} textAlign="justify">
                            {product?.description}
                        </Text>
                        <InfoContainer>
                            <BoldText color='black'>Informacion del producto</BoldText>
                            <Div flexDir="row">
                                <Icon
                                    mr={"sm"}
                                    fontFamily="Entypo"
                                    color="black"
                                    fontSize="2xl"
                                    name="location-pin"
                                />
                                <Text color='black'>{product?.origin}</Text>
                            </Div>
                            <Div flexDir="row">
                                <Icon
                                    mr={"sm"}
                                    fontFamily="Feather"
                                    color="black"
                                    fontSize="2xl"
                                    name="percent"
                                />
                                <Text color='black'>{product?.graduation}</Text>
                            </Div>
                        </InfoContainer>

                        <InfoContainer>
                            <BoldText color='black'>Bebidas relacionadas con este producto</BoldText>
                            {product?.combinations &&
                                product?.combinations
                                    .filter((beb) => beb.type === combiBebida)
                                    .map((p) => {
                                        return (
                                            <Div flexDir="row">
                                                <Icon
                                                    mr={"sm"}
                                                    fontFamily="MaterialCommunityIcons"
                                                    color="black"
                                                    fontSize="2xl"
                                                    name="glass-cocktail"
                                                />
                                                <Text color='black'>{p.name}</Text>
                                            </Div>
                                        );
                                    })}
                        </InfoContainer>

                        <InfoContainer>
                            <BoldText color='black'>Aderezos perfectos para esta bebida</BoldText>
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
                                                    source={require("../assets/icons/orangeB.png")}
                                                />
                                                <Text color='black'>{p.name}</Text>
                                            </Div>
                                        );
                                    })}
                        </InfoContainer>
                        <Div flexDir="row" justifyContent="center" my={"2xl"}>
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
                        </Div>
                    </Div>
                </Animated.ScrollView>
                {showAnimation && (
                    <AnimationDetail onAnimationComplete={handleAnimationComplete} />
                )}
            </Div>
        </SafeAreaView>
    );
}

export default ProductDetail;
