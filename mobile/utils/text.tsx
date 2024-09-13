import React from 'react';
import { Div, Text } from 'react-native-magnus';
import { TitleText, YellowBorderText } from '../components/styled/styled';

export const TitleGenerator = ({ title, size = '2xl' }: { title: string, size?: string }) => {

    if (!title) {
        return (
            <Text>Error</Text>
        );
    }

    // Dividimos el texto por palabras, obtenemos la primera palabra y el resto
    const words = title.split(' ');
    const firstWord = words[0]; // Primera palabra
    const restOfText = words.slice(1).join(' '); // El resto del texto

    // Dividimos la primera palabra en las primeras 2 letras y el resto
    const firstTwoLetters = firstWord.slice(0, 2);
    const restOfFirstWord = firstWord.slice(2);

    return (
        <Div flexDir='row' flexWrap='wrap'>
            <Div flexDir='row'>
                <YellowBorderText>
                    <TitleText
                        fontSize={size}
                        maxW={'100%'}
                    >
                        {firstTwoLetters}
                    </TitleText>
                </YellowBorderText>
                <TitleText
                    fontSize={size}
                    maxW={'100%'}
                >
                    {`${restOfFirstWord} `}
                </TitleText>
            </Div>
            <TitleText
                fontSize={size}
                maxW={'100%'}
            >
                {restOfText}
            </TitleText>
        </Div>
    );
};
