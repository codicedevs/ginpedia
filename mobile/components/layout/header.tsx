import { Text } from "react-native"
import { Div } from "react-native-magnus"

export const MyHeader = () => {
    return (
        <Div flexDir='row' justifyContent='space-between' alignItems='center' py={'lg'} mb={'sm'} >
            <Text>Ginpedia</Text>
            <Div h={50} w={50} bg='black' rounded={'circle'}></Div>
        </Div>
    )
}