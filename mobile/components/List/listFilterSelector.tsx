import { Button, Div, Image, Text } from "react-native-magnus"
import { verticalScale } from "react-native-size-matters"
import { FilterOptions, filterValueProp } from "../../types/list.types"
import { customTheme } from "../../utils/theme"
import { TouchableImageFilter } from "../styled/styled"

interface ListFilterSelectorProps {
    handler: (option: FilterOptions) => void;
    value: FilterOptions;
    openSelect: () => void;
    currentFilter: filterValueProp;
    search: string | null
}

export const ListFilterSelector = ({ handler, value, openSelect, currentFilter, search }: ListFilterSelectorProps) => {
    return (
        <Div h={verticalScale(35)} w={'100%'} flexDir='row' justifyContent="flex-end">
            {!search &&
                <>
                    <Button
                        onPress={() => handler(FilterOptions.GIN)}
                        bg={FilterOptions.GIN === value ? 'secondary' : 'background'}
                        flex={1}
                        justifyContent="center"
                        alignItems="center"
                        rounded="xl"
                        mr={4}
                    >
                        <Text color={FilterOptions.GIN === value ? 'black' : 'white'}>Gin</Text>
                    </Button>
                    <Button
                        onPress={() => handler(FilterOptions.ESPECIA)}
                        bg={FilterOptions.ESPECIA === value ? 'secondary' : 'background'}
                        flex={1}
                        justifyContent="center"
                        alignItems="center"
                        rounded="xl"
                        mr={4}
                    >
                        <Text color={FilterOptions.ESPECIA === value ? 'black' : 'white'}>Especia</Text>
                    </Button>
                    <Button
                        onPress={() => handler(FilterOptions.TONICA)}
                        bg={FilterOptions.TONICA === value ? 'secondary' : 'background'}
                        flex={1}
                        justifyContent="center"
                        alignItems="center"
                        rounded="xl"
                        mr={4}
                    >
                        <Text color={FilterOptions.TONICA === value ? 'black' : 'white'}>Tonica</Text>
                    </Button>
                </>
            }
            <TouchableImageFilter onPress={openSelect} style={{ backgroundColor: currentFilter.id !== '1' ? customTheme.colors.secondary : customTheme.colors.background }}>
                <Image resizeMode='contain' h={'50%'} w={'50%'} source={require('../../assets/filterSelector.png')} />
            </TouchableImageFilter>
        </Div>
    )
}