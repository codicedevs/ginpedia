import React from 'react';
import { Button, Text, View } from 'react-native';
import { FadeWrapper } from '../components/fadeView';
import { AppScreenProps, AppScreens } from '../navigation/screens';

function SettingsScreen({ navigation }: AppScreenProps<AppScreens.SETTINGS_SCREEN>) {

    return (
        <FadeWrapper>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Settings!</Text>
                <Button onPress={() => { navigation.navigate(AppScreens.TRIAL2_SCREEN) }} title='slide' />
            </View>
        </FadeWrapper>
    )
}

export default SettingsScreen