import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import DetailsScreen from "../screens/details";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { FadeWrapper } from "../components/fadeView";
import LoginScreen from "../screens/auth/login";
import HomeScreen from "../screens/home";
import SettingsScreen from "../screens/settings";
import Trialscreen from "../screens/trial";
import Trialscreen2 from "../screens/trial2";
import { AppScreens } from "./screens";
import CreateMatchForm from "../screens/createMatch";
import MatchDetailScreen from "../screens/matchDetailScreen";
import { Icon } from "react-native-magnus";

const SettingsStack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const CreateMatch = createNativeStackNavigator();
const MatchDetail = createNativeStackNavigator();

export function HomeStackScreen() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name={AppScreens.HOME_SCREEN}
        component={(props) => (
          <FadeWrapper>
            <HomeScreen {...props} />
          </FadeWrapper>
        )}
      />
      <Drawer.Screen name={AppScreens.TRIAL1_SCREEN} component={Trialscreen} />
    </Drawer.Navigator>
  );
}

export function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        animation: "slide_from_right",
        headerShown: false,
      }}
    >
      <SettingsStack.Screen
        name={AppScreens.SETTINGS_SCREEN}
        component={(props) => (
          <FadeWrapper>
            <SettingsScreen {...props} />
          </FadeWrapper>
        )}
      />
      <SettingsStack.Screen
        name={AppScreens.TRIAL2_SCREEN}
        component={Trialscreen2}
      />
    </SettingsStack.Navigator>
  );
}

export function CreateMatchStackScreen() {
  return (
    <CreateMatch.Navigator
      screenOptions={{
        animation: "slide_from_right",
        headerShown: false,
      }}
    >
      <CreateMatch.Screen
        name={AppScreens.CREATE_MATCH}
        component={CreateMatchForm}
      />

      <MatchDetail.Screen
        name={AppScreens.MATCH_DETAIL_SCREEN}
        component={MatchDetailScreen}
      />
    </CreateMatch.Navigator>
  );
}

export function TabStackScreen() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} fontSize={size}/>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // Previene el comportamiento por defecto
            e.preventDefault();

            // Restablece la pila y navega a la pantalla principal de Home
            navigation.navigate("HomeStack", {
              screen: AppScreens.HOME_SCREEN,
            });
          },
        })}
      />
      <Tab.Screen
        name="CreateMatch"
        component={CreateMatchStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="pluscircleo" color={color} fontSize={size}/>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // Previene el comportamiento por defecto
            e.preventDefault();

            // Restablece la pila y navega a la pantalla principal de Home
            navigation.navigate("CreateMatch", {
              screen: AppScreens.CREATE_MATCH,
            });
          },
        })}
      />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStackScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="setting" color={color} fontSize={size}/>
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // Previene el comportamiento por defecto
            e.preventDefault();

            // Restablece la pila y navega a la pantalla principal de Home
            navigation.navigate("SettingsStack", {
              screen: AppScreens.SETTINGS_SCREEN,
            });
          },
        })}
      />
    </Tab.Navigator>
  );
}

export function AuthStackScreen() {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen
        name={AppScreens.LOGIN_SCREEN}
        component={LoginScreen}
      />
    </AuthStack.Navigator>
  );
}
