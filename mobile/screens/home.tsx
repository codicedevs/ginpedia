import React, { useState } from 'react'
import { Button, Text, View } from 'react-native'
import { FeaturedCard } from '../components/cards/featuredCard'
import ResponseModal from '../components/modal/responseModal'
import { AppScreenProps, AppScreens } from '../navigation/screens'

const HomeScreen: React.FC<AppScreenProps<AppScreens.HOME_SCREEN>> = ({ navigation }) => {
    const [open, setOpen] = useState(false)

    const toggleModal = () => {
        setOpen(!open)
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ResponseModal status={false} isVisible={open} setIsVisible={setOpen} />
            <Button onPress={toggleModal} title='Detalles' />
            <Text>Home!</Text>
            <FeaturedCard image='random' title='Bebida' rating='7.3' />
        </View>
    )
}

export default HomeScreen