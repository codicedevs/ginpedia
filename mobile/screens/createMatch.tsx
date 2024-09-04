import React from "react";
import { Div, Input, Button, Text } from "react-native-magnus";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSession } from "../context/authProvider";
import matchService from "../service/match.service";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "react-native";
import { customTheme } from "../utils/theme";

// Esquema de validación con Yup
const schema = yup.object().shape({
  name: yup.string().required("El nombre es obligatorio"),
  date: yup
    .string()
    .required("La fecha es obligatoria")
    .matches(
      /^\d{4}-\d{2}-\d{2}$/,
      "La fecha debe estar en el formato YYYY-MM-DD"
    ),
  location: yup.string().required("La ubicación es obligatoria"),
  playersLimit: yup
    .number()
    .required("El límite de jugadores es obligatorio")
    .positive("Debe ser un número positivo")
    .integer("Debe ser un número entero"),
});

const CreateMatchForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { currentUser } = useSession(); // Obtener el usuario autenticado

  async function createMatch(data) {
    const matchData = { ...data, userId: currentUser?._id }; // Asegurarse de que el userId sea parte de los datos enviados
    const response = await matchService.createMatch(matchData);
  }

  const { mutateAsync } = useMutation({
    mutationFn: createMatch,
    onSuccess: () => {
      Alert.alert("El partido ha sido creado exitosamente");
    },
    onError: (error) => {
      Alert.alert("Error", "Hubo un problema al crear el partido");
      console.error(error);
    },
  });

  const onSubmit = async (data) => {
    await mutateAsync(data);
  };

  return (
    <Div p={customTheme.spacing.large} mt={customTheme.spacing.large}>
      <Text fontSize={customTheme.fontSize.medium} mb="md">
        Nombre del Partido
      </Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            mb="md"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Nombre del partido"
            borderColor={errors.name ? "red" : "gray400"}
          />
        )}
      />
      {errors.name && (
        <Text color="red500" mb="sm">
          {errors.name.message}
        </Text>
      )}

      <Text fontSize={customTheme.fontSize.medium} mb="md">
        Fecha
      </Text>
      <Controller
        control={control}
        name="date"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            mb="md"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Fecha (e.g., 2024-08-27)"
            borderColor={errors.date ? "red" : "gray400"}
          />
        )}
      />
      {errors.date && (
        <Text color="red500" mb="sm">
          {errors.date.message}
        </Text>
      )}

      <Text fontSize={customTheme.fontSize.medium} mb="md">
        Ubicación
      </Text>
      <Controller
        control={control}
        name="location"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            mb="md"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Ubicación"
            borderColor={errors.location ? "red" : "gray400"}
          />
        )}
      />
      {errors.location && (
        <Text color="red500" mb="sm">
          {errors.location.message}
        </Text>
      )}

      <Text fontSize={customTheme.fontSize.medium} mb="md">
        Límite de Jugadores
      </Text>
      <Controller
        control={control}
        name="playersLimit"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            mb="md"
            onBlur={onBlur}
            onChangeText={(text) => onChange(text ? parseInt(text, 10) : "")}
            value={value?.toString()} // Convertir el valor a string
            placeholder="Límite de jugadores"
            keyboardType="numeric"
            borderColor={errors.playersLimit ? "red" : "gray400"}
          />
        )}
      />
      {errors.playersLimit && (
        <Text color="red500" mb="sm">
          {errors.playersLimit.message}
        </Text>
      )}

      <Button block mt="lg" onPress={handleSubmit(onSubmit)}>
        Crear Partido
      </Button>
    </Div>
  );
};

export default CreateMatchForm;
