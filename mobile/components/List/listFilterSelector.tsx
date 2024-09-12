import { TouchableOpacity } from "react-native"
import { Button, Div, Image, Text } from "react-native-magnus"
import { scale, verticalScale } from "react-native-size-matters"
import { FilterOptions } from "../../types/list.types"
import { customTheme } from "../../utils/theme"

export const ListFilterSelector = ({ handler, value }: { handler: (opc: FilterOptions) => void, value: FilterOptions }) => {
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
                onPress={() => handler(FilterOptions.BOTANICA)}
                bg={FilterOptions.BOTANICA === value ? 'secondary' : 'grey'}
                flex={1}
                justifyContent="center"
                alignItems="center"
                rounded="xl"
            >
                <Text color={FilterOptions.BOTANICA === value ? 'black' : 'white'}>Botanica</Text>
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
            <TouchableOpacity onPress={() => handler(FilterOptions.OPCIONES)} style={{ backgroundColor: FilterOptions.OPCIONES === value ? customTheme.colors.secondary : 'grey', alignItems: 'center', justifyContent: 'center', width: scale(40), borderRadius: 5 }}>
                <Image resizeMode='contain' h={'50%'} w={'50%'} source={require('../../assets/filterSelector.png')} />
            </TouchableOpacity>
        </Div>
    )
}