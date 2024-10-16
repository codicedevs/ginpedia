import { yupResolver } from "@hookform/resolvers/yup"
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, TouchableOpacity } from "react-native"
import { Button, Div, Icon, Input, Text } from "react-native-magnus"
import { verticalScale } from "react-native-size-matters"
import * as yup from "yup"
import { ConfirmationModal } from "../../components/modal/confirmationModal"
import { ErrorInputMessageContainer, ErrorMessageText, LabelContainer, LoginTitleContainer, MainLoginContainer, TitleText } from "../../components/styled/styled"
import { useGlobalUI } from "../../context/GlobalUIProvider"
import { useMutate } from '../../hooks/useMutate'
import { AppScreenProps, AppScreens } from "../../navigation/screens"
import userService from "../../service/user.service"
import { UserInfoRegister } from '../../types/user.type'
import { TitleGenerator } from "../../utils/text"

const validationSchema = yup.object({
    name: yup.string().required("Requerido").min(8, 'El nombre de usuario debe tener al menos 8 caracteres'),
    email: yup.string().required("Requerido").email('Debe ser un email válido'),
    password: yup.string().required("Requerido").min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

const RegisterScreen: React.FC<AppScreenProps<AppScreens.REGISTER_SCREEN>> = ({ navigation }) => {
    const [visibility, setVisibility] = useState(true)
    const [show, setShow] = useState(false)

    const toggleVisibility = () => {
        setVisibility(!visibility)
    }

    const confirm = () => {
        setShow(false)
        navigation.navigate(AppScreens.LOGIN_SCREEN)
    }

    const { showSnackBar } = useGlobalUI()

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<UserInfoRegister>({ resolver: yupResolver(validationSchema) })

    const register = async (data: { email: string, password: string, name: string }) => {
        return await userService.register(data.email.toLowerCase(), data.password, data.name);
    }

    const registerQuery = useMutate(register, (err) => { console.error(err) }, true)

    const onSubmit = async (data: UserInfoRegister) => {
        try {
            await registerQuery(data);
            setShow(true)
            showSnackBar("success", "Registrado con exito")
        } catch (error) {
            showSnackBar("error", "Ocurrio un error")
        }
    }

    return (
        <>
            <ConfirmationModal isVisible={show} onConfirm={confirm} title="Cuenta creada con éxito!" subTitle="Será redirigo al login" confirmText="ACEPTAR" />
            <ScrollView>
                <MainLoginContainer>
                    <Div flex={7}>
                        <LoginTitleContainer>
                            <TitleText fontSize={'sm'}>Ginpedia</TitleText>
                            <TitleGenerator title="Crear cuenta" />
                        </LoginTitleContainer>
                        <Div h={'auto'} alignItems="center" justifyContent="center">
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
                    </Div>
                    <Div flex={3} justifyContent="flex-end">
                        <Button bg='secondary' onPress={handleSubmit(onSubmit)} color="black" w={'100%'}>Crear cuenta</Button>
                    </Div>
                </MainLoginContainer>
            </ScrollView>
        </>
    )
}

export default RegisterScreen