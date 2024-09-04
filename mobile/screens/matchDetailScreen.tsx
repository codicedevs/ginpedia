import React, { useState } from "react";
import { Div, Text, Button, Modal } from "react-native-magnus";
import userService from "../service/user.service";
import { useSession } from "../context/authProvider";
import petitionService from "../service/petition.service";
import { Alert, FlatList, TouchableOpacity } from "react-native";
import { customTheme } from "../utils/theme";

const MatchDetailScreen = ({ route }) => {
  const { match } = route.params; // Obtén el partido de los parámetros de la ruta
  const { currentUser } = useSession();
  const [modalVisible, setModalVisible] = useState(false);
  const [availablePlayers, setAvailablePlayers] = useState([]);

  const loadAvailablePlayers = async () => {
    const players = await userService.getAll();
    setAvailablePlayers(players);
  };

  const isPlayerInMatch = (player) => {
    return match.users.some((user) => user._id === player._id);
  };

  const renderPlayer = ({ item }) => (
    <Div
      bg="gray100"
      p="lg"
      mb="lg"
      rounded="md"
      borderWidth={1}
      borderColor="gray300"
    >
      <Text fontSize={customTheme.fontSize.medium} fontWeight="bold">
        {item.name}
      </Text>
      <Text fontSize={customTheme.fontSize.medium} color="gray600">
        {item.email}
      </Text>
    </Div>
  );

  const renderAvailablePlayer = ({ item }) => (
    <TouchableOpacity
      onPress={() => addPlayerToMatch(item)}
      style={{
        borderWidth: 1,
        borderColor: isPlayerInMatch(item) ? "green" : "gray300",
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Div flexDir="row" justifyContent="space-between" alignItems="center">
        <Div>
          <Text fontSize={customTheme.fontSize.medium} fontWeight="bold">
            {item.name}
          </Text>
          <Text fontSize="md" color="gray600">
            {item.email}
          </Text>
        </Div>
      </Div>
    </TouchableOpacity>
  );

  const addPlayerToMatch = async (receiver) => {
    try {
      await petitionService.create({
        emitter: currentUser._id,
        receiver: receiver._id,
        match: match._id,
      });
      Alert.alert("Solicitud enviada con éxito");
    } catch (error) {
      Alert.alert("Hubo un problema al enviar la solicitud");
    }
  };

  return (
    <Div flex={1} p="xl">
      <Text fontSize={customTheme.fontSize.large} fontWeight="bold" mb="xl">
        {match.name}
      </Text>
      <Text fontSize={customTheme.fontSize.medium} mb="lg">
        📅 Fecha: {match.date}
      </Text>
      <Text fontSize={customTheme.fontSize.medium} mb="lg">
        📍 Ubicación: {match.location}
      </Text>
      <Text fontSize={customTheme.fontSize.medium} mb="lg">
        👥 Límite de Jugadores: {match.playersLimit}
      </Text>

      <Button
        block
        mt="md"
        onPress={() => {
          loadAvailablePlayers();
          setModalVisible(true);
        }}
      >
        Agregar jugadores
      </Button>

      <Text fontSize={customTheme.fontSize.large} fontWeight="bold" mt="lg" mb="md">
        Jugadores confirmados: {match.users.length}{" "}
      </Text>
      {match.users.length > 0 ? (
        <FlatList
          data={match.users}
          renderItem={renderPlayer}
          keyExtractor={(item) => item.id}
          style={{ marginTop: 10 }}
        />
      ) : (
        <Text>No hay jugadores confirmados</Text>
      )}

      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <Div w="80%" bg="white" p="lg" rounded="lg" alignSelf="center">
          <Text fontSize="xl" fontWeight="bold" mb="lg">
            Agregar Jugadores
          </Text>
          <FlatList
            data={availablePlayers}
            renderItem={renderAvailablePlayer}
            keyExtractor={(item) => item.id}
          />
          <Button mt="lg" onPress={() => setModalVisible(false)}>
            Cerrar
          </Button>
        </Div>
      </Modal>
    </Div>
  );
};

export default MatchDetailScreen;
