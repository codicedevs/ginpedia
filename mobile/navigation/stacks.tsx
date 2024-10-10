import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import DetailsScreen from "../screens/details";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { FadeWrapper } from "../components/fadeView";
import { MyTab } from "../components/layout/tab";
import LoginScreen from "../screens/auth/login";
import RecoverCredentialsScreen from "../screens/auth/recoverCredentials";
import RegisterScreen from "../screens/auth/register";
import HomeScreen from "../screens/home";
import ProductDetail from "../screens/productDetail";
import ProductListScreen from "../screens/productsList";
import ProfileScreen from "../screens/profile/profile";
import SettingsScreen from "../screens/settings";
import { AppScreens, AppScreensParamList, AppStacks } from "./screens";

const SettingsStack = createNativeStackNavigator<AppScreensParamList>();
const AuthStack = createNativeStackNavigator<AppScreensParamList>();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const HomeStack = createNativeStackNavigator<AppScreensParamList>();


export function HomeStackScreen() {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <HomeStack.Screen name={AppScreens.HOME_SCREEN} component={(props) => (
                <FadeWrapper>
                    <HomeScreen {...props} />
                </FadeWrapper>
            )} />
            <HomeStack.Screen name={AppScreens.PRODUCT_LIST_SCREEN} component={ProductListScreen} />
            <HomeStack.Screen name={AppScreens.PRODUCT_DETAIL_SCREEN} component={ProductDetail} />
            <HomeStack.Screen name={AppScreens.PROFILE_SCREEN} component={ProfileScreen} />
        </HomeStack.Navigator>
    );
}

export function SettingsStackScreen() {
    return (
        <SettingsStack.Navigator
            screenOptions={{
                animation: 'slide_from_right',
                headerShown: false
            }}>
            <SettingsStack.Screen name={AppScreens.SETTINGS_SCREEN} component={SettingsScreen} />
        </SettingsStack.Navigator>
    );
}

export function TabStackScreen() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={props => <MyTab {...props} />} >
            <Tab.Screen name={AppStacks.HOME_STACK} component={HomeStackScreen} />
            <Tab.Screen name={AppStacks.SETTINGS_STACK} component={SettingsStackScreen} />
        </Tab.Navigator>
    )
}

export function Principal() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Drawer.Screen name="TabStackScreen" component={TabStackScreen} />
        </Drawer.Navigator>
    )
}

export function AuthStackScreen() {
    return (
        <AuthStack.Navigator
            screenOptions={{
                animation: 'slide_from_right',
                headerShown: false
            }}
        >
            <AuthStack.Screen name={AppScreens.LOGIN_SCREEN} component={LoginScreen} />
            <AuthStack.Screen name={AppScreens.REGISTER_SCREEN} component={RegisterScreen} />
            <AuthStack.Screen name={AppScreens.RECOVER_CREDENTIALS_SCREEN} component={RecoverCredentialsScreen} />
        </AuthStack.Navigator>
    )
}