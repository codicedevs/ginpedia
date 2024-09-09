import { Div, Icon, Image, Text } from "react-native-magnus"
import { scale, verticalScale } from "react-native-size-matters"
import { TitleGenerator } from "../../utils/text"

export const ListCard = ({ image, title, rating }: { image: string, title: string, rating: string }) => {
    return (
        <Div p={'xl'} h={verticalScale(100)} w={'100%'} rounded='xl' flexDir="row" style={{ backgroundColor: "grey" }} >
            <Div w={'70%'}>
                <Div flexDir="row">
                    <Icon color="secondary" mr={'md'} name="star" />
                    <Text>{rating}</Text>
                </Div>
                <TitleGenerator title={title} size="4xl" />
            </Div>
            <Div justifyContent="center" w={'30%'}>
                <Image resizeMode="contain" style={{ height: verticalScale(80), width: scale(150) }} source={require('../../assets/Bottle.png')} />
            </Div>
        </Div>
    )
}