import { yupResolver } from "@hookform/resolvers/yup"
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { ScrollView } from "react-native"
import { Button, Div, Input, Text } from "react-native-magnus"
import { verticalScale } from "react-native-size-matters"
import * as yup from "yup"
import { ErrorInputMessageContainer, ErrorMessageText, LabelContainer, LoginTitleContainer, MainLoginContainer, TitleText } from "../../components/styled/styled"
import { useGlobalUI } from "../../context/GlobalUIProvider"
import { useMutate } from "../../hooks/useMutate"
import { AppScreenProps, AppScreens } from "../../navigation/screens"
import authService from "../../service/auth.service"
import { UserInfoRecover } from '../../types/user.type'
import { TitleGenerator } from "../../utils/text"

const validationSchema = yup.object({
    email: yup.string().required("Requerido").email('Debe ser un email válido'),
});

const RecoverCredentialsScreen: React.FC<AppScreenProps<AppScreens.RECOVER_CREDENTIALS_SCREEN>> = ({ navigation }) => {

    const { showSnackBar } = useGlobalUI()
    const onSubmit = async (data: { email: string }) => {
        try {
            await recoverQuery(data.email)
            showSnackBar("success", "Email enviado correctamente")
            navigation.navigate(AppScreens.LOGIN_SCREEN)
        } catch (e) {
            showSnackBar("error", "Ocurrio un error")
        }
    }

    const recoverPassword = async (email: string) => {
        return await authService.recoverPassword(email)
    }

    const recoverQuery = useMutate(recoverPassword, (err) => { console.error(err) }, true)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<UserInfoRecover>({ resolver: yupResolver(validationSchema) })

    return (
        <>
            <ScrollView>
                <MainLoginContainer>
                    <Div flex={7}>
                        <LoginTitleContainer>
                            <TitleText fontSize={'sm'}>Ginpedia</TitleText>
                            <TitleGenerator title="Recuperar credenciales" />
                        </LoginTitleContainer>
                        <Text fontSize={'xs'} mb={verticalScale(20)}>Ingrese su email para recuperar sus credenciales</Text>
                        <Div h={'auto'} alignItems="center" justifyContent="center">
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
                    </Div>
                    <Div flex={3} justifyContent="flex-end">
                        <Button bg='secondary' color="black" onPress={handleSubmit(onSubmit)} w={'100%'}>Enviar</Button>
                    </Div>
                </MainLoginContainer>
            </ScrollView>
        </>
    )
}

export default RecoverCredentialsScreen