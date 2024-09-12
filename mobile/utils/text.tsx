import React from 'react';
import { Div } from 'react-native-magnus';
import { TitleText, YellowBorderText } from '../components/styled/styled';

export const TitleGenerator = ({ title, size = '2xl' }: { title: string, size?: string }) => {
    const firstWords = title.slice(0, 2);
    const restOfText = title.slice(2);

    return (
        <Div flexDir='row'>
            <YellowBorderText>
                <TitleText
                    fontSize={size}
                >
                    {firstWords}
                </TitleText>
            </YellowBorderText>
            <TitleText
                fontSize={size}
            >{restOfText}</TitleText>
        </Div>
    );
};
