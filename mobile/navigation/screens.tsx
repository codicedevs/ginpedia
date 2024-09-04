import { RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Match from "../types/match.type";

export enum AppScreens {
  LOGIN_SCREEN = "LoginScreen",
  HOME_SCREEN = "HomeScreen",
  TRIAL1_SCREEN = "Friends",
  TRIAL2_SCREEN = "Trial2",
  SETTINGS_SCREEN = "Settings",
  CREATE_MATCH = "CreateMatch",
  MATCH_DETAIL_SCREEN = "MatchDetailScreen",
}

export type AppScreensParamList = {
  [AppScreens.LOGIN_SCREEN]: undefined;
  [AppScreens.HOME_SCREEN]: undefined;
  [AppScreens.TRIAL1_SCREEN]: undefined;
  [AppScreens.TRIAL2_SCREEN]: undefined;
  [AppScreens.SETTINGS_SCREEN]: undefined;
  [AppScreens.CREATE_MATCH]:
    | { screen: AppScreens.MATCH_DETAIL_SCREEN; params: { match: Match } }
    | undefined;
  [AppScreens.MATCH_DETAIL_SCREEN]: Match;
};

export type AppScreenProps<T extends AppScreens> = {
  navigation: NativeStackNavigationProp<AppScreensParamList, T>;
  route: RouteProp<AppScreensParamList, T>;
};
