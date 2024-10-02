import {
    DrawerItem
} from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Div, Icon, Text } from 'react-native-magnus';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import { AppScreens, AppScreensParamList } from '../../navigation/screens';
import { ProfileOption } from '../../types/user.type';
import { customTheme } from '../../utils/theme';

type NavigationProps = NativeStackNavigationProp<AppScreensParamList, AppScreens.HOME_SCREEN>;


function CustomDrawerContent(props) {
    const navigation = useNavigation<NavigationProps>()

    return (
        <SafeAreaView style={{ flex: 1, paddingHorizontal: customTheme.spacing.medium, backgroundColor: customTheme.colors.background }}>
            <Div flex={9} mt={'2xl'} >
                <DrawerItem label={'Favoritos'} onPress={() => navigation.navigate(AppScreens.PROFILE_SCREEN, { screen: ProfileOption.STORE })}
                    labelStyle={{
                        color: 'white',
                    }}
                    activeTintColor="black"
                    inactiveTintColor="white"
                    activeBackgroundColor="yellow"
                />
            </Div>
            <Div flex={1}>
                <Div ml={scale(5)} row>
                    <Icon mr={scale(5)} fontFamily='MaterialIcons' name='logout' />
                    <Text >Cerrar sesion</Text>
                </Div>
            </Div>
        </SafeAreaView>
    );
}

export default CustomDrawerContent