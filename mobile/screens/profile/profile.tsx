import { StatusBar } from 'expo-status-bar';
import React, { useContext, useState } from 'react';
import { Div, ScrollDiv } from 'react-native-magnus';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MyHeader } from '../../components/layout/header';
import { BookmarkContext } from '../../context/bookmarkProvider';
import useFetch from '../../hooks/useGet';
import { AppScreenProps, AppScreens } from '../../navigation/screens';
import productService from '../../service/product.service';
import { Product } from '../../types/product.type';
import { QUERY_KEYS } from '../../types/query.types';
import { Bookmark, BookmarkType, ProfileOption } from '../../types/user.type';
import ProductList from './productList';
import ProfileInfo from './profileInfo';
import ScreenSelector from './screenSelector';

function ProfileScreen({ navigation }: AppScreenProps<AppScreens.PROFILE_SCREEN>) {
    const [option, setOption] = useState(ProfileOption.PROFILE)
    const { bookmarks } = useContext(BookmarkContext)
    const WISHLIST = bookmarks.filter((bookmark: Bookmark) => bookmark.type === BookmarkType.WISHLIST)
    const PURCHASED = bookmarks.filter((bookmark: Bookmark) => bookmark.type === BookmarkType.PURCHASED)

    const bringProducts = async () => {
        try {
            const res = await productService.getAll();
            return res;
        } catch (error) {
            console.error(error);
            return [];
        }
    };
    const { data, isFetching, isFetched } = useFetch<Product[]>(bringProducts, [QUERY_KEYS.PRODUCTS]);

    const filteredWishlistProducts = data.filter(product =>
        WISHLIST.some(item => item.productId === Number(product.id))
    );

    const filteredPurchasedProducts = data.filter(product =>
        PURCHASED.some(item => item.productId === Number(product.id))
    );

    const setFilter = () => {
        switch (option) {
            case ProfileOption.WISHLIST:
                return filteredWishlistProducts
            case ProfileOption.PUNCTUATION:
                return []
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
                <Div bg='background' flex={2} px={'xl'} >
                    <ScrollDiv>
                        <MyHeader />
                        <ScreenSelector option={option} setOption={setOption} />
                    </ScrollDiv>
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
