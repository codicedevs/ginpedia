import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Div, Image } from "react-native-magnus";
import { scale, verticalScale } from "react-native-size-matters";
import { useSearch } from "../../context/searchProvider";
import { AppScreens, AppStacks } from "../../navigation/screens";

const home = require('../../assets/home.png')
const search = require('../../assets/search.png')

export const MyTab: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    const { setIsOpen } = useSearch();
    const screen = getFocusedRouteNameFromRoute(state.routes[0])
    if (screen === AppScreens.PRODUCT_DETAIL_SCREEN) return null
    return (
        <Div flexDir="row" bg="secondary">
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = route.name === AppStacks.HOME_STACK ? home : route.name === AppStacks.SETTINGS_STACK ? search : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    if (route.name === AppStacks.SETTINGS_STACK) {
                        setIsOpen(true)
                    }
                    else {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
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
                    <Div flex={1} alignItems="center" justifyContent="center" rounded={'md'} h={verticalScale(55)}>
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                        >
                            <Image w={scale(23)} h={verticalScale(23)} source={label} />
                        </TouchableOpacity>
                    </Div>
                );
            })}
        </Div>
    );
}