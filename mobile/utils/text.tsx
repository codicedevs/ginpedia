import React from 'react';
import { Div, Text } from 'react-native-magnus';
import { YellowBorderText } from '../components/styled/styled';

export const TitleGenerator = ({ title, size = '2xl' }: { title: string, size?: string }) => {
    const firstWords = title.slice(0, 2);
    const restOfText = title.slice(2);

    return (
        <Div flexDir='row'>
            <YellowBorderText>
                <Text
                    fontSize={size}
                >
                    {firstWords}
                </Text>
            </YellowBorderText>
            <Text
                fontSize={size}
            >{restOfText}</Text>
        </Div>
    );
};
