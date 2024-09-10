import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Div, Icon, ScrollDiv, Text } from 'react-native-magnus'
import { SafeAreaView } from 'react-native-safe-area-context'
import { verticalScale } from 'react-native-size-matters'
import { FeaturedCard } from '../components/cards/featuredCard'
import { ListCard } from '../components/cards/listCard'
import { AppScreenProps, AppScreens } from '../navigation/screens'
import { TitleGenerator } from '../utils/text'

const HomeScreen: React.FC<AppScreenProps<AppScreens.HOME_SCREEN>> = ({ navigation }) => {

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style='auto' />
            <Div flex={1} px={'xl'}>
                <Div flexDir='row' justifyContent='space-between' alignItems='center' py={'lg'} mb={'sm'} >
                    <Text>Ginpedia</Text>
                    <Div h={50} w={50} bg='black' rounded={'circle'}></Div>
                </Div>
                <ScrollDiv showsVerticalScrollIndicator={false} flex={1}>
                    <Div mb={'xl'}>
                        <TitleGenerator title="Destacados" />
                    </Div>
                    <ScrollDiv flexDir='row' horizontal showsHorizontalScrollIndicator={false} mb={'xl'}>
                        <FeaturedCard image='random' title='Bebida' rating='7.3' />
                        <FeaturedCard image='random' title='Bebida' rating='7.3' />
                        <FeaturedCard image='random' title='Bebida' rating='7.3' />
                    </ScrollDiv>
                    <Div mb={'xl'}>
                        <TitleGenerator title="Añadidos recientemente" />
                    </Div>
                    <ListCard image='random' title='Bebida' rating='7.3' />
                    <ListCard image='random' title='Bebida' rating='7.3' />
                    <ListCard image='random' title='Bebida' rating='7.3' />
                    <Div flexDir='row' mx={'md'} h={verticalScale(100)} py={'xl'} alignItems='flex-start'>
                        <Text color='secondary'>Ver todos</Text>
                        <Icon mx={10} color='secondary' fontSize={'xl'} name='arrowright' />
                    </Div>
                </ScrollDiv>
            </Div>
        </SafeAreaView>
    )
}

export default HomeScreen