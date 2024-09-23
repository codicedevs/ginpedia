import { useState } from "react"
import { TouchableOpacity } from "react-native"
import { Button, Div, Icon, Input, Text } from "react-native-magnus"
import { verticalScale } from "react-native-size-matters"
import { LabelContainer } from "../../components/styled/styled"
import { customTheme } from "../../utils/theme"

const ProfileInfo = () => {
    const [visibility, setVisibility] = useState(true)

    const toggleVisibility = () => {
        setVisibility(!visibility)
    }
    return (
        <Div h={'100%'} justifyContent="space-between">
            <Div>

                <LabelContainer alignSelf="flex-start" mb={customTheme.spacing.xs}>
                    <Text color='secondary' fontSize={'xs'}>Email</Text>
                </LabelContainer>
                <Input
                    fontSize={'sm'}
                    mb={'lg'}
                    placeholder="mail@mail.com"
                    placeholderTextColor={"black"}
                    h={verticalScale(35)}
                    // onChangeText={(text) => {
                    //     const cleanedValue = text.replace(/\s/g, '');
                    //     onChange(cleanedValue);
                    // }}
                    focusBorderColor="blue700"
                    value={'n@n.com'}
                />
                <LabelContainer alignSelf="flex-start" mb={customTheme.spacing.xs}>
                    <Text color='secondary' fontSize={'xs'}>Email</Text>
                </LabelContainer>
                <Input
                    fontSize={'sm'}
                    mb={'lg'}
                    placeholder="mail@mail.com"
                    placeholderTextColor={"black"}
                    h={verticalScale(35)}
                    // onChangeText={(text) => {
                    //     const cleanedValue = text.replace(/\s/g, '');
                    //     onChange(cleanedValue);
                    // }}
                    focusBorderColor="blue700"
                    value={'n@n.com'}
                />
                <LabelContainer alignSelf="flex-start" mb={customTheme.spacing.xs}>
                    <Text color='secondary' fontSize={'xs'}>Contraseña</Text>
                </LabelContainer>
                <Input
                    fontSize={'sm'}
                    placeholder="**********"
                    placeholderTextColor={"black"}
                    value={'123'}
                    h={verticalScale(35)}
                    mb={'lg'}
                    secureTextEntry={visibility}
                    suffix={
                        <TouchableOpacity onPress={toggleVisibility}>
                            <Icon name={visibility ? "eye" : 'eye-off'} color="gray900" fontFamily="Feather" />
                        </TouchableOpacity>
                    }
                />
            </Div>
            <Div>
                <Button bg="secondary" color="black" w={'100%'}>GUARDAR</Button>
                <Div my={'xl'} flexDir="row" justifyContent="space-between">
                    <Text>Cerrar sesion</Text>
                    <Text>Eliminar cuenta</Text>
                </Div>
            </Div>
        </Div>
    )
}

export default ProfileInfo