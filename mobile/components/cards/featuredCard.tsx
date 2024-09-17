import { Div, Icon, Image, Text } from "react-native-magnus"
import { scale, verticalScale } from "react-native-size-matters"
import { TitleGenerator } from "../../utils/text"
import { customTheme } from "../../utils/theme"
import { FeaturedCardSkeletton } from "../styled/styled"

export const FeaturedCard = ({ image, title, rating, isLoading, alreadyFetched }: CardProps) => {
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
        <Div p={customTheme.spacing.medium} h={verticalScale(170)} w={scale(180)} rounded='xl' flexDir="row" bg="cardBg" mr={'md'} >
            <Div flex={1}>
                <Div flexDir="row">
                    <Icon color="secondary" mr={'md'} name="star" />
                    <Text color="black">{rating}</Text>
                </Div>
                <TitleGenerator color="black" title={title} size="3xl" />
            </Div>
            <Div flex={1} alignItems="center">
                <Image resizeMode="contain" style={{ height: verticalScale(150), width: scale(150) }} source={require('../../assets/Bottle.png')} />
            </Div>
        </Div>
    )
}