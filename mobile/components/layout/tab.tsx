import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { TouchableOpacity } from "react-native";
import { Div, Image } from "react-native-magnus";
import { scale, verticalScale } from "react-native-size-matters";

const home = require('../../assets/home.png')
const search = require('../../assets/search.png')

export const MyTab: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
    return (
        <Div flexDir="row" bg="secondary">
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
                    <Div flex={1} alignItems="center" justifyContent="center" rounded={'md'} h={verticalScale(70)}>
                        <TouchableOpacity
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                        >
                            <Image w={scale(25)} h={verticalScale(25)} source={label} />
                        </TouchableOpacity>
                    </Div>
                );
            })}
        </Div>
    );
}