import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Div, Icon } from "react-native-magnus";
import { verticalScale } from "react-native-size-matters";
import { useSearch } from "../../context/searchProvider";
import { AppScreens, AppStacks } from "../../navigation/screens";

const home = require('../../assets/home.png')
const search = require('../../assets/search.png')

export const MyTab: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    const { setIsOpen } = useSearch();
    const screen = getFocusedRouteNameFromRoute(state.routes[state.index]);

    if (screen === AppScreens.PRODUCT_DETAIL_SCREEN) return null;

    return (
        <Div flexDir="row" bg="secondary">
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                let label = "home-outline";
                if (route.name === AppStacks.HOME_STACK) label = "home-outline";
                else if (route.name === AppScreens.PRODUCT_LIST_SCREEN) label = "list-outline";
                else if (route.name === AppStacks.SETTINGS_STACK) label = "settings-outline";

                const onPress = () => {
                    if (route.name === AppStacks.SETTINGS_STACK) {
                        setIsOpen(true);
                    } else {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            if (route.name === AppScreens.PRODUCT_LIST_SCREEN) {
                                // Navega a ProductListScreen sin props anteriores
                                navigation.navigate(AppScreens.PRODUCT_LIST_SCREEN, {});
                            } else {
                                navigation.navigate(route.name, route.params);
                            }
                        }
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <Div key={route.key} flex={1} alignItems="center" justifyContent="center" rounded={'md'} h={verticalScale(55)}>
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                        >
                            <Icon color={"black"} fontSize={'title'} fontFamily="Ionicons" name={label} />
                        </TouchableOpacity>
                    </Div>
                );
            })}
        </Div>
    );
}
