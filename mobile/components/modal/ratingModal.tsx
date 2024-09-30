import React, { useContext, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Button, Div, Icon, Overlay, Text } from "react-native-magnus";
import { scale, verticalScale } from 'react-native-size-matters';
import { AuthContext } from '../../context/authProvider';
import ratingService from '../../service/rating.service';
import { Product } from '../../types/product.type';
import { TitleGenerator } from '../../utils/text';
import { BoldText, RatingModalInfo } from '../styled/styled';

interface RatingModalProps {
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    rating: Product['rating'];
    ratings: Product['ratingList'];
    productId: string
}
const RatingModal: React.FC<RatingModalProps> = ({ isVisible, setIsVisible, rating, ratings, productId }) => {
    const { currentUser } = useContext(AuthContext)
    const [value, setValue] = useState(rating ? rating : 0)
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

    const sendRating = () => {
        if (value === 0) return
        try {
            ratingService.createRating(productId, currentUser.id, Number(value))
            setIsVisible(false)
        } catch (e) {
            console.log(e)
        }

    }

    const onCancel = () => {
        setIsVisible(false)
    }

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
                            <Div rounded={'md'} bg='secondary' h={'100%'} w={`${checkRating(5)}%`} />
                        </Div>
                        <Text color='black'>{checkRating(5)}%</Text>
                    </RatingModalInfo>
                    <RatingModalInfo>
                        <Text color='black'>4 estrellas</Text>
                        <Div rounded={'md'} w={scale(160)} h={verticalScale(10)} bg='white' >
                            <Div rounded={'md'} bg='secondary' h={'100%'} w={`${checkRating(4)}%`} />
                        </Div>
                        <Text color='black'>{checkRating(4)}%</Text>
                    </RatingModalInfo>
                    <RatingModalInfo>
                        <Text color='black'>3 estrellas</Text>
                        <Div rounded={'md'} w={scale(160)} h={verticalScale(10)} bg='white' >
                            <Div rounded={'md'} bg='secondary' h={'100%'} w={`${checkRating(3)}%`} />
                        </Div>
                        <Text color='black'>{checkRating(3)}%</Text>
                    </RatingModalInfo>
                    <RatingModalInfo>
                        <Text color='black'>2 estrellas</Text>
                        <Div rounded={'md'} w={scale(160)} h={verticalScale(10)} bg='white' >
                            <Div rounded={'md'} bg='secondary' h={'100%'} w={`${checkRating(2)}%`} />
                        </Div>
                        <Text color='black'>{checkRating(2)}%</Text>
                    </RatingModalInfo>
                    <RatingModalInfo>
                        <Text color='black'>1 estrellas</Text>
                        <Div rounded={'md'} w={scale(160)} h={verticalScale(10)} bg='white' >
                            <Div rounded={'md'} bg='secondary' h={'100%'} w={`${checkRating(1)}%`} />
                        </Div>
                        <Text color='black'>{checkRating(1)}%</Text>
                    </RatingModalInfo>
                </Div>
                <Div flexDir='row' justifyContent='space-between' w={'70%'} alignSelf='center'>
                    <TouchableOpacity onPress={() => setValue(1)}>
                        <Icon fontFamily='FontAwesome' color={value <= 0 ? "black" : "secondary"} fontSize={'6xl'} name={value <= 0 ? "star-o" : "star"} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setValue(2)}>
                        <Icon fontFamily='FontAwesome' color={value <= 1 ? "black" : "secondary"} fontSize={'6xl'} name={value <= 1 ? "star-o" : "star"} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setValue(3)}>
                        <Icon fontFamily='FontAwesome' color={value <= 2 ? "black" : "secondary"} fontSize={'6xl'} name={value <= 2 ? "star-o" : "star"} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setValue(4)}>
                        <Icon fontFamily='FontAwesome' color={value <= 3 ? "black" : "secondary"} fontSize={'6xl'} name={value <= 3 ? "star-o" : "star"} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setValue(5)}>
                        <Icon fontFamily='FontAwesome' color={value <= 4 ? "black" : "secondary"} fontSize={'6xl'} name={value <= 4 ? "star-o" : "star"} />
                    </TouchableOpacity>
                </Div>
                <Div h={verticalScale(40)} w={'100%'} justifyContent='space-between' flexDir='row' >
                    <Button onPress={onCancel} bg='#BEBEBE' w={scale(120)}><BoldText color='black'>CANCELAR</BoldText></Button>
                    <Button w={scale(120)} onPress={() => sendRating()} bg='secondary' color='black'><BoldText color='black'>ENVIAR</BoldText></Button>
                </Div>
            </Div>
        </Overlay>
    );
}

export default RatingModal;
