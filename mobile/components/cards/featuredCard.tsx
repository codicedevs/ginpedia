import { Div, Icon, Image, Skeleton, Text } from "react-native-magnus"
import { scale, verticalScale } from "react-native-size-matters"
import { TitleGenerator } from "../../utils/text"
import { customTheme } from "../../utils/theme"

export const FeaturedCard = ({ image, title, rating, isLoading, alreadyFetched }: { image: string, title: string, rating: string, isLoading: boolean, alreadyFetched: boolean }) => {
    if (isLoading && !alreadyFetched) {
        return (
            <Div h={verticalScale(170)} w={scale(180)}>
                <Skeleton
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'gray'
                    }}
                />
            </Div>
        );
    }

    return (
        <Div p={customTheme.spacing.medium} h={verticalScale(170)} w={scale(180)} rounded='xl' flexDir="row" style={{ backgroundColor: "grey" }} mr={'md'} >
            <Div flex={1}>
                <Div flexDir="row">
                    <Icon color="secondary" mr={'md'} name="star" />
                    <Text>{rating}</Text>
                </Div>
                <TitleGenerator title={title} size="3xl" />
            </Div>
            <Div flex={1} alignItems="center">
                <Image resizeMode="contain" style={{ height: verticalScale(150), width: scale(150) }} source={require('../../assets/Bottle.png')} />
            </Div>
        </Div>
    )
}