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
import authService from '../../service/auth.service'
import { UserInfo } from '../../types/user.type'
import { TitleGenerator } from "../../utils/text"
import { customTheme } from "../../utils/theme"

const validationSchema = yup.object({
    email: yup.string().required("Requerido").email('Debe ser un email valido'),
    password: yup.string().required("Requerido").min(8, 'La contraseña debe tener al menos 8 caracteres'),
})

const LoginScreen = () => {
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
            await AsyncStorage.setItem('access', res.token ?? '');
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

    return (
        <ScrollView contentContainerStyle={{ flex: 1 }}>
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
                                        <Text color={customTheme.colors.secondary} fontSize={'xs'}>Email</Text>
                                    </LabelContainer>
                                    <Input
                                        fontSize={'sm'}
                                        mb={verticalScale(10)}
                                        placeholder="mail@mail.com"
                                        placeholderTextColor={"black"}
                                        h={verticalScale(35)}
                                        onChangeText={(text) => {
                                            const cleanedValue = text.replace(/\s/g, '');
                                            onChange(cleanedValue);
                                        }}
                                        focusBorderColor="blue700"
                                        value={value}
                                        style={{
                                            lineHeight: verticalScale(18), // Ajustamos el line-height para centrar el texto verticalmente
                                            textAlignVertical: 'center', // Alineamos el texto en el centro verticalmente
                                        }}
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
                                        <Text color={customTheme.colors.secondary}>Contraseña</Text>
                                    </LabelContainer>
                                    <Input
                                        fontSize={'sm'}
                                        placeholder="**********"
                                        placeholderTextColor={"black"}
                                        onChangeText={onChange}
                                        value={value}
                                        h={verticalScale(35)}
                                        mb={verticalScale(10)}
                                        secureTextEntry={visibility}
                                        suffix={
                                            <TouchableOpacity onPress={toggleVisibility}>
                                                <Icon name={visibility ? "eye" : 'eye-off'} color="gray900" fontFamily="Feather" />
                                            </TouchableOpacity>
                                        }
                                    />
                                    <Div alignSelf="flex-start" mt={-5}>
                                        <Text color={customTheme.colors.secondary} fontSize={customTheme.fontSize.small}>Olvidaste tus credenciales?</Text>
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
                <LoginBottomContainer h={'65%'} py={customTheme.spacing.small} justifyContent="space-between">
                    <Div flexDir="row">
                        <Text fontSize={'sm'}>No tienes cuenta?</Text>
                        <Text fontSize={'sm'} fontWeight="600"> Registrate</Text>
                    </Div>
                    <Button bg={customTheme.colors.secondary} color="black" w={'100%'}>Login</Button>
                </LoginBottomContainer>
            </MainLoginContainer>
        </ScrollView>
    )
}

export default LoginScreen