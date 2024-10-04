import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Div, Input, Text } from "react-native-magnus";
import { verticalScale } from "react-native-size-matters";
import * as yup from "yup";
import { ErrorInputMessageContainer, ErrorMessageText, LabelContainer } from "../../components/styled/styled";
import { AuthContext } from "../../context/authProvider";
import { useGlobalUI } from "../../context/GlobalUIProvider";
import { useMutate } from "../../hooks/useMutate";
import authService from "../../service/auth.service";
import userService from "../../service/user.service";
import { UpdateUserInfo } from "../../types/user.type";

const validationSchema = yup.object({
  name: yup.string().required("Requerido").min(8, 'El nombre de usuario debe tener al menos 8 caracteres'),
  email: yup.string().required("Requerido").email('Debe ser un email válido'),
});

interface userInfo {
  email: string,
  name: string
}

const ProfileInfo = () => {

  const { setCurrentUser, currentUser } = useContext(AuthContext);
  const { showSnackBar } = useGlobalUI()

  async function handleLogout() {
    await authService.signOut();
    setCurrentUser(null);
  }

  async function handleDelete() {
    if (!currentUser) return
    await userService.deleteUser(currentUser.id);
    setCurrentUser(null);
  }

  async function handleUpdate(data: UpdateUserInfo) {
    if (!currentUser) return
    await userService.updateUser({ id: currentUser.id, email: data.email && data.email, name: data.name && data.name })
  }

  const updateQuery = useMutate(handleUpdate, () => showSnackBar('success', 'Guardado con exito'), false, () => showSnackBar('error', 'Hubo un problema'))

  const onSubmit = async (data: UpdateUserInfo) => {
    await updateQuery(data)
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<userInfo>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: currentUser?.name || '',
      email: currentUser?.email || ''
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
      </Div>
      <Div>
        <Button bg="secondary" color="black" w={"100%"} onPress={handleSubmit(onSubmit)}>
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
