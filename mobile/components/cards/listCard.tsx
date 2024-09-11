import { Div, Icon, Image, Skeleton, Text } from "react-native-magnus";
import { scale, verticalScale } from "react-native-size-matters";
import { TitleGenerator } from "../../utils/text";
import { customTheme } from "../../utils/theme";

export const ListCard = ({ image, title, rating, isLoading, alreadyFetched, punctuation }: CardProps) => {
    if (isLoading && !alreadyFetched) {
        return (
            <Div w={'100%'} mb={'sm'}>
                <Skeleton
                    w="100%"
                    h={verticalScale(100)}
                    p="xl"
                    rounded="xl"
                    flexDir="row"
                    style={{ backgroundColor: "grey" }}
                />
            </Div>
        );
    }

    return (
        <Div p={'xl'} h={verticalScale(100)} w={'100%'} rounded='xl' flexDir="row" bg="grey" mb={'lg'} >
            <Div flex={6}>
                <Div flexDir="row">
                    <Icon color="secondary" mr={'md'} name="star" />
                    <Text>{rating}</Text>
                </Div>
                <TitleGenerator title={title} size="4xl" />
                {
                    !!punctuation &&
                    <Text mt={'sm'} fontSize={customTheme.fontSize.small}>{punctuation} Puntuaciones</Text>
                }
            </Div>
            <Div justifyContent="center" alignItems="center" flex={1}>
                <Image resizeMode="contain" style={{ height: verticalScale(80), width: scale(150) }} source={require('../../assets/Bottle.png')} />
            </Div>
        </Div>
    );
}