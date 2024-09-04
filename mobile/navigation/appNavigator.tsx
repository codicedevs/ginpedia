import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import VersionModal from '../components/modal/versionModal'
import { useSession } from '../context/authProvider'
import SplashScreen from '../screens/splash'
import { AuthStackScreen, TabStackScreen, } from './stacks'

const AppNavigator = () => {
    const { currentUser } = useSession()

    return (
        <NavigationContainer>
            <VersionModal />
            <SplashScreen />
            {currentUser ? <TabStackScreen /> : <AuthStackScreen />}
        </NavigationContainer>
    )
}

export default AppNavigator