import { yupResolver } from "@hookform/resolvers/yup"
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as ImagePicker from 'expo-image-picker'
import React, { useContext, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView, TouchableOpacity } from "react-native"
import { Button, Div, Icon, Input, Text } from "react-native-magnus"
import { verticalScale } from "react-native-size-matters"
import * as yup from "yup"
import { ConfirmationModal } from "../../components/modal/confirmationModal"
import { ErrorInputMessageContainer, ErrorMessageText, LabelContainer, LoginTitleContainer, MainLoginContainer } from "../../components/styled/styled"
import { AuthContext } from '../../context/authProvider'
import { useMutate } from '../../hooks/useMutate'
import authService from '../../service/auth.service'
import { UserInfoRegister } from '../../types/user.type'
import { TitleGenerator } from "../../utils/text"
import { customTheme } from "../../utils/theme"

const validationSchema = yup.object({
    username: yup.string().required("Requerido").min(8, 'El nombre de usuario debe tener al menos 8 caracteres'),
    email: yup.string().required("Requerido").email('Debe ser un email válido'),
    password: yup.string().required("Requerido").min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

const RegisterScreen = () => {
    const { setCurrentUser } = useContext(AuthContext)
    const [visibility, setVisibility] = useState(true)
    const [show, setShow] = useState(false)

    const toggleVisibility = () => {
        setVisibility(!visibility)
    }

    const confirm = () => {
        setShow(false)
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            console.log('error')
            //   setImage(result.assets[0].uri);
        }
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<UserInfoRegister>({ resolver: yupResolver(validationSchema) })

    const login = async (data: { email: string, password: string }) => {
        const res = await authService.login(data.email, data.password);
        if (res) {
            await AsyncStorage.setItem('refresh', res.refreshToken ?? '');
            await AsyncStorage.setItem('access', res.token ?? '');
        }
        return res;
    }

    const loginQuery = useMutate(login, (res) => { setCurrentUser(res?.user) }, (err) => { console.error(err) })

    const onSubmit = async (data: UserInfoRegister) => {
        console.log(data)
        try {
            await loginQuery(data);
        } catch (error) {
            console.error('Failed to login:', error);
        }
    }

    return (
        <>
            <ConfirmationModal isVisible={show} onConfirm={confirm} title="Cuenta creada con éxito!" subTitle="Será redirigo al login" confirmText="ACEPTAR" />
            <ScrollView contentContainerStyle={{ flex: 1 }}>
                <MainLoginContainer>
                    <Div h={'70%'} style={{ oveflow: 'scroll' }}>
                        <LoginTitleContainer>
                            <Text fontSize={'sm'}>Ginpedia</Text>
                            <TitleGenerator title="Crear cuenta" />
                        </LoginTitleContainer>
                        <Div h={'auto'} alignItems="center" justifyContent="center">
                            <Controller
                                control={control}
                                render={({ field: { onChange, value } }) => (
                                    <>
                                        <LabelContainer alignSelf="flex-start" mb={customTheme.spacing.xs}>
                                            <Text color={customTheme.colors.secondary} fontSize={'xs'}>Nombre de usuario</Text>
                                        </LabelContainer>
                                        <Input
                                            fontSize={'sm'}
                                            mb={verticalScale(10)}
                                            placeholder="Nombre de usuario"
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
                                            {errors.username && <ErrorMessageText>{errors.username.message as string}</ErrorMessageText>}
                                        </ErrorInputMessageContainer>
                                    </>
                                )}
                                name="username"
                            />
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
                                        <ErrorInputMessageContainer>
                                            {errors.password && <ErrorMessageText>{errors.password?.message as string}</ErrorMessageText>}
                                        </ErrorInputMessageContainer>
                                    </>
                                )}
                                name="password"
                            />
                            <LabelContainer alignSelf="flex-start" mb={customTheme.spacing.xs}>
                                <Text color={customTheme.colors.secondary}>Foto de perfil</Text>
                            </LabelContainer>
                            <Input
                                fontSize={'sm'}
                                placeholder="JPG, PNG - Max. 2MB"
                                placeholderTextColor={"black"}
                                h={verticalScale(35)}
                                mb={verticalScale(10)}
                                secureTextEntry={visibility}
                                suffix={
                                    <TouchableOpacity onPress={pickImage}>
                                        <Icon name={"plus"} color="gray900" fontFamily="Feather" />
                                    </TouchableOpacity>
                                }
                            />
                        </Div>
                    </Div>
                    <Div h={'30%'} justifyContent="flex-end">
                        <Button bg={customTheme.colors.secondary} onPress={() => setShow(true)} color="black" w={'100%'}>CREAR CUENTA</Button>
                    </Div>
                </MainLoginContainer>
            </ScrollView>
        </>
    )
}

export default RegisterScreen