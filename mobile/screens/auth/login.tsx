import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, TouchableOpacity } from "react-native";
import { Button, Div, Icon, Input, Text } from "react-native-magnus";
import { verticalScale } from "react-native-size-matters";
import * as yup from "yup";
import {
  BoldText,
  ErrorInputMessageContainer,
  ErrorMessageText,
  ItalicText,
  LabelContainer,
  LoginBottomContainer,
  LoginInputContainer,
  LoginTitleContainer,
  LoginTopContainer,
  MainLoginContainer,
  TitleText
} from "../../components/styled/styled";
import { AuthContext } from "../../context/authProvider";
import { useMutate } from "../../hooks/useMutate";
import { AppScreenProps, AppScreens } from "../../navigation/screens";
import authService from "../../service/auth.service";
import { UserInfo } from "../../types/user.type";
import { TitleGenerator } from "../../utils/text";
import { customTheme } from "../../utils/theme";

WebBrowser.maybeCompleteAuthSession();

const validationSchema = yup.object({
  email: yup.string().required("Requerido").email("Debe ser un email valido"),
  password: yup
    .string()
    .required("Requerido")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
});

const LoginScreen: React.FC<AppScreenProps<AppScreens.LOGIN_SCREEN>> = ({
  navigation,
}) => {
  const { setCurrentUser } = useContext(AuthContext);
  const [visibility, setVisibility] = useState(true);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState<string | undefined>()

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "398983702950-lmikmiht4g6u20d4nq91krl9p6r0923i.apps.googleusercontent.com"
  });

  useEffect(() => {
    if (response && response.type === "success") {
      setAccessToken(response.authentication?.accessToken)
      accessToken && fetchUserInfo()
      // (async () => {
      //   const userInfoResponse = await fetch(
      //     `https://graph.facebook.com/me?access_token=${response.authentication?.accessToken}&fields=id,name,picture.type(small)`
      //   );
      //   const userInfo = await userInfoResponse.json()
      // })();
    }
  }, [accessToken, response])

  async function fetchUserInfo() {
    let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const userInfo = await response.json();
    setUser(userInfo)
  }

  // const [request, response, promptAsync] = Facebook.useAuthRequest({
  //   clientId: "4049598648604910",
  // })

  // useEffect(() => {
  //   if (response && response.type === "success" && response.authentication) {
  //     (async () => {
  //       const userInfoResponse = await fetch(
  //         `https://graph.facebook.com/me?access_token=${response.authentication?.accessToken}&fields=id,name,picture.type(small)`
  //       );
  //       const userInfo = await userInfoResponse.json()
  //     })();
  //   }
  // }, [response])

  const handlePressAsync = async () => {
    const result = await promptAsync();
    if (result.type !== 'success') {
      console.log('error')
      return
    }
  }

  const toggleVisibility = () => {
    setVisibility(!visibility);
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserInfo>({ resolver: yupResolver(validationSchema) });

  const login = async (data: { email: string; password: string }) => {
    const res = await authService.login(data.email.toLowerCase(), data.password);
    // const res = await authService.login("admin@gmail.com", "12345678");
    if (res) {
      await AsyncStorage.setItem("refresh", res.refreshToken ?? "");
      await AsyncStorage.setItem("access", res.accessToken ?? "");
    }
    return res;
  };

  const loginQuery = useMutate(
    login,
    (res) => {
      setCurrentUser(res?.user);
    },
    (err) => {
      console.error(err);
    }
  );

  const onSubmit = async (data: UserInfo) => {
    console.log(data);
    try {
      await loginQuery(data);
    } catch (error) {
      console.error("Failed to login:", error);
    }
  };

  const whoAmI = async () => {
    const res = await authService.whoami();
    if (res) {
      setCurrentUser(res.data);
    }
  }

  const navigateToRegister = () => {
    navigation.navigate(AppScreens.REGISTER_SCREEN);
  };

  const navigateToCredentialsRecover = () => {
    navigation.navigate(AppScreens.RECOVER_CREDENTIALS_SCREEN);
  };

  useEffect(() => {
    whoAmI()
  }, [])

  return (
    <ScrollView>
      <MainLoginContainer>
        <LoginTopContainer>
          <LoginTitleContainer>
            <TitleText fontSize={"sm"}>Ginpedia</TitleText>
            <TitleGenerator title="Login" />
          </LoginTitleContainer>
          <LoginInputContainer>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <LabelContainer
                    alignSelf="flex-start"
                    mb={customTheme.spacing.xs}
                  >
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
                    onChangeText={(text) => {
                      const cleanedValue = text.replace(/\s/g, "");
                      onChange(cleanedValue);
                    }}
                    focusBorderColor="blue700"
                    value={value}
                  />
                  <ErrorInputMessageContainer>
                    {errors.email && (
                      <ErrorMessageText>
                        {errors.email.message as string}
                      </ErrorMessageText>
                    )}
                  </ErrorInputMessageContainer>
                </>
              )}
              name="email"
            />
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <LabelContainer
                    alignSelf="flex-start"
                    mb={customTheme.spacing.xs}
                  >
                    <Text color="secondary">Contraseña</Text>
                  </LabelContainer>
                  <Input
                    fontSize={"sm"}
                    placeholder="**********"
                    placeholderTextColor={"black"}
                    onChangeText={onChange}
                    value={value}
                    h={verticalScale(35)}
                    mb={"lg"}
                    secureTextEntry={visibility}
                    suffix={
                      <TouchableOpacity onPress={toggleVisibility}>
                        <Icon
                          name={visibility ? "eye" : "eye-off"}
                          color="gray900"
                          fontFamily="Feather"
                          fontSize={'xl'}
                        />
                      </TouchableOpacity>
                    }
                  />
                  <Div alignSelf="flex-start" mt={-5}>
                    <ItalicText
                      color="secondary"
                      fontSize={customTheme.fontSize.small}
                      onPress={navigateToCredentialsRecover}
                    >
                      Olvidaste tus credenciales?
                    </ItalicText>
                  </Div>
                  <ErrorInputMessageContainer mb={"xl"}>
                    {errors.password && (
                      <ErrorMessageText>
                        {errors.password?.message as string}
                      </ErrorMessageText>
                    )}
                  </ErrorInputMessageContainer>
                </>
              )}
              name="password"
            />
          </LoginInputContainer>
        </LoginTopContainer>
        <LoginBottomContainer>
          <Div flexDir="row">
            <Text fontSize={"sm"}>No tienes cuenta?</Text>
            <BoldText fontSize={"sm"} onPress={navigateToRegister}>
              {" "}
              Registrate
            </BoldText>
          </Div>
          <Button
            onPress={handlePressAsync}
          >
            anianiana
          </Button>
          {user && <Text>HOLA usuario</Text>}
          <Button
            onPress={handleSubmit(onSubmit)}
            bg="secondary"
            color="black"
            w={"100%"}
          >
            Login
          </Button>
        </LoginBottomContainer>
      </MainLoginContainer>
    </ScrollView>
  );
};

export default LoginScreen;
