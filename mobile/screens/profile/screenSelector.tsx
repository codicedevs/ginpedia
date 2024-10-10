import { useEffect, useRef } from "react"
import { ScrollView, TouchableOpacity } from "react-native"
import { scale } from "react-native-size-matters"
import { ProfileOption } from "../../types/user.type"
import { TitleGenerator } from "../../utils/text"

type SelectorProps = {
    option: ProfileOption,
    setOption: (option: ProfileOption) => void,
}

const ScreenSelector = ({ option, setOption }: SelectorProps) => {
    const scrollRef = useRef<ScrollView>(null);

    const scrollToOption = () => {
        let x = 0;
        switch (option) {
            case ProfileOption.PROFILE:
                x = 0;
                break;
            case ProfileOption.WISHLIST:
                x = scale(80);
                break;
            case ProfileOption.STORE:
                x = scale(180);
                break;
            case ProfileOption.PUNCTUATION:
                x = scale(280);
                break;
            default:
                x = 0;
        }
        scrollRef.current?.scrollTo({ x: x, animated: true });
    };

    useEffect(() => {
        scrollToOption();
    }, [option]);

    return (
        <>
            <ScrollView
                ref={scrollRef}
                showsHorizontalScrollIndicator={false}
                style={{ marginBottom: 20 }}
                contentContainerStyle={{ gap: scale(17), width: scale(580) }}
                horizontal>
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
            </ScrollView>
        </>
    )
}

export default ScreenSelector