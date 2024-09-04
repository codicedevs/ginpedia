import React from "react";
import { Button, FlatList, Text, TouchableOpacity, View } from "react-native";
import { AppScreenProps, AppScreens } from "../navigation/screens";
import matchService from "../service/match.service";
import SimpleMatchCard from "../components/styled/matchCard";
import { FadeWrapper } from "../components/fadeView";
import useFetch from "../hooks/useGet";
import { QUERY_KEYS } from "../types/query.types";
import Match from "../types/match.type";
import Header from "../components/header";

const HomeScreen: React.FC<AppScreenProps<AppScreens.HOME_SCREEN>> = ({
  navigation,
}) => {
  const { data: matches, error } = useFetch<Match>(
    matchService.getAll,
    QUERY_KEYS.MATCHES,
    { meta: { triggerGlobalLoader: false } }
  );
  const renderItem = ({ item }: { item: Match }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(AppScreens.CREATE_MATCH, {
          screen: AppScreens.MATCH_DETAIL_SCREEN,
          params: { match: item },
        })
      }
    >
      <SimpleMatchCard
        name={item.name}
        date={item.date}
        location={item.location}
        playersLimit={item.playersLimit}
      />
    </TouchableOpacity>
  );

  return (
    <FadeWrapper>
      <Header text="Furbo" />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {error && <Text>Error fetching matches: {error.message}</Text>}

        {matches && (
          <FlatList
            data={matches}
            renderItem={renderItem}
            keyExtractor={(item) => item._id} // Asumiendo que el backend devuelve un campo _id para cada partido
          />
        )}
      </View>
    </FadeWrapper>
  );
};

export default HomeScreen;
