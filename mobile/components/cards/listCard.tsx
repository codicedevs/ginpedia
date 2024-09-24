import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import { Div, Icon, Image, Text } from "react-native-magnus";
import { scale, verticalScale } from "react-native-size-matters";
import { AppScreens, AppScreensParamList } from "../../navigation/screens";
import { BASE_URL } from "../../utils/config";
import { TitleGenerator } from "../../utils/text";
import { customTheme } from "../../utils/theme";
import { ListCardSkeletton } from "../styled/styled";
import { CardProps } from "./card.types";

type NavigationProps = NativeStackNavigationProp<AppScreensParamList, AppScreens.HOME_SCREEN>;

export const ListCard = ({ product, isLoading, alreadyFetched }: CardProps) => {
    const navigation = useNavigation<NavigationProps>();

    const navigateToDetail = () => {
        navigation.navigate(AppScreens.PRODUCT_DETAIL_SCREEN, { productId: product.id });
    }

    if (isLoading && !alreadyFetched) {
        return (
            <Div w={'100%'} mb={'sm'}>
                <ListCardSkeletton
                    from={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        type: 'timing',
                        duration: 1000,
                        loop: true,
                    }}
                />
            </Div>
        );
    }

    return (
        <TouchableOpacity onPress={navigateToDetail} >
            <Div p={'xl'} h={verticalScale(100)} w={'100%'} rounded='xl' flexDir="row" bg="cardBg" mb={'lg'} >
                <Div flex={6}>
                    <Div flexDir="row">
                        <Icon color="secondary" mr={'md'} name="star" />
                        <Text color="black">{product.rating ? product.rating : 'Nadie rateo esto'}</Text>
                    </Div>
                    <TitleGenerator color="black" title={product.name} size="4xl" />
                    {
                        !!product.punctuation &&
                        <Text color="black" mt={'sm'} fontSize={customTheme.fontSize.small}>{product.punctuation} Puntuaciones</Text>
                    }
                </Div>
                <Div justifyContent="center" alignItems="center" flex={1}>
                    <Image resizeMode="contain" style={{ height: verticalScale(80), width: scale(150) }} source={{ uri: `${BASE_URL}/${product.image}` }} />
                </Div>
            </Div>
        </TouchableOpacity>
    );
}