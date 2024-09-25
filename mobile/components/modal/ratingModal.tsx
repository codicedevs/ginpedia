import React from 'react';
import { Button, Div, Icon, Overlay, Text } from "react-native-magnus";
import { scale, verticalScale } from 'react-native-size-matters';
import { Product } from '../../types/product.type';
import { TitleGenerator } from '../../utils/text';
import { BoldText, RatingModalInfo } from '../styled/styled';

interface RatingModalProps {
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    rating: Product['rating'];
    ratings: Product['ratingList']
}
const RatingModal: React.FC<RatingModalProps> = ({ isVisible, setIsVisible, rating, ratings }) => {
    const totalRatings = ratings.reduce((sum, rating) => {
        const values = Object.values(rating);
        return sum + values[0];
    }, 0);

    const checkRating = (option: number): number => {
        if (totalRatings === 0) return 0;

        const ratingForOption = ratings.find(rating => Object.keys(rating)[0] === option.toString());

        if (!ratingForOption) return 0;

        const valueForOption = Object.values(ratingForOption)[0] as number;

        const percentage = (valueForOption / totalRatings) * 100;

        return percentage;
    };

    return (
        <Overlay w={scale(310)} h={verticalScale(363)} bg='#D9D9D9' visible={isVisible} p="xl">
            <Div justifyContent='space-between' h={'100%'}>
                <Div>
                    <Div flexDir='row'>
                        <Icon color="black" mr={'md'} name="star" />
                        <Text color='black'>7.3</Text>
                    </Div>
                    <TitleGenerator color='black' title='Puntuá esta bebida' />
                    <Text mt={'md'} color='black'>500 puntuacions</Text>
                </Div>
                <Div h={verticalScale(123)} justifyContent='space-between'>
                    <RatingModalInfo>
                        <Text color='black'>5 estrellas</Text>
                        <Div rounded={'md'} w={scale(160)} h={verticalScale(10)} bg='white' >
                            <Div rounded={'md'} bg='secondary' h={'100%'} w={'70%'} />
                        </Div>
                        <Text color='black'>70%</Text>
                    </RatingModalInfo>
                    <RatingModalInfo>
                        <Text color='black'>4 estrellas</Text>
                        <Div rounded={'md'} w={scale(160)} h={verticalScale(10)} bg='white' >
                            <Div rounded={'md'} bg='secondary' h={'100%'} w={'15%'} />
                        </Div>
                        <Text color='black'>15%</Text>
                    </RatingModalInfo>
                    <RatingModalInfo>
                        <Text color='black'>3 estrellas</Text>
                        <Div rounded={'md'} w={scale(160)} h={verticalScale(10)} bg='white' >
                            <Div rounded={'md'} bg='secondary' h={'100%'} w={'10%'} />
                        </Div>
                        <Text color='black'>10%</Text>
                    </RatingModalInfo>
                    <RatingModalInfo>
                        <Text color='black'>2 estrellas</Text>
                        <Div rounded={'md'} w={scale(160)} h={verticalScale(10)} bg='white' >
                            <Div rounded={'md'} bg='secondary' h={'100%'} w={'3%'} />
                        </Div>
                        <Text color='black'>3%</Text>
                    </RatingModalInfo>
                    <RatingModalInfo>
                        <Text color='black'>1 estrellas</Text>
                        <Div rounded={'md'} w={scale(160)} h={verticalScale(10)} bg='white' >
                            <Div rounded={'md'} bg='secondary' h={'100%'} w={'2%'} />
                        </Div>
                        <Text color='black'>2%</Text>
                    </RatingModalInfo>
                </Div>
                <Div flexDir='row' justifyContent='space-between' w={'70%'} alignSelf='center'>
                    <Icon fontFamily='FontAwesome' color="secondary" fontSize={'6xl'} name="star" />
                    <Icon fontFamily='FontAwesome' color="black" fontSize={'6xl'} name="star-o" />
                    <Icon fontFamily='FontAwesome' color="black" fontSize={'6xl'} name="star-o" />
                    <Icon fontFamily='FontAwesome' color="black" fontSize={'6xl'} name="star-o" />
                    <Icon fontFamily='FontAwesome' color="black" fontSize={'6xl'} name="star-o" />
                </Div>
                <Div h={verticalScale(40)} w={'100%'} justifyContent='space-between' flexDir='row' >
                    <Button onPress={() => setIsVisible(false)} bg='#BEBEBE' w={scale(120)}><BoldText color='black'>CANCELAR</BoldText></Button>
                    <Button w={scale(120)} bg='secondary' color='black'><BoldText color='black'>ENVIAR</BoldText></Button>
                </Div>
            </Div>
        </Overlay>
    );
}

export default RatingModal;
