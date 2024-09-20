import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { TouchableOpacity } from "react-native"
import { Div, Icon, Image, Text } from "react-native-magnus"
import { scale, verticalScale } from "react-native-size-matters"
import { AppScreens, AppScreensParamList } from "../../navigation/screens"
import { TitleGenerator } from "../../utils/text"
import { customTheme } from "../../utils/theme"
import { FeaturedCardSkeletton } from "../styled/styled"
import { CardProps } from "./card.types"

type NavigationProps = NativeStackNavigationProp<AppScreensParamList, AppScreens.HOME_SCREEN>;

export const FeaturedCard = ({ product, isLoading, alreadyFetched }: CardProps) => {
    const navigation = useNavigation<NavigationProps>();

    const navigateToDetail = () => {
        navigation.navigate(AppScreens.PRODUCT_DETAIL_SCREEN, { productId: product.id });
    }
    if (isLoading && !alreadyFetched) {
        return (
            <Div h={verticalScale(170)} w={scale(180)}>
                <FeaturedCardSkeletton
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
        <TouchableOpacity onPress={navigateToDetail}>
            <Div p={customTheme.spacing.medium} h={verticalScale(170)} w={scale(180)} rounded='xl' flexDir="row" bg="cardBg" mr={'md'} >
                <Div flex={1}>
                    <Div flexDir="row">
                        <Icon color="secondary" mr={'md'} name="star" />
                        <Text color="black">{product.rating ? product.rating : 'Nadie rateo esto'}</Text>
                    </Div>
                    <TitleGenerator color="black" title={product.name} size="3xl" />
                </Div>
                <Div flex={1} alignItems="center">
                    <Image resizeMode="contain" style={{ height: verticalScale(150), width: scale(150) }} source={require('../../assets/Bottle.png')} />
                </Div>
            </Div>
        </TouchableOpacity>
    )
}