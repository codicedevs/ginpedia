import { useEffect, useRef } from "react"
import { ScrollView, TouchableOpacity } from "react-native"
import { scale, verticalScale } from "react-native-size-matters"
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
                x = scale(70);
                break;
            case ProfileOption.STORE:
                x = scale(165);
                break;
            case ProfileOption.PUNCTUATION:
                x = scale(275);
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
                style={{ marginTop: verticalScale(30) }}
                contentContainerStyle={{ gap: scale(17), width: scale(550)}}
                horizontal>
                <TouchableOpacity onPress={() => setOption(ProfileOption.PROFILE)}>
                    <TitleGenerator color={option === ProfileOption.PROFILE ? 'black' : 'grey'} borderColor={option === ProfileOption.PROFILE ? 'secondary' : 'grey'} title='Mi perfil' />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setOption(ProfileOption.WISHLIST)}>
                    <TitleGenerator color={option === ProfileOption.WISHLIST ? 'black' : 'grey'} borderColor={option === ProfileOption.WISHLIST ? 'secondary' : 'grey'} title='Mis deseos' />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setOption(ProfileOption.STORE)}>
                    <TitleGenerator color={option === ProfileOption.STORE ? 'black' : 'grey'} borderColor={option === ProfileOption.STORE ? 'secondary' : 'grey'} title='Mi bodega' />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setOption(ProfileOption.PUNCTUATION)}>
                    <TitleGenerator color={option === ProfileOption.PUNCTUATION ? 'black' : 'grey'} borderColor={option === ProfileOption.PUNCTUATION ? 'secondary' : 'grey'} title='Mi puntuacion' />
                </TouchableOpacity>
            </ScrollView>
        </>
    )
}

export default ScreenSelector