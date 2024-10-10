import { TouchableOpacity } from "react-native"
import { ScrollDiv } from "react-native-magnus"
import { scale } from "react-native-size-matters"
import { ProfileOption } from "../../types/user.type"
import { TitleGenerator } from "../../utils/text"

type SelectorProps = {
    option: ProfileOption,
    setOption: (option: ProfileOption) => void,
}

const ScreenSelector = ({ option, setOption }: SelectorProps) => {
    return (
        <>
            <ScrollDiv showsHorizontalScrollIndicator={false} mb={'xl'} flexDir='row' contentContainerStyle={{ gap: scale(17) }} horizontal>
                <TouchableOpacity onPress={() => setOption(ProfileOption.PROFILE)}>
                    <TitleGenerator color={option === ProfileOption.PROFILE ? 'white' : 'grey'} borderColor={option === ProfileOption.PROFILE ? 'secondary' : 'grey'} title='Mi perfil' />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setOption(ProfileOption.WISHLIST)}>
                    <TitleGenerator color={option === ProfileOption.WISHLIST ? 'white' : 'grey'} borderColor={option === ProfileOption.WISHLIST ? 'secondary' : 'grey'} title='Mis deseos' />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setOption(ProfileOption.STORE)}>
                    <TitleGenerator color={option === ProfileOption.STORE ? 'white' : 'grey'} borderColor={option === ProfileOption.STORE ? 'secondary' : 'grey'} title='Mi bodega' />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setOption(ProfileOption.PUNCTUATION)}>
                    <TitleGenerator color={option === ProfileOption.PUNCTUATION ? 'white' : 'grey'} borderColor={option === ProfileOption.PUNCTUATION ? 'secondary' : 'grey'} title='Mi puntuacion' />
                </TouchableOpacity>
            </ScrollDiv>
        </>
    )
}

export default ScreenSelector