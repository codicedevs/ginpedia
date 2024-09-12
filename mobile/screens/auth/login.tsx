import { yupResolver } from "@hookform/resolvers/yup"
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useContext, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, TouchableOpacity } from "react-native"
import { Button, Div, Icon, Input, Text } from "react-native-magnus"
import { verticalScale } from "react-native-size-matters"
import * as yup from "yup"
import { ErrorInputMessageContainer, ErrorMessageText, LabelContainer, LoginBottomContainer, LoginInputContainer, LoginTitleContainer, LoginTopContainer, MainLoginContainer } from "../../components/styled/styled"
import { AuthContext } from '../../context/authProvider'
import { useMutate } from '../../hooks/useMutate'
import { AppScreenProps, AppScreens } from "../../navigation/screens"
import authService from '../../service/auth.service'
import { UserInfo } from '../../types/user.type'
import { TitleGenerator } from "../../utils/text"
import { customTheme } from "../../utils/theme"

const validationSchema = yup.object({
    email: yup.string().required("Requerido").email('Debe ser un email valido'),
    password: yup.string().required("Requerido").min(8, 'La contraseña debe tener al menos 8 caracteres'),
})

const LoginScreen: React.FC<AppScreenProps<AppScreens.LOGIN_SCREEN>> = ({ navigation }) => {
    const { setCurrentUser } = useContext(AuthContext)
    const [visibility, setVisibility] = useState(true)

    const toggleVisibility = () => {
        setVisibility(!visibility)
    }

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<UserInfo>({ resolver: yupResolver(validationSchema) })

    const login = async (data: { email: string, password: string }) => {
        const res = await authService.login(data.email, data.password);
        if (res) {
            await AsyncStorage.setItem('refresh', res.refreshToken ?? '');
            await AsyncStorage.setItem('access', res.accessToken ?? '');
        }
        return res;
    }

    const loginQuery = useMutate(login, (res) => { setCurrentUser(res?.user) }, (err) => { console.error(err) })

    const onSubmit = async (data: UserInfo) => {
        console.log(data)
        try {
            await loginQuery(data);
        } catch (error) {
            console.error('Failed to login:', error);
        }
    }

    const navigateToRegister = () => {
        navigation.navigate(AppScreens.REGISTER_SCREEN)
    }

    const navigateToCredentialsRecover = () => {
        navigation.navigate(AppScreens.RECOVER_CREDENTIALS_SCREEN)
    }

    return (
        <ScrollView>
            <MainLoginContainer>
                <LoginTopContainer>
                    <LoginTitleContainer>
                        <Text fontSize={'sm'}>Ginpedia</Text>
                        <TitleGenerator title="Login" />
                    </LoginTitleContainer>
                    <LoginInputContainer>
                        <Controller
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <LabelContainer alignSelf="flex-start" mb={customTheme.spacing.xs}>
                                        <Text color='secondary' fontSize={'xs'}>Email</Text>
                                    </LabelContainer>
                                    <Input
                                        fontSize={'sm'}
                                        mb={'lg'}
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
                                    <LabelContainer alignSelf="flex-start" mb={customTheme.spacing.xs}>
                                        <Text color='secondary'>Contraseña</Text>
                                    </LabelContainer>
                                    <Input
                                        fontSize={'sm'}
                                        placeholder="**********"
                                        placeholderTextColor={"black"}
                                        onChangeText={onChange}
                                        value={value}
                                        h={verticalScale(35)}
                                        mb={'lg'}
                                        secureTextEntry={visibility}
                                        suffix={
                                            <TouchableOpacity onPress={toggleVisibility}>
                                                <Icon name={visibility ? "eye" : 'eye-off'} color="gray900" fontFamily="Feather" />
                                            </TouchableOpacity>
                                        }
                                    />
                                    <Div alignSelf="flex-start" mt={-5}>
                                        <Text color='secondary' fontSize={customTheme.fontSize.small} onPress={navigateToCredentialsRecover}>Olvidaste tus credenciales?</Text>
                                    </Div>
                                    <ErrorInputMessageContainer>
                                        {errors.password && <ErrorMessageText>{errors.password?.message as string}</ErrorMessageText>}
                                    </ErrorInputMessageContainer>
                                </>
                            )}
                            name="password"
                        />
                    </LoginInputContainer>
                </LoginTopContainer>
                <LoginBottomContainer pb={'xl'}>
                    <Div flexDir="row">
                        <Text fontSize={'sm'} fontWeight="300">No tienes cuenta?</Text>
                        <Text fontSize={'sm'} fontWeight="600" onPress={navigateToRegister}> Registrate</Text>
                    </Div>
                    <Button onPress={handleSubmit(onSubmit)} bg='secondary' color="black" w={'100%'}>Login</Button>
                </LoginBottomContainer>
            </MainLoginContainer>
        </ScrollView>
    )
}

export default LoginScreen