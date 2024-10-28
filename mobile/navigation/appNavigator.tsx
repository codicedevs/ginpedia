import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import React, { useState } from 'react'
import AnimatedIntro from '../components/animatedIntro'
import VersionModal from '../components/modal/versionModal'
import { useSession } from '../context/authProvider'
import { SearchProvider } from '../context/searchProvider'
import { AuthStackScreen, Principal } from './stacks'

const AppNavigator = () => {
    const { currentUser } = useSession()
    const [intro, setIntro] = useState(true)

    const [loaded, error] = useFonts({
        'DMSerifDisplay-Regular': require('../assets/fonts/DMSerifDisplay-Regular.ttf'),
        'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
        'Montserrat-MediumItalic': require('../assets/fonts/Montserrat-MediumItalic.ttf'),
        'Montserrat-Regular': require('../assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Light': require('../assets/fonts/Montserrat-Light.ttf')
    });

    if (!loaded) {
        return null;
    }

    return (
        <NavigationContainer>
            <SearchProvider>
                <VersionModal />
                {currentUser ? <Principal /> : <AuthStackScreen />}
                {
                    intro &&
                    <AnimatedIntro setIntro={setIntro} />
                }
            </SearchProvider>
        </NavigationContainer>
    )
}

export default AppNavigator