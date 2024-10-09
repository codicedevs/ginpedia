
import { Div, Text } from "react-native-magnus";
import { scale, verticalScale } from "react-native-size-matters";
import { RatingModalInfo } from "./styled/styled";

interface RatingBarProps {
    stars: number;
    percentage: number;
}

export const RatingBar: React.FC<RatingBarProps> = ({ stars, percentage }) => {
    return (
        <RatingModalInfo>
            <Text w={scale(70)} color="black">{stars} estrellas</Text>
            <Div rounded="md" w={scale(140)} h={verticalScale(10)} bg="white">
                <Div rounded="md" bg="secondary" h="100%" w={`${percentage}%`} />
            </Div>
            <Text w={scale(60)} textAlign="center" color="black">{percentage}%</Text>
        </RatingModalInfo>
    );
};
