import React from "react";
import { Div, Text } from "react-native-magnus";

interface SimpleMatchCardProps {
  name: string;
  date: string;
  location: string;
  playersLimit: number;
}

const SimpleMatchCard: React.FC<SimpleMatchCardProps> = ({
  name,
  date,
  location,
  playersLimit,
}) => {
  return (
    <Div
      p="lg"
      mb="md"
      rounded="xl"
      shadow="sm"
      bg="white"
      borderWidth={1}
      borderColor="gray200"
    >
      <Text
        fontSize="lg"
        fontWeight="bold"
        color="gray900"
        mb="sm"
        fontFamily="Poppins-Regular"
      >
        {name}
      </Text>
      <Text fontSize="md" color="gray700" mb="xs">
        📅 {date}
      </Text>
      <Text fontSize="md" color="gray700" mb="xs">
        📍 {location}
      </Text>
      <Text fontSize="md" color="gray700">
        👥 {playersLimit}
      </Text>
    </Div>
  );
};

export default SimpleMatchCard;
