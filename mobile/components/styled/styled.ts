import { Div, Text } from "react-native-magnus";
import Animated from "react-native-reanimated";
import { scale, verticalScale } from "react-native-size-matters";
import styled from "styled-components/native";
import {
  commonTitleStyles,
  commonViewStyles,
  flexEnd,
  flexRow,
  inheritBackground,
  scrollable,
} from "./base";

export const SpinnerContainer = styled(Div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.8;
  shadow-radius: 2px;
  elevation: 10;
`;

export const SplashContainer = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: white;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.8;
  shadow-radius: 2px;
  elevation: 10;
`;

export const LoadingText = styled(Text)`
  color: white;
  margin-top: 10px;
`;

export const ModalContainer = styled(Div)`
    height: 100%;
    width: 100%;
    ${commonViewStyles};
    background-color: rgba(0, 0, 0, 0.5);
`

export const ModalTextContainer = styled(Div)`
    height: 50%;
    width: 85%;
    justify-content: space-evenly;
    align-items: center;
    background-color: white;
    padding: ${({ theme }) => theme.spacing.medium}px
`

export const YellowBorderText = styled(Text)`
  border-bottom-width: 3px;
  border-bottom-color: ${({ theme }) => theme.colors.secondary}
`;

// LOGIN

export const MainLoginContainer = styled(Div)`
  padding: ${({ theme }) => theme.spacing.large}px;
  height: ${verticalScale(700)}px;
`;

export const LoginTitleContainer = styled(Div)`
  justify-content: space-around;
  height: ${verticalScale(100)};
  padding-bottom: 10px;
`;

export const LabelContainer = styled(Div)`
  align-self: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.xs}px;
`

export const LoginTittle = styled(Text)`
  ${commonTitleStyles};
  font-size: ${({ theme }) => theme.fontSize.xl}px;
`;

export const LoginInputContainer = styled(Div)`
  ${commonViewStyles};
  height: 65%;
`;

export const LoginTopContainer = styled(Div)`
  height: 40%;
  ${scrollable}
`;

export const LoginBottomContainer = styled(Div)`
  justify-content: space-between;
  height: 60%;
`

export const LoginInput = styled.TextInput`
  background-color: #333;
  color: #ffffff;
  padding: ${({ theme }) => theme.spacing.small}px;
  border-radius: ${({ theme }) => theme.borderRadius.medium}px;
  margin-bottom: ${({ theme }) => theme.spacing.small}px;
  width: 100%;
`;

export const PasswordInputContainer = styled(Div)`
  position: relative;
  ${flexRow};
  border-radius: ${({ theme }) => theme.borderRadius.medium}px;
  align-items: center;
`;

export const PasswordInput = styled(LoginInput)`
  flex: 1;
  padding-right: ${({ theme }) => theme.spacing.xl}px;
  background-color: #333;
`;

export const VisibilityToggle = styled.TouchableOpacity`
  position: absolute;
  right: ${({ theme }) => theme.spacing.small}px;
  padding: ${({ theme }) => theme.spacing.small}px;
  top: ${({ theme }) => theme.spacing.xs}px;
`;

export const LoginButton = styled.TouchableOpacity`
  background-color: #007bff;
  border-radius: ${({ theme }) => theme.borderRadius.medium}px;
  ${commonViewStyles};
  width: 100%;
  margin-top: ${({ theme }) => theme.spacing.medium}px;
  height: 20%;
`;

export const LoginButtonText = styled(Text)`
  color: #ffffff;
  font-size: ${({ theme }) => theme.fontSize.medium}px;
  font-weight: bold;
  font-family: Poppins-Bold
`;

export const ErrorInputMessageContainer = styled(Div)`
  height: ${verticalScale(12)}px;
`;

export const ErrorMessageText = styled(Text)`
  color: red;
  font-size: ${({ theme }) => theme.fontSize.small}px;
`;

// LOGIN

export const MainContainer = styled(Div)`
  ${commonViewStyles};
  padding-horizontal: ${scale(40)}px;
  padding-vertical: ${scale(20)}px;
  height: ${scale(700)}px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const CardContainer = styled(Div)`
  ${commonViewStyles};
  background-color: gray;
  border-radius: ${({ theme }) => theme.borderRadius}px;
  height: ${verticalScale(250)}px;
  width: ${scale(220)}px;
  padding: ${scale(20)}px;
`;

export const CardTittle = styled(Text)`
  ${commonTitleStyles};
  font-size: ${({ theme }) => theme.fontSizes.medium}px;
`;

export const InfoCard = styled(Div)`
  ${commonViewStyles};
  height: ${verticalScale(80)}px;
  width: 100%;
  ${inheritBackground};
  border-width: ${({ theme }) => theme.border.small}px;
  border-color: ${({ theme }) => theme.colors.cardBorder}px;
  padding: ${scale(5)}px;
  ${flexRow};
  justify-content: space-between;
`;

export const InfoCardTitle = styled(Text)`
  ${commonTitleStyles};
`;

export const InfoCardGrad = styled(Div)`
  ${commonViewStyles};
  ${inheritBackground};
  width: ${scale(20)}%;
  ${flexEnd};
  border-left-width: ${({ theme }) => theme.border.small}px;
  border-left-color: ${({ theme }) => theme.colors.cardBorder}px;
  height: ${verticalScale(90)}%;
`;

export const OptionsCard = styled(Div)`
  ${commonViewStyles};
  width: 100%;
  border-bottom-width: ${({ theme }) => theme.border.small}px;
  border-color: yellow;
  padding-bottom: ${verticalScale(15)}px;
`;

export const ScoreCard = styled(Div)`
  ${commonViewStyles};
  width: ${scale(40)}%;
  border-width: ${({ theme }) => theme.border.small}px;
  border-radius: ${({ theme }) => theme.bigBorderRadius}px;
  height: ${verticalScale(10)}%;
  border-color: ${({ theme }) => theme.colors.cardBorder}px;
  ${inheritBackground};
`;

export const BottomDivider = styled(Div)`
  ${commonViewStyles};
  border-bottom-width: ${({ theme }) => theme.border.small}px;
  border-color: ${({ theme }) => theme.colors.cardBorder}px;
  width: 100%;
  height: ${verticalScale(50)}%;
`;
export const MatchCardContainer = styled(Div)`
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  margin-vertical: 10px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
  width: 100%;
  align-self: center;
`;

export const MatchCardDetail = styled(Text)`
  font-size: ${({ theme }) => theme.fontSize.small}px;
  color: #555;
  margin-bottom: 5px;
`;
