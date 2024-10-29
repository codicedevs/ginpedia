import { useEffect } from "react";
import { Div, Image, Text } from "react-native-magnus";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { verticalScale } from "react-native-size-matters";
import { FilterOptions, filterValueProp } from "../../types/list.types";
import { capitalizeFirstLetter } from "../../utils/text";
import { customTheme } from "../../utils/theme";
import { TouchableImageFilter, TouchableOption } from "../styled/styled";

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
            {!search ?
                <Animated.View
                    style={[
                        {
                            position: 'absolute',
                            width: buttonWidth.value,
                            height: '100%',
                            backgroundColor: '#F4B929',
                            borderRadius: 20,
                            zIndex: 5
                        },
                        animatedStyles
                    ]}
                />
                :
                <Div w={'70%'} alignItems="flex-start">
                    <Text fontFamily="Bold" fontSize={'2xl'}>"{search}"</Text>
                </Div>
            }
            {
                !search &&
                Object.values(FilterOptions).map((option, index) => (
                    <TouchableOption
                        key={option}
                        onPress={() => {
                            handler(option);
                            updatePosition(index);
                        }}
                    >
                        <Text fontFamily={customTheme.fontFamily.normal} color={option === value ? 'black' : 'white'}>{capitalizeFirstLetter(option)}</Text>
                    </TouchableOption>
                ))}
            <Div pl={5} w={'25%'} alignItems="flex-end" >
                <TouchableImageFilter
                    onPress={openSelect}
                    style={{
                        backgroundColor: currentFilter.id !== '1' ? customTheme.colors.secondary : customTheme.colors.background,
                    }}
                >
                    <Div w={'100%'} h={'100%'} alignItems="center" justifyContent="center">
                        <Image resizeMode='contain' h={'40%'} w={'40%'} source={require('../../assets/filterSelector.png')} />
                    </Div>
                </TouchableImageFilter>
            </Div>
        </Div>
    );
};