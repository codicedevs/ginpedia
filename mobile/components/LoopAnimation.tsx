import { MotiView } from 'moti';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Text } from 'react-native-magnus';
import { runOnJS, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';

type AnimationProps = {
    onAnimationComplete: () => void;
    isFetching: boolean;
    imageloaded: boolean;
}

function LoopAnimation({ onAnimationComplete, isFetching, imageloaded }: AnimationProps) {
    const { width } = Dimensions.get('window');
    const textTranslateX = useSharedValue(-width);
    const circleTranslateX = useSharedValue(width);
    const [animationRunning, setAnimationRunning] = useState(false);

    useEffect(() => {
        if (isFetching || !imageloaded) {
            if (!animationRunning) {
                startAnimation();
            }
        } else {
            if (!animationRunning) {
                onAnimationComplete();
            }
        }
    }, [isFetching, imageloaded, animationRunning]);

    const startAnimation = () => {
        textTranslateX.value = -width;
        circleTranslateX.value = width;

        setAnimationRunning(true);

        textTranslateX.value = withSequence(
            withTiming(0, { duration: 1500 }),
            withTiming(width, { duration: 750 }, (finished) => {
                if (finished) {
                    runOnJS(setAnimationRunning)(false); // Uso de runOnJS para manipular el estado
                }
            })
        );

        circleTranslateX.value = withSequence(
            withTiming(0, { duration: 1500 }),
            withTiming(-width, { duration: 750 }, (finished) => {
                if (finished) {
                    runOnJS(setAnimationRunning)(false); // Uso de runOnJS para manipular el estado
                }
            })
        );
    };

    const textStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: textTranslateX.value }],
    }));

    const circleStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: circleTranslateX.value }],
        width: 150,
        height: 150,
        borderRadius: 75,
    }));

    return (
        <MotiView style={styles.animationContainer}>
            <MotiView style={[styles.circle, circleStyle]} />
            <MotiView style={[styles.textContainer, textStyle]}>
                <Text
                    fontSize={24}
                    fontWeight="bold"
                    textAlign="center"
                    fontFamily="DMSerifDisplay-Regular"
                >
                    ginpedia
                </Text>
            </MotiView>
        </MotiView>
    );
}

const styles = StyleSheet.create({
    animationContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2f2e2a',
    },
    textContainer: {
        position: 'absolute',
        zIndex: 2,
    },
    circle: {
        position: 'absolute',
        zIndex: 1,
        backgroundColor: '#F4B929',
    },
});

export default LoopAnimation;
