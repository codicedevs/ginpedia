import { useContext, useState } from "react";
import { Alert, TouchableOpacity } from "react-native";
import { Button, Div, Icon, Input, Text } from "react-native-magnus";
import { verticalScale } from "react-native-size-matters";
import { LabelContainer } from "../../components/styled/styled";
import { customTheme } from "../../utils/theme";
import { Link } from "@react-navigation/native";
import authService from "../../service/auth.service";
import { AuthContext } from "../../context/authProvider";
import userService from "../../service/user.service";

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
  return (
    <Div h={"100%"} justifyContent="space-between">
      <Div>
        <LabelContainer alignSelf="flex-start" mb={customTheme.spacing.xs}>
          <Text color="secondary" fontSize={"xs"}>
            Email
          </Text>
        </LabelContainer>
        <Input
          fontSize={"sm"}
          mb={"lg"}
          placeholder="mail@mail.com"
          placeholderTextColor={"black"}
          h={verticalScale(35)}
          focusBorderColor="blue700"
          value={"n@n.com"}
        />
        <LabelContainer alignSelf="flex-start" mb={customTheme.spacing.xs}>
          <Text color="secondary" fontSize={"xs"}>
            Email
          </Text>
        </LabelContainer>
        <Input
          fontSize={"sm"}
          mb={"lg"}
          placeholder="mail@mail.com"
          placeholderTextColor={"black"}
          h={verticalScale(35)}
          focusBorderColor="blue700"
          value={"n@n.com"}
        />
        <LabelContainer alignSelf="flex-start" mb={customTheme.spacing.xs}>
          <Text color="secondary" fontSize={"xs"}>
            Contraseña
          </Text>
        </LabelContainer>
        <Input
          fontSize={"sm"}
          placeholder="**********"
          placeholderTextColor={"black"}
          value={"123"}
          h={verticalScale(35)}
          mb={"lg"}
          secureTextEntry={visibility}
          suffix={
            <TouchableOpacity onPress={toggleVisibility}>
              <Icon
                name={visibility ? "eye" : "eye-off"}
                color="gray900"
                fontFamily="Feather"
              />
            </TouchableOpacity>
          }
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
