import { NavigationContainer } from '@react-navigation/native'
import { useFonts } from 'expo-font'
import React from 'react'
import VersionModal from '../components/modal/versionModal'
import { useSession } from '../context/authProvider'
import SplashScreen from '../screens/splash'
import { AuthStackScreen, Principal } from './stacks'

const AppNavigator = () => {
    const { currentUser } = useSession()
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
            <VersionModal />
            <SplashScreen />
            {currentUser ? <Principal /> : <AuthStackScreen />}
        </NavigationContainer>
    )
}

export default AppNavigator