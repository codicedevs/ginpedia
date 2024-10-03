import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { Button, Div, Icon, Input, Text } from "react-native-magnus";
import { verticalScale } from "react-native-size-matters";
import * as yup from "yup";
import { ErrorInputMessageContainer, ErrorMessageText, LabelContainer } from "../../components/styled/styled";
import { AuthContext } from "../../context/authProvider";
import authService from "../../service/auth.service";
import userService from "../../service/user.service";
import { UserInfoRegister } from "../../types/user.type";

const validationSchema = yup.object({
  name: yup.string().required("Requerido").min(8, 'El nombre de usuario debe tener al menos 8 caracteres'),
  email: yup.string().required("Requerido").email('Debe ser un email válido'),
  password: yup.string().required("Requerido").min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

const ProfileInfo = () => {
  const [visibility, setVisibility] = useState(true);

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  const { setCurrentUser, currentUser } = useContext(AuthContext);

  async function handleLogout() {
    await authService.signOut();
    setCurrentUser(null);
  }
  async function handleDelete() {
    await userService.deleteUser(currentUser.id);
    setCurrentUser(null);
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInfoRegister>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      password: ''
    }
  })

  return (
    <Div h={"100%"} justifyContent="space-between">
      <Div>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <LabelContainer alignSelf="flex-start" mb='xs'>
                <Text color='secondary' fontSize={'xs'}>Nombre de usuario</Text>
              </LabelContainer>
              <Input
                fontSize={'sm'}
                mb='lg'
                placeholder="Nombre de usuario"
                placeholderTextColor={"black"}
                h={verticalScale(35)}
                onChangeText={(text) => {
                  const cleanedValue = text.replace(/\s/g, '');
                  onChange(cleanedValue);
                }}
                focusBorderColor="blue700"
                value={value}
              />
              <ErrorInputMessageContainer>
                {errors.name && <ErrorMessageText>{errors.name.message as string}</ErrorMessageText>}
              </ErrorInputMessageContainer>
            </>
          )}
          name="name"
        />
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <LabelContainer alignSelf="flex-start" mb='xs'>
                <Text color='secondary' fontSize={'xs'}>Email</Text>
              </LabelContainer>
              <Input
                fontSize={'sm'}
                mb='lg'
                placeholder="mail@mail.com"
                placeholderTextColor={"black"}
                h={verticalScale(35)}
                onChangeText={(text) => {
                  const cleanedValue = text.replace(/\s/g, '');
                  onChange(cleanedValue);
                }}
                focusBorderColor="blue700"
                value={value}
              />
              <ErrorInputMessageContainer>
                {errors.email && <ErrorMessageText>{errors.email.message as string}</ErrorMessageText>}
              </ErrorInputMessageContainer>
            </>
          )}
          name="email"
        />
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <>
              <LabelContainer alignSelf="flex-start" mb='xs'>
                <Text color='secondary'>Contraseña</Text>
              </LabelContainer>
              <Input
                fontSize={'sm'}
                placeholder="**********"
                placeholderTextColor={"black"}
                onChangeText={onChange}
                value={value}
                h={verticalScale(35)}
                mb='lg'
                secureTextEntry={visibility}
                suffix={
                  <TouchableOpacity onPress={toggleVisibility}>
                    <Icon name={visibility ? "eye" : 'eye-off'} color="gray900" fontFamily="Feather" />
                  </TouchableOpacity>
                }
              />
              <ErrorInputMessageContainer>
                {errors.password && <ErrorMessageText>{errors.password?.message as string}</ErrorMessageText>}
              </ErrorInputMessageContainer>
            </>
          )}
          name="password"
        />
      </Div>
      <Div>
        <Button bg="secondary" color="black" w={"100%"}>
          GUARDAR
        </Button>
        <Div my={"xl"} flexDir="row" justifyContent="space-between">
          <Text onPress={handleLogout}>Cerrar sesion</Text>

          <Text onPress={handleDelete}>Eliminar cuenta</Text>
        </Div>
      </Div>
    </Div>
  );
};

export default ProfileInfo;
