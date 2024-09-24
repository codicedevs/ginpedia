import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export enum AppScreens {
    LOGIN_SCREEN = 'LoginScreen',
    HOME_SCREEN = 'HomeScreen',
    TRIAL1_SCREEN = 'Trial1',
    TRIAL2_SCREEN = 'Trial2',
    SETTINGS_SCREEN = 'Settings',
    RECOVER_CREDENTIALS_SCREEN = 'RecoverCredentials',
    REGISTER_SCREEN = 'Register',
    PRODUCT_LIST_SCREEN = 'ProductList',
    PRODUCT_DETAIL_SCREEN = 'ProductDetail',
    PROFILE_SCREEN = 'Profile'
}

export type AppScreensParamList = {
    [AppScreens.LOGIN_SCREEN]: undefined;
    [AppScreens.HOME_SCREEN]: undefined;
    [AppScreens.TRIAL1_SCREEN]: undefined;
    [AppScreens.TRIAL2_SCREEN]: undefined;
    [AppScreens.SETTINGS_SCREEN]: undefined;
    [AppScreens.RECOVER_CREDENTIALS_SCREEN]: undefined;
    [AppScreens.REGISTER_SCREEN]: undefined;
    [AppScreens.PRODUCT_LIST_SCREEN]: { searchQuery: string };
    [AppScreens.PRODUCT_DETAIL_SCREEN]: { productId: string };
    [AppScreens.PROFILE_SCREEN]: undefined
}

export type AppScreenProps<T extends AppScreens> = {
    navigation: NativeStackNavigationProp<AppScreensParamList, T>;
    route: RouteProp<AppScreensParamList, T>;
}