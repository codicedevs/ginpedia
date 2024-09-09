import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import DetailsScreen from "../screens/details";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { FadeWrapper } from "../components/fadeView";
import LoginScreen from "../screens/auth/login";
import RecoverCredentialsScreen from "../screens/auth/recoverCredentials";
import RegisterScreen from "../screens/auth/register";
import HomeScreen from "../screens/home";
import SettingsScreen from "../screens/settings";
import Trialscreen from "../screens/trial";
import Trialscreen2 from "../screens/trial2";
import { AppScreens, AppScreensParamList } from "./screens";

const SettingsStack = createNativeStackNavigator();
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
            <HomeStack.Screen name={AppScreens.TRIAL1_SCREEN} component={Trialscreen} />
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
            <SettingsStack.Screen name={AppScreens.TRIAL2_SCREEN} component={Trialscreen2} />
        </SettingsStack.Navigator>
    );
}

export function TabStackScreen() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="HomeStack" component={HomeStackScreen} />
            <Tab.Screen name="SettingsStack" component={SettingsStackScreen} />
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