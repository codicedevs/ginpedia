import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TouchableOpacity } from "react-native";
import { Div, Icon, Image, Text } from "react-native-magnus";
import { scale, verticalScale } from "react-native-size-matters";
import { AppScreens, AppScreensParamList } from "../../navigation/screens";
import { TitleGenerator } from "../../utils/text";
import { customTheme } from "../../utils/theme";
import { FeaturedCardSkeletton } from "../styled/styled";
import { CardProps } from "./card.types";

type NavigationProps = NativeStackNavigationProp<
  AppScreensParamList,
  AppScreens.HOME_SCREEN
>;

export const FeaturedCard = ({
  product,
  isLoading,
  alreadyFetched,
}: CardProps) => {
  const navigation = useNavigation<NavigationProps>();

  const navigateToDetail = () => {
    navigation.navigate(AppScreens.PRODUCT_DETAIL_SCREEN, {
      productId: product.id,
    });
  };
  if (isLoading && !alreadyFetched) {
    return (
      <Div h={verticalScale(170)} w={scale(180)}>
        <FeaturedCardSkeletton
          from={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{
            type: "timing",
            duration: 1000,
            loop: true,
          }}
        />
      </Div>
    );
  }
  const truncTitle = (title: string) => {
    return title.length > 14 ? title.slice(0, 14) + "..." : title;
  };
  return (
    <TouchableOpacity onPress={navigateToDetail}>
      <Div
        p={customTheme.spacing.medium}
        h={verticalScale(150)}
        w={scale(140)}
        rounded="xl"
        flexDir="column"
        bg="cardBg"
        mr={"md"}
      >
        <Div flex={1}>
          <Div flexDir="row">
            <Icon color="secondary" mr={"md"} name="star" />
            <Text color="black">
              {product.rating ? product.rating : "Nadie rateo esto"}
            </Text>
          </Div>
          <TitleGenerator
            color="black"
            title={truncTitle(product.name)}
            size="xl"
          />
        </Div>
        <Div flex={1} justifyContent="flex-end" alignItems="center">
          <Image
            resizeMode="contain"
            style={{ height: "100%", width: "100%" }}
            source={{ uri: `${product.image}` }}
          />
        </Div>
      </Div>
    </TouchableOpacity>
  );
};
