import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Div, ScrollDiv } from 'react-native-magnus';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MyHeader } from '../../components/layout/header';
import { AppScreenProps, AppScreens } from '../../navigation/screens';
import { ProfileOption } from '../../types/user.type';
import ProductList from './productList';
import ProfileInfo from './profileInfo';
import ScreenSelector from './screenSelector';

function ProfileScreen({ navigation }: AppScreenProps<AppScreens.PROFILE_SCREEN>) {
    const [option, setOption] = useState(ProfileOption.PROFILE)

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
                            <ProductList />
                    }
                </Div>
            </SafeAreaView>
        </>
    );
}

export default ProfileScreen;
