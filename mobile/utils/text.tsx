import React from 'react';
import { Div, Text } from 'react-native-magnus';
import { YellowBorderText } from '../components/styled/styled';

export const TitleGenerator = ({ title }: { title: string }) => {
    const firstWords = title.slice(0, 2);
    const restOfText = title.slice(2);

    return (
        <Div flexDir='row'>
            <YellowBorderText>
                <Text
                    fontSize={'2xl'}
                >
                    {firstWords}
                </Text>
            </YellowBorderText>
            <Text
                fontSize={'2xl'}
            >{restOfText}</Text>
        </Div>
    );
};
