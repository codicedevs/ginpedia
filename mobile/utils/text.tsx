import React from 'react';
import { Div, Text } from 'react-native-magnus';
import { TitleText, YellowBorderText } from '../components/styled/styled';
import { customTheme } from './theme';

type TitleProps = {
    title: string,
    size?: string,
    color?: string,
    borderColor?: string
}

export const TitleGenerator = ({ title, size = '2xl', color = 'white', borderColor = customTheme.colors.secondary }: TitleProps) => {

    if (!title) {
        return (
            <Text>Error</Text>
        );
    }

    const words = title.split(' ');
    const firstWord = words[0];
    const restOfText = words.slice(1).join(' ');

    const firstTwoLetters = firstWord.slice(0, 2);
    const restOfFirstWord = firstWord.slice(2);

    return (
        <Div flexDir='row' flexWrap='wrap'>
            <Div flexDir='row'>
                <YellowBorderText borderColor={borderColor}>
                    <TitleText
                        color={color}
                        fontSize={size}
                        maxW={'100%'}
                    >
                        {firstTwoLetters}
                    </TitleText>
                </YellowBorderText>
                <TitleText
                    color={color}
                    fontSize={size}
                    maxW={'100%'}
                >
                    {`${restOfFirstWord} `}
                </TitleText>
            </Div>
            <TitleText
                color={color}
                fontSize={size}
                maxW={'100%'}
            >
                {restOfText}
            </TitleText>
        </Div>
    );
};


export function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}