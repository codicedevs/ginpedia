
import { Div } from "react-native-magnus"
import { TitleText } from "../styled/styled"

export const MyHeader = () => {
    return (
        <Div flexDir='row' justifyContent='space-between' alignItems='center' py={'lg'} mb={'sm'} >
            <TitleText>Ginpedia</TitleText>
            <Div h={50} w={50} bg='black' rounded={'circle'}></Div>
        </Div>
    )
}