import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { Div } from 'react-native-magnus';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../context/authProvider';
import { BookmarkContext } from '../../context/bookmarkProvider';
import useFetch from '../../hooks/useGet';
import { AppScreenProps, AppScreens } from '../../navigation/screens';
import productService from '../../service/product.service';
import userService from '../../service/user.service';
import { Product } from '../../types/product.type';
import { QUERY_KEYS } from '../../types/query.types';
import { Bookmark, BookmarkType, ProfileOption } from '../../types/user.type';
import ProductList from './productList';
import ProfileInfo from './profileInfo';
import ScreenSelector from './screenSelector';

function ProfileScreen({ route, navigation }: AppScreenProps<AppScreens.PROFILE_SCREEN>) {
    const { screen } = route.params;
    const { currentUser } = useContext(AuthContext)
    const [option, setOption] = useState(screen ? screen : ProfileOption.PROFILE)
    const { bookmarks } = useContext(BookmarkContext)
    const Wishlist = bookmarks.filter((bookmark: Bookmark) => bookmark.type === BookmarkType.WISHLIST)
    const Purchased = bookmarks.filter((bookmark: Bookmark) => bookmark.type === BookmarkType.PURCHASED)

    const bringProducts = async () => {
        try {
            const res = await productService.getAll();
            return res;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const bringRatedProducts = async () => {
        if (!currentUser) return
        try {
            const res = await userService.bringRatedProducts(currentUser?.id)
            return res.data
        } catch (e) {
            console.error(e)
            return []
        }
    }

    const { data, isFetching, isFetched } = useFetch<Product[]>({ fn: bringProducts, key: [QUERY_KEYS.PRODUCTS] });

    // const { data: ratedProducts } = useFetch<Product[]>({ fn: bringRatedProducts, key: [QUERY_KEYS.PRODUCTS] })
    // console.log(ratedProducts, 3)
    const filteredWishlistProducts = data.filter(product =>
        Wishlist.some(item => item.productId === Number(product.id))
    );

    const filteredPurchasedProducts = data.filter(product =>
        Purchased.some(item => item.productId === Number(product.id))
    );
    const ratedProducts = data.filter(product => product.rating !== null);

    const setFilter = () => {
        switch (option) {
            case ProfileOption.WISHLIST:
                return filteredWishlistProducts
            case ProfileOption.PUNCTUATION:
                return ratedProducts
            case ProfileOption.STORE:
                return filteredPurchasedProducts
            default:
                return []
        }
    }

    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar />
                <Div bg='background' flex={1} px={'xl'} mb={'md'} >
                    <ScreenSelector option={option} setOption={setOption} />
                </Div>
                <Div py={'md'} px={'xl'} bg='background' flex={8}>
                    {
                        option === ProfileOption.PROFILE ?
                            <ProfileInfo />
                            :
                            <ProductList data={setFilter()} />
                    }
                </Div>
            </SafeAreaView>
        </>
    );
}

export default ProfileScreen;
