import { TouchableOpacity } from "react-native"
import { Button, Div, Image, Text } from "react-native-magnus"
import { scale, verticalScale } from "react-native-size-matters"
import { FilterOptions, filterValueProp } from "../../types/list.types"
import { customTheme } from "../../utils/theme"

interface ListFilterSelectorProps {
    handler: (opc: FilterOptions) => void;
    value: FilterOptions;
    openSelect: () => void;
    currentFilter: filterValueProp
}

export const ListFilterSelector = ({ handler, value, openSelect, currentFilter }: ListFilterSelectorProps) => {
    return (
        <Div h={verticalScale(35)} w={'100%'} flexDir='row'>
            <Button
                onPress={() => handler(FilterOptions.GIN)}
                bg={FilterOptions.GIN === value ? 'secondary' : 'grey'}
                flex={1}
                justifyContent="center"
                alignItems="center"
                rounded="xl"
            >
                <Text color={FilterOptions.GIN === value ? 'black' : 'white'}>Gin</Text>
            </Button>
            <Button
                onPress={() => handler(FilterOptions.ESPECIA)}
                bg={FilterOptions.ESPECIA === value ? 'secondary' : 'grey'}
                flex={1}
                justifyContent="center"
                alignItems="center"
                rounded="xl"
            >
                <Text color={FilterOptions.ESPECIA === value ? 'black' : 'white'}>Especia</Text>
            </Button>
            <Button
                onPress={() => handler(FilterOptions.TONICA)}
                bg={FilterOptions.TONICA === value ? 'secondary' : 'grey'}
                flex={1}
                justifyContent="center"
                alignItems="center"
                rounded="xl"
            >
                <Text color={FilterOptions.TONICA === value ? 'black' : 'white'}>Tonica</Text>
            </Button>
            <TouchableOpacity onPress={openSelect} style={{ backgroundColor: currentFilter.id !== '1' ? customTheme.colors.secondary : 'grey', alignItems: 'center', justifyContent: 'center', width: scale(40), borderRadius: customTheme.borderRadius.medium }}>
                <Image resizeMode='contain' h={'50%'} w={'50%'} source={require('../../assets/filterSelector.png')} />
            </TouchableOpacity>
        </Div>
    )
}