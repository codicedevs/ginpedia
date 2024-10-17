import { useEffect } from "react";
import { Button, Div, Image, Text } from "react-native-magnus";
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
}

export const ListFilterSelector = ({ handler, value, openSelect, currentFilter }: ListFilterSelectorProps) => {
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
            justifyContent="space-between"
            bg="transparent"
            onLayout={(event) => {
                const totalWidth = event.nativeEvent.layout.width;
                const totalButtonSpace = totalWidth * 0.75;
                containerWidth.value = totalButtonSpace;
                buttonWidth.value = totalButtonSpace / 3;
            }}
        >

            <Animated.View
                style={[
                    {
                        position: 'absolute',
                        width: buttonWidth.value,
                        height: '100%',
                        backgroundColor: 'yellow',
                        borderRadius: 20
                    },
                    animatedStyles
                ]}
            />

            {/* Botones */}
            {Object.values(FilterOptions).map((option, index) => (
                <Button
                    key={option}
                    onPress={() => {
                        handler(option);
                        updatePosition(index);
                    }}
                    flex={1}
                    justifyContent="center"
                    alignItems="center"
                    rounded="xl"
                    bg="transparent"
                >

                    <Text color={option === value ? 'black' : 'white'}>{option}</Text>
                </Button>
            ))}

            <TouchableImageFilter
                onPress={openSelect}
                style={{
                    backgroundColor: currentFilter.id !== '1' ? customTheme.colors.secondary : customTheme.colors.background,
                    width: `25%`
                }}
            >
                <Image resizeMode='contain' h={'50%'} w={'50%'} source={require('../../assets/filterSelector.png')} />
            </TouchableImageFilter>
        </Div>
    );
};