import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Div, Image, Text } from "react-native-magnus";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { verticalScale } from "react-native-size-matters";
import { FilterOptions, filterValueProp } from "../../types/list.types";
import { customTheme } from "../../utils/theme";
import { TouchableImageFilter } from "../styled/styled";

interface ListFilterSelectorProps {
    handler: (option: FilterOptions) => void;
    value: FilterOptions;
    openSelect: () => void;
    currentFilter: filterValueProp;
    search: string | null
}

export const ListFilterSelector = ({ handler, value, openSelect, currentFilter, search }: ListFilterSelectorProps) => {
    const xOffset = useSharedValue(0);
    const buttonWidth = useSharedValue(0);
    const containerWidth = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: xOffset.value }],
        };
    });

    const updatePosition = (index: number) => {
        xOffset.value = withSpring(index * buttonWidth.value);
    };

    useEffect(() => {
        const index = Object.values(FilterOptions).indexOf(value);
        if (buttonWidth.value) {
            updatePosition(index);
        }
    }, [value]);

    return (
        <Div
            h={verticalScale(35)}
            w={'100%'}
            flexDir='row'
            alignItems="center"
            justifyContent={search ? "flex-end" : "space-between"}
            bg="transparent"
            onLayout={(event) => {
                const totalWidth = event.nativeEvent.layout.width;
                const totalButtonSpace = totalWidth * 0.75;
                containerWidth.value = totalButtonSpace;
                buttonWidth.value = totalButtonSpace / 3;
            }}
        >
            {!search &&
                <Animated.View
                    style={[
                        {
                            position: 'absolute',
                            width: buttonWidth.value,
                            height: '100%',
                            backgroundColor: customTheme.colors.secondary,
                            borderRadius: 20,
                            zIndex: 5
                        },
                        animatedStyles
                    ]}
                />}
            {
                !search ?
                Object.values(FilterOptions).map((option, index) => (
                    <TouchableOpacity
                        key={option}
                        onPress={() => {
                            handler(option);
                            updatePosition(index);
                        }}
                        style={{ flex: 1, zIndex: 10, alignItems: 'center' }}
                    >
                        <Text fontFamily="primary" color={option === value ? 'black' : 'grey'}>{option}</Text>
                    </TouchableOpacity>
                ))
                :
                <Div w={'80%'}>
                <Text fontFamily="primary" ml={'xl'} fontSize={'2xl'} color={'black'}>"{search}"</Text>
                </Div>
                }

            <TouchableImageFilter
                onPress={openSelect}
                style={{
                    backgroundColor: currentFilter.id !== '1' ? customTheme.colors.secondary : customTheme.colors.background,
                    width: `25%`,
                    zIndex: 1,
                }}
            >
                <Div w={'70%'} h={'100%'} alignItems="center" justifyContent="center">

                    <Image resizeMode='contain' h={'40%'} w={'40%'} source={require('../../assets/filterSelector.png')} />
                </Div>
            </TouchableImageFilter>
        </Div>
    );
};