import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Button, Div, Input, Overlay } from 'react-native-magnus';
import { scale, verticalScale } from 'react-native-size-matters';
import { AppScreens, AppScreensParamList } from '../../navigation/screens';
import { TitleGenerator } from '../../utils/text';

interface SearchModalProps {
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchModal = ({ isVisible, setIsVisible }: SearchModalProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<AppScreensParamList, AppScreens.PRODUCT_LIST_SCREEN>>();
    const [value, setValue] = useState('')

    const handleSearch = () => {
        navigation.navigate(AppScreens.PRODUCT_LIST_SCREEN, { searchQuery: value });
        setIsVisible(false);
    };

    return (
        <Overlay h={verticalScale(203)} w={scale(300)} visible={isVisible} p={'xl'}>
            <Div flex={1} justifyContent='space-between'>
                <TitleGenerator title='Buscar una bebida' color='black' size='3xl' />
                <Input placeholder='Busqueda' h={verticalScale(35)} value={value} onChangeText={(text) => {
                    const cleanedValue = text.replace(/\s/g, '');
                    setValue(cleanedValue);
                }} />
                <Div flexDir='row' justifyContent='space-between'>
                    <Button w={scale(120)} bg='grey' color='black' onPress={() => setIsVisible(false)}>CANCELAR</Button>
                    <Button w={scale(120)} bg='secondary' color='black' onPress={handleSearch}>BUSCAR</Button>
                </Div>
            </Div>
        </Overlay>
    );
};

export default SearchModal;
