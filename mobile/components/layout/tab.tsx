import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";
import { Div, Image } from "react-native-magnus";
import { scale, verticalScale } from "react-native-size-matters";
import { customTheme } from "../../utils/theme";

const home = require('../../assets/home.png')
const search = require('../../assets/search.png')

export const MyTab: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    return (
        <Div style={{ flexDirection: 'row', backgroundColor: customTheme.colors.secondary }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];

                const label = route.name === 'HomeStack' ? home : route.name === 'SettingsStack' ? search : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: verticalScale(80) }}
                    >
                        <Image w={scale(25)} h={verticalScale(25)} source={label} />
                    </TouchableOpacity>
                );
            })}
        </Div>
    );
}