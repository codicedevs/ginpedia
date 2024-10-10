
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import { Div, Image } from "react-native-magnus";
import { scale, verticalScale } from "react-native-size-matters";
import { AppScreens, AppScreensParamList } from "../../navigation/screens";
import { TitleText } from "../styled/styled";

type NavigationProps = NativeStackNavigationProp<AppScreensParamList, AppScreens.PROFILE_SCREEN>;

export const MyHeader = () => {
    const navigation = useNavigation<NavigationProps>();
    const navigateToProfile = () => {
        navigation.navigate(AppScreens.PROFILE_SCREEN);
    }

    return (
        <Div flexDir='row' justifyContent='space-between' alignItems='center' py={'lg'} mb={'sm'} >
            <TitleText>Ginpedia</TitleText>
            <TouchableOpacity onPress={navigateToProfile}>
                <Image borderWidth={1} borderColor="secondary" rounded={'circle'} source={require("../../assets/beardman.png")} h={verticalScale(50)} w={scale(50)} />
            </TouchableOpacity>
        </Div>
    )
}