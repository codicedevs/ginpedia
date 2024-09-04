import React from "react";
import { Div, Text, Image } from "react-native-magnus";
import { customTheme } from "../utils/theme";

interface HeaderProps {
  text: string;
}

const Header: React.FC<HeaderProps> = ({ text = "Furbo" }) => {
  return (
    <Div
      flexDir="row"
      alignItems="center"
      justifyContent="space-between"
      px="lg"
      py="md"
      bg="white"
      shadow="md"
      mb={10}
    >
      <Image
        source={require("../assets/ballIcon.png")} 
        h={40}
        w={40}
        resizeMode="contain"
      />
      <Text fontSize={customTheme.fontSize.large}>
        {text}
      </Text>
      <Div w={40} />
    </Div>
  );
};

export default Header;
