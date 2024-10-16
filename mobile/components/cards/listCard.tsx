import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Div, Icon, Image, Text } from "react-native-magnus";
import { scale, verticalScale } from "react-native-size-matters";
import { AppScreens, AppScreensParamList } from "../../navigation/screens";
import { TitleGenerator } from "../../utils/text";
import { customTheme } from "../../utils/theme";
import { ListCardSkeletton } from "../styled/styled";
import { CardProps } from "./card.types";

type NavigationProps = NativeStackNavigationProp<
  AppScreensParamList,
  AppScreens.HOME_SCREEN
>;

export const ListCard = ({ product, isLoading, alreadyFetched }: CardProps) => {
  const navigation = useNavigation<NavigationProps>();

  const navigateToDetail = () => {
    navigation.navigate(AppScreens.PRODUCT_DETAIL_SCREEN, {
      productId: product.id,
    });
  };

  if (isLoading && !alreadyFetched) {
    return (
      <Div w={"100%"} mb={"sm"}>
        <ListCardSkeletton
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

  return (
    <TouchableOpacity onPress={navigateToDetail} activeOpacity={1}>
      <Div
        h={verticalScale(100)}
        w={"100%"}
        rounded="xl"
        flexDir="row"
        bg="cardBg"
        overflow="hidden"
        mb={"lg"}
        style={styles.cardContainer}
      >
        <Div flex={5} p={"xl"}>
          <Div flexDir="row">
            <Icon color="secondary" mr={"md"} name="star" />
            <Text color="black">
              {product.rating ? product.rating : "Nadie rateo esto"}
            </Text>
          </Div>
          <TitleGenerator color="black" title={product.name} size="2xl" />
          {!!product.punctuation && (
            <Text color="black" mt={"sm"} fontSize={customTheme.fontSize.small}>
              {product.punctuation} Puntuaciones
            </Text>
          )}
        </Div>
        <Div style={styles.imageContainer}>
          <Image
            resizeMode="cover"
            style={styles.image}
            source={{ uri: `${product.image}` }}
          />
          <Div style={styles.triangleMask} />
        </Div>
      </Div>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    position: "relative",
  },
  imageContainer: {
    flex: 7,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
  },
  image: {
    height: "100%", // Aseguramos que la imagen ocupe todo el alto del contenedor
    width: "100%", // La imagen se ajustará para cubrir todo el ancho y alto
  },
  triangleMask: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    borderStyle: "solid",
    borderTopWidth: verticalScale(100),
    borderRightWidth: scale(60),
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderTopColor: customTheme.colors.cardBg,
    borderRightColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: "transparent",
  },
});
